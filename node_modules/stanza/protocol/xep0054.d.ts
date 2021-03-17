/// <reference types="node" />
import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { NS_VCARD_TEMP } from '../Namespaces';
declare module './' {
    interface IQPayload {
        vcard?: VCardTemp;
    }
}
export interface VCardTemp {
    format?: typeof NS_VCARD_TEMP;
    fullName?: string;
    name?: VCardTempName;
    records?: VCardTempRecord[];
}
export interface VCardTempName {
    family?: string;
    given?: string;
    middle?: string;
    prefix?: string;
    suffix?: string;
}
export interface VCardTempPhoto {
    type: 'photo';
    data?: Buffer;
    mediaType?: string;
    url?: string;
}
export interface VCardTempLogo {
    type: 'photo';
    data?: Buffer;
    mediaType?: string;
    url?: string;
}
export interface VCardTempAddress {
    type: 'address';
}
export interface VCardTempAddressLabel {
    type: 'addressLabel';
}
export interface VCardTempPhone {
    type: 'tel';
}
export interface VCardTempEmail {
    type: 'email';
    value?: string;
    home?: boolean;
    preferred?: boolean;
    work?: boolean;
}
export interface VCardTempJID {
    type: 'jid';
    jid?: JID;
}
export interface VCardTempCategories {
    type: 'categories';
    value: string[];
}
declare type VCardFieldType = 'nickname' | 'birthday' | 'jid' | 'url' | 'title' | 'role' | 'description' | 'sort' | 'revision' | 'uid' | 'productId' | 'note' | 'timezone';
export interface VCardTempField {
    type: VCardFieldType;
    value: string;
}
export interface VCardTempOrg {
    type: 'organization';
    value?: string;
    unit?: string;
}
export declare type VCardTempRecord = VCardTempPhoto | VCardTempAddress | VCardTempAddressLabel | VCardTempPhone | VCardTempEmail | VCardTempOrg | VCardTempLogo | VCardTempCategories;
declare const Protocol: DefinitionOptions[];
export default Protocol;
