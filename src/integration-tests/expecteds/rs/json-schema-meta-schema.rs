use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

pub type $Id = String;
pub type $Schema = String;
pub type $Ref = String;
pub type $Comment = String;
pub type Title = String;
pub type Description = String;
type AlwaysTrue = serde_json::Value;
pub type ReadOnly = bool;
pub type Examples = Vec<AlwaysTrue>;
pub type MultipleOf = f64;
pub type Maximum = f64;
pub type ExclusiveMaximum = f64;
pub type Minimum = f64;
pub type ExclusiveMinimum = f64;
pub type NonNegativeInteger = i64;
pub type DefaultZero = serde_json::Value;
pub type NonNegativeIntegerDefaultZero = HashMap<String, Option<serde_json::Value>>;
pub type Pattern = String;
pub type SchemaArray = Vec<JSONMetaSchema>;
#[derive(Serialize, Deserialize)]
pub enum Items {
    JSONMetaSchema,
    SchemaArray
}
pub type UniqueItems = bool;
pub type StringDoaGddGA = String;
/// StringArray
///
/// # Default
///
/// []
///
pub type StringArray = Vec<StringDoaGddGA>;
/// Definitions
///
/// # Default
///
/// {}
///
pub type Definitions = HashMap<String, Option<serde_json::Value>>;
/// Properties
///
/// # Default
///
/// {}
///
pub type Properties = HashMap<String, Option<serde_json::Value>>;
/// PatternProperties
///
/// # Default
///
/// {}
///
pub type PatternProperties = HashMap<String, Option<serde_json::Value>>;
#[derive(Serialize, Deserialize)]
pub enum AnyOfJSONMetaSchemaStringArrayBk9CjcAm {
    JSONMetaSchema,
    StringArray
}
pub type Dependencies = HashMap<String, Option<serde_json::Value>>;
pub type Enum = Vec<AlwaysTrue>;
pub type SimpleTypes = serde_json::Value;
pub type ArrayOfSimpleTypes = Vec<SimpleTypes>;
#[derive(Serialize, Deserialize)]
pub enum AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK {
    SimpleTypes,
    ArrayOfSimpleTypes
}
pub type Format = String;
pub type ContentMediaType = String;
pub type ContentEncoding = String;
/// JSONMetaSchema
///
/// # Default
///
/// true
///
#[derive(Serialize, Deserialize)]
pub struct JSONMetaSchema {
    pub(crate) $id: Option<$Id>,
    pub(crate) $schema: Option<$Schema>,
    pub(crate) $ref: Option<$Ref>,
    pub(crate) $comment: Option<$Comment>,
    pub(crate) title: Option<Title>,
    pub(crate) description: Option<Description>,
    pub(crate) default: Option<AlwaysTrue>,
    pub(crate) readOnly: Option<ReadOnly>,
    pub(crate) examples: Option<Examples>,
    pub(crate) multipleOf: Option<MultipleOf>,
    pub(crate) maximum: Option<Maximum>,
    pub(crate) exclusiveMaximum: Option<ExclusiveMaximum>,
    pub(crate) minimum: Option<Minimum>,
    pub(crate) exclusiveMinimum: Option<ExclusiveMinimum>,
    pub(crate) maxLength: Option<NonNegativeInteger>,
    pub(crate) minLength: Option<NonNegativeIntegerDefaultZero>,
    pub(crate) pattern: Option<Pattern>,
    pub(crate) additionalItems: Option<JSONMetaSchema>,
    pub(crate) items: Option<Items>,
    pub(crate) maxItems: Option<NonNegativeInteger>,
    pub(crate) minItems: Option<NonNegativeIntegerDefaultZero>,
    pub(crate) uniqueItems: Option<UniqueItems>,
    pub(crate) contains: Option<JSONMetaSchema>,
    pub(crate) maxProperties: Option<NonNegativeInteger>,
    pub(crate) minProperties: Option<NonNegativeIntegerDefaultZero>,
    pub(crate) required: Option<StringArray>,
    pub(crate) additionalProperties: Option<JSONMetaSchema>,
    pub(crate) definitions: Option<Definitions>,
    pub(crate) properties: Option<Properties>,
    pub(crate) patternProperties: Option<PatternProperties>,
    pub(crate) dependencies: Option<Dependencies>,
    pub(crate) propertyNames: Option<JSONMetaSchema>,
    pub(crate) const: Option<AlwaysTrue>,
    pub(crate) enum: Option<Enum>,
    pub(crate) type: Option<AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK>,
    pub(crate) format: Option<Format>,
    pub(crate) contentMediaType: Option<ContentMediaType>,
    pub(crate) contentEncoding: Option<ContentEncoding>,
    pub(crate) if: Option<JSONMetaSchema>,
    pub(crate) then: Option<JSONMetaSchema>,
    pub(crate) else: Option<JSONMetaSchema>,
    pub(crate) allOf: Option<SchemaArray>,
    pub(crate) anyOf: Option<SchemaArray>,
    pub(crate) oneOf: Option<SchemaArray>,
    pub(crate) not: Option<JSONMetaSchema>,
}
