extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use std::collections::HashMap;
use derive_builder::Builder;
pub type D = String;
pub type C = String;
pub type A = HashMap<String, D>;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct B {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub c: Option<C>,
    #[serde(flatten)]
    pub additional_properties: HashMap<String, D>,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum AnyOfAB {
    A(A),
    B(B),
}
