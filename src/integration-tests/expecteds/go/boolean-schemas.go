type AlwaysTrue interface{}
type AlwaysFalse interface{}
type ObjectOfCmepExQR struct {
	BoolSchemaT *AlwaysTrue  `json:"boolSchemaT,omitempty"`
	BoolSchemaF *AlwaysFalse `json:"boolSchemaF,omitempty"`
}
