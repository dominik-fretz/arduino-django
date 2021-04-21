from django.utils import timezone
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import SensorValueSerializer
from .models import SensorValue


class SensorValueView(viewsets.ModelViewSet):
    serializer_class = SensorValueSerializer
    queryset = SensorValue.objects.all()

    def get_values(self, sensor_type):

        queryset = SensorValue.objects.all().filter(sensor_type=sensor_type)
        # page = self.paginate_queryset(queryset)

        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(
            timestamp=timezone.now(),
            sensor_type=self.request.data["sensor_type"],
            value=self.request.data["value"],
        )

    @action(
        methods=["get"],
        detail=False,
        url_path="temperature",
    )
    def get_temperature_sensor_values(self, request):
        return self.get_values("TMP")

    @action(
        methods=["get"],
        detail=False,
        url_path="humidity",
    )
    def get_humidity_sensor_values(self, request):
        return self.get_values("HUM")