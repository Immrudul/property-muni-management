from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MunicipalityViewSet, PropertyViewSet

router = DefaultRouter()
router.register(r'municipalities', MunicipalityViewSet)
router.register(r'properties', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]