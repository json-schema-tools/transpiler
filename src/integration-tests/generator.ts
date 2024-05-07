// integration test generator cli
import * as fs from "fs";
import { promisify } from "util";
import { getAvailableLanguages } from "./helpers";
import Derefferencer from "@json-schema-tools/dereferencer";
import Transpiler from "../";
const [writeFile] = [promisify(fs.writeFile)];

const go = async (schemaName: any, usingUrl: any) => {
let schemaToWrite = JSON.stringify({ title: schemaName });
  if (usingUrl !== false) {
    try {
      schemaToWrite = await fetch(usingUrl)
        .then((res: any) => res.json())
        .then((json: any) => JSON.stringify(json, undefined, "  "));
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
      const s = JSON.parse(schemaToWrite);
      const dereffer = new Derefferencer(s);
      const d = await dereffer.resolve();
      const fn = `${rfname}/${language}/${schemaName}.${language}`;
      const t = new Transpiler(d);
      const transpileMethodName = `to${language[0].toUpperCase() + language.substring(1)}`
      console.log('generating: ', transpileMethodName);
      return writeFile(fn, t[transpileMethodName]());
    }));
  console.log("All done");//tslint:disable-line
}

console.log(process.argv);
const schemaName = process.argv[2]
console.log(schemaName);
const usingUrl = process.argv[3] as any;

go(schemaName, usingUrl).then(() => console.log('done!'));
