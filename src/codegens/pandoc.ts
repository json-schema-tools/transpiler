
import { JSONSchema, Enum, JSONSchemaObject, Properties } from "@json-schema-tools/meta-schema";

import { CodeGen, TypeIntermediateRepresentation } from "./codegen";
import { getTitle } from "../utils";

export default class Pandoc extends CodeGen {

  protected generate(s: JSONSchemaObject, ir: TypeIntermediateRepresentation) {
    const base = this.generateBaseComponents(s);
    const genericConstraints = this.generateGenericConstraints(s);

    const str = [base];

    if (genericConstraints || ir.typing) {
      str.push("## Constraints");
      str.push("");
      if (genericConstraints) { str.push(genericConstraints); }
      if (ir.typing) { str.push(ir.typing); }
    }

    return str.join("\n");
  }

  protected handleBoolean(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "boolean" };
  }

  protected handleNull(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "null", documentationComment: this.buildDocs(s) };
  }

  protected handleNumber(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const str = [];

    if (s.enum) {
      str.push(" - **Must be one of**:");
      s.enum.forEach((e) => {
        str.push(`   + \`${e}\`.`);
      });
    }

    if (s.multipleOf) {
      str.push(` - **Must be a multiple of \`${s.multipleOf} (i.e. \`input\` / ${s.multipleOf})\` = y where y ∈ \mathbb{Z}.`);
    }

    if (s.minimum) {
      str.push(` - Must be **≥** to \`${s.minimum}\`.`);
    }
    if (s.exclusiveMinimum) {
      str.push(` - **Must be **>** \`${s.exclusiveMinimum}\`.`);
    }

    if (s.maximum) {
      str.push(` - **Must be **≤** to \`${s.maximum}\`.`);
    }

    if (s.exclusiveMaximum) {
      str.push(` - **Must be < to \`${s.exclusiveMaximum}\`.`);
    }

    return { typing: str.join("\n") };
  }

  protected handleInteger(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleNumber(s);
  }

  protected handleNumericalEnum(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleNumber(s);
  }

  protected handleString(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const str = [];

    if (s.enum) {
      str.push(" - **Must be one of**:");
      s.enum.forEach((e) => {
        str.push(`   + \`${e}\`.`);
      });
    }

    if (s.pattern) {
      str.push(` - **Must match the Regular Expression**: \`${s.pattern}\`.`);
    }

    if (s.minLength) {
      str.push(` - **Must be at least** \`${s.minLength}\` characters in length.`);
    }

    if (s.exclusiveMinLength) {
      str.push(` - **Must be more than** \`${s.exclusiveMinimum}\` characters in length.`);
    }

    if (s.maxLength) {
      str.push(` - **Must not be more than** \`${s.maxLength}\` characters in length.`);
    }

    if (s.exclusiveMaxLength) {
      str.push(` - **Must be less than** \`${s.exclusiveMaximum}\` characters in length.`);
    }

    return { typing: str.join("\n") };
  }

  protected handleStringEnum(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleString(s);
  }

  protected handleOrderedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const str = [];

    const title = s.title;

    if (s.minItems) {
      str.push(` - Must have at least ${s.minItems} items present. (i.e. |\`${title}\`| ≥ ${s.minItems}).`);
    }

    if (s.maxItems) {
      str.push(` - Must not have more than ${s.maxItems} items present. (i.e. |\`${title}\`| ≥ ${s.maxItems}).`);
    }

    if (s.uniqueItems) {
      str.push(" - Must not have duplicate values - all items in the array must be unique.");
    }

    if (s.contains) {
      const containsTitle = "TODO";
      const subStr = [" - Must contain "];

      if (s.minContains && s.maxContains) {
        subStr.push(`**between ${s.minContains} and ${s.maxContains}**`);
      } else if (s.minContains) {
        subStr.push(`**at least ${s.minContains}**`);
      } else if (s.maxContains) {
        subStr.push(`**at most ${s.minContains}**`);
      }

      subStr.push(`occurences of [${containsTitle}].`);

      str.push(subStr.join(""));
    }

    return { typing: str.join("\n") };
  }

  protected handleUnorderedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleOrderedArray(s);
  }

  protected handleUntypedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleUntyped(s);
  }

  protected handleObject(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const str = [];

    if (s.minProperties) {
      str.push(` - Must have **≥** \`${s.minProperties}\` properties (key/value pairs).`);
    }

    if (s.maxProperties) {
      str.push(` - Must have **≤** \`${s.maxProperties}\` properties (key/value pairs).`);
    }

    if (s.required) {
      str.push(` - **Required Properties**:`);
      s.required.forEach((r) => {
        str.push(`   + \`${r}\``);
      });
    }

    if (s.dependentRequired) {
      Object.entries(s.dependentRequired).forEach(([depReq, rs]: [string, any]) => {
        str.push(` - **Required when** \`${depReq}\` **is present**:`);
        rs.forEach((r: string) => {
          str.push(`   + \`${r}\``);
        });
      });
    }

    return { typing: str.join("\n") };
  }

  protected handleUntypedObject(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleUntyped(s);
  }

  protected handleAnyOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleUntyped(s);
  }

  protected handleAllOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleUntyped(s);
  }

  protected handleOneOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleUntyped(s);
  }

  protected handleConstantBool(s: JSONSchema): TypeIntermediateRepresentation {
    return { typing: "" };
  }

  protected handleUntyped(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { typing: "" };
  }

  private generateBaseComponents(schema: JSONSchemaObject): string {
    const str = [
      `# ${schema.title}`,
      "",
    ];

    let t = "";
    if (schema.anyOf) {
      t = [
        "Must be any of the following (at least one match):",
        schema.anyOf.map((s) => ` - ${this.refToTitle(s as JSONSchemaObject)}`),
      ].join("\n");
    } else if (schema.oneOf) {
      t = [
        "Must exactly one of the following:",
        schema.oneOf.map((s) => ` - [${this.refToTitle(s as JSONSchemaObject)}]`),
      ].join("\n");
    } else if (schema.allOf) {
      t = [
        "Must be valid against all of the following:",
        schema.allOf.map((s) => ` - [${this.refToTitle(s as JSONSchemaObject)}]`),
      ].join("\n");
    } else {
      t = `\`${schema.type}`;
      if (schema.format) {
        t = `${t}<${schema.format}>\``; // should ref link to format specs
      } else if (schema.properties) {
        t += "`\n:    " + [
          "    ~~~{.json .numberLines}",
          JSON.stringify(
            Object.fromEntries(
              Object.keys(schema.properties)
                .map((k) => [k, `[${this.refToTitle((schema.properties as Properties)[k])}]`])
            )
          ),
          "~~~",
        ].join("\n");
      } else if (schema.items) {
        if (schema.items instanceof Array) {
          const unionOfTypes = (schema.items as JSONSchemaObject[]).map((i) => `[${this.refToTitle(i)}]`).join(" | ");
          t = `${t}<${unionOfTypes}>\``;
        } else {
          t = `${t}<${this.refToTitle(schema.items as JSONSchemaObject)}>\``;
        }
      }
    }

    str.push("**Type**:" + t);
    str.push(t);
    str.push("");

    if (schema.description) {
      str.push("## Description");
      str.push("");
      str.push(schema.description);
      str.push("");
    }

    if (schema.examples) {
      str.push("## Examples");
      schema.examples.forEach((ex) => {
        str.push(` - \`"${ex}"\`.`);
      });
    }

    return str.join("\n");
  }

  public generateGenericConstraints(schema: JSONSchemaObject): string {
    const str = [];

    if (schema.enum) {
      str.push(" - **Must be one of**:");
      schema.enum.forEach((e) => {
        str.push(`   + \`${e}\`.`);
      });
    }

    if (schema.const) {
      str.push(` - must **always** be \`${schema.const}\`.`);
    }

    return str.join("\n");
  };
}
