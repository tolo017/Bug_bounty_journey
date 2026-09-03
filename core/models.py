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
    current_day = models.IntegerField(default=1)
    github_pat = models.CharField(max_length=255, blank=True, default='')
    github_repo = models.CharField(max_length=255, blank=True, default='')

    # Server-Side Streak Counter Engine
    current_streak = models.IntegerField(default=0)
    longest_streak = models.IntegerField(default=0)
    last_completed_day_date = models.DateTimeField(null=True, blank=True)
    total_completed_days = models.IntegerField(default=0)

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
        completed_days = UserDailyProgress.objects.filter(user=self.user, is_completed=True).count()
        # 60 days total => max 100%
        percentage = round((completed_days / 60.0) * 100, 1)
        return min(100.0, percentage)

    def total_skills_acquired(self):
        completed_days = UserDailyProgress.objects.filter(user=self.user, is_completed=True).count()
        return completed_days * 2  # 2 skill competencies per day

    def record_day_completion(self):
        now = timezone.now()
        if self.last_completed_day_date:
            hours_diff = (now - self.last_completed_day_date).total_seconds() / 3600.0
            if 0 < hours_diff <= 36:
                self.current_streak += 1
            elif hours_diff > 36:
                self.current_streak = 1
        else:
            self.current_streak = 1

        if self.current_streak > self.longest_streak:
            self.longest_streak = self.current_streak

        self.last_completed_day_date = now
        self.total_completed_days = UserDailyProgress.objects.filter(user=self.user, is_completed=True).count()
        self.save()


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


class UserDailyProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='daily_progress')
    week_number = models.IntegerField()
    day_number = models.IntegerField()  # 1 to 5 per week
    global_day_number = models.IntegerField()  # 1 to 60 total
    is_unlocked = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    flag_submitted = models.CharField(max_length=255, blank=True, default='')
    quiz_score = models.IntegerField(default=0)
    report_submitted = models.TextField(blank=True, default='')
    report_score = models.IntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'global_day_number')
        ordering = ['global_day_number']

    def __str__(self):
        return f"User {self.user.username} - Week {self.week_number} Day {self.day_number} (Global Day {self.global_day_number})"


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

        # Global 60-Day progression initialization (Day 1 unlocked by default)
        global_day = 1
        for w in range(1, 13):
            for d in range(1, 6):
                UserDailyProgress.objects.create(
                    user=instance,
                    week_number=w,
                    day_number=d,
                    global_day_number=global_day,
                    is_unlocked=(global_day == 1)
                )
                global_day += 1

        # Grant welcome badge
        Badge.objects.create(
            user=instance,
            title="Mastery Novice",
            description="Enrolled in 60-Day Bug Bounty Mastery Academy",
            icon_name="award"
        )
