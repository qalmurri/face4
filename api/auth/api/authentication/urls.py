from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView, TokenVerifyView)
from .views import RegisterView, MyTokenObtainPairView, LogoutView, LogoutAllView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('logout/', LogoutView.as_view(), name='token_logout'),
    path("logout_all/", LogoutAllView.as_view(), name="logout_all"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify')
]