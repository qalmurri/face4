from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import AccessToken, TokenError
from core.security.tokens import refresh_access_token


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