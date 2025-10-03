# Pendahuluan
Proyek pada backend ini masih dalam tahap pengembangan
## Install ini untuk bisa menjalankan Backend Auth
> pip install django djangorestframework djangorestframework-simplejwt django-cors-headers django-filter markdown psycopg2-binary
## API & Database
Bagian ini masih dalam tahap pengembangan, akan ada pembaruan terus menerus untuk mengikuti Frontend.
### App Authentication
```python
path("register/", RegisterView.as_view(), name="register"),
path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
```
```python
class Profile(models.Model):
    phone = models.OneToOneField(Phone, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, null=True, blank=True)
    display = models.OneToOneField(Display, on_delete=models.SET_NULL, null=True, blank=True)
    preference = models.OneToOneField(Preference, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        db_table = "accounts_profile"


class Verified(models.Model):
    type = models.IntegerField(choices=((0, "Email"),(1, "Phone")))
    number = models.IntegerField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = "authentication_verified"


class User(AbstractUser):
    first_name = None
    last_name = None
    date_joined = None
    last_login = None
    is_verified = models.OneToOneField(Verified, on_delete=models.SET_NULL, null=True, blank=True)
    is_profile = models.OneToOneField(Profile, on_delete=models.SET_NULL, null=True, blank=True)
```
### App Accounts
```python
path("me/", UserMeView.as_view(), name="user-me"),
path("update/", UserUpdateView.as_view(), name="user-update"),
```
```python
class Address(models.Model):
    postal_code = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=timezone.now)


class Display(models.Model):
    photo = models.CharField(max_length=150, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)


class Phone(models.Model):
    number = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)


class Preference(models.Model):
    language = models.CharField(max_length=10)
    created_at = models.DateTimeField(default=timezone.now)
```
### App Request
```python
path("request-staff/", EmailVerificationRequestView.as_view(), name="staff-activation-request"),
path("activate-staff/<uid>/<token>/", EmailVerificationConfirmView.as_view(), name="Email-verification-confirm"),
path("forgot/check/", ForgotPasswordCheckView.as_view(), name="forgot-check"),
path("forgot/confirm/", ForgotPasswordConfirmView.as_view(), name="forgot-confirm"),
path("reset/", ResetPasswordView.as_view(), name="reset-password"),
path("reset/check/<uid>/<token>/", CheckResetPasswordView.as_view(), name="check-reset"),
```
```Python
class ValidityPeriod(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    expired_at = models.DateTimeField(null=True, blank=True)

    def is_expired(self):
        return self.expired_at and self.expired_at < timezone.now()

    def __str__(self):
        return f"Meta(created={self.created_at}, expired={self.expired_at})"


class Token(models.Model):
    token = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"Token({self.token})"


class VerifiedRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.CharField(max_length=255)
    token = models.OneToOneField(Token, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    meta = models.OneToOneField(ValidityPeriod, on_delete=models.CASCADE)
    type = models.IntegerField(choices=((0, "VerificationEmail"),(1, "ResetPassword"),(2, "VerificationNumber")))

    def deactivate(self):
        self.is_active = False
        self.save()

    class Meta:
        db_table = "request_verified"
```