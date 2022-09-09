from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api import GraphViewSet, NodeView

router = DefaultRouter()
router.register(r'graph', GraphViewSet, basename='graph')

app_name = 'main'

urlpatterns = [
    path('node/', NodeView.as_view()),
    path('', include(router.urls)),
]
