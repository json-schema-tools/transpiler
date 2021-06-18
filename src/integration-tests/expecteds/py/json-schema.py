from typing import NewType
from typing import Union
from typing import TypedDict
from typing import Optional

class B(TypedDict):
    a: Optional[A]

A = NewType("A", Union[B])
