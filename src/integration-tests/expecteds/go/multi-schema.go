type StringDoaGddGA string
type OneOfStringDoaGddGAStringDoaGddGABERs71N5 struct {
	StringDoaGddGA *StringDoaGddGA
	StringDoaGddGA *StringDoaGddGA
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *OneOfStringDoaGddGAStringDoaGddGABERs71N5) UnmarshalJSON(bytes []byte) error {

	var myStringDoaGddGA StringDoaGddGA
	if err := json.Unmarshal(bytes, &myStringDoaGddGA); err == nil {
		o.StringDoaGddGA = &myStringDoaGddGA
		return nil
	}

	var myStringDoaGddGA StringDoaGddGA
	if err := json.Unmarshal(bytes, &myStringDoaGddGA); err == nil {
		o.StringDoaGddGA = &myStringDoaGddGA
		return nil
	}

	return errors.New("failed to unmarshal one of the object properties")
}
func (o OneOfStringDoaGddGAStringDoaGddGABERs71N5) MarshalJSON() ([]byte, error) {

	if o.StringDoaGddGA != nil {
		return json.Marshal(o.StringDoaGddGA)
	}
	if o.StringDoaGddGA != nil {
		return json.Marshal(o.StringDoaGddGA)
	}

	return nil, errors.New("failed to marshal any one of the object properties")
}
// A way to describe color
type RGBOrHex []OneOfStringDoaGddGAStringDoaGddGABERs71N5
// Human word for color
type StringDBm1TnLT string
type ColorAsAnything interface{}
// Generated! Represents an alias to any of the provided schemas
type AnyOfRGBOrHexStringDBm1TnLTColorAsAnything struct {
	RGBOrHex        *RGBOrHex
	StringDBm1TnLT  *StringDBm1TnLT
	ColorAsAnything *ColorAsAnything
}
func (a *AnyOfRGBOrHexStringDBm1TnLTColorAsAnything) UnmarshalJSON(bytes []byte) error {
	var ok bool

	var myRGBOrHex RGBOrHex
	if err := json.Unmarshal(bytes, &myRGBOrHex); err == nil {
		ok = true
		a.RGBOrHex = &myRGBOrHex
	}

	var myStringDBm1TnLT StringDBm1TnLT
	if err := json.Unmarshal(bytes, &myStringDBm1TnLT); err == nil {
		ok = true
		a.StringDBm1TnLT = &myStringDBm1TnLT
	}

	var myColorAsAnything ColorAsAnything
	if err := json.Unmarshal(bytes, &myColorAsAnything); err == nil {
		ok = true
		a.ColorAsAnything = &myColorAsAnything
	}

	// Did unmarshal at least one of the simple objects.
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func(o AnyOfRGBOrHexStringDBm1TnLTColorAsAnything) MarshalJSON() ([]byte, error) {
  out := []interface{}
  
  if o.RGBOrHex != nil {
    out = append(out, o.RGBOrHex)
  }
  if o.StringDBm1TnLT != nil {
    out = append(out, o.StringDBm1TnLT)
  }
  if o.ColorAsAnything != nil {
    out = append(out, o.ColorAsAnything)
  }

  return json.Marshal(out)
}