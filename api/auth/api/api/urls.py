from django.urls import path, include
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)

urlpatterns = [
    path('api/', include('u.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh token
]

"""
POST /api/token/
{
  "username": "qalmurri",
  "password": "password123"
}

RESPON
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOi..."
}

POST /api/token/refresh/
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
}

RESPON
{
    "access": "eyJh...."
}
"""