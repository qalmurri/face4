from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class DataInfoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "status": "success",
            "message": "Token valid, kamu berhasil mengakses data!",
        })
