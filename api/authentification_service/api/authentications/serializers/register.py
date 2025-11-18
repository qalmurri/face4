from rest_framework import serializers
from django.core.validators import RegexValidator, validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    identifier = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["identifier", "password"]

    def validate_identifier(self, value):
        # Deteksi email / phone / username
        try:
            validate_email(value)
            self.context["register_type"] = "email"
            return value
        except ValidationError:
            pass

        phone_regex = RegexValidator(regex=r"^\+?\d{9,15}$")
        try:
            phone_regex(value)
            self.context["register_type"] = "phone"
            return value
        except ValidationError:
            pass

        if not value.isalnum():
            raise serializers.ValidationError("Username hanya boleh huruf dan angka.")
        self.context["register_type"] = "username"
        return value

    def validate(self, attrs):
        register_type = self.context.get("register_type")
        identifier = attrs.get("identifier")
        if register_type == "email" and User.objects.filter(email=identifier).exists():
            raise serializers.ValidationError({"identifier": "Email sudah terdaftar."})
        elif register_type == "phone" and User.objects.filter(phone=identifier).exists():
            raise serializers.ValidationError({"identifier": "Nomor telepon sudah terdaftar."})
        elif register_type == "username" and User.objects.filter(username=identifier).exists():
            raise serializers.ValidationError({"identifier": "Username sudah terdaftar."})
        return attrs