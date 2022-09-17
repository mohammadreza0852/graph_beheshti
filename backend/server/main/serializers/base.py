from rest_framework import serializers

from ..models import Dataset

class DatasetSeializer(serializers.ModelSerializer):

    class Meta:
        model = Dataset
        fields = '__all__'
