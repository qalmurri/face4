from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework import serializers
from .models import Phone, Preference, Display, Address


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = ['id', 'number', 'created_at']

class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = ['id', 'language']

class DisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Display
        fields = ['id', 'photo', 'created_at']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'postal_code', 'created_at']