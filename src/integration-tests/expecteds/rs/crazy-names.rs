extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
pub type Hi = String;
pub type Ref = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct Foo {
    #[serde(rename = "$friggity", skip_serializing_if = "Option::is_none")]
    pub friggity: Option<Hi>,
    #[serde(rename = "$ref", skip_serializing_if = "Option::is_none")]
    pub _ref: Option<Ref>,
}
