// integration test generator cli
import inquirer from "inquirer";
import * as fs from "fs";
import { promisify } from "util";
import { getAvailableLanguages } from "./helpers";
import fetch from "node-fetch";

const [writeFile] = [promisify(fs.writeFile)];

inquirer.prompt([
  {
    type: "input",
    name: "schemaName",
    message: "What is the name of the test schema?",
  },
  {
    type: "input",
    name: "usingUrl",
    message: "Enter a url to a JSON Schema, or press enter to get an empty one?",
    default: () => false,
  },
]).then(async ({ schemaName, usingUrl }) => {
  let schemaToWrite = "";

  if (usingUrl !== false) {
    try {
      schemaToWrite = await fetch(usingUrl)
        .then((res) => res.json())
        .then((json) => JSON.stringify(json, undefined, "  "));
    } catch (e) {
      console.error(`There was an error while fetching the JSON Schema you specified at the url: ${usingUrl}`);
      console.error(e);
      process.exit(1);
    }
  }

  const cwd = `${process.cwd()}/src/integration-tests`;
  const rfname = `${cwd}/expecteds`;
  const tcfname = `${cwd}/test-cases/${schemaName}.json`;

  await writeFile(tcfname, schemaToWrite);

  console.log("Detecting languages..."); //tslint:disable-line
  const languages = await getAvailableLanguages();
  console.log(`Found ${languages.length} languages: ${languages.join(", ")}`);//tslint:disable-line

  console.log("\n");//tslint:disable-line

  console.log("Writing files...");//tslint:disable-line
  await writeFile(tcfname, schemaToWrite);
  await Promise.all(
    languages.map(async (language: string) => {
      const fn = `${rfname}/${language}/${schemaName}.${language}`;
      return writeFile(fn, "");
    }));
  console.log("All done");//tslint:disable-line
});
