from django.db import models

class Municipality(models.Model):
    municipal_id = models.AutoField(primary_key=True)
    municipal_name = models.CharField(max_length=255)
    municipal_rate = models.DecimalField(max_digits=9, decimal_places=8)
    education_rate = models.DecimalField(max_digits=9, decimal_places=8)

    def __str__(self):
        return self.municipal_name

class Property(models.Model):
    id = models.AutoField(primary_key=True)  # New AutoField ID
    assessment_roll_number = models.CharField(max_length=50, unique=True)  # Remove primary_key
    assessment_value = models.IntegerField()
    municipal = models.ForeignKey(Municipality, on_delete=models.CASCADE)

    def calculate_property_tax(self):
        return self.assessment_value * (self.municipal.municipal_rate + self.municipal.education_rate)

    def __str__(self):
        return f"{self.assessment_roll_number} - {self.municipal.municipal_name}"
