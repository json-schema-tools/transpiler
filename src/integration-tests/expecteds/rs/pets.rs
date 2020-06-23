use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

pub type Ox = serde_json::Value;
pub type Horse = serde_json::Value;
pub type Donkey = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub enum OneOfDonkeyHorseOxP55NQZsj {
    Ox,
    Horse,
    Donkey
}
/// PlowAnimals
///
/// an array of animals that are good at pulling things
///
pub type PlowAnimals = Vec<OneOfDonkeyHorseOxP55NQZsj>;