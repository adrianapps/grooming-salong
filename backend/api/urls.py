from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import DogVisits, ServiceViewSet, DogViewSet, VisitViewSet

router = DefaultRouter()
router.register(r"services", ServiceViewSet, basename="service")
router.register(r"dogs", DogViewSet, basename="dog")
router.register(r"visits", VisitViewSet, basename="visit")

urlpatterns = router.urls

urlpatterns += [
    path("dogs/<int:pk>/visits", DogVisits.as_view(), name="dog-visits"),
]
