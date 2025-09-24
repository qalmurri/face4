from django.urls import path
from .views import UserMeView, UserUpdateView

urlpatterns = [
    path("me/", UserMeView.as_view(), name="user-me"),
    path("update/", UserUpdateView.as_view(), name="user-update"),
]