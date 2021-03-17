"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stanza_shims_1 = require("stanza-shims");
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const Utils_1 = require("../Utils");
async function retryRequest(url, opts, timeout, allowedRetries = 5) {
    let attempt = 0;
    while (attempt <= allowedRetries) {
        try {
            const resp = await Utils_1.timeoutPromise(stanza_shims_1.fetch(url, opts), timeout * 1000, () => {
                return new Error('Request timed out');
            });
            if (!resp.ok) {
                throw new Error('HTTP Status Error: ' + resp.status);
            }
            return resp.text();
        }
        catch (err) {
            attempt += 1;
            if (attempt > allowedRetries) {
                throw err;
            }
        }
        await Utils_1.sleep(Math.pow(attempt, 2) * 1000);
    }
    throw new Error('Request failed');
}
class BOSHConnection {
    constructor(client, sm, stanzas) {
        this.maxRequests = 2;
        this.maxHoldOpen = 1;
        this.minPollingInterval = 5;
        this.client = client;
        this.sm = sm;
        this.stanzas = stanzas;
        this.sendBuffer = [];
        this.requests = new Set();
        this.authenticated = false;
        this.lastResponseTime = Date.now();
        this.pollingInterval = setInterval(() => {
            if (this.authenticated &&
                this.requests.size === 0 &&
                this.sendBuffer.length === 0 &&
                Date.now() - this.lastResponseTime >= this.minPollingInterval * 1000) {
                this.longPoll();
            }
        }, 1000);
    }
    connect(opts) {
        this.config = {
            maxRetries: 5,
            rid: Math.ceil(Math.random() * 9999999999),
            wait: 30,
            ...opts
        };
        this.hasStream = false;
        this.sm.started = false;
        this.url = this.config.url;
        this.sid = this.config.sid;
        this.rid = this.config.rid;
        this.requests.clear();
        if (this.sid) {
            this.hasStream = true;
            this.stream = {};
            this.client.emit('connected');
            this.client.emit('session:prebind', this.config.jid);
            this.client.emit('session:started');
            return;
        }
        this.rid++;
        this.request({
            lang: this.config.lang,
            maxHoldOpen: 1,
            maxWaitTime: this.config.wait,
            to: this.config.server,
            version: '1.6',
            xmppVersion: '1.0'
        });
    }
    disconnect() {
        clearInterval(this.pollingInterval);
        if (this.hasStream) {
            this.rid++;
            this.request({
                type: 'terminate'
            });
        }
        else {
            this.stream = undefined;
            this.sid = undefined;
            this.rid = undefined;
            this.client.emit('disconnected', undefined);
        }
    }
    restart() {
        this.hasStream = false;
        this.rid++;
        this.request({
            lang: this.config.lang,
            to: this.config.server,
            xmppRestart: true
        });
    }
    send(dataOrName, data) {
        if (data) {
            const output = this.stanzas.export(dataOrName, data);
            if (output) {
                this.sendBuffer.push(output.toString());
            }
        }
        else {
            this.sendBuffer.push(dataOrName);
        }
        this.longPoll();
    }
    longPoll() {
        const canReceive = !this.maxRequests || this.requests.size < this.maxRequests;
        const canSend = !this.maxRequests ||
            (this.sendBuffer.length > 0 && this.requests.size < this.maxRequests);
        if (!this.sid || (!canReceive && !canSend)) {
            return;
        }
        const stanzas = this.sendBuffer;
        this.sendBuffer = [];
        this.rid++;
        this.request({}, stanzas);
    }
    async request(meta, payloads = []) {
        const rid = this.rid;
        this.requests.add(rid);
        meta.rid = this.rid;
        meta.sid = this.sid;
        const bosh = this.stanzas.export('bosh', meta);
        const body = [bosh.openTag(), ...payloads, bosh.closeTag()].join('');
        this.client.emit('raw', 'outgoing', body);
        try {
            const respBody = await retryRequest(this.url, {
                body,
                headers: {
                    'Content-Type': 'text/xml'
                },
                method: 'POST'
            }, this.config.wait * 1.1, this.config.maxRetries);
            this.requests.delete(rid);
            this.lastResponseTime = Date.now();
            if (respBody) {
                const rawData = Buffer.from(respBody, 'utf8')
                    .toString()
                    .trim();
                if (rawData === '') {
                    return;
                }
                this.client.emit('raw', 'incoming', rawData);
                const parser = new jxt_1.StreamParser({
                    acceptLanguages: this.config.acceptLanguages,
                    allowComments: false,
                    lang: this.config.lang,
                    registry: this.stanzas,
                    rootKey: 'bosh',
                    wrappedStream: true
                });
                parser.on('error', (err) => {
                    const streamError = {
                        condition: Constants_1.StreamErrorCondition.InvalidXML
                    };
                    this.client.emit('stream:error', streamError, err);
                    this.send('error', streamError);
                    return this.disconnect();
                });
                parser.on('data', (e) => {
                    if (e.event === 'stream-start') {
                        if (e.stanza.type === 'terminate') {
                            this.hasStream = false;
                            this.rid = undefined;
                            this.sid = undefined;
                            this.client.emit('bosh:terminate', e.stanza);
                            this.client.emit('stream:end');
                            this.client.emit('disconnected', undefined);
                            return;
                        }
                        if (!this.hasStream) {
                            this.hasStream = true;
                            this.stream = e.stanza;
                            this.sid = e.stanza.sid || this.sid;
                            this.maxHoldOpen = e.stanza.maxHoldOpen || this.maxHoldOpen;
                            this.maxRequests = e.stanza.maxRequests || this.maxRequests;
                            this.minPollingInterval =
                                e.stanza.minPollingInterval || this.minPollingInterval;
                            this.client.emit('stream:start', e.stanza);
                        }
                        return;
                    }
                    if (!e.event) {
                        this.client.emit('stream:data', e.stanza, e.kind);
                    }
                });
                parser.write(rawData);
            }
            if (meta.type === 'terminate') {
                this.closing = true;
            }
            // do not (re)start long polling if terminating, or request is pending, or before authentication
            if (this.hasStream &&
                !this.closing &&
                this.authenticated &&
                (!this.requests.size || this.sendBuffer.length)) {
                clearTimeout(this.idleTimeout);
                this.idleTimeout = setTimeout(() => {
                    this.longPoll();
                }, 100);
            }
        }
        catch (err) {
            this.hasStream = false;
            this.client.emit('stream:error', {
                condition: 'connection-timeout'
            }, err);
            this.disconnect();
        }
    }
}
exports.default = BOSHConnection;
