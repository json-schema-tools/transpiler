// import ensureSubschemaTitles, { NoTitleError } from "./ensure-subschema-titles";

// describe("ensureSubschemaTitles", () => {
//   it("anyOf", () => {
//     expect(ensureSubschemaTitles({ anyOf: [{ title: "abc" }, {}] })[0]).toBeInstanceOf(NoTitleError);
//   });

//   it("allOf", () => {
//     expect(ensureSubschemaTitles({ allOf: [{ title: "abc" }, {}] })[0]).toBeInstanceOf(NoTitleError);
//   });

//   it("oneOf", () => {
//     expect(ensureSubschemaTitles({ oneOf: [{ title: "abc" }, {}] })[0]).toBeInstanceOf(NoTitleError);
//   });

//   it("items", () => {
//     expect(ensureSubschemaTitles({ items: [{ title: "abc" }, {}] })[0]).toBeInstanceOf(NoTitleError);
//     expect(ensureSubschemaTitles({ items: {} })).toHaveLength(1);
//   });

//   it("properties", () => {
//     expect(ensureSubschemaTitles({ properties: { a: { title: "abc" }, b: {} } })[0]).toBeInstanceOf(NoTitleError);
//   });

//   it("ignores boolean true schema in objects", () => {
//     expect(ensureSubschemaTitles(({ properties: { a: true } } as any)).length).toBe(0);
//   });

//   it("ignores boolean false schema in objects", () => {
//     expect(ensureSubschemaTitles(({ properties: { a: false } } as any)).length).toBe(0);
//   });

//   it("ignores boolean true schema in arrays", () => {
//     expect(ensureSubschemaTitles(({ items: true } as any)).length).toBe(0);
//   });

//   it("ignores boolean false schema in arrays", () => {
//     expect(ensureSubschemaTitles(({ items: false } as any)).length).toBe(0);
//   });

//   it("ignores boolean true schema in ordered arrays", () => {
//     expect(ensureSubschemaTitles(({ items: [true] } as any)).length).toBe(0);
//   });

//   it("ignores boolean false schema in ordered arrays", () => {
//     expect(ensureSubschemaTitles(({ items: [false] } as any)).length).toBe(0);
//   });

//   it("ignores boolean true schema in anyOf", () => {
//     expect(ensureSubschemaTitles(({ anyOf: [true] } as any)).length).toBe(0);
//   });

//   it("ignores boolean false schema in anyOf", () => {
//     expect(ensureSubschemaTitles(({ anyOf: [false] } as any)).length).toBe(0);
//   });

//   it("ignores boolean true schema", () => {
//     expect(ensureSubschemaTitles((true as any)).length).toBe(0);
//   });

//   it("ignores boolean false schema", () => {
//     expect(ensureSubschemaTitles((false as any)).length).toBe(0);
//   });
// });
