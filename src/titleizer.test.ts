import titleizer, { getDefaultTitleForSchema } from "./titleizer";
import { NoTitleError } from "./ensure-subschema-titles";

describe("titleizer", () => {

  it("does not change anything if theres already a title", () => {
    const testSchema = { title: "foo" };
    const result = titleizer(testSchema);
    expect(result).toBe(testSchema);
  });

  describe("getDefaultTitleForSchema", () => {

    describe("subschemas must have titles", () => {
      it("anyOf", () => {
        expect(() => getDefaultTitleForSchema({
          anyOf: [{ title: "abc" }, {}],
        })).toThrow(NoTitleError);
      });

      it("allOf", () => {
        expect(() => getDefaultTitleForSchema({
          allOf: [{ title: "abc" }, {}],
        })).toThrow(NoTitleError);
      });

      it("oneOf", () => {
        expect(() => getDefaultTitleForSchema({
          oneOf: [{ title: "abc" }, {}],
        })).toThrow(NoTitleError);
      });

      it("items", () => {
        expect(() => getDefaultTitleForSchema({
          items: [{ title: "abc" }, {}],
        })).toThrow(NoTitleError);
      });

      it("properties", () => {
        expect(() => getDefaultTitleForSchema({
          properties: { a: { title: "abc" }, b: {} },
        })).toThrow(NoTitleError);
      });
    });

    describe("different schema yields different name", () => {

      it("type", () => {
        expect(getDefaultTitleForSchema({ type: "string" }))
          .not
          .toEqual(getDefaultTitleForSchema({ type: "number" }));
      });

      it("additional properties such as minimum", () => {
        expect(getDefaultTitleForSchema({ type: "number" }))
          .not
          .toEqual(getDefaultTitleForSchema({ type: "number", minimum: 3 }));
      });

      it("different titles same everything else", () => {
        expect(getDefaultTitleForSchema({ type: "number", title: "b" }))
          .not
          .toEqual(getDefaultTitleForSchema({ type: "number", title: "a" }));
      });

      it("when items is an array, order matters", () => {
        const a = { title: "a" };
        const b = { title: "b" };

        const t1 = { type: "array", items: [a, b] };
        const t2 = { type: "array", items: [b, a] };

        expect(getDefaultTitleForSchema(t1))
          .not
          .toEqual(getDefaultTitleForSchema(t2));
      });
    });

    describe("same schema yields same name", () => {

      it("anyOf, oneOf and allOf order does not matter", () => {
        const a = { title: "foo" };
        const b = { title: "bar" };

        ["anyOf", "oneOf", "allOf"].forEach((k) => {
          const t1 = { [k]: [a, b] };
          const t2 = { [k]: [b, a] };
          expect(getDefaultTitleForSchema(t1).title)
            .toEqual(getDefaultTitleForSchema(t2).title);
        });
      });

      it("object properties ordering does not matter", () => {
        const a = { title: "foo" };
        const b = { title: "bar" };

        const t1 = { type: "object", properties: { a, b } };
        const t2 = { type: "object", properties: { b, a } };

        expect(getDefaultTitleForSchema(t1).title)
          .toEqual(getDefaultTitleForSchema(t2).title);
      });

      it("when array items is an object (single schema), property ordering does not matter", () => {
        const a = { type: "integer", title: "foo" };
        const b = { title: "foo", type: "integer" };

        const t1 = { type: "array", items: a };
        const t2 = { type: "array", items: b };

        expect(getDefaultTitleForSchema(t1))
          .toEqual(getDefaultTitleForSchema(t2));
      });

      it("order of enum values doesnt matter", () => {
        const a = { type: "number", enum: [1, 2, 3] };
        const b = { type: "number", enum: [3, 2, 1] };

        expect(getDefaultTitleForSchema(a).title)
          .toEqual(getDefaultTitleForSchema(b).title);
      });

      it("definitions are ignored", () => {
        const a = { type: "number", definitions: { a: { type: "number" } } };
        const b = { type: "number", definitions: { b: { type: "string" } } };

        expect(getDefaultTitleForSchema(a).title)
          .toEqual(getDefaultTitleForSchema(b).title);
      });
    });
  });
});
