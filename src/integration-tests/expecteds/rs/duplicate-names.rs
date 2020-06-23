use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

pub type Foo = String;
pub type Baz = bool;
#[derive(Serialize, Deserialize)]
pub struct ObjectOfBazLEtnUJ56 {
    pub(crate) NotFoo: Option<Baz>,
}
/// UnorderedSetOfFooz1UBFn8B
///
/// array of strings is all...
///
pub type UnorderedSetOfFooz1UBFn8B = Vec<Foo>;
pub type Bar = i64;
pub type SetOfNumbers = (Bar);
#[derive(Serialize, Deserialize)]
pub enum OneOfStuff {
    UnorderedSetOfFooz1UBFn8B,
    SetOfNumbers
}
#[derive(Serialize, Deserialize)]
pub enum AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar {
    Foo,
    ObjectOfBazLEtnUJ56,
    OneOfStuff,
    Bar
}