from typing import NewType
from typing import Union
from typing import List
from typing import Any

StringDoaGddGA = NewType("StringDoaGddGA", str)

OneOfStringDoaGddGAStringDoaGddGABERs71N5 = NewType("OneOfStringDoaGddGAStringDoaGddGABERs71N5", Union[StringDoaGddGA, StringDoaGddGA])
"""A way to describe color
"""
RGBOrHex = NewType("RGBOrHex", List[OneOfStringDoaGddGAStringDoaGddGABERs71N5])
"""Human word for color
"""
StringDBm1TnLT = NewType("StringDBm1TnLT", str)

ColorAsAnything = NewType("ColorAsAnything", Any)
"""Generated! Represents an alias to any of the provided schemas
"""
AnyOfRGBOrHexStringDBm1TnLTColorAsAnything = NewType("AnyOfRGBOrHexStringDBm1TnLTColorAsAnything", Union[RGBOrHex, StringDBm1TnLT, ColorAsAnything])
