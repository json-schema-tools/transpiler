import { ensureSubschemaTitles } from "./ensure-subschema-titles";

describe("ensureSubschemaTitles", () => {
  it("anyOf", () => {
    expect(ensureSubschemaTitles({ anyOf: [{ title: "abc" }, {}] })[0]).toBeInstanceOf(Error);
  });

  it("allOf", () => {
    expect(ensureSubschemaTitles({ allOf: [{ title: "abc" }, {}] })[0]).toBeInstanceOf(Error);
  });

  it("oneOf", () => {
    expect(ensureSubschemaTitles({ oneOf: [{ title: "abc" }, {}] })[0]).toBeInstanceOf(Error);
  });

  it("items", () => {
    expect(ensureSubschemaTitles({ items: [{ title: "abc" }, {}] })[0]).toBeInstanceOf(Error);
  });

  it("properties", () => {
    expect(ensureSubschemaTitles({ properties: { a: { title: "abc" }, b: {} } })[0]).toBeInstanceOf(Error);
  });
});
