import "encoding/json"
import "errors"
type TypeAsArrayAsString string
type TypeAsArrayAsNumber float64
type TypeAsArray struct {
	TypeAsArrayAsString *TypeAsArrayAsString
	TypeAsArrayAsNumber *TypeAsArrayAsNumber
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *TypeAsArray) UnmarshalJSON(bytes []byte) error {
	var myTypeAsArrayAsString TypeAsArrayAsString
	if err := json.Unmarshal(bytes, &myTypeAsArrayAsString); err == nil {
		o.TypeAsArrayAsString = &myTypeAsArrayAsString
		return nil
	}
	var myTypeAsArrayAsNumber TypeAsArrayAsNumber
	if err := json.Unmarshal(bytes, &myTypeAsArrayAsNumber); err == nil {
		o.TypeAsArrayAsNumber = &myTypeAsArrayAsNumber
		return nil
	}
	return errors.New("failed to unmarshal one of the object properties")
}
func (o TypeAsArray) MarshalJSON() ([]byte, error) {
	if o.TypeAsArrayAsString != nil {
		return json.Marshal(o.TypeAsArrayAsString)
	}
	if o.TypeAsArrayAsNumber != nil {
		return json.Marshal(o.TypeAsArrayAsNumber)
	}
	return nil, errors.New("failed to marshal any one of the object properties")
}
