export type $Id = string;
export type $Schema = string;
export type $Ref = string;
export type $Comment = string;
export type Title = string;
export type Description = string;
type AlwaysTrue = any;
export type ReadOnly = boolean;
export type Examples = AlwaysTrue[];
export type MultipleOf = number;
export type Maximum = number;
export type ExclusiveMaximum = number;
export type Minimum = number;
export type ExclusiveMinimum = number;
export type NonNegativeInteger = number;
export type DefaultZero = any;
export type NonNegativeIntegerDefaultZero = NonNegativeInteger & DefaultZero;
export type Pattern = string;
export type SchemaArray = JSONMetaSchema[];
/**
 *
 * @default true
 *
 */
export type Items = JSONMetaSchema | SchemaArray;
export type UniqueItems = boolean;
export type StringDoaGddGA = string;
/**
 *
 * @default []
 *
 */
export type StringArray = StringDoaGddGA[];
/**
 *
 * @default {}
 *
 */
export interface Definitions { [key: string]: any; }
/**
 *
 * @default {}
 *
 */
export interface Properties { [key: string]: any; }
/**
 *
 * @default {}
 *
 */
export interface PatternProperties { [key: string]: any; }
export type AnyOfJSONMetaSchemaStringArrayBk9CjcAm = JSONMetaSchema | StringArray;
export interface Dependencies { [key: string]: any; }
export type Enum = AlwaysTrue[];
export type SimpleTypes = any;
export type ArrayOfSimpleTypes = SimpleTypes[];
export type AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK = SimpleTypes | ArrayOfSimpleTypes;
export type Format = string;
export type ContentMediaType = string;
export type ContentEncoding = string;
/**
 *
 * @default true
 *
 */
export interface JSONMetaSchema {
  $id?: $Id;
  $schema?: $Schema;
  $ref?: $Ref;
  $comment?: $Comment;
  title?: Title;
  description?: Description;
  default?: AlwaysTrue;
  readOnly?: ReadOnly;
  examples?: Examples;
  multipleOf?: MultipleOf;
  maximum?: Maximum;
  exclusiveMaximum?: ExclusiveMaximum;
  minimum?: Minimum;
  exclusiveMinimum?: ExclusiveMinimum;
  maxLength?: NonNegativeInteger;
  minLength?: NonNegativeIntegerDefaultZero;
  pattern?: Pattern;
  additionalItems?: JSONMetaSchema;
  items?: Items;
  maxItems?: NonNegativeInteger;
  minItems?: NonNegativeIntegerDefaultZero;
  uniqueItems?: UniqueItems;
  contains?: JSONMetaSchema;
  maxProperties?: NonNegativeInteger;
  minProperties?: NonNegativeIntegerDefaultZero;
  required?: StringArray;
  additionalProperties?: JSONMetaSchema;
  definitions?: Definitions;
  properties?: Properties;
  patternProperties?: PatternProperties;
  dependencies?: Dependencies;
  propertyNames?: JSONMetaSchema;
  const?: AlwaysTrue;
  enum?: Enum;
  type?: AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK;
  format?: Format;
  contentMediaType?: ContentMediaType;
  contentEncoding?: ContentEncoding;
  if?: JSONMetaSchema;
  then?: JSONMetaSchema;
  else?: JSONMetaSchema;
  allOf?: SchemaArray;
  anyOf?: SchemaArray;
  oneOf?: SchemaArray;
  not?: JSONMetaSchema;
  [k: string]: any;
}
