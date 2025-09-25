from django.urls import path
from verification.views import StaffActivationConfirmView

urlpatterns = [
    path("activate-staff/<uid>/<token>/", StaffActivationConfirmView.as_view(), name="staff-activation-confirm"),
]
