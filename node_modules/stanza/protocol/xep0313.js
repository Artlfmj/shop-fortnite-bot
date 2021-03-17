"use strict";
// ====================================================================
// XEP-0313: Message Archive Management
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0313.html
// Version: 0.6.1 (2017-02-22)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.addAlias(Namespaces_1.NS_DATAFORM, 'x', ['iq.archive.form']),
    jxt_1.addAlias(Namespaces_1.NS_FORWARD_0, 'forwarded', ['message.archive.item']),
    jxt_1.addAlias(Namespaces_1.NS_RSM, 'set', ['iq.archive.paging']),
    {
        defaultType: 'query',
        element: 'query',
        fields: {
            queryId: jxt_1.attribute('queryid')
        },
        namespace: Namespaces_1.NS_MAM_2,
        path: 'iq.archive',
        type: 'query',
        typeField: 'type'
    },
    {
        element: 'fin',
        fields: {
            complete: jxt_1.booleanAttribute('complete'),
            stable: jxt_1.booleanAttribute('stable')
        },
        namespace: Namespaces_1.NS_MAM_2,
        path: 'iq.archive',
        type: 'result'
    },
    {
        element: 'prefs',
        fields: {
            default: jxt_1.attribute('default')
        },
        namespace: Namespaces_1.NS_MAM_2,
        path: 'iq.archive',
        type: 'preferences'
    },
    {
        element: 'result',
        fields: {
            id: jxt_1.attribute('id'),
            queryId: jxt_1.attribute('queryid')
        },
        namespace: Namespaces_1.NS_MAM_2,
        path: 'message.archive'
    }
];
exports.default = Protocol;
