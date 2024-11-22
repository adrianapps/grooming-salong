from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny
from .models import Service, Dog, Visit
from .serializers import ServiceSerializer, DogSerializer, VisitSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class DogViewSet(viewsets.ModelViewSet):
    queryset = Dog.objects.all()
    serializer_class = DogSerializer
    permission_classes = [AllowAny]


class VisitViewSet(viewsets.ModelViewSet):
    serializer_class = VisitSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        if self.action == "list":
            return Visit.objects.prefetch_related("services").select_related("dog")
        elif self.action == "retrieve":
            return Visit.objects.select_related("dog")
        return Visit.objects.all()
