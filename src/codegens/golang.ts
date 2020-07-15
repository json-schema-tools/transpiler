import { JSONMetaSchema, Enum } from "@json-schema-tools/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";

export default class Golang extends CodeGen {

  public getSafeTitle(title: string): string {
    const n = super.getSafeTitle(title);

    // Remove all non-capitalized-alpha characters before the first capitalized alpha character.
    return n.replace(/^[^A-Z]+/m, "");
  }

  protected generate(s: JSONMetaSchema, ir: TypeIntermediateRepresentation) {
    return [
      ir.documentationComment,
      [
        "type ",
        `${this.getSafeTitle(s.title as string)} `,
        ir.prefix ? `${ir.prefix} ` : "",
      ].join(""),
      ir.macros ? [ir.typing, ir.macros].join("\n") : ir.typing,
    ].join("");
  }

  protected handleBoolean(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { typing: "bool", documentationComment: this.buildDocs(s) };
  }

  protected handleNull(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { typing: "interface{}", documentationComment: this.buildDocs(s) };
  }

  protected handleNumber(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { typing: "float64", documentationComment: this.buildDocs(s) };
  }

  protected handleInteger(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { typing: "int64", documentationComment: this.buildDocs(s) };
  }

  protected handleNumericalEnum(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const safeTitle = this.getSafeTitle(s.title as string);
    const sEnum = s.enum as Enum;
    const enumFields = sEnum
      .filter((enumField: any) => typeof enumField === "number")
      .map((enumField: string, i: number) => `\t${safeTitle}Enum${i} ${safeTitle} = ${enumField}`)
      .join("\n");

    const ir = s.type === "number" ? this.handleNumber(s) : this.handleInteger(s);
    ir.typing = ir.typing + "\n" + ["const (", enumFields, ")"].join("\n");
    return ir;
  }

