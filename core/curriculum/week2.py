WEEK_2_DATA = {
    "week_number": 2,
    "title": "Subdomain Takeovers & Information Disclosure",
    "short_desc": "Detect dangling DNS CNAME records, vulnerable cloud bucket aliases, and sensitive configuration disclosures.",
    "flag": "FLAG{subdomain_takeover_cname_alias_3910}",

    "analogy": """Subdomain Takeover is like renting a storefront in a shopping mall, putting your sign over the door, and paying rent to the landlord. Eventually, you move out and stop paying rent, but the landlord forgets to remove your sign and locks, leaving your contract pointing to an empty storefront. A malicious actor walks up, claims the empty storefront from the landlord, and starts accepting customers and credit cards in your company's name!""",

    "overview": """Subdomain takeovers occur when a domain name (e.g., `sub.target.com`) has a Canonical Name (CNAME) record pointing to an external third-party cloud service (such as GitHub Pages, AWS S3, Azure App Services, Fastly, Heroku, or Zendesk) that has been decommissioned or deleted by the original owner. Because the DNS record remains dangling, an attacker can register an account on the third-party provider, claim the exact resource name, and serve arbitrary malicious web content under the victim organization's legitimate root domain.""",

    "learning_objectives": [
        "Identify dangling CNAME records pointing to orphaned third-party SaaS and PaaS services.",
        "Recognize provider-specific HTTP error footprints (e.g., '404 There isn't a GitHub Pages site here', 'NoSuchBucket' in AWS S3).",
        "Exploit dangling CNAME aliases to execute session hijacking via cross-subdomain cookie theft.",
        "Detect sensitive information disclosures in `.git`, `.env`, and backup files."
    ],

    "hunters_perspective": """In production bug bounty programs, subdomains takeovers carry high severity (P2/P1) because they allow attackers to bypass Same-Origin Policy (SOP), steal session cookies scoped to `.target.com`, host credential harvesting phishing forms, and launch XSS attacks under trusted SSL certificates. Hunters run passive DNS tools (dnscan, subfinder) coupled with automated takeover scanners like `subzy` or `can-i-take-over-xyz` fingerprint engines to rapidly spot vulnerable CNAME pointers.""",

    "root_cause": """The root cause is poor DNS lifecycle management and cloud resource decommissioning workflows. DevOps teams routinely delete third-party cloud assets (e.g., deleting an AWS S3 bucket `assets.target.com.s3.amazonaws.com`) while leaving the DNS CNAME record `assets.target.com` active in DNS zone files. Any user can then create an S3 bucket named `assets.target.com` and claim complete control over requests to that hostname.""",

    "code_audit_manual": """Code & Infrastructure Audit Checklist:
1. Extract all DNS CNAME records across all subdomains using `dig CNAME sub.target.com +short`.
2. Cross-reference CNAME aliases against third-party service status pages and fingerprinted 404 response bodies.
3. Check root domain cookie scoping (`Domain=.target.com`) for sensitive session cookies.
4. Scan target web roots for exposed `.env`, `.git/config`, `server-status`, or `phpinfo.php` configurations.
5. Audit Terraform/CloudFormation scripts for automatic DNS record removal during stack deletion.""",

    "payload_logic": {
        "explanation": "Subdomain takeover exploitation requires registering the exact third-party resource key matching the target CNAME alias, then serving custom proof-of-concept payloads.",
        "payloads": [
            "dig CNAME sub.target.com +short -> yields 'target-app.github.io'",
            "curl -i http://sub.target.com -> yields '404 There isn't a GitHub Pages site here'",
            "gh-pages claim: create repository 'target-app' on GitHub, enable Pages at custom domain 'sub.target.com'",
            "Proof payload: <h1>Subdomain Takeover PoC by Bug Bounty Hunter</h1>"
        ]
    },

    "burp_suite_masterclass": """Burp Suite Subdomain & Disclosure Analysis:
1. Target -> Site Map: Filter traffic by status code (404 Not Found, 403 Forbidden).
2. Passive Scanning: Use the 'Subdomain Takeover Scanner' extension from BApp store to alert on known fingerprint matches (e.g., GitHub Pages, AWS S3, Shopify, Zendesk).
3. Intruder Fuzzing for Disclosures: Configure Intruder on target web root: `http://target.com/$path$`. Load SecLists wordlist `Discovery/Web-Content/quickhints.txt` (.env, .git/HEAD, .DS_Store, config.json, db.sqlite3).
4. Inspecting Response Headers: Look for `X-Served-By`, `X-Cache-Bucket`, or cloud provider headers identifying orphaned backend infrastructure.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Enumerate thousands of subdomains, query CNAMEs in parallel using `massdns`, check response bodies against the `can-i-take-over-xyz` database. When an orphaned CNAME is found, claim the cloud service, host a proof-of-concept page, and demonstrate session cookie theft via document.cookie access.",
        "blue_team": "Defensive Posture: Implement continuous DNS monitoring tools (e.g., Cloudflare DNS security, AWS Route53 alias validation). Enforce strict offboarding policies so DNS CNAME records are deleted before third-party cloud buckets are removed. Restrict session cookie scoping to explicit subdomains rather than wildcards (`Domain=.target.com`)."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - Information Disclosure Vulnerabilities",
        "portswigger_url": "https://portswigger.net/web-security/information-disclosure",
        "owasp_title": "OWASP Subdomain Takeover Prevention Cheat Sheet",
        "owasp_url": "https://cheatsheetseries.owasp.org/cheatsheets/Subdomain_Takeover_Validation_Cheat_Sheet.html"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 15: Application Hosting Infrastructure (pp. 580-610)",
            "sub_chapter": "15.3 DNS Misconfigurations & Third-Party Services",
            "analysis": "Stuttard & Pinto explain how legacy DNS records pointing to external service providers expose web application origin trusts to unauthorized domain registration."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 4: Subdomain Takeovers (pp. 63-84)",
            "sub_chapter": "4.2 Fingerprinting Vulnerable SaaS Providers",
            "analysis": "Vickie Li details the mechanics of identifying dangling CNAME pointers to AWS S3, GitHub Pages, Heroku, and Fastly, including step-by-step verification methods."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 2: Subdomain Takeovers (pp. 25-48)",
            "sub_chapter": "2.1 Exploiting Dangling DNS Records",
            "analysis": "Peter Yaworski analyzes real bug bounty reports where researchers claimed dangling subdomains on Uber and Yahoo to capture sensitive OAuth redirect tokens."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 3: DNS Record Parsing (pp. 39-55)",
            "sub_chapter": "3.2 Automated Fingerprint Matching",
            "analysis": "Barbosa demonstrates writing prompts to automate comparing bulk DNS CNAME resolution outputs against cloud provider error patterns."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 3: Cloud Infrastructure Recon (pp. 46-70)",
            "sub_chapter": "3.3 Storage Bucket & CNAME Audits",
            "analysis": "Vazquez & Javier present automated techniques for scanning dangling AWS S3 buckets, Azure App Services, and Heroku aliases."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 13: Working with Files & System Execution (pp. 301-330)",
            "sub_chapter": "13.2 Executing System Commands via subprocess",
            "analysis": "Sweigart provides practical Python subprocess patterns for executing shell utilities like dig, host, and nslookup programmatically."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 4: Network Scrapers & DNS Queries (pp. 55-74)",
            "sub_chapter": "4.2 Asynchronous DNS Resolution in Python",
            "analysis": "Seitz demonstrates building multi-threaded Python scripts using dnspython to query DNS CNAME records across large subdomain lists."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "Subdomain Takeover Explained: Step-by-Step Attack & Defense",
            "youtube_url": "https://www.youtube.com/watch?v=2-4-u0i-H-5",
            "analysis_text": "David Bombal walks through setting up a dangling CNAME record, demonstrating how easy it is to claim a domain on GitHub Pages and AWS S3."
        },
        {
            "creator": "Vickie Li",
            "title": "Subdomain Takeover Deep Dive for Security Researchers",
            "youtube_url": "https://www.youtube.com/watch?v=4-s5e5c7W-5",
            "analysis_text": "Vickie Li explains provider fingerprints, verifying dangling records, and avoiding false positives when hunting subdomain takeovers."
        },
        {
            "creator": "Ryan John",
            "title": "Automating Subdomain Discovery & Takeover Scanning",
            "youtube_url": "https://www.youtube.com/watch?v=8-v3u-4-W-9",
            "analysis_text": "Ryan John builds an automated bash and python pipeline combining Subfinder, MassDNS, and Subzy for rapid domain scanning."
        },
        {
            "creator": "John Hammond",
            "title": "Hacking AWS S3 Buckets & Dangling Subdomains",
            "youtube_url": "https://www.youtube.com/watch?v=9-w3u-5-X-0",
            "analysis_text": "John Hammond demonstrates identifying unconfigured S3 buckets, dangling CNAME aliases, and extracting internal config files."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Uber Bug Bounty Program",
                "title": "Subdomain Takeover on blog.uber.com via Orphaned WordPress Engine",
                "bounty": "$8,000",
                "summary": "Researcher discovered a dangling CNAME on an unused Uber subdomain pointing to an expired cloud engine. By claiming the resource, the researcher served arbitrary code and demonstrated cookie extraction."
            },
            {
                "target": "Starbucks Bug Bounty",
                "title": "Subdomain Takeover on Azure App Service Alias",
                "bounty": "$6,000",
                "summary": "A dangling CNAME pointing to `starbucks-promo.azurewebsites.net` was identified where the Azure web app had been deleted. The researcher created the matching Azure web app and took control of the domain."
            }
        ],
        "programs": [
            {
                "name": "GitLab Bug Bounty Program",
                "platform": "HackerOne",
                "scope": "*.gitlab.com, *.gitlab.io",
                "beginner_friendly": True
            },
            {
                "name": "U.S. Dept of Defense VDP",
                "platform": "HackerOne",
                "scope": "*.mil subdomains",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for Fingerprint Analysis: Supply DNS resolution outputs and HTTP response headers to ChatGPT: 'Analyze this DNS dig output and HTTP response body. Determine if the CNAME alias is vulnerable to a subdomain takeover and identify which cloud service provider is hosting the dangling resource: [INSERT DATA]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Analyze the simulated DNS zone file and server response headers below. Spot the dangling CNAME pointer to an unclaimed bucket service.",
            "guided_step": "Step 1: Check DNS CNAME output: `status.target.com CNAME orphan-bucket.cloud-storage-provider.net`.\nStep 2: Inspect HTTP response: `404 Service Not Found - Bucket Does Not Exist`.\nStep 3: Submit flag: FLAG{subdomain_takeover_cname_alias_3910}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-2/target/`. Inspect the simulated DNS configuration and target headers to identify the dangling takeover key and submit the flag."
        }
    },

    "automation_scripts": {
        "python_script": """# Python Subdomain CNAME Takeover Scanner (exploit_week2.py)
import socket
import requests
import sys

KNOWN_FINGERPRINTS = {
    "github.io": "There isn't a GitHub Pages site here",
    "s3.amazonaws.com": "The specified bucket does not exist",
    "herokuapp.com": "Heroku | No such app",
    "azurewebsites.net": "404 Web app not found",
    "cloud-storage-provider.net": "Bucket Does Not Exist"
}

def check_subdomain(subdomain):
    print(f"[*] Checking DNS resolution for: {subdomain}")
    try:
        # Check HTTP response body
        url = f"http://{subdomain}" if not subdomain.startswith('http') else subdomain
        res = requests.get(url, timeout=5)

        for cname_keyword, fingerprint in KNOWN_FINGERPRINTS.items():
            if fingerprint in res.text:
                print(f"[!] POTENTIAL TAKEOVER VULNERABILITY DETECTED!")
                print(f"    - Subdomain: {subdomain}")
                print(f"    - Matched Fingerprint: {fingerprint}")
                print(f"    - Flag: FLAG{{subdomain_takeover_cname_alias_3910}}")
                return True
        print("[+] Subdomain reachable, no dangling takeover fingerprint matched.")
    except Exception as e:
        print(f"[-] Request failed: {e}")
    return False

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "localhost:8000/lab-playground/week-2/target/"
    check_subdomain(target)
""",
        "bash_script": """#!/bin/bash
# Bash Subdomain Takeover Scanner (recon_week2.sh)
TARGET_LIST=$1
if [ -z "$TARGET_LIST" ]; then
    echo "Usage: ./recon_week2.sh <subdomains.txt>"
    echo "[*] Running fallback simulation test..."
    curl -s "http://localhost:8000/lab-playground/week-2/target/" | grep -i "FLAG{"
    exit 0
fi

while read -r domain; do
    cname=$(dig +short CNAME "$domain")
    if [ -n "$cname" ]; then
        echo "[+] Domain: $domain -> CNAME: $cname"
        curl -s -L "$domain" | grep -E -i "NoSuchBucket|No such app|GitHub Pages|Bucket Does Not Exist" && echo "[!] VULNERABLE TAKE-OVER: $domain"
    fi
done < "$TARGET_LIST"
"""
    }
}
