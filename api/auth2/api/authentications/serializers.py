from rest_framework import serializers
from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.Serializer):
    '''
    Payload Backend, Frontend kirim:
    {
      "identifier_type": "email",
      "identifier": "user@example.com",
      "password": "12345678"
    }
    '''
    identifier_type = serializers.ChoiceField(choices=["email", "phone", "username"])
    identifier = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=8)

    phone_validator = RegexValidator(
        regex=r'^[0-9]{8,15}$',
        message="Phone number must be 8-15 digits"
    )

    def validate(self, data):
        identifier_type = data["identifier_type"]
        identifier = data["identifier"]

        # Validation by type
        if identifier_type == "email":
            if User.objects.filter(email=identifier).exists():
                raise serializers.ValidationError("Email already registered")

        elif identifier_type == "phone":
            self.phone_validator(identifier)
            if User.objects.filter(phone=identifier).exists():
                raise serializers.ValidationError("Phone already registered")

        elif identifier_type == "username":
            if User.objects.filter(username=identifier).exists():
                raise serializers.ValidationError("Username already registered")

        return data

    def create(self, validated_data):
        identifier_type = validated_data["identifier_type"]
        identifier = validated_data["identifier"]
        password = validated_data["password"]

        user = User()

        if identifier_type == "email":
            user.email = identifier
            user.username = identifier.split("@")[0]

        elif identifier_type == "phone":
            user.phone = identifier
            user.username = f"user_{identifier[-4:]}"  # auto username

        elif identifier_type == "username":
            user.username = identifier

        user.set_password(password)
        user.save()

        return user