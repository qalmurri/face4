from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model
from django.views.decorators.cache import never_cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken, TokenError
from core.throttles import RegisterThrottle, LoginThrottle
from core.permission import DenyAuthenticated
from core.services.handle import handle_register, handle_login
from core.services.refresh_token import refresh_access_token
from authentications.serializers import RegisterSerializer, LoginSerializer

User = get_user_model()