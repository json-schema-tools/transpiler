from typing import List
from typing import NewType
from typing import Union

Ox = NewType("Ox", str)

Horse = NewType("Horse", str)

Donkey = NewType("Donkey", str)

OneOfDonkeyHorseOxP55NQZsj = NewType("OneOfDonkeyHorseOxP55NQZsj", Union[Ox, Horse, Donkey])
"""an array of animals that are good at pulling things. Elaborate enum.
"""
PlowAnimals = NewType("PlowAnimals", List[OneOfDonkeyHorseOxP55NQZsj])
