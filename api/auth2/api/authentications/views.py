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
from .serializers import RegisterSerializer, LoginSerializer

User = get_user_model()


@method_decorator(never_cache, name="dispatch") # mencegah browser atau proxy menyimpan response API (aman untuk endpoint sensitif seperti register/login).
class RegisterView(APIView):
    throttle_classes = [RegisterThrottle] # Membatasi frekuensi request (anti spam / brute force).
    authentication_classes = [] # Menonaktifkan autentikasi global untuk endpoint ini — cocok karena register tidak butuh token.
    permission_classes = [DenyAuthenticated]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            handle_register(serializer.validated_data, serializer.context)
            return Response(
                {"message": "Register success. Please verify your account"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@method_decorator(never_cache, name="dispatch")
class LoginView(APIView):
    throttle_classes = [LoginThrottle]
    authentication_classes = []
    permission_classes = [DenyAuthenticated]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = handle_login(serializer.validated_data, request)
        user = data["user"]
        tokens = data["tokens"]

        return Response({
            "message": "Login successful.",
            "access": tokens["access"],
            "refresh": tokens["refresh"],
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        }, status=status.HTTP_200_OK)
    

class TokenRefreshView(APIView):
    """
    Endpoint untuk memperbarui access token.
    """
    authentication_classes = []  # tidak butuh auth karena kita hanya pakai refresh token
    permission_classes = []

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response({"detail": "Refresh token wajib dikirim."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tokens = refresh_access_token(refresh_token)
            return Response(tokens, status=status.HTTP_200_OK)
        except InvalidToken:
            return Response({"detail": "Refresh token tidak valid."}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    """
    Logout endpoint: blacklist refresh token dan log aktivitas user.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()  # tambahkan token ke daftar hitam


            return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)

        except TokenError:
            return Response({"detail": "Invalid or expired refresh token."}, status=status.HTTP_400_BAD_REQUEST)
        

class CheckTokenView(APIView):
    """
    Memverifikasi apakah access token masih valid (belum expired / belum di-blacklist).
    Tidak query database, hanya decode JWT.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "valid": True,
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
            }
        }, status=status.HTTP_200_OK)


class CheckTokenRawView(APIView):
    """
    Alternatif: verifikasi token manual tanpa IsAuthenticated,
    cocok untuk microservice lain yang hanya kirim token di body.
    """
    authentication_classes = []  # Nonaktifkan auth global
    permission_classes = []      # Public access (token diverifikasi manual)

    def post(self, request):
        token = request.data.get("token")

        if not token:
            return Response({"detail": "Token is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            access = AccessToken(token)
            return Response({
                "valid": True,
                "user_id": access["user_id"],
                "exp": access["exp"]
            }, status=status.HTTP_200_OK)

        except (TokenError, InvalidToken):
            return Response({"valid": False, "detail": "Invalid or expired token."},
                            status=status.HTTP_401_UNAUTHORIZED)