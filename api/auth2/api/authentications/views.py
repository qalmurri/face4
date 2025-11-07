from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from core.throttles import RegisterThrottle
from core.permission import DenyAuthenticated
from .serializers import RegisterSerializer

@method_decorator(never_cache, name="dispatch") # mencegah browser atau proxy menyimpan response API (aman untuk endpoint sensitif seperti register/login).
class RegisterView(APIView):
    permission_classes = [DenyAuthenticated] # Mencegah user yang sudah login melakukan register baru (logika aman & wajar).
    throttle_classes = [RegisterThrottle] # Membatasi frekuensi request (anti spam / brute force).
    authentication_classes = [] # Menonaktifkan autentikasi global untuk endpoint ini — cocok karena register tidak butuh token.

    def post(self, request):
         serializer = RegisterSerializer(data=request.data)
         if serializer.is_valid():
             serializer.save()
             return Response({"message": "Register success. Please verify your account"}, status=status.HTTP_201_CREATED)

         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)