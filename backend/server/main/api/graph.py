from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response

from ..models.edges import Relation
from ..models.filters import CustomFilter, NodeCustomFilter
from ..utils import NodeUtils
from ..serializers import RelationSeializer

class GraphViewSet(viewsets.ModelViewSet):
    serializer_class = RelationSeializer

    def get_queryset(self):
        dataset_id = self.request.GET.get('dataset_id')
        filter_id = self.request.GET.get('filter_id')
        node_filter_id = self.request.GET.get('node_filter_id')
        filtered_dataset_relation = Relation.objects.all()
        if dataset_id:
            filtered_dataset_relation = Relation.objects.filter(dataset__id=dataset_id)
        if filter_id:
            filtered_dataset_relation = CustomFilter.filter_graph(filtered_dataset_relation, filter_id)
        if node_filter_id:
            filtered_dataset_relation = NodeCustomFilter.filter_graph(filtered_dataset_relation, node_filter_id)
        return filtered_dataset_relation
       


class NodeView(views.APIView):

    def get(self, request, format=None):
        node_type = request.GET.get('type')
        node_id = request.GET.get('id')

        if node_id and node_type:
            node = NodeUtils.get_node_by_type(node_id, node_type)
            return Response(node)
        else:
            return Response('Invalid node id or node type')
