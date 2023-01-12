from ..models import House, Person, Vehicle, NodeImage
from ..serializers import HouseSeializer, PersonSeializer, VehicleSeializer, NodeImageSeializer
from rest_framework.response import Response

class NodeUtils:

    class NodeChoices:
        PERSON = 'Person'
        HOUSE = 'House'
        VEHICLE = 'Vehicle'

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

    @classmethod
    def get_image_by_type(cls, node_type, request):
        node_image = NodeImage.objects.get(node_type=node_type)
        return NodeImageSeializer(node_image, context={"request": request}).data

    @classmethod
    def get_properties_by_type(cls, node_type):
        fields = None
        if node_type == cls.NodeChoices.PERSON:
            fields = Person.get_model_fields()
        elif node_type == cls.NodeChoices.HOUSE:
            fields = House.get_model_fields()
        elif node_type == cls.NodeChoices.VEHICLE:
            fields = Vehicle.get_model_fields()
        fields_list = []
        for field in fields:
            fields_list.append(field.name)
        return fields_list
