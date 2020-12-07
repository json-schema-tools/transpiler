from typing import NewType
from typing import Union

TypeAsArrayAsstring = NewType("TypeAsArrayAsstring", str)

TypeAsArrayAsnumber = NewType("TypeAsArrayAsnumber", float)

TypeAsArray = NewType("TypeAsArray", Union[TypeAsArrayAsstring, TypeAsArrayAsnumber])
