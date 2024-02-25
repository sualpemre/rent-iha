from django.urls import path, include
from rest_framework.routers import DefaultRouter
from identity.api.views import UserViewSet, RoleViewSet, RegisterViewSet


router = DefaultRouter()

router.register(r'user', UserViewSet, basename='users')
router.register(r'role', RoleViewSet, basename='roles')
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
]
