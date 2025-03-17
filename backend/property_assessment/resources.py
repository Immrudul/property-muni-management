from import_export import resources, fields
from import_export.widgets import DecimalWidget, ForeignKeyWidget, IntegerWidget
from .models import Municipality, Property

class MunicipalityResource(resources.ModelResource):
    municipal_id = fields.Field(attribute='municipal_id', column_name='munid')
    municipal_name = fields.Field(attribute='municipal_name', column_name='name_municipal_w_type') 
    municipal_rate = fields.Field(attribute='municipal_rate', column_name='municipal_rate', widget=DecimalWidget())
    education_rate = fields.Field(attribute='education_rate', column_name='education_rate', widget=DecimalWidget())

    class Meta:
        model = Municipality
        fields = ('municipal_id', 'municipal_name', 'municipal_rate', 'education_rate')
        import_id_fields = ('municipal_id',)  

class PropertyResource(resources.ModelResource):
    assessment_roll_number = fields.Field(attribute='assessment_roll_number', column_name='assessment_roll_number')
    assessment_value = fields.Field(attribute='assessment_value', column_name='assessment_value', widget=IntegerWidget())
    municipal = fields.Field(attribute='municipal', column_name='municipal_id', widget=ForeignKeyWidget(Municipality, 'municipal_id'))

    class Meta:
        model = Property
        fields = ('assessment_roll_number', 'assessment_value', 'municipal')
        import_id_fields = ('assessment_roll_number',)

    def before_import_row(self, row, **kwargs):
        """Ensure municipal_id exists; create Municipality if missing."""
        row['municipal_id'] = str(row['municipal_id']).strip()

        if '.' in row['municipal_id']: 
            row['municipal_id'] = row['municipal_id'].split('.')[0]

        try:
            row['municipal_id'] = int(row['municipal_id'])
        except ValueError:
            raise ValueError(f"Invalid municipal_id: {row['municipal_id']}")

        municipality, created = Municipality.objects.get_or_create(
            municipal_id=row['municipal_id'],
            defaults={"municipal_name": f"Unknown {row['municipal_id']}", "municipal_rate": 0, "education_rate": 0}
        )

        if created:
            print(f"Created new Municipality: {municipality.municipal_name} (ID: {municipality.municipal_id})")
