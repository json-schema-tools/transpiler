from typing import Any, NewType

AlwaysTrue = NewType("AlwaysTrue", Any)
from typing import Any, NewType

AlwaysFalse = NewType("AlwaysFalse", Any)
from typing import TypedDict, Optional

class ObjectOfCmepExQR(TypedDict):
    boolSchemaT: Optional[AlwaysTrue]
    boolSchemaF: Optional[AlwaysFalse]
