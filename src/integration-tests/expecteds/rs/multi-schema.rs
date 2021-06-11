extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
pub type StringDoaGddGA = String;
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
#[serde(untagged)]
pub enum OneOfStringDoaGddGAStringDoaGddGABERs71N5 {
    StringDoaGddGA(StringDoaGddGA),
    StringDoaGddGA(StringDoaGddGA),
}
/// RGBOrHex
///
/// A way to describe color
///
pub type RGBOrHex = Vec<OneOfStringDoaGddGAStringDoaGddGABERs71N5>;
/// StringDBm1TnLT
///
/// Human word for color
///
pub type StringDBm1TnLT = String;
pub type ColorAsAnything = serde_json::Value;
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
#[serde(untagged)]
pub enum AnyOfRGBOrHexStringDBm1TnLTColorAsAnything {
    RGBOrHex(RGBOrHex),
    StringDBm1TnLT(StringDBm1TnLT),
    ColorAsAnything(ColorAsAnything),
}
