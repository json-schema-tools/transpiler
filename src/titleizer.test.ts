// import titleizer, { getDefaultTitleForSchema } from "./titleizer";
// import { NoTitleError } from "./ensure-subschema-titles";
// import { Properties, JSONMetaSchema } from "@json-schema-tools/meta-schema";

// describe("titleizer", () => {

//   it("does not change anything if theres already a title", () => {
//     const testSchema = { title: "foo" };
//     const result = titleizer(testSchema);
//     expect(result.title).toBe("foo");
//   });

//   it("sets titles on everything missing one", () => {
//     const testSchema = {
//       type: "object",
//       properties: {
//         foo: { type: "string" },
//         bar: {
//           anyOf: [
//             { type: "string" },
//             { type: "number" },
//           ],
//         },
//       },
//     };

//     const titledSchema = titleizer(testSchema);
//     expect(titledSchema).toHaveProperty("title");

//     const props = (titledSchema.properties as Properties);

//     expect(props.foo).toHaveProperty("title");
//     expect(props.bar).toHaveProperty("title");

//     expect(props.bar.anyOf).toHaveLength(2);
//     expect(props.bar.anyOf[0]).toHaveProperty("title");
//     expect(props.bar.anyOf[1]).toHaveProperty("title");
//   });

//   it("handles cross-referenced dupes", () => {
//     const testSchema = {
//       type: "object",
//       properties: {
//         foo: { type: "string" },
//         bar: {
//           anyOf: [
//             { type: "number" },
//           ],
//         },
//       },
//     };

//     testSchema.properties.bar.anyOf.push(testSchema.properties.foo);

//     const titledSchema = titleizer(testSchema);
//     const props = (titledSchema.properties as Properties);

//     expect(props.foo.title).toBe("string_doaGddGA");
//     expect(props.bar.anyOf[1]).toBe(props.foo);
//   });

//   it("handles cycles in the middle: oneOf", () => {
//     const testSchema = {
//       type: "object",
//       properties: {
//         foo: { type: "string" },
//         bar: {
//           oneOf: [
//             { type: "string" },
//             { type: "number" },
//           ] as JSONMetaSchema[],
//         },
//       },
//     };

//     testSchema.properties.bar.oneOf.push(testSchema.properties.bar);

//     const titledSchema = titleizer(testSchema);
//     const props = (titledSchema.properties as Properties);

//     expect(titledSchema).toHaveProperty("title");
//     expect(props.bar.oneOf[2]).toHaveProperty("title");
//     expect(props.bar.oneOf[2]).toBe(props.bar);
//     expect(props.bar.oneOf[2].title).toBe("oneOf_number_Ho1clIqD_self_string_doaGddGA_wGyf9nC9");
//   });

//   it("handles cycles in the middle: anyOf", () => {
//     const testSchema = {
//       type: "object",
//       properties: {
//         foo: { type: "string" },
//         bar: {
//           anyOf: [
//             { type: "string", enum: ["a", "b", "c"] },
//             { type: "array", items: {} },
//           ] as JSONMetaSchema[],
//         },
//       },
//     };

//     testSchema.properties.bar.anyOf[1].items = testSchema.properties.bar.anyOf[0];

//     const titledSchema = titleizer(testSchema);
//     const props = (titledSchema.properties as Properties);

//     expect(titledSchema).toHaveProperty("title");
//     expect(props.bar).toHaveProperty("title");
//     expect(props.bar.anyOf[0]).toHaveProperty("title");
//     expect(props.bar.anyOf[1]).toHaveProperty("title");
//     expect(props.bar.anyOf[1].items).toHaveProperty("title");
//     expect(props.bar.anyOf[1].items).toBe(props.bar.anyOf[0]);
//   });

//   it("handles cycles to the root", () => {
//     const testSchema = {
//       anyOf: [
//         { type: "number" },
//       ] as any,
//     };

//     testSchema.anyOf.push(testSchema);

//     const titledSchema = titleizer(testSchema);

//     expect(titledSchema).toHaveProperty("title");
//     expect(titledSchema.title).toBe("anyOf_number_Ho1clIqD_self_vpYSV1F8");
//     expect(titledSchema.anyOf[1]).toHaveProperty("title");
//     expect(titledSchema.anyOf[1]).toBe(titledSchema);
//   });

//   it("handles deep cycles to the root", () => {
//     const testSchema = {
//       type: "object",

//       title: "root",
//       properties: {
//         foo: {
//           anyOf: [
//             { type: "number" },
//           ] as any,
//         },
//       },
//     };

