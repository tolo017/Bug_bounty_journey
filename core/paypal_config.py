"""
PayPal SDK Configuration Placeholder
====================================
Secure configuration module for handling PayPal payment processing for Bug Bounty Mastery Academy.
"""

import os

PAYPAL_MODE = os.environ.get('PAYPAL_MODE', 'sandbox')  # 'sandbox' or 'live'
PAYPAL_CLIENT_ID = os.environ.get('PAYPAL_CLIENT_ID', 'placeholder_client_id_7a59f032')
PAYPAL_CLIENT_SECRET = os.environ.get('PAYPAL_CLIENT_SECRET', 'placeholder_client_secret_8b91e041')

PAYPAL_SUBSCRIPTION_PRICE_USD = "7.50"
PAYPAL_CURRENCY = "USD"
PAYPAL_OFFICIAL_BUTTON_ID = "4CVL9L9G2QEGY"

PAYPAL_API_BASE_URL = {
    'sandbox': 'https://api-m.sandbox.paypal.com',
    'live': 'https://api-m.paypal.com'
}.get(PAYPAL_MODE, 'https://api-m.sandbox.paypal.com')

def get_paypal_context():
    return {
        'mode': PAYPAL_MODE,
        'client_id': PAYPAL_CLIENT_ID,
        'price': PAYPAL_SUBSCRIPTION_PRICE_USD,
        'currency': PAYPAL_CURRENCY,
        'button_id': PAYPAL_OFFICIAL_BUTTON_ID,
    }
