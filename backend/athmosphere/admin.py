from django.contrib import admin
from .models import SensorValue

# Register your models here.
class SensorValueAdmin(admin.ModelAdmin):
    list_display = ("timestamp", "sensor_type", "value")


admin.site.register(SensorValue, SensorValueAdmin)