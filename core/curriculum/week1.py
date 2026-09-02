WEEK_1_DATA = {
    "week_number": 1,
    "title": "Target Reconnaissance, OSINT, & Client-Side JS Deconstruction",
    "short_desc": "Master passive OSINT, asset discovery, source map extraction, and client-side JavaScript reverse engineering.",
    "flag": "FLAG{recon_js_map_key_8492}",

    "analogy": """Imagine attempting to heist a bank without knowing where the vault is located, what security cameras are watching, or when the guards change shifts. Target Reconnaissance & Client-Side JS Deconstruction is like acquiring the architect's blueprinted schematics left behind in the blueprints recycling bin. By dissecting client-side JavaScript bundles and public domain registries, hunters discover hidden API routes, unlinked admin portals, internal IP addresses, and forgotten staging servers before ever sending a single aggressive payload.""",

    "overview": """Target Reconnaissance and Open Source Intelligence (OSINT) form the foundation of offensive security audits. When target organizations deploy web applications, client-side JavaScript bundles compiled by modern bundlers (Webpack, Vite, Rollup) frequently contain hardcoded internal environment configurations, secret API keys, internal microservice routes, and exposed developer endpoints. Deconstructing obfuscated JS code, parsing source maps (.map files), and enumerating DNS records allows security researchers to construct an accurate attack surface map of the target infrastructure.""",

    "learning_objectives": [
        "Perform passive OSINT using Certificate Transparency logs, SecurityTrails, and Shodan.",
        "Deobfuscate client-side JavaScript bundles using Source Map Unpackers.",
        "Extract unlinked internal API endpoints and hardcoded secret tokens from JavaScript source code.",
        "Automate passive domain enumeration using subfinder, amass, and httpx."
    ],

    "hunters_perspective": """In active bug bounty hunting on enterprise scopes (e.g., Tesla, Uber, DoD), target web apps rarely contain simple front-page vulnerabilities. Top earners perform deep client-side asset analysis. They scrape all `.js` files loaded by the main web app, un-minify chunk bundles, search for regex matches for AWS keys (`AKIA[0-9A-Z]{16}`), authorization Bearer tokens, hidden staging environment URLs (`staging-api.internal.company.com`), and hidden feature flags. Finding an unlinked API route in a JS bundle often leads directly to an unauthenticated admin API or zero-day IDOR.""",

    "root_cause": """Developers compile modern single-page applications (SPAs) into static assets without stripping debug metadata or source map mappings (`.js.map`). Additionally, developers frequently include build environment variables (e.g., `process.env.REACT_APP_SECRET_KEY`) or commit internal API endpoint definitions into public client bundles. Because JavaScript executes directly in the user's browser runtime, all strings, routes, and client-side logic are inherently public and accessible to source analysis.""",

    "code_audit_manual": """Code Review Checklist for Target Recon & JS Asset Audits:
1. Search codebase for hardcoded API keys, JWT secrets, or cloud credentials (AWS, GCP, Azure).
2. Check webpack / vite configuration for enabled `sourcemap: true` in production production builds.
3. Search JavaScript files for regex patterns: `(https?://[a-zA-Z0-9.-]+\\.internal\\.com)`.
4. Inspect HTML source code for commented-out developer notes, legacy path links, or staging environments.
5. Verify if client-side authorization logic relies on hidden JS variables rather than strict backend access control checks.""",

    "payload_logic": {
        "explanation": "In reconnaissance, payloads consist of regex extraction strings and HTTP request constructs to reveal hidden JS assets and source maps.",
        "payloads": [
            "curl -s https://target.com/main.js | grep -E -o \"(https?://|/api/)[a-zA-Z0-9_/-]+\"",
            "npx source-map-unpack http://target.com/static/js/main.chunk.js.map ./extracted_source",
            "ffuf -u https://target.com/FUZZ -w secLists/Discovery/Web-Content/api-endpoints.txt",
            "shodan search 'ssl.cert.subject.CN:\"target.com\" http.status:200'"
        ]
    },

    "burp_suite_masterclass": """Burp Suite Recon Workstation Setup:
1. Target Scope Configuration: Navigate to Target -> Scope Settings. Add `https://target.com` and all subdomains `.*\\.target\\.com$`.
2. Engagement Tools -> Search: Filter for `.js` assets across all proxied traffic.
3. Site Map Analysis: Right-click target in Site Map -> Engagement Tools -> Find Scripts.
4. JS Analysis Extension: Install 'JS Miner' or 'Source Mapper' from BApp Store to automatically extract secrets, endpoints, and parse `.map` files during proxy traffic passive scanning.
5. Match and Replace Rules: Configure Burp Proxy to automatically append custom headers or reveal hidden developer UI elements.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Passive OSINT gathering via Subfinder/Amass, pulling all JS files with katana/waybackurls, running secret finders (TruffleHog, JSFinder), extracting source maps using source-map-unpacker to retrieve original unminified React/Vue source code, uncovering internal `/admin/dev/debug_login` endpoints.",
        "blue_team": "Defensive Posture: Strip source map generation from production Vite/Webpack build configurations. Enforce strict Content Security Policy (CSP) headers. Implement automated CI/CD secret scanning (GitGuardian, Semgrep) to block key commits. Monitor Nginx access logs for abnormal automated endpoint discovery scanning."
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
            "sub_chapter": "3.4 JavaScript Analysis & Source Maps",
            "analysis": "Vickie Li demonstrates how pulling compiled JavaScript bundles reveals hidden routes, private API keys, and legacy microservices that lack modern auth guards."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 1: Open Source Intelligence (pp. 1-24)",
            "sub_chapter": "1.2 Finding Subdomains and Asset Mappings",
            "analysis": "Peter Yaworski breaks down real-world disclosures where OSINT and JS deconstruction led directly to remote code execution and internal infrastructure exposure."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 2: Automated Code Scraping (pp. 15-38)",
            "sub_chapter": "2.1 Parsing Unminified JavaScript with LLMs",
            "analysis": "Barbosa demonstrates using AI prompts to analyze minified JS blocks to extract hidden REST parameters and authentication headers."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 2: Recon Methodologies (pp. 20-45)",
            "sub_chapter": "2.3 Asset Discovery Pipeline",
            "analysis": "Vazquez & Javier outline how to assemble passive DNS enumeration, Certificate Transparency monitoring, and JS scraping into an automated workflow."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 12: Web Scraping (pp. 267-300)",
            "sub_chapter": "12.3 Parsing HTML and Searching Response Text with BeautifulSoup",
            "analysis": "Sweigart provides practical Python scripts for fetching webpage responses and extracting scripts, URLs, and hidden form fields."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 5: Web Hackers (pp. 75-98)",
            "sub_chapter": "5.1 Web Recon & Directory Brute-Forcing",
            "analysis": "Seitz demonstrates building multi-threaded Python tools for scraping web assets and extracting hidden directory paths."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "Bug Bounty Recon Masterclass: Subdomains & Asset Discovery",
            "youtube_url": "https://www.youtube.com/watch?v=1-3-u0i-H-4",
            "analysis_text": "David Bombal breaks down passive target enumeration using subfinder and Shodan filters to map complex enterprise infrastructure before launching active attacks."
        },
        {
            "creator": "Vickie Li",
            "title": "How to Read JavaScript Code for Bug Bounties",
            "youtube_url": "https://www.youtube.com/watch?v=3-s5e5c7W-4",
            "analysis_text": "Vickie Li demonstrates parsing JavaScript bundles, identifying unlinked API parameters, and leveraging source maps to reconstruct uncompiled code."
        },
        {
            "creator": "Ryan John",
            "title": "Zero to Hero Bug Bounty Course: Recon Essentials",
            "youtube_url": "https://www.youtube.com/watch?v=7-v3u-4-W-8",
            "analysis_text": "Ryan John presents a complete workflow for automating passive OSINT gathering, DNS enumeration, and client-side endpoint extraction."
        },
        {
            "creator": "John Hammond",
            "title": "Exposing Hidden Secrets in Web Applications",
            "youtube_url": "https://www.youtube.com/watch?v=8-w3u-5-X-9",
            "analysis_text": "John Hammond performs a deep-dive analysis into inspecting developer comments, exposed `.js.map` files, and hardcoded API tokens in production web apps."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Shopify Bug Bounty Program",
                "title": "Hardcoded Internal Admin API Key in Public JS Bundle",
                "bounty": "$10,000",
                "summary": "A security researcher extracted a minified JS chunk file from Shopify's checkout page, discovered an unstripped debug source map, and uncovered an internal GraphQL API key that allowed unauthorized backend queries."
            },
            {
                "target": "Department of Defense VDP",
                "title": "Unlinked Staging API Exposed via Client-Side Script Comments",
                "bounty": "Disclosed / Wall of Fame",
                "summary": "Analyst discovered commented-out staging endpoints inside a military Webpack bundle pointing to `https://staging-portal.internal.mil`, granting access to an unauthenticated asset management portal."
            }
        ],
        "programs": [
            {
                "name": "HackerOne Disclosure Program",
                "platform": "HackerOne",
                "scope": "*.hackerone.com, *.h1ctf.com",
                "beginner_friendly": True
            },
            {
                "name": "Bugcrowd University Sandbox",
                "platform": "Bugcrowd",
                "scope": "lab.bugcrowd.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for Recon Analysis: Supply raw minified JS snippets to ChatGPT with the prompt: 'Analyze the following minified JS code block. Extract all API endpoints, hidden JSON keys, authorization headers, and developer staging URLs: [INSERT CODE]'. Ensure you sanitize any target-specific PII or private domains before submission."
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Inspect the simulated web application response body below. Locate the inline `<script>` tag referencing the staging environment variables and extract the hidden developer debug token.",
            "guided_step": "Step 1: Open Chrome DevTools -> Sources tab.\nStep 2: Locate `/static/js/app_bundle.js`.\nStep 3: Search for string 'DEBUG_SECRET_FLAG'.\nExpected output: FLAG{recon_js_map_key_8492}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-1/target/`. Deconstruct the client-side JavaScript source assets to discover the hidden validation flag and submit it below to unlock Week 2."
        }
    },

    "automation_scripts": {
        "python_script": r"""# Python Asset & Secret Scanner (exploit_week1.py)
import requests
import re
import sys

def scan_js_target(url):
    print(f"[*] Fetching JavaScript bundle from: {url}")
    try:
        response = requests.get(url, timeout=10)
        content = response.text

        # Regex patterns for secret tokens and unlinked API routes
        flag_pattern = r'FLAG\{[a-zA-Z0-9_]+\}'
        api_pattern = r'\"(/api/v[0-9]/[a-zA-Z0-9_/]+)\"'

        flags = re.findall(flag_pattern, content)
        endpoints = re.findall(api_pattern, content)

        print(f"[+] Found {len(flags)} Flags:")
        for f in flags:
            print(f"    - SUCCESS: {f}")

        print(f"[+] Found {len(endpoints)} API Endpoints:")
        for ep in set(endpoints):
            print(f"    - Endpoint: {ep}")

    except Exception as e:
        print(f"[-] Error during scan: {e}")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-1/target/"
    scan_js_target(target)
""",
        "bash_script": """#!/bin/bash
# Bash Passive Recon Pipeline (recon_week1.sh)
TARGET_URL=$1
if [ -z "$TARGET_URL" ]; then
    TARGET_URL="http://localhost:8000/lab-playground/week-1/target/"
fi

echo "[*] Fetching page content and extracting scripts from: $TARGET_URL"
curl -s "$TARGET_URL" | grep -E -o 'src="[^"]+"' | cut -d'"' -f2 | while read -r script_path; do
    echo "[+] Scanning script: $script_path"
    curl -s "$script_path" | grep -i "FLAG{"
done
"""
    }
}
