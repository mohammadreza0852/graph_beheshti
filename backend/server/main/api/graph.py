from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response
from django.db.models import Q

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
        node_type = self.request.GET.get('type')
        filtered_dataset_relation = Relation.objects.all()
        if dataset_id:
            filtered_dataset_relation = Relation.objects.filter(dataset__id=dataset_id)
        if filter_id:
            filtered_dataset_relation = CustomFilter.filter_graph(filtered_dataset_relation, filter_id)
        if node_filter_id:
            filtered_dataset_relation = NodeCustomFilter.filter_graph(filtered_dataset_relation, node_filter_id)
        if node_type:
            filter_dict_prop = {}
            for key, val in self.request.GET.items():
                if key not in ('dataset_id', 'filter_id', 'node_filter_id', 'type'):
                    filter_dict_prop[key] = val
            filtered_nodes = NodeUtils.get_node_by_property_and_type(node_type, filter_dict_prop)
            node_filter = Q(first_node_type=node_type, first_node_id__in=filtered_nodes) \
                | Q(second_node_type=node_type, second_node_id__in=filtered_nodes)
            filtered_dataset_relation =filtered_dataset_relation.filter(node_filter)
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


class ExpandView(views.APIView):

    def get(self, request, format=None):
        node_type = request.GET.get('type')
        node_id = request.GET.get('id')
        dataset_id = request.GET.get('dataset_id')

        if node_id and node_type:
            node_filter = Q(first_node_type=node_type, first_node_id=node_id) \
                | Q(second_node_type=node_type, second_node_id=node_id)
            new_relations = Relation.objects.filter(node_filter).exclude(dataset__id=dataset_id)
            return Response(RelationSeializer(new_relations, many=True).data)
        else:
            return Response('Invalid node id or node type')
