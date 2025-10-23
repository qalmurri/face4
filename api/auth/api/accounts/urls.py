from django.urls import path
from .views import UserPhoneView, UserPhoneUpdateView, UserAddressView, UserAddressUpdateView, UserPreferenceView, UserPreferenceUpdateView, UserDisplayView, UserDisplayUpdateView


urlpatterns = [
    path("phone/", UserPhoneView.as_view(), name="user-phone"),
    path("phone/update/", UserPhoneUpdateView.as_view(), name="user-phone-update"),

    path("address/", UserAddressView.as_view(), name="user-address"),
    path("address/update/", UserAddressUpdateView.as_view(), name="user-address-update"),

    path("preference/", UserPreferenceView.as_view(), name="user-preference"),
    path("preference/update/", UserPreferenceUpdateView.as_view(), name="user-preference-update"),

    path("display/", UserDisplayView.as_view(), name="user-display"),
    path("display/update/", UserDisplayUpdateView.as_view(), name="user-display-update"),
]