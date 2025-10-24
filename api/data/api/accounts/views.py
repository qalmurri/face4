from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PhoneSerializer, PreferenceSerializer, DisplaySerializer, AddressSerializer
from .models import Phone
from authentication.models import Profile


class UserPhoneView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        profile = getattr(user, "is_profile", None)
        if not profile:
            return Response({"phone": None}, status=status.HTTP_200_OK)
        phone = profile.phone
        if not phone:
            return Response({"phone": None}, status=status.HTTP_200_OK)
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
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, "is_profile", None)
        if not profile:
            return Response({"preference": None}, status=status.HTTP_200_OK)
        preference = profile.preference
        if not preference:
            return Response({"preference": None}, status=status.HTTP_200_OK)
        serializer = PreferenceSerializer(preference)
        return Response({"preference": serializer.data}, status=status.HTTP_200_OK)

class UserPreferenceUpdateView(APIView):
    pass

class UserDisplayView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, "is_profile", None)
        if not profile:
            return Response({"display": None}, status=status.HTTP_200_OK)
        display = profile.display
        if not display:
            return Response({"display": None}, status=status.HTTP_200_OK)
        serializer = DisplaySerializer(display)
        return Response({"display": serializer.data}, status=status.HTTP_200_OK)

class UserDisplayUpdateView(APIView):
    pass

class UserAddressView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, "is_profile", None)
        if not profile:
            return Response({"address": None}, status=status.HTTP_200_OK)
        address = profile.address
        if not address:
            return Response({"address": None}, status=status.HTTP_200_OK)
        serializer = AddressSerializer(address)
        return Response({"address": serializer.data}, status=status.HTTP_200_OK)

class UserAddressUpdateView(APIView):
    pass