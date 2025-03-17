from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Municipality, Property

@admin.register(Municipality)
class MunicipalityAdmin(ImportExportModelAdmin):
    list_display = ('municipal_id', 'municipal_name', 'municipal_rate', 'education_rate')

@admin.register(Property)
class PropertyAdmin(ImportExportModelAdmin):
    list_display = ('assessment_roll_number', 'assessment_value', 'municipal')