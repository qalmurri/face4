from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.utils.user_identifier import detect_identifier_type
from core.verification.services import VerificationService


class SendCodeView(APIView):
    def post(self, request):
        identifier = request.data.get("identifier")

        if not identifier:
            return Response(
                {
                    "error": "Email or phone is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        lookup_field = detect_identifier_type(identifier)
        result = VerificationService.check(identifier, lookup_field)

        if not result.get("exists", False):
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        return Response(
            {
                "user_found": "User found"
            },
            status=status.HTTP_200_OK
        )