type Id string
type Schema string
type Ref string
type Comment string
type Title string
type Description string
type AlwaysTrue interface{}
type ReadOnly bool
type Examples []AlwaysTrue
type MultipleOf float64
type Maximum float64
type ExclusiveMaximum float64
type Minimum float64
type ExclusiveMinimum float64
type NonNegativeInteger int64
type DefaultZero interface{}
type NonNegativeIntegerDefaultZero map[string]interface{}
type Pattern string
type SchemaArray []JSONMetaSchema
//
// --- Default ---
//
// true
type Items struct {
	JSONMetaSchema *JSONMetaSchema
	SchemaArray    *SchemaArray
}
func (a *Items) UnmarshalJSON(bytes []byte) error {
	var ok bool
	var myJSONMetaSchema JSONMetaSchema
	if err := json.Unmarshal(bytes, &myJSONMetaSchema); err == nil {
		ok = true
		a.JSONMetaSchema = &myJSONMetaSchema
	}
	var mySchemaArray SchemaArray
	if err := json.Unmarshal(bytes, &mySchemaArray); err == nil {
		ok = true
		a.SchemaArray = &mySchemaArray
	}
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func (o Items) MarshalJSON() ([]byte, error) {
	out := []interface{}
	if o.JSONMetaSchema != nil {
		out = append(out, o.JSONMetaSchema)
	}
	if o.SchemaArray != nil {
		out = append(out, o.SchemaArray)
	}
	return json.Marshal(out)
}
type UniqueItems bool
type StringDoaGddGA string
//
// --- Default ---
//
// []
type StringArray []StringDoaGddGA
//
// --- Default ---
//
// {}
type Definitions map[string]interface{}
//
// --- Default ---
//
// {}
type Properties map[string]interface{}
//
// --- Default ---
//
// {}
type PatternProperties map[string]interface{}
type AnyOfJSONMetaSchemaStringArrayBk9CjcAm struct {
	JSONMetaSchema *JSONMetaSchema
	StringArray    *StringArray
}
func (a *AnyOfJSONMetaSchemaStringArrayBk9CjcAm) UnmarshalJSON(bytes []byte) error {
	var ok bool
	var myJSONMetaSchema JSONMetaSchema
	if err := json.Unmarshal(bytes, &myJSONMetaSchema); err == nil {
		ok = true
		a.JSONMetaSchema = &myJSONMetaSchema
	}
	var myStringArray StringArray
	if err := json.Unmarshal(bytes, &myStringArray); err == nil {
		ok = true
		a.StringArray = &myStringArray
	}
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func (o AnyOfJSONMetaSchemaStringArrayBk9CjcAm) MarshalJSON() ([]byte, error) {
	out := []interface{}
	if o.JSONMetaSchema != nil {
		out = append(out, o.JSONMetaSchema)
	}
	if o.StringArray != nil {
		out = append(out, o.StringArray)
	}
	return json.Marshal(out)
}
type Dependencies map[string]interface{}
type Enum []AlwaysTrue
type SimpleTypes interface{}
type ArrayOfSimpleTypes []SimpleTypes
type AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK struct {
	SimpleTypes        *SimpleTypes
	ArrayOfSimpleTypes *ArrayOfSimpleTypes
}
func (a *AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK) UnmarshalJSON(bytes []byte) error {
	var ok bool
	var mySimpleTypes SimpleTypes
	if err := json.Unmarshal(bytes, &mySimpleTypes); err == nil {
		ok = true
		a.SimpleTypes = &mySimpleTypes
	}
	var myArrayOfSimpleTypes ArrayOfSimpleTypes
	if err := json.Unmarshal(bytes, &myArrayOfSimpleTypes); err == nil {
		ok = true
		a.ArrayOfSimpleTypes = &myArrayOfSimpleTypes
	}
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func (o AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK) MarshalJSON() ([]byte, error) {
	out := []interface{}
	if o.SimpleTypes != nil {
		out = append(out, o.SimpleTypes)
	}
	if o.ArrayOfSimpleTypes != nil {
		out = append(out, o.ArrayOfSimpleTypes)
	}
	return json.Marshal(out)
}
type Format string
type ContentMediaType string
type ContentEncoding string
//
// --- Default ---
//
// true
type JSONMetaSchema struct {
	Id                   *Id                                         `json:"$id,omitempty"`
	Schema               *Schema                                     `json:"$schema,omitempty"`
	Ref                  *Ref                                        `json:"$ref,omitempty"`
	Comment              *Comment                                    `json:"$comment,omitempty"`
	Title                *Title                                      `json:"title,omitempty"`
	Description          *Description                                `json:"description,omitempty"`
	Default              *AlwaysTrue                                 `json:"default,omitempty"`
	ReadOnly             *ReadOnly                                   `json:"readOnly,omitempty"`
	Examples             *Examples                                   `json:"examples,omitempty"`
	MultipleOf           *MultipleOf                                 `json:"multipleOf,omitempty"`
	Maximum              *Maximum                                    `json:"maximum,omitempty"`
	ExclusiveMaximum     *ExclusiveMaximum                           `json:"exclusiveMaximum,omitempty"`
	Minimum              *Minimum                                    `json:"minimum,omitempty"`
	ExclusiveMinimum     *ExclusiveMinimum                           `json:"exclusiveMinimum,omitempty"`
	MaxLength            *NonNegativeInteger                         `json:"maxLength,omitempty"`
	MinLength            *NonNegativeIntegerDefaultZero              `json:"minLength,omitempty"`
	Pattern              *Pattern                                    `json:"pattern,omitempty"`
	AdditionalItems      *JSONMetaSchema                             `json:"additionalItems,omitempty"`
	Items                *Items                                      `json:"items,omitempty"`
	MaxItems             *NonNegativeInteger                         `json:"maxItems,omitempty"`
	MinItems             *NonNegativeIntegerDefaultZero              `json:"minItems,omitempty"`
	UniqueItems          *UniqueItems                                `json:"uniqueItems,omitempty"`
	Contains             *JSONMetaSchema                             `json:"contains,omitempty"`
	MaxProperties        *NonNegativeInteger                         `json:"maxProperties,omitempty"`
	MinProperties        *NonNegativeIntegerDefaultZero              `json:"minProperties,omitempty"`
	Required             *StringArray                                `json:"required,omitempty"`
	AdditionalProperties *JSONMetaSchema                             `json:"additionalProperties,omitempty"`
	Definitions          *Definitions                                `json:"definitions,omitempty"`
	Properties           *Properties                                 `json:"properties,omitempty"`
	PatternProperties    *PatternProperties                          `json:"patternProperties,omitempty"`
	Dependencies         *Dependencies                               `json:"dependencies,omitempty"`
	PropertyNames        *JSONMetaSchema                             `json:"propertyNames,omitempty"`
	Const                *AlwaysTrue                                 `json:"const,omitempty"`
	Enum                 *Enum                                       `json:"enum,omitempty"`
	Type                 *AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK `json:"type,omitempty"`
	Format               *Format                                     `json:"format,omitempty"`
	ContentMediaType     *ContentMediaType                           `json:"contentMediaType,omitempty"`
	ContentEncoding      *ContentEncoding                            `json:"contentEncoding,omitempty"`
	If                   *JSONMetaSchema                             `json:"if,omitempty"`
	Then                 *JSONMetaSchema                             `json:"then,omitempty"`
	Else                 *JSONMetaSchema                             `json:"else,omitempty"`
	AllOf                *SchemaArray                                `json:"allOf,omitempty"`
	AnyOf                *SchemaArray                                `json:"anyOf,omitempty"`
	OneOf                *SchemaArray                                `json:"oneOf,omitempty"`
	Not                  *JSONMetaSchema                             `json:"not,omitempty"`
}
