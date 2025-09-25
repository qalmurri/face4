from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.views import APIView
from utils.reset import generate_reset_token, send_reset_email
from utils.mask_email import mask_email
from .serializers import ForgotPasswordSerializer
from .models import PasswordResetRequest

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

        uid, token = generate_reset_token(user)
        reset_link = send_reset_email(user, uid, token)

        return Response({
            "detail": "Email reset password telah dikirim",
            "email": mask_email(user.email),
            "reset_link_debug": reset_link  # bisa dihapus di production
        })
    

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