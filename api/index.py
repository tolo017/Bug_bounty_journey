import os
import sys
from django.core.management import call_command
from config.wsgi import app

# Automatically execute database migrations on Vercel boot
_MIGRATED = False

def ensure_migrations():
    global _MIGRATED
    if not _MIGRATED:
        try:
            call_command("migrate", interactive=False)
            _MIGRATED = True
        except Exception as e:
            print(f"Auto-migration warning: {e}", file=sys.stderr)

try:
    ensure_migrations()
except Exception as e:
    print(f"Startup error: {e}", file=sys.stderr)

app = app
