from django.db import models

class Phone(models.Model):
    country = models.CharField(max_length=255)
    number = models.CharField(max_length=255)
    is_verified = models.BooleanField(default=False)

class Address(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

class Display(models.Model):
    photo = models.CharField(max_length=150, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[
        ("male", "Male"), ("female", "Female"), ("other", "Other")
        ], blank=True, null=True)

class Profile(models.Model):
    phone = models.OneToOneField(Phone, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, null=True, blank=True)
    display = models.OneToOneField(Display, on_delete=models.SET_NULL, null=True, blank=True)