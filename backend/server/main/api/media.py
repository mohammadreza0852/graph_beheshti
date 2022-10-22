from rest_framework import views
from rest_framework.response import Response

from ..utils import NodeUtils


class NodeImageView(views.APIView):

    def get(self, request, format=None):
        node_type = request.GET.get('type')

        if node_type:
            try:
                node_image = NodeUtils.get_image_by_type(node_type, request)
                return Response(node_image)
            except:
                return Response('Node not found', status=404)
        else:
            return Response('Invalid node type', status=400)
