from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from identity.api.models import Role, User
from identity.api.serializers import RegisterSerializer, LoginSerializer, RoleSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import get_object_or_404





class LoginView(APIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny, )
    def post(self, request, format='json'):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        
        if valid:
            status_code = status.HTTP_200_OK
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'User logged in successfully',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticatedUser': {
                    'email': serializer.data['email'],
                    'role': serializer.data['role']
                }
            }

            return Response(response, status=status_code)

class RegisterViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
            
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class RoleViewSet(ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [AllowAny]