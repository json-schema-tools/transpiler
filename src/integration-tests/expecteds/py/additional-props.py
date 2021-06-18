from typing import NewType
from typing import Union
from typing import Any
from typing import Mapping

D = NewType("D", str)

C = NewType("C", str)

A = NewType("A", Mapping[Any, Any])

B = NewType("B", Mapping[Any, Any])
"""Generated! Represents an alias to any of the provided schemas
"""
AnyOfAB = NewType("AnyOfAB", Union[A, B])
