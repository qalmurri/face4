from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView, TokenVerifyView)
from .views import RegisterView, MyTokenObtainPairView, LogoutView, LogoutAllView


urlpatterns = [
    path("reg/", RegisterView.as_view(), name="register"),
    path("tok/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('logout/', LogoutView.as_view(), name='token_logout'),
    path("logout_all/", LogoutAllView.as_view(), name="logout_all"),
    path("tok/ref/", TokenRefreshView.as_view(), name="token_refresh"),
    path('tok/ver/', TokenVerifyView.as_view(), name='token_verify'),
    path('data/tok/ver/', TokenVerifyView.as_view(), name='token_verify')
]