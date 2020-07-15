import { JSONMetaSchema } from "@json-schema-tools/meta-schema";
import { capitalize, combineSchemas } from "./utils";
import titleizer from "./titleizer";
import referencer from "./referencer";
import { CodeGen } from "./codegens/codegen";
import TypescriptGenerator from "./codegens/typescript";
import RustGenerator from "./codegens/rust";
import GolangGenerator from "./codegens/golang";
import PythonGenerator from "./codegens/python";

export type SupportedLanguages = "rust" | "rs" | "typescript" | "ts" | "go" | "golang" | "python" | "py";
/**
 * Provides a high-level interface for getting typings given a schema.
 */
export class Transpiler {
  [toLang: string]: any;
  public megaSchema: JSONMetaSchema;

  constructor(s: JSONMetaSchema | JSONMetaSchema[]) {
    const useMerge = s instanceof Array;
    const inputSchema: JSONMetaSchema[] = useMerge ? s as JSONMetaSchema[] : [s];
    const schemaWithTitles = inputSchema.map(titleizer);
    console.log(schemaWithTitles); //tslint:disable-line
    const reffed = schemaWithTitles.map(referencer);
    if (useMerge) {
      this.megaSchema = combineSchemas(reffed);
    } else {
      [this.megaSchema] = reffed;
    }
  }

  /**
   * Generic transpile method.
   */
  public to(lang: SupportedLanguages): string {
    return this[`to${capitalize(lang)}`]();
  }

  /**
   * Returns the types in Typescript
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Typescript
   * @category TargetCodeGenerator
   *
   */
  public toTypescript(): string {
    return this.transpile(new TypescriptGenerator(this.megaSchema));
  }

  /**
   * Alias to [[Transpiler.toTypescript]]
   *
   * @category Typescript
   * @category TargetCodeGenerator
   *
   */
  public toTs(): string {
    return this.toTypescript();
  }

  /**
   * Returns the types in Rust
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Rust
   * @category TargetCodeGenerator
   *
   */
  public toRust(): string {
    return this.transpile(new RustGenerator(this.megaSchema));
  }

  /**
   * Returns the types in Rust
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Rust
   * @category TargetCodeGenerator
   *
   */
  public toRs(): string {
    return this.toRust();
  }

  /**
   * Returns the types in Rust
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Rust
   * @category TargetCodeGenerator
   *
   */
  public toGolang(): string {
    return this.transpile(new GolangGenerator(this.megaSchema));
  }

  /**
   * Returns the types in Rust
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Rust
   * @category TargetCodeGenerator
   *
   */
  public toGo(): string {
    return this.toGolang();
  }

  /**
   * Returns the types in Python
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Python
   * @category TargetCodeGenerator
   *
   */
  public toPython(): string {
    return this.transpile(new PythonGenerator(this.megaSchema));
  }

  /**
   * Returns the types in Python
   *
   * @returns The types present in the megaSchema, seperated by newlines.
   *
   * @category Python
   * @category TargetCodeGenerator
   *
   */
  public toPy(): string {
    return this.toPython();
  }

  private transpile(gen: CodeGen): string {
    const codeLines = [];
    const prefix = gen.getCodePrefix();
    if (prefix) {
      codeLines.push(prefix);
      codeLines.push("");
    }
    codeLines.push(gen.transpile());
    return codeLines.join("\n");
  }
}

export default Transpiler;
