from typing import NewType

StringDoaGddGA = NewType("StringDoaGddGA", str)
from typing import NewType, Union

OneOfStringDoaGddGAStringDoaGddGABERs71N5 = NewType("OneOfStringDoaGddGAStringDoaGddGABERs71N5", Union[StringDoaGddGA, StringDoaGddGA])
from typing import List, NewType
"""A way to describe color
"""
RGBOrHex = NewType("RGBOrHex", List[OneOfStringDoaGddGAStringDoaGddGABERs71N5])
from typing import NewType
"""Human word for color
"""
StringDBm1TnLT = NewType("StringDBm1TnLT", str)
from typing import Any, NewType

ColorAsAnything = NewType("ColorAsAnything", Any)
from typing import NewType, Union
"""Generated! Represents an alias to any of the provided schemas
"""
AnyOfRGBOrHexStringDBm1TnLTColorAsAnything = NewType("AnyOfRGBOrHexStringDBm1TnLTColorAsAnything", Union[RGBOrHex, StringDBm1TnLT, ColorAsAnything])