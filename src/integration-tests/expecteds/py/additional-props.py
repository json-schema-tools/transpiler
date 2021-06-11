from typing import NewType
from typing import Any
from typing import Mapping

TheProps = NewType("TheProps", str)

AdditionalProps = NewType("AdditionalProps", Mapping[Any, Any])
