from django.urls import path
from .views import UserPhoneView, UserPhoneUpdateView, UserAddressView, UserAddressUpdateView, UserPreferenceView, UserPreferenceUpdateView, UserDisplayView, UserDisplayUpdateView, UserPhoneDeleteView, UserAddressDeleteView, UserPreferenceDeleteView, UserDisplayDeleteView


urlpatterns = [
    path("phone/", UserPhoneView.as_view(), name="user-phone"),
    path("phone/update/", UserPhoneUpdateView.as_view(), name="user-phone-update"),
    path("phone/delete/", UserPhoneDeleteView.as_view(), name="user-phone-delete"),
    path("address/", UserAddressView.as_view(), name="user-address"),
    path("address/update/", UserAddressUpdateView.as_view(), name="user-address-update"),
    path("address/delete/", UserAddressDeleteView.as_view(), name="user-address-delete"),
    path("preference/", UserPreferenceView.as_view(), name="user-preference"),
    path("preference/update/", UserPreferenceUpdateView.as_view(), name="user-preference-update"),
    path("preference/delete/", UserPreferenceDeleteView.as_view(), name="user-preference-delete"),
    path("display/", UserDisplayView.as_view(), name="user-display"),
    path("display/update/", UserDisplayUpdateView.as_view(), name="user-display-update"),
    path("display/delete/", UserDisplayDeleteView.as_view(), name="user-display-delete"),
]