import traverse from "./traverse";
import { JSONMetaSchema } from "@json-schema-tools/meta-schema";

describe("traverse", () => {
  it("it calls mutate only once when there are no subschemas", () => {
    const testSchema = {};
    const mockMutation = jest.fn((s) => s);

    traverse(testSchema, mockMutation);

    expect(mockMutation).toHaveBeenCalledTimes(1);
  });

  describe("basic functionality", () => {
    const test = (prop: string, useVal?: any) => {
      const a = {};
      const b = {};
      const testSchema: any = {};
      testSchema[prop] = useVal ? useVal : [a, b];
      const mockMutation = jest.fn((mockS) => mockS);

      traverse(testSchema, mockMutation);

      if (useVal) {
        expect(mockMutation).toHaveBeenCalledWith(useVal);
      } else {
        expect(mockMutation).toHaveBeenCalledWith(a);
      }
    };

    ["anyOf", "oneOf", "allOf"].forEach((prop) => {
      it(`traverses ${prop}`, () => test(prop));
    });

    it("traverses items when items is ordered list", () => test("items"));
    it("traverses items when items constrained to single schema", () => test("items", { a: {}, b: {} }));
    it("traverses properties", () => {
      const testSchema: any = {
        properties: {
          a: {},
          b: {},
        },
      };
      const mockMutation = jest.fn((mockS) => mockS);

      traverse(testSchema, mockMutation);

      expect(mockMutation).toHaveBeenCalledWith(testSchema.properties.a);
      expect(mockMutation).toHaveBeenCalledWith(testSchema.properties.b);
      expect(mockMutation).toHaveBeenCalledWith(testSchema);
      expect(mockMutation).toHaveBeenCalledTimes(3);
    });

    it("skips the first schema when the option skipFirstMutation is true", () => {
      const testSchema: any = { anyOf: [{}, {}] };
      const mockMutation = jest.fn((mockS) => mockS);

      traverse(testSchema, mockMutation, { skipFirstMutation: true });

      expect(mockMutation).not.toHaveBeenCalledWith(testSchema);
      expect(mockMutation).toHaveBeenCalledTimes(2);
    });
  });

  describe("cycle detection", () => {
    it("handles basic cycles", () => {
      const schema = { type: "object", properties: { foo: {} } };
      schema.properties.foo = schema;
      const mockMutation = jest.fn((s) => s);
      traverse(schema, mockMutation);
      expect(mockMutation).toHaveBeenCalledTimes(1);
    });

    it("handles chained cycles", () => {
      const schema = {
        title: "1",
        type: "object",
        properties: {
          foo: {
            title: "2",
            items: [
              {
                title: "3",
                type: "array",
                items: { title: "4" },
              },
            ],
          },
        },
      };
      schema.properties.foo.items[0].items = schema;
      const mockMutation = jest.fn((s) => s);
      traverse(schema, mockMutation);
      expect(mockMutation).toHaveBeenCalledTimes(3);
    });

    it("handles chained cycles where the cycle starts in the middle", () => {
      const schema = {
        title: "1",
        type: "object",
        properties: {
          foo: {
            title: "2",
            anyOf: [
              {
                title: "3",
                type: "array",
                items: {
                  title: "4",
                  properties: {
                    baz: { title: "5" },
                  },
                },
              },
            ],
          },
        },
      };
      schema.properties.foo.anyOf[0].items.properties.baz = schema.properties.foo;
      const mockMutation = jest.fn((s) => s);
      traverse(schema, mockMutation);
      expect(mockMutation).toHaveBeenCalledTimes(4);
    });

    it("handles chained cycles where the cycle starts in the middle of a different branch of the tree", () => {
      const schema = {
        title: "1",
        type: "object",
        properties: {
          foo: {
            title: "2",
            anyOf: [
              {
                title: "3",
                type: "array",
                items: {
                  title: "4",
                  properties: {
                    baz: { title: "5" },
                  },
                },
              },
            ],
          },
          bar: {
            title: "6",
            type: "object",
            allOf: [
              { title: "7", type: "object", properties: { baz: { title: "8" } } },
            ],
          },
        },
      };
      schema.properties.foo.anyOf[0].items.properties.baz = schema;
      schema.properties.bar.allOf[0].properties.baz = schema.properties.foo.anyOf[0];
      const mockMutation = jest.fn((s) => s);
      traverse(schema, mockMutation);
      expect(mockMutation).toHaveBeenCalledTimes(6);
    });

    it("handles multiple cycles", () => {
      const schema: any = {
        title: "1",
        type: "object",
        properties: {
          foo: {
            title: "2",
            anyOf: [
              {
                title: "3",
                type: "array",
                items: {
                  title: "4",
                  properties: {
                    baz: { title: "5" },
                  },
                },
              },
            ],
          },
          bar: {
            title: "6",
            type: "object",
            allOf: [
              { title: "7", type: "object", properties: { baz: { title: "8" } } },
            ],
          },
        },
      };
      schema.properties.bar.allOf[0].properties.baz = schema.properties.foo.anyOf[0].items.properties.baz;
      schema.properties.bar.allOf.push(schema); // should not add any calls
      schema.properties.bar.allOf.push(schema.properties.foo.anyOf[0].items); // should not add any calls
      const mockMutation = jest.fn((s) => s);
      traverse(schema, mockMutation);
      expect(mockMutation).toHaveBeenCalledTimes(7);
    });

    it("returned mutated schema has circ refs back to the mutated schema instead of original", () => {
      const schema: any = {
        title: "2",
        type: "object",
        properties: {
          foo: {
            title: "1",
            items: [
              {
                title: "0",
                type: "array",
                items: { title: "2" },
              },
            ],
          },
        },
      };
      schema.properties.foo.items[0].items = schema; // set the leaf to a ref back to root schema
      let i = 0;
      const result = traverse(schema, (s: JSONMetaSchema) => {
        s.i = i;
        i += 1;
        return s;
      });
      const rProps = result.properties as any;
      expect(result.i).toBe(2);
      expect(rProps.foo.items[0].i).toBe(0);
      expect(rProps.foo.items[0].items.i).toBe(result.i);
    });
  });
});
