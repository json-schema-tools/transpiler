import { JSONSchema, Enum, JSONSchemaObject } from "@json-schema-tools/meta-schema";
import { CodeGen, CodeGenOptions, TypeIntermediateRepresentation } from "./codegen";
import { enumIdentifierFromTitle } from "./rust";

/**
 * Whether the schema becomes a named Java declaration (a class or enum).
 * Everything else (primitives, arrays, maps, unions) is inlined at use sites
 * since Java has no type-alias mechanism.
 */
const isNamedDeclaration = (s: JSONSchema): boolean => {
  if (s === true || s === false) {
    return false;
  }
  const isObject = s.type === "object" && s.properties !== undefined;
  const isStringEnum = s.type === "string" && s.enum !== undefined;
  return isObject || isStringEnum;
};

/**
 * Java code generator.
 *
 * Java has no type-alias mechanism, so primitive schemas are always inlined
 * as their boxed builtin types (this generator forces `inlinePrimitiveTypes`).
 * Objects become Jackson-annotated POJOs.
 */
export default class Java extends CodeGen {
  constructor(schema: JSONSchema, options: CodeGenOptions = {}) {
    super(schema, { ...options, inlinePrimitiveTypes: true });
  }

  public getCodePrefix(): string {
    return "";
  }

  /**
   * Java has no type aliases, so only objects (classes) and string enums get
   * named declarations. Everything else is inlined at use sites.
   */
  protected shouldEmit(s: JSONSchema): boolean {
    return isNamedDeclaration(s);
  }

  protected refToTypeName(schema: JSONSchema): string {
    if (schema !== true && schema !== false && schema.$ref !== undefined) {
      const title = schema.$ref.replace("#/definitions/", "");
      const definitions = (this.schema as JSONSchemaObject).definitions as
        | { [key: string]: JSONSchema }
        | undefined;
      const def = definitions === undefined ? undefined : definitions[title];
      if (def !== undefined && !isNamedDeclaration(def)) {
        const ir = this.toIR(def);
        if (ir.imports) {
          ir.imports.forEach((imp) => this.addImport(imp));
        }
        return ir.typing;
      }
    }
    return this.getSafeTitle(this.refToTitle(schema));
  }

  protected generate(s: JSONSchema, ir: TypeIntermediateRepresentation): string {
    if (ir.typing === "") {
      return "";
    }
    return [
      ir.documentationComment,
      ir.typing,
    ].filter((part) => part !== undefined && part !== "").join("\n");
  }

  protected handleBoolean(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), typing: "Boolean" };
  }

  protected handleNull(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), typing: "Object" };
  }

  protected handleNumber(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), typing: "Double" };
  }

  protected handleInteger(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), typing: "Long" };
  }

  protected handleNumericalEnum(s: JSONSchemaObject): TypeIntermediateRepresentation {
    this.warnNotWellSupported("numericalEnum");
    return this.handleUntyped(s);
  }

  protected handleString(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), typing: "String" };
  }

  protected handleStringEnum(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const sEnum = s.enum as Enum;
    const constants = sEnum
      .filter((enumString: unknown): enumString is string => typeof enumString === "string")
      .map((enumString: string) => {
        const identifier = enumIdentifierFromTitle(enumString).toUpperCase();
        return `    @JsonProperty("${enumString}")\n    ${identifier}("${enumString}")`;
      });
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: [
        `public enum ${title} {`,
        ...constants.join(",\n").split("\n"),
        "    ;",
        "",
        "    private final String value;",
        "",
        `    ${title}(String value) {`,
        "        this.value = value;",
        "    }",
        "",
        "    @JsonValue",
        "    public String getValue() {",
        "        return value;",
        "    }",
        "}",
      ].join("\n"),
      imports: [
        "import com.fasterxml.jackson.annotation.JsonProperty;",
        "import com.fasterxml.jackson.annotation.JsonValue;",
      ],
    };
  }

  protected handleOrderedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    this.warnNotWellSupported("orderedArray");
    return this.handleUntypedArray(s);
  }

  protected handleUnorderedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const itemsTitle = this.refToTypeName(s.items as JSONSchema);
    return {
      documentationComment: this.buildDocs(s),
      typing: `List<${itemsTitle}>`,
      imports: ["import java.util.List;"],
    };
  }

  protected handleUntypedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      typing: "List<Object>",
      imports: ["import java.util.List;"],
    };
  }

  protected handleObject(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const sProps = s.properties as { [k: string]: JSONSchema };
    const propKeys = Object.keys(sProps);
    const fields = propKeys.map((key) => {
      const propSchema = sProps[key] as JSONSchema;
      const fieldName = this.fieldName(key);
      const fieldType = this.refToTypeName(propSchema);
      return `    @JsonProperty("${key}")\n    private ${fieldType} ${fieldName};`;
    });
    const accessors = propKeys.map((key) => {
      const propSchema = sProps[key] as JSONSchema;
      const fieldName = this.fieldName(key);
      const methodSuffix = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      const fieldType = this.refToTypeName(propSchema);
      return [
        `    public ${fieldType} get${methodSuffix}() {`,
        `        return ${fieldName};`,
        "    }",
        "",
        `    public void set${methodSuffix}(${fieldType} ${fieldName}) {`,
        `        this.${fieldName} = ${fieldName};`,
        "    }",
      ].join("\n");
    });

    const title = this.getSafeTitle(s.title as string);
    const classBody = [
      `public class ${title} {`,
      ...fields,
      "",
      ...accessors.join("\n\n").split("\n"),
      "}",
    ].join("\n");

    if (s.additionalProperties) {
      this.warnNotWellSupported("ObjectsWithAdditionalProperties");
    }

    return {
      documentationComment: this.buildDocs(s),
      typing: classBody,
      imports: ["import com.fasterxml.jackson.annotation.JsonProperty;"],
    };
  }

  protected handleUntypedObject(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      typing: "Map<String, Object>",
      imports: ["import java.util.Map;"],
    };
  }

  protected handleAnyOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    this.warnNotWellSupported("anyOf");
    return this.handleUntyped(s);
  }

  protected handleAllOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    this.warnNotWellSupported("allOf");
    return this.handleUntyped(s);
  }

  protected handleOneOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    this.warnNotWellSupported("oneOf");
    return this.handleUntyped(s);
  }

  protected handleConstantBool(): TypeIntermediateRepresentation {
    return {
      documentationComment: undefined,
      typing: "Object",
    };
  }

  protected handleUntyped(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      typing: "Object",
    };
  }

  private fieldName(key: string): string {
    const safe = this.getSafeTitle(key);
    return safe.charAt(0).toLowerCase() + safe.slice(1);
  }

  private warnNotWellSupported(typing: string): void {
    console.warn(`In Java, ${typing} is not well supported.`);
  }

  private buildDocs(s: JSONSchemaObject): string | undefined {
    if (s.description) {
      return [
        "/**",
        ` * ${s.description}`,
        " */",
      ].join("\n");
    }
    return undefined;
  }
}
