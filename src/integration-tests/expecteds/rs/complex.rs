extern crate serde;
extern crate serde_json;

use serde::{Serialize, Deserialize};
use std::collections::HashMap;
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
#[derive(Serialize, Deserialize)]
pub enum Version {
    #[serde(rename = "1.1.1")]
    OneOneOne,
    #[serde(rename = "v1")]
    VOne,
    #[serde(rename = "0")]
    Zero,
    #[serde(rename = "4")]
    Four,
    #[serde(rename = "v0.0.1")]
    VZeroZeroOne,
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
    #[serde(rename="residenceStreet")]
    pub(crate) residence_street: Option<StreetName>,
    #[serde(rename="residenceNumber")]
    pub(crate) residence_number: Option<StreetNumber>,
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
    #[serde(rename="stringEnum")]
    pub(crate) string_enum: Option<Orientation>,
    #[serde(rename="gotchaStringEnum")]
    pub(crate) gotcha_string_enum: Option<Version>,
    #[serde(rename="numbericalEnum")]
    pub(crate) numberical_enum: Option<UserAvailability>,
    #[serde(rename="integerEnum")]
    pub(crate) integer_enum: Option<LightsNearby>,
    #[serde(rename="untypedArray")]
    pub(crate) untyped_array: Option<Dishes>,
    #[serde(rename="orderedArray")]
    pub(crate) ordered_array: Option<Accessories>,
    #[serde(rename="unorderedArray")]
    pub(crate) unordered_array: Option<YearsInService>,
    pub(crate) object: Option<WashEquipment>,
    #[serde(rename="allOf")]
    pub(crate) all_of: Option<SinkResource>,
    #[serde(rename="anyOf")]
    pub(crate) any_of: Option<SinkComplaints>,
    #[serde(rename="oneOf")]
    pub(crate) one_of: Option<MeasurementStandard>,
}
