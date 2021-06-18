export type D = string;
export type C = string;
export interface A { [key: string]: any; }
export interface B {
  c?: C;
  [k: string]: any;
}
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type AnyOfAB = A | B;
