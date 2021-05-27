extern crate serde;
extern crate serde_json;

use serde::{Serialize, Deserialize};
pub type Baz = bool;
pub type Foo = String;
/// UnorderedSetOfFooz1UBFn8B
///
/// array of strings is all...
///
pub type UnorderedSetOfFooz1UBFn8B = Vec<Foo>;
pub type Bar = i64;
pub type SetOfNumbers = (Bar);
#[derive(Serialize, Deserialize)]
pub struct ObjectOfBazLEtnUJ56 {
    #[serde(rename="NotFoo")]
    pub(crate) not_foo: Option<Baz>,
}
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
