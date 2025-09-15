from django.contrib.auth.models import User

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer
from .models import RegisterVerification
from .utils import send_verification_email

class RegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')

        #cek apakah email sudah dipakai
        if User.objects.filter(email=email).exists():
            count = User.objects.filter(email=email).count()
            if count > 1:
                return Response({'detail': 'Email ini digunakan oleh lebih dari satu akun, hubungi admin'})                
            else:
                return Response({'detail': 'email sudah terdaftar, silakan login atau gunakan email yang lain'})

        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            send_verification_email(user)
            return Response({'detail': 'Akun dibuat. Kode verifikasi telah dikirim ke email.'}, status=201)
        return Response(serializer.errors, status=400)


class VerifyEmailView(APIView):
    def post(self, request):
        email = request.data.get('email')
        code = request.data.get('code')

        try:
            user = User.objects.get(email=email)
            verif = RegisterVerification.objects.get(user=user)

            if verif.code == code:
                verif.is_verified = True
                verif.save()
                user.is_active = True
                user.save()

                # 🔐 Otomatis buat token JWT
                refresh = RefreshToken.for_user(user)
                return Response({
                #   'detail': 'Verifikasi berhasil. Akun aktif dan Anda sudah login.',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                #    'user_id': user.id,
                #    'username': user.username
                })
            return Response({'detail': 'Kode verifikasi salah'}, status=400)
        except User.DoesNotExist:
            return Response({'detail': 'User tidak ditemukan'}, status=404)
        except RegisterVerification.DoesNotExist:
            return Response({'detail': 'Verifikasi belum dibuat'}, status=404)
      
class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get("token")  # token dari frontend (Google ID Token)
        try:
            # Verifikasi token Google
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), "706656805103-9m88hqjvj7bfdte397b8rpuerqsdlelf.apps.googleusercontent.com")
            
            email = idinfo.get("email")
            name = idinfo.get("name")

            # Cari user atau buat baru
            user, created = User.objects.get_or_create(email=email, defaults={
                "username": email.split("@")[0],
                "is_active": True
            })

            # Buat JWT
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })
        except ValueError:
            return Response({"detail": "Token Google tidak valid"}, status=status.HTTP_400_BAD_REQUEST)