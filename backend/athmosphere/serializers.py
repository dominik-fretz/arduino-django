from rest_framework import serializers
from .models import SensorValue


class SensorValueSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(required=False)

    class Meta:
        model = SensorValue
        fields = ("id", "timestamp", "sensor_type", "value")
