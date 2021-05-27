extern crate serde;
extern crate serde_json;

use serde::{Serialize, Deserialize};
#[derive(Serialize, Deserialize)]
pub enum Ox {
    #[serde(rename = "Ox")]
    Ox,
}
#[derive(Serialize, Deserialize)]
pub enum Horse {
    #[serde(rename = "Horse")]
    Horse,
}
#[derive(Serialize, Deserialize)]
pub enum Donkey {
    #[serde(rename = "Donkey")]
    Donkey,
}
#[derive(Serialize, Deserialize)]
pub enum OneOfDonkeyHorseOxP55NQZsj {
    Ox,
    Horse,
    Donkey
}
/// PlowAnimals
///
/// an array of animals that are good at pulling things. Elaborate enum.
///
pub type PlowAnimals = Vec<OneOfDonkeyHorseOxP55NQZsj>;
