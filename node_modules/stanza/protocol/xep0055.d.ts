import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { DataForm } from './';
declare module './' {
    interface IQPayload {
        search?: Search;
    }
}
export interface Search {
    instructions?: string;
    givenName?: string;
    familyName?: string;
    nick?: string;
    email?: string;
    items?: SearchResultItem[];
    form?: DataForm;
}
export interface SearchResultItem {
    jid?: JID;
    givenName?: string;
    familyName?: string;
    nick?: string;
    email?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
