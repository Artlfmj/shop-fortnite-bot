import { Agent } from '../';
import * as Jingle from '../jingle';
import { ExternalServiceCredentials, ExternalServiceList, IQ, Jingle as JingleRequest } from '../protocol';
declare module '../' {
    interface Agent {
        jingle: Jingle.SessionManager;
        discoverICEServers(): Promise<RTCIceServer[]>;
        getServices(jid: string, type?: string): Promise<ExternalServiceList>;
        getServiceCredentials(jid: string, host: string, type?: string, port?: number): Promise<ExternalServiceCredentials>;
    }
    interface AgentEvents {
        'iq:set:jingle': IQ & {
            jingle: JingleRequest;
        };
        'jingle:created': Jingle.Session;
        'jingle:outgoing': Jingle.Session;
        'jingle:incoming': Jingle.Session;
        'jingle:terminated': (session: Jingle.Session, reason?: JingleRequest['reason']) => void;
        'jingle:mute': (session: Jingle.Session, info: JingleRequest['info']) => void;
        'jingle:unmute': (session: Jingle.Session, info: JingleRequest['info']) => void;
        'jingle:hold': (session: Jingle.Session, info?: JingleRequest['info']) => void;
        'jingle:resumed': (session: Jingle.Session, info?: JingleRequest['info']) => void;
        'jingle:ringing': (session: Jingle.Session, info?: JingleRequest['info']) => void;
    }
}
export default function (client: Agent): void;
