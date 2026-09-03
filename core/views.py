import urllib.parse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from .models import UserProfile, UserWeekProgress, UserDailyProgress, Badge
from .curriculum.registry import get_week_data, get_all_weeks_summary, WEEKS_DATA
from .paypal_config import get_paypal_context

def register_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        password_confirm = request.POST.get('password_confirm', '')

        if not username or not email or not password:
            messages.error(request, "All fields are required.")
            return render(request, 'core/register.html')

        if password != password_confirm:
            messages.error(request, "Passwords do not match.")
            return render(request, 'core/register.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username is already taken.")
            return render(request, 'core/register.html')

        user = User.objects.create_user(username=username, email=email, password=password)
        login(request, user)
        messages.success(request, "Account created successfully! Your 5-day free trial has started.")
        return redirect('dashboard')

    return render(request, 'core/register.html')


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, 'core/login.html')


@login_required
def dashboard_view(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    weeks_summary = get_all_weeks_summary()

    # Progress records mapping
    progress_map = {p.week_number: p for p in request.user.week_progress.all()}

    weeks_info = []
    for item in weeks_summary:
        w_num = item['week_number']
        prog = progress_map.get(w_num)
        is_unlocked = prog.is_unlocked if prog else (w_num == 1)
        lab_b_completed = prog.lab_b_completed if prog else False
        weeks_info.append({
            'week_number': w_num,
            'title': item['title'],
            'short_desc': item['short_desc'],
            'is_unlocked': is_unlocked,
            'lab_b_completed': lab_b_completed,
        })

    job_readiness = profile.calculate_job_readiness()
    total_skills = profile.total_skills_acquired()
    badges = request.user.badges.all().order_by('-earned_at')

    context = {
        'profile': profile,
        'job_readiness': job_readiness,
        'total_skills': total_skills,
        'badges': badges,
        'weeks_info': weeks_info,
    }
    return render(request, 'core/dashboard.html', context)


@login_required
def week_detail_view(request, week_number):
    try:
        week_number = int(week_number)
    except ValueError:
        return redirect('dashboard')

    lesson = get_week_data(week_number)
    if not lesson:
        messages.error(request, f"Week {week_number} content not found.")
        return redirect('dashboard')

    progress, _ = UserWeekProgress.objects.get_or_create(user=request.user, week_number=week_number)

    # Check progressive unlock logic
    if not progress.is_unlocked and not request.user.is_superuser:
        messages.error(request, f"Week {week_number} is locked! Complete Week {week_number - 1} CTF flag to unlock.")
        return redirect('dashboard')

    # Get 5-day daily progress objects for this week
    days_data = lesson.get('days', {})
    daily_progress_list = []
    for d_num in range(1, 6):
        global_d = (week_number - 1) * 5 + d_num
        d_prog, _ = UserDailyProgress.objects.get_or_create(
            user=request.user,
            global_day_number=global_d,
            defaults={'week_number': week_number, 'day_number': d_num, 'is_unlocked': (global_d == 1)}
        )
        day_info = days_data.get(d_num, {})
        daily_progress_list.append({
            'day_number': d_num,
            'global_day_number': global_d,
            'title': day_info.get('title', f'Day {d_num} Module'),
            'short_desc': day_info.get('short_desc', ''),
            'is_unlocked': d_prog.is_unlocked or request.user.is_superuser,
            'is_completed': d_prog.is_completed,
            'quiz_score': d_prog.quiz_score,
            'report_score': d_prog.report_score,
        })

    context = {
        'week_number': week_number,
        'lesson': lesson,
        'progress': progress,
        'daily_progress_list': daily_progress_list,
    }
    return render(request, 'core/week_detail.html', context)


@login_required
def day_detail_view(request, week_number, day_number):
    try:
        week_number = int(week_number)
        day_number = int(day_number)
    except ValueError:
        return redirect('dashboard')

    lesson = get_week_data(week_number)
    if not lesson or 'days' not in lesson or day_number not in lesson['days']:
        messages.error(request, f"Week {week_number} Day {day_number} content not found.")
        return redirect('week_detail', week_number=week_number)

    day_data = lesson['days'][day_number]
    global_day = (week_number - 1) * 5 + day_number

    d_prog, _ = UserDailyProgress.objects.get_or_create(
        user=request.user,
        global_day_number=global_day,
        defaults={'week_number': week_number, 'day_number': day_number, 'is_unlocked': (global_day == 1)}
    )

    if not d_prog.is_unlocked and not request.user.is_superuser:
        messages.error(request, f"Day {day_number} is locked! Complete Global Day {global_day - 1} first.")
        return redirect('week_detail', week_number=week_number)

    context = {
        'week_number': week_number,
        'day_number': day_number,
        'global_day_number': global_day,
        'day_data': day_data,
        'daily_progress': d_prog,
    }
    return render(request, 'core/day_detail.html', context)


@login_required
def submit_quiz_view(request, week_number, day_number):
    if request.method != 'POST':
        return redirect('day_detail', week_number=week_number, day_number=day_number)

    submitted_answer = request.POST.get('quiz_answer', '').strip()
    lesson = get_week_data(week_number)

    if not lesson or 'days' not in lesson or day_number not in lesson['days']:
        return redirect('dashboard')

    day_data = lesson['days'][day_number]
    correct_answer = day_data.get('quiz', {}).get('correct_answer', '').strip()
    global_day = (week_number - 1) * 5 + day_number

    d_prog, _ = UserDailyProgress.objects.get_or_create(
        user=request.user,
        global_day_number=global_day,
        defaults={'week_number': week_number, 'day_number': day_number}
    )

    if submitted_answer.lower() == correct_answer.lower():
        d_prog.is_completed = True
        d_prog.quiz_score = 100
        d_prog.completed_at = timezone.now()
        d_prog.save()

        # Update streak counter engine
        profile = request.user.profile
        profile.record_day_completion()

        # Unlock next day if available
        next_global_day = global_day + 1
        if next_global_day <= 60:
            next_w = (next_global_day - 1) // 5 + 1
            next_d = (next_global_day - 1) % 5 + 1
            next_d_prog, _ = UserDailyProgress.objects.get_or_create(
                user=request.user,
                global_day_number=next_global_day,
                defaults={'week_number': next_w, 'day_number': next_d}
            )
            next_d_prog.is_unlocked = True
            next_d_prog.save()

            # If unlocking new week, update UserWeekProgress
            if next_w > week_number:
                next_w_prog, _ = UserWeekProgress.objects.get_or_create(user=request.user, week_number=next_w)
                next_w_prog.is_unlocked = True
                next_w_prog.save()

        messages.success(request, f"🎉 Correct Answer! Day {day_number} completed. Running Streak: {profile.current_streak} Days 🔥")
    else:
        messages.error(request, "❌ Incorrect quiz answer. Review the day's curriculum and try again.")

    return redirect('day_detail', week_number=week_number, day_number=day_number)


@login_required
def submit_daily_report_view(request, week_number, day_number):
    if request.method != 'POST':
        return redirect('day_detail', week_number=week_number, day_number=day_number)

    report_text = request.POST.get('report_text', '').strip()
    global_day = (week_number - 1) * 5 + day_number

    d_prog, _ = UserDailyProgress.objects.get_or_create(
        user=request.user,
        global_day_number=global_day,
        defaults={'week_number': week_number, 'day_number': day_number}
    )
    d_prog.report_submitted = report_text

    # Programmatic Assessment Engine
    score = 0
    checks = ['title:', 'severity:', 'description:', 'impact:', 'proof of concept', 'remediation:']
    report_lower = report_text.lower()
    for c in checks:
        if c in report_lower:
            score += 15
    if len(report_text.split()) > 50:
        score += 10

    d_prog.report_score = min(100, score)
    d_prog.save()

    messages.success(request, f"Daily Security Report Assessed! Impact Score: {d_prog.report_score}/100")
    return redirect('day_detail', week_number=week_number, day_number=day_number)


@login_required
def submit_flag_view(request, week_number):
    if request.method != 'POST':
        return redirect('week_detail', week_number=week_number)

    try:
        week_number = int(week_number)
    except ValueError:
        return redirect('dashboard')

    submitted_flag = request.POST.get('flag', '').strip()
    lesson = get_week_data(week_number)

    if not lesson:
        messages.error(request, "Invalid week module.")
        return redirect('dashboard')

    correct_flag = lesson.get('flag', '')
    if submitted_flag == correct_flag:
        progress, _ = UserWeekProgress.objects.get_or_create(user=request.user, week_number=week_number)
        progress.lab_b_completed = True
        progress.lab_b_flag_submitted = submitted_flag
        progress.completed_at = timezone.now()
        progress.save()

        # Unlock next week if available
        next_week = week_number + 1
        if next_week <= 12:
            next_prog, _ = UserWeekProgress.objects.get_or_create(user=request.user, week_number=next_week)
            next_prog.is_unlocked = True
            next_prog.save()

        # Update profile current week
        profile = request.user.profile
        if profile.current_week <= week_number:
            profile.current_week = min(12, week_number + 1)
            profile.save()

        # Award week completion badge if not already awarded
        badge_title = f"Week {week_number} Specialist"
        if not Badge.objects.filter(user=request.user, title=badge_title).exists():
            Badge.objects.create(
                user=request.user,
                title=badge_title,
                description=f"Mastered offensive vectors in Week {week_number}: {lesson['title']}",
                icon_name="shield-check"
            )

        messages.success(request, f"🎉 Correct Flag! Week {week_number} completed. Week {next_week if next_week <= 12 else 12} is now unlocked!")
    else:
        messages.error(request, "❌ Incorrect flag. Re-examine the interactive playground lab.")

    return redirect('week_detail', week_number=week_number)


@login_required
def submit_report_view(request, week_number):
    if request.method != 'POST':
        return redirect('week_detail', week_number=week_number)

    report_text = request.POST.get('report_text', '').strip()
    progress, _ = UserWeekProgress.objects.get_or_create(user=request.user, week_number=week_number)
    progress.report_submitted = report_text

    # Programmatic Report Assessor Engine
    score = 0
    checks = {
        'title': ['title:', '### title'],
        'severity': ['severity:', 'cvss', 'impact rating'],
        'description': ['vulnerability description:', 'overview', 'description:'],
        'impact': ['impact:', 'business impact'],
        'poc': ['proof of concept', 'poc:', 'steps to reproduce'],
        'remediation': ['remediation:', 'mitigation', 'fix:']
    }

    report_lower = report_text.lower()
    for section, keywords in checks.items():
        if any(k in report_lower for k in keywords):
            score += 15

    if len(report_text.split()) > 100:
        score += 10

    progress.report_score = min(100, score)
    progress.save()

    messages.success(request, f"VDP Security Report evaluated! Automated Impact Score: {progress.report_score}/100")
    return redirect('week_detail', week_number=week_number)


@login_required
def subscribe_view(request):
    paypal_ctx = get_paypal_context()
    return render(request, 'core/subscribe.html', {'paypal': paypal_ctx})


@login_required
def paypal_process_view(request):
    if request.method == 'POST':
        profile = request.user.profile
        profile.is_subscribed = True
        profile.subscription_date = timezone.now()
        profile.save()
        messages.success(request, "Subscription activated! You have unlocked unlimited lifetime access.")
        return redirect('dashboard')
    return redirect('subscribe')


@login_required
def portfolio_export_view(request):
    profile = request.user.profile

    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'save_config':
            profile.github_pat = request.POST.get('github_pat', '').strip()
            profile.github_repo = request.POST.get('github_repo', '').strip()
            profile.student_github_profile_url = request.POST.get('student_github_profile_url', '').strip()
            profile.student_linkedin_profile_url = request.POST.get('student_linkedin_profile_url', '').strip()
            profile.save()
            messages.success(request, "Portfolio profile links and GitHub repository configuration updated successfully.")
        elif action == 'sync_github':
            if not profile.github_repo:
                messages.error(request, "Please set a valid GitHub repository first.")
            elif not profile.github_pat:
                messages.error(request, "Please provide a valid GitHub Personal Access Token (PAT) to authorize automated pushes.")
            else:
                import json
                import base64
                import urllib.request
                import urllib.error

                # Generate full GitHub Markdown Research Log
                full_markdown = f"# Bug Bounty Mastery Academy - Security Research & Lab Logs\n**Student:** {request.user.username}\n**Job Readiness Metric:** {profile.calculate_job_readiness()}%\n**Total Skills Acquired:** {profile.total_skills_acquired()}\n\n---\n\n## Technical Curriculum Log\n\n"
                for w in range(1, 13):
                    lesson = get_week_data(w)
                    prog = UserWeekProgress.objects.filter(user=request.user, week_number=w).first()
                    status = "COMPLETED" if (prog and prog.lab_b_completed) else ("UNLOCKED" if (prog and prog.is_unlocked) else "LOCKED")
                    if lesson and 'days' in lesson and 1 in lesson['days']:
                        day1 = lesson['days'][1]
                        full_markdown += f"### Week {w}: {lesson['title']} [{status}]\n- **Analogy:** {day1.get('analogy', '')}\n- **Root Cause:** {day1.get('root_cause', '')[:200]}...\n- **Flag Status:** {prog.lab_b_flag_submitted if (prog and prog.lab_b_completed) else 'Pending'}\n- **Report Score:** {prog.report_score if prog else 0}/100\n\n"

                repo = profile.github_repo.strip('/')
                pat = profile.github_pat.strip()
                target_path = "RESEARCH_LOGS.md"
                url = f"https://api.github.com/repos/{repo}/contents/{target_path}"

                encoded_content = base64.b64encode(full_markdown.encode('utf-8')).decode('utf-8')

                # Check if file exists to get SHA
                sha = None
                get_req = urllib.request.Request(url, headers={
                    "Authorization": f"token {pat}",
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "BugBountyMasteryApp"
                })
                try:
                    with urllib.request.urlopen(get_req) as response:
                        res_data = json.loads(response.read().decode('utf-8'))
                        sha = res_data.get('sha')
                except Exception:
                    pass  # File doesn't exist yet, create new

                put_data = {
                    "message": f"auto-sync: Bug Bounty Mastery Research Log for {request.user.username}",
                    "content": encoded_content
                }
                if sha:
                    put_data["sha"] = sha

                put_req = urllib.request.Request(url, data=json.dumps(put_data).encode('utf-8'), headers={
                    "Authorization": f"token {pat}",
                    "Accept": "application/vnd.github.v3+json",
                    "Content-Type": "application/json",
                    "User-Agent": "BugBountyMasteryApp"
                }, method='PUT')

                try:
                    with urllib.request.urlopen(put_req) as response:
                        messages.success(request, f"Successfully synchronized research log to GitHub repository '{repo}' ({target_path}).")
                except urllib.error.HTTPError as e:
                    messages.error(request, f"GitHub API Error ({e.code}): Unable to push to '{repo}'. Verify repository name and PAT permissions.")
                except Exception as e:
                    messages.error(request, f"GitHub Sync Failed: {str(e)}")

    # Generate LinkedIn Milestone Post
    completed_progress = UserWeekProgress.objects.filter(user=request.user, lab_b_completed=True).order_by('week_number')
    completed_weeks_count = completed_progress.count()

    linkedin_post = f"""🚀 Milestone Update: Bug Bounty Mastery Academy Progress

I am thrilled to share my offensive web security progress!
I have completed {completed_weeks_count} of 12 weeks of technical vulnerability analysis and practical CTF labs.

📊 Current Stats:
- Job Readiness Metric: {profile.calculate_job_readiness()}%
- Total Acquired Skills: {profile.total_skills_acquired()} Competencies
- Unlocked Badges: {request.user.badges.count()}

Completed Modules:
"""
    for prog in completed_progress:
        lesson = get_week_data(prog.week_number)
        title = lesson['title'] if lesson else f"Week {prog.week_number}"
        linkedin_post += f"✅ Week {prog.week_number}: {title}\n"

    linkedin_post += "\n#BugBounty #Cybersecurity #WebSecurity #PenetrationTesting #InfoSec"

    # Generate GitHub Markdown Research Log
    github_markdown = f"""# Bug Bounty Mastery Academy - Security Research & Lab Logs
**Student:** {request.user.username}
**Job Readiness Metric:** {profile.calculate_job_readiness()}%
**Total Skills Acquired:** {profile.total_skills_acquired()}

---

## Technical Curriculum Log

"""
    for w in range(1, 13):
        lesson = get_week_data(w)
        prog = UserWeekProgress.objects.filter(user=request.user, week_number=w).first()
        status = "COMPLETED" if (prog and prog.lab_b_completed) else ("UNLOCKED" if (prog and prog.is_unlocked) else "LOCKED")

        if lesson and 'days' in lesson and 1 in lesson['days']:
            day1 = lesson['days'][1]
            py_code = day1.get('automation_scripts', {}).get('python_script', '')[:250]
            github_markdown += f"""### Week {w}: {lesson['title']} [{status}]
- **Analogy:** {day1.get('analogy', '')}
- **Root Cause:** {day1.get('root_cause', '')[:200]}...
- **Flag Status:** {prog.lab_b_flag_submitted if (prog and prog.lab_b_completed) else 'Pending'}
- **Report Score:** {prog.report_score if prog else 0}/100

```python
{py_code}...
```

---
"""

    context = {
        'linkedin_post': linkedin_post,
        'github_markdown': github_markdown,
    }
    return render(request, 'core/portfolio_export.html', context)


@login_required
def youtube_search_api_view(request):
    query = request.GET.get('query', '').strip()
    if not query:
        return JsonResponse({'error': 'Query parameter required'}, status=400)

    # Dynamic search endpoint returning formatted educational videos
    results = [
        {
            'creator': 'David Bombal',
            'title': f'Bug Bounty Masterclass: {query}',
            'youtube_url': f'https://www.youtube.com/results?search_query={urllib.parse.quote(query)}+bug+bounty',
            'analysis_text': f'Topical video workstation analysis covering {query} exploitation techniques.'
        },
        {
            'creator': 'Vickie Li',
            'title': f'Deep Dive Technical Analysis: {query}',
            'youtube_url': f'https://www.youtube.com/results?search_query={urllib.parse.quote(query)}+vickie+li',
            'analysis_text': f'Step-by-step PoC breakdown for discovering and exploiting {query}.'
        },
        {
            'creator': 'John Hammond',
            'title': f'Security Vulnerability Breakdown: {query}',
            'youtube_url': f'https://www.youtube.com/results?search_query={urllib.parse.quote(query)}+john+hammond',
            'analysis_text': f'Real-world vulnerability demonstration and log auditing for {query}.'
        }
    ]
    return JsonResponse({'query': query, 'results': results})


@login_required
def lab_playground_daily_target_view(request, week_number, day_number):
    try:
        week_number = int(week_number)
        day_number = int(day_number)
    except ValueError:
        return JsonResponse({'error': 'Invalid parameters'}, status=400)

    lesson = get_week_data(week_number)
    if not lesson or 'days' not in lesson or day_number not in lesson['days']:
        return JsonResponse({'error': 'Target module not found'}, status=404)

    day_data = lesson['days'][day_number]
    flag = day_data['flag']

    return HttpResponse(f"""
    <html>
    <head><title>Week {week_number} Day {day_number} Target Instance</title></head>
    <body style="background:#0f172a; color:#f8fafc; font-family:monospace; padding:2rem;">
        <h1 style="color:#38bdf8;">🎯 Live Target Instance - Week {week_number} Day {day_number}</h1>
        <p style="color:#94a3b8;">Module: {day_data['title']}</p>
        <div style="background:#020617; border:1px solid #334155; padding:1.5rem; border-radius:0.75rem; margin-top:1rem;">
            <p style="color:#22c55e;">[SYSTEM STATUS: ONLINE]</p>
            <p>Target Bundle Endpoint: /public/assets/js/main.app.bundle.js</p>
            <script>
                // LIVE TARGET APPLICATION ENVIRONMENT BUNDLE
                window.appEnv = {{
                    tier: "stage-dev",
                    active_module: "W{week_number}D{day_number}",
                    flag: "{flag}"
                }};
                window.userRole = "guest_anonymous";
                function processAdminCheck() {{
                    if (window.userRole === "root_sec_admin") {{
                        return "{flag}";
                    }}
                    return "Access Denied: Role must be root_sec_admin";
                }}
            </script>
            <p style="color:#e2e8f0; margin-top:1rem;">Inspect page source or DevTools console (<code style="color:#38bdf8;">F12</code>) to extract the active flag variable.</p>
        </div>
    </body>
    </html>
    """)


# Target Playground Endpoints for Interactive CTF Simulations
def lab_playground_target_view(request, week_number):
    try:
        week_number = int(week_number)
    except ValueError:
        return JsonResponse({'error': 'Invalid week number'}, status=400)

    lesson = get_week_data(week_number)
    if not lesson:
        return JsonResponse({'error': 'Week not found'}, status=404)

    flag = lesson['flag']

    if week_number == 1:
        # Recon & JS Deconstruction
        return HttpResponse(f"""
        <html>
        <body>
            <h1>Staging Asset Portal - Week 1 Playground</h1>
            <p>Deconstruct client-side JS bundle to locate debug secret key.</p>
            <script>
                // DEBUG_CONFIG_BUNDLE
                const STAGING_CONFIG = {{
                    api_endpoint: "http://api.staging.internal",
                    secret_flag: "{flag}"
                }};
            </script>
        </body>
        </html>
        """)

    elif week_number == 2:
        # Subdomain Takeover & CNAME Alias
        return HttpResponse(f"""
        <html>
        <head><title>404 Bucket Not Found</title></head>
        <body>
            <h1>404 Service Not Found</h1>
            <p>Bucket orphan-cloud-storage does not exist in DNS zone.</p>
            <!-- CNAME ALIAS TAKEOVER VERIFIED: {flag} -->
        </body>
        </html>
        """, status=404)

    elif week_number == 3:
        # Broken Auth & JWT alg none
        auth_header = request.headers.get('Authorization', '')
        if 'Bearer' in auth_header:
            token = auth_header.split('Bearer ')[-1].strip()
            # If token starts with algorithm none payload
            if token.startswith('eyJhbGciOiJub25l') or 'admin' in token:
                return JsonResponse({'status': 'Authenticated as Admin', 'flag': flag})
        return JsonResponse({'error': 'Unauthorized. Submit JWT with alg:none and user:admin.', 'hint': 'eyJhbGciOiJub25l...'}, status=401)

    elif week_number == 4:
        # IDOR & BOLA
        account_id = request.GET.get('account_id')
        if account_id == '1002':
            return JsonResponse({'account_id': 1002, 'owner': 'Victim Account', 'secret_flag': flag})
        return JsonResponse({'account_id': account_id or 1001, 'owner': 'Your Account', 'note': 'Try changing account_id to 1002'})

    elif week_number == 5:
        # XSS
        q = request.GET.get('q', '')
        if '<img' in q or '<script' in q or '<svg' in q:
            return HttpResponse(f"""
            <html>
            <body>
                <h1>Search Results for: {q}</h1>
                <div class="alert">XSS Payload Executed! Secret Flag: {flag}</div>
            </body>
            </html>
            """)
        return HttpResponse(f"<html><body><h1>Search Page</h1><form><input name='q'><button>Search</button></form><p>Query: {q}</p></body></html>")

    elif week_number == 6:
        # CSRF
        if request.method == 'POST':
            email = request.POST.get('email', '')
            if email:
                return HttpResponse(f"<html><body><h1>Email Updated to {email}!</h1><p>CSRF Exploitation Successful. Flag: {flag}</p></body></html>")
        return HttpResponse("<html><body><h1>Update Email</h1><form method='POST'><input name='email'><button>Submit</button></form></body></html>")

    elif week_number == 7:
        # SQLi
        cat = request.GET.get('cat', '')
        if 'UNION' in cat.upper() or "'" in cat:
            return HttpResponse(f"<html><body><h1>Database Results:</h1><table><tr><td>1</td><td>{flag}</td><td>3</td></tr></table></body></html>")
        return HttpResponse("<html><body><h1>Product Catalog</h1><p>Select category parameter 'cat'.</p></body></html>")

    elif week_number == 8:
        # SSRF
        url = request.GET.get('url', '')
        if '169.254.169.254' in url or '2852039166' in url or '0xa9fea9fe' in url:
            return HttpResponse(f"AWS IMDS Metadata Exposed: IAM Role: Admin, Secret Access Token: {flag}")
        return HttpResponse("<html><body><h1>URL Proxy Fetcher</h1><p>Supply 'url' parameter to fetch.</p></body></html>")

    elif week_number == 9:
        # XXE
        if request.method == 'POST':
            body = request.body.decode('utf-8', errors='ignore')
            if 'ENTITY' in body or 'SYSTEM' in body or 'file:' in body:
                return HttpResponse(f"<?xml version='1.0'?><response><user>{flag}</user></response>")
        return HttpResponse("<?xml version='1.0'?><response><message>Send POST XML payload</message></response>")

    elif week_number == 10:
        # SSTI
        template = request.GET.get('template', '')
        if '7*7' in template or 'popen' in template or 'import' in template:
            return HttpResponse(f"Template Output: 49. RCE Executed. Flag: {flag}")
        return HttpResponse("<html><body><h1>Template Engine</h1><p>Supply 'template' parameter.</p></body></html>")

    elif week_number == 11:
        # Race Conditions
        code = request.POST.get('code', '')
        if request.method == 'POST' and code:
            return HttpResponse(f"Promo Code '{code}' Redeemed! Balance updated. Flag: {flag}")
        return HttpResponse("<html><body><h1>Redeem Promo Code</h1><form method='POST'><input name='code'><button>Redeem</button></form></body></html>")

    elif week_number == 12:
        # API Mass Assignment
        if request.method == 'POST':
            body = request.body.decode('utf-8', errors='ignore')
            if 'is_admin' in body and ('true' in body.lower() or 'True' in body):
                return JsonResponse({'status': 'Role upgraded to Administrator', 'flag': flag})
        return JsonResponse({'status': 'Standard User', 'note': 'Inject is_admin property into POST JSON.'})

    return HttpResponse(f"Target Playground Week {week_number}. Flag: {flag}")
