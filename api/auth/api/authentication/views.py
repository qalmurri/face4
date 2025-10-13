from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from .serializers import RegisterSerializer, MyTokenObtainPairSerializer

User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
        )


class LogoutView(APIView):
    def post (self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist() #menonaktifkan token
            return Response({"detail": "Logout Succesfull"}, status=205)
        
        except Exception as e:
            return Response({"detail": "Invalid token"}, status=400)
        

class LogoutAllView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        try:
            user = request.user

            #ambil semua outstanding token milik user
            tokens = OutstandingToken.objects.filter(user=user)

            #masukkan semuanya ke blacklist
            for token in tokens:
                try:
                    BlacklistedToken.object.get_or_create(token=token)
                except Exception:
                    pass
            return Response(
                {"detail": "Logged out from all devices."},
                status=status.HTTP_205_RESET_CONTENT,
            )
        except Exception as e:
            return Response(
                {"detail": "Error during logout all."},
                status=status.HTTP_400_BAD_REQUEST
            )