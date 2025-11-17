from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.communications.verification import send_email_verification, send_phone_verification
from authentications.models import VerificationCode
from core.permission import DenyAuthenticated
from core.throttles import LoginThrottle
from core.uuid.generate import generate_uuid4_6int
from core.verification.services import VerificationService

User = get_user_model()


class ForgotPasswordView(APIView):
    """
    Step 1: Kirim kode verifikasi (OTP) ke email ATAU phone user.
    """
    throttle_classes = [LoginThrottle]
    authentication_classes = []
    permission_classes = [DenyAuthenticated]

    def post(self, request):
        identifier = request.data.get("identifier")  # bisa email / phone
        if not identifier:
            return Response({"error": "Email or phone is required"}, status=status.HTTP_400_BAD_REQUEST)
        # Deteksi apakah email atau phone
        if "@" in identifier:
            lookup_field = "email"
        else:
            lookup_field = "phone"
        try:
            user = User.objects.get(**{lookup_field: identifier})
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        # Generate kode OTP
        code = generate_uuid4_6int()
        # Kirim via email atau SMS
        if lookup_field == "email":
            send_email_verification(user.email, code)
            destination = "email"
        else:
            send_phone_verification(user.phone, code)
            destination = "phone"
        # Simpan kode verifikasi ke database
        VerificationService.create_code(user, code, "reset_password")
        return Response(
            {
                "message": f"Verification code sent to {destination}"
            },
            status=status.HTTP_200_OK
        )


class ResetPasswordView(APIView):
    """
    Step 2: Verifikasi kode (OTP) dan setel ulang password.
    Dukung email ATAU phone.
    """
    throttle_classes = [LoginThrottle]
    authentication_classes = []
    permission_classes = [DenyAuthenticated]

    def post(self, request):
        identifier = request.data.get("identifier")  # bisa email atau phone
        code = request.data.get("code")
        new_password = request.data.get("new_password")

        if not all([identifier, code, new_password]):
            return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

        # Deteksi apakah email atau phone
        lookup_field = "email" if "@" in identifier else "phone"

        try:
            user = User.objects.get(**{lookup_field: identifier})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Cari kode verifikasi yang cocok
        try:
            verif = VerificationCode.objects.filter(user=user, code=code, purpose__code="reset_password").latest("created_at")
        except VerificationCode.DoesNotExist:
            return Response({"error": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)

        # Cek validitas kode (expired / sudah dipakai)
        if not verif.is_valid():
            raise ValidationError("Code expired or already used")

        # Tandai kode sudah dipakai
        verif.is_used = True
        verif.save()

        # Ubah password user
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password successfully reset"}, status=status.HTTP_200_OK)
    

class ChangePasswordView(APIView):
    """
    Step 3: Ubah password saat login.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        if not all([old_password, new_password]):
            return Response({"error": "Both old and new password required"}, status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        if not user.check_password(old_password):
            return Response({"error": "Old password incorrect"}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)