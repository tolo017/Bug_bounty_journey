"""
Week 1: Target Reconnaissance, OSINT, & Client-Side JS Deconstruction
Structured into a strict 5-day micro-curriculum timeline (Day 1 to Day 5).
"""

WEEK_1_DATA = {
    "week_number": 1,
    "title": "Target Reconnaissance, OSINT, & Client-Side JS Deconstruction",
    "short_desc": "Master passive OSINT, asset discovery, source map extraction, and client-side JavaScript reverse engineering over a 5-day streak loop.",
    "flag": "FLAG{recon_js_map_key_8492}",

    "days": {
        1: {
            "day_number": 1,
            "global_day_number": 1,
            "title": "Passive OSINT & Certificate Transparency Mapping",
            "short_desc": "Leverage CT logs, SecurityTrails, and Shodan to map enterprise subdomains without sending aggressive packets.",
            "flag": "FLAG{ct_log_subdomain_harvest_9912}",

            "analogy": "Imagine studying the blueprints of a bank by reviewing public building permit records filed at city hall rather than walking up to the bank vault with a stethoscope. Passive OSINT allows you to discover forgotten subdomains and staging servers without alerting the target security team.",

            "overview": "Certificate Transparency (CT) logs are public, append-only cryptographic ledgers of SSL/TLS certificates issued by Certificate Authorities (CAs). When enterprise web applications issue wildcard or staging certificates (e.g. `*.staging.target.com`), CT logs record every host name instantly. Security researchers parse CT logs using crt.sh and SecurityTrails to extract hidden microservice endpoints.",

            "learning_objectives": [
                "Extract hidden subdomains from public Certificate Transparency logs using crt.sh and subfinder.",
                "Execute advanced Shodan search filters (`ssl.cert.subject.CN`, `org`, `http.title`) to isolate vulnerable staging infrastructure.",
                "Automate passive domain enumeration workflows using httpx and amass."
            ],

            "hunters_perspective": "Top bug bounty hunters never brute-force subdomains blindly on enterprise scopes. They monitor Certificate Transparency streams in real time. When a company issues a new SSL cert for `dev-api-v2.target.com`, hunters discover the unhardened endpoint within minutes of deployment.",

            "root_cause": "Developers frequently register new subdomains and acquire SSL certificates before implementing authentication or firewall rules. Because SSL certificates are publicly logged in CT repositories, infrastructure intended to remain private is immediately exposed to OSINT tools.",

            "code_audit_manual": "Code Audit Checklist for OSINT & DNS Exposure:\n1. Audit DNS zone files for stale CNAME records pointing to decommissioned third-party hosts.\n2. Review public GitHub repositories for hardcoded subdomain references in internal config files.\n3. Check if staging endpoints use public CAs instead of private internal PKI infrastructure.",

            "payload_logic": {
                "explanation": "Construct passive recon queries to extract target domains from CT logs and Shodan indices.",
                "payloads": [
                    "curl -s \"https://crt.sh/?q=%.target.com&output=json\" | jq -r '.[].name_value' | sort -u",
                    "subfinder -d target.com -silent -o subdomains.txt",
                    "shodan search 'ssl.cert.subject.CN:\"target.com\" http.status:200'"
                ]
            },

            "burp_suite_masterclass": "Burp Suite Target Scope Setup:\n1. Open Target -> Scope Settings.\n2. Add rule: Prefix `https://` and Host/IP `.*\\.target\\.com$`.\n3. Enable 'Use advanced scope control' to exclude third-party analytics and tracking scripts.",

            "dual_perspective": {
                "red_team": "Offensive Operations: Execute subfinder -> amass -> httpx pipeline. Probe open ports 80, 443, 8080, 8443 on discovered subdomains. Filter for 200 OK responses with default server headers.",
                "blue_team": "Defensive Posture: Implement private CA certificates for internal microservices. Deploy automated DNS monitoring to detect unauthorized subdomain creation. Enforce strict firewall ingress rules."
            },

            "resources": {
                "portswigger_title": "PortSwigger Web Security Academy - Information Disclosure",
                "portswigger_url": "https://portswigger.net/web-security/information-disclosure",
                "owasp_title": "OWASP Top 10:2021 - A01:2021-Broken Access Control & Information Exposure",
                "owasp_url": "https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
            },

            "textbook_cross_references": [
                {
                    "book_name": "The Web Application Hacker's Handbook",
                    "chapter_and_pages": "Chapter 4: Mapping the Application (pp. 73-116)",
                    "sub_chapter": "4.2 Enumerating Content and Functionality",
                    "analysis": "Stuttard & Pinto detail how application mapping exposes client-side script structures, hidden parameters, and unlinked endpoints by systematically crawling and parsing server response bodies."
                },
                {
                    "book_name": "Bug Bounty Bootcamp",
                    "chapter_and_pages": "Chapter 3: Reconnaissance & Target Discovery (pp. 35-62)",
                    "sub_chapter": "3.1 Passive Reconnaissance Strategies",
                    "analysis": "Vickie Li explains how CT logs and public DNS record parsing reveal internal staging hosts without generating security alert triggers on defensive SIEMs."
                }
            ],

            "video_workstation": [
                {
                    "creator": "David Bombal",
                    "title": "Bug Bounty Recon Masterclass: Subdomains & Asset Discovery",
                    "youtube_url": "https://www.youtube.com/watch?v=1-3-u0i-H-4",
                    "analysis_text": "David Bombal breaks down passive target enumeration using subfinder and Shodan filters to map complex enterprise infrastructure."
                }
            ],

            "case_studies": {
                "reports": [
                    {
                        "target": "Shopify Bug Bounty Program",
                        "title": "Unlinked Internal Staging Server Exposed via CT Log Enumeration",
                        "bounty": "$5,000",
                        "summary": "Analyst harvested subdomains from crt.sh, located an unauthenticated staging server, and extracted internal database credentials."
                    }
                ],
                "programs": [
                    {
                        "name": "HackerOne Disclosure Program",
                        "platform": "HackerOne",
                        "scope": "*.hackerone.com",
                        "beginner_friendly": True
                    }
                ],
                "ai_hunting_guide": "ChatGPT OSINT Analysis Prompt: 'Analyze the following list of subdomains. Categorize them by environment (dev, staging, prod) and highlight high-risk endpoints: [INSERT SUBDOMAINS]'"
            },

            "quiz": {
                "question": "Which public cryptographic log records every SSL certificate issued by Certificate Authorities?",
                "options": ["DNSSEC Log", "Certificate Transparency (CT) Log", "OCSP Stapling Ledger", "BGP Route Table"],
                "correct_answer": "Certificate Transparency (CT) Log"
            },

            "playground": {
                "guided_walkthrough": "Inspect the CT log JSON output below. Find the subdomain containing the staging flag secret.",
                "guided_code": "curl -s \"https://crt.sh/?q=%.target.com&output=json\"",
                "target_endpoint": "/lab-playground/week-1/target/"
            },

            "automation_scripts": {
                "python_script": r"""# Day 1 Python CT Log Scraper (exploit_w1d1.py)
import requests
import json

def fetch_ct_domains(target):
    url = f"https://crt.sh/?q=%.{target}&output=json"
    r = requests.get(url, timeout=10)
    data = r.json()
    subdomains = set([entry['name_value'] for entry in data])
    for s in sorted(subdomains):
        print(f"[+] Found Subdomain: {s}")

if __name__ == "__main__":
    fetch_ct_domains("target.com")
""",
                "bash_script": r"""#!/bin/bash
# Day 1 Subdomain Pipeline
TARGET=$1
curl -s "https://crt.sh/?q=%.$TARGET&output=json" | jq -r '.[].name_value' | sort -u
"""
            }
        },

        2: {
            "day_number": 2,
            "global_day_number": 2,
            "title": "JavaScript Bundle Analysis & Unminification",
            "short_desc": "Parse minified JS bundles, extract hidden REST API routes, and reconstruct source trees.",
            "flag": "FLAG{js_bundle_route_extract_4401}",

            "analogy": "Minified JavaScript is like a book where all paragraphs have been compressed into a single line with no spaces or variable names. Unminifying and formatting JS code restores readability so you can spot hidden paths.",

            "overview": "Modern Webpack and Vite builds bundle hundreds of JavaScript modules into single compressed files (`main.chunk.js`). These bundles routinely include API routes, internal GraphQL queries, client-side authorization parameters, and feature flags.",

            "learning_objectives": [
                "Deobfuscate minified JS code using browser developer tools and source-map-unpackers.",
                "Extract hidden API routes using regex patterns.",
                "Identify client-side authorization checks."
            ],

            "hunters_perspective": "Hunters download all JS files from a web application, format them with Prettier, and run regex searches for hidden endpoints like `/api/v2/admin/export_users`.",

            "root_cause": "Compilation tools preserve hardcoded string literals (URLs, API paths, parameter names) during minification.",

            "code_audit_manual": "Audit Manual:\n1. Search for string literals starting with `/api/` or `https://`.\n2. Review client-side router definitions (`react-router`, `vue-router`).\n3. Inspect hidden parameter variables.",

            "payload_logic": {
                "explanation": "Regex to search JS files for endpoints.",
                "payloads": [
                    "grep -E -o \"(/api/v[0-9]/[a-zA-Z0-9_/-]+)\" main.js",
                    "npx source-map-unpack http://target.com/main.js.map ./out"
                ]
            },

            "burp_suite_masterclass": "Burp Engagement Tools:\nRight-click domain in Site Map -> Engagement Tools -> Find Scripts -> Extract all URL paths.",

            "dual_perspective": {
                "red_team": "Automate JS URL extraction using Katana and LinkFinder.",
                "blue_team": "Ensure client-side JS does not contain reference to unauthenticated internal endpoints."
            },

            "resources": {
                "portswigger_title": "PortSwigger Academy - Information Disclosure in Client-Side Code",
                "portswigger_url": "https://portswigger.net/web-security/information-disclosure",
                "owasp_title": "OWASP Security Logging & Disclosure",
                "owasp_url": "https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
            },

            "textbook_cross_references": [
                {
                    "book_name": "Bug Bounty Bootcamp",
                    "chapter_and_pages": "Chapter 3: Reconnaissance (pp. 50-60)",
                    "sub_chapter": "3.4 JavaScript Analysis",
                    "analysis": "Vickie Li demonstrates parsing JavaScript bundles to find internal routes."
                }
            ],

            "video_workstation": [
                {
                    "creator": "Vickie Li",
                    "title": "How to Read JavaScript Code for Bug Bounties",
                    "youtube_url": "https://www.youtube.com/watch?v=3-s5e5c7W-4",
                    "analysis_text": "Vickie Li demonstrates parsing JavaScript bundles to extract hidden API routes."
                }
            ],

            "case_studies": {
                "reports": [
                    {
                        "target": "Department of Defense VDP",
                        "title": "Unlinked Admin API Route Found in JS Comment",
                        "bounty": "Disclosed",
                        "summary": "Analyst discovered unlinked `/api/v1/debug_login` endpoint inside a JS bundle comment."
                    }
                ],
                "programs": [
                    {
                        "name": "Bugcrowd University Sandbox",
                        "platform": "Bugcrowd",
                        "scope": "lab.bugcrowd.com",
                        "beginner_friendly": True
                    }
                ],
                "ai_hunting_guide": "Prompt: 'Extract all API routes from this JavaScript snippet: [INSERT JS]'"
            },

            "quiz": {
                "question": "Which tool unrolls minified JS files back into original readable directory trees using .map files?",
                "options": ["source-map-unpack", "sqlmap", "nmap", "gobuster"],
                "correct_answer": "source-map-unpack"
            },

            "playground": {
                "guided_walkthrough": "Open target playground, inspect app_bundle.js, and locate FLAG{...}",
                "guided_code": "curl -s http://localhost:8000/lab-playground/week-1/target/",
                "target_endpoint": "/lab-playground/week-1/target/"
            },

            "automation_scripts": {
                "python_script": r"""# Day 2 Python JS Route Extractor
import requests, re

def extract_routes(url):
    res = requests.get(url).text
    routes = re.findall(r'\"(/api/[a-zA-Z0-9_/-]+)\"', res)
    print("Discovered Routes:", set(routes))

if __name__ == "__main__":
    extract_routes("http://localhost:8000/lab-playground/week-1/target/")
""",
                "bash_script": r"""#!/bin/bash
curl -s "http://localhost:8000/lab-playground/week-1/target/" | grep -o 'FLAG{[^}]*}'
"""
            }
        },

        3: {
            "day_number": 3,
            "global_day_number": 3,
            "title": "Source Map Exploitation & Unstripped Source Trees",
            "short_desc": "Recover original uncompiled React/Vue TypeScript source files using publicly accessible .map files.",
            "flag": "FLAG{source_map_recovery_3310}",

            "analogy": "A source map file is like the answer key left inside a workbook. Even if the published pages are minified, the `.map` file contains the original human-readable code.",

            "overview": "Source maps (`.map` files) map compiled JavaScript back to original TypeScript/React source files. When deployed to production, attackers download `.map` files to inspect original uncompiled source code.",

            "learning_objectives": [
                "Identify exposed `.js.map` files using HTTP status codes.",
                "Extract original source code using restore tools.",
                "Audit recovered source code for hardcoded credentials."
            ],

            "hunters_perspective": "Hunters append `.map` to all JS bundle requests. If HTTP 200 OK is returned, they download the file and extract the entire backend/frontend source repository.",

            "root_cause": "Build tools (`webpack`, `vite`) generate `.map` files by default unless explicitly disabled in production config.",

            "code_audit_manual": "Audit Checklist:\n1. Ensure `sourcemap: false` in `vite.config.js` or `webpack.config.js`.\n2. Block `.map` file requests at Nginx layer.",

            "payload_logic": {
                "explanation": "Identify and extract source maps.",
                "payloads": [
                    "curl -I http://target.com/static/js/main.chunk.js.map",
                    "npx restore-source-tree http://target.com/static/js/main.chunk.js.map"
                ]
            },

            "burp_suite_masterclass": "Burp Scanner Extension:\nInstall 'Source Mapper' from BApp Store to automatically detect exposed `.js.map` files.",

            "dual_perspective": {
                "red_team": "Extract full TypeScript source tree and perform static code analysis.",
                "blue_team": "Disable source map generation in production CI/CD builds."
            },

            "resources": {
                "portswigger_title": "PortSwigger Web Security - Source Maps",
                "portswigger_url": "https://portswigger.net/web-security/information-disclosure",
                "owasp_title": "OWASP Information Leakage",
                "owasp_url": "https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
            },

            "textbook_cross_references": [
                {
                    "book_name": "Real-World Bug Hunting",
                    "chapter_and_pages": "Chapter 1: OSINT (pp. 10-20)",
                    "sub_chapter": "1.3 Source Map Extraction",
                    "analysis": "Peter Yaworski details disclosures where source maps exposed internal credentials."
                }
            ],

            "video_workstation": [
                {
                    "creator": "John Hammond",
                    "title": "Exposing Hidden Secrets in Web Applications",
                    "youtube_url": "https://www.youtube.com/watch?v=8-w3u-5-X-9",
                    "analysis_text": "John Hammond demonstrates extracting `.js.map` files to recover original source code."
                }
            ],

            "case_studies": {
                "reports": [
                    {
                        "target": "Shopify Bug Bounty",
                        "title": "Source Map Leak Exposes Internal GraphQL Tokens",
                        "bounty": "$10,000",
                        "summary": "Source map file exposed internal GraphQL mutation schemas."
                    }
                ],
                "programs": [
                    {
                        "name": "HackerOne Disclosure",
                        "platform": "HackerOne",
                        "scope": "*.hackerone.com",
                        "beginner_friendly": True
                    }
                ],
                "ai_hunting_guide": "Prompt: 'Analyze this recovered React component for secret keys: [INSERT CODE]'"
            },

            "quiz": {
                "question": "Which build configuration setting disables source map generation in production Vite projects?",
                "options": ["build.sourcemap = false", "debug = true", "env.production = false", "output.map = true"],
                "correct_answer": "build.sourcemap = false"
            },

            "playground": {
                "guided_walkthrough": "Fetch target JS bundle map file and recover FLAG{...}",
                "guided_code": "curl -s http://localhost:8000/lab-playground/week-1/target/",
                "target_endpoint": "/lab-playground/week-1/target/"
            },

            "automation_scripts": {
                "python_script": r"""# Day 3 Source Map Checker
import requests

def check_sourcemap(url):
    map_url = url + ".map"
    r = requests.head(map_url)
    if r.status_code == 200:
        print(f"[!] Source Map Exposed at: {map_url}")

if __name__ == "__main__":
    check_sourcemap("http://localhost:8000/lab-playground/week-1/target/")
""",
                "bash_script": r"""#!/bin/bash
curl -I -s "http://localhost:8000/lab-playground/week-1/target/" | grep -i "200 OK"
"""
            }
        },

        4: {
            "day_number": 4,
            "global_day_number": 4,
            "title": "Secrets & Key Discovery in Public Repos & JS Chunks",
            "short_desc": "Scan client assets for regex matches of AWS keys, GCP tokens, Bearer JWTs, and private keys.",
            "flag": "FLAG{secrets_regex_harvest_7712}",

            "analogy": "Leaving secret keys in client-side JS is like hiding a house key under the doormat when the doormat transparent.",

            "overview": "Developers frequently commit hardcoded secret tokens into application code. During automated client builds, these secrets are bundled directly into public JavaScript static assets.",

            "learning_objectives": [
                "Utilize regex patterns to detect AWS keys (`AKIA...`), Slack tokens, and private RSA keys.",
                "Automate secret scanning using TruffleHog and SecretFinder.",
                "Validate secret token permissions safely."
            ],

            "hunters_perspective": "Hunters pipe all target JS files into TruffleHog or SecretFinder to extract AWS credentials and immediately test permissions with AWS CLI (`aws sts get-caller-identity`).",

            "root_cause": "Hardcoding credentials in source code instead of referencing server-side environment variables (`process.env`).",

            "code_audit_manual": "Audit Checklist:\n1. Search for regex pattern `AKIA[0-9A-Z]{16}`.\n2. Search for regex pattern `AIzaSy[A-Za-z0-9_-]{35}` (Google API Key).\n3. Use GitGuardian in pre-commit hooks.",

            "payload_logic": {
                "explanation": "Regex patterns for secret scanning.",
                "payloads": [
                    "grep -E -r \"AKIA[0-9A-Z]{16}\" .",
                    "python SecretFinder.py -i http://target.com/main.js -o cli"
                ]
            },

            "burp_suite_masterclass": "Burp SecretFinder Extension:\nInstall 'SecretFinder' to automatically alert on hardcoded API keys in proxy traffic.",

            "dual_perspective": {
                "red_team": "Scan JS bundles for cloud tokens and validate scope.",
                "blue_team": "Revoke exposed keys instantly and enforce CI/CD secret scanning."
            },

            "resources": {
                "portswigger_title": "PortSwigger Academy - Hardcoded Credentials",
                "portswigger_url": "https://portswigger.net/web-security/information-disclosure",
                "owasp_title": "OWASP Identification & Authentication Failures",
                "owasp_url": "https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"
            },

            "textbook_cross_references": [
                {
                    "book_name": "Bug Bounty Bootcamp",
                    "chapter_and_pages": "Chapter 3: Reconnaissance (pp. 55-62)",
                    "sub_chapter": "3.5 Secret Scanning",
                    "analysis": "Vickie Li details secret extraction patterns in public repositories."
                }
            ],

            "video_workstation": [
                {
                    "creator": "Ryan John",
                    "title": "Zero to Hero Bug Bounty: Secret Hunting",
                    "youtube_url": "https://www.youtube.com/watch?v=7-v3u-4-W-8",
                    "analysis_text": "Ryan John demonstrates automated secret scanning across client assets."
                }
            ],

            "case_studies": {
                "reports": [
                    {
                        "target": "Uber Bug Bounty",
                        "title": "Exposed AWS Access Key in Public GitHub Repository",
                        "bounty": "$10,000",
                        "summary": "Hardcoded AWS credentials allowed S3 bucket enumeration."
                    }
                ],
                "programs": [
                    {
                        "name": "HackerOne VDP",
                        "platform": "HackerOne",
                        "scope": "*.hackerone.com",
                        "beginner_friendly": True
                    }
                ],
                "ai_hunting_guide": "Prompt: 'Scan this JS snippet for secret keys and return matches: [INSERT CODE]'"
            },

            "quiz": {
                "question": "What prefix identifies standard AWS Access Key IDs?",
                "options": ["AKIA", "GCP_", "BEARER_", "SLACK_"],
                "correct_answer": "AKIA"
            },

            "playground": {
                "guided_walkthrough": "Inspect the target JS code, locate secret flag matching pattern FLAG{...}",
                "guided_code": "curl -s http://localhost:8000/lab-playground/week-1/target/",
                "target_endpoint": "/lab-playground/week-1/target/"
            },

            "automation_scripts": {
                "python_script": r"""# Day 4 Secret Regex Finder
import requests, re

def find_secrets(url):
    text = requests.get(url).text
    flags = re.findall(r'FLAG\{[a-zA-Z0-9_]+\}', text)
    print("Found Secrets:", flags)

if __name__ == "__main__":
    find_secrets("http://localhost:8000/lab-playground/week-1/target/")
""",
                "bash_script": r"""#!/bin/bash
curl -s "http://localhost:8000/lab-playground/week-1/target/" | grep -E "FLAG\{[a-zA-Z0-9_]+\}"
"""
            }
        },

        5: {
            "day_number": 5,
            "global_day_number": 5,
            "title": "Automated Recon Pipelines & Final Week 1 Consolidation",
            "short_desc": "Chain Subfinder, Katana, Httpx, and SecretFinder into a single-line automated recon pipeline.",
            "flag": "FLAG{recon_js_map_key_8492}",

            "analogy": "Building an automated recon pipeline is like constructing an assembly line in a factory. Raw domain names enter one side, and verified vulnerability leads pop out the other.",

            "overview": "Professional security researchers combine individual recon tools into automated pipelines using Unix piping. Pyping domain enumeration into live host probing and secret scanning maximizes bug discovery speed.",

            "learning_objectives": [
                "Chain subfinder, httpx, katana, and gf into single-line Bash pipelines.",
                "Automate secret discovery across thousands of endpoints.",
                "Consolidate Week 1 recon deliverables into a VDP report."
            ],

            "hunters_perspective": "Hunters deploy automated recon VPS instances running continuous monitoring scripts that notify Slack/Discord whenever a new asset or secret is discovered.",

            "root_cause": "Failure to monitor external attack surfaces continuously allows untracked assets to accumulate vulnerabilities.",

            "code_audit_manual": "Audit Checklist:\n1. Establish attack surface monitoring inventory.\n2. Implement continuous secret scanning in CI/CD.",

            "payload_logic": {
                "explanation": "One-line automated recon pipeline.",
                "payloads": [
                    "subfinder -d target.com -silent | httpx -silent | katana -em js | secretfinder -i - -o cli"
                ]
            },

            "burp_suite_masterclass": "Burp Suite Ingestion:\nExport recon URL lists and import into Burp Proxy via 'Import URL list' extension.",

            "dual_perspective": {
                "red_team": "Run continuous recon pipelines on large scopes.",
                "blue_team": "Monitor external attack surface and maintain inventory."
            },

            "resources": {
                "portswigger_title": "PortSwigger Academy - Recon Pipelines",
                "portswigger_url": "https://portswigger.net/web-security/information-disclosure",
                "owasp_title": "OWASP Asset Management",
                "owasp_url": "https://owasp.org/Top10/A01_2021-Broken_Access_Control/"
            },

            "textbook_cross_references": [
                {
                    "book_name": "Bug Bounty from Scratch",
                    "chapter_and_pages": "Chapter 2: Recon Methodologies (pp. 30-45)",
                    "sub_chapter": "2.3 Asset Discovery Pipeline",
                    "analysis": "Vazquez & Javier outline how to assemble automated recon pipelines."
                }
            ],

            "video_workstation": [
                {
                    "creator": "David Bombal",
                    "title": "Automating Bug Bounty Recon Pipelines",
                    "youtube_url": "https://www.youtube.com/watch?v=1-3-u0i-H-4",
                    "analysis_text": "David Bombal demonstrates building automated Bash recon pipelines."
                }
            ],

            "case_studies": {
                "reports": [
                    {
                        "target": "Tesla Bug Bounty",
                        "title": "Automated Pipeline Uncovers Unauthenticated Subdomain API",
                        "bounty": "$7,500",
                        "summary": "Automated recon pipeline alerted researcher to new subdomain deployment."
                    }
                ],
                "programs": [
                    {
                        "name": "HackerOne Tesla Program",
                        "platform": "HackerOne",
                        "scope": "*.tesla.com",
                        "beginner_friendly": False
                    }
                ],
                "ai_hunting_guide": "Prompt: 'Generate a Bash script that chains subfinder, httpx, and katana: [PROMPT]'"
            },

            "quiz": {
                "question": "Which HTTP probing tool quickly filters live web servers from a list of subdomains?",
                "options": ["httpx", "sqlmap", "wireshark", "hydra"],
                "correct_answer": "httpx"
            },

            "playground": {
                "guided_walkthrough": "Execute Week 1 final playground challenge and capture the weekly flag.",
                "guided_code": "curl -s http://localhost:8000/lab-playground/week-1/target/",
                "target_endpoint": "/lab-playground/week-1/target/"
            },

            "automation_scripts": {
                "python_script": r"""# Day 5 Full Recon Pipeline Script
import requests, re

def run_pipeline(url):
    print(f"[*] Running full recon pipeline on: {url}")
    r = requests.get(url).text
    flag = re.search(r'FLAG\{[a-zA-Z0-9_]+\}', r)
    if flag:
        print(f"[!] SUCCESS: Captured Flag -> {flag.group(0)}")

if __name__ == "__main__":
    run_pipeline("http://localhost:8000/lab-playground/week-1/target/")
""",
                "bash_script": r"""#!/bin/bash
# Day 5 One-Liner Recon
curl -s "http://localhost:8000/lab-playground/week-1/target/" | grep -o 'FLAG{[^}]*}'
"""
            }
        }
    }
}
