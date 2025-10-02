from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from accounts.models import Phone, Address, Display


class Profile(models.Model):
    phone = models.OneToOneField(Phone, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, null=True, blank=True)
    display = models.OneToOneField(Display, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        db_table = "authentication_user_profile"

class Verified(models.Model):
    type = models.IntegerField(choices=((0, "Email"),(1, "Phone")))
    number = models.IntegerField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = "authentication_user_verified"

class User(AbstractUser):
    first_name = None
    last_name = None
    date_joined = None
    last_login = None
    is_verified = models.OneToOneField(Verified, on_delete=models.SET_NULL, null=True, blank=True)
    is_profile = models.OneToOneField(Profile, on_delete=models.SET_NULL, null=True, blank=True)