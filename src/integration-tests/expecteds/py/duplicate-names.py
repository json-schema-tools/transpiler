from typing import NewType
from typing import Union
from typing import List
from typing import Tuple
from typing import TypedDict
from typing import Optional

Baz = NewType("Baz", bool)

Foo = NewType("Foo", str)
"""array of strings is all...
"""
UnorderedSetOfFooz1UBFn8B = NewType("UnorderedSetOfFooz1UBFn8B", List[Foo])

Bar = NewType("Bar", int)

SetOfNumbers = NewType("SetOfNumbers", Tuple[Bar])

class ObjectOfBazLEtnUJ56(TypedDict):
    NotFoo: Optional[Baz]

OneOfStuff = NewType("OneOfStuff", Union[UnorderedSetOfFooz1UBFn8B, SetOfNumbers])
"""Generated! Represents an alias to any of the provided schemas
"""
AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar = NewType("AnyOfFooFooObjectOfBazLEtnUJ56OneOfStuffBar", Union[Foo, ObjectOfBazLEtnUJ56, OneOfStuff, Bar])
