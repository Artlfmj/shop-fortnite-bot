"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("async");
const stanza_shims_1 = require("stanza-shims");
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const WS_OPEN = 1;
class WSConnection {
    constructor(client, sm, stanzas) {
        this.sm = sm;
        this.stanzas = stanzas;
        this.closing = false;
        this.client = client;
        this.sendQueue = async_1.priorityQueue((data, cb) => {
            if (this.conn) {
                data = Buffer.from(data, 'utf8').toString();
                this.client.emit('raw', 'outgoing', data);
                if (this.conn.readyState === WS_OPEN) {
                    this.conn.send(data);
                }
            }
            cb();
        }, 1);
    }
    connect(opts) {
        this.config = opts;
        this.hasStream = false;
        this.closing = false;
        this.parser = new jxt_1.StreamParser({
            acceptLanguages: this.config.acceptLanguages,
            allowComments: false,
            lang: this.config.lang,
            registry: this.stanzas,
            wrappedStream: false
        });
        this.parser.on('data', (e) => {
            const name = e.kind;
            const stanzaObj = e.stanza;
            if (name === 'stream') {
                if (stanzaObj.action === 'open') {
                    this.hasStream = true;
                    this.stream = stanzaObj;
                    return this.client.emit('stream:start', stanzaObj);
                }
                if (stanzaObj.action === 'close') {
                    this.client.emit('stream:end');
                    return this.disconnect();
                }
            }
            this.client.emit('stream:data', stanzaObj, name);
        });
        this.parser.on('error', (err) => {
            const streamError = {
                condition: Constants_1.StreamErrorCondition.InvalidXML
            };
            this.client.emit('stream:error', streamError, err);
            this.send(this.stanzas.export('error', streamError).toString());
            return this.disconnect();
        });
        this.conn = new stanza_shims_1.WebSocket(opts.url, 'xmpp');
        this.conn.onerror = (e) => {
            if (e.preventDefault) {
                e.preventDefault();
            }
            console.error(e);
        };
        this.conn.onclose = (e) => {
            this.client.emit('disconnected', e);
        };
        this.conn.onopen = () => {
            this.sm.started = false;
            this.client.emit('connected');
            this.send(this.startHeader());
        };
        this.conn.onmessage = wsMsg => {
            const data = Buffer.from(wsMsg.data, 'utf8').toString();
            this.client.emit('raw', 'incoming', data);
            if (this.parser) {
                this.parser.write(data);
            }
        };
    }
    disconnect() {
        if (this.conn && !this.closing && this.hasStream) {
            this.closing = true;
            this.send(this.closeHeader());
        }
        else {
            this.hasStream = false;
            this.stream = undefined;
            if (this.conn && this.conn.readyState === WS_OPEN) {
                this.conn.close();
            }
            this.conn = undefined;
        }
    }
    send(dataOrName, data) {
        if (data) {
            const output = this.stanzas.export(dataOrName, data);
            if (output) {
                this.sendQueue.push(output.toString(), 0);
            }
        }
        else {
            this.sendQueue.push(dataOrName, 0);
        }
    }
    restart() {
        this.hasStream = false;
        this.send(this.startHeader());
    }
    startHeader() {
        const header = this.stanzas.export('stream', {
            action: 'open',
            lang: this.config.lang,
            to: this.config.server,
            version: '1.0'
        });
        return header.toString();
    }
    closeHeader() {
        const header = this.stanzas.export('stream', {
            action: 'close'
        });
        return header.toString();
    }
}
exports.default = WSConnection;
