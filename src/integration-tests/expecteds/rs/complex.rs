extern crate serde;
extern crate serde_json;
extern crate derive_builder;

use serde::{Serialize, Deserialize};
use derive_builder::Builder;
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
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
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
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
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
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct WashEquipment {
    pub water: WaterLiters,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub soap: Option<SoapBrand>,
}
pub type SinkUserNumHands = f64;
pub type SinkUserName = String;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct SinkUser {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub hands: Option<SinkUserNumHands>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<SinkUserName>,
}
pub type StreetName = HashMap<String, Option<serde_json::Value>>;
pub type StreetNumber = f64;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct SinkLocation {
    #[serde(rename = "residenceStreet", skip_serializing_if = "Option::is_none")]
    pub residence_street: Option<StreetName>,
    #[serde(rename = "residenceNumber", skip_serializing_if = "Option::is_none")]
    pub residence_number: Option<StreetNumber>,
}
pub type SinkResource = HashMap<String, Option<serde_json::Value>>;
pub type Whining = bool;
pub type Burns = i64;
pub type FeelingOfEmptiness = serde_json::Value;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum SinkComplaints {
    Whining(Whining),
    Burns(Burns),
    FeelingOfEmptiness(FeelingOfEmptiness),
}
pub type European = bool;
pub type DrainPipeInches = i64;
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(untagged)]
pub enum MeasurementStandard {
    European(European),
    DrainPipeInches(DrainPipeInches),
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Builder, Default)]
#[builder(setter(strip_option), default)]
#[serde(default)]
pub struct KitchenSink {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub bool: Option<IsMetal>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub int: Option<FillAmount>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub number: Option<NumDrains>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub string: Option<FeelToTouch>,
    #[serde(rename = "stringEnum", skip_serializing_if = "Option::is_none")]
    pub string_enum: Option<Orientation>,
    #[serde(rename = "gotchaStringEnum", skip_serializing_if = "Option::is_none")]
    pub gotcha_string_enum: Option<Version>,
    #[serde(rename = "numbericalEnum", skip_serializing_if = "Option::is_none")]
    pub numberical_enum: Option<UserAvailability>,
    #[serde(rename = "integerEnum", skip_serializing_if = "Option::is_none")]
    pub integer_enum: Option<LightsNearby>,
    #[serde(rename = "untypedArray", skip_serializing_if = "Option::is_none")]
    pub untyped_array: Option<Dishes>,
    #[serde(rename = "orderedArray", skip_serializing_if = "Option::is_none")]
    pub ordered_array: Option<Accessories>,
    #[serde(rename = "unorderedArray", skip_serializing_if = "Option::is_none")]
    pub unordered_array: Option<YearsInService>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub object: Option<WashEquipment>,
    #[serde(rename = "allOf", skip_serializing_if = "Option::is_none")]
    pub all_of: Option<SinkResource>,
    #[serde(rename = "anyOf", skip_serializing_if = "Option::is_none")]
    pub any_of: Option<SinkComplaints>,
    #[serde(rename = "oneOf", skip_serializing_if = "Option::is_none")]
    pub one_of: Option<MeasurementStandard>,
}
