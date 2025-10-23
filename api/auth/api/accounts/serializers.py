from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from authentication.models import Profile
from .models import Phone


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = ['id', 'number', 'created_at']

class UserPhoneView(APIView):
    def get(self, request):
        user = request.user

        # Buat Profile kalau belum ada
        profile = user.is_profile
        if not profile:
            profile = Profile.objects.create()
            user.is_profile = profile
            user.save()

        # Kalau phone belum ada, return null
        if not profile.phone:
            return Response({"number": None}, status=status.HTTP_200_OK)

        serializer = PhoneSerializer(profile.phone)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        number = request.data.get("number")

        if not number:
            return Response({"detail": "Nomor telepon diperlukan."}, status=status.HTTP_400_BAD_REQUEST)

        # Buat Profile kalau belum ada
        profile = user.is_profile
        if not profile:
            profile = Profile.objects.create()
            user.is_profile = profile
            user.save()

        # Buat atau update Phone
        if not profile.phone:
            phone = Phone.objects.create(number=number)
            profile.phone = phone
        else:
            phone = profile.phone
            phone.number = number
            phone.save()

        profile.save()

        return Response({"detail": "Nomor telepon berhasil disimpan.", "number": phone.number}, status=status.HTTP_200_OK)