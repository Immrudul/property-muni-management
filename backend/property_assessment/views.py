from rest_framework import viewsets
from .models import Municipality, Property
from .serializers import MunicipalitySerializer, PropertySerializer

class MunicipalityViewSet(viewsets.ModelViewSet):
    queryset = Municipality.objects.all()
    serializer_class = MunicipalitySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer