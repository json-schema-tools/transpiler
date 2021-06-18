import { JSONSchemaObject, Enum, JSONSchema, JSONSchemaBoolean } from "@json-schema-tools/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";
import { capitalize, getTitle, languageSafeName, numToWord } from "../utils";
import deburr from "lodash.deburr";
import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";

const startsWithDigitRegex = /^\d/;
const periodRegex = /\./g;

export const enumIdentifierFromTitle = (t: string) => {
  let nt = deburr(t);
  nt = numToWord(nt);
  nt = camelCase(nt);
  nt = capitalize(nt);
  return nt;
};

export default class Rust extends CodeGen {
  public getCodePrefix() {
    return [
      "extern crate serde;",
      "extern crate serde_json;",
      "extern crate derive_builder;"
    ].join("\n");
  }

  public getSafeTitle(title: string): string {
    const n = super.getSafeTitle(title);

    // Remove all non-alphabetic characters before the first char
    return n.replace(/^[^A-Z]+/m, "");
  }

  protected generate(s: JSONSchemaObject, ir: TypeIntermediateRepresentation) {
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

  protected handleBoolean(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "bool", documentationComment: this.buildDocs(s) };
  }

  protected handleNull(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: "serde_json::Value",
      documentationComment: this.buildDocs(s),
      imports: [
        "use serde::{Serialize, Deserialize};",
        "use std::collections::HashMap;",
      ]
    };
  }

  protected handleNumber(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "f64", documentationComment: this.buildDocs(s) };
  }

  protected handleInteger(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "i64", documentationComment: this.buildDocs(s) };
  }

  /**
   * Currently I dont know of a good way to handle this with rust.
   */
  protected handleNumericalEnum(s: JSONSchemaObject): TypeIntermediateRepresentation {
    if (s.type === "integer") {
      return this.handleInteger(s);
    }
    return this.handleNumber(s);
  }

  protected handleString(s: JSONSchemaObject): TypeIntermediateRepresentation {
    if (s.const) {
      const copy = { ...s };
      copy.enum = [s.const];
      delete copy.const;
      return this.handleStringEnum(copy);
    }
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "String" };
  }

  protected handleStringEnum(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const sEnum = s.enum as Enum;
    const enumFields = sEnum
      .filter((enumField: any) => typeof enumField === "string")
      .map((enumField: string) => {
        return [
          `    #[serde(rename = "${enumField}")]`,
          `    ${enumIdentifierFromTitle(enumField)},`,
        ].join("\n")
      });

    return {
      macros: "#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]",
      prefix: "enum",
      typing: ["{", ...enumFields, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
      imports: [
        "use serde::{Serialize, Deserialize};",
        "use derive_builder::Builder;",
      ]
    };
  }

  protected handleOrderedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `(${this.getJoinedSafeTitles(s.items as JSONSchema[])})`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUnorderedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `Vec<${this.getSafeTitle(this.refToTitle(s.items as JSONSchema))}>`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return {
      prefix: "type",
      typing: `Vec<serde_json::Value>`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleObject(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const sProps = s.properties as { [k: string]: JSONSchema };
    const propertyTypings = Object.keys(sProps).reduce((typings: string[], key: string) => {
      const propSchema = sProps[key];
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(key) !== -1;
      }

      let typeName = this.getSafeTitle(this.refToTitle(propSchema));
      if (propSchema !== false && propSchema !== true && propSchema.isCycle) {
        typeName = `Box<${typeName}>`;
      }

      if (!isRequired) {
        typeName = `Option<${typeName}>`;
      }

      let serdeRename = false;
      let structFieldName = key;

      const unallowedSymbolPrefixes = ["$", "@"];
      if (unallowedSymbolPrefixes.reduce((m, s) => m || key.startsWith(s), false)) {
        serdeRename = true;
        structFieldName = key.substring(1);
      }

      const reservedWords = ["if", "else", "type", "ref", "const", "enum", "default"];

      if (reservedWords.indexOf(structFieldName) !== -1) {
        serdeRename = true;
        structFieldName = "_" + structFieldName;
      } else if (snakeCase(key) !== key) {
        serdeRename = true;
        structFieldName = snakeCase(key);
      }

      let macro = "";
      if (serdeRename) {
        if (isRequired) {
          macro = `#[serde(rename = "${key}")]`;
        } else {
          macro = `#[serde(rename = "${key}", skip_serializing_if = "Option::is_none")]`;
        }
      } else {
        if (!isRequired) {
          macro = `#[serde(skip_serializing_if = "Option::is_none")]`;
        }
      }


      return [
        ...typings,
        [
          macro ? `    ${macro}\n` : "",
          `    pub ${structFieldName}: ${typeName},`,
        ].join(""),
      ];
    }, []);

    if (s.additionalProperties) {
      const addPropS = s.additionalProperties;
      let typeName = this.getSafeTitle(this.refToTitle(addPropS));

      if (addPropS !== true && addPropS.isCycle) {
        typeName = `Box<${typeName}>`;
      }

      propertyTypings.push([
        "#[serde(flatten)]\n",
        `pub additional_properties: ${typeName},`
      ].map((s) => `    ${s}`).join(""));
    }

    return {
      prefix: "struct",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
      macros: [
        "#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]",
        "#[builder(setter(strip_option), default)]",
        "#[serde(default)]"
      ].join("\n"),
      documentationComment: this.buildDocs(s),
      imports: [
        "use serde::{Serialize, Deserialize};",
        "use derive_builder::Builder;",
      ]
    };
  }

  protected handleUntypedObject(s: JSONSchemaObject): TypeIntermediateRepresentation {
    let typeName = "serde_json::Value";
    if (s.additionalProperties) {
      // const typeName = this.getSafeTitle(this.refToTitle(s.additionalProperties));
      // const propertyTypings = [
      //   "#[serde(flatten)]",
      //   `pub additional_properties: Option<${typeName}>`
      // ].map((s) => `    ${s}`);
      // return {
      //   prefix: "struct",
      //   typing: ["{", ...propertyTypings, "}"].join("\n"),
      //   macros: [
      //     "#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]",
      //     "#[builder(setter(strip_option), default)]",
      //     "#[serde(default)]"
      //   ].join("\n"),
      //   documentationComment: this.buildDocs(s),
      //   imports: [
      //     "use serde::{Serialize, Deserialize};",
      //     "use derive_builder::Builder;",
      //   ]
      // };
      typeName = this.getSafeTitle(this.refToTitle(s.additionalProperties));
    }
    return {
      prefix: "type",
      typing: `HashMap<String, ${typeName}>`,
      documentationComment: this.buildDocs(s),
      imports: [
        "use std::collections::HashMap;",
      ]
    };
  }

  protected handleAnyOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.buildEnum(s.anyOf as JSONSchema[]);
  }

  /**
   * I dont have a great way of doing this one either. The best I can do is call it an untyped object
   */
  protected handleAllOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.handleUntypedObject(s);
  }

  protected handleOneOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return this.buildEnum(s.oneOf as JSONSchema[]);
  }

  protected handleConstantBool(s: JSONSchemaBoolean): TypeIntermediateRepresentation {
    return {
      typing: `type ${getTitle(s)} = serde_json::Value;`,
    };
  }

  protected handleUntyped(s: JSONSchemaObject): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "serde_json::Value" };
  }

  private buildEnum(s: JSONSchema[]): TypeIntermediateRepresentation {
    const typeLines = s
      .map((enumItem) => {
        const typeName = this.getSafeTitle(this.refToTitle(enumItem));
        let rhsTypeName = typeName;
        if (enumItem !== false && enumItem !== true && enumItem.isCycle) {
          rhsTypeName = `Box<${typeName}>`;
        }
        return `${typeName}(${rhsTypeName})`;
      })
      .map((l) => `    ${l},`)
      .join("\n");

    return {
      macros: [
        "#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]",
        "#[serde(untagged)]"
      ].join("\n"),
      prefix: "enum",
      typing: ["{", typeLines, "}"].join("\n"),
      imports: [
        "use serde::{Serialize, Deserialize};",
      ]
    };
  }

  private buildDocs(s: JSONSchemaObject): string | undefined {
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
