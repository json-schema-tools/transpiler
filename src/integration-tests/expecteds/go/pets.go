type Ox interface{}
type Horse interface{}
type Donkey interface{}
type OneOfDonkeyHorseOxP55NQZsj struct {
	Ox     *Ox
	Horse  *Horse
	Donkey *Donkey
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *OneOfDonkeyHorseOxP55NQZsj) UnmarshalJSON(bytes []byte) error {

	var myOx Ox
	if err := json.Unmarshal(bytes, &myOx); err == nil {
		o.Ox = &myOx
		return nil
	}

	var myHorse Horse
	if err := json.Unmarshal(bytes, &myHorse); err == nil {
		o.Horse = &myHorse
		return nil
	}

	var myDonkey Donkey
	if err := json.Unmarshal(bytes, &myDonkey); err == nil {
		o.Donkey = &myDonkey
		return nil
	}

	return errors.New("failed to unmarshal one of the object properties")
}
func (o OneOfDonkeyHorseOxP55NQZsj) MarshalJSON() ([]byte, error) {

	if o.Ox != nil {
		return json.Marshal(o.Ox)
	}
	if o.Horse != nil {
		return json.Marshal(o.Horse)
	}
	if o.Donkey != nil {
		return json.Marshal(o.Donkey)
	}

	return nil, errors.New("failed to marshal any one of the object properties")
}
// an array of animals that are good at pulling things
type PlowAnimals []OneOfDonkeyHorseOxP55NQZsj