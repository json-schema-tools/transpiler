extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
pub type StringDoaGddGA = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum OneOfMoebiusSchemaStringDoaGddGANK2MA6NR {
    MoebiusSchema(Box<MoebiusSchema>),
    StringDoaGddGA(StringDoaGddGA),
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct MoebiusSchema {
    #[serde(rename = "MoebiusProperty", skip_serializing_if = "Option::is_none")]
    pub moebius_property: Option<Box<MoebiusSchema>>,
    #[serde(rename = "deeperMobiusProperty", skip_serializing_if = "Option::is_none")]
    pub deeper_mobius_property: Option<OneOfMoebiusSchemaStringDoaGddGANK2MA6NR>,
}
