from django.db import models

# Create your models here.

from core.api.models import BaseModel
from django.contrib.auth.models import AbstractBaseUser, UserManager
import uuid

        
class Role(BaseModel):
    role_name = models.CharField(max_length=254, null=False)
    role_description = models.CharField(null=False)
    
    class Meta:
        db_table = 'user_roles'
        
    def __str__(self):
        return self.name


class User(AbstractBaseUser):
    user_id = models.UUIDField(unique=True, null=False, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=254, unique=True, null=False)
    name = models.CharField(max_length=255, null=False, default="")
    surname = models.CharField(max_length=255, null=False, default="")
    password = models.CharField(max_length=255, null=False)
    role = models.ForeignKey(Role, related_name="users", on_delete=models.CASCADE, null=False)
    last_login = models.DateTimeField(null=True)
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    updated_at = models.DateTimeField(auto_now=True, null=False)
    is_active = models.BooleanField(default=True, null=False)
    USERNAME_FIELD = "email"
    objects = UserManager()
    def __str__(self):
        return f'{self.name} {self.surname}'

