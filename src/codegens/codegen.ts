import { JSONSchema, JSONSchemaObject, JSONSchemaBoolean } from "@json-schema-tools/meta-schema";
import { languageSafeName } from "../utils";

export interface TypeIntermediateRepresentation {
  macros?: string;
  prefix?: string;
  typing: string;
  documentationComment?: string;
  imports?: string[]
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

    if (this.schema === true || this.schema === false) {
      const ir = this.toIR(this.schema);
      return ir.typing.trim();
    }

    const imports = new Set();
    let rootSchemaTypes = "";
    if (this.schema.$ref === undefined) {
      this.schema.$ref = `#/definitions/${this.schema.title}`; // hack, i think dont need anymore

      const ir = this.toIR(this.schema);
      rootSchemaTypes = this.generate(this.schema, ir);
      if (ir.imports) { ir.imports.forEach((imp) => imports.add(imp)); }
      if (this.schema.$ref) { // hack
        delete this.schema.$ref; // hack
      } // hack
    }


    const defsSchemaTypes: string[] = [];
    if (this.schema.definitions !== undefined) {
      Object
        .entries(this.schema.definitions)
        .filter(([n]: [string, any]) => n !== (this.schema as JSONSchemaObject).title)
        .forEach(([n, schema]: [string, any]) => {
          const ir = this.toIR(schema);
          if (ir.imports) { ir.imports.forEach((imp) => imports.add(imp)); }
          if ((schema as any) === true || (schema as any) === false) {
            defsSchemaTypes.push(ir.typing);
            return;
          }

          defsSchemaTypes.push(this.generate(schema, ir));
        });
    }
    return [
      ...Array.from(imports),
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

  protected abstract handleBoolean(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleNull(schema: JSONSchemaObject): TypeIntermediateRepresentation;

  protected abstract handleNumber(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleInteger(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleNumericalEnum(s: JSONSchemaObject): TypeIntermediateRepresentation;

  protected abstract handleString(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleStringEnum(s: JSONSchemaObject): TypeIntermediateRepresentation;

  protected abstract handleOrderedArray(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleUnorderedArray(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleUntypedArray(schema: JSONSchemaObject): TypeIntermediateRepresentation;

  protected abstract handleObject(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleUntypedObject(schema: JSONSchemaObject): TypeIntermediateRepresentation;

  protected abstract handleAnyOf(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleAllOf(schema: JSONSchemaObject): TypeIntermediateRepresentation;
  protected abstract handleOneOf(schema: JSONSchemaObject): TypeIntermediateRepresentation;

  protected abstract handleConstantBool(s: JSONSchemaBoolean): TypeIntermediateRepresentation;
  protected abstract handleUntyped(s: JSONSchemaObject): TypeIntermediateRepresentation;

  protected refToTitle(schema: JSONSchema) {
    if (schema === true) {
      return "AlwaysTrue";
    }

    if (schema === false) {
      return "AlwaysFalse";
    }

    if (schema.$ref === undefined) {
      let stringed = "";
      try {
        stringed = JSON.stringify(schema);
      } catch (e) {
        stringed = `title: ${schema.title} - type: ${schema.type}`;
      }
      throw new Error(
        [
          "the Subschemas of the schema must use $ref. Inline subschemas are not allowed.",
          "the schema in question: ",
          stringed,
        ].join("\n"),
      );
    }
    return schema.$ref.replace("#/definitions/", "");
  }

  protected getJoinedSafeTitles(schemas: JSONSchema[], seperator = ", ") {
    return schemas
      .map(this.refToTitle)
      .map(this.getSafeTitle.bind(this))
      .join(seperator);
  }

  private toIR(s: JSONSchema): TypeIntermediateRepresentation {
    if (s === true || s === false) {
      return this.handleConstantBool(s);
    }

    switch (s.type) {
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
