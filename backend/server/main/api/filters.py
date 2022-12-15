from rest_framework import viewsets

from ..serializers import CustomFilterSeializer, NodeCustomFilterSeializer
from ..models import CustomFilter, NodeCustomFilter

class CustomFilterView(viewsets.ModelViewSet):

    serializer_class = CustomFilterSeializer
    queryset = CustomFilter.objects.all()
    http_method_names = ['get',]


class NodeCustomFilterView(viewsets.ModelViewSet):

    serializer_class = NodeCustomFilterSeializer
    queryset = NodeCustomFilter.objects.all()
    http_method_names = ['get',]
