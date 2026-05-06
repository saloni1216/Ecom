import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecom.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'kartik@gmail.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', '1234')
name = os.environ.get('DJANGO_SUPERUSER_NAME', 'Admin')

user, created = User.objects.get_or_create(email=email)

if created:
    user.name = name
    user.username = email 
    user.set_password(password)
    user.is_staff = True
    user.is_superuser = True
    user.save()
    print("Superuser created!")
else:
    user.username = email 
    user.is_staff = True
    user.is_superuser = True
    user.set_password(password)
    user.save()
    print("Existing user ko superuser bana diya!")