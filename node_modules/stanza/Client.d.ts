/// <reference types="node" />
import { EventEmitter } from 'events';
import { Agent, AgentConfig, Transport } from './';
import StreamManagement from './helpers/StreamManagement';
import * as JXT from './jxt';
import * as SASL from './lib/sasl';
import { IQ, Message, Presence, StreamError } from './protocol';
export default class Client extends EventEmitter {
    jid: string;
    config: AgentConfig;
    sm: StreamManagement;
    transport?: Transport;
    stanzas: JXT.Registry;
    sessionStarted?: boolean;
    transports: {
        [key: string]: new (client: Agent, sm: StreamManagement, registry: JXT.Registry) => Transport;
    };
    sasl: SASL.Factory;
    constructor(opts?: AgentConfig);
    get stream(): import("./protocol").Stream | undefined;
    emit(name: string, ...args: any[]): boolean;
    use(pluginInit: boolean | ((agent: Agent, registry: JXT.Registry, config: AgentConfig) => void)): void;
    nextId(): string;
    getCredentials(): Promise<SASL.Credentials>;
    connect(): Promise<void>;
    disconnect(): void;
    send(name: string, data: object): void;
    sendMessage(data: Message): string;
    sendPresence(data?: Presence): string;
    sendIQ<T extends IQ = IQ, R extends IQ = T>(data: T): Promise<R>;
    sendIQResult(original: IQ, reply: Partial<IQ>): void;
    sendIQError(original: IQ, error: Partial<IQ>): void;
    sendStreamError(error: StreamError): void;
    private _getConfiguredCredentials;
    private _initConfig;
}
