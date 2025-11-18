from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from otp.models import VerificationCode
from otp.serializers.send_code_serializer import SendCodeSerializer
from core.uuid.generate import generate_code
from core.time.timestamps import current_timestamp

class SendCodeView(APIView):

    def post(self, request):
        serializer = SendCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_public_id = serializer.validated_data['user_public_id']
        purpose = serializer.validated_data['purpose']

        code = generate_code()
        expires_at = current_timestamp() + 300  # 5 menit

        VerificationCode.objects.create(
            user_public_id=user_public_id,
            code=code,
            purpose=purpose,
            expires_at=expires_at
        )

        # nanti bisa ganti Celery / Email
        print(f"Send code: {code}")

        return Response({
            "message": "Verification code sent.",
            "expires_in": 300
        })
