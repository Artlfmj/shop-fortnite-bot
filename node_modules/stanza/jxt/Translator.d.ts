import { ChildTranslator, DefinitionUpdateOptions, Exporter, FieldName, Importer, JSONData, PathContext, TranslationContext, Type, XName } from './Definitions';
import XMLElement from './Element';
export default class Translator {
    placeholder: boolean;
    typeField: FieldName;
    typeValues: Map<XName, Type>;
    typeOrders: Map<Type, number>;
    defaultType: Type;
    languageField: FieldName;
    importers: Map<XName, Importer>;
    exporters: Map<Type, Exporter>;
    children: Map<FieldName, ChildTranslator>;
    childrenIndex: Map<XName, FieldName>;
    implicitChildren: Set<XName>;
    contexts: Map<string, PathContext>;
    parents: Set<Translator>;
    constructor();
    addChild(name: FieldName, translator: Translator, multiple?: boolean, selector?: string, implicit?: string): void;
    addContext(path: string, selector: string | undefined, field: FieldName | undefined, xid: XName, value: Type, implied: boolean): void;
    getChild(name: FieldName): Translator | undefined;
    getImportKey(xml: XMLElement): string | undefined;
    updateDefinition(opts: DefinitionUpdateOptions): void;
    replaceWith(replacement: Translator): void;
    import(xml: XMLElement, parentContext: TranslationContext): JSONData | undefined;
    export(data: JSONData, parentContext: TranslationContext): XMLElement | undefined;
    private resolveCollision;
}
