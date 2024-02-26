
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from aircraft.api.models import Aircraft, Property
from aircraft.api.serializers import AircraftSerializer, PropertySerializer
from django.db.models import Q

class AircraftViewSet(ModelViewSet):
    queryset = Aircraft.objects.all().order_by('id')
    serializer_class = AircraftSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        value = self.request.GET.get('value')
        if value is not None:
            queryset = queryset.filter(Q(aircraft_name__icontains=value) | Q(aircraft_description__icontains=value))
        return queryset
    

      
    
class PropertyViewSet(ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [AllowAny]
    
    