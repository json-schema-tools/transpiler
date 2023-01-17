import { JSONSchemaObject } from "@json-schema-tools/meta-schema";
import {replaceTypeAsArrayWithOneOf, languageSafeName} from "./utils";

describe('utils', () => {
  it('can handle no titles on typeArrays', () => {
    const results = replaceTypeAsArrayWithOneOf({
      type: ["string"],
    }) as JSONSchemaObject;
    expect(results.title?.includes("Undefined")).toEqual(false);
  });
})

describe("languageSafeName", () => {
  it("should return a capitalized and deburred string with safe characters", () => {
    const testCases = [
      { title: "32 hex encoded bytes", expected: "ThreeTwoHexEncodedBytes" },
      { title: "64 hex encoded bytes", expected: "SixFourHexEncodedBytes" },
      { title: "hex encoded bytes 32", expected: "HexEncodedBytes32" },
      { title: "hello world!", expected: "HelloWorld" },
      { title: "Hello World!", expected: "HelloWorld" },
      { title: "Hello_World!", expected: "HelloWorld" },
      { title: "Hello_World1!", expected: "HelloWorld1" },
      { title: "Hello_World1toot!", expected: "HelloWorld1Toot" },
      { title: "Hello_World1Toot!", expected: "HelloWorld1Toot" },
      { title: "Hello_World1_Test!", expected: "HelloWorld1Test" },
      { title: "Hello World 1!", expected: "HelloWorld1" },
    ];

    testCases.forEach(({ title, expected }) => {
      const result = languageSafeName(title);
      expect(result).toEqual(expected);
    });
  });
});
