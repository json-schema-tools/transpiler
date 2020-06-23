from typing import NewType

Foo = NewType("Foo", str)
from typing import NewType

Baz = NewType("Baz", bool)
from typing import TypedDict, Optional

class ObjectOfBazLEtnUJ56(TypedDict):
    NotFoo: Optional[Baz]
from typing import List, NewType
"""array of strings is all...
"""
UnorderedSetOfFooz1UBFn8B = NewType("UnorderedSetOfFooz1UBFn8B", List[Foo])
from typing import NewType

Bar = NewType("Bar", int)
from typing import NewType, Tuple

SetOfNumbers = NewType("SetOfNumbers", Tuple[Bar])
from typing import NewType, Union

OneOfStuff = NewType("OneOfStuff", Union[UnorderedSetOfFooz1UBFn8B, SetOfNumbers])
from typing import NewType, Union
"""Generated! Represents an alias to any of the provided schemas
"""
AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar = NewType("AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar", Union[Foo, ObjectOfBazLEtnUJ56, OneOfStuff, Bar])