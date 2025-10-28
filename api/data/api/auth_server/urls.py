from django.urls import path
from .views import DataInfoView

urlpatterns = [
    path("info/", DataInfoView.as_view(), name="data-info"),
]
