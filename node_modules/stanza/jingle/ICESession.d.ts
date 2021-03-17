import { JingleReasonCondition } from '../Constants';
import { Jingle, JingleIce, JingleReason } from '../protocol';
import BaseSession, { ActionCallback } from './Session';
export default class ICESession extends BaseSession {
    pc: RTCPeerConnection;
    bitrateLimit: number;
    maximumBitrate?: number;
    currentBitrate?: number;
    maxRelayBandwidth: number;
    candidateBuffer: Array<{
        sdpMLineIndex: number;
        sdpMid: string;
        candidate: string;
    } | null>;
    transportType: JingleIce['transportType'];
    restartingIce: boolean;
    private _maybeRestartingIce;
    private _firstTimeConnected?;
    constructor(opts: any);
    end(reason?: JingleReasonCondition | JingleReason, silent?: boolean): void;
    restartIce(): Promise<void>;
    setMaximumBitrate(maximumBitrate: number): Promise<void>;
    protected onTransportInfo(changes: Jingle, cb: ActionCallback): Promise<void>;
    protected onSessionAccept(changes: Jingle, cb: ActionCallback): Promise<void>;
    protected onSessionTerminate(changes: Jingle, cb: ActionCallback): void;
    protected onIceCandidate(e: RTCPeerConnectionIceEvent): void;
    protected onIceEndOfCandidates(): void;
    protected onIceStateChange(): void;
    protected processBufferedCandidates(): Promise<void>;
    private restrictRelayBandwidth;
    private maybeRestartIce;
}
