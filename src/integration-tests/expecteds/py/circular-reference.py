from typing import TypedDict
from typing import Optional

class MoebiusSchema(TypedDict):
    MoebiusProperty: Optional[MoebiusSchema]
