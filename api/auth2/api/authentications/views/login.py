from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from core.throttles import LoginThrottle
from core.permission import DenyAuthenticated
from core.handle import handle_login
from authentications.serializers import LoginSerializer


@method_decorator(never_cache, name="dispatch")
class LoginView(APIView):
    throttle_classes = [LoginThrottle]
    authentication_classes = []
    permission_classes = [DenyAuthenticated]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = handle_login(serializer.validated_data, request)
        user = data["user"]
        tokens = data["tokens"]

        return Response({
            "access": tokens["access"],
            "refresh": tokens["refresh"],
            "id": user.public_id,
        }, status=status.HTTP_200_OK)