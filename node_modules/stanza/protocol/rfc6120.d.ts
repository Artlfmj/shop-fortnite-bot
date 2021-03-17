/// <reference types="node" />
import { IQType, MessageType, PresenceType, SASLFailureCondition, StanzaErrorCondition, StreamErrorCondition, StreamType } from '../Constants';
import { DefinitionOptions, LanguageSet } from '../jxt';
declare module './' {
    interface Stream {
        type?: 'stream' | 'open' | 'close';
        to?: string;
        from?: string;
        id?: string;
        version?: string;
        lang?: string;
    }
    interface StreamFeatures {
        sasl?: SASLFeature;
        tls?: TLS;
        bind?: Bind;
    }
    interface StreamError {
        condition: StreamErrorCondition;
        text?: string;
        alternateLanguageText?: LanguageSet<string>;
        seeOtherHost?: string;
    }
    interface StanzaError {
        by?: string;
        type?: string;
        condition: StanzaErrorCondition;
        text?: string;
        alternateLanguageText?: LanguageSet<string>;
        redirect?: string;
        gone?: string;
    }
    interface IQPayload {
        bind?: Bind;
    }
    interface IQBase {
        to?: string;
        from?: string;
        id?: string;
        type: IQType;
        lang?: string;
        streamType?: StreamType;
        error?: StanzaError;
        payloadType?: keyof IQPayload | 'invalid-payload-count' | 'unknown-payload';
    }
    interface IQ extends IQBase, IQPayload {
    }
    interface ReceivedIQ extends IQ {
        to: string;
        from: string;
        id: string;
    }
    interface ReceivedIQGet extends ReceivedIQ {
        type: typeof IQType.Get;
    }
    interface ReceivedIQSet extends ReceivedIQ {
        type: typeof IQType.Set;
    }
    interface Message {
        to?: string;
        from?: string;
        id?: string;
        lang?: string;
        streamType?: StreamType;
        type?: MessageType;
        error?: StanzaError;
    }
    interface ReceivedMessage extends Message {
        to: string;
        from: string;
    }
    interface Presence {
        to?: string;
        from?: string;
        id?: string;
        lang?: string;
        streamType?: StreamType;
        type?: PresenceType;
        error?: StanzaError;
    }
    interface ReceivedPresence extends Presence {
        to: string;
        from: string;
    }
    interface SASLFeature {
        mechanisms: string[];
    }
    interface SASLAbort {
        type: 'abort';
    }
    interface SASLChallengeResponse {
        type: 'challenge' | 'response';
        value?: Buffer;
    }
    interface SASLSuccess {
        type: 'success';
        value?: Buffer;
    }
    interface SASLAuth {
        type: 'auth';
        mechanism: string;
        value?: Buffer;
    }
    interface SASLFailure {
        type: 'failure';
        condition: SASLFailureCondition;
        text?: string;
        alternateLanguageText?: LanguageSet<string>;
    }
    type SASL = SASLAbort | SASLChallengeResponse | SASLSuccess | SASLFailure | SASLAuth;
    interface TLS {
        type?: 'start' | 'proceed' | 'failure';
        required?: boolean;
    }
    interface Bind {
        jid?: string;
        resource?: string;
    }
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
