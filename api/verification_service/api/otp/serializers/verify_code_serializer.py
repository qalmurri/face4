from rest_framework import serializers

class VerifyCodeSerializer(serializers.Serializer):
    user_public_id = serializers.UUIDField()
    code = serializers.CharField()
    purpose = serializers.CharField()
