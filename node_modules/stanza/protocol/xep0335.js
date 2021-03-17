"use strict";
// ====================================================================
// XEP-0335: JSON Containers
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0335.html
// Version: 0.1 (2013-10-25)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendMessage({
        json: jxt_1.childJSON(Namespaces_1.NS_JSON_0, 'json')
    }),
    {
        aliases: jxt_1.pubsubItemContentAliases(),
        element: 'json',
        fields: {
            json: jxt_1.textJSON()
        },
        namespace: Namespaces_1.NS_JSON_0,
        type: Namespaces_1.NS_JSON_0
    }
];
exports.default = Protocol;
