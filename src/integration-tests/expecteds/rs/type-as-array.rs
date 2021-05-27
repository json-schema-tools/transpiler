extern crate serde;
extern crate serde_json;

use serde::{Serialize, Deserialize};
pub type TypeAsArrayAsString = String;
pub type TypeAsArrayAsNumber = f64;
#[derive(Serialize, Deserialize)]
pub enum TypeAsArray {
    TypeAsArrayAsString,
    TypeAsArrayAsNumber
}
