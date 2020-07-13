import { JSONMetaSchema } from "@json-schema-tools/meta-schema";
import traverse from "@json-schema-tools/traverse";

/**
 * Structures a nice error message
 */
export class NoTitleError implements Error {
  public name = "NoTitleError";
  public message: string;

  constructor(schema: JSONMetaSchema, parentSchema: JSONMetaSchema) {
    this.message = [
      "Title is required on subschemas.",
      "Without title, identical schemas would return differing names.",
      "",
      "Subschema in question:",
      JSON.stringify(schema),
      "",
      "Parent Schema:",
      JSON.stringify(parentSchema),
    ].join("\n");
  }
}

export interface EnsureSubschemasTitleOptions {
  allowLocalRefs: boolean;
}

/**
 * Check all subschemas of the passed in schema to ensure that they have a title.
 */
export default (s: JSONMetaSchema, options?: EnsureSubschemasTitleOptions): NoTitleError[] => {
  const errors = [] as NoTitleError[];

  traverse(s, (ss) => {
    if ((ss as any) === true || (ss as any) === false || ss.title !== undefined) {
      return ss;
    }

    if (options && options.allowLocalRefs === true) {
      if (ss.$ref !== undefined && ss.$ref.indexOf("#") !== -1) {
        return ss;
      }
    }

    errors.push(new NoTitleError(ss, s));

    return ss;
  }, { skipFirstMutation: true });

  return errors;
};
