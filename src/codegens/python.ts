import { JSONMetaSchema, Enum } from "@json-schema-tools/meta-schema";
import { CodeGen, TypeIntermediateRepresentation } from "./codegen";

export default class Python extends CodeGen {
  protected generate(s: JSONMetaSchema, ir: TypeIntermediateRepresentation) {
    return [
      ir.macros,
      "\n",
      ir.documentationComment,
      "\n",
      ir.typing,
    ].join("");
  }

  protected handleBoolean(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", bool)`,
    };
  }

  protected handleNull(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", None)`,
    };
  }

  protected handleNumber(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", float)`,
    };
  }

  protected handleInteger(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", int)`,
    };
  }

  protected handleNumericalEnum(s: JSONMetaSchema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("numericalEnum");
    if (s.type === "integer") {
      return this.handleInteger(s);
    } else {
      return this.handleNumber(s);
    }
  }

  protected handleString(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType",
      typing: `${title} = NewType("${title}", str)`,
    };
  }

  protected handleStringEnum(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sEnum = s.enum as Enum;
    const typeLines = sEnum
      .filter((enumString: any) => typeof enumString === "string")
      .map((enumString: string, i: number) => `    ${enumString.toUpperCase()} = ${i}`);

    const title = this.getSafeTitle(s.title as string);
    return {
      macros: "from enum import Enum",
      documentationComment: this.buildDocs(s),
      typing: [
        `class ${title}(Enum):`,
        ...typeLines,
      ].join("\n"),
    };
  }

  protected handleOrderedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    const sItems = s.items as JSONMetaSchema[];
    const itemTitles = sItems.map((item: JSONMetaSchema) => this.getSafeTitle(this.refToTitle(item)));
    return {
      macros: "from typing import NewType, Tuple",
      documentationComment: this.buildDocs(s),
      typing: `${title} = NewType("${title}", Tuple[${itemTitles.join(", ")}])`,
    };
  }

  protected handleUnorderedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    const itemsTitle = this.getSafeTitle(this.refToTitle(s.items as JSONMetaSchema));
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import List, NewType",
      typing: `${title} = NewType("${title}", List[${itemsTitle}])`,
    };
  }

  protected handleUntypedArray(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import List, Any, NewType",
      typing: `${title} = NewType("${title}", List[Any])`,
    };
  }

  protected handleObject(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const sProps = s.properties as { [k: string]: JSONMetaSchema };
    const propertyTypings = Object.keys(sProps).reduce((typings: string[], key: string) => {
      const propSchema = sProps[key] as JSONMetaSchema;
      let isRequired = false;
      if (s.required) {
        isRequired = s.required.indexOf(propSchema.title as string) !== -1;
      }
      const safeTitle = this.getSafeTitle(this.refToTitle(propSchema));
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
      macros: "from typing import TypedDict, Optional",
      typing: [
        `class ${title}(TypedDict):`,
        ...propertyTypings,
      ].join("\n"),
    };
  }

  protected handleUntypedObject(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import NewType, Any, Mapping",
      typing: `${title} = NewType("${title}", Mapping[Any, Any])`,
    };
  }

  protected handleAnyOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    const sAny = s.anyOf as JSONMetaSchema[];
    return {
      macros: "from typing import NewType, Union",
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `${title} = NewType("${title}", Union[${this.getJoinedSafeTitles(sAny, ", ")}])`,
    };
  }

  protected handleAllOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    this.warnNotWellSupported("allOf");
    // note - this doesnt work because subschemas are fully reffd when they get here
    // so pulling out the properties and merging them isn't gonna fly.
    // in TS this is made easy by the `&` operator which afaik there is no equiv in py

    // here is the code that doesnt work, leaving it here to demonstrate the desired outcome
    // const copy = { ...s };
    // const sAll = s.allOf as JSONMetaSchema[];
    // console.log(sAll); //tslint:disable-line
    // copy.properties = mergeObjectProperties(sAll);
    // console.log(copy.properties); //tslint:disable-line
    // return this.handleObject(copy);

    return this.handleUntypedObject(s);
  }

  protected handleOneOf(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    const sOne = s.oneOf as JSONMetaSchema[];
    return {
      macros: "from typing import NewType, Union",
      documentationComment: this.buildDocs(s),
      prefix: "type",
      typing: `${title} = NewType("${title}", Union[${this.getJoinedSafeTitles(sOne, ", ")}])`,
    };
  }

  protected handleUntyped(s: JSONMetaSchema): TypeIntermediateRepresentation {
    const title = this.getSafeTitle(s.title as string);
    return {
      documentationComment: this.buildDocs(s),
      macros: "from typing import Any, NewType",
      typing: `${title} = NewType("${title}", Any)`,
    };
  }

  private warnNotWellSupported(typing: string) {
    console.warn(`In Python, ${typing} is not well supported.`);
  }

  private buildDocs(s: JSONMetaSchema): string | undefined {
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
