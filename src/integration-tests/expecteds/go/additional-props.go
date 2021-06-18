import "encoding/json"
import "errors"
type D string
type C string
type A map[string]interface{}
type B struct {
	C *C `json:"c,omitempty"`
}
// Generated! Represents an alias to any of the provided schemas
type AnyOfAB struct {
	A *A
	B *B
}
func (a *AnyOfAB) UnmarshalJSON(bytes []byte) error {
	var ok bool
	var myA A
	if err := json.Unmarshal(bytes, &myA); err == nil {
		ok = true
		a.A = &myA
	}
	var myB B
	if err := json.Unmarshal(bytes, &myB); err == nil {
		ok = true
		a.B = &myB
	}
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func (o AnyOfAB) MarshalJSON() ([]byte, error) {
	out := []interface{}{}
	if o.A != nil {
		out = append(out, o.A)
	}
	if o.B != nil {
		out = append(out, o.B)
	}
	return json.Marshal(out)
}
