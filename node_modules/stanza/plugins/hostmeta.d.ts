import { Agent } from '../';
import * as JXT from '../jxt';
declare module '../' {
    interface Agent {
        discoverBindings(server: string): Promise<{
            [key: string]: string[];
        }>;
    }
}
export declare function getHostMeta(registry: JXT.Registry, opts: string | {
    host?: string;
    json?: boolean;
    ssl?: boolean;
    xrd?: boolean;
}): Promise<any>;
export default function (client: Agent, stanzas: JXT.Registry): void;
