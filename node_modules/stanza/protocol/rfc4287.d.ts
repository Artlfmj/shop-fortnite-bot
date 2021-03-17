import { DefinitionOptions } from '../jxt';
import { NS_ATOM } from '../Namespaces';
import { PubsubItemContent } from './';
export interface AtomEntry extends PubsubItemContent {
    itemType?: typeof NS_ATOM;
    title?: string;
    summary?: AtomSummary;
    id?: string;
    published?: Date;
    updated?: Date;
    links?: AtomLink[];
}
export interface AtomTitle {
    text?: string;
    type?: 'text';
}
export interface AtomSummary {
    text?: string;
    type?: 'text';
}
export interface AtomLink {
    href?: string;
    mediaType?: string;
    rel?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
