from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response

from ..serializers import DatasetSeializer
from ..models import Dataset
from ..utils import NodeUtils

class DatasetView(viewsets.ModelViewSet):

    serializer_class = DatasetSeializer
    queryset = Dataset.objects.all()
    http_method_names = ['get',]


class PropertyView(views.APIView):

    def get(self, request, format=None):
        node_type = request.GET.get('type')

        if node_type:
            fields = NodeUtils.get_properties_by_type(node_type)
            return Response(fields)
        else:
            return Response('Invalid node id or node type')