  protected handleString(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), typing: "string" };
  }

  protected handleStringEnum(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const safeTitle = this.getSafeTitle(s.title as string);
    const sEnum = s.enum as Enum;
    const enumFields = sEnum
      .filter((enumField: any) => typeof enumField === "string")
      .map((enumField: string, i: number) => `\t${safeTitle}Enum${i} ${safeTitle} = "${enumField}"`)
      .join("\n");

    const ir = this.handleString(s);
    ir.typing = ir.typing + "\n" + ["const (", enumFields, ")"].join("\n");
    return ir;
  }

  protected handleOrderedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      typing: `(${this.getJoinedSafeTitles(s.items as JSONMetaSchema[])})`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUnorderedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      typing: `[]${this.getSafeTitle(this.refToTitle(s.items as JSONMetaSchema))}`,
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const ir = this.handleUntyped(s);
    ir.typing = `[]${ir.typing}`;
    return ir;
  }

  protected handleObject(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sProps = s.properties as { [k: string]: JSONMetaSchema };
    const propKeys = Object.keys(sProps);
    const safeTitles = propKeys.map((k) => this.getSafeTitle(k));
    const propSchemaTitles = propKeys.map((k) => this.getSafeTitle(this.refToTitle(sProps[k])));

    const titleMaxLength = Math.max(...safeTitles.map((t) => t.length));
    const propTitleMaxLength = Math.max(...propSchemaTitles.map((t) => t.length));

    const propertyTypings = propKeys.reduce((typings: string[], key: string, i: number) => {
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(key) !== -1;
      }
      let safeTitle = safeTitles[i];
      safeTitle = safeTitle.padEnd(titleMaxLength);
      let safeTitleForPropSchema = propSchemaTitles[i];
      safeTitleForPropSchema = safeTitleForPropSchema.padEnd(propTitleMaxLength);
      return [
        ...typings,
        "\t" + `${safeTitle} *${safeTitleForPropSchema} \`json:"${key}${isRequired ? "" : ",omitempty"}"\``,
      ];
    }, []);

    return {
      prefix: "struct",
      typing: [`{`, ...propertyTypings, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleUntypedObject(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const ir = this.handleUntyped(s);
    ir.typing = `map[string]${ir.typing}`;
    return ir;
  }

  protected unmarshalAnyOfMacro(typeTitle: string, items: string[]): any {
    const components = items.map((itemTitle) => {
      return [
        `var my${itemTitle} ${itemTitle}`,
        `if err := json.Unmarshal(bytes, &my${itemTitle}); err == nil {`,
        "\t" + "ok = true",
        "\t" + `a.${itemTitle} = &my${itemTitle}`,
        "}",
      ];
    });

    return [
      `func (a *${typeTitle}) UnmarshalJSON(bytes []byte) error {`,
      "\t" + "var ok bool",
      components.map((c) => c.map((cl) => "\t" + cl).join("\n")).join("\n"),
      "\t" + "if ok {",
      "\t\t" + "return nil",
      "\t" + "}",
      "\t" + `return errors.New("failed to unmarshal any of the object properties")`,
      "}",
    ].join("\n");
  }

  protected marshalAnyOfMacro(typeTitle: string, items: string[]): any {
    const components = items.map((itemTitle: string) => {
      return [
        `if o.${itemTitle} != nil {`,
        "\t" + `out = append(out, o.${itemTitle})`,
        `}`,
      ];
    });

    return [
      `func (o ${typeTitle}) MarshalJSON() ([]byte, error) {`,
      "\t" + `out := []interface{}`,
      components.map((c) => c.map((cl) => "\t" + cl).join("\n")).join("\n"),
      "\t" + "return json.Marshal(out)",
      "}",
    ].join("\n");
  }

  protected unmarshalOneOfMacro(typeTitle: string, items: string[]): any {
    const components = items.map((itemTitle) => {
      return [
        `var my${itemTitle} ${itemTitle}`,
        `if err := json.Unmarshal(bytes, &my${itemTitle}); err == nil {`,
        "\t" + `o.${itemTitle} = &my${itemTitle}`,
        "\t" + "return nil",
        "}",
      ];
    });

    const comment = [
      "// UnmarshalJSON implements the json Unmarshaler interface.",
      "// This implementation DOES NOT assert that ONE AND ONLY ONE",
      "// of the simple properties is satisfied; it lazily uses the first one that is satisfied.",
      "// Ergo, it will not return an error if more than one property is valid.",
    ].join("\n");
    return [
      comment,
      `func (o *${typeTitle}) UnmarshalJSON(bytes []byte) error {`,
      components.map((c) => c.map((cl) => "\t" + cl).join("\n")).join("\n"),
      "\t" + `return errors.New("failed to unmarshal one of the object properties")`,
      "}",
    ].join("\n");
  }

  protected marshalOneOfMacro(typeTitle: string, items: string[]): any {
    const components = items.map((itemTitle: string) => {
      return [
        `if o.${itemTitle} != nil {`,
        "\t" + `return json.Marshal(o.${itemTitle})`,
        `}`,
      ];
    });

    return [
      `func (o ${typeTitle}) MarshalJSON() ([]byte, error) {`,
      components.map((c) => c.map((cl) => "\t" + cl).join("\n")).join("\n"),
      "\t" + `return nil, errors.New("failed to marshal any one of the object properties")`,
      "}",
    ].join("\n");
  }

  protected handleAnyOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sAny = s.anyOf as JSONMetaSchema[];
    const titles = sAny.map((ss: JSONMetaSchema) => this.getSafeTitle(this.refToTitle(ss)));
    const titleMaxLength = Math.max(...titles.map((t: string) => t.length));
    const anyOfType = titles.reduce((typings: string[], anyOfTitle: string) => {
      return [...typings, `\t${anyOfTitle.padEnd(titleMaxLength)} *${anyOfTitle}`]; // Here, the pointer is added.
    }, []);

    const title = this.getSafeTitle(s.title as string);
    return {
      macros: [
        this.unmarshalAnyOfMacro(title, titles),
        this.marshalAnyOfMacro(title, titles),
      ].join("\n"),
      prefix: "struct",
      typing: ["{", ...anyOfType, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
    };
  }

  /**
   * must be a set of schemas with type: object
   */
  protected handleAllOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("allOf");
    return this.handleUntypedObject(s);
  }

  protected handleOneOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sOne = s.oneOf as JSONMetaSchema[];
    const titles = sOne.map((ss: JSONMetaSchema) => this.getSafeTitle(this.refToTitle(ss)));
    const titleMaxLength = Math.max(...titles.map((t: string) => t.length));
    const oneOfType = sOne.reduce((typings: string[], oneOfSchema: JSONMetaSchema, i: number) => {
      const oneOfTitle = titles[i];
      return [
        ...typings,
        "\t" + [
          oneOfTitle.padEnd(titleMaxLength),
          `*${oneOfTitle}`,
        ].join(" "),
      ];
    }, []);

    const title = this.getSafeTitle(s.title as string);
    return {
      macros: [
        this.unmarshalOneOfMacro(title, titles),
        this.marshalOneOfMacro(title, titles),
      ].join("\n"),
      prefix: "struct",
      typing: [`{`, ...oneOfType, "}"].join("\n"),
      documentationComment: this.buildDocs(s),
    };
  }

  protected handleCompositeType(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "type", typing: "any" };
  }

  protected handleConstantBool(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return {
      typing: `type Always${(s as any) === true ? "True" : "False"} interface{}`,
    };
  }

  protected handleUntyped(s: JSONMetaSchema): TypeIntermediateRepresentation {
    return { documentationComment: this.buildDocs(s), prefix: "", typing: "interface{}" };
  }

  private buildDocs(s: JSONMetaSchema): string | undefined {
    const docStringLines = [];

    if (s.description) {
      docStringLines.push(`// ${s.description}`);
    }

    if (s.default) {
      const def = s.default;
      let defAsStr = `${def}`;
      if (def instanceof Array || (typeof def === "object" && def !== null)) {
        defAsStr = JSON.stringify(def);
      }
      docStringLines.push("//");
      docStringLines.push("// --- Default ---");
      docStringLines.push("//");
      docStringLines.push(`// ${defAsStr}`);
    }

    if (s.examples) {
      s.examples.forEach((example: any) => {
        docStringLines.push("//");
        docStringLines.push("// --- Example ---");
        docStringLines.push("//");
        docStringLines.push(`// \`${example}\``);
      });
    }

    if (docStringLines.length > 0) {
      docStringLines.push("");
      return docStringLines.join("\n");
    }
  }

  private warnNotWellSupported(typing: string) {
    console.warn(`In Golang, ${typing} is not well supported.`);
  }
}
