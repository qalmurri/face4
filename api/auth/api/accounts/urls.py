from django.urls import path

from .views import UserMeView, UserUpdateView, UserPhoneView, UserPhoneUpdateView


urlpatterns = [
    path("me/", UserMeView.as_view(), name="user-me"),
    path("update/", UserUpdateView.as_view(), name="user-update"),

    path("user/phone/", UserPhoneView.as_view(), name="user-phone"),
    path("user/phone/update/", UserPhoneUpdateView.as_view(), name="user-phone-update"),
]