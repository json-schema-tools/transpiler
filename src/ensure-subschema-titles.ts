import { JSONSchema } from "@json-schema-tools/meta-schema";
import traverse from "@json-schema-tools/traverse";

export const stringifyCircular = (obj: any) => {
  const cache: any[] = [];
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return `[Circular: ${value.title ? value.title : "NoTitle"}]`;
      }
      cache.push(value);
    }
    return value;
  }, "\t");
};

/**
 * Structures a nice error message
 */
export class NoTitleError implements Error {
  public name = "NoTitleError";
  public message: string;

  constructor(schema: JSONSchema, parentSchema: JSONSchema) {
    let schemaStr;
    let parentSchemaStr;

    try {
      schemaStr = JSON.stringify(schema);
    } catch (e) {
      schemaStr = stringifyCircular(schema);
    }

    try {
      parentSchemaStr = JSON.stringify(parentSchema);
    } catch (e) {
      parentSchemaStr = stringifyCircular(parentSchema);
    }

    this.message = [
      "Title is required on subschemas.",
      "Without title, identical schemas would return differing names.",
      "",
      "Subschema in question:",
      schemaStr,
      "",
      "Parent Schema:",
      parentSchemaStr,
    ].join("\n");
  }
}

export interface EnsureSubschemasTitleOptions {
  allowLocalRefs?: boolean;
  allowCyclesWithoutTitle?: boolean;
}

/**
 * Check all subschemas of the passed in schema to ensure that they have a title.
 */
export default (s: JSONSchema, options?: EnsureSubschemasTitleOptions): NoTitleError[] => {
  const errors = [] as NoTitleError[];

  let insideCycle = false;
  traverse(s, (ss, isRootCycle) => {
    if (!insideCycle && isRootCycle) {
      insideCycle = isRootCycle;
    }

    if (ss === true || ss === false || ss.title !== undefined) {
      return ss;
    }

    if (options && options.allowLocalRefs === true) {
      if (ss.$ref !== undefined && ss.$ref.indexOf("#") !== -1) {
        return ss;
      }
    }

    if (options && options.allowCyclesWithoutTitle === true && insideCycle) {
      return ss;
    }

    errors.push(new NoTitleError(ss, s));

    return ss;
  }, { skipFirstMutation: true, mutable: true });

  return errors;
};
