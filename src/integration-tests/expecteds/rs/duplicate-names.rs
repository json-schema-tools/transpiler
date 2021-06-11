extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
pub type Baz = bool;
pub type Foo = String;
/// UnorderedSetOfFooz1UBFn8B
///
/// array of strings is all...
///
pub type UnorderedSetOfFooz1UBFn8B = Vec<Foo>;
pub type Bar = i64;
pub type SetOfNumbers = (Bar);
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct ObjectOfBazLEtnUJ56 {
    #[serde(rename="NotFoo", skip_serializing_if("Option::is_none"))]
    pub not_foo: Option<Baz>,
}
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
#[serde(untagged)]
pub enum OneOfStuff {
    UnorderedSetOfFooz1UBFn8B(UnorderedSetOfFooz1UBFn8B),
    SetOfNumbers(SetOfNumbers),
}
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
#[serde(untagged)]
pub enum AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar {
    Foo(Foo),
    ObjectOfBazLEtnUJ56(ObjectOfBazLEtnUJ56),
    OneOfStuff(OneOfStuff),
    Bar(Bar),
}
