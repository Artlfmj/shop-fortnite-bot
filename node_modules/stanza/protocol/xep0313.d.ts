import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { DataForm, Forward, Paging } from './';
declare module './' {
    interface Message {
        archive?: MAMResult;
    }
    interface IQPayload {
        archive?: MAMQuery | MAMFin | MAMPrefs;
    }
}
export interface MAMQuery {
    type?: 'query';
    node?: string;
    form?: DataForm;
    queryId?: string;
    paging?: Paging;
}
export interface MAMFin {
    type: 'result';
    complete?: boolean;
    stable?: boolean;
    results?: MAMResult[];
    paging?: Paging;
}
export interface MAMPrefs {
    type: 'preferences';
    default?: 'always' | 'never' | 'roster';
    always?: JID[];
    never?: JID[];
}
export interface MAMResult {
    queryId: string;
    id: string;
    item: Forward;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
