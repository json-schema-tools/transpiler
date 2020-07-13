import deburr from "lodash.deburr";
import trim from "lodash.trim";
import { JSONMetaSchema, Properties } from "@json-schema-tools/meta-schema";

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

export const schemaToRef = (s: JSONMetaSchema) => ({ $ref: `#/definitions/${s.title}` });
export const joinSchemaTitles = (s: JSONMetaSchema[]): string => s.map(({ title }: JSONMetaSchema) => title).join("_");

type SchemEntry = [string, JSONMetaSchema];
export const sortEntriesByKey = ([key1]: SchemEntry, [key2]: SchemEntry) => key1 > key2 ? -1 : 1;

export function combineSchemas(s: JSONMetaSchema[]): JSONMetaSchema {
  const combinedDefinitions = s.reduce((comb, schema) => ({
    ...comb,
    ...schema.definitions,
  }), {});

  const withoutDefinitions = s.map((ss) => {
    const copy = { ...ss };
    delete copy.definitions;
    return copy;
  });

  const uniquedSchemas = withoutDefinitions.reduce((uniqued: JSONMetaSchema[], schema: JSONMetaSchema) => {
    if (uniqued.find(({ title }: JSONMetaSchema) => title === schema.title) === undefined) {
      return [
        ...uniqued,
        schema,
      ];
    }
    return uniqued;
  }, []);

  return {
    title: `AnyOf_${joinSchemaTitles(s)}`,
    description: "Generated! Represents an alias to any of the provided schemas",
    anyOf: uniquedSchemas.map(schemaToRef),
    definitions: {
      ...combinedDefinitions,
      ...uniquedSchemas.reduce((allOfs, schema) => ({
        ...allOfs,
        [schema.title as string]: schema,
      }), {}),
    },
  };
}

export function mergeObjectProperties(schemas: JSONMetaSchema[]): JSONMetaSchema {
  const merged = schemas
    .filter(({ properties }: JSONMetaSchema) => properties)
    .map(({ properties }: JSONMetaSchema): Properties => properties as Properties)
    .reduce((all: JSONMetaSchema, schema: JSONMetaSchema) => ({ ...all, ...schema }), {});
  return merged;
}
