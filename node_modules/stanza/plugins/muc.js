"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Constants_1 = require("../Constants");
const JID = tslib_1.__importStar(require("../JID"));
const Namespaces_1 = require("../Namespaces");
function isMUCPresence(pres) {
    return !!pres.muc;
}
function default_1(client) {
    client.disco.addFeature(Namespaces_1.NS_MUC);
    client.disco.addFeature(Namespaces_1.NS_MUC_DIRECT_INVITE);
    client.disco.addFeature(Namespaces_1.NS_HATS_0);
    client.joinedRooms = new Map();
    client.joiningRooms = new Map();
    function rejoinRooms() {
        const oldJoiningRooms = client.joiningRooms;
        client.joiningRooms = new Map();
        for (const [room, nick] of oldJoiningRooms) {
            client.joinRoom(room, nick);
        }
        const oldJoinedRooms = client.joinedRooms;
        client.joinedRooms = new Map();
        for (const [room, nick] of oldJoinedRooms) {
            client.joinRoom(room, nick);
        }
    }
    client.on('session:started', rejoinRooms);
    client.on('stream:management:resumed', rejoinRooms);
    client.on('message', msg => {
        if (msg.type === 'groupchat' && msg.hasSubject) {
            client.emit('muc:topic', {
                from: msg.from,
                room: JID.toBare(msg.from),
                topic: msg.subject || ''
            });
            return;
        }
        if (!msg.muc) {
            return;
        }
        if (msg.muc.type === 'direct-invite' || (!msg.muc.invite && msg.legacyMUC)) {
            const invite = msg.muc.type === 'direct-invite' ? msg.muc : msg.legacyMUC;
            client.emit('muc:invite', {
                from: msg.from,
                password: invite.password,
                reason: invite.reason,
                room: invite.jid,
                thread: invite.thread,
                type: 'direct'
            });
            return;
        }
        if (msg.muc.invite) {
            client.emit('muc:invite', {
                from: msg.muc.invite[0].from,
                password: msg.muc.password,
                reason: msg.muc.invite[0].reason,
                room: msg.from,
                thread: msg.muc.invite[0].thread,
                type: 'mediated'
            });
            return;
        }
        if (msg.muc.decline) {
            client.emit('muc:declined', {
                from: msg.muc.decline.from,
                reason: msg.muc.decline.reason,
                room: msg.from
            });
            return;
        }
        client.emit('muc:other', msg);
    });
    client.on('presence', pres => {
        const room = JID.toBare(pres.from);
        if (client.joiningRooms.has(room) && pres.type === 'error') {
            client.joiningRooms.delete(room);
            client.emit('muc:failed', pres);
            client.emit('muc:error', pres);
            return;
        }
        if (!isMUCPresence(pres)) {
            return;
        }
        const isSelf = pres.muc.statusCodes && pres.muc.statusCodes.indexOf(Constants_1.MUCStatusCode.SelfPresence) >= 0;
        if (pres.type === 'error') {
            client.emit('muc:error', pres);
            return;
        }
        if (pres.type === 'unavailable') {
            client.emit('muc:unavailable', pres);
            if (isSelf) {
                client.emit('muc:leave', pres);
                client.joinedRooms.delete(room);
            }
            if (pres.muc.destroy) {
                client.emit('muc:destroyed', {
                    newRoom: pres.muc.destroy.jid,
                    password: pres.muc.destroy.password,
                    reason: pres.muc.destroy.reason,
                    room
                });
            }
            return;
        }
        client.emit('muc:available', pres);
        if (isSelf && !client.joinedRooms.has(room)) {
            client.emit('muc:join', pres);
            client.joinedRooms.set(room, JID.getResource(pres.from));
            client.joiningRooms.delete(room);
        }
    });
    client.joinRoom = (room, nick, opts = {}) => {
        room = JID.toBare(room);
        client.joiningRooms.set(room, nick);
        client.sendPresence({
            ...opts,
            muc: {
                ...opts.muc,
                type: 'join'
            },
            to: `${room}/${nick}`
        });
    };
    client.leaveRoom = (room, nick, opts = {}) => {
        client.sendPresence({
            ...opts,
            to: `${room}/${nick}`,
            type: 'unavailable'
        });
    };
    client.ban = (room, occupantRealJID, reason) => {
        return client.setRoomAffiliation(room, occupantRealJID, 'outcast', reason);
    };
    client.kick = (room, nick, reason) => {
        return client.setRoomRole(room, nick, 'none', reason);
    };
    client.invite = (room, opts = []) => {
        if (!Array.isArray(opts)) {
            opts = [opts];
        }
        client.sendMessage({
            muc: {
                invite: opts,
                type: 'info'
            },
            to: room
        });
    };
    client.directInvite = (room, to, opts = {}) => {
        client.sendMessage({
            muc: {
                ...opts,
                jid: room,
                type: 'direct-invite'
            },
            to
        });
    };
    client.declineInvite = (room, sender, reason) => {
        client.sendMessage({
            muc: {
                decline: {
                    reason,
                    to: sender
                },
                type: 'info'
            },
            to: room
        });
    };
    client.changeNick = (room, nick) => {
        client.sendPresence({
            to: `${JID.toBare(room)}/${nick}`
        });
    };
    client.setSubject = (room, subject) => {
        client.sendMessage({
            subject,
            to: room,
            type: 'groupchat'
        });
    };
    client.getReservedNick = async (room) => {
        try {
            const info = await client.getDiscoInfo(room, 'x-roomuser-item');
            const identity = info.identities[0];
            if (identity.name) {
                return identity.name;
            }
            else {
                throw new Error('No nickname reserved');
            }
        }
        catch (err) {
            throw new Error('No nickname reserved');
        }
    };
    client.requestRoomVoice = (room) => {
        client.sendMessage({
            forms: [
                {
                    fields: [
                        {
                            name: 'FORM_TYPE',
                            type: 'hidden',
                            value: 'http://jabber.org/protocol/muc#request'
                        },
                        {
                            name: 'muc#role',
                            type: 'text-single',
                            value: 'participant'
                        }
                    ],
                    type: 'submit'
                }
            ],
            to: room
        });
    };
    client.setRoomAffiliation = (room, occupantRealJID, affiliation, reason) => {
        return client.sendIQ({
            muc: {
                type: 'user-list',
                users: [
                    {
                        affiliation,
                        jid: occupantRealJID,
                        reason
                    }
                ]
            },
            to: room,
            type: 'set'
        });
    };
    client.setRoomRole = (room, nick, role, reason) => {
        return client.sendIQ({
            muc: {
                type: 'user-list',
                users: [
                    {
                        nick,
                        reason,
                        role
                    }
                ]
            },
            to: room,
            type: 'set'
        });
    };
    client.getRoomMembers = (room, opts = {}) => {
        return client.sendIQ({
            muc: {
                type: 'user-list',
                users: [opts]
            },
            to: room,
            type: 'get'
        });
    };
    client.getRoomConfig = async (room) => {
        const result = await client.sendIQ({
            muc: {
                type: 'configure'
            },
            to: room,
            type: 'get'
        });
        if (!result.muc.form) {
            throw new Error('No configuration form returned');
        }
        return result.muc.form;
    };
    client.configureRoom = (room, form = {}) => {
        return client.sendIQ({
            muc: {
                form: {
                    ...form,
                    type: 'submit'
                },
                type: 'configure'
            },
            to: room,
            type: 'set'
        });
    };
    client.destroyRoom = (room, opts = {}) => {
        return client.sendIQ({
            muc: {
                destroy: opts,
                type: 'configure'
            },
            to: room,
            type: 'set'
        });
    };
    client.getUniqueRoomName = async function (mucHost) {
        const result = await this.sendIQ({
            muc: {
                type: 'unique'
            },
            to: mucHost,
            type: 'get'
        });
        if (!result.muc.name) {
            throw new Error('No unique name returned');
        }
        return result.muc.name;
    };
    client.getBookmarks = async () => {
        const res = await client.getPrivateData('bookmarks');
        if (!res || !res.rooms) {
            return [];
        }
        return res.rooms;
    };
    client.setBookmarks = (bookmarks) => {
        return client.setPrivateData('bookmarks', {
            rooms: bookmarks
        });
    };
    client.addBookmark = async (bookmark) => {
        const mucs = await client.getBookmarks();
        const updated = [];
        let updatedExisting = false;
        for (const muc of mucs) {
            if (JID.equalBare(muc.jid, bookmark.jid)) {
                updated.push({
                    ...muc,
                    ...bookmark
                });
                updatedExisting = true;
            }
            else {
                updated.push(muc);
            }
        }
        if (!updatedExisting) {
            updated.push(bookmark);
        }
        return client.setBookmarks(updated);
    };
    client.removeBookmark = async (jid) => {
        const existingMucs = await client.getBookmarks();
        const updated = existingMucs.filter(muc => {
            return !JID.equalBare(muc.jid, jid);
        });
        return client.setBookmarks(updated);
    };
}
exports.default = default_1;
