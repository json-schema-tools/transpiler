import * as fs from "fs";
import { JSONSchema } from "@json-schema-tools/meta-schema";
import Transpiler from "../index";
import { capitalize } from "../utils";
import Dereferencer from "@json-schema-tools/dereferencer";
import { promisify } from "util";

import { getAvailableLanguages, getTestCasesNames } from "./helpers";
import { stringifyCircular } from "../ensure-subschema-titles";

interface TestCase {
  name: string;
  language: string;
  expectedTypings: string;
  schema: JSONSchema;
}

const [readDir, readFile] = [promisify(fs.readdir), promisify(fs.readFile)];

const expectedsDir = `${__dirname}/expecteds`;
const testCaseDir = `${__dirname}/test-cases`;

const ensureAllHaveExpectedResult = async (names: string[], languages: string[]) => {
  const result = await Promise.all(languages.map(async (lang: string) => {
    const expectedsForLang = await readDir(`${expectedsDir}/${lang}`);
    const missingResultsForLang = expectedsForLang.filter((r) => names.indexOf(r.replace(`.${lang}`, "")) === -1);
    if (missingResultsForLang.length > 0) {
      throw new Error(`missing test case expecteds for language: ${missingResultsForLang}`);
    }
  }));
  if (result.length > 0) { return true; }
  return false;
};

const getTestCaseBase = async (names: string[], languages: string[]): Promise<TestCase[]> => {
  const promises: any[] = [];
  const testCases: TestCase[] = [];

  languages.forEach((language) => {
    // if (language !== "ts") { return; }

    names.forEach((name) => {
      // if (name !== "boolean-schemas") { return; }

      promises.push(readFile(`${testCaseDir}/${name}.json`, "utf8")
        .then((fileContents) => {
          const schema = JSON.parse(fileContents);
          testCases.push({ name, language, schema, expectedTypings: "" });
          return schema;
        }));
    });
  });

  await Promise.all(promises);
  return testCases;
};

const addExpectedTypings = async (tcs: TestCase[]): Promise<TestCase[]> => {
  const expectedTypingsPromises: any[] = [];

  tcs.forEach((tc) => {
    const expectationFile = `${expectedsDir}/${tc.language}/${tc.name}.${tc.language}`;
    expectedTypingsPromises.push(readFile(expectationFile, "utf8").then((s) => tc.expectedTypings = s.trim()));
  });

  await Promise.all(expectedTypingsPromises);

  return tcs;
};

const derefTestCases = async (tcs: TestCase[]): Promise<TestCase[]> => {
  for (const tc of tcs) {
    let s = tc.schema as JSONSchema[];
    const wasArray = tc.schema instanceof Array;
    if (wasArray === false) {
      s = [s];
    }
    tc.schema = await Promise.all(s.map((_s) => {
      const dereffer = new Dereferencer(_s);
      return dereffer.resolve();
    }));

    if (wasArray === false) {
      tc.schema = tc.schema[0];
    }
  }

  return tcs;
};

const getTestCases = async (names: string[], languages: string[]): Promise<TestCase[]> => {
  const testCases: TestCase[] = await getTestCaseBase(names, languages);

  const testCasesWithExpectedTypings = await addExpectedTypings(testCases);

  return derefTestCases(testCasesWithExpectedTypings);
};

describe("Integration tests", () => {
  let languages: any;
  let testCaseNames: string[];
  let testCases: TestCase[];

  beforeAll(async () => {
    languages = await getAvailableLanguages();
    testCaseNames = await getTestCasesNames();
    testCases = await getTestCases(testCaseNames, languages);
  });

  it("can load the test languages", () => {
    return expect(ensureAllHaveExpectedResult(testCaseNames, languages)).resolves.toBe(true);
  });

  it("checks out", async () => {
    expect.assertions(testCases.length);

    const proms = testCases.map(async (testCase: TestCase, index: number) => {
      let transpiler;
      try {
        transpiler = new Transpiler(testCase.schema);
      } catch (e) {
        console.error(`Hit an error while constructing the transpiler with the test case: ${testCase.name}, index in array of testCases: ${index}`); //tslint:disable-line
        console.error(stringifyCircular(testCase.schema)); //tslint:disable-line
        throw e;
      }

      let typings;
      try {
        typings = transpiler[`to${capitalize(testCase.language)}`]();
      } catch (e) {
        console.error(`Hit an error while running: ${testCase.name} in ${testCase.language}, index in array of testCases: ${index}`); //tslint:disable-line
        console.error(e); //tslint:disable-line
        throw e;
      }
      return expect(typings).toBe(testCase.expectedTypings);
    });

    return Promise.all(proms);
  });
});
