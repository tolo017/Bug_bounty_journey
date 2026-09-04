import os, sys, json, urllib.parse

# 12-Week Dual-Target Scenario Matrix Definition (Scenario 1 for Guided, Scenario 2 for Unguided)
dual_target_matrix = {
    1: [
        # Day 1
        ("Client-Side JS Memory & State Disclosures",
         "/public/static/js/main.77a281bc.chunk.js",
         "FLAG{GUIDED_RECON_JS_8821}",
         "1. Open the target workspace file asset below.\n2. Pretty-print the minified layout and examine lines 12–15.\n3. Identify the static token assigned to the environment gateway.",
         "/app/secure-session-manager.js",
         "FLAG{UNGUIDED_CONSOLE_BYPASS_4412}",
         "Audit the session manager script to extract the administrative clearance token."),
        # Day 2
        ("Subdomain Architecture & Cloud Infrastructure Asset Alignment",
         "DNS Zone Export: target-enterprise.com",
         "FLAG{GUIDED_CNAME_LEAK_1102}",
         "1. Access the target zone index layout configuration mapping.\n2. Track down the canonical name pointer (CNAME) record strings.\n3. Isolate the abandoned asset pointing to a dead cloud storage node.",
         "/config/storage-policy.json",
         "FLAG{UNGUIDED_S3_TAKEOVER_SUCCESS_4921}",
         "Audit the JSON parameters to locate an orphaned S3 bucket pointer signature."),
        # Day 3
        ("Passive DNS Enumeration Lookup",
         "DNS Query: TXT target-enterprise.com",
         "FLAG{GUIDED_TXT_RECORD_LEAK_3341}",
         "1. Review the external text record block signatures.\n2. Identify the hardcoded string leak referencing development credentials.",
         "DNS Query: MX target-enterprise.com",
         "FLAG{UNGUIDED_INTERNAL_MX_GATEWAY_2290}",
         "Extract the hidden host pattern tracking the backend development mail server."),
        # Day 4
        ("Exposed Version Control (.git) Direct Extraction",
         "Git Object Commit History Log: /.git/logs/HEAD",
         "FLAG{GIT_COMMIT_HIST_EXPOSURE_0042}",
         "1. Inspect the historical commit log messages.\n2. Identify the commit where staging API keys were accidentally pushed.",
         "Git Configuration: /.git/config",
         "FLAG{DUMPED_SOURCE_CODE_RECOVERY_7741}",
         "Extract the remote repository origin URL containing embedded token credentials."),
        # Day 5
        ("Public Cloud Infrastructure Metadata Harvesting",
         "HTTP Response: http://169.254.169.254/latest/meta-data/",
         "FLAG{IMDSV1_SSR_LEAK_9012}",
         "1. Send an HTTP request to the AWS metadata IP endpoint.\n2. Traverse the security-credentials directory to find the IAM role token.",
         "HTTP Response: http://169.254.169.254/latest/user-data/",
         "FLAG{METADATA_FLAVOR_BYPASS_3321}",
         "Extract the cloud instance launch script containing bootstrap secrets.")
    ],
    2: [
        ("Staging Environment Header Analysis",
         "HTTP Response Headers: https://staging.target.com",
         "FLAG{VERBOSE_HEADER_SIGNATURE_2210}",
         "1. Inspect the server response headers.\n2. Locate the custom internal header leaking server software versions.",
         "Application Stack Trace: /api/v1/error-log",
         "FLAG{VERBOSE_STACK_TRACE_EXPOSURE_9941}",
         "Trigger a server error to extract internal file system path leaks."),
        ("Azure App Service CNAME Alias Takeover", "DNS Query: CNAME app.target.com", "FLAG{AZURE_ALIAS_TAKEOVER_3312}", "1. Audit CNAME record for azurewebsites.net alias.\n2. Verify 404 App Not Found status.", "/config/azure-deploy.json", "FLAG{AZURE_CONTAINER_CLAIMED_8812}", "Claim the orphaned Azure web app name."),
        ("GitHub Pages Orphaned Domain Reclamation", "DNS Query: CNAME docs.target.com", "FLAG{GITHUB_PAGES_DANGLING_5512}", "1. Identify dangling github.io CNAME record.\n2. Confirm 404 response body.", "/public/CNAME", "FLAG{GITHUB_PAGES_SUBDOMAIN_CAPTURED_1120}", "Reclaim the CNAME domain in GitHub repository settings."),
        ("S3 Bucket Access Control Policy Audit", "AWS CLI: aws s3 ls s3://target-assets", "FLAG{S3_POLICY_LEAK_SEC_4412}", "1. Query public S3 bucket bucket permissions.\n2. Extract sensitive uploaded documents.", "/config/aws-s3-config.xml", "FLAG{S3_ANONYMOUS_WRITE_EXPLOITED_2219}", "Upload a proof-of-concept file to the writable S3 bucket."),
        ("Exposed Configuration & Environment Files", "HTTP GET: /.env", "FLAG{ENV_FILE_DATABASE_CRED_3310}", "1. Fetch root /.env configuration file.\n2. Extract database password string.", "HTTP GET: /config.json", "FLAG{CONFIG_JSON_AWS_KEY_EXPOSED_7712}", "Parse config.json to locate hardcoded AWS credentials.")
    ]
}

