import random
from django.core.mail import send_mail
from .models import RegisterVerification

def generate_code():
    return str(random.randint(100000, 999999))

def send_verification_email(user):
    code = generate_code()
    RegisterVerification.objects.create(user=user, code=code)
    
    send_mail(
        'Kode Verifikasi Akun Anda',
        f'Halo {user.username}, kode verifikasi Anda adalah: {code}',
        'noreply@webmu.com',
        [user.email],
        fail_silently=False,
    )
