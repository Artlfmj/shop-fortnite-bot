"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Element_1 = tslib_1.__importDefault(require("./Element"));
exports.XMLElement = Element_1.default;
const Registry_1 = tslib_1.__importDefault(require("./Registry"));
exports.Registry = Registry_1.default;
const Translator_1 = tslib_1.__importDefault(require("./Translator"));
exports.Translator = Translator_1.default;
tslib_1.__exportStar(require("./Definitions"), exports);
tslib_1.__exportStar(require("./Types"), exports);
tslib_1.__exportStar(require("./Helpers"), exports);
var Parser_1 = require("./Parser");
exports.Parser = Parser_1.default;
exports.parse = Parser_1.parse;
var StreamParser_1 = require("./StreamParser");
exports.StreamParser = StreamParser_1.default;
function define(definitions) {
    return (registry) => {
        registry.define(definitions);
    };
}
exports.define = define;
