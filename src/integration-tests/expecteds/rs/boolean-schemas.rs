extern crate serde_json;

use serde::{Serialize, Deserialize};
type AlwaysTrue = serde_json::Value;
type AlwaysFalse = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub struct ObjectOfCmepExQR {
    pub(crate) boolSchemaT: Option<AlwaysTrue>,
    pub(crate) boolSchemaF: Option<AlwaysFalse>,
}
