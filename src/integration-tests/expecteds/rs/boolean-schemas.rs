extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
type AlwaysTrue = serde_json::Value;
type AlwaysFalse = serde_json::Value;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ObjectOfCmepExQR {
    #[serde(rename = "boolSchemaT", skip_serializing_if = "Option::is_none")]
    pub bool_schema_t: Option<AlwaysTrue>,
    #[serde(rename = "boolSchemaF", skip_serializing_if = "Option::is_none")]
    pub bool_schema_f: Option<AlwaysFalse>,
}
