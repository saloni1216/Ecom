import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecom.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'kartik@gmail.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', '1234')
name = os.environ.get('DJANGO_SUPERUSER_NAME', 'Admin')

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password, name=name)
    print("Superuser created!")
else:
    # ✅ Existing user ko superuser banao
    user = User.objects.get(email=email)
    user.is_staff = True
    user.is_superuser = True
    user.is_active = True
    user.set_password(password)
    user.save()
    print("Existing user ko superuser bana diya!")