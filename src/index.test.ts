import Transpiler from "./index";
import { Definitions, Properties, JSONSchemaObject, SchemaArray } from "@json-schema-tools/meta-schema";

describe("Transpiler", () => {
  it("can be instantiated with a schema with subschemas", () => {
    const t = new Transpiler({
      title: "test",
      type: "object",
      properties: {
        foo: { type: "string" },
        bar: { type: "string" },
      },
    });
    const megaDefs = (t.megaSchema as JSONSchemaObject).definitions as Definitions;
    expect(megaDefs.string_doaGddGA).toBeDefined();
  });

  it("can output to typescript", () => {
    const transpiler = new Transpiler({});
    expect(transpiler.toTypescript()).toEqual("export type AnyL9Fw4VUO = any;");
  });

  it("can deal with boolean schema at the root", () => {
    const t = new Transpiler(true);
    expect(t).toBeDefined();
  });

  it("can deal with nested boolean schema", () => {
    const t = new Transpiler({
      type: "object",
      properties: {
        boolSchemaT: true,
        boolSchemaF: false,
      },
    });
    expect(t).toBeDefined();

    const megaDefs = (t.megaSchema as JSONSchemaObject).definitions as Definitions;
    expect(megaDefs.AlwaysTrue).toBe(true);
    expect(megaDefs.AlwaysFalse).toBe(false);
  });

  it("handles cycles", () => {
    const testSchema = {
      title: "foo bar",
      type: "object",
      properties: {
        foo: {
          type: "string",
        },
        fooBar: {},
      },
    };

    testSchema.properties.fooBar = testSchema;

    const transpiler = new Transpiler(testSchema);
    const props = ((transpiler.megaSchema as JSONSchemaObject).properties as Properties);
    const defs = ((transpiler.megaSchema as JSONSchemaObject).definitions as Definitions);
    expect(props.foo.$ref).toBe("#/definitions/string_doaGddGA");
    expect(props.fooBar.$ref).toBe("#/definitions/foo bar");
    expect(defs["foo bar"].$ref).toBe("#");
  });

  it("Works when being passed multiple schemas", () => {
    expect.assertions(12);
    const testSchemas = [
      {
        title: "foo",
        type: "object",
        properties: {
          bar: {
            title: "bar",
            type: "string",
          },
          crazyCrossRefs: {
            title: "crazyCrossRefs",
            type: "string"
          },
        },
      }, {
        title: "baz",
        type: "object",
        properties: {
          foo: {
            title: "foo",
            type: "object",
            properties: {
              bar: {
                title: "bar",
                type: "string",
              },
              crazyCrossRefs: {},
            },
          },
          fooBar: {},
        },
      }
    ] as any;
    testSchemas[1].properties.foo.properties.crazyCrossRefs = testSchemas[0].properties.crazyCrossRefs;

    const transpiler = new Transpiler(testSchemas);
    const megaSchema = transpiler.megaSchema as JSONSchemaObject;

    expect(megaSchema.title).toBe("AnyOf_foo_baz");
    expect(megaSchema.anyOf).toHaveLength(2);
    const megaAnys = megaSchema.anyOf as SchemaArray;
    expect(megaAnys[0]).toEqual({ $ref: "#/definitions/foo" });
    expect(megaAnys[1]).toEqual({ $ref: "#/definitions/baz" });
    const megaDefs = megaSchema.definitions as Definitions;
    expect(megaDefs.foo.title).toBe("foo");
    expect(megaDefs.foo.properties.bar).toEqual({ $ref: "#/definitions/bar" });
    expect(megaDefs.bar.title).toBe("bar");
    expect(megaDefs.bar.type).toBe("string");
    expect(megaDefs.baz.properties.foo).toEqual({ $ref: "#/definitions/foo" });
    expect(megaDefs.baz.properties.foo).toEqual({ $ref: "#/definitions/foo" });
    expect(megaDefs.crazyCrossRefs.title).toBe("crazyCrossRefs");
    expect(megaDefs.foo.properties.crazyCrossRefs).toEqual({ $ref: "#/definitions/crazyCrossRefs" });
  });
});
