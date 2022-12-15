from rest_framework import serializers

from ..models import CustomFilter, NodeCustomFilter

class CustomFilterSeializer(serializers.ModelSerializer):

    class Meta:
        model = CustomFilter
        fields = '__all__'


class NodeCustomFilterSeializer(serializers.ModelSerializer):

    class Meta:
        model = NodeCustomFilter
        fields = '__all__'
