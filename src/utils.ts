import deburr from "lodash.deburr";
import trim from "lodash.trim";
import { JSONSchema, Properties, JSONSchemaObject } from "@json-schema-tools/meta-schema";

/**
 * Capitalize the first letter of the string.
 *
 * @param s A word to capitalize. Does not account for leading white spaces.
 *
 * @return capitalized version of the input
 */
export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

const regexes = [
  /(^\s*[^a-zA-Z_$])|([^a-zA-Z_$\d])/g,
  /^_[a-z]/g,
  /_[a-z]/g,
  /([\d$]+[a-zA-Z])/g,
  /\s+([a-zA-Z])/g,
  /\s|_/g,
];
export const languageSafeName = (title: string) => {
  return capitalize(
    deburr(title)
      .replace(regexes[0], " ")
      .replace(regexes[1], (match) => match.toUpperCase())
      .replace(regexes[2], (match) => match.substr(1, match.length).toUpperCase())
      .replace(regexes[3], (match) => match.toUpperCase())
      .replace(regexes[4], (match) => trim(match.toUpperCase()))
      .replace(regexes[5], ""));
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

export const schemaToRef = (s: JSONSchema) => {
  const ref = getTitle(s);
  return { $ref: `#/definitions/${ref}` }
};

export const joinSchemaTitles = (s: JSONSchema[]): string => {
  return s.map(getTitle).join("_");
};

type SchemEntry = [string, JSONSchema];
export const sortEntriesByKey = ([key1]: SchemEntry, [key2]: SchemEntry) => key1 > key2 ? -1 : 1;

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
