from rest_framework import serializers

from ..models import NodeImage

class NodeImageSeializer(serializers.ModelSerializer):

    class Meta:
        model = NodeImage
        fields = '__all__'
