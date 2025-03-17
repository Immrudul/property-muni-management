from import_export import resources, fields
from import_export.widgets import DecimalWidget
from .models import Municipality

class MunicipalityResource(resources.ModelResource):
    municipal_id = fields.Field(attribute='municipal_id', column_name='munid')
    municipal_name = fields.Field(attribute='municipal_name', column_name='name_municipal_w_type') 
    municipal_rate = fields.Field(attribute='municipal_rate', column_name='municipal_rate', widget=DecimalWidget())
    education_rate = fields.Field(attribute='education_rate', column_name='education_rate', widget=DecimalWidget())

    class Meta:
        model = Municipality
        fields = ('municipal_id', 'municipal_name', 'municipal_rate', 'education_rate')
        import_id_fields = ('municipal_id',)  
