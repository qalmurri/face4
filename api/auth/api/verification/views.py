from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from verification.models import StaffActivationRequest
from utils.staff import send_staff_activation_email


class StaffActivationConfirmView(APIView):
    def post(self, request, uid, token):
        try:
            uid_decoded = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=uid_decoded)
        except Exception:
            return Response({"detail": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            activation_request = StaffActivationRequest.objects.get(user=user, uid=uid, token=token)
        except StaffActivationRequest.DoesNotExist:
            return Response({"detail": "Invalid or expired request"}, status=status.HTTP_400_BAD_REQUEST)

        if activation_request.is_expired():
            return Response({"detail": "Link expired"}, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, token):
            user.is_staff = True
            user.save()
            activation_request.delete()
            return Response({"detail": "Staff mode activated"})
        return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

class StaffActivationRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # harus login

    def post(self, request):
        user = request.user
        if not user.email:
            return Response({"detail": "Email tidak tersedia"}, status=status.HTTP_400_BAD_REQUEST)

        link = send_staff_activation_email(user)

        return Response({
            "detail": "Email aktivasi staff telah dikirim",
            "email": user.email,
            "debug_link": link  # opsional, untuk debug (hapus di production)
        })
