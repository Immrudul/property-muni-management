from rest_framework import serializers
from .models import Municipality, Property

class MunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipality
        fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    property_tax = serializers.SerializerMethodField()
    
    # This will return the full Municipality object in GET responses
    municipal = MunicipalitySerializer(read_only=True)
    
    # This allows sending `municipal_id` for updates
    municipal_id = serializers.PrimaryKeyRelatedField(
        queryset=Municipality.objects.all(),
        source='municipal',  # Maps to the `municipal` ForeignKey
        write_only=True  # Used only for updates
    )

    class Meta:
        model = Property
        fields = ['id', 'assessment_roll_number', 'assessment_value', 'municipal', 'municipal_id', 'property_tax']

    def get_property_tax(self, obj):
        return obj.calculate_property_tax()