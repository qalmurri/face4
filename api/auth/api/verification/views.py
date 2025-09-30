from django.utils import timezone
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from utils.staff import send_staff_activation_email
from .models import StaffActivationRequest
from core2.models import Token

class StaffActivationConfirmView(APIView):
    def post(self, request, uid, token):
        try:
            uid_decoded = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(pk=uid_decoded)
        except Exception:
            return Response({"detail": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST)

        activation_request = StaffActivationRequest.objects.filter(
            user=user, uid=uid, token__token=token, is_active=True
        ).first()

        if not activation_request:
            return Response({"detail": "Invalid or expired request"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ expired_at tetap bisa dipakai
        if activation_request.meta.expired_at and activation_request.meta.expired_at < timezone.now():
            activation_request.deactivate()
            return Response({"detail": "Link expired"}, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, activation_request.token.token):
            user.is_staff = True
            user.save()
            activation_request.deactivate()
            return Response({"detail": "Staff mode activated"})
        
        activation_request.deactivate()
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
