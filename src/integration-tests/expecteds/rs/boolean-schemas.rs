use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

type AlwaysTrue = serde_json::Value;
type AlwaysFalse = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub struct ObjectOfCmepExQR {
    pub(crate) boolSchemaT: Option<AlwaysTrue>,
    pub(crate) boolSchemaF: Option<AlwaysFalse>,
}
