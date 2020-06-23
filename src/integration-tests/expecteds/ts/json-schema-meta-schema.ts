export type StringVPPt56NS = string;
export type StringNQRYvFt5 = string;
export type StringDoaGddGA = string;
export type AnyL9Fw4VUO = any;
export type BooleanG3T6Tn0M = boolean;
export type UnorderedSetOfAnyL9Fw4VUO55Bn0VNb = AnyL9Fw4VUO[];
export type Number0ErlT0It = number;
export type NumberHo1ClIqD = number;
export type NonNegativeInteger = number;
export type AnyXumYU1GW = any;
export type NonNegativeIntegerDefault0 = NonNegativeInteger & AnyXumYU1GW;
export type String3JBlmrip = string;
export type SchemaArray = JSONSchema[];
/**
 *
 * @default true
 *
 */
export type AnyOfJSONSchemaSchemaArrayCotc6H6U = JSONSchema | SchemaArray;
/**
 *
 * @default []
 *
 */
export type UnorderedSetOfStringDoaGddGAIEp1G0PF = StringDoaGddGA[];
/**
 *
 * @default {}
 *
 */
export interface ObjectWrpyYBUS { [key: string]: any; }
export interface Dependencies { [key: string]: any; }
export type UnorderedSetOfAnyL9Fw4VUOyeAFYsFq = AnyL9Fw4VUO[];
export type Any17L18NF5 = any;
export type UnorderedSetOfAny17L18NF5VWcS9ROi = Any17L18NF5[];
export type SchemaType = Any17L18NF5 | UnorderedSetOfAny17L18NF5VWcS9ROi;
/**
 *
 * @default true
 *
 */
export interface JSONSchema {
  $id?: StringVPPt56NS;
  $schema?: StringNQRYvFt5;
  $ref?: StringVPPt56NS;
  $comment?: StringDoaGddGA;
  title?: StringDoaGddGA;
  description?: StringDoaGddGA;
  default?: AnyL9Fw4VUO;
  readOnly?: BooleanG3T6Tn0M;
  examples?: UnorderedSetOfAnyL9Fw4VUO55Bn0VNb;
  multipleOf?: Number0ErlT0It;
  maximum?: NumberHo1ClIqD;
  exclusiveMaximum?: NumberHo1ClIqD;
  minimum?: NumberHo1ClIqD;
  exclusiveMinimum?: NumberHo1ClIqD;
  maxLength?: NonNegativeInteger;
  minLength?: NonNegativeIntegerDefault0;
  pattern?: String3JBlmrip;
  additionalItems?: JSONSchema;
  items?: AnyOfJSONSchemaSchemaArrayCotc6H6U;
  maxItems?: NonNegativeInteger;
  minItems?: NonNegativeIntegerDefault0;
  uniqueItems?: BooleanG3T6Tn0M;
  contains?: JSONSchema;
  maxProperties?: NonNegativeInteger;
  minProperties?: NonNegativeIntegerDefault0;
  required?: UnorderedSetOfStringDoaGddGAIEp1G0PF;
  additionalProperties?: JSONSchema;
  definitions?: ObjectWrpyYBUS;
  properties?: ObjectWrpyYBUS;
  patternProperties?: ObjectWrpyYBUS;
  dependencies?: Dependencies;
  propertyNames?: JSONSchema;
  const?: AnyL9Fw4VUO;
  enum?: UnorderedSetOfAnyL9Fw4VUOyeAFYsFq;
  type?: SchemaType;
  format?: StringDoaGddGA;
  contentMediaType?: StringDoaGddGA;
  contentEncoding?: StringDoaGddGA;
  if?: JSONSchema;
  then?: JSONSchema;
  else?: JSONSchema;
  allOf?: SchemaArray;
  anyOf?: SchemaArray;
  oneOf?: SchemaArray;
  not?: JSONSchema;
  [k: string]: any;
}
