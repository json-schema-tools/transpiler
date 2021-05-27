type Hi string
type Ref string
type Foo struct {
	Friggity *Hi  `json:"$friggity,omitempty"`
	Ref      *Ref `json:"$ref,omitempty"`
}
