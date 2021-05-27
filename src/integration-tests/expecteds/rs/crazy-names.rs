extern crate serde;
extern crate serde_json;

use serde::{Serialize, Deserialize};
pub type Hi = String;
pub type Ref = String;
#[derive(Serialize, Deserialize)]
pub struct Foo {
    #[serde(rename="$friggity")]
    pub(crate) friggity: Option<Hi>,
    #[serde(rename="ref")]
    pub(crate) _ref: Option<Ref>,
}
