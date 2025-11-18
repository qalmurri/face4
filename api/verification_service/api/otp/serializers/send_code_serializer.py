from rest_framework import serializers

class SendCodeSerializer(serializers.Serializer):
    user_public_id = serializers.UUIDField()
    purpose = serializers.CharField()
