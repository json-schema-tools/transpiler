extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct B {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub a: Option<Box<A>>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum A {
    B(B),
}
