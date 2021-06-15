extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
pub enum Ox {
    #[serde(rename = "Ox")]
    Ox,
}
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
pub enum Horse {
    #[serde(rename = "Horse")]
    Horse,
}
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
pub enum Donkey {
    #[serde(rename = "Donkey")]
    Donkey,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum OneOfDonkeyHorseOxP55NQZsj {
    Ox(Ox),
    Horse(Horse),
    Donkey(Donkey),
}
/// PlowAnimals
///
/// an array of animals that are good at pulling things. Elaborate enum.
///
pub type PlowAnimals = Vec<OneOfDonkeyHorseOxP55NQZsj>;