# Generate 60-day dual target challenge data across all 12 weeks
quiz_matrix = {
    1: [
        {
            "q1_question": "1. What is the main security risk when compiling detailed environment variables into public frontend JavaScript bundles?",
            "q1_options": ["Information Leakage exposing undocumented development assets and access keys.", "Server-Side SQL Injection via relational database connection queries."],
            "q1_correct": "Information Leakage exposing undocumented development assets and access keys.",
            "q2_question": "2. Which browser utility allows a security researcher to pause execution and analyze state variables in memory?",
            "q2_options": ["Network interception proxy rules.", "Browser Developer Tools Source tab breakpoints."],
            "q2_correct": "Browser Developer Tools Source tab breakpoints."
        },
        {
            "q1_question": "1. What core DNS configuration state allows an external actor to perform a subdomain takeover exploit?",
            "q1_options": ["A dangling CNAME record pointing to an abandoned or deleted third-party hosting bucket.", "An authoritative A record referencing a dedicated static IP address."],
            "q1_correct": "A dangling CNAME record pointing to an abandoned or deleted third-party hosting bucket.",
            "q2_question": "2. Which error response signature from a cloud provider strongly indicates a cloud resource footprint is available for takeover?",
            "q2_options": ["'403 Forbidden: IP address blacklisted'", "'404 Not Found: No Such Bucket' or 'The specified bucket does not exist'"],
            "q2_correct": "'404 Not Found: No Such Bucket' or 'The specified bucket does not exist'"
        },
        {
            "q1_question": "1. Why do bug bounty hunters audit DNS TXT records during the passive reconnaissance phase?",
            "q1_options": ["TXT records frequently leak verification strings, internal network blocks, or SPF security policies.", "TXT records dynamically execute client-side JavaScript payloads inside the browser."],
            "q1_correct": "TXT records frequently leak verification strings, internal network blocks, or SPF security policies.",
            "q2_question": "2. Which DNS record type directs corporate electronic mail traffic and leaks partner infrastructure dependencies?",
            "q2_options": ["MX (Mail Exchanger) Records.", "PTR (Pointer) Records."],
            "q2_correct": "MX (Mail Exchanger) Records."
        },
        {
            "q1_question": "1. If an organization accidentally exposes a public root /.git/ directory, how can a hunter reconstruct the full source code?",
            "q1_options": ["By executing raw dictionary brute-forcing against secret admin panels.", "By programmatically downloading the object tree and extracting historical commit configurations."],
            "q1_correct": "By programmatically downloading the object tree and extracting historical commit configurations.",
            "q2_question": "2. Which native Git file exposes local repository configurations, absolute directory paths, and remote branch links?",
            "q2_options": ["/.git/config", "/.git/HEAD"],
            "q2_correct": "/.git/config"
        },
        {
            "q1_question": "1. What is the default, unauthenticated local IP address utilized to harvest instance metadata on AWS cloud instances?",
            "q1_options": ["169.254.169.254", "127.0.0.1"],
            "q1_correct": "169.254.169.254",
            "q2_question": "2. What protection strategy prevents unauthorized automation utilities from harvesting IMDSv1 cloud metadata via SSRF?",
            "q2_options": ["Enforcing IMDSv2 which mandates a session token header via a PUT request.", "Implementing basic base64 parameter encoding on URL values."],
            "q2_correct": "Enforcing IMDSv2 which mandates a session token header via a PUT request."
        }
    ]
}

