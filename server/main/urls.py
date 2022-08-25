from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api import GraphViewSet

router = DefaultRouter()
router.register(r'graph', GraphViewSet, basename='graph')

app_name = 'main'

urlpatterns = [
    path('', include(router.urls)),
]
