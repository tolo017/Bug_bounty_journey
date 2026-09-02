from django.apps import AppConfig
from django.db.models.signals import post_migrate

import os

def auto_setup_and_seed_admin(sender, **kwargs):
    from django.contrib.auth.models import User
    username = os.environ.get("ADMIN_USERNAME")
    email = os.environ.get("ADMIN_EMAIL")
    password = os.environ.get("ADMIN_PASSWORD")

    if username and password and not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, email=email or "admin@example.com", password=password)

class CoreConfig(AppConfig):
    name = "core"

    def ready(self):
        post_migrate.connect(auto_setup_and_seed_admin, sender=self)
