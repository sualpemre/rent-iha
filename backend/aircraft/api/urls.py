from django.urls import path, include
from rest_framework.routers import DefaultRouter
from aircraft.api.views import AircraftViewSet, PropertyViewSet

router = DefaultRouter()

router.register(r'aircraft', AircraftViewSet, basename='aircrafts')
router.register(r'property', PropertyViewSet, basename='properties')
router.register(r'property/(?P<id>\d+)', AircraftViewSet, basename='property_detail')
#router.register(r'aircraft/leased', RoleViewSet, basename='roles')
#router.register(r'aircraft/(?P<id>\d+)/properties', RoleViewSet, basename='roles')
#router.register(r'properties/leased', RoleViewSet, basename='roles')

urlpatterns = [
    path('', include(router.urls)),
]
