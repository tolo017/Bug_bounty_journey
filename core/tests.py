from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from datetime import timedelta
from core.models import UserProfile, UserWeekProgress, Badge
from core.curriculum.registry import WEEKS_DATA

class CorePlatformTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='teststudent', password='password123', email='test@example.com')
        self.profile = self.user.profile

    def test_user_creation_creates_profile_and_initial_unlocks(self):
        self.assertIsNotNone(self.profile)
        self.assertEqual(self.profile.current_week, 1)
        # Week 1 must be unlocked, Week 2 locked
        w1 = UserWeekProgress.objects.get(user=self.user, week_number=1)
        w2 = UserWeekProgress.objects.get(user=self.user, week_number=2)
        self.assertTrue(w1.is_unlocked)
        self.assertFalse(w2.is_unlocked)
        # Novice Badge created
        self.assertTrue(Badge.objects.filter(user=self.user, title="Mastery Novice").exists())

    def test_progressive_flag_submission_unlocks_next_week(self):
        self.client.login(username='teststudent', password='password123')

        # Week 1 flag submission
        w1_flag = WEEKS_DATA[1]['flag']
        response = self.client.post(reverse('submit_flag', kwargs={'week_number': 1}), {'flag': w1_flag})
        self.assertEqual(response.status_code, 302)

        # Verify Week 1 completed and Week 2 unlocked
        w1_progress = UserWeekProgress.objects.get(user=self.user, week_number=1)
        w2_progress = UserWeekProgress.objects.get(user=self.user, week_number=2)
        self.assertTrue(w1_progress.lab_b_completed)
        self.assertTrue(w2_progress.is_unlocked)

        # Verify Week 2 module access is now allowed
        detail_res = self.client.get(reverse('week_detail', kwargs={'week_number': 2}))
        self.assertEqual(detail_res.status_code, 200)

    def test_locked_week_redirects_to_dashboard(self):
        self.client.login(username='teststudent', password='password123')
        # Week 5 is locked initially
        response = self.client.get(reverse('week_detail', kwargs={'week_number': 5}))
        self.assertEqual(response.status_code, 302)
        self.assertIn(reverse('dashboard'), response.url)

    def test_trial_expiration_middleware_redirects_on_day_6(self):
        self.client.login(username='teststudent', password='password123')

        # Set trial start date to 6 days ago
        self.profile.trial_start_date = timezone.now() - timedelta(days=6)
        self.profile.save()

        # Accessing dashboard should redirect to subscribe
        response = self.client.get(reverse('dashboard'))
        self.assertEqual(response.status_code, 302)
        self.assertIn(reverse('subscribe'), response.url)

        # Subscribe page should be accessible
        sub_res = self.client.get(reverse('subscribe'))
        self.assertEqual(sub_res.status_code, 200)

    def test_paypal_process_activates_subscription(self):
        self.client.login(username='teststudent', password='password123')
        # Expire trial
        self.profile.trial_start_date = timezone.now() - timedelta(days=6)
        self.profile.save()

        # Process subscription
        res = self.client.post(reverse('paypal_process'))
        self.assertEqual(res.status_code, 302)

        # Verify user is now subscribed
        self.profile.refresh_from_db()
        self.assertTrue(self.profile.is_subscribed)
        self.assertFalse(self.profile.is_trial_expired)

    def test_report_evaluation_engine_scoring(self):
        self.client.login(username='teststudent', password='password123')
        report_text = """
### Title: JWT Algorithm Downgrade Authentication Bypass
### Severity: High (CVSS 8.5)
### Vulnerability Description: The application parses JWT headers without enforcing algorithm signature verification.
### Impact: Unauthorized administrative account takeover.
### Proof of Concept (PoC): Send JWT header {"alg":"none"}.
### Remediation: Enforce strict algorithm white-listing in PyJWT.
"""
        res = self.client.post(reverse('submit_report', kwargs={'week_number': 1}), {'report_text': report_text})
        self.assertEqual(res.status_code, 302)

        progress = UserWeekProgress.objects.get(user=self.user, week_number=1)
        self.assertGreaterEqual(progress.report_score, 80)

    def test_interactive_lab_target_playgrounds(self):
        # Test all 12 week target endpoints
        for w in range(1, 13):
            res = self.client.get(reverse('lab_playground_target', kwargs={'week_number': w}))
            self.assertIn(res.status_code, [200, 401, 404])

    def test_portfolio_export_and_youtube_search_api_views(self):
        self.client.login(username='teststudent', password='password123')

        # Test Portfolio Export view GET
        export_res = self.client.get(reverse('portfolio_export'))
        self.assertEqual(export_res.status_code, 200)

        # Test YouTube Search API view GET
        yt_res = self.client.get(reverse('youtube_search_api') + '?query=XSS')
        self.assertEqual(yt_res.status_code, 200)
        self.assertIn('results', yt_res.json())
