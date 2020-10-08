from typing import List
from typing import NewType
from typing import Any
from typing import Union

Ox = NewType("Ox", Any)

Horse = NewType("Horse", Any)

Donkey = NewType("Donkey", Any)

OneOfDonkeyHorseOxP55NQZsj = NewType("OneOfDonkeyHorseOxP55NQZsj", Union[Ox, Horse, Donkey])
"""an array of animals that are good at pulling things
"""
PlowAnimals = NewType("PlowAnimals", List[OneOfDonkeyHorseOxP55NQZsj])
