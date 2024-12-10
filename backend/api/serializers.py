from django.conf import settings
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

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if representation.get('photo'):
            representation['photo'] = settings.SITE_URL + instance.photo.url

        return representation


class VisitSerializer(serializers.ModelSerializer):
    services = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Service.objects.all()
    )

    class Meta:
        model = Visit
        fields = ["id", "date", "description", "services", "dog"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        representation["dog"] = DogSerializer(instance.dog).data
        representation["services"] = ServiceSerializer(
            instance.services, many=True
        ).data

        return representation
