extern crate serde_json;

use serde::{Serialize, Deserialize};
type AlwaysTrue = serde_json::Value;
type AlwaysFalse = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub struct ObjectOfCmepExQR {
    #[serde(rename="boolSchemaT")]
    pub(crate) bool_schema_t: Option<AlwaysTrue>,
    #[serde(rename="boolSchemaF")]
    pub(crate) bool_schema_f: Option<AlwaysFalse>,
}
