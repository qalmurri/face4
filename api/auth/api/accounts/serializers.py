from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework import serializers
from authentication.models import Profile
from .models import Phone


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        read_only_fields = ["id", "username", "email"]

class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = ['id', 'number', 'created_at']

class UserPhoneSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'phone']

    def get_phone(self, obj)   :
        if obj.is_profile and obj.is_profile.phone:
            return PhoneSerializer(obj.is_profile.phone).data
        return None