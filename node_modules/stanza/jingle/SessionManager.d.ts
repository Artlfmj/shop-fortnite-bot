/// <reference types="node" />
import { EventEmitter } from 'events';
import { JingleReasonCondition } from '../Constants';
import { IQ, Jingle, JingleReason } from '../protocol';
import FileTransferSession from './FileTransferSession';
import MediaSession from './MediaSession';
import BaseSession from './Session';
export interface SessionManagerConfig {
    debug?: boolean;
    selfID?: string;
    bundlePolicy?: string;
    iceTransportPolicy?: string;
    rtcpMuxPolicy?: string;
    iceServers?: RTCIceServer[];
    sdpSemantics?: string;
    peerConnectionConfig?: {
        bundlePolicy?: string;
        iceTransportPolicy?: string;
        rtcpMuxPolicy?: string;
        sdpSemantics?: string;
    };
    peerConnectionConstraints?: any;
    performTieBreak?: (session: BaseSession, req: IQ & {
        jingle: Jingle;
    }) => boolean;
    prepareSession?: (opts: any, req?: IQ & {
        jingle: Jingle;
    }) => BaseSession | undefined;
}
export default class SessionManager extends EventEmitter {
    selfID?: string;
    sessions: {
        [key: string]: BaseSession;
    };
    peers: {
        [key: string]: BaseSession[];
    };
    iceServers: RTCIceServer[];
    config: SessionManagerConfig;
    performTieBreak: (session: BaseSession, req: IQ & {
        jingle: Jingle;
    }) => boolean;
    prepareSession: (opts: any, req?: IQ & {
        jingle: Jingle;
    }) => BaseSession | undefined;
    constructor(conf?: SessionManagerConfig);
    addICEServer(server: RTCIceServer | string): void;
    resetICEServers(): void;
    addSession<T extends BaseSession = BaseSession>(session: T): T;
    forgetSession(session: BaseSession): void;
    createMediaSession(peer: string, sid?: string, stream?: MediaStream): MediaSession;
    createFileTransferSession(peer: string, sid?: string): FileTransferSession;
    endPeerSessions(peer: string, reason?: JingleReasonCondition | JingleReason, silent?: boolean): void;
    endAllSessions(reason?: JingleReasonCondition | JingleReason, silent?: boolean): void;
    process(req: IQ & {
        jingle: Jingle;
    }): void;
    signal(session: BaseSession, data: IQ & {
        jingle: Jingle;
    }): void;
    private _createIncomingSession;
    private _sendError;
    private _log;
}
