from django.urls import path, include

urlpatterns = [
    path("verification/", include("otp.urls")),
]