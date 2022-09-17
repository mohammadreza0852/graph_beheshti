from rest_framework import viewsets

from ..serializers import DatasetSeializer
from ..models import Dataset

class DatasetView(viewsets.ModelViewSet):

    serializer_class = DatasetSeializer
    queryset = Dataset.objects.all()
    http_method_names = ['get',]
