from typing import NewType

StringVPPt56NS = NewType("StringVPPt56NS", str)
from typing import NewType

StringNQRYvFt5 = NewType("StringNQRYvFt5", str)
from typing import NewType

StringDoaGddGA = NewType("StringDoaGddGA", str)
from typing import Any, NewType

AnyL9Fw4VUO = NewType("AnyL9Fw4VUO", Any)
from typing import NewType

BooleanG3T6Tn0M = NewType("BooleanG3T6Tn0M", bool)
from typing import List, NewType

UnorderedSetOfAnyL9Fw4VUO55Bn0VNb = NewType("UnorderedSetOfAnyL9Fw4VUO55Bn0VNb", List[AnyL9Fw4VUO])
from typing import NewType

Number0ErlT0It = NewType("Number0ErlT0It", float)
from typing import NewType

NumberHo1ClIqD = NewType("NumberHo1ClIqD", float)
from typing import NewType

NonNegativeInteger = NewType("NonNegativeInteger", int)
from typing import Any, NewType

AnyXumYU1GW = NewType("AnyXumYU1GW", Any)
from typing import NewType, Any, Mapping

NonNegativeIntegerDefault0 = NewType("NonNegativeIntegerDefault0", Mapping[Any, Any])
from typing import NewType

String3JBlmrip = NewType("String3JBlmrip", str)
from typing import List, NewType

SchemaArray = NewType("SchemaArray", List[JSONSchema])
from typing import NewType, Union

AnyOfJSONSchemaSchemaArrayCotc6H6U = NewType("AnyOfJSONSchemaSchemaArrayCotc6H6U", Union[JSONSchema, SchemaArray])
from typing import List, NewType

UnorderedSetOfStringDoaGddGAIEp1G0PF = NewType("UnorderedSetOfStringDoaGddGAIEp1G0PF", List[StringDoaGddGA])
from typing import NewType, Any, Mapping

ObjectWrpyYBUS = NewType("ObjectWrpyYBUS", Mapping[Any, Any])
from typing import NewType, Any, Mapping

Dependencies = NewType("Dependencies", Mapping[Any, Any])
from typing import List, NewType

UnorderedSetOfAnyL9Fw4VUOyeAFYsFq = NewType("UnorderedSetOfAnyL9Fw4VUOyeAFYsFq", List[AnyL9Fw4VUO])
from typing import Any, NewType

Any17L18NF5 = NewType("Any17L18NF5", Any)
from typing import List, NewType

UnorderedSetOfAny17L18NF5VWcS9ROi = NewType("UnorderedSetOfAny17L18NF5VWcS9ROi", List[Any17L18NF5])
from typing import NewType, Union

SchemaType = NewType("SchemaType", Union[Any17L18NF5, UnorderedSetOfAny17L18NF5VWcS9ROi])
from typing import TypedDict, Optional

class JSONSchema(TypedDict):
    $id: Optional[StringVPPt56NS]
    $schema: Optional[StringNQRYvFt5]
    $ref: Optional[StringVPPt56NS]
    $comment: Optional[StringDoaGddGA]
    title: Optional[StringDoaGddGA]
    description: Optional[StringDoaGddGA]
    default: Optional[AnyL9Fw4VUO]
    readOnly: Optional[BooleanG3T6Tn0M]
    examples: Optional[UnorderedSetOfAnyL9Fw4VUO55Bn0VNb]
    multipleOf: Optional[Number0ErlT0It]
    maximum: Optional[NumberHo1ClIqD]
    exclusiveMaximum: Optional[NumberHo1ClIqD]
    minimum: Optional[NumberHo1ClIqD]
    exclusiveMinimum: Optional[NumberHo1ClIqD]
    maxLength: Optional[NonNegativeInteger]
    minLength: Optional[NonNegativeIntegerDefault0]
    pattern: Optional[String3JBlmrip]
    additionalItems: Optional[JSONSchema]
    items: Optional[AnyOfJSONSchemaSchemaArrayCotc6H6U]
    maxItems: Optional[NonNegativeInteger]
    minItems: Optional[NonNegativeIntegerDefault0]
    uniqueItems: Optional[BooleanG3T6Tn0M]
    contains: Optional[JSONSchema]
    maxProperties: Optional[NonNegativeInteger]
    minProperties: Optional[NonNegativeIntegerDefault0]
    required: Optional[UnorderedSetOfStringDoaGddGAIEp1G0PF]
    additionalProperties: Optional[JSONSchema]
    definitions: Optional[ObjectWrpyYBUS]
    properties: Optional[ObjectWrpyYBUS]
    patternProperties: Optional[ObjectWrpyYBUS]
    dependencies: Optional[Dependencies]
    propertyNames: Optional[JSONSchema]
    const: Optional[AnyL9Fw4VUO]
    enum: Optional[UnorderedSetOfAnyL9Fw4VUOyeAFYsFq]
    type: Optional[SchemaType]
    format: Optional[StringDoaGddGA]
    contentMediaType: Optional[StringDoaGddGA]
    contentEncoding: Optional[StringDoaGddGA]
    if: Optional[JSONSchema]
    then: Optional[JSONSchema]
    else: Optional[JSONSchema]
    allOf: Optional[SchemaArray]
    anyOf: Optional[SchemaArray]
    oneOf: Optional[SchemaArray]
    not: Optional[JSONSchema]