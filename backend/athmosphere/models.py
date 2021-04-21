from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class SensorValue(models.Model):
    timestamp = models.DateTimeField()

    class SensorType(models.TextChoices):
        TEMPERATURE = "TMP", _("Temperature")
        HUMIDITY = "HUM", _("Humidity")

    sensor_type = models.CharField(
        max_length=3,
        choices=SensorType.choices,
        default=SensorType.TEMPERATURE,
    )

    value = models.FloatField()

    def _str_(self):
        if this.sensor_type == SensorType.TEMPERATURE:
            data_type = "°C"
        else:
            data_type = "%% rH"

        value = "{value:.2f}{data_type}".format(value=this.value, data_type=data_type)
        return "{date}: {type} - {value}".format(
            date=this.timestamp, type=this.sensor_type, value=value
        )