weeks_meta = [
    (1, "Target Reconnaissance, OSINT, & Client-Side JS Deconstruction", "FLAG{recon_js_map_key_8492}"),
    (2, "Subdomain Takeovers & Information Disclosure", "FLAG{subdomain_takeover_cname_alias_3910}"),
    (3, "Broken Authentication & Session Management Logic", "FLAG{broken_auth_jwt_none_alg_9921}"),
    (4, "IDOR & Broken Object Level Authentication (BOLA)", "FLAG{idor_bola_object_tamper_1120}"),
    (5, "Cross-Site Scripting (XSS) - Reflected, Stored, and DOM Attacks", "FLAG{xss_dom_reflected_payload_5521}"),
    (6, "Cross-Site Request Forgery (CSRF) & SameSite Defenses", "FLAG{csrf_samesite_bypass_token_8832}"),
    (7, "SQL Injection (SQLi) & Database Exfiltration", "FLAG{sqli_union_select_database_7721}"),
    (8, "Server-Side Request Forgery (SSRF) & Cloud Metadata Attacks", "FLAG{ssrf_cloud_imds_metadata_6612}"),
    (9, "XML External Entity (XXE) Injection", "FLAG{xxe_file_disclosure_entity_4412}"),
    (10, "Server-Side Template Injection (SSTI) & Remote Code Execution (RCE)", "FLAG{ssti_rce_jinja_expression_3312}"),
    (11, "Race Conditions & Business Logic Vulnerabilities", "FLAG{race_condition_limit_bypass_2212}"),
    (12, "API Hacking, Mass Assignment, & Final Portfolio Consolidation", "FLAG{api_mass_assignment_admin_1102}")
]

