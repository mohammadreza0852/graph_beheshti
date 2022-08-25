from rest_framework import viewsets

from ..models.edges import Relation

from ..serializers import RelationSeializer

class GraphViewSet(viewsets.ModelViewSet):
    serializer_class = RelationSeializer
    queryset = Relation.objects.all()
