from rest_framework.views import APIView
from core.throttles import RegisterThrottle
from core.permission import DenyAuthenticated

class RegisterView(APIView):
    permission_classes = [DenyAuthenticated]
    throttle_classes = [RegisterThrottle]

    pass