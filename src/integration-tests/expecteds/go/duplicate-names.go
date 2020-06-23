type Foo string
type Baz bool
type ObjectOfBazLEtnUJ56 struct {
	NotFoo *Baz `json:"NotFoo,omitempty"`
}
// array of strings is all...
type UnorderedSetOfFooz1UBFn8B []Foo
type Bar int64
type SetOfNumbers (Bar)
type OneOfStuff struct {
	UnorderedSetOfFooz1UBFn8B *UnorderedSetOfFooz1UBFn8B
	SetOfNumbers              *SetOfNumbers
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *OneOfStuff) UnmarshalJSON(bytes []byte) error {

	var myUnorderedSetOfFooz1UBFn8B UnorderedSetOfFooz1UBFn8B
	if err := json.Unmarshal(bytes, &myUnorderedSetOfFooz1UBFn8B); err == nil {
		o.UnorderedSetOfFooz1UBFn8B = &myUnorderedSetOfFooz1UBFn8B
		return nil
	}

	var mySetOfNumbers SetOfNumbers
	if err := json.Unmarshal(bytes, &mySetOfNumbers); err == nil {
		o.SetOfNumbers = &mySetOfNumbers
		return nil
	}

	return errors.New("failed to unmarshal one of the object properties")
}
func (o OneOfStuff) MarshalJSON() ([]byte, error) {

	if o.UnorderedSetOfFooz1UBFn8B != nil {
		return json.Marshal(o.UnorderedSetOfFooz1UBFn8B)
	}
	if o.SetOfNumbers != nil {
		return json.Marshal(o.SetOfNumbers)
	}

	return nil, errors.New("failed to marshal any one of the object properties")
}
// Generated! Represents an alias to any of the provided schemas
type AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar struct {
	Foo                 *Foo
	ObjectOfBazLEtnUJ56 *ObjectOfBazLEtnUJ56
	OneOfStuff          *OneOfStuff
	Bar                 *Bar
}
func (a *AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar) UnmarshalJSON(bytes []byte) error {
	var ok bool

	var myFoo Foo
	if err := json.Unmarshal(bytes, &myFoo); err == nil {
		ok = true
		a.Foo = &myFoo
	}

	var myObjectOfBazLEtnUJ56 ObjectOfBazLEtnUJ56
	if err := json.Unmarshal(bytes, &myObjectOfBazLEtnUJ56); err == nil {
		ok = true
		a.ObjectOfBazLEtnUJ56 = &myObjectOfBazLEtnUJ56
	}

	var myOneOfStuff OneOfStuff
	if err := json.Unmarshal(bytes, &myOneOfStuff); err == nil {
		ok = true
		a.OneOfStuff = &myOneOfStuff
	}

	var myBar Bar
	if err := json.Unmarshal(bytes, &myBar); err == nil {
		ok = true
		a.Bar = &myBar
	}

	// Did unmarshal at least one of the simple objects.
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func(o AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar) MarshalJSON() ([]byte, error) {
  out := []interface{}
  
  if o.Foo != nil {
    out = append(out, o.Foo)
  }
  if o.ObjectOfBazLEtnUJ56 != nil {
    out = append(out, o.ObjectOfBazLEtnUJ56)
  }
  if o.OneOfStuff != nil {
    out = append(out, o.OneOfStuff)
  }
  if o.Bar != nil {
    out = append(out, o.Bar)
  }

  return json.Marshal(out)
}