//     testSchema.properties.foo.anyOf.push(testSchema);

//     const titledSchema = titleizer(testSchema);

//     expect(titledSchema).toHaveProperty("title");

//     const props = (titledSchema.properties as Properties);

//     expect(props.foo.anyOf[1]).toHaveProperty("title");
//     expect(props.foo.anyOf[1]).toBe(titledSchema);
//   });

//   describe.only("getDefaultTitleForSchema", () => {

//     describe("subschemas must have titles", () => {
//       it("anyOf", () => {
//         expect(() => getDefaultTitleForSchema({
//           anyOf: [{ title: "abc" }, {}],
//         })).toThrow(NoTitleError);
//       });

//       it("allOf", () => {
//         expect(() => getDefaultTitleForSchema({
//           allOf: [{ title: "abc" }, {}],
//         })).toThrow(NoTitleError);
//       });

//       it("oneOf", () => {
//         expect(() => getDefaultTitleForSchema({
//           oneOf: [{ title: "abc" }, {}],
//         })).toThrow(NoTitleError);
//       });

//       it("items", () => {
//         expect(() => getDefaultTitleForSchema({
//           items: [{ title: "abc" }, {}],
//         })).toThrow(NoTitleError);
//       });

//       it("properties", () => {
//         expect(() => getDefaultTitleForSchema({
//           properties: { a: { title: "abc" }, b: {} },
//         })).toThrow(NoTitleError);
//       });
//     });

//     describe("different schema yields different name", () => {

//       it("type", () => {
//         expect(getDefaultTitleForSchema({ type: "string" }))
//           .not
//           .toEqual(getDefaultTitleForSchema({ type: "number" }));
//       });

//       it("additional properties such as minimum", () => {
//         expect(getDefaultTitleForSchema({ type: "number" }))
//           .not
//           .toEqual(getDefaultTitleForSchema({ type: "number", minimum: 3 }));
//       });

//       it("different titles same everything else", () => {
//         expect(getDefaultTitleForSchema({ type: "number", title: "b" }))
//           .not
//           .toEqual(getDefaultTitleForSchema({ type: "number", title: "a" }));
//       });

//       it("when items is an array, order matters", () => {
//         const a = { title: "a" };
//         const b = { title: "b" };

//         const t1 = { type: "array", items: [{ ...a }, { ...b }] };
//         const t2 = { type: "array", items: [{ ...b }, { ...a }] };

//         expect(getDefaultTitleForSchema(t1))
//           .not
//           .toEqual(getDefaultTitleForSchema(t2));
//       });
//     });

//     describe("same schema yields same name", () => {

//       it("anyOf, oneOf and allOf order does not matter", () => {
//         const a = { title: "foo" };
//         const b = { title: "bar" };

//         ["anyOf", "oneOf", "allOf"].forEach((k) => {
//           const t1 = { [k]: [a, b] };
//           const t2 = { [k]: [b, a] };
//           expect(getDefaultTitleForSchema(t1).title)
//             .toEqual(getDefaultTitleForSchema(t2).title);
//         });
//       });

//       it("object properties ordering does not matter", () => {
//         const a = { title: "foo" };
//         const b = { title: "bar" };

//         const t1 = { type: "object", properties: { a, b } };
//         const t2 = { type: "object", properties: { b, a } };

//         expect(getDefaultTitleForSchema(t1).title)
//           .toEqual(getDefaultTitleForSchema(t2).title);
//       });

//       it("when array items is an object (single schema), property ordering does not matter", () => {
//         const a = { type: "integer", title: "foo" };
//         const b = { title: "foo", type: "integer" };

//         const t1 = { type: "array", items: a };
//         const t2 = { type: "array", items: b };

//         expect(getDefaultTitleForSchema(t1))
//           .toEqual(getDefaultTitleForSchema(t2));
//       });

//       it("order of enum values doesnt matter", () => {
//         const a = { type: "number", enum: [1, 2, 3] };
//         const b = { type: "number", enum: [3, 2, 1] };

//         expect(getDefaultTitleForSchema(a).title)
//           .toEqual(getDefaultTitleForSchema(b).title);
//       });

//       it("definitions are ignored", () => {
//         const a = { type: "number", definitions: { a: { type: "number" } } };
//         const b = { type: "number", definitions: { b: { type: "string" } } };

//         expect(getDefaultTitleForSchema(a).title)
//           .toEqual(getDefaultTitleForSchema(b).title);
//       });
//     });
//   });
// });
