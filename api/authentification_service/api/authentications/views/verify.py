from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

from authentications.models import VerificationCode
from core.communications.verification import send_email_verification
from core.uuid.generate import generate_uuid4_6int
from core.verification.services import VerificationService
from core.repositories.user import UserRepository
from core.permission import DenyAuthenticated

User = get_user_model()


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
        code = generate_uuid4_6int()
        VerificationService.create_code(user, code, "verify_email", ttl_minutes=10)

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
            .filter(user=user, code=code, purpose__code="verify_email")
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


class CheckPublicIDView(generics.GenericAPIView):
    authentication_classes = []
    permission_classes = [DenyAuthenticated]


    def post(self, request):
        identifier = request.data.get("identifier")
        if not identifier:
            return Response(
                {"error": "Email or phone is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        user = UserRepository.get_by_identifier(identifier)
        if not user:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {
                "message": "ada"
            },
            status=status.HTTP_200_OK
        )
    

class GetUserByIdentifierView(generics.GenericAPIView):
    authentication_classes = []
    permission_classes = [DenyAuthenticated]

    def post(self, request):
        identifier = request.data.get("identifier")
        lookup_field = request.data.get("lookup_field")

        if not identifier or not lookup_field:
            return Response(
                {"error": "identifier and lookup_field required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(**{lookup_field: identifier})
        except User.DoesNotExist:
            user = None

        if not user:
            return Response(
                {"exists": False},
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "exists": True,
            },
            status=status.HTTP_200_OK
        )