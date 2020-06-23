from typing import Any, NewType

Ox = NewType("Ox", Any)
from typing import Any, NewType

Horse = NewType("Horse", Any)
from typing import Any, NewType

Donkey = NewType("Donkey", Any)
from typing import NewType, Union

OneOfDonkeyHorseOxP55NQZsj = NewType("OneOfDonkeyHorseOxP55NQZsj", Union[Ox, Horse, Donkey])
from typing import List, NewType
"""an array of animals that are good at pulling things
"""
PlowAnimals = NewType("PlowAnimals", List[OneOfDonkeyHorseOxP55NQZsj])