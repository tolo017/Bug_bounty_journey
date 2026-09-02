WEEK_11_DATA = {
    "week_number": 11,
    "title": "Race Conditions & Business Logic Vulnerabilities",
    "short_desc": "Exploit Limit-Overrun race conditions, TOCTOU time windows, and bypass multi-step business workflow logic.",
    "flag": "FLAG{race_condition_limit_overflow_3321}",

    "analogy": """A Race Condition is like two people using separate ATM machines in different cities to withdraw money from the exact same $100 bank account at the exact same millisecond. If both ATMs check the account balance simultaneously, both ATMs see $100, both approve the withdrawal, and the bank hands out $200 total from a $100 account!""",

    "overview": """Race Conditions occurs when application logic processes concurrent HTTP requests without proper atomic transaction isolation or database row locking (Time-of-Check to Time-of-Use - TOCTOU). Attackers send synchronized HTTP requests in parallel (using HTTP/2 single-packet attack techniques) to exploit time windows between validation checks and database state updates, allowing multi-use of single-use promo codes, gift card balance multiplication, or double withdrawals.""",

    "learning_objectives": [
        "Understand TOCTOU (Time-of-Check to Time-of-Use) concurrency windows.",
        "Master HTTP/2 Single-Packet Attack techniques using Burp Turbo Intruder.",
        "Identify business logic vulnerabilities in multi-step shopping carts and password resets.",
        "Implement atomic database transactions (`select_for_update`) and distributed locks."
    ],

    "hunters_perspective": """Race Conditions represent some of the highest-paying business logic findings in e-commerce, fintech, and crypto bug bounty programs. Hunters identify high-value actions with limits: redeeming coupon codes, transferring account balances, claiming daily rewards, or withdrawing funds. Using Turbo Intruder, hunters fire 50 parallel requests within a single TCP frame to bypass limit checks.""",

    "root_cause": """The root cause is non-atomic state modifications. Developers perform check operations (`if user.gift_card_balance >= amount:`) followed by update operations (`user.gift_card_balance -= amount`) without locking the database row during the transaction window (`select_for_update()`).""",

    "code_audit_manual": """Code Review Manual for Race Conditions & Logic Flaws:
1. Search codebase for balance modifications, promo code redemptions, or inventory updates lacking database locking.
2. Check Django ORM calls for missing `transaction.atomic()` blocks and `select_for_update()`.
3. Inspect multi-step workflows (e.g., Step 1: Submit email, Step 2: Enter OTP, Step 3: Reset password) for direct access to Step 3.
4. Verify rate-limiting on parallel request execution from single user sessions.""",

    "payload_logic": {
        "explanation": "Race condition exploitation relies on sending parallel HTTP requests timed to hit the server within the exact microsecond processing window.",
        "payloads": [
            "Turbo Intruder Engine Script: engine.queue(target_request) in parallel pipeline",
            "HTTP/2 Single-Packet Attack: Group requests into single TCP frame using Burp Repeater",
            "Multi-Use Promo Code Payload: 50x POST /api/v1/coupon/redeem {\"code\": \"FREE100\"}",
            "Balance Transfer Multi-Execution: 20x POST /api/v1/transfer {\"amount\": 100}"
        ]
    },

    "burp_suite_masterclass": """Burp Suite Turbo Intruder & Race Condition Masterclass:
1. Extension Setup: Install 'Turbo Intruder' from Burp BApp Store.
2. Send Request to Turbo Intruder: Intercept target POST request (e.g., redeem coupon) -> Send to Turbo Intruder.
3. Configure Single-Packet Attack Python Script: Use `race-single-packet-attack.py` template script.
4. Launch Attack: Turbo Intruder holds request headers in buffer and releases all payload bodies simultaneously over HTTP/2.
5. Verify Double Execution: Inspect response array for multiple HTTP 200 OK responses where only one was permitted.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Intercept coupon redemption request, configure Turbo Intruder single-packet attack, fire 30 parallel requests, redeem $50 promo code 15 times ($750 balance added), capture race flag.",
        "blue_team": "Defensive Posture: Implement atomic database transactions with row-level locking (`SELECT ... FOR UPDATE`). Use Redis distributed locks (`redlock`) for financial operations. Enforce strict rate-limiting per account."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - Race Conditions & Business Logic",
        "portswigger_url": "https://portswigger.net/web-security/race-conditions",
        "owasp_title": "OWASP Top 10:2021 - Business Logic Security Cheat Sheet",
        "owasp_url": "https://cheatsheetseries.owasp.org/cheatsheets/Business_Logic_Security_Cheat_Sheet.html"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 11: Attacking Application Logic (pp. 441-470)",
            "sub_chapter": "11.3 Race Conditions & Multi-Step Workflows",
            "analysis": "Stuttard & Pinto detail application logic flaws, race conditions, time-of-check to time-of-use flaws, and workflow bypasses."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 14: Race Conditions & Logic Bugs (pp. 261-280)",
            "sub_chapter": "14.2 HTTP/2 Single-Packet Attacks",
            "analysis": "Vickie Li demonstrates running Turbo Intruder scripts to execute single-packet race condition attacks against real-world targets."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 11: Business Logic Vulnerabilities (pp. 236-260)",
            "sub_chapter": "11.1 Gift Card & Balance Multiplication Disclosures",
            "analysis": "Peter Yaworski reviews disclosed bug bounty reports where researchers multiplied gift card balances via parallel requests."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 12: Race Condition Scripting (pp. 221-240)",
            "sub_chapter": "12.1 Writing Asynchronous Python Race Harnesses",
            "analysis": "Barbosa shows using AI to write async Python asyncio/aiohttp scripts for parallel request sending."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 13: Advanced Business Logic Hacking (pp. 291-315)",
            "sub_chapter": "13.1 Database Row Locking & Atomic Transactions",
            "analysis": "Vazquez & Javier walk through identifying race windows in microservices."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 17: Multithreading & Concurrent Execution (pp. 401-414)",
            "sub_chapter": "17.2 Threading Module & Concurrent HTTP Calls",
            "analysis": "Sweigart provides practical code examples using Python threading to fire concurrent requests."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 3: Asynchronous Web Automation (pp. 35-54)",
            "sub_chapter": "3.3 Multithreaded Race Harnesses",
            "analysis": "Seitz demonstrates building multi-threaded Python sockets to release request bytes simultaneously."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "Race Conditions Explained: How Attackers Duplicate Money & Rewards",
            "youtube_url": "https://www.youtube.com/watch?v=1-5-u0i-H-4",
            "analysis_text": "David Bombal demonstrates race conditions, explaining TOCTOU windows and Turbo Intruder."
        },
        {
            "creator": "Vickie Li",
            "title": "HTTP/2 Single-Packet Attacks & Turbo Intruder Deep Dive",
            "youtube_url": "https://www.youtube.com/watch?v=3-s5e5c7W-4",
            "analysis_text": "Vickie Li breaks down single-packet attack mechanics and parallel request timing."
        },
        {
            "creator": "Ryan John",
            "title": "Business Logic Bugs & Coupon Code Exploitation",
            "youtube_url": "https://www.youtube.com/watch?v=7-v3u-4-W-8",
            "analysis_text": "Ryan John presents a complete guide to discovering logic flaws in multi-step shopping carts."
        },
        {
            "creator": "John Hammond",
            "title": "Race Condition Exploitation Live Walkthrough",
            "youtube_url": "https://www.youtube.com/watch?v=8-w3u-5-X-9",
            "analysis_text": "John Hammond performs a live demonstration executing parallel requests to multiply account credit balances."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Revolut Bug Bounty Program",
                "title": "Race Condition in Currency Exchange Enables Infinite Credit Generation",
                "bounty": "$10,000",
                "summary": "A researcher executed parallel currency exchange requests, exploiting non-atomic balance updates to generate unauthorized funds."
            },
            {
                "target": "Starbucks Bug Bounty",
                "title": "Gift Card Balance Race Condition Allows Unlimited Transfers",
                "bounty": "$7,500",
                "summary": "Analyst fired parallel gift card transfer requests, moving $5 gift card balances multiple times simultaneously."
            }
        ],
        "programs": [
            {
                "name": "Revolut Vulnerability Rewards",
                "platform": "HackerOne",
                "scope": "*.revolut.com",
                "beginner_friendly": True
            },
            {
                "name": "Starbucks Bug Bounty",
                "platform": "HackerOne",
                "scope": "*.starbucks.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for Race Scripting: Supply target endpoint details: 'Write a Python script using `asyncio` and `aiohttp` that fires 30 concurrent POST requests to `http://target.com/api/redeem` simultaneously to test for race conditions: [INSERT CODE]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Inspect coupon redemption POST `/api/coupon/redeem`. Notice that firing multiple parallel requests allows double redemption of promo code `FLAG_PROMO`.",
            "guided_step": "Step 1: Send parallel POST requests to `/lab-playground/week-11/target/` with parameter `code=REDEEM_RACE`.\nStep 2: Inspect response for multi-redemption success.\nStep 3: Extract Flag: FLAG{race_condition_limit_overflow_3321}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-11/target/`. Execute concurrent parallel requests to exploit TOCTOU windows and capture the flag."
        }
    },

    "automation_scripts": {
        "python_script": r"""# Python Concurrent Race Condition Tester (exploit_week11.py)
import concurrent.futures
import requests
import sys

def send_race_request(url, payload):
    return requests.post(url, data=payload)

def test_race_condition(target_url):
    print(f"[*] Launching 20 Concurrent Parallel Requests to: {target_url}")
    payload = {"code": "RACE_PROMO_2025"}

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(send_race_request, target_url, payload) for _ in range(20)]
        results = [f.result() for f in futures]

    print(f"[+] Total Responses Received: {len(results)}")
    for res in results:
        if "FLAG{" in res.text:
            print(f"[!] SUCCESS: Race Condition Flag Extracted!")
            print(f"    - Flag Body: {res.text.strip()}")
            return

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-11/target/"
    test_race_condition(target)
""",
        "bash_script": """#!/bin/bash
# Bash Parallel Race Condition Tester (recon_week11.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-11/target/"

echo "[*] Firing 10 background parallel requests to $TARGET_URL"
for i in {1..10}; do
    curl -s -X POST -d "code=RACE_PROMO" "$TARGET_URL" &
done
wait
echo "[+] Background requests completed."
"""
    }
}
