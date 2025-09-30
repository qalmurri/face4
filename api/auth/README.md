# Pendahuluan
Proyek pada backend ini masih dalam tahap pengembangan
## Install ini untuk bisa menjalankan Backend Auth
> pip install django djangorestframework djangorestframework-simplejwt django-cors-headers django-filter markdown psycopg2-binary
## API & Database
Bagian ini masih dalam tahap pengembangan, akan ada pembaruan terus menerus untuk mengikuti Frontend.
### App Authentication
```
1. register/
2. token/
3. token/refresh/
```
```
Database mengikuti Default
```
### App Reset
```
1. forgot/check/
2. forgot/confirm/
3. reset/
4. reset/check/uid/token/
```
```python
class PasswordResetRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.CharField(max_length=255)
    token = models.OneToOneField(Token, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    meta = models.OneToOneField(ValidityPeriod, on_delete=models.CASCADE)
```
### App Verification
```
1. request-staff/
2. activate-staff/uid/token/
```
```python
class StaffActivationRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uid = models.CharField(max_length=255)
    token = models.OneToOneField(Token, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    meta = models.OneToOneField(ValidityPeriod, on_delete=models.CASCADE)
```
### App Accounts
```
1. auth/me/
2. auth/update/
```
```
Database mengikuti Default
```
### App Core2
```Python
class ValidityPeriod(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    expired_at = models.DateTimeField(null=True, blank=True)

class Token(models.Model):
    token = models.CharField(max_length=255, unique=True)
```