from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ClientRegisterSerializer, ClientLoginSerializer, ClientLogoutSerializer, UserSerializer

class ClientRegisterView(generics.CreateAPIView):
    serializer_class = ClientRegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {
                "message": "User registered successfully"
            },
            status=status.HTTP_201_CREATED,
        )
    
class ClientLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ClientLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(
                {
                    "refresh": serializer.validated_data['refresh'],
                    "access": serializer.validated_data['access'],
                },
                status=status.HTTP_200_OK,
            )
        
        return Response(
            {"detail": serializer.errors},
            status=status.HTTP_401_UNAUTHORIZED,
        )

class ClientLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ClientLogoutSerializer(data=request.data)
        
        if serializer.is_valid():
            return Response({"detail": "Logout successful."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
###############
### TESTING ###
###############

class UserListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):

        users = UserSerializer.get_all_users()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)