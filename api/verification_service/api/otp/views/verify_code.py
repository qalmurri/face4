from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from otp.models import VerificationCode
from otp.serializers.verify_code_serializer import VerifyCodeSerializer
from core.time.timestamps import current_timestamp
from core.time.validate import is_expired

class VerifyCodeView(APIView):

    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_public_id = serializer.validated_data['user_public_id']
        code = serializer.validated_data['code']
        purpose = serializer.validated_data['purpose']

        try:
            record = VerificationCode.objects.filter(
                user_public_id=user_public_id,
                purpose=purpose,
                code=code,
                is_used=False,
            ).latest('created_at')
        except VerificationCode.DoesNotExist:
            return Response({"detail": "Invalid code."}, status=400)

        if is_expired(record.expires_at, current_timestamp()):
            return Response({"detail": "Code expired."}, status=400)

        record.use()

        return Response({"message": "Verification successful."})
