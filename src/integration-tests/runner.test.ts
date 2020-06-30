import * as fs from "fs";
import { JSONMetaSchema } from "@json-schema-tools/meta-schema";
import JsonSchemaToTypes from "../index";
import { capitalize } from "../utils";
import Dereferencer from "@json-schema-tools/dereferencer";
import { promisify } from "util";

import { getAvailableLanguages, getTestCasesNames } from "./helpers";

interface TestCase {
  name: string;
  language: string;
  expectedTypings: string;
  schema: JSONMetaSchema;
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

const getTestCases = async (names: string[], languages: string[]): Promise<TestCase[]> => {
  const unflattedTestCases = await Promise.all(
    languages.map((language) => {
      return Promise.all(names.map(async (name) => {
        const dereffer = new Dereferencer(JSON.parse(await readFile(`${testCaseDir}/${name}.json`, "utf8")));
        const schema = await dereffer.resolve();
        const expectationFile = `${expectedsDir}/${language}/${name}.${language}`;
        return {
          name,
          language,
          expectedTypings: await readFile(expectationFile, "utf8").then((s) => s.trim()),
          schema,
        };
      }));
    }),
  );
  return unflattedTestCases.reduce((m, tcs) => [...m, ...tcs], []);
};

describe("Integration tests", () => {
  let languages: any;
  let testCaseNames: string[];
  let testCases: TestCase[];

  beforeAll(async () => {
    try {
      languages = await getAvailableLanguages();
    } catch (e) {
      console.error("Error in integration test setup: getAvailableLanguages");
      console.error(e);
      throw e;
      // process.exit(1);
    }
    try {
      testCaseNames = await getTestCasesNames();
    } catch (e) {
      console.error("Error in integration test setup: getTestCasesNames");
      console.error(e);
      throw e;
      // process.exit(1);
    }
    try {
      testCases = await getTestCases(testCaseNames, languages);
    } catch (e) {
      console.error("Error in integration test setup: getTestCases");
      console.error(e);
      throw e;
      // process.exit(1);
    }
  });

  it("can load the test languages", () => {
    return expect(ensureAllHaveExpectedResult(testCaseNames, languages)).resolves.toBe(true);
  });

  it("checks out", async () => {
    expect.assertions(1); // testCases.length);

    const proms = testCases.map(async (testCase: TestCase) => {
      if (testCase.name !== "circular-reference") {
        return Promise.resolve();
      }

      if (testCase.language !== "ts") {
        return Promise.resolve();
      }

      const transpiler = new JsonSchemaToTypes(await testCase.schema);
      const typings = transpiler[`to${capitalize(testCase.language)}`]();
      return expect(typings).toBe(await testCase.expectedTypings);
    });

    return Promise.all(proms);
  });
});
