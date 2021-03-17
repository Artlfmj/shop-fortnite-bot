"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Namespaces_1 = require("../Namespaces");
const Utils_1 = require("../Utils");
function checkConnection(client) {
    return new Promise(async (resolve, reject) => {
        if (client.sm.started) {
            client.once('stream:management:ack', () => resolve());
            client.sm.request();
        }
        else {
            try {
                await client.ping();
                resolve();
            }
            catch (err) {
                if (err.error && err.error.condition !== 'timeout') {
                    resolve();
                }
                else {
                    reject();
                }
            }
        }
    });
}
function sendCSI(client, type) {
    if (client.features.negotiated.clientStateIndication) {
        client.send('csi', {
            type
        });
    }
}
function default_1(client) {
    client.disco.addFeature(Namespaces_1.NS_PING);
    client.on('iq:get:ping', iq => {
        client.sendIQResult(iq);
    });
    client.on('disconnected', () => {
        client.disableKeepAlive();
        client.features.negotiated.streamManagement = false;
        client.features.negotiated.clientStateIndication = false;
    });
    client.markActive = () => sendCSI(client, 'active');
    client.markInactive = () => sendCSI(client, 'inactive');
    client.ping = async (jid) => {
        await client.sendIQ({
            ping: true,
            to: jid,
            type: 'get'
        });
    };
    client.enableKeepAlive = (opts = {}) => {
        // Ping every 5 minutes
        const interval = opts.interval || 300;
        // Disconnect if no response in 15 seconds
        const timeout = opts.timeout || client.config.timeout || 15;
        async function keepalive() {
            if (client.sessionStarted) {
                try {
                    await Utils_1.timeoutPromise(checkConnection(client), timeout * 1000);
                }
                catch (err) {
                    // Kill the apparently dead connection without closing
                    // the stream itself so we can reconnect and potentially
                    // resume the session.
                    client.emit('stream:error', {
                        condition: 'connection-timeout',
                        text: 'Server did not respond in ' + timeout + ' seconds'
                    });
                    if (client.transport) {
                        client.transport.hasStream = false;
                        client.transport.disconnect();
                    }
                }
            }
        }
        client._keepAliveInterval = setInterval(keepalive, interval * 1000);
    };
    client.disableKeepAlive = () => {
        if (client._keepAliveInterval) {
            clearInterval(client._keepAliveInterval);
            delete client._keepAliveInterval;
        }
    };
    const smacks = async (features, done) => {
        if (!client.config.useStreamManagement) {
            return done();
        }
        const smHandler = (sm) => {
            switch (sm.type) {
                case 'enabled':
                    client.sm.enabled(sm);
                    client.features.negotiated.streamManagement = true;
                    client.off('sm', smHandler);
                    return done();
                case 'resumed':
                    client.sm.resumed(sm);
                    client.features.negotiated.streamManagement = true;
                    client.features.negotiated.bind = true;
                    client.sessionStarted = true;
                    client.emit('stream:management:resumed', sm);
                    client.off('sm', smHandler);
                    return done('break'); // Halt further processing of stream features
                case 'failed':
                    client.sm.failed(sm);
                    client.emit('session:end');
                    client.off('sm', smHandler);
                    done();
            }
        };
        client.on('sm', smHandler);
        if (!client.sm.id) {
            if (client.features.negotiated.bind) {
                client.sm.enable();
            }
            else {
                client.off('sm', smHandler);
                done();
            }
        }
        else if (client.sm.id && client.sm.allowResume) {
            client.sm.resume();
        }
        else {
            client.off('sm', smHandler);
            done();
        }
    };
    client.registerFeature('streamManagement', 200, smacks);
    client.registerFeature('streamManagement', 500, smacks);
    client.registerFeature('clientStateIndication', 400, (features, cb) => {
        client.features.negotiated.clientStateIndication = true;
        cb();
    });
}
exports.default = default_1;
