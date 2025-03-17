from rest_framework import serializers
from .models import Municipality, Property

class MunicipalitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipality
        fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    property_tax = serializers.SerializerMethodField()
    municipal = MunicipalitySerializer()
    class Meta:
        model = Property
        fields = ['id', 'assessment_roll_number', 'assessment_value', 'municipal', 'property_tax']

    def get_property_tax(self, obj):
        return obj.calculate_property_tax()