from django.db import models
from core.api.models import BaseModel
from django.contrib.auth.base_user import AbstractBaseUser
import uuid

        
class Role(BaseModel):
    role_name = models.CharField(max_length=254, null=False)
    role_description = models.CharField(null=False)
    
    class Meta:
        db_table = 'user_roles'
        
    def __str__(self):
        return self.name


class User(AbstractBaseUser, BaseModel):
    user_id = models.UUIDField(unique=True, null=False, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=254, unique=True, null=False)
    name = models.CharField(max_length=255, null=False)
    surname = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    role = models.ForeignKey(Role, related_name="users", on_delete=models.CASCADE, null=False)
    last_login = models.DateTimeField(null=True)
    
    USERNAME_FIELD = 'email'
    
    class Meta:
        db_table = 'users'
        
    def __str__(self):
        return f'{self.Name} {self.Surname}'
