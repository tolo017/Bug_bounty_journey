from django.shortcuts import redirect
from django.urls import reverse
from django.utils import timezone

EXEMPT_URL_NAMES = [
    'login',
    'register',
    'logout',
    'subscribe',
    'paypal_checkout',
    'paypal_process',
    'admin:index',
]

class TrialExpirationMiddleware:
    """
    Middleware enforcing a 5-day free trial window.
    On day 6+, non-subscribed authenticated users are redirected to the subscription checkout portal.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and not request.user.is_superuser:
            # Check if profile exists, if not create
            profile = getattr(request.user, 'profile', None)
            if profile and profile.is_trial_expired:
                # Check current URL pattern name or path
                current_url_name = request.resolver_match.url_name if request.resolver_match else None
                current_path = request.path

                # Allow access to subscription, login, logout, register, static/admin exempt paths
                exempt_paths = ['/subscribe/', '/paypal/', '/logout/', '/login/', '/register/', '/admin/', '/static/']
                is_exempt = any(current_path.startswith(p) for p in exempt_paths) or (current_url_name in EXEMPT_URL_NAMES)

                if not is_exempt:
                    return redirect('subscribe')

        response = self.get_response(request)
        return response
