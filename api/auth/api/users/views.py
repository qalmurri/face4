from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.utils import timezone

from rest_framework import status
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from .serializers import RegisterSerializer, MyTokenObtainPairSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, UserSerializer
from .models import PasswordResetRequest
from .utils import log_user_action, mask_email

from datetime import timedelta
    
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
        log_user_action(request, user, "REGISTER")
        return Response(
            {
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
        )
    
class ForgotPasswordCheckView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            identifier = serializer.validated_data["identifier"]

            user = User.objects.filter(username=identifier).first() or User.objects.filter(email=identifier).first()
            if not user:
                return Response({"detail": "User tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

            last_req = PasswordResetRequest.objects.filter(user=user).order_by("-created_at").first()

            return Response({
                "username": user.username,
                "email": mask_email(user.email),
                "last_reset": last_req.created_at if last_req else None
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        identifier = request.data.get("identifier")
        if not identifier:
            return Response({"detail": "Identifier diperlukan"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(username=identifier).first() or User.objects.filter(email=identifier).first()
        if not user:
            return Response({"detail": "User tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        PasswordResetRequest.objects.create(
            user=user,
            uid=uid,
            token=token,
            expired_at=timezone.now() + timedelta(hours=0.1) #ini waktu expirednya resel link
        )

        reset_link = f"http://localhost:5173/reset/{uid}/{token}/"

        send_mail(
            subject="Reset Password",
            message=f"Hi {user.username}, klik link berikut untuk reset password:\n{reset_link}",
            from_email="noreply@example.com",
            recipient_list=[user.email],
        )
        log_user_action(request, user, "FORGOT_PASSWORD")
        return Response({"detail": "Email reset password telah dikirim", "email": mask_email(user.email)})
    
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

        # cek database reset request
        reset_request = PasswordResetRequest.objects.filter(user=user, uid=uid, token=token, is_active=True).first()
        if not reset_request:
            return Response({"detail": "Link reset tidak valid atau sudah dipakai"}, status=status.HTTP_400_BAD_REQUEST)

        # cek expired
        if reset_request.expired_at and reset_request.expired_at < timezone.now():
            reset_request.deactivate()
            return Response({"detail": "Link reset sudah kadaluarsa"}, status=status.HTTP_400_BAD_REQUEST)

        # validasi token Django (opsional double check)
        if not default_token_generator.check_token(user, token):
            reset_request.deactivate()
            return Response({"detail": "Token tidak valid"}, status=status.HTTP_400_BAD_REQUEST)

        # set password baru
        user.set_password(new_password)
        user.save()

        # matikan token agar tidak bisa dipakai lagi
        reset_request.deactivate()
        log_user_action(request, user, "RESET_PASSWORD")
        return Response({"detail": "Password berhasil diganti"}, status=status.HTTP_200_OK)

class CheckResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, token):
        reset_request = PasswordResetRequest.objects.filter(
            uid=uid, token=token, is_active=True
        ).first()

        if not reset_request:
            return Response({"valid": False}, status=status.HTTP_404_NOT_FOUND)

        # cek expired
        if reset_request.expired_at and reset_request.expired_at < timezone.now():
            reset_request.deactivate()
            return Response({"valid": False, "detail": "Link expired"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"valid": True}, status=status.HTTP_200_OK)
    
class UserMeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user