def build_day_dict(week_num, d_num, d_title, g_day_num, week_title, final_flag):
    # Retrieve or dynamically construct dual target scenarios
    if week_num in dual_target_matrix:
        d_tuple = dual_target_matrix[week_num][d_num - 1]
        topic_title, g_path, g_flag, g_steps, ug_path, ug_flag, ug_objective = d_tuple
    else:
        topic_title = f"{d_title} Scenarios"
        g_path = f"/public/assets/w{week_num}d{d_num}/scenario1-guided.js"
        g_flag = f"FLAG{{GUIDED_W{week_num}D{d_num}_EXPLOIT_{1000 + g_day_num}}}"
        g_steps = f"1. Inspect target workspace file '{g_path}'.\n2. Analyze parameter validation logic.\n3. Extract the verification token."
        ug_path = f"/app/backend/w{week_num}d{d_num}/scenario2-unguided.py"
        ug_flag = f"FLAG{{UNGUIDED_W{week_num}D{d_num}_SANDBOX_{2000 + g_day_num}}}"
        ug_objective = f"Audit script '{ug_path}' independently to locate the administrative flag key."

    d_flag = g_flag if d_num < 5 else final_flag
    yt_query = f"https://www.youtube.com/results?search_query={urllib.parse.quote(d_title + ' ' + week_title + ' bug bounty')}"

    quiz_data = {
        "q1_question": f"1. What is the primary operational risk when auditing {d_title} in production?",
        "q1_options": [f"Unvalidated parameter processing leading to {week_title} vulnerability.", "Hardware memory overheating on local router."],
        "q1_correct": f"Unvalidated parameter processing leading to {week_title} vulnerability.",
        "q2_question": f"2. Which security defense mitigates {d_title} at the server boundary?",
        "q2_options": ["Enforcing strict server-side validation and authorization checks.", "Disabling CSS styling stylesheets."],
        "q2_correct": "Enforcing strict server-side validation and authorization checks."
    }
    if week_num in quiz_matrix:
        quiz_data = quiz_matrix[week_num][d_num - 1]

    py_script = f'# Day {d_num} Python Automation Tool for {d_title}\nimport requests, sys\n\ndef scan_target(target_url):\n    print(f"[*] Scanning {{target_url}} for {d_title}...")\n    try:\n        res = requests.get(target_url, timeout=10)\n        if "FLAG" in res.text:\n            print("[!] VULNERABILITY CONFIRMED! Flag found in response.")\n        else:\n            print("[+] Target responded normally.")\n    except Exception as e:\n        print(f"[-] Error: {{e}}")\n\nif __name__ == "__main__":\n    url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-{week_num}/day-{d_num}/target/"\n    scan_target(url)\n'

    sh_script = f'#!/bin/bash\n# Day {d_num} Bash Recon Tool for {d_title}\nTARGET_URL=$1\nif [ -z "$TARGET_URL" ]; then\n    TARGET_URL="http://localhost:8000/lab-playground/week-{week_num}/day-{d_num}/target/"\nfi\n\necho "[*] Fetching target response from: $TARGET_URL"\ncurl -s "$TARGET_URL" | grep -i "FLAG"\n'

    return {
        "day_number": d_num,
        "global_day_number": g_day_num,
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

        "hunters_perspective": f"Professional bug bounty hunters approach {d_title} by capturing baseline application traffic in Burp Suite, identifying unvalidated parameters, and testing boundary conditions. They systematically alter headers, JSON keys, and encoding schemas to uncover high-severity bugs (P1/P2) on enterprise bug bounty programs.",

        "root_cause": f"The root cause of {d_title} lies in flawed architectural design or coding oversights: trusting client-side inputs without rigorous server-side validation, missing object-level access controls, or failing to enforce context-aware escaping before passing data into execution sinks.",

        "code_audit_manual": f"""Code Audit Manual for Day {d_num} ({d_title}):

[VULNERABLE CODE SNIPPET (Python / JavaScript)]
# Vulnerable execution path
def handle_request(request):
    user_input = request.GET.get('param')
    # CRITICAL BUG: Unvalidated parameter passed directly to internal logic
    result = execute_logic(user_input)
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
1. Search codebase for unparameterized inputs handling {d_title}.
2. Verify that strict authentication and object-level permission checks are enforced.
3. Ensure context-aware escaping is applied prior to rendering output or executing database queries.""",

        "payload_logic": {
            "explanation": f"Step-by-step logic for crafting Day {d_num} exploit payloads for {d_title}:",
            "payloads": [
                f"# Baseline Exploit Payload for {d_title}",
                f"GET /api/v1/resource?action={urllib.parse.quote(d_title)} HTTP/1.1",
                f"Host: targetmaster.app",
                f"Authorization: Bearer eyJhbGciOiJub25lIn0.eyJ1c2VyIjoiYWRtaW4ifQ.",
                f"{g_flag}"
            ]
        },

        "burp_suite_masterclass": f"""Burp Suite Masterclass Playbook ({d_title}):
1. Proxy Intercept: Enable Burp Proxy Intercept and capture baseline traffic for {d_title}.
2. Repeater Isolation: Right-click request -> Send to Repeater (Ctrl+R). Isolate target parameter inputs.
3. Intruder Fuzzing: Send to Intruder (Ctrl+I). Set payload positions on the parameter. Select SecLists wordlists.
4. Turbo Intruder Concurrency: Use Turbo Intruder script to test HTTP/2 single-packet multi-stream concurrency for race conditions and rate-limit bypasses.
5. Custom Match & Replace: Configure Proxy -> Match and Replace to automatically inject custom authorization headers.""",

        "dual_perspective": {
            "red_team": f"RED TEAM OFFENSIVE PLAYBOOK:\n- Tactical Goal: Exploit {d_title} to achieve unauthorized access or data exfiltration.\n- Execution: Map target parameters, craft bypass payloads, exfiltrate data, and demonstrate business impact.\n- Post-Exploitation: Escalate privileges to administrator status and document proof-of-concept steps.",
            "blue_team": f"BLUE TEAM DEFENSIVE HARDENING:\n- Detection Goal: Monitor application logs for abnormal parameter patterns in {d_title}.\n- Raw Nginx Log Indicator: 192.168.1.50 - - [10/May/2025:12:00:01 +0000] \"GET /api/v1/test?param={urllib.parse.quote(d_title)} HTTP/1.1\" 200 1024\n- Secure Remediation: Enforce strict server-side validation, deploy WAF inspection rules, and apply principle of least privilege."
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
                    "summary": f"Disclosed bug bounty write-up detailing how a security researcher exploited {d_title} to gain unauthorized access."
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
            "ai_hunting_guide": f"ChatGPT Auditing Prompt: 'Analyze the following code block for {d_title} vulnerabilities. Identify the root cause, construct a proof-of-concept payload, and provide secure code remediations: [INSERT CODE]'"
        },

        "quiz": {
            "q1_question": quiz_data["q1_question"],
            "q1_options": quiz_data["q1_options"],
            "q1_correct": quiz_data["q1_correct"],
            "q2_question": quiz_data["q2_question"],
            "q2_options": quiz_data["q2_options"],
            "q2_correct": quiz_data["q2_correct"],
            "question": quiz_data["q1_question"],
            "options": quiz_data["q1_options"],
            "correct_answer": quiz_data["q1_correct"]
        },

        "playground": {
            "guided_path": g_path,
            "guided_flag_solution": g_flag,
            "guided_steps": g_steps,
            "unguided_path": ug_path,
            "unguided_flag_solution": ug_flag,
            "unguided_objective": ug_objective,
            "guided_target_link": f"https://targetmaster.app/week-{week_num}/day-{d_num}/guided/",
            "unguided_target_link": f"https://targetmaster.app/week-{week_num}/day-{d_num}/unguided/",
            "guided_walkthrough": f"Inspect the target instance for Week {week_num} Day {d_num} ({d_title}) and extract the flag ({g_flag}).",
            "guided_code": f"curl -s http://localhost:8000/lab-playground/week-{week_num}/day-{d_num}/target/",
            "target_endpoint": f"/lab-playground/week-{week_num}/day-{d_num}/target/"
        },

        "automation_scripts": {
            "python_script": py_script,
            "bash_script": sh_script
        }
    }

for w_num, week_title, final_flag in weeks_meta:
    start_global_day = (w_num - 1) * 5 + 1
    days_dict = {}
    day_titles = [
        f"{week_title} - Part 1",
        f"{week_title} - Part 2",
        f"{week_title} - Part 3",
        f"{week_title} - Part 4",
        f"{week_title} - Part 5"
    ]
    for d_num in range(1, 6):
        g_day_num = start_global_day + d_num - 1
        d_title = day_titles[d_num - 1]
        days_dict[d_num] = build_day_dict(w_num, d_num, d_title, g_day_num, week_title, final_flag)

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
    print(f"Successfully generated dual-target curriculum module: {file_path}")

print("All 12 curriculum week modules updated with distinct Scenario 1 and Scenario 2 dual-target challenges!")
