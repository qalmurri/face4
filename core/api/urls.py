from django.urls import path
from .views import ClientRegisterView, ClientLoginView, ClientLogoutView, UserListView

urlpatterns = [
    path('register/', ClientRegisterView.as_view(), name='client_register'),
    path('login/', ClientLoginView.as_view(), name='client_login'),
    path('logout/', ClientLogoutView.as_view(), name='client_logout'),
    path('alluser/', UserListView.as_view(), name='user_list')
]