import Transpiler from "./index";
import { Definitions, Properties, JSONSchemaObject, SchemaArray, JSONSchema } from "@json-schema-tools/meta-schema";

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

  it("dispatches to the language method via to()", () => {
    const transpiler = new Transpiler({});
    expect(transpiler.to("typescript")).toEqual(transpiler.toTypescript());
    expect(transpiler.to("ts")).toEqual(transpiler.toTypescript());
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

    const transpiler = new Transpiler(testSchema as JSONSchema);
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

describe("inlinePrimitiveTypes option (#726)", () => {
  const schema = {
    title: "Person",
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "integer" },
    },
  } as any;

  it("is off by default (aliases generated)", () => {
    const out = new Transpiler(schema).toGolang();
    expect(out).toMatch("type StringDoaGddGA string");
    expect(out).toMatch("Name *StringDoaGddGA");
  });

  it("inlines primitives in Go", () => {
    const out = new Transpiler(schema, { inlinePrimitiveTypes: true }).toGolang();
    expect(out).not.toMatch("type StringDoaGddGA string");
    expect(out).toMatch("Name *string");
    expect(out).toMatch("Age  *int64");
  });

  it("inlines primitives in TypeScript", () => {
    const out = new Transpiler(schema, { inlinePrimitiveTypes: true }).toTypescript();
    expect(out).not.toMatch("StringDoaGddGA");
    expect(out).toMatch("name?: string;");
    expect(out).toMatch("age?: number;");
  });

  it("inlines primitives in Rust", () => {
    const out = new Transpiler(schema, { inlinePrimitiveTypes: true }).toRust();
    expect(out).not.toMatch("pub type String");
    expect(out).toMatch("pub name: Option<String>");
  });

  it("does not inline non-trivial schemas (enums, constrained)", () => {
    const out = new Transpiler({
      title: "E",
      type: "object",
      properties: {
        color: { type: "string", enum: ["r", "g"] },
      },
    } as any, { inlinePrimitiveTypes: true }).toGolang();
    // enum is not a trivial primitive: alias is still generated
    expect(out).toMatch(/type String\w+ string/);
    expect(out).toMatch("Color *String");
  });
});

describe("Java codegen (#319)", () => {
  it("generates a POJO with Jackson annotations", () => {
    const out = new Transpiler({
      title: "Person",
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
    } as any).toJava();
    expect(out).toMatch("public class Person");
    expect(out).toMatch('@JsonProperty("name")');
    expect(out).toMatch("private String name;");
    expect(out).toMatch("private Long age;");
    expect(out).toMatch("public String getName()");
    expect(out).toMatch("import com.fasterxml.jackson.annotation.JsonProperty;");
  });

  it("inlines arrays as List", () => {
    const out = new Transpiler({
      title: "Team",
      type: "object",
      properties: {
        members: { type: "array", items: { type: "string" } },
      },
    } as any).toJava();
    expect(out).toMatch("private List<String> members;");
    expect(out).toMatch("import java.util.List;");
    expect(out).not.toMatch("class String");
  });

  it("generates enums", () => {
    const out = new Transpiler({
      title: "Order",
      type: "object",
      properties: {
        status: { type: "string", enum: ["pending", "shipped"] },
      },
    } as any).toJava();
    expect(out).toMatch("public enum");
    expect(out).toMatch("PENDING");
    expect(out).toMatch("private StringGg8YvbkL status;");
  });

  it("is dispatchable via to()", () => {
    const t = new Transpiler({ title: "X", type: "string" } as any);
    expect(t.to("java")).toEqual(t.toJava());
  });
});

describe("Java codegen coverage (#319)", () => {
  it("handles primitive types", () => {
    const out = new Transpiler({
      title: "P", type: "object",
      properties: {
        b: { type: "boolean" },
        n: { type: "number" },
        i: { type: "integer" },
        s: { type: "string" },
        nu: { type: "null" },
      },
    } as any).toJava();
    expect(out).toMatch("private Boolean b;");
    expect(out).toMatch("private Double n;");
    expect(out).toMatch("private Long i;");
    expect(out).toMatch("private String s;");
    expect(out).toMatch("private Object nu;");
  });

  it("handles untyped schemas", () => {
    const out = new Transpiler({ title: "U" } as any).toJava();
    expect(out).toMatch("Object");
  });

  it("handles boolean schemas", () => {
    const out = new Transpiler({
      title: "B", type: "object",
      properties: { t: true as any, f: false as any },
    } as any).toJava();
    expect(out).toBeDefined();
  });

  it("handles anyOf/oneOf/allOf with fallback", () => {
    const out = new Transpiler({
      title: "W", type: "object",
      properties: {
        a: { anyOf: [{ type: "string" }, { type: "integer" }] },
        o: { oneOf: [{ type: "string" }, { type: "integer" }] },
        al: { allOf: [{ type: "object", properties: { x: { type: "string" } } }] },
      },
    } as any).toJava();
    expect(out).toMatch("private Object a;");
    expect(out).toMatch("private Object o;");
  });

  it("handles numerical enums with fallback", () => {
    const out = new Transpiler({
      title: "N", type: "object",
      properties: { e: { type: "integer", enum: [1, 2] } },
    } as any).toJava();
    expect(out).toBeDefined();
  });

  it("handles untyped objects as maps", () => {
    const out = new Transpiler({
      title: "M", type: "object",
      properties: {
        map: { type: "object", additionalProperties: { type: "string" } },
      },
    } as any).toJava();
    expect(out).toMatch("Map<String, Object>");
  });

  it("includes descriptions as javadoc", () => {
    const out = new Transpiler({
      title: "D",
      description: "A documented class",
      type: "object",
      properties: { x: { type: "string", description: "A field" } },
    } as any).toJava();
    expect(out).toMatch("A documented class");
  });
});

describe("Java codegen edge cases (#319)", () => {
  it("handles ordered arrays with fallback", () => {
    const out = new Transpiler({
      title: "T", type: "object",
      properties: {
        tup: { type: "array", items: [{ type: "string" }, { type: "integer" }] },
      },
    } as any).toJava();
    expect(out).toMatch("List<Object>");
  });

  it("handles root-level enum", () => {
    const out = new Transpiler({
      title: "Status",
      type: "string",
      enum: ["a", "b"],
    } as any).toJava();
    expect(out).toMatch("public enum Status");
  });

  it("handles nested objects in arrays", () => {
    const out = new Transpiler({
      title: "Team", type: "object",
      properties: {
        members: {
          type: "array",
          items: {
            title: "Member", type: "object",
            properties: { name: { type: "string" } },
          },
        },
      },
    } as any).toJava();
    expect(out).toMatch("public class Member");
    expect(out).toMatch("private List<Member> members;");
  });
});

describe("Java additionalProperties (#319)", () => {
  it("warns on objects with additionalProperties", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const out = new Transpiler({
      title: "W", type: "object",
      properties: { x: { type: "string" } },
      additionalProperties: { type: "string" },
    } as any).toJava();
    expect(warnSpy).toHaveBeenCalled();
    expect(out).toMatch("public class W");
    warnSpy.mockRestore();
  });
});
