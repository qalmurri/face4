from django.urls import include, path

urlpatterns = [
     path('auth/', include('users.urls')),
#     path('auth/', include('authentication.urls')),
#     path('auth/', include('passwords.urls')),
#     path('auth/', include('accounts.urls')),
]