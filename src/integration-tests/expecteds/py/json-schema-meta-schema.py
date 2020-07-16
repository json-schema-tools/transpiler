from typing import NewType

$Id = NewType("$Id", str)
from typing import NewType

$Schema = NewType("$Schema", str)
from typing import NewType

$Ref = NewType("$Ref", str)
from typing import NewType

$Comment = NewType("$Comment", str)
from typing import NewType

Title = NewType("Title", str)
from typing import NewType

Description = NewType("Description", str)
from typing import Any, NewType

AlwaysTrue = NewType("AlwaysTrue", Any)
from typing import NewType

ReadOnly = NewType("ReadOnly", bool)
from typing import List, NewType

Examples = NewType("Examples", List[AlwaysTrue])
from typing import NewType

MultipleOf = NewType("MultipleOf", float)
from typing import NewType

Maximum = NewType("Maximum", float)
from typing import NewType

ExclusiveMaximum = NewType("ExclusiveMaximum", float)
from typing import NewType

Minimum = NewType("Minimum", float)
from typing import NewType

ExclusiveMinimum = NewType("ExclusiveMinimum", float)
from typing import NewType

NonNegativeInteger = NewType("NonNegativeInteger", int)
from typing import Any, NewType

DefaultZero = NewType("DefaultZero", Any)
from typing import NewType, Any, Mapping

NonNegativeIntegerDefaultZero = NewType("NonNegativeIntegerDefaultZero", Mapping[Any, Any])
from typing import NewType

Pattern = NewType("Pattern", str)
from typing import List, NewType

SchemaArray = NewType("SchemaArray", List[JSONMetaSchema])
from typing import NewType, Union

Items = NewType("Items", Union[JSONMetaSchema, SchemaArray])
from typing import NewType

UniqueItems = NewType("UniqueItems", bool)
from typing import NewType

StringDoaGddGA = NewType("StringDoaGddGA", str)
from typing import List, NewType

StringArray = NewType("StringArray", List[StringDoaGddGA])
from typing import NewType, Any, Mapping

Definitions = NewType("Definitions", Mapping[Any, Any])
from typing import NewType, Any, Mapping

Properties = NewType("Properties", Mapping[Any, Any])
from typing import NewType, Any, Mapping

PatternProperties = NewType("PatternProperties", Mapping[Any, Any])
from typing import NewType, Union

AnyOfJSONMetaSchemaStringArrayBk9CjcAm = NewType("AnyOfJSONMetaSchemaStringArrayBk9CjcAm", Union[JSONMetaSchema, StringArray])
from typing import NewType, Any, Mapping

Dependencies = NewType("Dependencies", Mapping[Any, Any])
from typing import List, NewType

Enum = NewType("Enum", List[AlwaysTrue])
from typing import Any, NewType

SimpleTypes = NewType("SimpleTypes", Any)
from typing import List, NewType

ArrayOfSimpleTypes = NewType("ArrayOfSimpleTypes", List[SimpleTypes])
from typing import NewType, Union

AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK = NewType("AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK", Union[SimpleTypes, ArrayOfSimpleTypes])
from typing import NewType

Format = NewType("Format", str)
from typing import NewType

ContentMediaType = NewType("ContentMediaType", str)
from typing import NewType

ContentEncoding = NewType("ContentEncoding", str)
from typing import TypedDict, Optional

class JSONMetaSchema(TypedDict):
    $id: Optional[$Id]
    $schema: Optional[$Schema]
    $ref: Optional[$Ref]
    $comment: Optional[$Comment]
    title: Optional[Title]
    description: Optional[Description]
    default: Optional[AlwaysTrue]
    readOnly: Optional[ReadOnly]
    examples: Optional[Examples]
    multipleOf: Optional[MultipleOf]
    maximum: Optional[Maximum]
    exclusiveMaximum: Optional[ExclusiveMaximum]
    minimum: Optional[Minimum]
    exclusiveMinimum: Optional[ExclusiveMinimum]
    maxLength: Optional[NonNegativeInteger]
    minLength: Optional[NonNegativeIntegerDefaultZero]
    pattern: Optional[Pattern]
    additionalItems: Optional[JSONMetaSchema]
    items: Optional[Items]
    maxItems: Optional[NonNegativeInteger]
    minItems: Optional[NonNegativeIntegerDefaultZero]
    uniqueItems: Optional[UniqueItems]
    contains: Optional[JSONMetaSchema]
    maxProperties: Optional[NonNegativeInteger]
    minProperties: Optional[NonNegativeIntegerDefaultZero]
    required: Optional[StringArray]
    additionalProperties: Optional[JSONMetaSchema]
    definitions: Optional[Definitions]
    properties: Optional[Properties]
    patternProperties: Optional[PatternProperties]
    dependencies: Optional[Dependencies]
    propertyNames: Optional[JSONMetaSchema]
    const: Optional[AlwaysTrue]
    enum: Optional[Enum]
    type: Optional[AnyOfArrayOfSimpleTypesSimpleTypesBOu2T0PK]
    format: Optional[Format]
    contentMediaType: Optional[ContentMediaType]
    contentEncoding: Optional[ContentEncoding]
    if: Optional[JSONMetaSchema]
    then: Optional[JSONMetaSchema]
    else: Optional[JSONMetaSchema]
    allOf: Optional[SchemaArray]
    anyOf: Optional[SchemaArray]
    oneOf: Optional[SchemaArray]
    not: Optional[JSONMetaSchema]
