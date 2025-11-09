import random
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

from authentications.models import VerificationCode
from core.services.communication import send_email_verification

User = get_user_model()


def generate_code():
    """Generate 6-digit numeric OTP."""
    return str(random.randint(100000, 999999))


class RequestEmailVerificationView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response({"error": "Email is required."}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)

        # Generate OTP
        code = generate_code()
        VerificationCode.create_code(user, code, purpose=1, ttl_minutes=10)

        # Kirim ke email
        send_email_verification(user.email, code)

        return Response(
            {"message": "Verification code sent to email."},
            status=status.HTTP_200_OK
        )


class ConfirmEmailVerificationView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        code = request.data.get("code")

        if not email or not code:
            return Response({"error": "Email and code are required."}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)

        verif = (
            VerificationCode.objects
            .filter(user=user, code=code, purpose=1)
            .order_by("-created_at")
            .first()
        )

        if not verif or not verif.is_valid():
            return Response({"error": "Invalid or expired code."}, status=400)

        # Tandai kode sudah digunakan
        verif.is_used = True
        verif.save()

        # Tandai user email sudah diverifikasi
        user.is_active = True #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        user.save()

        return Response(
            {"message": "Email verified successfully."},
            status=status.HTTP_200_OK
        )
