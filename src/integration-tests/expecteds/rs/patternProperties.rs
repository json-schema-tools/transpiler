extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
pub type BooleanVyG3AETh = bool;
pub type Godlike = f64;
pub type AbsoluteMadLad = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct Milkers {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub anything: Option<BooleanVyG3AETh>,
}
