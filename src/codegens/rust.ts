import { CoreSchemaMetaSchema as JSONSchema, UnorderedSetOfAnyL9Fw4VUOyeAFYsFq } from "@json-schema-tools/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";

export default class Rust extends CodeGen {
  public getCodePrefix() {
    return [
      "use serde::{Serialize, Deserialize};",
      "use std::collections::HashMap;",
      "extern crate serde_json;",
    ].join("\n");
  }

  protected generate(s: JSONSchema, ir: TypeIntermediateRepresentation) {
    return [
      ir.documentationComment,
      ir.macros,
      ir.macros ? "\n" : "",
      `pub ${ir.prefix} ${this.getSafeTitle(s.title as string)}`,
      ir.prefix === "type" ? " = " : " ",
      ir.typing,
      ir.prefix === "type" ? ";" : "",
    ].join("");
  }

  protected handleBoolean(s: JSONSchema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "bool", documentationComment: this.buildDocs(s) };
  }

  protected handleNull(s: JSONSchema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "serde_json::Value", documentationComment: this.buildDocs(s) };
  }

  protected handleNumber(s: JSONSchema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "f64", documentationComment: this.buildDocs(s) };
  }

  protected handleInteger(s: JSONSchema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "i64", documentationComment: this.buildDocs(s) };
  }

  /**
   * Currently I dont know of a good way to handle this with rust.
   */
  protected handleNumericalEnum(s: JSONSchema): TypeIntermediateRepresentation {
    if (s.type === "integer") {
      return this.handleInteger(s);
    }
    return this.handleNumber(s);
  }

  protected handleString(s: JSONSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "String" };
  }

  protected handleStringEnum(s: JSONSchema): TypeIntermediateRepresentation {
    const sEnum = s.enum as UnorderedSetOfAnyL9Fw4VUOyeAFYsFq;
    const enumFields = sEnum
      .filter((enumField: any) => typeof enumField === "string")
      .map((enumField: string) => [
        `    #[serde(rename = "${enumField}")]`,
        `    ${this.getSafeTitle(enumField)},`,
      ].join("\n"));

    return {
      macros: "#[derive(Serialize, Deserialize)]",
      prefix: "enum",
      typing: ["{", ...enumFields, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleOrderedArray(s: JSONSchema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `(${this.getJoinedSafeTitles(s.items as JSONSchema[])})`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUnorderedArray(s: JSONSchema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `Vec<${this.getSafeTitle(this.refToTitle(s.items as JSONSchema))}>`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedArray(s: JSONSchema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `Vec<serde_json::Value>`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleObject(s: JSONSchema): TypeIntermediateRepresentation {
    const sProps = s.properties as { [k: string]: JSONSchema };
    const propertyTypings = Object.keys(sProps).reduce((typings: string[], key: string) => {
      const propSchema = sProps[key];
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(key) !== -1;
      }

      const typeName = this.getSafeTitle(this.refToTitle(propSchema));

      return [
        ...typings,
        [
          `    pub(crate) ${key}: `,
          isRequired ? typeName + "," : `Option<${typeName}>,`,
        ].join(""),
      ];
    }, []);

    return {
      prefix: "struct",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
      macros: "#[derive(Serialize, Deserialize)]",
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedObject(s: JSONSchema): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: "HashMap<String, Option<serde_json::Value>>",
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleAnyOf(s: JSONSchema): TypeIntermediateRepresentation {
    return this.buildEnum(s.anyOf as JSONSchema[]);
  }

  /**
   * I dont have a great way of doing this one either. The best I can do is call it an untyped object
   */
  protected handleAllOf(s: JSONSchema): TypeIntermediateRepresentation {
    return this.handleUntypedObject(s);
  }

  protected handleOneOf(s: JSONSchema): TypeIntermediateRepresentation {
    return this.buildEnum(s.oneOf as JSONSchema[]);
  }

  protected handleUntyped(s: JSONSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "serde_json::Value" };
  }

  private buildEnum(s: JSONSchema[]): TypeIntermediateRepresentation {
    return {
      macros: "#[derive(Serialize, Deserialize)]",
      prefix: "enum",
      typing: [
        "{",
        this.getJoinedSafeTitles(s, ",\n").split("\n").map((l) => `    ${l}`).join("\n"),
        "}",
      ].join("\n"),
    };
  }

  private buildDocs(s: JSONSchema): string | undefined {
    const docStringLines: string[] = [];

    if (s.description) {
      docStringLines.push(`/// ${s.description}`);
      docStringLines.push("///");
    }

    if (s.default) {
      const def = s.default;
      let defAsStr = `${def}`;
      if (def instanceof Array || (typeof def === "object" && def !== null)) {
        defAsStr = JSON.stringify(def);
      }
      docStringLines.push("/// # Default");
      docStringLines.push("///");
      docStringLines.push(`/// ${defAsStr}`);
      docStringLines.push("///");
    }

    if (s.examples) {
      s.examples.forEach((example: string) => {
        docStringLines.push("/// # Example");
        docStringLines.push("///");
        docStringLines.push(`/// \`${example}\``);
        docStringLines.push("///");
      });
    }

    if (docStringLines.length > 0) {
      return [
        `/// ${this.getSafeTitle(s.title as string)}`,
        "///",
        ...docStringLines,
        "",
      ].join("\n");
    }
  }
}
