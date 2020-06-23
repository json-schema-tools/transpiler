import { CoreSchemaMetaSchema as JSONSchema } from "@json-schema-tools/meta-schema";

/**
 * Structures a nice error message
 */
export class NoTitleError extends Error {
  constructor(schema: JSONSchema, subSchemaKey: string, subschema: JSONSchema) {
    super([
      "Title is required on subschemas.",
      "Without title, identical schemas would return differing names.",
      "",
      "Schema in question:",
      JSON.stringify(schema),
      "",
      "Key containing problematic subschema:",
      subSchemaKey,
      "",
      "offending subschema:",
      JSON.stringify(subschema),
    ].join("\n"));
  }
}

/**
 * Check all subschemas of the passed in schema to ensure that they have a title.
 */
export const ensureSubschemaTitles = (s: JSONSchema): NoTitleError[] => {
  const errors = [];

  ["anyOf", "oneOf", "allOf"].forEach((k) => {
    if (!s[k]) { return; }
    s[k].forEach((ss: JSONSchema, i: number) => {
      if (ss.title === undefined) { errors.push(new NoTitleError(s, `${k}[${i}]`, ss)); }
    });
  });

  if (s.items) {
    if (s.items instanceof Array) {
      s.items.forEach((ss: JSONSchema, i: number) => {
        if (ss.title === undefined) { errors.push(new NoTitleError(s, `items[${i}]`, ss)); }
      });
    } else {
      if (s.items.title === undefined) { errors.push(new NoTitleError(s, "items", s.items)); }
    }
  }

  if (s.properties) {
    const propVals = Object.entries(s.properties) as Array<[string, JSONSchema]>;
    propVals.forEach(([key, ss]: [string, JSONSchema]) => {
      if (ss.title === undefined) { errors.push(new NoTitleError(s, `properties.${key}`, ss)); }
    });
  }

  return errors;
};
