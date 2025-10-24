from django.urls import include, path

urlpatterns = [
     path('auth/', include('authentication.urls')),
     path('req/', include('request.urls')),
     path('acc/', include('accounts.urls')),
]