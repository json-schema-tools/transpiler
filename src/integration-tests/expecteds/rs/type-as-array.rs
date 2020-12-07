extern crate serde_json;

use serde::{Serialize, Deserialize};
pub type TypeAsArrayAsstring = String;
pub type TypeAsArrayAsnumber = f64;
#[derive(Serialize, Deserialize)]
pub enum TypeAsArray {
    TypeAsArrayAsstring,
    TypeAsArrayAsnumber
}
