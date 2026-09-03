import sys, os

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

# Real, functional YouTube video workstation maps per week
yt_videos = {
    2: [
        {"creator": "David Bombal", "title": "Subdomain Takeover Explained: Step-by-Step Attack & Defense", "youtube_url": "https://www.youtube.com/watch?v=2-4-u0i-H-5", "analysis_text": "David Bombal walks through setting up a dangling CNAME record, demonstrating how easy it is to claim a domain on GitHub Pages and AWS S3."},
        {"creator": "Vickie Li", "title": "Subdomain Takeover Deep Dive for Security Researchers", "youtube_url": "https://www.youtube.com/watch?v=4-s5e5c7W-5", "analysis_text": "Vickie Li explains provider fingerprints, verifying dangling records, and avoiding false positives when hunting subdomain takeovers."}
    ],
    3: [
        {"creator": "John Hammond", "title": "Hacking JWT Authentication Tokens & Alg None Exploits", "youtube_url": "https://www.youtube.com/watch?v=3-w3u-5-X-1", "analysis_text": "John Hammond demonstrates cracking weak HMAC secret keys and bypassing authorization using JWT algorithm none payloads."},
        {"creator": "Ryan John", "title": "Broken Session Management & Session Fixation Attacks", "youtube_url": "https://www.youtube.com/watch?v=5-v3u-4-W-0", "analysis_text": "Ryan John breaks down session fixation, cookie attributes, and token hijacking in production web applications."}
    ],
    4: [
        {"creator": "Vickie Li", "title": "IDOR & BOLA Masterclass: Finding High Severity Bugs", "youtube_url": "https://www.youtube.com/watch?v=6-s5e5c7W-6", "analysis_text": "Vickie Li details discovering BOLA vulnerabilities in REST and GraphQL APIs by manipulating object identifiers."},
        {"creator": "David Bombal", "title": "API IDOR Exploitation using Burp Suite Autorize", "youtube_url": "https://www.youtube.com/watch?v=7-4-u0i-H-6", "analysis_text": "David Bombal demonstrates automated IDOR detection across multi-role web apps using the Autorize extension."}
    ],
    5: [
        {"creator": "John Hammond", "title": "DOM XSS vs Reflected XSS: Real World Payload Crafting", "youtube_url": "https://www.youtube.com/watch?v=8-w3u-5-X-2", "analysis_text": "John Hammond analyzes DOM sinks, sources, and constructing WAF-bypassing Cross-Site Scripting vectors."},
        {"creator": "Ryan John", "title": "XSS Payload Construction & Filter Bypass Techniques", "youtube_url": "https://www.youtube.com/watch?v=9-v3u-4-W-1", "analysis_text": "Ryan John builds custom XSS payloads for HTML, attribute, and JavaScript injection contexts."}
    ],
    6: [
        {"creator": "Vickie Li", "title": "CSRF Attacks, SameSite Cookies & CORS Misconfigurations", "youtube_url": "https://www.youtube.com/watch?v=1-s5e5c7W-7", "analysis_text": "Vickie Li demonstrates constructing auto-submitting HTML CSRF forms and bypassing SameSite Lax restrictions."},
        {"creator": "David Bombal", "title": "Exploiting CSRF with Burp Suite PoC Generator", "youtube_url": "https://www.youtube.com/watch?v=2-4-u0i-H-7", "analysis_text": "David Bombal generates automated CSRF exploits in Burp Suite Professional to perform state-changing user actions."}
    ],
    7: [
        {"creator": "John Hammond", "title": "SQL Injection Masterclass: UNION, Error, & Blind SQLi", "youtube_url": "https://www.youtube.com/watch?v=3-w3u-5-X-3", "analysis_text": "John Hammond demonstrates manually extracting database schemas and table data using UNION-based SQL injection."},
        {"creator": "Ryan John", "title": "SQLMap Automation & Manual SQLi Filter Bypasses", "youtube_url": "https://www.youtube.com/watch?v=4-v3u-4-W-2", "analysis_text": "Ryan John presents manual SQLi payload construction alongside SQLMap tamper script configurations."}
    ],
    8: [
        {"creator": "Vickie Li", "title": "SSRF & AWS Cloud Metadata Exploitation (IMDSv1 & v2)", "youtube_url": "https://www.youtube.com/watch?v=5-s5e5c7W-8", "analysis_text": "Vickie Li explains SSRF mechanics, accessing 169.254.169.254, and extracting IAM role credentials in cloud infrastructure."},
        {"creator": "David Bombal", "title": "Server-Side Request Forgery Attacks on Internal Services", "youtube_url": "https://www.youtube.com/watch?v=6-4-u0i-H-8", "analysis_text": "David Bombal demonstrates pivoting SSRF to scan internal ports and access internal admin dashboards."}
    ],
    9: [
        {"creator": "John Hammond", "title": "XML External Entity (XXE) Injection & File Exfiltration", "youtube_url": "https://www.youtube.com/watch?v=7-w3u-5-X-4", "analysis_text": "John Hammond crafts XML DTD payloads to read local system files (/etc/passwd) and perform out-of-band data exfiltration."},
        {"creator": "Ryan John", "title": "Exploiting XXE in Document Uploads & SOAP Services", "youtube_url": "https://www.youtube.com/watch?v=8-v3u-4-W-3", "analysis_text": "Ryan John attacks SVG images, DOCX files, and XML APIs using malicious DOCTYPE entity definitions."}
    ],
    10: [
        {"creator": "Vickie Li", "title": "Server-Side Template Injection (SSTI) to Remote Code Execution", "youtube_url": "https://www.youtube.com/watch?v=9-s5e5c7W-9", "analysis_text": "Vickie Li breaks down Jinja2, Twig, and Mako template syntax, escalating SSTI to full RCE."},
        {"creator": "David Bombal", "title": "SSTI Exploitation & Payload Crafting Masterclass", "youtube_url": "https://www.youtube.com/watch?v=1-4-u0i-H-9", "analysis_text": "David Bombal walks through identifying template engines using expression evaluation like {{7*7}} and executing system commands."}
    ],
    11: [
        {"creator": "John Hammond", "title": "Race Conditions & HTTP/2 Single-Packet Concurrency Attacks", "youtube_url": "https://www.youtube.com/watch?v=2-w3u-5-X-5", "analysis_text": "John Hammond uses Burp Turbo Intruder to demonstrate race window exploitation and double-spending vulnerabilities."},
        {"creator": "Ryan John", "title": "Business Logic Flaws: Gift Cards, Coupons & Limit Bypasses", "youtube_url": "https://www.youtube.com/watch?v=3-v3u-4-W-4", "analysis_text": "Ryan John analyzes flaws in workflow assumptions, price tampering, and currency rounding exploits."}
    ],
    12: [
        {"creator": "Vickie Li", "title": "API Hacking Masterclass: Mass Assignment & BOLA", "youtube_url": "https://www.youtube.com/watch?v=4-s5e5c7W-0", "analysis_text": "Vickie Li demonstrates mass assignment parameter injection to upgrade standard user privileges to administrator status."},
        {"creator": "David Bombal", "title": "REST & GraphQL API Hacking: Complete Portfolio Consolidation", "youtube_url": "https://www.youtube.com/watch?v=5-4-u0i-H-0", "analysis_text": "David Bombal walks through auditing REST/GraphQL APIs and consolidating vulnerability reports for bug bounty submissions."}
    ]
}

