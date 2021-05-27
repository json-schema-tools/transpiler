from typing import TypedDict
from typing import Optional
from typing import NewType

Hi = NewType("Hi", str)

Ref = NewType("Ref", str)

class Foo(TypedDict):
    $friggity: Optional[Hi]
    $ref: Optional[Ref]
