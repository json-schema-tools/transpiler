import traverse from "@json-schema-tools/traverse";
import { JSONSchema } from "@json-schema-tools/meta-schema";
import ensureSubschemaTitles from "./ensure-subschema-titles";

const deleteAllProps = (o: { [k: string]: any }) => {
  Object.keys(o)
    .forEach((k) => { delete o[k]; });
};

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
export default (s: JSONSchema): JSONSchema => {
  const definitions: any = {};

  // check first since we are going to mutate the input. Slower but safer...
  const subSchemaTitleErrors = ensureSubschemaTitles(s, { allowLocalRefs: true });

  if (subSchemaTitleErrors.length > 0) {
    console.error("Hit error while referencing");
    throw subSchemaTitleErrors[0];
  }

  traverse(
    s,
    (subSchema: JSONSchema, isRootCycle: boolean) => {
      let t = "";
      if (isRootCycle && subSchema !== true && subSchema !== false) {
        if (subSchema.$ref) {
          const title = subSchema.$ref.replace("#/definitions/", "");
          const hasDefForRef = definitions[title];

          if (hasDefForRef === undefined) {
            throw new Error(`Encountered unknown $ref: ${subSchema.$ref}`);
          }

          return subSchema;
        }

        if (subSchema === s) {
          definitions[s.title as string] = { $ref: `#` };
          return { $ref: `#/definitions/${s.title}` };
        }

        definitions[subSchema.title as string] = { ...subSchema };
        deleteAllProps(subSchema);
        subSchema.$ref = `#/definitions/${subSchema.title}`;
        return subSchema;
      }

      if (subSchema === true) {
        t = "AlwaysTrue";
        definitions[t as string] = true;
      } else if (subSchema === false) {
        t = "AlwaysFalse";
        definitions[t as string] = false;
      } else if (subSchema.$ref !== undefined && subSchema.$ref.indexOf("#") !== -1) {
        return subSchema;
      } else {
        t = subSchema.title as string;
        definitions[t as string] = { ...subSchema };
        deleteAllProps(subSchema);
        subSchema.$ref = `#/definitions/${t}`;
      }

      return subSchema;
    },
    { mutable: true, skipFirstMutation: true },
  );

  if (typeof s === "object" && Object.keys(definitions).length > 0) {
    s.definitions = { ...s.definitions, ...definitions };
  }

  return s;
};
