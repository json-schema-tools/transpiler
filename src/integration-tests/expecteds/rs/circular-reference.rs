extern crate serde;
extern crate serde_json;

use serde::{Serialize, Deserialize};
#[derive(Serialize, Deserialize)]
pub struct MoebiusSchema {
    #[serde(rename="MoebiusProperty")]
    pub(crate) moebius_property: Option<MoebiusSchema>,
}
