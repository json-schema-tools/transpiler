import deburr from "lodash.deburr";
import trim from "lodash.trim";
import { JSONSchema, Properties, JSONSchemaObject } from "@json-schema-tools/meta-schema";
import traverse from "@json-schema-tools/traverse";
import titleizer from "@json-schema-tools/titleizer";

/**
 * Capitalize the first letter of the string.
 *
 * @param s A word to capitalize. Does not account for leading white spaces.
 *
 * @return capitalized version of the input
 */
export const capitalize = (s: string): string => s[0].toUpperCase() + s.slice(1);


export const numToWord = (s: string): string => {
  return s.replace(digitRegex, (match: string) => {
    switch (match) {
      case "0": return "Zero";
      case "1": return "One";
      case "2": return "Two";
      case "3": return "Three";
      case "4": return "Four";
      case "5": return "Five";
      case "6": return "Six";
      case "7": return "Seven";
      case "8": return "Eight";
      case "9": return "Nine";
      default: return match;
    }
  });
};

const regexes = [
  // 1. remove all leading characters that are not letters, digits, or underscore
  /(^\s*[^a-zA-Z_\d$])|([^a-zA-Z_$\d])/g,
  // 2. remove leading underscores and uppercase the first letter
  /^_[a-z]/g,
  // 3. remove underscores and uppercase the following letter
  /_[a-z]/g,
  // 4. uppercase letters preceeded by digits
  /([\d$]+[a-zA-Z])/g,
  // 5. uppercase letters preceeded by whitespace
  /\s+([a-zA-Z])/g,
  // 6. remove all whitespace and underscores
  /\s|_/g,
  // 7. replace leading digits with words
  /^\d+/g,
];


const digitRegex = /\d/g;
export const languageSafeName = (title: string): string => {
  return capitalize(
    deburr(title)
      .replace(regexes[0], " ")
      .replace(regexes[1], (match: string) => match.toUpperCase())
      .replace(regexes[2], (match: string) => match.substr(1, match.length).toUpperCase())
      .replace(regexes[3], (match: string) => match.toUpperCase())
      .replace(regexes[4], (match: string) => trim(match.toUpperCase()))
      .replace(regexes[5], ""))
      .replace(regexes[6], (match: string) => numToWord(match));
};

export const getTitle = (s: JSONSchema): string => {
  if (s === true) {
    return "AlwaysTrue";
  }

  if (s === false) {
    return "AlwaysFalse";
  }

  if (s.title) {
    return s.title;
  }

  throw new Error("Could not extract title from schema: " + JSON.stringify(s));
};

export const schemaToRef = (s: JSONSchema): { $ref: string } => {
  const ref = getTitle(s);
  return { $ref: `#/definitions/${ref}` }
};

export const joinSchemaTitles = (s: JSONSchema[]): string => {
  return s.map(getTitle).join("_");
};

type SchemEntry = [string, JSONSchema];
export const sortEntriesByKey = ([key1]: SchemEntry, [key2]: SchemEntry): -1 | 1 => key1 > key2 ? -1 : 1;

export function combineSchemas(s: JSONSchema[]): JSONSchemaObject {
  let combinedDefinitions: { [k: string]: JSONSchema } = {};

  s.forEach((schema) => {
    if (schema === true || schema === false) {
      combinedDefinitions[getTitle(schema)] = schema;
    } else {
      combinedDefinitions = {
        ...combinedDefinitions,
        ...schema.definitions,
      };
    }
  });

  const withoutDefinitions = s.map((ss) => {
    if (ss === true || ss === false) { return ss; }
    const copy = { ...ss };
    delete copy.definitions;
    return copy;
  });

  const uniquedSchemas = withoutDefinitions.reduce((uniqued: JSONSchema[], schema: JSONSchema) => {
    if (uniqued.find((us: JSONSchema) => {
      if (us === true || us === false || schema === true || schema === false) {
        return us === schema;
      }

      return us.title === schema.title;
    }) === undefined) {
      return [
        ...uniqued,
        schema,
      ];
    }

    return uniqued;
  }, []);

  uniquedSchemas.forEach((us) => {
    return combinedDefinitions[getTitle(us)] = us;
  });

  return {
    title: `AnyOf_${joinSchemaTitles(s)}`,
    description: "Generated! Represents an alias to any of the provided schemas",
    anyOf: uniquedSchemas.map(schemaToRef),
    definitions: combinedDefinitions,
  };
}

