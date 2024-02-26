from django.urls import path, include
from rest_framework.routers import DefaultRouter
from identity.api.views import UserViewSet, RoleViewSet, RegisterViewSet, LoginView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView
router = DefaultRouter()

router.register(r'user', UserViewSet, basename='users')
router.register(r'role', RoleViewSet, basename='roles')
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='token_refresh'),
]