import { CoreSchemaMetaSchema as JSONSchema } from "@json-schema-tools/meta-schema";
import { languageSafeName } from "../utils";

export interface TypeIntermediateRepresentation {
  macros?: string;
  prefix?: string;
  typing: string;
  documentationComment?: string;
}

/**
 * Base class for all code generators.
 */
export abstract class CodeGen {
  constructor(protected schema: JSONSchema) { }

  /**
   * Given a schema, it will generate code for both the schema and the schemas in its definitions section
   */
  public transpile() {
    const rootSchemaTypes = this.generate(this.schema, this.toIR(this.schema));
    const defsSchemaTypes: string[] = [];
    if (this.schema.definitions) {
      Object
        .entries(this.schema.definitions)
        .filter(([n]: [string, any]) => n !== this.schema.title)
        .forEach(([n, schema]: [string, any]) => defsSchemaTypes.push(this.generate(schema, this.toIR(schema))));
    }

    return [
      ...defsSchemaTypes,
      rootSchemaTypes,
    ].join("\n").trim();
  }

  /**
   * Generic title transform that gives a title without special characters or spaces. It may be overriden if
   * this implementation does not suffice.
   */
  public getSafeTitle(title: string): string {
    return languageSafeName(title);
  }

  public getCodePrefix(): string { return ""; }

  protected abstract generate(s: JSONSchema, ir: TypeIntermediateRepresentation): string;

  protected abstract handleBoolean(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleNull(schema: JSONSchema): TypeIntermediateRepresentation;

  protected abstract handleNumber(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleInteger(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleNumericalEnum(s: JSONSchema): TypeIntermediateRepresentation;

  protected abstract handleString(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleStringEnum(s: JSONSchema): TypeIntermediateRepresentation;

  protected abstract handleOrderedArray(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleUnorderedArray(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleUntypedArray(schema: JSONSchema): TypeIntermediateRepresentation;

  protected abstract handleObject(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleUntypedObject(schema: JSONSchema): TypeIntermediateRepresentation;

  protected abstract handleAnyOf(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleAllOf(schema: JSONSchema): TypeIntermediateRepresentation;
  protected abstract handleOneOf(schema: JSONSchema): TypeIntermediateRepresentation;

  protected abstract handleUntyped(s: JSONSchema): TypeIntermediateRepresentation;

  protected refToTitle(schema: JSONSchema) {
    if (schema.$ref === undefined) {
      throw new Error("the Subschemas of the schema must use $ref. Inline subschemas are not allowed.");
    }
    return schema.$ref.replace("#/definitions/", "");
  }

  protected getJoinedSafeTitles(schemas: JSONSchema[], seperator = ", ") {
    return schemas.map(this.refToTitle).map(this.getSafeTitle.bind(this)).join(seperator);
  }

  private toIR(s: JSONSchema): TypeIntermediateRepresentation {
    switch (s.type instanceof Array ? s.type[0] : s.type) {
      case "boolean": return this.handleBoolean(s);

      case "null": return this.handleNull(s);

      case "number":
        if (s.enum) { return this.handleNumericalEnum(s); }
        return this.handleNumber(s);

      case "integer":
        if (s.enum) { return this.handleNumericalEnum(s); }
        return this.handleInteger(s);

      case "string":
        if (s.enum) { return this.handleStringEnum(s); }
        return this.handleString(s);

      case "array":
        if (s.items instanceof Array) { return this.handleOrderedArray(s); }
        if (s.items !== undefined) { return this.handleUnorderedArray(s); }
        return this.handleUntypedArray(s);

      case "object":
        if (s.properties === undefined) { return this.handleUntypedObject(s); }
        return this.handleObject(s);

      default:
        if (s.anyOf) { return this.handleAnyOf(s); }
        if (s.oneOf) { return this.handleOneOf(s); }
        if (s.allOf) { return this.handleAllOf(s); }
        return this.handleUntyped(s);
    }
  }

}
