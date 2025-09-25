from django.urls import path
from verification.views import StaffActivationConfirmView, StaffActivationRequestView

urlpatterns = [
    path("request-staff/", StaffActivationRequestView.as_view(), name="staff-activation-request"),
    path("activate-staff/<uid>/<token>/", StaffActivationConfirmView.as_view(), name="staff-activation-confirm"),
]
