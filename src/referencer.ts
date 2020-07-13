import traverse from "@json-schema-tools/traverse";
import { JSONMetaSchema, Title } from "@json-schema-tools/meta-schema";
import ensureSubschemaTitles from "./ensure-subschema-titles";

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
export default (s: JSONMetaSchema): JSONMetaSchema => {
  const definitions: any = {};

  // check first since we are going to mutate the input. Slower but safer...
  const subSchemaTitleErrors = ensureSubschemaTitles(s, { allowLocalRefs: true });

  if (subSchemaTitleErrors.length > 0) {
    throw subSchemaTitleErrors[0];
  }

  traverse(
    s,
    (subSchema: JSONMetaSchema) => {
      let t = "";

      if ((subSchema as any) === true) {
        t = "AlwaysTrue";
      } else if ((subSchema as any) === false) {
        t = "AlwaysFalse";
      } else if (subSchema.$ref !== undefined && subSchema.$ref.indexOf("#") !== -1) {
        return subSchema;
      } else {
        t = subSchema.title as string;
      }

      if (subSchema === s) {
        definitions[s.title as Title] = { $ref: `#` };
        subSchema.$ref = `#/definitions/${s.title}`;
        // preserves ability to get titles from reffed subschemas
        // the seemingly more obvious way to do this would be to just return { $ref: "#" } but this causes
        // a lot of problems down the road, since you may very well lose which schema # refers to.. ($id shananiganry)
        return { $ref: `#/definitions/${s.title}` };
      }

      definitions[t as string] = subSchema;
      return { $ref: `#/definitions/${t}` };
    },
    { mutable: true, skipFirstMutation: true },
  );

  if (typeof s === "object" && Object.keys(definitions).length > 0) {
    s.definitions = { ...s.definitions, ...definitions };
  }

  return s;
};
