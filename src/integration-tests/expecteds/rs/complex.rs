use serde::{Serialize, Deserialize};
use std::collections::HashMap;
extern crate serde_json;

pub type IsMetal = bool;
/// FillAmount
///
/// Fill amounts
///
/// # Default
///
/// 123
///
/// # Example
///
/// `123`
///
/// # Example
///
/// `456`
///
/// # Example
///
/// `789`
///
pub type FillAmount = i64;
pub type NumDrains = f64;
pub type FeelToTouch = String;
#[derive(Serialize, Deserialize)]
pub enum Orientation {
    #[serde(rename = "north")]
    North,
    #[serde(rename = "south")]
    South,
    #[serde(rename = "west")]
    West,
    #[serde(rename = "east")]
    East,
}
pub type UserAvailability = f64;
pub type LightsNearby = i64;
pub type Dishes = Vec<serde_json::Value>;
pub type Warranty = f64;
pub type ProfessionallyInstalled = serde_json::Value;
pub type Accessories = (Warranty, ProfessionallyInstalled);
pub type ServiceYear = f64;
pub type YearsInService = Vec<ServiceYear>;
pub type WaterLiters = f64;
pub type SoapBrand = String;
#[derive(Serialize, Deserialize)]
pub struct WashEquipment {
    pub(crate) water: WaterLiters,
    pub(crate) soap: Option<SoapBrand>,
}
pub type SinkUserNumHands = f64;
pub type SinkUserName = String;
#[derive(Serialize, Deserialize)]
pub struct SinkUser {
    pub(crate) hands: Option<SinkUserNumHands>,
    pub(crate) name: Option<SinkUserName>,
}
pub type StreetName = HashMap<String, Option<serde_json::Value>>;
pub type StreetNumber = f64;
#[derive(Serialize, Deserialize)]
pub struct SinkLocation {
    pub(crate) residenceStreet: Option<StreetName>,
    pub(crate) residenceNumber: Option<StreetNumber>,
}
pub type SinkResource = HashMap<String, Option<serde_json::Value>>;
pub type Whining = bool;
pub type Burns = i64;
pub type FeelingOfEmptiness = serde_json::Value;
#[derive(Serialize, Deserialize)]
pub enum SinkComplaints {
    Whining,
    Burns,
    FeelingOfEmptiness
}
pub type European = bool;
pub type DrainPipeInches = i64;
#[derive(Serialize, Deserialize)]
pub enum MeasurementStandard {
    European,
    DrainPipeInches
}
#[derive(Serialize, Deserialize)]
pub struct KitchenSink {
    pub(crate) bool: Option<IsMetal>,
    pub(crate) int: Option<FillAmount>,
    pub(crate) number: Option<NumDrains>,
    pub(crate) string: Option<FeelToTouch>,
    pub(crate) stringEnum: Option<Orientation>,
    pub(crate) numbericalEnum: Option<UserAvailability>,
    pub(crate) integerEnum: Option<LightsNearby>,
    pub(crate) untypedArray: Option<Dishes>,
    pub(crate) orderedArray: Option<Accessories>,
    pub(crate) unorderedArray: Option<YearsInService>,
    pub(crate) object: Option<WashEquipment>,
    pub(crate) allOf: Option<SinkResource>,
    pub(crate) anyOf: Option<SinkComplaints>,
    pub(crate) oneOf: Option<MeasurementStandard>,
}