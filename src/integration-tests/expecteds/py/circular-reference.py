from typing import TypedDict
from typing import Optional
from typing import NewType
from typing import Union

StringDoaGddGA = NewType("StringDoaGddGA", str)

OneOfMoebiusSchemaStringDoaGddGANK2MA6NR = NewType("OneOfMoebiusSchemaStringDoaGddGANK2MA6NR", Union[MoebiusSchema, StringDoaGddGA])

class MoebiusSchema(TypedDict):
    MoebiusProperty: Optional[MoebiusSchema]
    deeperMobiusProperty: Optional[OneOfMoebiusSchemaStringDoaGddGANK2MA6NR]
