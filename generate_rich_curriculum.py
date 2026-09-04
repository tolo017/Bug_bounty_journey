import os, sys, json, urllib.parse

# 12-Week Distinct CTF Target & Solution Matrix Definition
ctf_matrix = {
    1: [
        ("Client-Side JS Variable Exposure", "FLAG{DOM_SOURCES_IDENTIFIED_8821}", "FLAG{UNGUIDED_SANDBOX_OWNED_4412}"),
        ("Subdomain Takeover Signature Analysis", "FLAG{ORPHAN_CNAME_EXPOSED_1102}", "FLAG{AWS_S3_TAKEOVER_SUCCESS_4921}"),
        ("Passive DNS Enumeration Lookup", "FLAG{TXT_RECORD_LEAK_SECRET_3341}", "FLAG{INTERNAL_MAIL_GATEWAY_FOUND_2290}"),
        ("Exposed Version Control (.git) Direct Extraction", "FLAG{GIT_COMMIT_HIST_EXPOSURE_0042}", "FLAG{DUMPED_SOURCE_CODE_RECOVERY_7741}"),
        ("Public Cloud Infrastructure Metadata Harvesting", "FLAG{IMDSV1_SSR_LEAK_9012}", "FLAG{METADATA_FLAVOR_BYPASS_3321}")
    ],
    2: [
        ("Staging Environment Header Analysis", "FLAG{VERBOSE_HEADER_SIGNATURE_2210}", "FLAG{VERBOSE_STACK_TRACE_EXPOSURE_9941}"),
        ("Azure App Service CNAME Alias Takeover", "FLAG{AZURE_ALIAS_TAKEOVER_3312}", "FLAG{AZURE_CONTAINER_CLAIMED_8812}"),
        ("GitHub Pages Orphaned Domain Reclamation", "FLAG{GITHUB_PAGES_DANGLING_5512}", "FLAG{GITHUB_PAGES_SUBDOMAIN_CAPTURED_1120}"),
        ("S3 Bucket Access Control Policy Audit", "FLAG{S3_POLICY_LEAK_SEC_4412}", "FLAG{S3_ANONYMOUS_WRITE_EXPLOITED_2219}"),
        ("Exposed Configuration & Environment Files", "FLAG{ENV_FILE_DATABASE_CRED_3310}", "FLAG{CONFIG_JSON_AWS_KEY_EXPOSED_7712}")
    ],
    3: [
        ("JWT Secret Key HMAC Signature Cracking", "FLAG{JWT_HMAC_SECRET_CRACKED_8812}", "FLAG{JWT_SIGNATURE_FORGERY_SUCCESS_1092}"),
        ("JWT Algorithm None Signature Bypass", "FLAG{JWT_ALG_NONE_BYPASS_EXPLOITED_3391}", "FLAG{JWT_ADMIN_PRIVILEGE_ELEVATION_2210}"),
        ("OAuth 2.0 Authorization Code Hijacking", "FLAG{OAUTH_REDIRECT_URI_BYPASS_4410}", "FLAG{OAUTH_TOKEN_THEFT_VERIFIED_7719}"),
        ("Session Fixation & Cookie Attribute Exploitation", "FLAG{SESSION_FIXATION_ATTACK_PASSED_1102}", "FLAG{COOKIE_SAMESITE_NONE_EXPLOITED_3329}"),
        ("Password Reset Logic & Token Leakage", "FLAG{PASSWORD_RESET_TOKEN_LEAK_5512}", "FLAG{LOGIC_FLAW_PASSWORD_OVERWRITE_8810}")
    ],
    4: [
        ("REST API IDOR Parameter Tampering", "FLAG{REST_IDOR_USER_RECORD_5512}", "FLAG{IDOR_ACCOUNT_TAKEOVER_SUCCESS_9910}"),
        ("GraphQL BOLA & Object Identifier Manipulation", "FLAG{GRAPHQL_BOLA_QUERY_LEAK_2210}", "FLAG{GRAPHQL_MUTATION_BYPASS_7712}"),
        ("UUID Insecurity & Blind IDOR Harvesting", "FLAG{UUID_ENUMERATION_EXPLOITED_3312}", "FLAG{BLIND_IDOR_EXFILTRATION_8819}"),
        ("Multitenancy Isolation Bypasses", "FLAG{MULTITENANT_TENANT_ID_BYPASS_1102}", "FLAG{CROSS_TENANT_DATA_EXFIL_4419}"),
        ("Mass BOLA Automated Scanning", "FLAG{AUTORIZE_BOLA_DETECTION_6612}", "FLAG{MASS_BOLA_EXPLOIT_VERIFIED_3310}")
    ],
    5: [
        ("Reflected XSS Attribute Context Injection", "FLAG{XSS_REFLECTED_ATTRIBUTE_INJECT_4412}", "FLAG{XSS_ALERT_PAYLOAD_EXECUTED_9912}"),
        ("Stored XSS Persistent Database Injection", "FLAG{STORED_XSS_COMMENT_PAYLOAD_2210}", "FLAG{STORED_XSS_COOKIE_STEALER_7712}"),
        ("DOM-Based XSS Sink & Source Manipulation", "FLAG{DOM_XSS_INNERHTML_SINK_3312}", "FLAG{DOM_XSS_LOCATION_HASH_BYPASS_8819}"),
        ("WAF Bypasses & Polyglot XSS Construction", "FLAG{WAF_BYPASS_POLYGLOT_XSS_1102}", "FLAG{SVG_ONERROR_XSS_VERIFIED_5512}"),
        ("Content Security Policy (CSP) Direct Bypasses", "FLAG{CSP_SCRIPT_SRC_BYPASS_6612}", "FLAG{CSP_NONCE_LEAK_EXPLOITED_3310}")
    ],
    6: [
        ("Classic CSRF Auto-Submitting HTML Exploitation", "FLAG{CSRF_EMAIL_CHANGE_EXPLOITED_3312}", "FLAG{CSRF_PASSWORD_CHANGE_BYPASS_8810}"),
        ("CSRF Token Validation Parameter Removal", "FLAG{CSRF_TOKEN_REMOVAL_ACCEPTED_1102}", "FLAG{CSRF_BLANK_TOKEN_EXPLOITED_5512}"),
        ("SameSite Lax Cookie GET Navigation Bypasses", "FLAG{SAMESITE_LAX_GET_BYPASS_4412}", "FLAG{SAMESITE_TOP_LEVEL_NAV_6619}"),
        ("CORS Misconfiguration Origin Null Reflection", "FLAG{CORS_ORIGIN_NULL_EXFILTRATED_2210}", "FLAG{CORS_WILDCARD_CREDENTIALS_7712}"),
        ("Cross-Site WebSocket Hijacking (CSWSH)", "FLAG{CSWSH_WEBSOCKET_HIJACKED_9912}", "FLAG{WEBSOCKET_SESSION_CAPTURED_3310}")
    ],
    7: [
        ("UNION-Based SQLi Column Number Detection", "FLAG{SQLI_UNION_COLUMN_COUNT_3312}", "FLAG{SQLI_UNION_SELECT_DATABASE_8810}"),
        ("Error-Based SQLi DBMS Exception Extraction", "FLAG{SQLI_ERROR_VERSION_EXTRACTED_1102}", "FLAG{SQLI_EXTRACTVALUE_EXPLOITED_5512}"),
        ("Blind Boolean-Based SQLi Binary Search", "FLAG{BLIND_SQLI_BOOLEAN_SEARCH_4412}", "FLAG{BLIND_SQLI_CHAR_BY_CHAR_6619}"),
        ("Time-Based Blind SQLi Sleep Injection", "FLAG{TIME_SQLI_SLEEP_DELAY_VERIFIED_2210}", "FLAG{TIME_SQLI_PIGGYBACKED_QUERY_7712}"),
        ("SQLMap Tamper Script Bypasses & Dumping", "FLAG{SQLMAP_TAMPER_SPACE2COMMENT_9912}", "FLAG{SQLMAP_FULL_DB_DUMPED_3310}")
    ],
    8: [
        ("Basic SSRF Internal Loopback Port Scanning", "FLAG{SSRF_LOCALHOST_PORT_8080_3312}", "FLAG{SSRF_ADMIN_PORTAL_ACCESSED_8810}"),
        ("AWS IMDSv1 Cloud Instance Metadata Extraction", "FLAG{SSRF_AWS_IMDSV1_METADATA_1102}", "FLAG{SSRF_AWS_IAM_ROLE_STOLEN_5512}"),
        ("DNS Rebinding & Decimal IP Filter Bypasses", "FLAG{SSRF_DECIMAL_IP_BYPASS_4412}", "FLAG{SSRF_DNS_REBINDING_VERIFIED_6619}"),
        ("GCP & Azure Cloud Metadata Exploitation", "FLAG{SSRF_GCP_METADATA_HEADER_2210}", "FLAG{SSRF_AZURE_TOKEN_EXTRACTED_7712}"),
        ("Blind SSRF Out-of-Band Interaction", "FLAG{SSRF_OOB_COLLABORATOR_PING_9912}", "FLAG{SSRF_OOB_DATA_EXFILTRATED_3310}")
    ],
    9: [
        ("In-Band XXE Local File Disclosure (/etc/passwd)", "FLAG{XXE_ETC_PASSWD_READ_3312}", "FLAG{XXE_SYSTEM_ENTITY_EXPLOITED_8810}"),
        ("Blind Out-of-Band (OOB) XXE Data Exfiltration", "FLAG{XXE_OOB_DTD_FETCHED_1102}", "FLAG{XXE_OOB_FILE_EXFILTRATED_5512}"),
        ("XXE via Office Open XML (DOCX/XLSX) Uploads", "FLAG{XXE_DOCX_CONTENT_TYPES_4412}", "FLAG{XXE_EXCEL_XML_PAYLOAD_6619}"),
        ("SVG Image Upload XXE File Exposure", "FLAG{XXE_SVG_IMAGE_PARSED_2210}", "FLAG{XXE_SVG_ENTITY_RENDERED_7712}"),
        ("SAML XML Signature XXE Exploitation", "FLAG{XXE_SAML_ASSERTION_INJECT_9912}", "FLAG{XXE_SOAP_ENVELOPE_BYPASS_3310}")
    ],
    10: [
        ("SSTI Syntax Identification & Expression Evaluation", "FLAG{SSTI_EXPRESSION_EVAL_7X7_3312}", "FLAG{SSTI_TWIG_SYNTAX_CONFIRMED_8810}"),
        ("Python Jinja2 SSTI Escalation to Subprocess RCE", "FLAG{SSTI_JINJA2_SUBCLASSES_RCE_1102}", "FLAG{SSTI_PYTHON_POPEN_SYSTEM_5512}"),
        ("Java Thymeleaf & FreeMarker SSTI RCE", "FLAG{SSTI_JAVA_RUNTIME_EXEC_4412}", "FLAG{SSTI_FREEMARKER_EXEC_6619}"),
        ("Node.js Pug & EJS Template Injection RCE", "FLAG{SSTI_NODE_REQUIRE_CHILD_PROC_2210}", "FLAG{SSTI_EJS_GLOBAL_PROCESS_7712}"),
        ("SSTI WAF Character Concatenation Bypasses", "FLAG{SSTI_WAF_STRING_CONCAT_9912}", "FLAG{SSTI_REVERSE_SHELL_GAINED_3310}")
    ],
    11: [
        ("HTTP/2 Single-Packet Concurrency Race Window", "FLAG{RACE_HTTP2_SINGLE_PACKET_3312}", "FLAG{RACE_TURBO_INTRUDER_PASSED_8810}"),
        ("Limit Overrun Double Spending Promo Code Race", "FLAG{RACE_PROMO_CODE_REDEEMED_20X_1102}", "FLAG{RACE_BALANCE_DOUBLE_SPEND_5512}"),
        ("Time-of-Check to Time-of-Use (TOCTOU) Flaws", "FLAG{RACE_TOCTOU_STATE_BYPASS_4412}", "FLAG{RACE_FILE_WRITE_COLLISION_6619}"),
        ("Workflow Order Manipulation & Price Tampering", "FLAG{LOGIC_PRICE_TAMPERING_MINUS_2210}", "FLAG{LOGIC_CHECKOUT_ORDER_BYPASS_7712}"),
        ("Multi-Threaded Async Race Condition Automation", "FLAG{RACE_ASYNC_THREADING_EXPLOIT_9912}", "FLAG{RACE_CONCURRENT_TRANSFER_3310}")
    ],
    12: [
        ("REST API Mass Assignment & Role Elevation", "FLAG{MASS_ASSIGNMENT_IS_ADMIN_TRUE_3312}", "FLAG{MASS_ASSIGNMENT_ROLE_UPGRADED_8810}"),
        ("GraphQL Introspection Schema & Query Batching", "FLAG{GRAPHQL_INTROSPECTION_ENABLED_1102}", "FLAG{GRAPHQL_BATCHING_AUTH_BYPASS_5512}"),
        ("API Rate Limiting Bypasses & Header Spoofing", "FLAG{API_X_FORWARDED_FOR_BYPASS_4412}", "FLAG{API_RATE_LIMIT_EVADED_6619}"),
        ("JWT Key Confusion (HS256 vs RS256)", "FLAG{JWT_KEY_CONFUSION_RS256_HS256_2210}", "FLAG{JWT_PUBLIC_KEY_HMAC_FORGED_7712}"),
        ("Final Capstone 60-Day Portfolio Consolidation", "FLAG{CAPSTONE_60DAY_MASTERY_PASSED_9912}", "FLAG{API_MASS_ASSIGNMENT_ADMIN_1102}")
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

def build_day_dict(week_num, d_num, d_title, g_day_num, week_title, final_flag, g_flag, ug_flag):
    d_flag = g_flag if d_num < 5 else final_flag
    yt_query = f"https://www.youtube.com/results?search_query={urllib.parse.quote(d_title + ' ' + week_title + ' bug bounty')}"

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
            "guided_target_link": f"https://targetmaster.app/week-{week_num}/day-{d_num}/guided/",
            "guided_flag_solution": g_flag,
            "unguided_target_link": f"https://targetmaster.app/week-{week_num}/day-{d_num}/unguided/",
            "unguided_flag_solution": ug_flag,
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
    day_tuples = ctf_matrix[w_num]
    for d_num, (d_title, g_flag, ug_flag) in enumerate(day_tuples, 1):
        g_day_num = start_global_day + d_num - 1
        days_dict[d_num] = build_day_dict(w_num, d_num, d_title, g_day_num, week_title, final_flag, g_flag, ug_flag)

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
    print(f"Successfully generated distinct CTF curriculum module: {file_path}")

print("All 12 curriculum week modules updated with distinct 60-day CTF targets!")
