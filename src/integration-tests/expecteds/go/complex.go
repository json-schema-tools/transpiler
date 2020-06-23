type IsMetal bool
// Fill amounts
//
// --- Default ---
//
// 123
//
// --- Example ---
//
// `123`
//
// --- Example ---
//
// `456`
//
// --- Example ---
//
// `789`
type FillAmount int64
type NumDrains float64
type FeelToTouch string
type Orientation string
const (
	OrientationEnum0 Orientation = "north"
	OrientationEnum1 Orientation = "south"
	OrientationEnum2 Orientation = "west"
	OrientationEnum3 Orientation = "east"
)
type UserAvailability float64
const (
	UserAvailabilityEnum0 UserAvailability = 1
	UserAvailabilityEnum1 UserAvailability = 2
)
type LightsNearby int64
const (
	LightsNearbyEnum0 LightsNearby = 1
	LightsNearbyEnum1 LightsNearby = 2
	LightsNearbyEnum2 LightsNearby = 3
)
type Dishes []interface{}
type Warranty float64
type ProfessionallyInstalled interface{}
type Accessories (Warranty, ProfessionallyInstalled)
type ServiceYear float64
type YearsInService []ServiceYear
type WaterLiters float64
type SoapBrand string
type WashEquipment struct {
	Water *WaterLiters `json:"water"`
	Soap  *SoapBrand   `json:"soap,omitempty"`
}
type SinkUserNumHands float64
type SinkUserName string
type SinkUser struct {
	Hands *SinkUserNumHands `json:"hands,omitempty"`
	Name  *SinkUserName     `json:"name,omitempty"`
}
type StreetName map[string]interface{}
type StreetNumber float64
type SinkLocation struct {
	ResidenceStreet *StreetName   `json:"residenceStreet,omitempty"`
	ResidenceNumber *StreetNumber `json:"residenceNumber,omitempty"`
}
type SinkResource map[string]interface{}
type Whining bool
type Burns int64
type FeelingOfEmptiness interface{}
type SinkComplaints struct {
	Whining            *Whining
	Burns              *Burns
	FeelingOfEmptiness *FeelingOfEmptiness
}
func (a *SinkComplaints) UnmarshalJSON(bytes []byte) error {
	var ok bool

	var myWhining Whining
	if err := json.Unmarshal(bytes, &myWhining); err == nil {
		ok = true
		a.Whining = &myWhining
	}

	var myBurns Burns
	if err := json.Unmarshal(bytes, &myBurns); err == nil {
		ok = true
		a.Burns = &myBurns
	}

	var myFeelingOfEmptiness FeelingOfEmptiness
	if err := json.Unmarshal(bytes, &myFeelingOfEmptiness); err == nil {
		ok = true
		a.FeelingOfEmptiness = &myFeelingOfEmptiness
	}

	// Did unmarshal at least one of the simple objects.
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func(o SinkComplaints) MarshalJSON() ([]byte, error) {
  out := []interface{}
  
  if o.Whining != nil {
    out = append(out, o.Whining)
  }
  if o.Burns != nil {
    out = append(out, o.Burns)
  }
  if o.FeelingOfEmptiness != nil {
    out = append(out, o.FeelingOfEmptiness)
  }

  return json.Marshal(out)
}
type European bool
type DrainPipeInches int64
type MeasurementStandard struct {
	European        *European
	DrainPipeInches *DrainPipeInches
}
func (a *MeasurementStandard) UnmarshalJSON(bytes []byte) error {
	var ok bool

	var myEuropean European
	if err := json.Unmarshal(bytes, &myEuropean); err == nil {
		ok = true
		a.European = &myEuropean
	}

	var myDrainPipeInches DrainPipeInches
	if err := json.Unmarshal(bytes, &myDrainPipeInches); err == nil {
		ok = true
		a.DrainPipeInches = &myDrainPipeInches
	}

	// Did unmarshal at least one of the simple objects.
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func(o MeasurementStandard) MarshalJSON() ([]byte, error) {
  out := []interface{}
  
  if o.European != nil {
    out = append(out, o.European)
  }
  if o.DrainPipeInches != nil {
    out = append(out, o.DrainPipeInches)
  }

  return json.Marshal(out)
}
type KitchenSink struct {
	Bool           *IsMetal             `json:"bool,omitempty"`
	Int            *FillAmount          `json:"int,omitempty"`
	Number         *NumDrains           `json:"number,omitempty"`
	String         *FeelToTouch         `json:"string,omitempty"`
	StringEnum     *Orientation         `json:"stringEnum,omitempty"`
	NumbericalEnum *UserAvailability    `json:"numbericalEnum,omitempty"`
	IntegerEnum    *LightsNearby        `json:"integerEnum,omitempty"`
	UntypedArray   *Dishes              `json:"untypedArray,omitempty"`
	OrderedArray   *Accessories         `json:"orderedArray,omitempty"`
	UnorderedArray *YearsInService      `json:"unorderedArray,omitempty"`
	Object         *WashEquipment       `json:"object,omitempty"`
	AllOf          *SinkResource        `json:"allOf,omitempty"`
	AnyOf          *SinkComplaints      `json:"anyOf,omitempty"`
	OneOf          *MeasurementStandard `json:"oneOf,omitempty"`
}