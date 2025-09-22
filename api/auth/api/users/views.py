from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from .serializers import RegisterSerializer, MyTokenObtainPairSerializer, ForgotPasswordSerializer, ResetPasswordSerializer

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

class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            identifier = serializer.validated_data["identifier"]

            user = User.objects.filter(username=identifier).first() or User.objects.filter(email=identifier).first()
            if not user:
                return Response({"detail": "User tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

            # Buat token dan uid
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            reset_link = f"http://localhost:5173/reset/{uid}/{token}/"

            send_mail(
                subject="Reset Password",
                message=f"Hi {user.username}, klik link berikut untuk reset password:\n{reset_link}",
                from_email="noreply@example.com",
                recipient_list=[user.email],
            )
            return Response({"detail": "Email reset password telah dikirim"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")
        new_password = request.data.get("new_password")

        if not uid or not token or not new_password:
            return Response({"detail": "Data tidak lengkap"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"detail": "User tidak valid"}, status=status.HTTP_400_BAD_REQUEST)

        # validasi token
        if not default_token_generator.check_token(user, token):
            return Response({"detail": "Token tidak valid atau sudah kadaluarsa"}, status=status.HTTP_400_BAD_REQUEST)

        # set password baru
        user.set_password(new_password)
        user.save()

        return Response({"detail": "Password berhasil diganti"}, status=status.HTTP_200_OK)