from typing import TypedDict
from typing import Optional
from typing import NewType
from enum import Enum
from typing import List
from typing import Any
from typing import Tuple
from typing import Mapping
from typing import Union

IsMetal = NewType("IsMetal", bool)
"""Fill amounts
"""
FillAmount = NewType("FillAmount", int)

NumDrains = NewType("NumDrains", float)

FeelToTouch = NewType("FeelToTouch", str)

class Orientation(Enum):
    North = 0
    South = 1
    West = 2
    East = 3

class Version(Enum):
    OneOneOne = 0
    VOne = 1
    Zero = 2
    Four = 3
    VZeroZeroOne = 4

UserAvailability = NewType("UserAvailability", float)

LightsNearby = NewType("LightsNearby", int)

Dishes = NewType("Dishes", List[Any])

Warranty = NewType("Warranty", float)

ProfessionallyInstalled = NewType("ProfessionallyInstalled", Any)

Accessories = NewType("Accessories", Tuple[Warranty, ProfessionallyInstalled])

ServiceYear = NewType("ServiceYear", float)

YearsInService = NewType("YearsInService", List[ServiceYear])

WaterLiters = NewType("WaterLiters", float)

SoapBrand = NewType("SoapBrand", str)

class WashEquipment(TypedDict):
    water: Optional[WaterLiters]
    soap: Optional[SoapBrand]

SinkUserNumHands = NewType("SinkUserNumHands", float)

SinkUserName = NewType("SinkUserName", str)

class SinkUser(TypedDict):
    hands: Optional[SinkUserNumHands]
    name: Optional[SinkUserName]

StreetName = NewType("StreetName", Mapping[Any, Any])

StreetNumber = NewType("StreetNumber", float)

class SinkLocation(TypedDict):
    residenceStreet: Optional[StreetName]
    residenceNumber: Optional[StreetNumber]

SinkResource = NewType("SinkResource", Mapping[Any, Any])

Whining = NewType("Whining", bool)

Burns = NewType("Burns", int)

FeelingOfEmptiness = NewType("FeelingOfEmptiness", None)

SinkComplaints = NewType("SinkComplaints", Union[Whining, Burns, FeelingOfEmptiness])

European = NewType("European", bool)

DrainPipeInches = NewType("DrainPipeInches", int)

MeasurementStandard = NewType("MeasurementStandard", Union[European, DrainPipeInches])

class KitchenSink(TypedDict):
    bool: Optional[IsMetal]
    int: Optional[FillAmount]
    number: Optional[NumDrains]
    string: Optional[FeelToTouch]
    stringEnum: Optional[Orientation]
    gotchaStringEnum: Optional[Version]
    numbericalEnum: Optional[UserAvailability]
    integerEnum: Optional[LightsNearby]
    untypedArray: Optional[Dishes]
    orderedArray: Optional[Accessories]
    unorderedArray: Optional[YearsInService]
    object: Optional[WashEquipment]
    allOf: Optional[SinkResource]
    anyOf: Optional[SinkComplaints]
    oneOf: Optional[MeasurementStandard]
