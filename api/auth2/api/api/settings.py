from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-w%=6$cia*3p&(*!fd(gcfj^n_^t%+r169hs2@ok6=vxodj2*u$'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',

    #Core API
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',

    # APP
    'authentications',
    'tokens'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
]
ROOT_URLCONF = 'api.urls'

WSGI_APPLICATION = 'api.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_USER_MODEL = 'authentications.User'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# DRF Config
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTAuthentication'),
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticated'),
}

# REST_FRAMEWORK.update({
#     "DEFAULT_THROTTLE_CLASSES": [
#         "rest_framework.throttling.UserRateThrottle",
#         "rest_framework.throttling.AnonRateThrottle",
#     ],
#     "DEFAULT_THROTTLE_RATES": {
#         "user": "100/min",
#         "anon": "20/min",
#         "login": "5/min",
#         "register": "3/min",
#     }
# })

# JWT Config
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True, # refresh token baru tiap refresh
    "BLACKLIST_AFTER_ROTATION": True, # refresh token lama diblacklist
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# CORS Config
CORS_ALLOW_ALL_ORIGINS = True  # untuk dev, production ganti ke whitelist