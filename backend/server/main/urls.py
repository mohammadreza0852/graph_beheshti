from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api import GraphViewSet, NodeView, DatasetView, NodeImageView

router = DefaultRouter()
router.register(r'graph', GraphViewSet, basename='graph')
router.register(r'dataset', DatasetView, basename='dataset')

app_name = 'main'

urlpatterns = [
    path('node/', NodeView.as_view()),
    path('node_image/', NodeImageView.as_view()),
    path('', include(router.urls)),
]
