from django.urls import include, path

urlpatterns = [
     path('auth/', include('authentication.urls')),
     path('auth/', include('reset.urls')),
     path('auth/', include('accounts.urls')),
]