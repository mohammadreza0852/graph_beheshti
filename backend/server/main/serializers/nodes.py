from rest_framework import serializers

from ..models import Person, Vehicle, House

class PersonSeializer(serializers.ModelSerializer):

    class Meta:
        model = Person
        fields = '__all__'


class VehicleSeializer(serializers.ModelSerializer):

    class Meta:
        model = Vehicle
        fields = '__all__'


class HouseSeializer(serializers.ModelSerializer):

    class Meta:
        model = House
        fields = '__all__'
