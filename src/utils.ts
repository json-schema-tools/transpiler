import deburr from "lodash.deburr";
import trim from "lodash.trim";
import { CoreSchemaMetaSchema as JSONSchema } from "@json-schema-tools/meta-schema";
import { ensureSubschemaTitles } from "./ensure-subschema-titles";
import { createHash } from "crypto";
import traverse from "./traverse";

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

export const schemaToRef = (s: JSONSchema) => ({ $ref: `#/definitions/${s.title}` });
export const joinSchemaTitles = (s: JSONSchema[]): string => s.map(({ title }: JSONSchema) => title).join("_");
export const sortEntriesByKey = ([key1]: [string, JSONSchema], [key2]: [string, JSONSchema]) => key1 > key2 ? -1 : 1;

const hashRegex = new RegExp("[^A-z | 0-9]+", "g");

/**
 * Returns the schema where if the schema.title is not set, a title will be generated based on the contents
 * of the schema. The properties of the schema are sorted such that the names are deterministic based on the
 * content of the schema. That being said, expect that any subtle change to the schema will result in a unique title.
 * If you've included titles on your schema, ensure that the titles are unique for their contents. If they are not,
 * ask yourself this: "why do two different schemas have the same name?".
 *
 * @param schema The JSON Schema to ensure has a title. If the schema is a composite schema (contains
 *                subschema(s)), the subschemas must already have titles.
 * @returns A new schema object that has all the fields of the one passed in, and a title if it didn't
 *          already have one.
 *
 * @category Utils
 * @category SchemaImprover
 *
 */
export function getDefaultTitleForSchema(schema: JSONSchema): JSONSchema {
  if (schema.title) { return schema; }

  const subSchemaTitleErrors = ensureSubschemaTitles(schema);
  if (subSchemaTitleErrors.length > 0) {
    throw subSchemaTitleErrors[0];
  }

  const deterministicSchema = { ...schema };
  let prefix = schema.type ? `${schema.type}_` : "any_";

  ["anyOf", "oneOf", "allOf"].forEach((k) => {
    if (schema[k]) {
      deterministicSchema[k] = schema[k].map((s: JSONSchema) => s.title).sort();
      prefix = `${k}_${deterministicSchema[k].join("_")}_`;
    }
  });

  if (schema.type === "object" && schema.properties) {
    const sProps: { [k: string]: JSONSchema } = schema.properties;
    deterministicSchema.properties = Object.entries(sProps).sort(sortEntriesByKey);
    const joinedTitles = joinSchemaTitles(deterministicSchema.properties.map((val: any) => val[1]));
    prefix = `objectOf_${joinedTitles}_`;
  }

  if (schema.type === "array") {
    if (schema.items instanceof Array === false) {
      const sItems = schema.items as JSONSchema;
      deterministicSchema.items = Object.entries(sItems).sort(sortEntriesByKey);
      prefix = `unorderedSetOf_${sItems.title}`;
    } else {
      prefix = `unorderedSetOf_${joinSchemaTitles(schema.items as JSONSchema[])}`;
    }
  }

  if (schema.enum) {
    deterministicSchema.enum = schema.enum.slice(0).sort();
  }

  delete deterministicSchema.definitions;

  const asEntries = Object.entries(deterministicSchema).sort(sortEntriesByKey);

  // circular refs can't be stringified
  let asString;
  try {
    asString = JSON.stringify(asEntries);
  } catch (e) {
    asString = JSON.stringify(asEntries, (key, value) => {
      if (value instanceof Array) {
        return `${key}[]`;
      }

      if (typeof value === "object") {
        return `${key}{}`;
      }
      return `${key}${value}`;
    });
  }

  const hash = createHash("sha1").update(asString).digest("base64");
  const friendlyHash = hash.replace(hashRegex, "").slice(0, 8);
  return { ...schema, title: `${prefix}${friendlyHash}` };
}

/**
 * Returns a copy of the schema (deep) where if any subschema does not have a title, one will be created.
 * The subschemas can be considered a tree of schemas, and in this case, we are resolving titles on the leaves
 * of the tree. Think depth first traversal, but where the internal nodes' titles are not resolved until
 * it's entire subtree is complete.
 *
 * @param s The schema to ensure has names for it and all subschemas of it.
 *
 * @returns Deep schema copy of the input schema where the schema and all sub schemas have titles.
 *
 * @category Utils
 * @category SchemaImprover
 *
 */
export const ensureSchemaTitles = (s: JSONSchema): JSONSchema => traverse(s, getDefaultTitleForSchema);

/**
 * Returns the schema where all subschemas have been replaced with $refs and added to definitions
 *
 * @param s The schema to ensure has names for it and all subschemas of it.
 *
 * @returns Deep schema copy of the input schema where the schema and all sub schemas have titles.
 *
 * @category Utils
 * @category SchemaImprover
 *
 */
export function collectAndRefSchemas(s: JSONSchema): JSONSchema {
  const definitions: any = {};
  return {
    ...traverse(s, (subSchema: JSONSchema) => {
      definitions[subSchema.title as string] = subSchema;
      return { $ref: `#/definitions/${subSchema.title}` };
    }),
    definitions,
  };
}

export function combineSchemas(s: JSONSchema[]): JSONSchema {
  const combinedDefinitions = s.reduce((comb, schema) => ({
    ...comb,
    ...schema.definitions,
  }), {});

  const withoutDefinitions = s.map((ss) => {
    const copy = { ...ss };
    delete copy.definitions;
    return copy;
  });

  const uniquedSchemas = withoutDefinitions.reduce((uniqued: JSONSchema[], schema: JSONSchema) => {
    if (uniqued.find(({ title }: JSONSchema) => title === schema.title) === undefined) {
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

export function mergeObjectProperties(schemas: JSONSchema[]): JSONSchema {
  const merged = schemas
    .filter(({ properties }: JSONSchema) => properties)
    .map(({ properties }: JSONSchema): { [k: string]: JSONSchema } => properties as { [k: string]: JSONSchema })
    .reduce((all: JSONSchema, schema: JSONSchema) => ({ ...all, ...schema }), {});
  return merged;
}
