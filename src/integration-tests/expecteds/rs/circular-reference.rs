extern crate serde_json;

use serde::{Serialize, Deserialize};
#[derive(Serialize, Deserialize)]
pub struct MoebiusSchema {
    pub(crate) MoebiusProperty: Option<MoebiusSchema>,
}
