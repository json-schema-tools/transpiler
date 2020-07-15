export type Baz = boolean;
export type Foo = string;
/**
 *
 * array of strings is all...
 *
 */
export type UnorderedSetOfFooz1UBFn8B = Foo[];
export type Bar = number;
export type SetOfNumbers = [Bar];
export interface ObjectOfBazLEtnUJ56 {
  NotFoo?: Baz;
  [k: string]: any;
}
export type OneOfStuff = UnorderedSetOfFooz1UBFn8B | SetOfNumbers;
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar = Foo | ObjectOfBazLEtnUJ56 | OneOfStuff | Bar;
