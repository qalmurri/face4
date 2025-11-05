from rest_framework_simplejwt.views import TokenObtainPairView
from core.throttles import LoginThrottle
from core.permission import DenyAuthenticated

class LoginView(TokenObtainPairView):
    permission_classes = [DenyAuthenticated]
    throttle_classes = [LoginThrottle]