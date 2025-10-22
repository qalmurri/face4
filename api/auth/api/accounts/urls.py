from django.urls import path

from .views import UserMeView, UserUpdateView, UserPhoneView


urlpatterns = [
    path("me/", UserMeView.as_view(), name="user-me"),
    path("update/", UserUpdateView.as_view(), name="user-update"),

    path("user/phone/", UserPhoneView.as_view(), name="user-phone"),
]