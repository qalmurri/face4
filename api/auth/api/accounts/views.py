from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PhoneSerializer
from .models import Phone
from authentication.models import Profile


class UserPhoneView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        profile = getattr(user, "is_profile", None)
        # 🔹 Kalau user belum punya profil → langsung kirim null
        if not profile:
            return Response({"phone": None}, status=status.HTTP_200_OK)

        phone = profile.phone
        # 🔹 Kalau profil belum punya phone → kirim null juga
        if not phone:
            return Response({"phone": None}, status=status.HTTP_200_OK)

        # 🔹 Kalau ada, kirim data phone lengkap
        serializer = PhoneSerializer(phone)
        return Response({"phone": serializer.data}, status=status.HTTP_200_OK)


class UserPhoneUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        user = request.user
        number = request.data.get("number")

        if not number:
            return Response({"detail": "Nomor telepon diperlukan."}, status=status.HTTP_400_BAD_REQUEST)

        # 🔧 Pastikan Profile ada
        profile = user.is_profile
        if not profile:
            profile = Profile.objects.create()  # buat profile baru
            user.is_profile = profile
            user.save()

        # 🔧 Pastikan Phone ada
        if not profile.phone:
            phone = Phone.objects.create(number=number)
            profile.phone = phone
        else:
            phone = profile.phone
            phone.number = number
            phone.save()

        profile.save()

        return Response({"detail": "Nomor telepon berhasil disimpan.", "number": phone.number}, status=status.HTTP_200_OK)
    

class UserPreferenceView(APIView):
    pass

class UserPreferenceUpdateView(APIView):
    pass

class UserDisplayView(APIView):
    pass

class UserDisplayUpdateView(APIView):
    pass

class UserAddressView(APIView):
    pass

class UserAddressUpdateView(APIView):
    pass