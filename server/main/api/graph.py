from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response

from ..models.edges import Relation
from ..utils import NodeUtils
from ..serializers import RelationSeializer

class GraphViewSet(viewsets.ModelViewSet):
    serializer_class = RelationSeializer
    queryset = Relation.objects.all()


class NodeView(views.APIView):

    def get(self, request, format=None):
        node_type = request.GET.get('type')
        node_id = request.GET.get('id')

        if node_id and node_type:
            node = NodeUtils.get_node_by_type(node_id, node_type)
            return Response(node)
        else:
            return Response('Invalid node id or node type')
