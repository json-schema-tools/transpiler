import { JSONSchema, Enum, JSONSchemaBoolean, JSONSchemaObject } from "@json-schema-tools/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";

export default class Python extends CodeGen {
  protected generate(s: JSONSchemaObject, ir: TypeIntermediateRepresentation) {
    return [
      ir.documentationComment,
      "\n",
      ir.typing,
    ].join("");
  }

  protected handleBoolean(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", bool)`,
      imports: ["from typing import NewType"],
    };
  }

  protected handleNull(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", None)`,
      imports: ["from typing import NewType"]
    };
  }

  protected handleNumber(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", float)`,
      imports: ["from typing import NewType"]
    };
  }

  protected handleInteger(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", int)`,
      imports: ["from typing import NewType"]
    };
  }

  protected handleNumericalEnum(s: JSONSchemaObject): TypeIntermediateRepresentation {
    this.warnNotWellSupported("numericalEnum");
    if (s.type === "integer") {
      return this.handleInteger(s);
    } else {
      return this.handleNumber(s);
    }
  }

  protected handleString(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", str)`,
      imports: ["from typing import NewType"]
    };
  }

  protected handleStringEnum(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const sEnum = s.enum as Enum;
    const typeLines = sEnum
      .filter((enumString: any) => typeof enumString === "string")
      .map((enumString: string, i: number) => `    ${enumString.toUpperCase()} = ${i}`);

    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: [
        `class ${title}(Enum):`,
        ...typeLines,
      ].join("\n"),
      imports: ["from enum import Enum"]
    };
  }

  protected handleOrderedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    const sItems = s.items as JSONSchema[];
    const itemTitles = sItems.map((item: JSONSchema) => this.getSafeTitle(this.refToTitle(item)));
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", Tuple[${itemTitles.join(", ")}])`,
      imports: [
        "from enum import NewType",
        "from enum import Tuple"
      ]
    };
  }

  protected handleUnorderedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    const itemsTitle = this.getSafeTitle(this.refToTitle(s.items as JSONSchema));
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", List[${itemsTitle}])`,
      imports: [
        "from enum import List",
        "from enum import NewType"
      ]
    };
  }

  protected handleUntypedArray(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", List[Any])`,
      imports: [
        "from typing import List",
        "from typing import Any",
        "from typing import NewType"
      ]
    };
  }

  protected handleObject(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const sProps = s.properties as { [k: string]: JSONSchema };
    const propertyTypings = Object.keys(sProps).reduce((typings: string[], key: string) => {
      const propSchema = sProps[key] as JSONSchema;
      let isRequired = false;
      const propTitle = this.refToTitle(propSchema);
      if (s.required) {
        isRequired = s.required.indexOf(propTitle) !== -1;
      }
      const safeTitle = this.getSafeTitle(propTitle);
      // first expression of right hand side
      const rhs = isRequired ? title : `Optional[${safeTitle}]`;
      return [...typings, `    ${key}: ${rhs}`];
    }, []);

    if (s.additionalProperties) {
      this.warnNotWellSupported("ObjectsWithAdditionalProperties");
      return this.handleUntypedObject(s);
    }

    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: [
        `class ${title}(TypedDict):`,
        ...propertyTypings,
      ].join("\n"),
      imports: [
        "from typing import TypedDict",
        "from typing import Optional"
      ]
    };
  }

  protected handleUntypedObject(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", Mapping[Any, Any])`,
      imports: [
        "from typing import NewType",
        "from typing import Any",
        "from typing import Mapping"
      ]
    };
  }

  protected handleAnyOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    const sAny = s.anyOf as JSONSchema[];
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `${title} = NewType("${title}", Union[${this.getJoinedSafeTitles(sAny, ", ")}])`,
      imports: [
        "from typing import NewType",
        "from typing import Union"
      ]
    };
  }

  protected handleAllOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    this.warnNotWellSupported("allOf");
    // note - this doesnt work because subschemas are fully reffd when they get here
    // so pulling out the properties and merging them isn't gonna fly.
    // in TS this is made easy by the `&` operator which afaik there is no equiv in py

    // here is the code that doesnt work, leaving it here to demonstrate the desired outcome
    // const copy = { ...s };
    // const sAll = s.allOf as JSONSchema[];
    // console.log(sAll); //tslint:disable-line
    // copy.properties = mergeObjectProperties(sAll);
    // console.log(copy.properties); //tslint:disable-line
    // return this.handleObject(copy);

    return this.handleUntypedObject(s);
  }

  protected handleOneOf(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    const sOne = s.oneOf as JSONSchema[];
    return {
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `${title} = NewType("${title}", Union[${this.getJoinedSafeTitles(sOne, ", ")}])`,
      imports: [
        "from typing import NewType",
        "from typing import Union"
      ]
    };
  }

  protected handleConstantBool(s: JSONSchemaBoolean): TypeIntermediateRepresentation {
    const t = `Always${(s as any) === true ? "True" : "False"}`;
    return {
      typing: `${t} = NewType("${t}", Any)`,
      imports: [
        "from typing import NewType",
        "from typing import Any"
      ]
    };
  }

  protected handleUntyped(s: JSONSchemaObject): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", Any)`,
      imports: [
        "from typing import NewType",
        "from typing import Any"
      ]
    };
  }

  private warnNotWellSupported(typing: string) {
    console.warn(`In Python, ${typing} is not well supported.`);
  }

  private buildDocs(s: JSONSchemaObject): string | undefined {
    const docStringLines: string[] = [];

    if (s.description) {
      docStringLines.push(`${s.description}`);
      docStringLines.push("");
    }

    if (docStringLines.length > 0) {
      return [
        `"""${s.description}`,
        `"""`,
      ].join("\n");
    }
  }
}
