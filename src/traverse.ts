import merge from "lodash.merge";
import { JSONMetaSchema } from "@json-schema-tools/meta-schema";

/**
 * Signature of the mutation method passed to traverse.
 */
export type MutationFunction = (schema: JSONMetaSchema) => JSONMetaSchema;

/**
 * The options you can use when traversing.
 */
export interface TraverseOptions {
  /**
   * Set this to true if you don't want to call the mutator function on the root schema.
   */
  skipFirstMutation: boolean;
}

export const defaultOptions: TraverseOptions = {
  skipFirstMutation: false,
};

const isCycle = (s: JSONMetaSchema, recursiveStack: JSONMetaSchema[]) => {
  const foundInRecursiveStack = recursiveStack.find((recSchema) => recSchema === s);
  if (foundInRecursiveStack) {
    return foundInRecursiveStack;
  }
  return false;
};

/**
 * Traverse all subschema of a schema, calling the mutator function with each.
 * The mutator is called on leaf nodes first.
 *
 * @param schema the schema to traverse
 * @param mutation the function to pass each node in the subschema tree.
 * @param traverseOptions a set of options for traversal.
 * @param depth For internal use. Tracks the current recursive depth in the tree. This is used to implement
 *              some of the options.
 *
 */
export default function traverse(
  schema: JSONMetaSchema,
  mutation: MutationFunction,
  traverseOptions = defaultOptions,
  depth = 0,
  recursiveStack: JSONMetaSchema[] = [],
  prePostMap: Array<[JSONMetaSchema, JSONMetaSchema]> = [],
) {
  const mutableSchema: JSONMetaSchema = { ...schema };
  recursiveStack.push(schema);

  prePostMap.push([schema, mutableSchema]);

  const rec = (s: JSONMetaSchema) => {
    const foundCycle = isCycle(s, recursiveStack);
    if (foundCycle) {
      const [, cycledMutableSchema] = prePostMap.find(
        ([orig]) => foundCycle === orig,
      ) as [JSONMetaSchema, JSONMetaSchema];
      return cycledMutableSchema;
    }

    return traverse(
      s,
      mutation,
      traverseOptions,
      depth + 1,
      recursiveStack,
      prePostMap,
    );
  };

  if (schema.anyOf) {
    mutableSchema.anyOf = schema.anyOf.map(rec);
  } else if (schema.allOf) {
    mutableSchema.allOf = schema.allOf.map(rec);
  } else if (schema.oneOf) {
    mutableSchema.oneOf = schema.oneOf.map(rec);
  } else if (schema.items) {
    if (schema.items instanceof Array) {
      mutableSchema.items = schema.items.map(rec);
    } else if (schema.items as any === true) {
      mutableSchema.items = mutation(schema.items);
    } else {
      const foundCycle = isCycle(schema.items, recursiveStack);
      if (foundCycle) {
        const [, cycledMutableSchema] = prePostMap.find(
          ([orig]) => foundCycle === orig,
        ) as [JSONMetaSchema, JSONMetaSchema];
        mutableSchema.items = cycledMutableSchema;
      } else {
        mutableSchema.items = traverse(
          schema.items,
          mutation,
          traverseOptions,
          depth + 1,
          recursiveStack,
          prePostMap,
        );
      }
    }
  } else if (schema.properties) {
    const sProps: { [key: string]: JSONMetaSchema } = schema.properties;
    mutableSchema.properties = Object.keys(sProps)
      .reduce(
        (r: JSONMetaSchema, v: string) => ({ ...r, ...{ [v]: rec(sProps[v]) } }),
        {},
      );
  }

  if (traverseOptions.skipFirstMutation === true && depth === 0) {
    return mutableSchema;
  } else {
    merge(mutableSchema, mutation(mutableSchema));
    return mutableSchema;
  }
}