export function mergeObjectProperties(schemas: JSONSchema[]): JSONSchema {
  const merged = (schemas
    .filter((s) => {
      if (s === true || s === false) {
        return false;
      } else {
        return !!s.properties;
      }
    }) as JSONSchemaObject[])
    .map(({ properties }: JSONSchemaObject): Properties => properties as Properties)
    .reduce((all: JSONSchemaObject, schema: JSONSchemaObject) => ({ ...all, ...schema }), {});

  return merged;
}

/**
 * Remove all `$id` fields. After referencing, everything is flattened into a
 * single schema with local `$ref`s, so `$id`s (which only affect URI
 * resolution) are dead weight.
 */
export function stripIds(schema: JSONSchema): JSONSchema {
  const strip = (s: JSONSchema): JSONSchema => {
    const stripped = traverse(s, (subSchema) => {
      if (subSchema !== true && subSchema !== false && subSchema.$id !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { $id, ...rest } = subSchema;
        return rest as JSONSchema;
      }
      return subSchema;
    }, { mutable: true });
    // traverse does not descend into `definitions`; handle them directly.
    if (stripped !== true && stripped !== false) {
      const definitions = stripped.definitions as Record<string, JSONSchema> | undefined;
      if (definitions !== undefined) {
        for (const key of Object.keys(definitions)) {
          definitions[key] = strip(definitions[key]);
        }
      }
    }
    return stripped;
  };
  return strip(schema);
}

export function replaceTypeAsArrayWithOneOf(schema: JSONSchema): JSONSchema {
  return traverse(schema, (subS) => {
    const subSchema = titleizer(subS) as JSONSchemaObject;
    if (subS !== true && subS !== false && subS.type instanceof Array) {
      console.warn([
        "One of the provided schemas is using an array for the field type. This is not",
        "advisable, as oneOf is the equivalent. In (far) future releases, type as an array",
        "support will be deprecated."
      ]);

      if (subS.length === 1) {
        subS.type = subS.type[0];
      } else {
        const newSubSchemas = subS.type.map((subType) => ({
          ...subS,
          title: `${subSchema.title}As${capitalize(subType)}`,
          type: subType,
        }));
        subS.oneOf = newSubSchemas;
        delete subS.type;
      }
    }

    return subS;
  }, { mutable: true });
}

export function getCycleMap(ss: JSONSchema[]): CycleMap {
  return ss.reduce((m, s) => {
    traverse(s, (subs, isCycle) => {
      if (subs === true || subs === false) { return subs; }
      if (isCycle) {
        m[schemaToRef(subs).$ref] = true;
      }
      return subs;
    });

    return m;
  }, {} as CycleMap);
}

interface CycleMap { [k: string]: true }

const checkCycle = (cycleMap: CycleMap) => (subs: JSONSchema) => {
  if (subs !== true && subs !== false && subs.$ref && cycleMap[subs.$ref]) {
    subs.isCycle = true;
  }
  return subs;
};

export function setIsCycle(s: JSONSchema, cycleMap: CycleMap): JSONSchema {
  if (s === true || s === false) { return s; }
  traverse(s, checkCycle(cycleMap), { mutable: true });

  if (s.definitions !== undefined) {
    const defs = s.definitions;
    Object.keys(defs).forEach((subsKey) => {
      if (cycleMap[`#/definitions/${subsKey}`]) {
        defs[subsKey].isCycle = true;
      }
    });
    const definitionSchemas = Object.values(defs);

    definitionSchemas.forEach((ds) => {
      traverse(ds, checkCycle(cycleMap), { mutable: true });
    });
  }

  if (cycleMap[`#/definitions/${s.title}`]) {
    s.isCycle = true;
  }

  return s;
}
