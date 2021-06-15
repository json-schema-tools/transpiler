extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct MoebiusSchema {
    #[serde(rename = "MoebiusProperty", skip_serializing_if = "Option::is_none")]
    pub moebius_property: Option<Box<MoebiusSchema>>,
}
