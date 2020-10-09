from typing import TypedDict
from typing import Optional
from typing import NewType
from typing import Any
AlwaysTrue = NewType("AlwaysTrue", Any)
AlwaysFalse = NewType("AlwaysFalse", Any)

class ObjectOfCmepExQR(TypedDict):
    boolSchemaT: Optional[AlwaysTrue]
    boolSchemaF: Optional[AlwaysFalse]
