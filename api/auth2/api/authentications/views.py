from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from core.throttles import RegisterThrottle
from core.permission import DenyAuthenticated
from .serializers import RegisterSerializer

class RegisterView(APIView):
    #permission_classes = [DenyAuthenticated]
    #throttle_classes = [RegisterThrottle]

    def post(self, request):
         serializer = RegisterSerializer(data=request.data)
         if serializer.is_valid():
             serializer.save()
             return Response({"message": "Register success. Please verify your account"}, status=status.HTTP_201_CREATED)

         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)