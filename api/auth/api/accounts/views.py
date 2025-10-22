from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, PhoneSerializer
from .models import Phone
from authentication.models import Profile

class UserMeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class UserPhoneView(APIView):
    def get(self, request):
        user = request.user

        # 🔧 Otomatis buat profile kalau belum ada
        if not user.is_profile:
            profile = Profile.objects.create()
            user.is_profile = profile
            user.save()
        else:
            profile = user.is_profile

        # Kalau phone belum ada, kembalikan number null
        if not profile.phone:
            return Response({"number": None}, status=status.HTTP_200_OK)

        serializer = PhoneSerializer(profile.phone)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        number = request.data.get("number")

        if not number:
            return Response({"detail": "Nomor telepon diperlukan."}, status=status.HTTP_400_BAD_REQUEST)

        # 🔧 Otomatis buat profile kalau belum ada
        if not user.is_profile:
            profile = Profile.objects.create()
            user.is_profile = profile
            user.save()
        else:
            profile = user.is_profile

        # 🔧 Buat atau update phone
        if not profile.phone:
            phone = Phone.objects.create(number=number)
            profile.phone = phone
        else:
            phone = profile.phone
            phone.number = number
            phone.save()

        profile.save()

        return Response({"detail": "Nomor telepon berhasil disimpan.", "number": phone.number}, status=status.HTTP_200_OK)
    

class UserPhoneUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        user = request.user
        profile = getattr(user, "is_profile", None)

        # Pastikan user punya profil
        if not profile:
            return Response({"detail": "Profil belum dibuat."}, status=status.HTTP_404_NOT_FOUND)

        # Jika belum ada phone, buat baru
        if not profile.phone:
            phone = Phone.objects.create(number=request.data.get("number", ""))
            profile.phone = phone
            profile.save()
        else:
            phone = profile.phone
            phone.number = request.data.get("number", phone.number)
            phone.save()

        return Response(
            {
                "username": user.username,
                "phone": {
                    "id": phone.id,
                    "number": phone.number,
                    "created_at": phone.created_at,
                },
            },
            status=status.HTTP_200_OK,
        )