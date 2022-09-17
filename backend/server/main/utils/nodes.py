from ..models import House, Person, Vehicle
from ..serializers import HouseSeializer, PersonSeializer, VehicleSeializer

class NodeUtils:

    class NodeChoices:
        PERSON = 'person'
        HOUSE = 'house'
        VEHICLE = 'vehicle'

    @classmethod
    def get_node_by_type(cls, node_id, node_type)  :
        if node_type == cls.NodeChoices.PERSON:
            person = Person.objects.get(national_id=node_id)
            return PersonSeializer(person).data
        if node_type == cls.NodeChoices.HOUSE:
            house = House.objects.get(post_number=node_id)
            return HouseSeializer(house).data
        if node_type == cls.NodeChoices.VEHICLE:
            vehicle = Vehicle.objects.get(manufacture_id=node_id)
            return VehicleSeializer(vehicle).data
