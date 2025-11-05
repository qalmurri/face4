from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from .views import LoginView
# from django.utils.decorators import method_decorator
# from rest_framework.decorators import throttle_classes

urlpatterns = [
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("logout/", TokenBlacklistView.as_view(), name="jwt_logout"),
]