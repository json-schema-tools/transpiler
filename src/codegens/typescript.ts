import { JSONMetaSchema, Enum } from "@json-schema-tools/meta-schema";

import { CodeGen, TypeIntermediateRepresentation } from "./codegen";

export default class Typescript extends CodeGen {
  protected generate(s: JSONMetaSchema, ir: TypeIntermediateRepresentation) {
    return [
      ir.documentationComment,
      `export ${ir.prefix} ${this.getSafeTitle(s.title as string)}`,
      ir.prefix === "type" ? " = " : " ",
      ir.typing,
      ir.prefix === "type" ? ";" : "",
    ].join("");
  }

  protected handleBoolean(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "boolean" };
  }

  protected handleNull(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { prefix: "type", typing: "null", documentationComment: this.buildDocs(s) };
  }

  protected handleNumber(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "number" };
  }

  protected handleInteger(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return this.handleNumber(s);
  }

  protected handleNumericalEnum(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: this.buildEnum(s),
    };
  }

  protected handleString(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "string" };
  }

  protected handleStringEnum(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: this.buildEnum(s),
    };
  }

  protected handleOrderedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `[${this.getJoinedSafeTitles(s.items as JSONMetaSchema[])}]`,
    };
  }

  protected handleUnorderedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `${this.getSafeTitle(this.refToTitle(s.items as JSONMetaSchema))}[]`,
    };
  }

  protected handleUntypedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `any[]`,
    };
  }

  protected handleObject(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sProps = s.properties as { [k: string]: JSONMetaSchema };
    const propertyTypings = Object.keys(sProps).reduce((typings: string[], key: string) => {
      const propSchema = sProps[key];
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(key) !== -1;
      }
      const title = this.getSafeTitle(this.refToTitle(propSchema));
      return [...typings, `  ${key}${isRequired ? "" : "?"}: ${title};`];
    }, []);

    if (s.additionalProperties === undefined) {
      propertyTypings.push("  [k: string]: any;");
    }

    return {
      documentationComment: this.buildDocs(s),
      prefix: "interface",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
    };
  }

  protected handleUntypedObject(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      prefix: "interface",
      typing: "{ [key: string]: any; }",
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleAnyOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sAny = s.anyOf as JSONMetaSchema[];
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: this.getJoinedSafeTitles(sAny, " | "),
    };
  }

  protected handleAllOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sAll = s.allOf as JSONMetaSchema[];
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: this.getJoinedSafeTitles(sAll, " & "),
    };
  }

  protected handleOneOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sOne = s.oneOf as JSONMetaSchema[];
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: this.getJoinedSafeTitles(sOne, " | "),
    };
  }

  protected handleCompositeType(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "any" };
  }

  protected handleConstantBool(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      typing: `type Always${(s as any) === true ? "True" : "False"} = any;`,
    };
  }

  protected handleUntyped(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "any" };
  }

  private buildEnum(schema: JSONMetaSchema): string {
    const typeOf = schema.type === "string" ? "string" : "number";
    const sEnum = schema.enum as Enum;
    return sEnum
      .filter((s: any) => typeof s === typeOf)
      .map((s: string) => typeOf === "string" ? `"${s}"` : s)
      .join(" | ");
  }

  private buildDocs(s: JSONMetaSchema): string | undefined {
    const docStringLines = [];

    if (s.description) {
      docStringLines.push(` * ${s.description}`);
      docStringLines.push(" *");
    }

    if (s.default) {
      const def = s.default;
      let defAsStr = `${def}`;
      if (def instanceof Array || (typeof def === "object" && def !== null)) {
        defAsStr = JSON.stringify(def);
      }
      docStringLines.push(` * @default ${defAsStr}`);
      docStringLines.push(` *`);
    }

    if (s.examples) {
      s.examples.forEach((example: string) => {
        docStringLines.push(" * @example");
        docStringLines.push(` * \`${example}\``);
        docStringLines.push(" *");
      });
    }

    if (docStringLines.length > 0) {
      return [
        "/**",
        " *",
        ...docStringLines,
        " */",
        "",
      ].join("\n");
    }
  }
}
