from django.db import models
from core.api.models import BaseModel
from identity.models import User

    
class PropertyRule(BaseModel):
    rule_name = models.CharField(max_length=254, null=False)
    rule_description = models.CharField(max_length=500, blank=True)
    class Meta:
        db_table = 'properties_rules'
        
class Property(BaseModel):
    property_rule = models.ForeignKey(PropertyRule, related_name="properties", on_delete=models.CASCADE, null=False)
    property_value = models.CharField(max_length=254, null=False)
    property_description = models.CharField(max_length=254, blank=True)

    class Meta:
        db_table = 'properties'

class Aircraft(BaseModel):
    aircraft_name = models.CharField(max_length=254, null=False)
    aircraft_description = models.CharField(max_length=1000, blank=True)
    properties = models.ManyToManyField(Property, related_name="aircrafts", blank=True)
    stock_count = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'aircrafts'
        
    def __str__(self):
        return self.name
    
class LeasedAircraft(BaseModel):
    aircraft = models.ForeignKey(Aircraft, related_name="lease", on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(User, related_name="leased", on_delete=models.CASCADE, null=False)
    lease_start = models.DateTimeField()
    lease_end = models.DateTimeField()
    lease_price = models.FloatField()
    
    class Meta:
        db_table = 'leased_aircrafts'
    

