from rest_framework import serializers
from .models import Service, Dog, Visit


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "description", "price"]


class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = ["id", "name", "breed", "age", "photo"]


class VisitSerializer(serializers.ModelSerializer):
    services = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), many=True
    )

    class Meta:
        model = Visit
        fields = ["id", "date", "description", "services", "dog"]
