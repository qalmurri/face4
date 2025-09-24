from django.urls import include, path

urlpatterns = [
     path('auth/', include('users.urls')),
     path('auth/', include('auth.urls')),
     path('auth/', include('password.urls')),
     path('auth/', include('accounts.urls')),
]