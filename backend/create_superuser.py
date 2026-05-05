import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecom.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@gmail.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')
name = os.environ.get('DJANGO_SUPERUSER_NAME', 'Admin')

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password, name=name)
    print("Superuser created!")
else:
    print("Superuser already exists.")