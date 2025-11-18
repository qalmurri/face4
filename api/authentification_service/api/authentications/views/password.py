from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.permission import DenyAuthenticated
from core.throttles import LoginThrottle
from core.verification.services import VerificationService
from core.repositories.user import UserRepository
from core.repositories.verification import VerificationRepository
User = get_user_model()

class ForgotPasswordView(APIView):
    throttle_classes = [
        LoginThrottle
    ]
    authentication_classes = []
    permission_classes = [
        DenyAuthenticated
    ]

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
        destination = VerificationService.send_reset_password_code(user)
        print(destination)
        return Response(
            {
                "message": f"Verification code sent to {destination}"
            },
            status=status.HTTP_200_OK
        )

class ResetPasswordView(APIView):
    throttle_classes = [LoginThrottle]
    authentication_classes = []
    permission_classes = [DenyAuthenticated]

    def post(self, request):
        identifier = request.data.get("identifier")  # bisa email atau phone
        code = request.data.get("code")
        new_password = request.data.get("new_password")

        if not all([identifier, code, new_password]):
            return Response(
                {"error": "Missing fields"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = UserRepository.get_by_identifier(identifier)
        if not user:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        verif = VerificationRepository.get_latest_reset_password_code(user, code)
        if not verif:        
            return Response(
                {"error": "Invalid code"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not verif.is_valid():
            raise ValidationError(
                "Code expired or already used"
            )
        
        verif.is_used = True
        verif.save()
        user.set_password(new_password)
        user.save()
        
        return Response({"message": "Password successfully reset"}, status=status.HTTP_200_OK)
    

class ChangePasswordView(APIView):
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