import { Agent, Transport, TransportConfig } from '../';
import StreamManagement from '../helpers/StreamManagement';
import { Registry } from '../jxt';
import { Stream } from '../protocol';
export default class WSConnection implements Transport {
    hasStream?: boolean;
    stream?: Stream;
    private client;
    private config;
    private sm;
    private stanzas;
    private closing;
    private sendQueue;
    private conn?;
    private parser?;
    constructor(client: Agent, sm: StreamManagement, stanzas: Registry);
    connect(opts: TransportConfig): void;
    disconnect(): void;
    send(dataOrName: string, data?: object): void;
    restart(): void;
    private startHeader;
    private closeHeader;
}
