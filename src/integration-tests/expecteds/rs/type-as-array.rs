extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
pub type TypeAsArrayAsString = String;
pub type TypeAsArrayAsNumber = f64;
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
#[serde(untagged)]
pub enum TypeAsArray {
    TypeAsArrayAsString(TypeAsArrayAsString),
    TypeAsArrayAsNumber(TypeAsArrayAsNumber),
}
