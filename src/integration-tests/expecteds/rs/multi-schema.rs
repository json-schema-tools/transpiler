use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

pub type StringDoaGddGA = String;
#[derive(Serialize, Deserialize)]
pub enum OneOfStringDoaGddGAStringDoaGddGABERs71N5 {
    StringDoaGddGA,
    StringDoaGddGA
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
#[derive(Serialize, Deserialize)]
pub enum AnyOfRGBOrHexStringDBm1TnLTColorAsAnything {
    RGBOrHex,
    StringDBm1TnLT,
    ColorAsAnything
}