
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from identity.models import User, Role
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    re_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['is_superuser', 'role', 'id', 'created_at', 'updated_at', 'last_login', 'user_id', 'is_active', 'is_staff', 'date_joined', 'groups', 'username']
        

    def validate(self, attrs):
        if attrs['password'] != attrs['re_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            name=validated_data['name'],
            surname=validated_data['surname'],
            role = Role.objects.get(pk=1)
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user
    
        
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']



class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ['id', 'user_id', 'is_active', 'last_login', 'created_at', 'updated_at']
        

    
class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(LoginSerializer, self).validate(attrs)
        data.update({'email': self.user.email})
        data.update({'user_id': self.user.user_id})
        data.update({'name': self.user.name})
        data.update({'surname': self.user.surname})
        data.update({'role': self.user.role.role_name})
        return data
"""
class RefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super(RefreshSerializer, self).validate(attrs)
        user = self.context['request'].user
        data.update({'email': user.email})
        data.update({'user_id': user.user_id})
        data.update({'name': user.name})
        data.update({'surname': user.surname})
        data.update({'role': user.role.role_name})
        return data
        
"""