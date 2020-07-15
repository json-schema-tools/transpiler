// import * as fs from "fs";
// import { JSONMetaSchema } from "@json-schema-tools/meta-schema";
// import Transpiler from "../index";
// import { capitalize } from "../utils";
// import Dereferencer from "@json-schema-tools/dereferencer";
// import { promisify } from "util";

// import { getAvailableLanguages, getTestCasesNames } from "./helpers";
// import { stringifyCircular } from "../ensure-subschema-titles";

// interface TestCase {
//   name: string;
//   language: string;
//   expectedTypings: string;
//   schema: JSONMetaSchema;
// }

// const [readDir, readFile] = [promisify(fs.readdir), promisify(fs.readFile)];

// const expectedsDir = `${__dirname}/expecteds`;
// const testCaseDir = `${__dirname}/test-cases`;

// const ensureAllHaveExpectedResult = async (names: string[], languages: string[]) => {
//   const result = await Promise.all(languages.map(async (lang: string) => {
//     const expectedsForLang = await readDir(`${expectedsDir}/${lang}`);
//     const missingResultsForLang = expectedsForLang.filter((r) => names.indexOf(r.replace(`.${lang}`, "")) === -1);
//     if (missingResultsForLang.length > 0) {
//       throw new Error(`missing test case expecteds for language: ${missingResultsForLang}`);
//     }
//   }));
//   if (result.length > 0) { return true; }
//   return false;
// };

// const getTestCaseBase = async (names: string[], languages: string[]): Promise<TestCase[]> => {
//   const promises: any[] = [];
//   const testCases: TestCase[] = [];

//   languages.forEach((language) => {
//     if (language !== "ts") { return; }

//     names.forEach((name) => {
//       if (name !== "json-schema-meta-schema") { return; }

//       promises.push(readFile(`${testCaseDir}/${name}.json`, "utf8")
//         .then((fileContents) => {
//           const schema = JSON.parse(fileContents);
//           testCases.push({ name, language, schema, expectedTypings: "" });
//           return schema;
//         }));
//     });
//   });

//   await Promise.all(promises);
//   return testCases;
// };

// const addExpectedTypings = async (tcs: TestCase[]): Promise<TestCase[]> => {
//   const expectedTypingsPromises: any[] = [];

//   tcs.forEach((tc) => {
//     const expectationFile = `${expectedsDir}/${tc.language}/${tc.name}.${tc.language}`;
//     expectedTypingsPromises.push(readFile(expectationFile, "utf8").then((s) => tc.expectedTypings = s.trim()));
//   });

//   await Promise.all(expectedTypingsPromises);

//   return tcs;
// };

// const derefTestCases = async (tcs: TestCase[]): Promise<TestCase[]> => {
//   const derefPromises: any[] = [];

//   tcs.forEach((tc) => {
//     const dereffer = new Dereferencer(tc.schema);
//     derefPromises.push(dereffer.resolve().then((s) => tc.schema = s));
//   });

//   await Promise.all(derefPromises);

//   return tcs;
// };

// const getTestCases = async (names: string[], languages: string[]): Promise<TestCase[]> => {
//   const testCases: TestCase[] = await getTestCaseBase(names, languages);

//   const testCasesWithExpectedTypings = await addExpectedTypings(testCases);

//   return derefTestCases(testCasesWithExpectedTypings);
// };

// describe("Integration tests", () => {
//   let languages: any;
//   let testCaseNames: string[];
//   let testCases: TestCase[];

//   beforeAll(async () => {
//     try {
//       languages = await getAvailableLanguages();
//     } catch (e) {
//       console.error("Error in integration test setup: getAvailableLanguages");
//       console.error(e);
//       process.exit(1);
//     }
//     try {
//       testCaseNames = await getTestCasesNames();
//     } catch (e) {
//       console.error("Error in integration test setup: getTestCasesNames");
//       console.error(e);
//       process.exit(1);
//     }
//     try {
//       testCases = await getTestCases(testCaseNames, languages);
//     } catch (e) {
//       console.error("Error in integration test setup: getTestCases");
//       console.error(e);
//       process.exit(1);
//     }
//   });

//   it("can load the test languages", () => {
//     return expect(ensureAllHaveExpectedResult(testCaseNames, languages)).resolves.toBe(true);
//   });

//   it("checks out", async () => {
//     expect.assertions(testCases.length);

//     const proms = testCases.map(async (testCase: TestCase) => {
//       console.log(`Integration Test: ${testCase.name}.${testCase.language}`); // tslint:disable-line
//       let transpiler;
//       try {
//         transpiler = new Transpiler(testCase.schema);
//       } catch (e) {
//         console.error(`Hit an error while constructing the transpiler with the test case: ${testCase.name}`); //tslint:disable-line
//         console.error(stringifyCircular(testCase.schema)); //tslint:disable-line
//         throw e;
//       }

//       let typings;
//       try {
//         typings = transpiler[`to${capitalize(testCase.language)}`]();
//       } catch (e) {
//         console.error(`Hit an error while running: ${testCase.name} in ${testCase.language}`); //tslint:disable-line
//         throw e;
//       }
//       return expect(typings).toBe(testCase.expectedTypings);
//     });

//     return Promise.all(proms);
//   });
// });
