from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.utils.user_identifier import detect_identifier_type
from core.verification.services import VerificationService

class SendCodeView(APIView):
    def post(self, request):
        identifier = request.data.get("identifier")
        if not identifier:
            return Response({"error": "Email or phone is required"}, status=status.HTTP_400_BAD_REQUEST)
        lookup_field = detect_identifier_type(identifier)
        result = VerificationService.check(identifier, lookup_field)
        if not result["success"]:
            if result["error"] == "auth_unreachable":
                return Response({"error": "Auth server tidak dapat dihubungi"}, 503)
            if result["error"] == "auth_error":
                return Response({"error": "Auth server error"},result.get("status", 503))
            if result["error"] == "invalid_json":
                return Response({"error": "Invalid response"}, 500)
            return Response({"error": "Unknown error"}, 500)
        user_result = result["data"]
        if not user_result.get("exists"):
            return Response({"error": "User not found"}, 404)
        public_id = str(user_result["public_id"])
        VerificationService.send_reset_password_code(identifier, lookup_field, public_id)
        return Response({"success": True, "message": f"sudah kirim verifikasi"}, 200)