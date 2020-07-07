import { JSONMetaSchema } from "@json-schema-tools/meta-schema";

/**
 * Structures a nice error message
 */
export class NoTitleError extends Error {
  constructor(schema: JSONMetaSchema, subSchemaKey: string, subschema: JSONMetaSchema) {
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
export const ensureSubschemaTitles = (s: JSONMetaSchema): NoTitleError[] => {
  const errors = [];

  if ((s as any) === true || (s as any) === false) {
    return [];
  }

  ["anyOf", "oneOf", "allOf"].forEach((k) => {
    if (!s[k]) { return; }
    s[k].forEach((ss: JSONMetaSchema, i: number) => {
      if ((ss as any) === true || (ss as any) === false) {
        return [];
      }
      if (ss.title === undefined) { errors.push(new NoTitleError(s, `${k}[${i}]`, ss)); }
    });
  });

  if (s.items) {
    if (s.items instanceof Array) {
      s.items.forEach((ss: JSONMetaSchema, i: number) => {
        if ((ss as any) === true || (ss as any) === false) {
          return [];
        }
        if (ss.title === undefined) { errors.push(new NoTitleError(s, `items[${i}]`, ss)); }
      });
    } else {
      if ((s.items as any) === true || (s.items as any) === false) {
        return [];
      }
      if (s.items.title === undefined) { errors.push(new NoTitleError(s, "items", s.items)); }
    }
  }

  if (s.properties) {
    const propVals = Object.entries(s.properties) as any;
    propVals.forEach(([key, ss]: [string, JSONMetaSchema]) => {
      if ((ss as any) === true || (ss as any) === false) {
        return [];
      }
      if (ss.title === undefined) { errors.push(new NoTitleError(s, `properties.${key}`, ss)); }
    });
  }

  return errors;
};
