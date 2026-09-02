from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    trial_start_date = models.DateTimeField(default=timezone.now)
    is_subscribed = models.BooleanField(default=False)
    subscription_date = models.DateTimeField(null=True, blank=True)
    current_week = models.IntegerField(default=1)
    github_pat = models.CharField(max_length=255, blank=True, default='')
    github_repo = models.CharField(max_length=255, blank=True, default='')

    def __str__(self):
        return f"{self.user.username}'s Profile"

    @property
    def trial_days_left(self):
        if self.is_subscribed:
            return 999
        elapsed = (timezone.now() - self.trial_start_date).days
        remaining = 5 - elapsed
        return max(0, remaining)

    @property
    def is_trial_expired(self):
        if self.is_subscribed:
            return False
        return (timezone.now() - self.trial_start_date).days >= 5

    def calculate_job_readiness(self):
        completed_weeks = UserWeekProgress.objects.filter(user=self.user, lab_b_completed=True).count()
        # 12 weeks total => max 100%
        percentage = round((completed_weeks / 12.0) * 100, 1)
        return min(100.0, percentage)

    def total_skills_acquired(self):
        completed_weeks = UserWeekProgress.objects.filter(user=self.user, lab_b_completed=True).count()
        return completed_weeks * 4  # 4 core skill areas per week


class UserWeekProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='week_progress')
    week_number = models.IntegerField()
    is_unlocked = models.BooleanField(default=False)
    lab_a_completed = models.BooleanField(default=False)
    lab_b_completed = models.BooleanField(default=False)
    lab_b_flag_submitted = models.CharField(max_length=255, blank=True, default='')
    report_submitted = models.TextField(blank=True, default='')
    report_score = models.IntegerField(default=0)
    unlocked_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'week_number')

    def __str__(self):
        return f"User {self.user.username} - Week {self.week_number} (Unlocked: {self.is_unlocked})"


class Badge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='badges')
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, default='shield')
    earned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.title}"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile = UserProfile.objects.create(user=instance)
        # Week 1 is automatically unlocked for all users
        UserWeekProgress.objects.create(user=instance, week_number=1, is_unlocked=True)
        for w in range(2, 13):
            UserWeekProgress.objects.create(user=instance, week_number=w, is_unlocked=False)
        # Grant welcome badge
        Badge.objects.create(
            user=instance,
            title="Mastery Novice",
            description="Enrolled in Bug Bounty Mastery Academy",
            icon_name="award"
        )
