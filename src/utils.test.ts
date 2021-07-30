import { JSONSchemaObject } from "@json-schema-tools/meta-schema";
import {replaceTypeAsArrayWithOneOf} from "./utils";

describe('utils', () => {
  it('can handle no titles on typeArrays', () => {
    const results = replaceTypeAsArrayWithOneOf({
      type: ["string"],
    }) as JSONSchemaObject;
    expect(results.title?.includes("Undefined")).toEqual(false);
  });
})
