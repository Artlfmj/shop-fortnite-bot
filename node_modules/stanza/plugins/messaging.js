"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const JID = tslib_1.__importStar(require("../JID"));
const Namespaces_1 = require("../Namespaces");
const ACK_TYPES = new Set(['chat', 'headline', 'normal']);
const ALLOWED_CHAT_STATE_TYPES = new Set(['chat', 'groupchat', 'normal']);
const isReceivedCarbon = (msg) => !!msg.carbon && msg.carbon.type === 'received';
const isSentCarbon = (msg) => !!msg.carbon && msg.carbon.type === 'sent';
const isChatState = (msg) => !!msg.chatState;
const isReceiptMessage = (msg) => !!msg.receipt;
const hasRTT = (msg) => !!msg.rtt;
const isCorrection = (msg) => !!msg.replace;
const isMarkable = (msg, client) => msg.marker && msg.marker.type === 'markable' && client.config.chatMarkers !== false;
const isFormsMessage = (msg) => !!msg.forms && msg.forms.length > 0;
async function toggleCarbons(client, action) {
    await client.sendIQ({
        carbons: {
            action
        },
        type: 'set'
    });
}
function sendMarker(client, msg, marker) {
    if (isMarkable(msg, client)) {
        const to = msg.type === 'groupchat' ? JID.toBare(msg.from) : msg.from;
        client.sendMessage({
            body: '',
            marker: {
                id: msg.id,
                type: marker
            },
            to,
            type: msg.type
        });
    }
}
function default_1(client) {
    client.disco.addFeature(Namespaces_1.NS_ATTENTION_0);
    client.disco.addFeature(Namespaces_1.NS_CHAT_MARKERS_0);
    client.disco.addFeature(Namespaces_1.NS_CHAT_STATES);
    client.disco.addFeature(Namespaces_1.NS_CORRECTION_0);
    client.disco.addFeature(Namespaces_1.NS_RECEIPTS);
    client.disco.addFeature(Namespaces_1.NS_RTT_0);
    client.enableCarbons = () => toggleCarbons(client, 'enable');
    client.disableCarbons = () => toggleCarbons(client, 'disable');
    client.markReceived = (msg) => sendMarker(client, msg, 'received');
    client.markDisplayed = (msg) => sendMarker(client, msg, 'displayed');
    client.markAcknowledged = (msg) => sendMarker(client, msg, 'acknowledged');
    client.getAttention = (jid, opts = {}) => {
        return client.sendMessage({
            ...opts,
            requestingAttention: true,
            to: jid,
            type: 'headline'
        });
    };
    client.on('message', msg => {
        if (msg.carbon && JID.equalBare(msg.from, client.jid)) {
            const forwardedMessage = msg.carbon.forward.message;
            if (!forwardedMessage.delay) {
                forwardedMessage.delay = msg.carbon.forward.delay || {
                    timestamp: new Date(Date.now())
                };
            }
            if (isReceivedCarbon(msg)) {
                client.emit('carbon:received', msg);
                client.emit('message', forwardedMessage);
            }
            if (isSentCarbon(msg)) {
                client.emit('carbon:sent', msg);
                client.emit('message:sent', forwardedMessage, true);
            }
        }
        if (isFormsMessage(msg)) {
            client.emit('dataform', msg);
        }
        if (msg.requestingAttention) {
            client.emit('attention', msg);
        }
        if (hasRTT(msg)) {
            client.emit('rtt', msg);
        }
        if (isCorrection(msg)) {
            client.emit('replace', msg);
        }
        if (isChatState(msg) && ALLOWED_CHAT_STATE_TYPES.has(msg.type || 'normal')) {
            client.emit('chat:state', msg);
        }
        if (isMarkable(msg, client)) {
            client.markReceived(msg);
        }
        if (msg.marker && msg.marker.type !== 'markable') {
            client.emit(`marker:${msg.marker.type}`, msg);
        }
        if (isReceiptMessage(msg)) {
            const sendReceipts = client.config.sendReceipts !== false;
            if (sendReceipts &&
                ACK_TYPES.has(msg.type || 'normal') &&
                msg.receipt.type === 'request') {
                client.sendMessage({
                    id: msg.id,
                    receipt: {
                        id: msg.id,
                        type: 'received'
                    },
                    to: msg.from,
                    type: msg.type
                });
            }
            if (msg.receipt.type === 'received') {
                client.emit('receipt', msg);
            }
        }
    });
}
exports.default = default_1;
