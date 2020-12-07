from typing import NewType
from typing import Union

TypeAsArrayAsString = NewType("TypeAsArrayAsString", str)

TypeAsArrayAsNumber = NewType("TypeAsArrayAsNumber", float)

TypeAsArray = NewType("TypeAsArray", Union[TypeAsArrayAsString, TypeAsArrayAsNumber])
