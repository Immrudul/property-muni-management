from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Municipality, Property
from .resources import MunicipalityResource, PropertyResource

@admin.register(Municipality)
class MunicipalityAdmin(ImportExportModelAdmin):
    resource_class = MunicipalityResource 
    list_display = ('municipal_id', 'municipal_name', 'municipal_rate', 'education_rate')  # Admin display fields

@admin.register(Property)
class PropertyAdmin(ImportExportModelAdmin):
    resource_class = PropertyResource
    list_display = ('assessment_roll_number', 'assessment_value', 'municipal')