import { JSONMetaSchema } from "@json-schema-tools/meta-schema";
import traverse from "@json-schema-tools/traverse";
import { createHash } from "crypto";
import ensureSubschemaTitles from "./ensure-subschema-titles";
import { joinSchemaTitles, sortEntriesByKey } from "./utils";

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
export function getDefaultTitleForSchema(schema: JSONMetaSchema): JSONMetaSchema {
  if ((schema as any) === true || (schema as any) === false) { return schema; }
  if (schema.title) { return schema; }
  if (schema.$ref) { throw new Error("There must not be any refs at this point. Ensure the passed in schema is completely dereferenced."); }

  const subSchemaTitleErrors = ensureSubschemaTitles(schema);
  if (subSchemaTitleErrors.length > 0) {
    throw subSchemaTitleErrors[0];
  }

  const deterministicSchema = { ...schema };
  let prefix = schema.type ? `${schema.type}_` : "any_";

  ["anyOf", "oneOf", "allOf"].forEach((k) => {
    if (schema[k]) {
      deterministicSchema[k] = schema[k].map((s: JSONMetaSchema) => s.title).sort();
      prefix = `${k}_${deterministicSchema[k].join("_")}_`;
    }
  });

  if (schema.type === "object" && schema.properties) {
    const sProps: { [k: string]: JSONMetaSchema } = schema.properties;
    deterministicSchema.properties = Object.entries(sProps).sort(sortEntriesByKey);
    const joinedTitles = joinSchemaTitles(deterministicSchema.properties.map((val: any) => val[1]));
    prefix = `objectOf_${joinedTitles}_`;
  }

  if (schema.type === "array") {
    if (schema.items instanceof Array === false) {
      const sItems = schema.items as JSONMetaSchema;
      deterministicSchema.items = Object.entries(sItems).sort(sortEntriesByKey);
      prefix = `unorderedSetOf_${sItems.title}`;
    } else {
      prefix = `unorderedSetOf_${joinSchemaTitles(schema.items as JSONMetaSchema[])}`;
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

  schema.title = `${prefix}${friendlyHash}`;
  return schema;
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
export default (s: JSONMetaSchema): JSONMetaSchema => traverse(
  s,
  getDefaultTitleForSchema,
  { mutable: true },
);
