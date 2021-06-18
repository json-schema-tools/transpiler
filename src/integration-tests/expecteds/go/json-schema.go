import "encoding/json"
import "errors"
type B struct {
	A *A `json:"a,omitempty"`
}
type A struct {
	B *B
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *A) UnmarshalJSON(bytes []byte) error {
	var myB B
	if err := json.Unmarshal(bytes, &myB); err == nil {
		o.B = &myB
		return nil
	}
	return errors.New("failed to unmarshal one of the object properties")
}
func (o A) MarshalJSON() ([]byte, error) {
	if o.B != nil {
		return json.Marshal(o.B)
	}
	return nil, errors.New("failed to marshal any one of the object properties")
}
