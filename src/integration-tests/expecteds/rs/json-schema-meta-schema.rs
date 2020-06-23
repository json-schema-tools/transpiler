use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

pub type StringVPPt56NS = String;
pub type StringNQRYvFt5 = String;
pub type StringDoaGddGA = String;
pub type AnyL9Fw4VUO = serde_json::Value;
pub type BooleanG3T6Tn0M = bool;
pub type UnorderedSetOfAnyL9Fw4VUO55Bn0VNb = Vec<AnyL9Fw4VUO>;
pub type Number0ErlT0It = f64;
pub type NumberHo1ClIqD = f64;
pub type NonNegativeInteger = i64;
pub type AnyXumYU1GW = serde_json::Value;
pub type NonNegativeIntegerDefault0 = HashMap<String, Option<serde_json::Value>>;
pub type String3JBlmrip = String;
pub type SchemaArray = Vec<JSONSchema>;
#[derive(Serialize, Deserialize)]
pub enum AnyOfJSONSchemaSchemaArrayCotc6H6U {
    JSONSchema,
    SchemaArray
}
/// UnorderedSetOfStringDoaGddGAIEp1G0PF
///
/// # Default
///
/// []
///
pub type UnorderedSetOfStringDoaGddGAIEp1G0PF = Vec<StringDoaGddGA>;
/// ObjectWrpyYBUS
///
/// # Default
///
/// {}
///
pub type ObjectWrpyYBUS = HashMap<String, Option<serde_json::Value>>;
pub type Dependencies = HashMap<String, Option<serde_json::Value>>;
pub type UnorderedSetOfAnyL9Fw4VUOyeAFYsFq = Vec<AnyL9Fw4VUO>;
pub type Any17L18NF5 = serde_json::Value;
pub type UnorderedSetOfAny17L18NF5VWcS9ROi = Vec<Any17L18NF5>;
#[derive(Serialize, Deserialize)]
pub enum SchemaType {
    Any17L18NF5,
    UnorderedSetOfAny17L18NF5VWcS9ROi
}
/// JSONSchema
///
/// # Default
///
/// true
///
#[derive(Serialize, Deserialize)]
pub struct JSONSchema {
    pub(crate) $id: Option<StringVPPt56NS>,
    pub(crate) $schema: Option<StringNQRYvFt5>,
    pub(crate) $ref: Option<StringVPPt56NS>,
    pub(crate) $comment: Option<StringDoaGddGA>,
    pub(crate) title: Option<StringDoaGddGA>,
    pub(crate) description: Option<StringDoaGddGA>,
    pub(crate) default: Option<AnyL9Fw4VUO>,
    pub(crate) readOnly: Option<BooleanG3T6Tn0M>,
    pub(crate) examples: Option<UnorderedSetOfAnyL9Fw4VUO55Bn0VNb>,
    pub(crate) multipleOf: Option<Number0ErlT0It>,
    pub(crate) maximum: Option<NumberHo1ClIqD>,
    pub(crate) exclusiveMaximum: Option<NumberHo1ClIqD>,
    pub(crate) minimum: Option<NumberHo1ClIqD>,
    pub(crate) exclusiveMinimum: Option<NumberHo1ClIqD>,
    pub(crate) maxLength: Option<NonNegativeInteger>,
    pub(crate) minLength: Option<NonNegativeIntegerDefault0>,
    pub(crate) pattern: Option<String3JBlmrip>,
    pub(crate) additionalItems: Option<JSONSchema>,
    pub(crate) items: Option<AnyOfJSONSchemaSchemaArrayCotc6H6U>,
    pub(crate) maxItems: Option<NonNegativeInteger>,
    pub(crate) minItems: Option<NonNegativeIntegerDefault0>,
    pub(crate) uniqueItems: Option<BooleanG3T6Tn0M>,
    pub(crate) contains: Option<JSONSchema>,
    pub(crate) maxProperties: Option<NonNegativeInteger>,
    pub(crate) minProperties: Option<NonNegativeIntegerDefault0>,
    pub(crate) required: Option<UnorderedSetOfStringDoaGddGAIEp1G0PF>,
    pub(crate) additionalProperties: Option<JSONSchema>,
    pub(crate) definitions: Option<ObjectWrpyYBUS>,
    pub(crate) properties: Option<ObjectWrpyYBUS>,
    pub(crate) patternProperties: Option<ObjectWrpyYBUS>,
    pub(crate) dependencies: Option<Dependencies>,
    pub(crate) propertyNames: Option<JSONSchema>,
    pub(crate) const: Option<AnyL9Fw4VUO>,
    pub(crate) enum: Option<UnorderedSetOfAnyL9Fw4VUOyeAFYsFq>,
    pub(crate) type: Option<SchemaType>,
    pub(crate) format: Option<StringDoaGddGA>,
    pub(crate) contentMediaType: Option<StringDoaGddGA>,
    pub(crate) contentEncoding: Option<StringDoaGddGA>,
    pub(crate) if: Option<JSONSchema>,
    pub(crate) then: Option<JSONSchema>,
    pub(crate) else: Option<JSONSchema>,
    pub(crate) allOf: Option<SchemaArray>,
    pub(crate) anyOf: Option<SchemaArray>,
    pub(crate) oneOf: Option<SchemaArray>,
    pub(crate) not: Option<JSONSchema>,
}