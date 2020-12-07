import "encoding/json"
import "errors"
type TypeAsArrayAsstring string
type TypeAsArrayAsnumber float64
type TypeAsArray struct {
	TypeAsArrayAsstring *TypeAsArrayAsstring
	TypeAsArrayAsnumber *TypeAsArrayAsnumber
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *TypeAsArray) UnmarshalJSON(bytes []byte) error {
	var myTypeAsArrayAsstring TypeAsArrayAsstring
	if err := json.Unmarshal(bytes, &myTypeAsArrayAsstring); err == nil {
		o.TypeAsArrayAsstring = &myTypeAsArrayAsstring
		return nil
	}
	var myTypeAsArrayAsnumber TypeAsArrayAsnumber
	if err := json.Unmarshal(bytes, &myTypeAsArrayAsnumber); err == nil {
		o.TypeAsArrayAsnumber = &myTypeAsArrayAsnumber
		return nil
	}
	return errors.New("failed to unmarshal one of the object properties")
}
func (o TypeAsArray) MarshalJSON() ([]byte, error) {
	if o.TypeAsArrayAsstring != nil {
		return json.Marshal(o.TypeAsArrayAsstring)
	}
	if o.TypeAsArrayAsnumber != nil {
		return json.Marshal(o.TypeAsArrayAsnumber)
	}
	return nil, errors.New("failed to marshal any one of the object properties")
}
