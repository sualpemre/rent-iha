
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from identity.api.models import User, Role

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
        read_only_fields = ['role', 'id', 'created_at', 'updated_at', 'last_login', 'user_id', 'is_active']
        

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
    
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)

    def create(self, validated_date):
        pass

    def update(self, instance, validated_data):
        pass

    def validate(self, data):
        email = data['email']
        password = data['password']
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)

            update_last_login(None, user)

            validation = {
                'access': access_token,
                'refresh': refresh_token,
                'email': user.email,
                'role': user.role,
            }

            return validation
        except AuthUser.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")
        
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
    
    