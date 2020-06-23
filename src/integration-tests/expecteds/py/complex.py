from typing import NewType

IsMetal = NewType("IsMetal", bool)
from typing import NewType
"""Fill amounts
"""
FillAmount = NewType("FillAmount", int)
from typing import NewType

NumDrains = NewType("NumDrains", float)
from typing import NewType

FeelToTouch = NewType("FeelToTouch", str)
from enum import Enum

class Orientation(Enum):
    NORTH = 0
    SOUTH = 1
    WEST = 2
    EAST = 3
from typing import NewType

UserAvailability = NewType("UserAvailability", float)
from typing import NewType

LightsNearby = NewType("LightsNearby", int)
from typing import List, Any, NewType

Dishes = NewType("Dishes", List[Any])
from typing import NewType

Warranty = NewType("Warranty", float)
from typing import Any, NewType

ProfessionallyInstalled = NewType("ProfessionallyInstalled", Any)
from typing import NewType, Tuple

Accessories = NewType("Accessories", Tuple[Warranty, ProfessionallyInstalled])
from typing import NewType

ServiceYear = NewType("ServiceYear", float)
from typing import List, NewType

YearsInService = NewType("YearsInService", List[ServiceYear])
from typing import NewType

WaterLiters = NewType("WaterLiters", float)
from typing import NewType

SoapBrand = NewType("SoapBrand", str)
from typing import TypedDict, Optional

class WashEquipment(TypedDict):
    water: Optional[WaterLiters]
    soap: Optional[SoapBrand]
from typing import NewType

SinkUserNumHands = NewType("SinkUserNumHands", float)
from typing import NewType

SinkUserName = NewType("SinkUserName", str)
from typing import TypedDict, Optional

class SinkUser(TypedDict):
    hands: Optional[SinkUserNumHands]
    name: Optional[SinkUserName]
from typing import NewType, Any, Mapping

StreetName = NewType("StreetName", Mapping[Any, Any])
from typing import NewType

StreetNumber = NewType("StreetNumber", float)
from typing import TypedDict, Optional

class SinkLocation(TypedDict):
    residenceStreet: Optional[StreetName]
    residenceNumber: Optional[StreetNumber]
from typing import NewType, Any, Mapping

SinkResource = NewType("SinkResource", Mapping[Any, Any])
from typing import NewType

Whining = NewType("Whining", bool)
from typing import NewType

Burns = NewType("Burns", int)
from typing import NewType

FeelingOfEmptiness = NewType("FeelingOfEmptiness", None)
from typing import NewType, Union

SinkComplaints = NewType("SinkComplaints", Union[Whining, Burns, FeelingOfEmptiness])
from typing import NewType

European = NewType("European", bool)
from typing import NewType

DrainPipeInches = NewType("DrainPipeInches", int)
from typing import NewType, Union

MeasurementStandard = NewType("MeasurementStandard", Union[European, DrainPipeInches])
from typing import TypedDict, Optional

class KitchenSink(TypedDict):
    bool: Optional[IsMetal]
    int: Optional[FillAmount]
    number: Optional[NumDrains]
    string: Optional[FeelToTouch]
    stringEnum: Optional[Orientation]
    numbericalEnum: Optional[UserAvailability]
    integerEnum: Optional[LightsNearby]
    untypedArray: Optional[Dishes]
    orderedArray: Optional[Accessories]
    unorderedArray: Optional[YearsInService]
    object: Optional[WashEquipment]
    allOf: Optional[SinkResource]
    anyOf: Optional[SinkComplaints]
    oneOf: Optional[MeasurementStandard]