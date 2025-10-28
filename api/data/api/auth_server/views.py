from rest_framework.views import APIView
from rest_framework.response import Response

class DataInfoView(APIView):
    def get(self, request):
        return Response({
            "status": "success",
            "message": "Token valid, kamu berhasil mengakses data!",
        })