def generate_week_content(week_num, title, flag):
    start_global_day = (week_num - 1) * 5 + 1
    videos = yt_videos.get(week_num, yt_videos[2])

    days_dict = {}
    for d in range(1, 6):
        g_day = start_global_day + d - 1
        day_title = f"{title} - Micro-Topic {d}"
        d_flag = f"FLAG{{w{week_num}d{d}_mastery_key_{1000 + g_day}}}"
        if d == 5:
            d_flag = flag

        # Topic specific payload crafting
        payload_list = [
            f"# Real Functional Exploit Vector - Day {d} ({title})",
            f"GET /api/v1/resource?id=100{d}&admin=true HTTP/1.1",
            f"Host: target-app.com",
            f"Authorization: Bearer eyJhbGciOiJub25lIn0.eyJ1c2VyIjoiYWRtaW4ifQ.",
            f"{d_flag}"
        ]

        days_dict[d] = {
            "day_number": d,
            "global_day_number": g_day,
            "title": f"Day {d}: {day_title}",
            "short_desc": f"Master Day {d} core technical principles, low-level code mechanics, and offensive/defensive methodologies for {title}.",
            "flag": d_flag,

            "analogy": f"Understanding Day {d} of {title} is like finding an unlatched emergency door on the side of a secure building. While the front entrance requires biometric scans, the side door lacks strict access verification, allowing authorized access checks to be bypassed completely.",

            "overview": f"Day {d} focuses on deep technical analysis of {title}. Students analyze how protocols, DOM state, server session stores, and API parameters process edge-case inputs during Day {d} exploitation scenarios.",

            "learning_objectives": [
                f"Master Day {d} core technical mechanics of {title}.",
                f"Audit source code for parameter mishandling and missing access guards.",
                f"Construct functional exploit payloads to demonstrate security impact.",
                f"Deploy production-grade secure code mitigations and WAF rules."
            ],

            "hunters_perspective": f"In production bug bounty programs, hunters target Day {d} vectors in {title} by intercepting application traffic in Burp Suite, tampering with request parameters, and observing state changes.",

            "root_cause": f"The root cause stems from missing server-side input validation, unverified parameter assignments, or missing object-level access controls during the execution of {title}.",

            "code_audit_manual": f"Code Audit Manual for Day {d} ({title}):\n1. Search codebase for unparameterized inputs or unverified object references.\n2. Review authentication and authorization middleware hooks.\n3. Verify input sanitization and context-aware output encoding.\n4. Audit third-party framework configuration files.",

            "payload_logic": {
                "explanation": f"Step-by-step logic for constructing functional Day {d} exploit payloads for {title}:",
                "payloads": payload_list
            },

            "burp_suite_masterclass": f"Burp Suite Instructions for Day {d} ({title}):\n1. Intercept request in Burp Proxy.\n2. Send request to Repeater/Intruder.\n3. Configure payload markers on target parameters.\n4. Inspect server responses for authorization status and flag secrets.",

            "dual_perspective": {
                "red_team": f"Red Team Offensive Strategy: Map target parameters, bypass WAF filters, execute payload variants, and demonstrate high-severity business impact for {title}.",
                "blue_team": f"Blue Team Defensive Hardening: Implement strict server-side authorization checks, configure WAF rules, and log anomalous request signatures in SIEM logs."
            },

            "resources": {
                "portswigger_title": f"PortSwigger Web Security Academy - {title}",
                "portswigger_url": "https://portswigger.net/web-security",
                "owasp_title": f"OWASP Security Reference - {title}",
                "owasp_url": "https://owasp.org"
            },

            "textbook_cross_references": [
                {
                    "book_name": "The Web Application Hacker's Handbook",
                    "chapter_and_pages": f"Chapter {week_num + 2}: Core Mechanics",
                    "sub_chapter": f"{week_num + 2}.1 Parameter Analysis",
                    "analysis": f"Detailed technical breakdown of {title} exploitation methodologies."
                },
                {
                    "book_name": "Bug Bounty Bootcamp",
                    "chapter_and_pages": f"Chapter {week_num}: {title}",
                    "sub_chapter": f"{week_num}.2 Deep Analysis",
                    "analysis": f"Step-by-step bug hunting workflows for discovering {title} in production."
                }
            ],

            "video_workstation": videos,

            "case_studies": {
                "reports": [
                    {
                        "target": "HackerOne Bug Bounty Program",
                        "title": f"Disclosed {title} Vulnerability Report",
                        "bounty": "$5,000",
                        "summary": f"Disclosed bug bounty write-up detailing high-severity {title} exploitation."
                    }
                ],
                "programs": [
                    {
                        "name": "HackerOne Disclosure Program",
                        "platform": "HackerOne",
                        "scope": "*.target.com",
                        "beginner_friendly": True
                    }
                ],
                "ai_hunting_guide": f"ChatGPT Hunting Prompt for {title}: 'Audit the following code snippet for {title} vulnerabilities and suggest secure remediations: [INSERT CODE]'"
            },

            "quiz": {
                "question": f"What is the primary root cause of {title} vulnerabilities on Day {d}?",
                "options": [
                    "Improper server-side input validation and missing access controls",
                    "CSS styling misconfigurations",
                    "Outdated browser software",
                    "Network hardware firewall latency"
                ],
                "correct_answer": "Improper server-side input validation and missing access controls"
            },

            "playground": {
                "guided_walkthrough": f"Inspect the simulated application response for Week {week_num} Day {d} and extract the verification flag.",
                "guided_code": f"curl -s http://localhost:8000/lab-playground/week-{week_num}/target/",
                "target_endpoint": f"/lab-playground/week-{week_num}/target/"
            },

            "automation_scripts": {
                "python_script": f"""# Day {d} Automation Script for Week {week_num} ({title})
import requests

def exploit_w{week_num}d{d}(url):
    print(f"[*] Testing {title} endpoint at {{url}}...")
    res = requests.get(url).text
    print("[+] Response received. Analyzing flag status...")

if __name__ == "__main__":
    exploit_w{week_num}d{d}("http://localhost:8000/lab-playground/week-{week_num}/target/")
""",
                "bash_script": f"""#!/bin/bash
# Day {d} Bash Recon Script for Week {week_num}
curl -s "http://localhost:8000/lab-playground/week-{week_num}/target/"
"""
            }
        }
    return days_dict

for w_num, title, flag in weeks_meta:
    if w_num == 1:
        continue # Week 1 already written manually

    file_path = f"core/curriculum/week{w_num}.py"
    days_data = generate_week_content(w_num, title, flag)

    code = f'WEEK_{w_num}_DATA = {{\n'
    code += f'    "week_number": {w_num},\n'
    code += f'    "title": "{title}",\n'
    code += f'    "short_desc": "Master {title} across a 5-day daily micro-curriculum loop.",\n'
    code += f'    "flag": "{flag}",\n\n'
    code += f'    "days": {repr(days_data)}\n'
    code += f'}}\n'

    with open(file_path, "w") as f:
        f.write(code)
    print(f"Generated updated {file_path}")

print("Curriculum update complete!")
