from django.urls import path
from .views.send_code import SendCodeView
from .views.verify_code import VerifyCodeView

urlpatterns = [
    path("send/", SendCodeView.as_view()),
    path("verify/", VerifyCodeView.as_view()),
]