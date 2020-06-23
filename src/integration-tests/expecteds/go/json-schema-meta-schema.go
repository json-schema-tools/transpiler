type StringVPPt56NS string
type StringNQRYvFt5 string
type StringDoaGddGA string
type AnyL9Fw4VUO interface{}
type BooleanG3T6Tn0M bool
type UnorderedSetOfAnyL9Fw4VUO55Bn0VNb []AnyL9Fw4VUO
type Number0ErlT0It float64
type NumberHo1ClIqD float64
type NonNegativeInteger int64
type AnyXumYU1GW interface{}
type NonNegativeIntegerDefault0 map[string]interface{}
type String3JBlmrip string
type SchemaArray []JSONSchema
//
// --- Default ---
//
// true
type AnyOfJSONSchemaSchemaArrayCotc6H6U struct {
	JSONSchema  *JSONSchema
	SchemaArray *SchemaArray
}
func (a *AnyOfJSONSchemaSchemaArrayCotc6H6U) UnmarshalJSON(bytes []byte) error {
	var ok bool

	var myJSONSchema JSONSchema
	if err := json.Unmarshal(bytes, &myJSONSchema); err == nil {
		ok = true
		a.JSONSchema = &myJSONSchema
	}

	var mySchemaArray SchemaArray
	if err := json.Unmarshal(bytes, &mySchemaArray); err == nil {
		ok = true
		a.SchemaArray = &mySchemaArray
	}

	// Did unmarshal at least one of the simple objects.
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func(o AnyOfJSONSchemaSchemaArrayCotc6H6U) MarshalJSON() ([]byte, error) {
  out := []interface{}
  
  if o.JSONSchema != nil {
    out = append(out, o.JSONSchema)
  }
  if o.SchemaArray != nil {
    out = append(out, o.SchemaArray)
  }

  return json.Marshal(out)
}
//
// --- Default ---
//
// []
type UnorderedSetOfStringDoaGddGAIEp1G0PF []StringDoaGddGA
//
// --- Default ---
//
// {}
type ObjectWrpyYBUS map[string]interface{}
type Dependencies map[string]interface{}
type UnorderedSetOfAnyL9Fw4VUOyeAFYsFq []AnyL9Fw4VUO
type Any17L18NF5 interface{}
type UnorderedSetOfAny17L18NF5VWcS9ROi []Any17L18NF5
type SchemaType struct {
	Any17L18NF5                       *Any17L18NF5
	UnorderedSetOfAny17L18NF5VWcS9ROi *UnorderedSetOfAny17L18NF5VWcS9ROi
}
func (a *SchemaType) UnmarshalJSON(bytes []byte) error {
	var ok bool

	var myAny17L18NF5 Any17L18NF5
	if err := json.Unmarshal(bytes, &myAny17L18NF5); err == nil {
		ok = true
		a.Any17L18NF5 = &myAny17L18NF5
	}

	var myUnorderedSetOfAny17L18NF5VWcS9ROi UnorderedSetOfAny17L18NF5VWcS9ROi
	if err := json.Unmarshal(bytes, &myUnorderedSetOfAny17L18NF5VWcS9ROi); err == nil {
		ok = true
		a.UnorderedSetOfAny17L18NF5VWcS9ROi = &myUnorderedSetOfAny17L18NF5VWcS9ROi
	}

	// Did unmarshal at least one of the simple objects.
	if ok {
		return nil
	}
	return errors.New("failed to unmarshal any of the object properties")
}
func(o SchemaType) MarshalJSON() ([]byte, error) {
  out := []interface{}
  
  if o.Any17L18NF5 != nil {
    out = append(out, o.Any17L18NF5)
  }
  if o.UnorderedSetOfAny17L18NF5VWcS9ROi != nil {
    out = append(out, o.UnorderedSetOfAny17L18NF5VWcS9ROi)
  }

  return json.Marshal(out)
}
//
// --- Default ---
//
// true
type JSONSchema struct {
	Id                   *StringVPPt56NS                       `json:"$id,omitempty"`
	Schema               *StringNQRYvFt5                       `json:"$schema,omitempty"`
	Ref                  *StringVPPt56NS                       `json:"$ref,omitempty"`
	Comment              *StringDoaGddGA                       `json:"$comment,omitempty"`
	Title                *StringDoaGddGA                       `json:"title,omitempty"`
	Description          *StringDoaGddGA                       `json:"description,omitempty"`
	Default              *AnyL9Fw4VUO                          `json:"default,omitempty"`
	ReadOnly             *BooleanG3T6Tn0M                      `json:"readOnly,omitempty"`
	Examples             *UnorderedSetOfAnyL9Fw4VUO55Bn0VNb    `json:"examples,omitempty"`
	MultipleOf           *Number0ErlT0It                       `json:"multipleOf,omitempty"`
	Maximum              *NumberHo1ClIqD                       `json:"maximum,omitempty"`
	ExclusiveMaximum     *NumberHo1ClIqD                       `json:"exclusiveMaximum,omitempty"`
	Minimum              *NumberHo1ClIqD                       `json:"minimum,omitempty"`
	ExclusiveMinimum     *NumberHo1ClIqD                       `json:"exclusiveMinimum,omitempty"`
	MaxLength            *NonNegativeInteger                   `json:"maxLength,omitempty"`
	MinLength            *NonNegativeIntegerDefault0           `json:"minLength,omitempty"`
	Pattern              *String3JBlmrip                       `json:"pattern,omitempty"`
	AdditionalItems      *JSONSchema                           `json:"additionalItems,omitempty"`
	Items                *AnyOfJSONSchemaSchemaArrayCotc6H6U   `json:"items,omitempty"`
	MaxItems             *NonNegativeInteger                   `json:"maxItems,omitempty"`
	MinItems             *NonNegativeIntegerDefault0           `json:"minItems,omitempty"`
	UniqueItems          *BooleanG3T6Tn0M                      `json:"uniqueItems,omitempty"`
	Contains             *JSONSchema                           `json:"contains,omitempty"`
	MaxProperties        *NonNegativeInteger                   `json:"maxProperties,omitempty"`
	MinProperties        *NonNegativeIntegerDefault0           `json:"minProperties,omitempty"`
	Required             *UnorderedSetOfStringDoaGddGAIEp1G0PF `json:"required,omitempty"`
	AdditionalProperties *JSONSchema                           `json:"additionalProperties,omitempty"`
	Definitions          *ObjectWrpyYBUS                       `json:"definitions,omitempty"`
	Properties           *ObjectWrpyYBUS                       `json:"properties,omitempty"`
	PatternProperties    *ObjectWrpyYBUS                       `json:"patternProperties,omitempty"`
	Dependencies         *Dependencies                         `json:"dependencies,omitempty"`
	PropertyNames        *JSONSchema                           `json:"propertyNames,omitempty"`
	Const                *AnyL9Fw4VUO                          `json:"const,omitempty"`
	Enum                 *UnorderedSetOfAnyL9Fw4VUOyeAFYsFq    `json:"enum,omitempty"`
	Type                 *SchemaType                           `json:"type,omitempty"`
	Format               *StringDoaGddGA                       `json:"format,omitempty"`
	ContentMediaType     *StringDoaGddGA                       `json:"contentMediaType,omitempty"`
	ContentEncoding      *StringDoaGddGA                       `json:"contentEncoding,omitempty"`
	If                   *JSONSchema                           `json:"if,omitempty"`
	Then                 *JSONSchema                           `json:"then,omitempty"`
	Else                 *JSONSchema                           `json:"else,omitempty"`
	AllOf                *SchemaArray                          `json:"allOf,omitempty"`
	AnyOf                *SchemaArray                          `json:"anyOf,omitempty"`
	OneOf                *SchemaArray                          `json:"oneOf,omitempty"`
	Not                  *JSONSchema                           `json:"not,omitempty"`
}