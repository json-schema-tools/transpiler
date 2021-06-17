import "encoding/json"
import "errors"
type StringDoaGddGA string
type OneOfMoebiusSchemaStringDoaGddGANK2MA6NR struct {
	MoebiusSchema  *MoebiusSchema
	StringDoaGddGA *StringDoaGddGA
}
// UnmarshalJSON implements the json Unmarshaler interface.
// This implementation DOES NOT assert that ONE AND ONLY ONE
// of the simple properties is satisfied; it lazily uses the first one that is satisfied.
// Ergo, it will not return an error if more than one property is valid.
func (o *OneOfMoebiusSchemaStringDoaGddGANK2MA6NR) UnmarshalJSON(bytes []byte) error {
	var myMoebiusSchema MoebiusSchema
	if err := json.Unmarshal(bytes, &myMoebiusSchema); err == nil {
		o.MoebiusSchema = &myMoebiusSchema
		return nil
	}
	var myStringDoaGddGA StringDoaGddGA
	if err := json.Unmarshal(bytes, &myStringDoaGddGA); err == nil {
		o.StringDoaGddGA = &myStringDoaGddGA
		return nil
	}
	return errors.New("failed to unmarshal one of the object properties")
}
func (o OneOfMoebiusSchemaStringDoaGddGANK2MA6NR) MarshalJSON() ([]byte, error) {
	if o.MoebiusSchema != nil {
		return json.Marshal(o.MoebiusSchema)
	}
	if o.StringDoaGddGA != nil {
		return json.Marshal(o.StringDoaGddGA)
	}
	return nil, errors.New("failed to marshal any one of the object properties")
}
type MoebiusSchema struct {
	MoebiusProperty      *MoebiusSchema                            `json:"MoebiusProperty,omitempty"`
	DeeperMobiusProperty *OneOfMoebiusSchemaStringDoaGddGANK2MA6NR `json:"deeperMobiusProperty,omitempty"`
}
