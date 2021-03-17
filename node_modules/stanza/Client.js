"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const events_1 = require("events");
const StreamManagement_1 = tslib_1.__importDefault(require("./helpers/StreamManagement"));
const JID = tslib_1.__importStar(require("./JID"));
const JXT = tslib_1.__importStar(require("./jxt"));
const SASL = tslib_1.__importStar(require("./lib/sasl"));
const plugins_1 = require("./plugins");
const protocol_1 = tslib_1.__importDefault(require("./protocol"));
const bosh_1 = tslib_1.__importDefault(require("./transports/bosh"));
const websocket_1 = tslib_1.__importDefault(require("./transports/websocket"));
const Utils_1 = require("./Utils");
class Client extends events_1.EventEmitter {
    constructor(opts = {}) {
        super();
        this.setMaxListeners(100);
        // Some EventEmitter shims don't include off()
        this.off = this.removeListener;
        this._initConfig(opts);
        this.jid = '';
        this.sasl = new SASL.Factory();
        this.sasl.register('EXTERNAL', SASL.EXTERNAL, 1000);
        this.sasl.register('SCRAM-SHA-256-PLUS', SASL.SCRAM, 350);
        this.sasl.register('SCRAM-SHA-256', SASL.SCRAM, 300);
        this.sasl.register('SCRAM-SHA-1-PLUS', SASL.SCRAM, 250);
        this.sasl.register('SCRAM-SHA-1', SASL.SCRAM, 200);
        this.sasl.register('DIGEST-MD5', SASL.DIGEST, 100);
        this.sasl.register('OAUTHBEARER', SASL.OAUTH, 100);
        this.sasl.register('X-OAUTH2', SASL.PLAIN, 50);
        this.sasl.register('PLAIN', SASL.PLAIN, 1);
        this.sasl.register('ANONYMOUS', SASL.ANONYMOUS, 0);
        this.stanzas = new JXT.Registry();
        this.stanzas.define(protocol_1.default);
        this.use(plugins_1.core);
        this.sm = new StreamManagement_1.default();
        this.sm.on('prebound', jid => {
            this.jid = jid;
            this.emit('session:bound', jid);
        });
        this.sm.on('send', sm => this.send('sm', sm));
        this.sm.on('acked', acked => this.emit('stanza:acked', acked));
        this.sm.on('failed', failed => this.emit('stanza:failed', failed));
        this.sm.on('resend', ({ kind, stanza }) => this.send(kind, stanza));
        this.on('session:bound', jid => this.sm.bind(jid));
        this.transports = {
            bosh: bosh_1.default,
            websocket: websocket_1.default
        };
        this.on('stream:data', (json, kind) => {
            this.emit(kind, json);
            if (kind === 'message' || kind === 'presence' || kind === 'iq') {
                this.sm.handle();
                this.emit('stanza', json);
            }
            else if (kind === 'sm') {
                if (json.type === 'ack') {
                    this.emit('stream:management:ack', json);
                    this.sm.process(json);
                }
                if (json.type === 'request') {
                    this.sm.ack();
                }
                return;
            }
            if (json.id) {
                this.emit((kind + ':id:' + json.id), json);
            }
        });
        this.on('disconnected', () => {
            if (this.transport) {
                delete this.transport;
            }
        });
        this.on('auth:success', () => {
            if (this.transport) {
                this.transport.authenticated = true;
            }
        });
        this.on('iq', (iq) => {
            const iqType = iq.type;
            const payloadType = iq.payloadType;
            const iqEvent = 'iq:' + iqType + ':' + payloadType;
            if (iqType === 'get' || iqType === 'set') {
                if (payloadType === 'invalid-payload-count') {
                    return this.sendIQError(iq, {
                        error: {
                            condition: 'bad-request',
                            type: 'modify'
                        }
                    });
                }
                if (payloadType === 'unknown-payload' || this.listenerCount(iqEvent) === 0) {
                    return this.sendIQError(iq, {
                        error: {
                            condition: 'service-unavailable',
                            type: 'cancel'
                        }
                    });
                }
                this.emit(iqEvent, iq);
            }
        });
        this.on('message', msg => {
            const isChat = (msg.alternateLanguageBodies && msg.alternateLanguageBodies.length) ||
                (msg.links && msg.links.length);
            const isMarker = msg.marker && msg.marker.type !== 'markable';
            if (isChat && !isMarker) {
                if (msg.type === 'chat' || msg.type === 'normal') {
                    this.emit('chat', msg);
                }
                else if (msg.type === 'groupchat') {
                    this.emit('groupchat', msg);
                }
            }
            if (msg.type === 'error') {
                this.emit('message:error', msg);
            }
        });
        this.on('presence', (pres) => {
            let presType = pres.type || 'available';
            if (presType === 'error') {
                presType = 'presence:error';
            }
            this.emit(presType, pres);
        });
    }
    get stream() {
        return this.transport ? this.transport.stream : undefined;
    }
    emit(name, ...args) {
        // Continue supporting the most common and useful wildcard events
        const res = super.emit(name, ...args);
        if (name === 'raw') {
            super.emit(`raw:${args[0]}`, args[1]);
            super.emit('raw:*', `raw:${args[0]}`, args[1]);
            super.emit('*', `raw:${args[0]}`, args[1]);
        }
        else {
            super.emit('*', name, ...args);
        }
        return res;
    }
    use(pluginInit) {
        if (typeof pluginInit !== 'function') {
            return;
        }
        pluginInit(this, this.stanzas, this.config);
    }
    nextId() {
        return Utils_1.uuid();
    }
    async getCredentials() {
        return this._getConfiguredCredentials();
    }
    async connect() {
        const transportPref = ['websocket', 'bosh'];
        let endpoints;
        for (const name of transportPref) {
            let conf = this.config.transports[name];
            if (!conf) {
                continue;
            }
            if (typeof conf === 'string') {
                conf = { url: conf };
            }
            else if (conf === true) {
                if (!endpoints) {
                    try {
                        endpoints = await this.discoverBindings(this.config.server);
                    }
                    catch (err) {
                        console.error(err);
                        continue;
                    }
                }
                endpoints[name] = (endpoints[name] || []).filter(url => url.startsWith('wss:') || url.startsWith('https:'));
                if (!endpoints[name] || !endpoints[name].length) {
                    continue;
                }
                conf = { url: endpoints[name][0] };
            }
            this.transport = new this.transports[name](this, this.sm, this.stanzas);
            this.transport.connect({
                acceptLanguages: this.config.acceptLanguages || ['en'],
                jid: this.config.jid,
                lang: this.config.lang || 'en',
                server: this.config.server,
                url: conf.url,
                ...conf
            });
            return;
        }
        console.error('No endpoints found for the requested transports.');
        return this.disconnect();
    }
    disconnect() {
        if (this.sessionStarted && !this.sm.started) {
            // Only emit session:end if we had a session, and we aren't using
            // stream management to keep the session alive.
            this.emit('session:end');
        }
        this.sessionStarted = false;
        if (this.transport) {
            this.transport.disconnect();
        }
        else {
            this.emit('disconnected');
        }
    }
    send(name, data) {
        this.sm.track(name, data);
        if (this.transport) {
            this.transport.send(name, data);
        }
    }
    sendMessage(data) {
        const id = data.id || this.nextId();
        const msg = {
            id,
            originId: id,
            ...data
        };
        this.emit('message:sent', msg, false);
        this.send('message', msg);
        return msg.id;
    }
    sendPresence(data = {}) {
        const pres = {
            id: this.nextId(),
            ...data
        };
        this.send('presence', pres);
        return pres.id;
    }
    sendIQ(data) {
        const iq = {
            id: this.nextId(),
            ...data
        };
        const allowed = JID.allowedResponders(this.jid, data.to);
        const respEvent = 'iq:id:' + iq.id;
        const request = new Promise((resolve, reject) => {
            const handler = (res) => {
                // Only process result from the correct responder
                if (!allowed.has(res.from)) {
                    return;
                }
                // Only process result or error responses, if the responder
                // happened to send us a request using the same ID value at
                // the same time.
                if (res.type !== 'result' && res.type !== 'error') {
                    return;
                }
                this.off(respEvent, handler);
                if (res.type === 'result') {
                    resolve(res);
                }
                else {
                    reject(res);
                }
            };
            this.on(respEvent, handler);
        });
        this.send('iq', iq);
        return Utils_1.timeoutPromise(request, (this.config.timeout || 15) * 1000, () => ({
            error: {
                condition: 'timeout'
            },
            id: iq.id,
            type: 'error'
        }));
    }
    sendIQResult(original, reply) {
        this.send('iq', {
            ...reply,
            id: original.id,
            to: original.from,
            type: 'result'
        });
    }
    sendIQError(original, error) {
        this.send('iq', {
            ...error,
            id: original.id,
            to: original.from,
            type: 'error'
        });
    }
    sendStreamError(error) {
        this.emit('stream:error', error);
        this.send('error', error);
        this.disconnect();
    }
    _getConfiguredCredentials() {
        const creds = this.config.credentials || {};
        const requestedJID = JID.parse(this.config.jid || '');
        const username = creds.username || requestedJID.local;
        const server = creds.host || requestedJID.domain;
        return {
            host: server,
            password: this.config.password,
            realm: server,
            serviceName: server,
            serviceType: 'xmpp',
            username,
            ...creds
        };
    }
    _initConfig(opts = {}) {
        const currConfig = this.config || {};
        this.config = {
            jid: '',
            transports: {
                bosh: true,
                websocket: true
            },
            useStreamManagement: true,
            ...currConfig,
            ...opts
        };
        if (!this.config.server) {
            this.config.server = JID.getDomain(this.config.jid);
        }
        if (this.config.password) {
            this.config.credentials = this.config.credentials || {};
            this.config.credentials.password = this.config.password;
            delete this.config.password;
        }
    }
}
exports.default = Client;
