from rest_framework import serializers


#██████╗░███████╗░██████╗███████╗████████╗
#██╔══██╗██╔════╝██╔════╝██╔════╝╚══██╔══╝
#██████╔╝█████╗░░╚█████╗░█████╗░░░░░██║░░░
#██╔══██╗██╔══╝░░░╚═══██╗██╔══╝░░░░░██║░░░
#██║░░██║███████╗██████╔╝███████╗░░░██║░░░
#╚═╝░░╚═╝╚══════╝╚═════╝░╚══════╝░░░╚═╝░░░


class ForgotPasswordSerializer(serializers.Serializer):
    identifier = serializers.CharField()