from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api import GraphViewSet, NodeView, DatasetView, NodeImageView, CustomFilterView, NodeCustomFilterView, PropertyView

router = DefaultRouter()
router.register(r'graph', GraphViewSet, basename='graph')
router.register(r'dataset', DatasetView, basename='dataset')
router.register(r'filters', CustomFilterView, basename='filters')
router.register(r'node_filters', NodeCustomFilterView, basename='node_filters')

app_name = 'main'

urlpatterns = [
    path('node/', NodeView.as_view()),
    path('node_image/', NodeImageView.as_view()),
    path('property/', PropertyView.as_view()),
    path('', include(router.urls)),
]
