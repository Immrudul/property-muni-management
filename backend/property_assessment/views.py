from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Municipality, Property
from .serializers import MunicipalitySerializer, PropertySerializer

class MunicipalityViewSet(viewsets.ModelViewSet):
    queryset = Municipality.objects.all()
    serializer_class = MunicipalitySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['municipal']  # Allow filtering by municipal ID
    lookup_field = 'id'  # Use `id` instead of `assessment_roll_number`

    def partial_update(self, request, *args, **kwargs):
        """Handles PATCH requests and ensures municipal is updated properly."""
        instance = self.get_object()

        # Check if "municipal" is included in request data
        municipal_id = request.data.get("municipal")
        if municipal_id:
            try:
                new_municipality = Municipality.objects.get(pk=municipal_id)
                instance.municipal = new_municipality  # Assign new municipality
                instance.save()  # Save instance to apply change
            except Municipality.DoesNotExist:
                return Response(
                    {"error": "Invalid municipality ID"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Proceed with the regular update process
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
