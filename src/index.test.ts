// import Transpiler from "./index";
// import { Definitions, Properties } from "@json-schema-tools/meta-schema";

// describe("Transpiler", () => {
//   it("can be instantiated with a schema with subschemas", () => {
//     const t = new Transpiler({
//       title: "test",
//       type: "object",
//       properties: {
//         foo: { type: "string" },
//         bar: { type: "string" },
//       },
//     });
//     const megaDefs = t.megaSchema.definitions as Definitions;
//     expect(megaDefs.string_doaGddGA).toBeDefined();
//   });

//   it("can output to typescript", () => {
//     const transpiler = new Transpiler({});
//     expect(transpiler.toTypescript()).toEqual("export type AnyL9Fw4VUO = any;");
//   });

//   it("can deal with boolean schema at the root", () => {
//     const t = new Transpiler((true as any));
//     expect(t).toBeDefined();
//   });

//   it("can deal with nested boolean schema", () => {
//     const t = new Transpiler({
//       type: "object",
//       properties: {
//         boolSchemaT: true,
//         boolSchemaF: false,
//       },
//     });
//     expect(t).toBeDefined();

//     const megaDefs = t.megaSchema.definitions as Definitions;
//     expect(megaDefs.AlwaysTrue).toBe(true);
//     expect(megaDefs.AlwaysFalse).toBe(false);
//   });

//   it("handles cycles", () => {
//     const testSchema = {
//       title: "foo bar",
//       type: "object",
//       properties: {
//         foo: {
//           type: "string",
//         },
//         fooBar: {},
//       },
//     };

//     testSchema.properties.fooBar = testSchema;

//     const transpiler = new Transpiler(testSchema);
//     const props = (transpiler.megaSchema.properties as Properties);
//     const defs = (transpiler.megaSchema.definitions as Definitions);
//     expect(props.foo.$ref).toBe("#/definitions/string_doaGddGA");
//     expect(props.fooBar.$ref).toBe("#/definitions/foo bar");
//     expect(defs["foo bar"].$ref).toBe("#");
//   });
// });
