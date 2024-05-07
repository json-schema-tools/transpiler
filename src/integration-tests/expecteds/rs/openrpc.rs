extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
use std::collections::HashMap;
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
pub enum Openrpc {
    #[serde(rename = "1.3.2")]
    OneThreeTwo,
    #[serde(rename = "1.3.1")]
    OneThreeOne,
    #[serde(rename = "1.3.0")]
    OneThreeZero,
    #[serde(rename = "1.2.6")]
    OneTwoSix,
    #[serde(rename = "1.2.5")]
    OneTwoFive,
    #[serde(rename = "1.2.4")]
    OneTwoFour,
    #[serde(rename = "1.2.3")]
    OneTwoThree,
    #[serde(rename = "1.2.2")]
    OneTwoTwo,
    #[serde(rename = "1.2.1")]
    OneTwoOne,
    #[serde(rename = "1.2.0")]
    OneTwoZero,
    #[serde(rename = "1.1.12")]
    OneOneOneTwo,
    #[serde(rename = "1.1.11")]
    OneOneOneOne,
    #[serde(rename = "1.1.10")]
    OneOneOneZero,
    #[serde(rename = "1.1.9")]
    OneOneNine,
    #[serde(rename = "1.1.8")]
    OneOneEight,
    #[serde(rename = "1.1.7")]
    OneOneSeven,
    #[serde(rename = "1.1.6")]
    OneOneSix,
    #[serde(rename = "1.1.5")]
    OneOneFive,
    #[serde(rename = "1.1.4")]
    OneOneFour,
    #[serde(rename = "1.1.3")]
    OneOneThree,
    #[serde(rename = "1.1.2")]
    OneOneTwo,
    #[serde(rename = "1.1.1")]
    OneOneOne,
    #[serde(rename = "1.1.0")]
    OneOneZero,
    #[serde(rename = "1.0.0")]
    OneZeroZero,
    #[serde(rename = "1.0.0-rc1")]
    OneZeroZeroRcOne,
    #[serde(rename = "1.0.0-rc0")]
    OneZeroZeroRcZero,
}
pub type InfoObjectProperties = String;
pub type InfoObjectDescription = String;
pub type InfoObjectTermsOfService = String;
pub type InfoObjectVersion = String;
pub type ContactObjectName = String;
pub type ContactObjectEmail = String;
pub type ContactObjectUrl = String;
pub type SpecificationExtension = serde_json::Value;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ContactObject {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<ContactObjectName>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email: Option<ContactObjectEmail>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<ContactObjectUrl>,
}
pub type LicenseObjectName = String;
pub type LicenseObjectUrl = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct LicenseObject {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<LicenseObjectName>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<LicenseObjectUrl>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct InfoObject {
    pub title: InfoObjectProperties,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<InfoObjectDescription>,
    #[serde(rename = "termsOfService", skip_serializing_if = "Option::is_none")]
    pub terms_of_service: Option<InfoObjectTermsOfService>,
    pub version: InfoObjectVersion,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contact: Option<ContactObject>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub license: Option<LicenseObject>,
}
pub type ExternalDocumentationObjectDescription = String;
pub type ExternalDocumentationObjectUrl = String;
/// ExternalDocumentationObject
///
/// information about external documentation
///
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ExternalDocumentationObject {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<ExternalDocumentationObjectDescription>,
    pub url: ExternalDocumentationObjectUrl,
}
pub type ServerObjectUrl = String;
pub type ServerObjectName = String;
pub type ServerObjectDescription = String;
pub type ServerObjectSummary = String;
pub type ServerObjectVariableDefault = String;
pub type ServerObjectVariableDescription = String;
pub type ServerObjectVariableEnumItem = String;
pub type ServerObjectVariableEnum = Vec<ServerObjectVariableEnumItem>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ServerObjectVariable {
    #[serde(rename = "default")]
    pub _default: ServerObjectVariableDefault,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<ServerObjectVariableDescription>,
    #[serde(rename = "enum", skip_serializing_if = "Option::is_none")]
    pub _enum: Option<ServerObjectVariableEnum>,
}
pub type ServerObjectVariables = HashMap<String, serde_json::Value>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ServerObject {
    pub url: ServerObjectUrl,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<ServerObjectName>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<ServerObjectDescription>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub summary: Option<ServerObjectSummary>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub variables: Option<ServerObjectVariables>,
}
type AlwaysFalse = serde_json::Value;
pub type Servers = Vec<ServerObject>;
/// MethodObjectName
///
/// The cannonical name for the method. The name MUST be unique within the methods array.
///
pub type MethodObjectName = String;
/// MethodObjectDescription
///
/// A verbose explanation of the method behavior. GitHub Flavored Markdown syntax MAY be used for rich text representation.
///
pub type MethodObjectDescription = String;
/// MethodObjectSummary
///
/// A short summary of what the method does.
///
pub type MethodObjectSummary = String;
pub type TagObjectName = String;
pub type TagObjectDescription = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct TagObject {
    pub name: TagObjectName,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<TagObjectDescription>,
    #[serde(rename = "externalDocs", skip_serializing_if = "Option::is_none")]
    pub external_docs: Option<ExternalDocumentationObject>,
}
pub type Ref = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ReferenceObject {
    #[serde(rename = "$ref")]
    pub _ref: Ref,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum TagOrReference {
    TagObject(TagObject),
    ReferenceObject(ReferenceObject),
}
pub type MethodObjectTags = Vec<TagOrReference>;
/// MethodObjectParamStructure
///
/// Format the server expects the params. Defaults to 'either'.
///
/// # Default
///
/// either
///
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
pub enum MethodObjectParamStructure {
    #[serde(rename = "by-position")]
    ByPosition,
    #[serde(rename = "by-name")]
    ByName,
    #[serde(rename = "either")]
    Either,
}
pub type ContentDescriptorObjectName = String;
pub type ContentDescriptorObjectDescription = String;
pub type ContentDescriptorObjectSummary = String;
pub type Id = String;
pub type Schema = String;
pub type Comment = String;
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
pub type NonNegativeIntegerDefaultZero = i64;
pub type Pattern = String;
pub type SchemaArray = Vec<JSONSchema>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum Items {
    JSONSchema(Box<JSONSchema>),
    SchemaArray(SchemaArray),
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
pub type Definitions = HashMap<String, JSONSchema>;
/// Properties
///
/// # Default
///
/// {}
///
pub type Properties = HashMap<String, JSONSchema>;
/// PatternProperties
///
/// # Default
///
/// {}
///
pub type PatternProperties = HashMap<String, JSONSchema>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum DependenciesSet {
    JSONSchema(Box<JSONSchema>),
    StringArray(StringArray),
}
pub type Dependencies = HashMap<String, DependenciesSet>;
pub type Enum = Vec<AlwaysTrue>;
pub type SimpleTypes = serde_json::Value;
pub type ArrayOfSimpleTypes = Vec<SimpleTypes>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum Type {
    SimpleTypes(SimpleTypes),
    ArrayOfSimpleTypes(ArrayOfSimpleTypes),
}
pub type Format = String;
pub type ContentMediaType = String;
pub type ContentEncoding = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct JSONSchemaObject {
    #[serde(rename = "$id", skip_serializing_if = "Option::is_none")]
    pub id: Option<Id>,
    #[serde(rename = "$schema", skip_serializing_if = "Option::is_none")]
    pub schema: Option<Schema>,
    #[serde(rename = "$ref", skip_serializing_if = "Option::is_none")]
    pub _ref: Option<Ref>,
    #[serde(rename = "$comment", skip_serializing_if = "Option::is_none")]
    pub comment: Option<Comment>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title: Option<Title>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<Description>,
    #[serde(rename = "default", skip_serializing_if = "Option::is_none")]
    pub _default: Option<AlwaysTrue>,
    #[serde(rename = "readOnly", skip_serializing_if = "Option::is_none")]
    pub read_only: Option<ReadOnly>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub examples: Option<Examples>,
    #[serde(rename = "multipleOf", skip_serializing_if = "Option::is_none")]
    pub multiple_of: Option<MultipleOf>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub maximum: Option<Maximum>,
    #[serde(rename = "exclusiveMaximum", skip_serializing_if = "Option::is_none")]
    pub exclusive_maximum: Option<ExclusiveMaximum>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub minimum: Option<Minimum>,
    #[serde(rename = "exclusiveMinimum", skip_serializing_if = "Option::is_none")]
    pub exclusive_minimum: Option<ExclusiveMinimum>,
    #[serde(rename = "maxLength", skip_serializing_if = "Option::is_none")]
    pub max_length: Option<NonNegativeInteger>,
    #[serde(rename = "minLength", skip_serializing_if = "Option::is_none")]
    pub min_length: Option<NonNegativeIntegerDefaultZero>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub pattern: Option<Pattern>,
    #[serde(rename = "additionalItems", skip_serializing_if = "Option::is_none")]
    pub additional_items: Option<Box<JSONSchema>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub items: Option<Items>,
    #[serde(rename = "maxItems", skip_serializing_if = "Option::is_none")]
    pub max_items: Option<NonNegativeInteger>,
    #[serde(rename = "minItems", skip_serializing_if = "Option::is_none")]
    pub min_items: Option<NonNegativeIntegerDefaultZero>,
    #[serde(rename = "uniqueItems", skip_serializing_if = "Option::is_none")]
    pub unique_items: Option<UniqueItems>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contains: Option<Box<JSONSchema>>,
    #[serde(rename = "maxProperties", skip_serializing_if = "Option::is_none")]
    pub max_properties: Option<NonNegativeInteger>,
    #[serde(rename = "minProperties", skip_serializing_if = "Option::is_none")]
    pub min_properties: Option<NonNegativeIntegerDefaultZero>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub required: Option<StringArray>,
    #[serde(rename = "additionalProperties", skip_serializing_if = "Option::is_none")]
    pub additional_properties: Option<Box<JSONSchema>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub definitions: Option<Definitions>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub properties: Option<Properties>,
    #[serde(rename = "patternProperties", skip_serializing_if = "Option::is_none")]
    pub pattern_properties: Option<PatternProperties>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub dependencies: Option<Dependencies>,
    #[serde(rename = "propertyNames", skip_serializing_if = "Option::is_none")]
    pub property_names: Option<Box<JSONSchema>>,
    #[serde(rename = "const", skip_serializing_if = "Option::is_none")]
    pub _const: Option<AlwaysTrue>,
    #[serde(rename = "enum", skip_serializing_if = "Option::is_none")]
    pub _enum: Option<Enum>,
    #[serde(rename = "type", skip_serializing_if = "Option::is_none")]
    pub _type: Option<Type>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub format: Option<Format>,
    #[serde(rename = "contentMediaType", skip_serializing_if = "Option::is_none")]
    pub content_media_type: Option<ContentMediaType>,
    #[serde(rename = "contentEncoding", skip_serializing_if = "Option::is_none")]
    pub content_encoding: Option<ContentEncoding>,
    #[serde(rename = "if", skip_serializing_if = "Option::is_none")]
    pub _if: Option<Box<JSONSchema>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub then: Option<Box<JSONSchema>>,
    #[serde(rename = "else", skip_serializing_if = "Option::is_none")]
    pub _else: Option<Box<JSONSchema>>,
    #[serde(rename = "allOf", skip_serializing_if = "Option::is_none")]
    pub all_of: Option<SchemaArray>,
    #[serde(rename = "anyOf", skip_serializing_if = "Option::is_none")]
    pub any_of: Option<SchemaArray>,
    #[serde(rename = "oneOf", skip_serializing_if = "Option::is_none")]
    pub one_of: Option<SchemaArray>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub not: Option<Box<JSONSchema>>,
}
/// JSONSchemaBoolean
///
/// Always valid if true. Never valid if false. Is constant.
///
pub type JSONSchemaBoolean = bool;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum JSONSchema {
    JSONSchemaObject(JSONSchemaObject),
    JSONSchemaBoolean(JSONSchemaBoolean),
}
pub type ContentDescriptorObjectRequired = bool;
pub type ContentDescriptorObjectDeprecated = bool;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ContentDescriptorObject {
    pub name: ContentDescriptorObjectName,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<ContentDescriptorObjectDescription>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub summary: Option<ContentDescriptorObjectSummary>,
    pub schema: Box<JSONSchema>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub required: Option<ContentDescriptorObjectRequired>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub deprecated: Option<ContentDescriptorObjectDeprecated>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum ContentDescriptorOrReference {
    ContentDescriptorObject(ContentDescriptorObject),
    ReferenceObject(ReferenceObject),
}
pub type MethodObjectParams = Vec<ContentDescriptorOrReference>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum MethodObjectResult {
    ContentDescriptorObject(ContentDescriptorObject),
    ReferenceObject(ReferenceObject),
}
/// ErrorObjectCode
///
/// A Number that indicates the error type that occurred. This MUST be an integer. The error codes from and including -32768 to -32000 are reserved for pre-defined errors. These pre-defined errors SHOULD be assumed to be returned from any JSON-RPC api.
///
pub type ErrorObjectCode = i64;
/// ErrorObjectMessage
///
/// A String providing a short description of the error. The message SHOULD be limited to a concise single sentence.
///
pub type ErrorObjectMessage = String;
/// ErrorObjectData
///
/// A Primitive or Structured value that contains additional information about the error. This may be omitted. The value of this member is defined by the Server (e.g. detailed error information, nested errors etc.).
///
pub type ErrorObjectData = serde_json::Value;
/// ErrorObject
///
/// Defines an application level error.
///
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ErrorObject {
    pub code: ErrorObjectCode,
    pub message: ErrorObjectMessage,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<ErrorObjectData>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum ErrorOrReference {
    ErrorObject(ErrorObject),
    ReferenceObject(ReferenceObject),
}
/// MethodObjectErrors
///
/// Defines an application level error.
///
pub type MethodObjectErrors = Vec<ErrorOrReference>;
pub type LinkObjectName = String;
pub type LinkObjectSummary = String;
pub type LinkObjectMethod = String;
pub type LinkObjectDescription = String;
pub type LinkObjectParams = serde_json::Value;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct LinkObjectServer {
    pub url: ServerObjectUrl,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<ServerObjectName>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<ServerObjectDescription>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub summary: Option<ServerObjectSummary>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub variables: Option<ServerObjectVariables>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct LinkObject {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<LinkObjectName>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub summary: Option<LinkObjectSummary>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub method: Option<LinkObjectMethod>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<LinkObjectDescription>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub params: Option<LinkObjectParams>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub server: Option<LinkObjectServer>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum LinkOrReference {
    LinkObject(LinkObject),
    ReferenceObject(ReferenceObject),
}
pub type MethodObjectLinks = Vec<LinkOrReference>;
pub type ExamplePairingObjectName = String;
pub type ExamplePairingObjectDescription = String;
pub type ExampleObjectSummary = String;
pub type ExampleObjectValue = serde_json::Value;
pub type ExampleObjectDescription = String;
pub type ExampleObjectName = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ExampleObject {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub summary: Option<ExampleObjectSummary>,
    pub value: ExampleObjectValue,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<ExampleObjectDescription>,
    pub name: ExampleObjectName,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum ExampleOrReference {
    ExampleObject(ExampleObject),
    ReferenceObject(ReferenceObject),
}
pub type ExamplePairingObjectParams = Vec<ExampleOrReference>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum ExamplePairingObjectResult {
    ExampleObject(ExampleObject),
    ReferenceObject(ReferenceObject),
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ExamplePairingObject {
    pub name: ExamplePairingObjectName,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<ExamplePairingObjectDescription>,
    pub params: ExamplePairingObjectParams,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<ExamplePairingObjectResult>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum ExamplePairingOrReference {
    ExamplePairingObject(ExamplePairingObject),
    ReferenceObject(ReferenceObject),
}
pub type MethodObjectExamples = Vec<ExamplePairingOrReference>;
pub type MethodObjectDeprecated = bool;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct MethodObject {
    pub name: MethodObjectName,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<MethodObjectDescription>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub summary: Option<MethodObjectSummary>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub servers: Option<Servers>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tags: Option<MethodObjectTags>,
    #[serde(rename = "paramStructure", skip_serializing_if = "Option::is_none")]
    pub param_structure: Option<MethodObjectParamStructure>,
    pub params: MethodObjectParams,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<MethodObjectResult>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub errors: Option<MethodObjectErrors>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub links: Option<MethodObjectLinks>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub examples: Option<MethodObjectExamples>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub deprecated: Option<MethodObjectDeprecated>,
    #[serde(rename = "externalDocs", skip_serializing_if = "Option::is_none")]
    pub external_docs: Option<ExternalDocumentationObject>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum MethodOrReference {
    MethodObject(MethodObject),
    ReferenceObject(ReferenceObject),
}
pub type Methods = Vec<MethodOrReference>;
pub type SchemaComponents = HashMap<String, serde_json::Value>;
pub type LinkComponents = HashMap<String, serde_json::Value>;
pub type ErrorComponents = HashMap<String, serde_json::Value>;
pub type ExampleComponents = HashMap<String, serde_json::Value>;
pub type ExamplePairingComponents = HashMap<String, serde_json::Value>;
pub type ContentDescriptorComponents = HashMap<String, serde_json::Value>;
pub type TagComponents = HashMap<String, serde_json::Value>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct Components {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub schemas: Option<SchemaComponents>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub links: Option<LinkComponents>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub errors: Option<ErrorComponents>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub examples: Option<ExampleComponents>,
    #[serde(rename = "examplePairings", skip_serializing_if = "Option::is_none")]
    pub example_pairings: Option<ExamplePairingComponents>,
    #[serde(rename = "contentDescriptors", skip_serializing_if = "Option::is_none")]
    pub content_descriptors: Option<ContentDescriptorComponents>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tags: Option<TagComponents>,
}
/// MetaSchema
///
/// JSON Schema URI (used by some editors)
///
/// # Default
///
/// https://meta.open-rpc.org/
///
pub type MetaSchema = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct OpenrpcDocument {
    pub openrpc: Openrpc,
    pub info: InfoObject,
    #[serde(rename = "externalDocs", skip_serializing_if = "Option::is_none")]
    pub external_docs: Option<ExternalDocumentationObject>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub servers: Option<Servers>,
    pub methods: Methods,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub components: Option<Components>,
    #[serde(rename = "$schema", skip_serializing_if = "Option::is_none")]
    pub schema: Option<MetaSchema>,
}