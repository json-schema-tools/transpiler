export type IsMetal = boolean;
/**
 *
 * Fill amounts
 *
 * @default 123
 *
 * @example
 * `123`
 *
 * @example
 * `456`
 *
 * @example
 * `789`
 *
 */
export type FillAmount = number;
export type NumDrains = number;
export type FeelToTouch = string;
export type Orientation = "north" | "south" | "west" | "east";
export type UserAvailability = 1 | 2;
export type LightsNearby = 1 | 2 | 3;
export type Dishes = any[];
export type Warranty = number;
export type ProfessionallyInstalled = any;
export type Accessories = [Warranty, ProfessionallyInstalled];
export type ServiceYear = number;
export type YearsInService = ServiceYear[];
export type WaterLiters = number;
export type SoapBrand = string;
export interface WashEquipment {
  water: WaterLiters;
  soap?: SoapBrand;
}
export type SinkUserNumHands = number;
export type SinkUserName = string;
export interface SinkUser {
  hands?: SinkUserNumHands;
  name?: SinkUserName;
}
export interface StreetName { [key: string]: any; }
export type StreetNumber = number;
export interface SinkLocation {
  residenceStreet?: StreetName;
  residenceNumber?: StreetNumber;
}
export type SinkResource = SinkUser & SinkLocation;
export type Whining = boolean;
export type Burns = number;
export type FeelingOfEmptiness = null;
export type SinkComplaints = Whining | Burns | FeelingOfEmptiness;
export type European = boolean;
export type DrainPipeInches = number;
export type MeasurementStandard = European | DrainPipeInches;
export interface KitchenSink {
  bool?: IsMetal;
  int?: FillAmount;
  number?: NumDrains;
  string?: FeelToTouch;
  stringEnum?: Orientation;
  numbericalEnum?: UserAvailability;
  integerEnum?: LightsNearby;
  untypedArray?: Dishes;
  orderedArray?: Accessories;
  unorderedArray?: YearsInService;
  object?: WashEquipment;
  allOf?: SinkResource;
  anyOf?: SinkComplaints;
  oneOf?: MeasurementStandard;
  [k: string]: any;
}
