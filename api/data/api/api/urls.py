from django.urls import path, include

urlpatterns = [
    path("api/", include("auth_server.urls")),
]