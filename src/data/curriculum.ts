import { Week, DayLesson, BossLab } from "../types/curriculum";

// Helper generator creating 72 unique, distinct, enterprise-grade Red/Blue Team lesson content entries across all 12 weeks
const getComprehensiveLessonContent = (
  weekIndex: number,
  dayIndex: number,
  dayTitle: string,
  competency: string,
  dayName: string
) => {
  const globalLessonIndex = weekIndex * 6 + dayIndex;

  // 72 Unique Expert Video Methodology Breakdowns
  const videoBreakdowns: { title: string; duration: string; methodologySummary: string }[] = [
    // Week 1: Client-Side JS Deconstruction
    {
      title: "Mastering Client-Side DOM Inspection & Window Object Clobbering",
      duration: "18 Mins",
      methodologySummary: "In this session, learn how senior researchers analyze browser runtime memory state. Trace un-sanitized DOM assignments, inspect document.referrer and window.name variables, and clobber HTML elements to redirect script execution paths."
    },
    {
      title: "Deconstructing Client-Side Prototype Pollution Sinks",
      duration: "22 Mins",
      methodologySummary: "Analyze real-world prototype pollution vulnerabilities in modern front-end bundles. Learn how recursive object merge functions parse __proto__ properties and override global application flags."
    },
    {
      title: "Source Map Reconstruction & Obfuscated JS Unpacking",
      duration: "25 Mins",
      methodologySummary: "Examine tactics for extracting original production source code from .map files and Webpack bundles. Use CLI toolchains to deobfuscate minified client code and discover un-redacted API endpoints."
    },
    {
      title: "LocalStorage & SessionStorage XSS Exfiltration Vectors",
      duration: "16 Mins",
      methodologySummary: "Explore how persistent client storage stores session tokens, bearer authorization headers, and user PII. Build stealthy exfiltration payloads that read window.localStorage without triggering standard browser security alarms."
    },
    {
      title: "Auditing WebSockets: Interception & Message Replay Attacks",
      duration: "20 Mins",
      methodologySummary: "Inspect full-duplex WebSocket frames using proxy tools. Learn to identify missing origin verification during handshakes, craft custom WS frame payloads, and execute cross-site WebSocket hijacking (CSWSH)."
    },
    {
      title: "CORS Misconfigurations: Origin Reflection & Wildcard Bypasses",
      duration: "19 Mins",
      methodologySummary: "Audit Access-Control-Allow-Origin response headers. Test for arbitrary origin reflection, null origin trust, and sub-domain wildcard bypasses to steal cross-origin authenticated session responses."
    },

    // Week 2: Secret Hunting & Reconnaissance
    {
      title: "Regex Pattern Matching for Cloud & API Credentials",
      duration: "21 Mins",
      methodologySummary: "Build custom regular expressions targeting AWS access keys, Google Cloud API keys, Stripe tokens, and JWT secrets buried deep within client-side JavaScript assets."
    },
    {
      title: "Extracting Hidden Env Credentials from Container Layers",
      duration: "24 Mins",
      methodologySummary: "Audit public and private Docker image layer histories. Reconstruct historical image builds using layer extraction tools to reveal leaked environment variables and hardcoded database connection strings."
    },
    {
      title: "Deep GitHub Archive & Commit History Mining",
      duration: "28 Mins",
      methodologySummary: "Mine historical Git repositories for leaked secrets. Use git log -p, search deleted branches, and analyze public developer fork pull requests to uncover forgotten corporate secrets."
    },
    {
      title: "Auditing Unauthenticated Firebase & NoSQL Databases",
      duration: "17 Mins",
      methodologySummary: "Discover exposed Google Firebase realtime databases and Firestore instances. Test read/write permission rules directly via REST endpoint queries (.json extensions) to leak production user tables."
    },
    {
      title: "Advanced Directory Brute-Forcing & Config File Discovery",
      duration: "23 Mins",
      methodologySummary: "Master recursive wordlist fuzzing against web application roots. Uncover backup files (.bak, .old, .swp), environment configurations (.env.production), and un-linked administrative scripts."
    },
    {
      title: "Decompiling Android APKs for Static Credential Analysis",
      duration: "26 Mins",
      methodologySummary: "Reverse-engineer Android application packages (APKs) using jadx-gui and apktool. Inspect AndroidManifest.xml, string resources, and compiled Java native binaries for embedded secret tokens."
    },

    // Week 3: Advanced Insecure Direct Object References (IDOR)
    {
      title: "IDOR Auditing via Custom Header Manipulations",
      duration: "20 Mins",
      methodologySummary: "Audit multi-tenant API gateways that rely on custom headers like X-User-ID, X-Account-Id, or X-Forwarded-User. Intercept and mutate these headers in proxy tools to access victim tenant data."
    },
    {
      title: "Numeric ID Brute-Forcing & Secondary IDOR Validation",
      duration: "18 Mins",
      methodologySummary: "Identify sequential integer IDs in REST API routes. Test secondary access controls across GET, PUT, and DELETE HTTP verbs to execute unauthorized profile updates and private record deletion."
    },
    {
      title: "UUID vs Sequential Identifier Enumeration Strategies",
      duration: "22 Mins",
      methodologySummary: "Bypass non-sequential UUID parameters by discovering secondary endpoints (such as export logs, public profile reviews, or search suggestion endpoints) that leak target UUID strings."
    },
    {
      title: "Bypassing IDOR Authorization Checks via Parameter Pollution (HPP)",
      duration: "24 Mins",
      methodologySummary: "Supply duplicate parameters in HTTP query strings (e.g. ?id=user_a&id=user_b) to test how WAFs and backend web frameworks handle array parameters, successfully bypassing authorization filters."
    },
    {
      title: "IDOR on Object Deletion & Critical State Changes",
      duration: "19 Mins",
      methodologySummary: "Target critical administrative endpoints handling account deletion, billing method updates, and team member removals. Verify missing server-side ownership authorization on state-changing POST/DELETE calls."
    },
    {
      title: "GraphQL IDORs via Query Introspection & Custom Variables",
      duration: "27 Mins",
      methodologySummary: "Inspect GraphQL endpoints using schema introspection. Query hidden user node fields, manipulate GraphQL query variables, and execute unauthorized mutation operations across tenant boundaries."
    },

    // Week 4: Broken Business Logic Auditing
    {
      title: "Exploiting Negative & Fractional Boundary Conditions in E-Commerce",
      duration: "21 Mins",
      methodologySummary: "Test numerical inputs in payment processing workflows. Pass negative item quantities, fractional currency units, and extreme integer values (Integer Overflow) to corrupt shopping cart calculations."
    },
    {
      title: "High-Velocity Race Conditions on Promo Codes & Gift Cards",
      duration: "25 Mins",
      methodologySummary: "Utilize single-packet HTTP request techniques in proxy tools to execute concurrent requests. Redeem limited-use promotional codes or transfer funds simultaneously across multiple parallel threads."
    },
    {
      title: "Multi-Step Workflow Interception & Out-of-Order Step Execution",
      duration: "23 Mins",
      methodologySummary: "Analyze multi-stage application workflows (Registration -> Email Verification -> Payment -> Provisioning). Skip intermediate verification steps by issuing direct HTTP calls to final fulfillment endpoints."
    },
    {
      title: "Manipulating Client-Side Price & Discount Parameters",
      duration: "18 Mins",
      methodologySummary: "Identify shopping carts that calculate sub-totals on the client-side or pass price fields directly in POST request bodies. Tamper with price parameters to purchase high-value assets for $0.01."
    },
    {
      title: "Bypassing Rate-Limiting & Lockouts on OTP Verification Endpoints",
      duration: "22 Mins",
      methodologySummary: "Audit two-factor authentication (2FA) and password reset OTP endpoints. Bypass rate-limiting using IP header spoofing, array parameter injections, or null byte truncation."
    },
    {
      title: "Role Transition Flipping via Custom Header Overrides",
      duration: "20 Mins",
      methodologySummary: "Intercept privilege upgrade workflows. Modify response status codes (HTTP 403 to 200) or override client role flags (role=member to role=admin) in outbound API requests."
    },

    // Week 5: Session Management & JWT Exploitation
    {
      title: "JWT None Algorithm Signature Bypass Attacks",
      duration: "19 Mins",
      methodologySummary: "Deconstruct JSON Web Tokens (JWT). Change the signature algorithm header from HS256/RS256 to 'none', remove the cryptographic signature block, and achieve complete identity forgery."
    },
    {
      title: "Brute-Forcing Weak JWT HMAC Secret Keys with Hashcat",
      duration: "24 Mins",
      methodologySummary: "Extract signed JWT tokens from session cookies. Perform high-speed offline dictionary brute-forcing against HMAC secret keys using Hashcat and custom wordlists to recover the signing secret."
    },
    {
      title: "JWT JWK (JSON Web Key) Header Injection Attacks",
      duration: "26 Mins",
      methodologySummary: "Inject self-signed public RSA keys into the 'jwk' parameter of the JWT header. Sign custom administrative tokens using your private key and force the target server to trust the embedded public key."
    },
    {
      title: "Session Fixation & Cross-Subdomain Cookie Injections",
      duration: "21 Mins",
      methodologySummary: "Audit session ID regeneration after user authentication. Inject pre-authenticated session cookies across target subdomains to hijack active user account sessions."
    },
    {
      title: "Bypassing SameSite Cookie Protections via CSRF Chain Attacks",
      duration: "23 Mins",
      methodologySummary: "Analyze SameSite=Lax and SameSite=Strict cookie attributes. Combine top-level window navigations, GET-based state changes, or client-side redirects to bypass CSRF defenses."
    },
    {
      title: "JWT Key ID (kid) Header Exploitation (SQLi & Path Traversal)",
      duration: "28 Mins",
      methodologySummary: "Exploit backend database/file-system lookups triggered by the 'kid' JWT header parameter. Inject path traversal sequences ('../../../../dev/null') or SQL injection strings into the key lookup routine."
    },

    // Week 6: Advanced Subdomain & Port Recon (Go/Linux)
    {
      title: "Automated Subdomain Discovery with Subfinder & Amass",
      duration: "22 Mins",
      methodologySummary: "Build high-throughput reconnaissance pipelines using Go CLI tools. Combine passive passive sources, Certificate Transparency logs, and active WHOIS ASN lookups to discover complete asset trees."
    },
    {
      title: "DNS Resolution, Wildcard Elimination & Massdns Pipeline",
      duration: "26 Mins",
      methodologySummary: "Filter out wildcard DNS responses from massive domain lists. Resolve millions of DNS records per minute using Massdns and custom public resolver lists."
    },
    {
      title: "Scale Port Scanning & Service Probing with Naabu & Rustscan",
      duration: "20 Mins",
      methodologySummary: "Execute high-speed port scanning across large enterprise CIDR blocks. Optimize SYN/ACK packet transmission speeds using Naabu and Rustscan to locate active non-standard HTTP/HTTPS ports."
    },
    {
      title: "Virtual Host (VHost) Fuzzing with ffuf & Custom Headers",
      duration: "25 Mins",
      methodologySummary: "Discover un-linked internal web services hosted on single IP addresses. Configure ffuf to fuzz the 'Host:' HTTP header with wordlists, filtering response sizes to find hidden internal dashboards."
    },
    {
      title: "Automated HTTP Probing & Screen Capture with httpx & gowitness",
      duration: "21 Mins",
      methodologySummary: "Probe thousands of discovered subdomains for live web services. Pipe live URLs into gowitness to generate automated visual screenshot galleries and filter targets by HTTP title and status code."
    },
    {
      title: "Extracting Autonomous System Numbers (ASN) & Subnet Ranges",
      duration: "24 Mins",
      methodologySummary: "Map enterprise network perimeters using WHOIS ASN records, bgpview APIs, and command-line JSON parsing tools (jq) to identify every IP range owned by a target organization."
    },

    // Week 7: API Reversing & Swagger Auditing
    {
      title: "Reversing Hidden API Schemas from Swagger & OpenAPI Docs",
      duration: "20 Mins",
      methodologySummary: "Locate hidden API documentation endpoints (/swagger/v1/swagger.json, /api-docs, /v2/api-docs). Parse OpenAPI definitions into Burp Suite to test every un-linked REST API route."
    },
    {
      title: "API Parameter Over-Posting & Mass Assignment Vulnerabilities",
      duration: "23 Mins",
      methodologySummary: "Audit API endpoints accepting JSON body parameters. Inject un-documented object attributes (e.g., 'role': 'admin', 'isVerified': true) during user profile registration to escalate permissions."
    },
    {
      title: "Bypassing REST API Authentication Filters via Path Traversal",
      duration: "25 Mins",
      methodologySummary: "Bypass API gateway access rules by appending matrix parameters or path traversal sequences (e.g. /api/v1/public/..;/admin) to trick reverse proxies into granting access to administrative routes."
    },
    {
      title: "GraphQL Depth & Cost Exhaustion Denial of Service Attacks",
      duration: "22 Mins",
      methodologySummary: "Craft nested GraphQL queries that exploit missing query depth or cost limits. Request deeply nested circular object relationships to exhaust database connection pools and crash application servers."
    },
    {
      title: "Broken Object Level Authorization (BOLA) in REST & Microservices",
      duration: "27 Mins",
      methodologySummary: "Audit microservice object resolvers for missing authorization checks. Swap resource IDs across tenant accounts in GET, PUT, and DELETE API queries to read and modify private tenant resources."
    },
    {
      title: "API HTTP Method Tampering & Verb Overriding Escalations",
      duration: "19 Mins",
      methodologySummary: "Test HTTP verb permissions on restricted endpoints. Convert GET requests to POST, PUT, or DELETE, or send custom headers (X-HTTP-Method-Override: PUT) to bypass read-only middleware protections."
    },

    // Week 8: Advanced Parameter Mining & Hidden Inputs
    {
      title: "Automated Query & Header Parameter Discovery with Arjun",
      duration: "21 Mins",
      methodologySummary: "Run high-speed parameter discovery using Arjun and Param Miner. Identify un-linked GET/POST query parameters and custom HTTP headers that alter application logic."
    },
    {
      title: "Exploiting Hidden Administrative Debug Flags (e.g. ?debug=true)",
      duration: "18 Mins",
      methodologySummary: "Uncover hidden developer flags leftover from staging builds. Supply query flags like ?debug=1, ?admin_bypass=true, or ?env=dev to expose internal stack traces and bypass authentication."
    },
    {
      title: "HTTP Cache Poisoning via Unkeyed Header Injections",
      duration: "26 Mins",
      methodologySummary: "Mine unkeyed HTTP headers (X-Forwarded-Host, X-Host, X-Original-URL) accepted by reverse-proxy caches. Inject malicious script paths into cached HTTP responses to execute stored XSS across all users."
    },
    {
      title: "Uncovering Hidden Method Overrides & Gateway Headers",
      duration: "22 Mins",
      methodologySummary: "Identify non-standard HTTP gateway headers (X-Original-URL, X-Rewrite-URL) that cause reverse proxies to rewrite request destination paths, bypassing administrative path restrictions."
    },
    {
      title: "Host Header Injection & Web Server Routing Manipulation",
      duration: "24 Mins",
      methodologySummary: "Tamper with HTTP Host request headers. Force application password reset emails to send tokens to attacker-controlled domain names or poison internal password reset link generators."
    },
    {
      title: "Mining Cookie & Header Parameters for Dynamic Template Processing",
      duration: "20 Mins",
      methodologySummary: "Audit application cookies and HTTP request headers that feed server-side rendering engines. Inject template expression syntax (${7*7}) into custom language cookies to achieve server-side template injection."
    },

    // Week 9: Corporate-Grade VDP Reporting & Impact Analysis
    {
      title: "Writing Executive Summaries for HackerOne & Bugcrowd Submissions",
      duration: "19 Mins",
      methodologySummary: "Structure professional vulnerability reports tailored for corporate triage teams. Write clear executive summaries detailing technical root causes, business impact, and remediation steps."
    },
    {
      title: "Calculating Exact CVSS v3.1 & v4.0 Severity Metrics",
      duration: "22 Mins",
      methodologySummary: "Master CVSS v3.1 and v4.0 scoring vector strings. Correctly evaluate Attack Vector (AV), Attack Complexity (AC), Privileges Required (PR), and Scope (S) metrics to justify critical bounty payouts."
    },
    {
      title: "Drafting Standardized Proof-of-Concept (PoC) Repros & cURLs",
      duration: "20 Mins",
      methodologySummary: "Provide clean, reliable reproduction steps. Generate copy-pasteable cURL command lines and lightweight Python PoC scripts that allow triagers to verify vulnerabilities in under two minutes."
    },
    {
      title: "Proposing Enterprise Remediation & Patch Strategies",
      duration: "21 Mins",
      methodologySummary: "Guide engineering teams with production-ready code fixes. Propose secure code refactoring, input sanitization libraries, WAF rule adjustments, and architectural defense-in-depth mitigations."
    },
    {
      title: "Navigating Bug Bounty Platform SLA Timelines & Mediations",
      duration: "25 Mins",
      methodologySummary: "Manage professional communication with security triage officers. Handle report duplicates, request bounty re-evaluations politely with technical evidence, and participate in platform mediation."
    },
    {
      title: "Communicating High-Impact Business Risk to CISOs & Execs",
      duration: "23 Mins",
      methodologySummary: "Translate technical vulnerabilities (like BOLA or SSRF) into financial and regulatory risk metrics (GDPR, PCI-DSS compliance breaches) that resonate with executive leadership."
    },

    // Week 10: Advanced Network & Port Recon
    {
      title: "Nmap Timing Optimization & Service Fingerprinting",
      duration: "24 Mins",
      methodologySummary: "Fine-tune Nmap scan timing controls (-T3/-T4), packet rates, and script execution (--script=banner,version) to perform thorough network service fingerprinting without triggering rate limits."
    },
    {
      title: "Firewall Filter Evasion via Source Port Spoofing & Decoys",
      duration: "26 Mins",
      methodologySummary: "Bypass stateless firewall rules by spoofing DNS source ports (--source-port 53) or distributing SYN packets across decoy IP address pools (-D RND:10) to mask scanning origin IPs."
    },
    {
      title: "Fingerprinting SSL/TLS Cryptographic Ciphers & Certificates",
      duration: "21 Mins",
      methodologySummary: "Audit TLS configurations using testssl.sh and SSL Labs toolchains. Inspect certificate Subject Alternative Names (SANs) to discover un-listed corporate subdomains and deprecated cryptographic ciphers."
    },
    {
      title: "Banner Grabbing & Unauthenticated Service Probing (SSH, Redis)",
      duration: "22 Mins",
      methodologySummary: "Connect directly to open non-HTTP network sockets using netcat and telnet. Grab service banners on exposed Redis (6379), Memcached (11211), and SSH (22) services to locate unauthenticated admin ports."
    },
    {
      title: "Analyzing ICMP Response Profiling & UDP Port Scanning",
      duration: "23 Mins",
      methodologySummary: "Scan UDP service ports (SNMP, DNS, NTP) using Nmap (-sU). Analyze ICMP Port Unreachable error codes to differentiate between filtered and open UDP endpoints across corporate networks."
    },
    {
      title: "Network Route Profiling & Hop-by-Hop Traceroute Analysis",
      duration: "20 Mins",
      methodologySummary: "Profile network ingress paths using tcptraceroute and MTR. Identify external load balancers, Web Application Firewalls (WAFs), and transit network boundaries protecting target IP ranges."
    },

    // Week 11: Cloud Infrastructure Security & Auditing
    {
      title: "Auditing Public Amazon S3 Bucket Access Policies & File Leaks",
      duration: "22 Mins",
      methodologySummary: "Audit AWS S3 bucket permissions using aws-cli and S3Scanner. Test for unauthenticated Read/Write ACLs, bucket listing privileges, and public object exposure."
    },
    {
      title: "SSRF Exploitation via AWS Instance Metadata v1 (IMDSv1)",
      duration: "26 Mins",
      methodologySummary: "Locate Server-Side Request Forgery (SSRF) vulnerabilities in web applications. Issue requests to the AWS IMDSv1 link-local address (http://169.254.169.254/latest/meta-data/) to exfiltrate IAM role credentials."
    },
    {
      title: "Bypassing AWS IMDSv2 Token Requirements via Open Redirect Chains",
      duration: "28 Mins",
      methodologySummary: "Bypass AWS IMDSv2 token enforcement (PUT headers required) by combining local SSRF fetchers with client Open Redirect flaws, forcing internal applications to follow redirects and leak cloud service tokens."
    },
    {
      title: "Data Mining Misconfigured Azure Blob Containers & Storage Accounts",
      duration: "21 Mins",
      methodologySummary: "Enumerate public Azure Blob storage containers using Microburst toolchains. Test for anonymous blob container access permissions and extract exposed cloud backups and log archives."
    },
    {
      title: "Auditing GCP Cloud Function Security & Service Account Tokens",
      duration: "24 Mins",
      methodologySummary: "Inspect Google Cloud Platform (GCP) function triggers and identity metadata. Query GCP metadata server endpoints (http://metadata.google.internal/computeMetadata/v1/) with required custom headers."
    },
    {
      title: "DNS Hijacking on Unregistered S3 Buckets & Cloud Asset Takeovers",
      duration: "25 Mins",
      methodologySummary: "Discover orphaned CNAME records pointing to deleted cloud buckets or dead third-party services. Register matching bucket names to claim full subdomain takeover and serve custom content."
    },

    // Week 12: Advanced Chain Vulnerabilities
    {
      title: "Chaining CSRF with Self-XSS for Full Account Takeover",
      duration: "23 Mins",
      methodologySummary: "Convert un-exploitable Self-XSS flaws into high-severity account takeovers. Chain Cross-Site Request Forgery (CSRF) payloads to force target users into executing Self-XSS code within their own active sessions."
    },
    {
      title: "Path Traversal File Upload Attacks to Web Shell RCE",
      duration: "27 Mins",
      methodologySummary: "Bypass file upload restrictions by injecting path traversal sequences into file upload parameters (e.g., filename='../../../var/www/html/shell.php'), overwriting executable scripts in web roots."
    },
    {
      title: "SQL Injection Chained with Local File Inclusion (LFI)",
      duration: "29 Mins",
      methodologySummary: "Combine database READ capabilities (LOAD_FILE / INTO OUTFILE) with LFI endpoints to parse internal server log files, poisoning log entries to achieve full Remote Code Execution (RCE)."
    },
    {
      title: "SSRF to Internal Admin Panel Blind Exploitation Chains",
      duration: "26 Mins",
      methodologySummary: "Leverage Out-Of-Band (OAST) techniques using Burp Collaborator to confirm blind SSRF vulnerabilities. Exploit internal administrative microservices on loopback addresses (127.0.0.1) to trigger state changes."
    },
    {
      title: "Chaining Server-Side Template Injection (SSTI) with RCE Filters",
      duration: "28 Mins",
      methodologySummary: "Identify template rendering engines (Jinja2, Twig, Freemarker). Construct SSTI sandbox bypass payloads that break out of variable evaluation and execute system commands via native language runtimes."
    },
    {
      title: "XXE Injection via SVG File Uploads for System File Exfiltration",
      duration: "30 Mins",
      methodologySummary: "Craft malicious XML External Entity (XXE) payloads embedded inside uploaded vector graphic (SVG) image files. Force image processing parser libraries to read and exfiltrate /etc/passwd and system environment files."
    }
  ];

  const videoBreakdown = videoBreakdowns[globalLessonIndex] || {
    title: `Expert Methodology Breakdown: ${dayTitle}`,
    duration: "20 Mins",
    methodologySummary: `Master the systematic methodology for auditing ${dayTitle}. Learn how leading security researchers trace code execution, configure Burp Suite, and construct bulletproof exploit payloads.`
  };

  const whatYouAreDoing = `RED TEAM AUDIT (Day ${globalLessonIndex + 1} - ${dayName}):
You are executing a focused Red Team assessment against target endpoints for ${dayTitle}.
Your objective is to inspect runtime application data flows, isolate input parameters, construct targeted payloads, execute automated scripts, and extract verified system flags.`;

  const vulnerabilityOrigin = `ORIGIN & ROOT CAUSE:
${dayTitle} stems from missing input sanitization and implicit trust assumptions in server-side handling of ${competency}. When applications process external parameters without strict type enforcement or authorization validation, attackers alter execution context.`;

  const pentesterFocus = `PENTESTER FOCUS & AUDIT CHECKLIST:
1. Locate input vector for ${dayTitle} in HTTP requests or client bundles.
2. Intercept requests in Burp Suite and mutate parameters (${competency}).
3. Execute automated CLI scan and verify response code differences.`;

  const payloadCrafting = `PAYLOAD CRAFTING LOGIC FOR ${dayTitle.toUpperCase()}:
1. Standard Payload: Craft parameter string targeting ${competency}.
2. Encoding Bypass: Apply URL/Base64 encoding or parameter duplicate injection.
3. Verification String: Confirm payload reflection or state mutation in response body.`;

  const burpSuiteSetup = `BURP SUITE SETUP FOR ${dayTitle.toUpperCase()}:
1. Intercept target endpoint matching ${dayTitle}.
2. Add Match/Replace rule in Proxy Options matching ${competency}.
3. Monitor Logger++ for HTTP status code anomalies.`;

  const blueTeamDefense = `BLUE TEAM DEFENSE & SECURE CODING:
1. Enforce strict server-side input validation and parameter allowlists.
2. Verify object-level authorization on every API resolver.
3. Deploy Content Security Policy (CSP) and WAF rules for ${competency}.`;

  const stepByStepTutorial = [
    `Step 1: Open the Digital Arena inspection panel and review target endpoint parameters for ${dayTitle}.`,
    `Step 2: Identify parameter handling gaps in ${competency}.`,
    `Step 3: Construct your exploit payload for ${dayTitle}.`,
    `Step 4: Execute the payload in the interactive shell terminal.`,
    `Step 5: Copy the captured flag into the answer box to earn XP.`
  ];

  const usefulResources = [
    { name: `OWASP Standard: ${competency}`, url: "https://owasp.org/www-project-web-security-testing-guide/", category: "Standard" },
    { name: `PortSwigger Academy: ${dayTitle}`, url: "https://portswigger.net/web-security", category: "Lab & Guide" },
    { name: `HackerOne Hacktivity Reports`, url: "https://hackerone.com/hacktivity", category: "Reference" }
  ];

  const industryInsight = `💡 INDUSTRY INSIGHT (Day ${globalLessonIndex + 1}):
Reports covering ${dayTitle} in ${competency} regularly command $1,500 to $10,000+ bounties on HackerOne and Bugcrowd programs.`;

  const pythonScript = `#!/usr/bin/env python3
# Reusable Python Exploit Script: ${dayTitle} (Day ${globalLessonIndex + 1})
import requests
import sys

def audit_${dayName.toLowerCase()}_target(url):
    print(f"[*] Auditing target endpoint for ${dayTitle}: {url}")
    headers = {"User-Agent": "BugBountyMastery/2.0", "X-Target-Module": "${competency}"}
    try:
        res = requests.get(f"{url}/api/v1/audit", headers=headers, timeout=5)
        print(f"[+] HTTP Status: {res.status_code}")
        if res.status_code == 200:
            print("[+] Target endpoint active! Exploit payload verified.")
    except Exception as e:
        print(f"[-] Connection error: {e}")

if __name__ == "__main__":
    target_url = sys.argv[1] if len(sys.argv) > 1 else "http://sandbox-target.corp.internal"
    audit_${dayName.toLowerCase()}_target(target_url)`;

  const bashScript = `#!/usr/bin/env bash
# CLI Bash Automation: ${dayTitle} (Day ${globalLessonIndex + 1})
TARGET=\${1:-"http://sandbox-target.corp.internal"}

echo "[*] Launching CLI scanner for ${dayTitle}..."
curl -s -X GET -H "X-Audit-Skill: ${competency}" "$TARGET/api/v1/audit" | head -n 20`;

  const vdpReportTemplate = {
    title: `[HIGH] ${dayTitle} Identified in Application Endpoint`,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
    cvssScore: 8.2,
    description: `During a security assessment, an un-sanitized endpoint flaw (${dayTitle}) was identified in ${competency}. An attacker can exploit this condition to bypass application controls and read or modify sensitive data.`,
    stepsToReproduce: `1. Issue HTTP GET request to endpoint for ${dayTitle}.\n2. Supply parameter payload string.\n3. Observe HTTP 200 response returning unauthorized target data.`,
    remediation: `1. Enforce strict server-side validation and parameter allowlists.\n2. Implement object-level authorization checks across all API routes.`
  };

  return {
    videoBreakdown,
    whatYouAreDoing,
    vulnerabilityOrigin,
    pentesterFocus,
    payloadCrafting,
    burpSuiteSetup,
    blueTeamDefense,
    stepByStepTutorial,
    usefulResources,
    industryInsight,
    pythonAutomation: pythonScript,
    bashAutomation: bashScript,
    vdpReportTemplate
  };
};

// Helper to generate weeks data
export const generateDefaultCurriculum = (): Week[] => {
  const weeks: Week[] = [];

  const topics = [
    {
      title: "Client-Side JS Deconstruction",
      competency: "Client-Side Security",
      days: [
        { name: "Monday", title: "DOM Clobbering & Document Object Manipulation", lab: "https://portswigger.net/web-security/dom-based/dom-clobbering" },
        { name: "Tuesday", title: "Client-Side Prototype Pollution in Wild JS Files", lab: "https://portswigger.net/web-security/prototype-pollution" },
        { name: "Wednesday", title: "Source Map Reconstruction & JS Deobfuscation", lab: "https://portswigger.net/web-security/dom-based" },
        { name: "Thursday", title: "Client-Side Storage Abuse (XSS via LocalStorage)", lab: "https://portswigger.net/web-security/cross-site-scripting" },
        { name: "Friday", title: "WebSocket Message Manipulation & Race Conditions", lab: "https://portswigger.net/web-security/websockets" },
        { name: "Saturday", title: "CORS Misconfigurations & Origin Reflection", lab: "https://portswigger.net/web-security/cors" }
      ],
      bossLabTitle: "Enterprise DOM & Prototype Pollution Chain Lab",
      bossLabScenario: "Analyze an obfuscated, enterprise-grade client script dynamically loading user config files. Abuse a prototype pollution pattern to corrupt the document tree structure, clobber the global API config endpoint, and trigger an automated cross-origin token export flag.",
      correctFlag: "FLAG{PROTOTYPE_CLOBBER_SUCCESS}"
    },
    {
      title: "Secret Hunting & Reconnaissance",
      competency: "Secret Hunting & Recon",
      days: [
        { name: "Monday", title: "Regex Deep-Dive for AWS and GCP Keys in JS", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Tuesday", title: "Extracting Secrets from Docker Layers & Env Configs", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Wednesday", title: "Parsing Public GitHub Archives & Commit Histories", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Thursday", title: "Leaked Firebase Databases & Unauthenticated Endpoints", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Friday", title: "Config File Discovery via Advanced Directory Brute-forcing", lab: "https://portswigger.net/web-security/file-path-traversal" },
        { name: "Saturday", title: "Decompilation of Android APKs for Static Credentials", lab: "https://portswigger.net/web-security/information-disclosure" }
      ],
      bossLabTitle: "Multilayer Secret Extraction & Key Parsing Lab",
      bossLabScenario: "Scan and parse dockerized asset layers. Reconstruct historical git logs to find hidden developer API keys, identify an unauthenticated Firebase endpoint with those credentials, and extract the system administrative access flag.",
      correctFlag: "FLAG{SECRETS_UNCOVERED_IN_COMMIT_HIST}"
    },
    {
      title: "Advanced Insecure Direct Object References (IDOR)",
      competency: "Access Control (IDOR)",
      days: [
        { name: "Monday", title: "IDOR via Custom Header Tampering (X-User-ID)", lab: "https://portswigger.net/web-security/access-control" },
        { name: "Tuesday", title: "Numeric ID Brute Force and Secondary IDOR validation", lab: "https://portswigger.net/web-security/access-control" },
        { name: "Wednesday", title: "UUID vs Sequential ID Enumeration Strategies", lab: "https://portswigger.net/web-security/access-control" },
        { name: "Thursday", title: "Bypassing IDOR via Parameter Pollution (HPP)", lab: "https://portswigger.net/web-security/access-control" },
        { name: "Friday", title: "IDOR on Object Deletion & State Change Endpoints", lab: "https://portswigger.net/web-security/access-control" },
        { name: "Saturday", title: "GraphQL IDORs via Query Introspection & Variables", lab: "https://portswigger.net/web-security/access-control" }
      ],
      bossLabTitle: "UUID-to-HPP Multi-tenant IDOR Escalation",
      bossLabScenario: "Perform analysis on a multi-tenant corporate HR system. Bypass UUID-only security by implementing HTTP Parameter Pollution (HPP) to leak senior administrator data, accessing their private documents via parameter injection.",
      correctFlag: "FLAG{UUID_HPP_IDOR_ESCALATED_SUCC}"
    },
    {
      title: "Broken Business Logic Auditing",
      competency: "Business Logic Security",
      days: [
        { name: "Monday", title: "Negative & Fractional Cart Quantities", lab: "https://portswigger.net/web-security/logic-flaws" },
        { name: "Tuesday", title: "Discount Code & Gift Card Race Conditions", lab: "https://portswigger.net/web-security/logic-flaws" },
        { name: "Wednesday", title: "Multi-Step Workflow Interception & Out-of-Order Execution", lab: "https://portswigger.net/web-security/logic-flaws" },
        { name: "Thursday", title: "Trusting Client-side Controlled Pricing Parameters", lab: "https://portswigger.net/web-security/logic-flaws" },
        { name: "Friday", title: "Bypassing Limit Restrictions on OTP Verification", lab: "https://portswigger.net/web-security/logic-flaws" },
        { name: "Saturday", title: "Role Transition Flipping via Custom Header Override", lab: "https://portswigger.net/web-security/logic-flaws" }
      ],
      bossLabTitle: "Enterprise Multi-step Transaction Logic Exploit",
      bossLabScenario: "Interfere with a high-stakes banking transaction flow. Reorder the transaction confirmation phase by bypassing step 2 (Verification) and jumping straight to step 3 (Disbursement) with manipulated transaction values.",
      correctFlag: "FLAG{TRANSACTION_WORKFLOW_BYPASS}"
    },
    {
      title: "Session Management & JWT Exploitation",
      competency: "Session & Token Management",
      days: [
        { name: "Monday", title: "JWT None Algorithm Signature Forgery", lab: "https://portswigger.net/web-security/jwt" },
        { name: "Tuesday", title: "Weak Secret Brute-forcing with Hashcat", lab: "https://portswigger.net/web-security/jwt" },
        { name: "Wednesday", title: "JWT JWK Parameter Header Injection", lab: "https://portswigger.net/web-security/jwt" },
        { name: "Thursday", title: "Session Fixation via Overlapping Domains & Subdomains", lab: "https://portswigger.net/web-security/jwt" },
        { name: "Friday", title: "Bypassing SameSite Cookie Protections via CSRF Chain", lab: "https://portswigger.net/web-security/csrf" },
        { name: "Saturday", title: "JWT Key ID (kid) SQL Injection & Command Exec", lab: "https://portswigger.net/web-security/jwt" }
      ],
      bossLabTitle: "JWT Header Injection & Secret Forgery Attack",
      bossLabScenario: "Manipulate a JWT session token by injecting a self-signed key in the JWK header. Craft a matching token indicating your role is 'Administrator' and use it to execute restricted server controls.",
      correctFlag: "FLAG{JWK_HEADER_INJECTION_Pwned}"
    },
    {
      title: "Advanced Subdomain & Port Recon (Go/Linux-focused)",
      competency: "Asset Mapping (Go/Linux)",
      days: [
        { name: "Monday", title: "Automated Subdomain Discovery with Subfinder & Amass", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Tuesday", title: "Advanced DNS Resolution & Wildcard Filtering with Massdns", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Wednesday", title: "Port Scanning at Scale with Naabu and Rustscan", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Thursday", title: "Vhost Fuzzing with ffuf and Custom Wordlists", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Friday", title: "HTTP Probe & Screen Capture Automation using httpx & gowitness", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Saturday", title: "Extracting ASN Blocks & Subnets using whois & jq", lab: "https://portswigger.net/web-security/information-disclosure" }
      ],
      bossLabTitle: "Large Scale Recon & Service Fingerprinting Lab",
      bossLabScenario: "Process raw reconnaissance data from a giant corporate IP range. Identify hidden internal-only web virtual hosts (VHosts), fingerprint outdated servers, and locate the unprotected admin administration port.",
      correctFlag: "FLAG{RECON_VHOST_FFUF_FINGERPRINT}"
    },
    {
      title: "API Reversing & Swagger Auditing",
      competency: "API Security Auditing",
      days: [
        { name: "Monday", title: "Extracting Hidden API Endpoints from Swagger/OAS UI", lab: "https://portswigger.net/web-security/api-testing" },
        { name: "Tuesday", title: "API Parameter Over-Posting & Mass Assignment Attacks", lab: "https://portswigger.net/web-security/api-testing" },
        { name: "Wednesday", title: "Bypassing REST API Authentication Filters via Traversal", lab: "https://portswigger.net/web-security/api-testing" },
        { name: "Thursday", title: "GraphQL Query Cost & Depth Exhaustion Denial of Service", lab: "https://portswigger.net/web-security/api-testing" },
        { name: "Friday", title: "API Object Level Authorization (BOLA) Exploits", lab: "https://portswigger.net/web-security/api-testing" },
        { name: "Saturday", title: "API Method Tampering (GET to PUT/POST Escalation)", lab: "https://portswigger.net/web-security/api-testing" }
      ],
      bossLabTitle: "Enterprise API Schema Reversing & BOLA Lab",
      bossLabScenario: "Analyze an exposed Swagger spec and identify schema objects. Perform dynamic fuzzing to locate an Object Level Authorization vulnerability (BOLA), and change the administrative API configs using PUT method conversion.",
      correctFlag: "FLAG{BOLA_PUT_API_OVERRIDE_VERIFIED}"
    },
    {
      title: "Advanced Parameter Mining & Hidden Inputs",
      competency: "Parameter & Logic Mining",
      days: [
        { name: "Monday", title: "Automated Parameter Mining with Arjun & Param Miner", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Tuesday", title: "Hidden Administrative Parameter Exploits (debug=true)", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Wednesday", title: "HTTP Header Mining for Custom Caching Frameworks", lab: "https://portswigger.net/web-security/web-cache-poisoning" },
        { name: "Thursday", title: "Uncovering Hidden REST Method Overrides (X-HTTP-Method-Override)", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Friday", title: "Query String Manipulation for Host Header Injection", lab: "https://portswigger.net/web-security/host-header-attacks" },
        { name: "Saturday", title: "Mining Hidden Cookies for Dynamic Theme & Template Parsing", lab: "https://portswigger.net/web-security/essential-skills" }
      ],
      bossLabTitle: "Multi-layered Parameter Discovery & Cache Attack",
      bossLabScenario: "Execute a parameter-discovery payload against a cached cloud server front-end. Mine a secret caching header parameter that overrides server cache behavior, allowing you to inject poisoned javascript headers and steal user flags.",
      correctFlag: "FLAG{PARAM_MINED_CACHE_POISON_SUCCESS}"
    },
    {
      title: "Corporate-Grade VDP Reporting & Impact Analysis",
      competency: "Corporate Reporting & VDP",
      days: [
        { name: "Monday", title: "Writing Professional Executive Vulnerability Summaries", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Tuesday", title: "CVSS v3.1/v4.0 Vector String Calculations", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Wednesday", title: "Drafting Standard Step-by-Step Proof of Concepts (PoC)", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Thursday", title: "Proposing Enterprise-grade Remediation & Root Cause Solutions", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Friday", title: "Structuring High-Impact Bug Reports on HackerOne & Bugcrowd", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Saturday", title: "Communicating Critically with Enterprise Security Officers", lab: "https://portswigger.net/web-security/essential-skills" }
      ],
      bossLabTitle: "Enterprise VDP / Vulnerability Report Evaluation",
      bossLabScenario: "Review and evaluate a complex multi-stage prototype pollution and SSRF chain report. Calculate CVSS vectors, write a crystal-clear step-by-step remediation guide, and submit the final security review.",
      correctFlag: "FLAG{VDP_ENTERPRISE_REPORT_SUBMITTED}"
    },
    {
      title: "Advanced Network & Port Recon",
      competency: "Network & Port Recon",
      days: [
        { name: "Monday", title: "Port Scanning Optimization via Nmap Timing & Scans", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Tuesday", title: "Bypassing Firewalls via Source Port & Decoys", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Wednesday", title: "Fingerprinting SSL/TLS Cryptographic Cipher Suites", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Thursday", title: "Banner Grabbing on Encrypted Protocols (SSH, HTTPS)", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Friday", title: "Analyzing ICMP Responses & UDP Port Responses", lab: "https://portswigger.net/web-security/information-disclosure" },
        { name: "Saturday", title: "Network Route Profiling & Traceroute Discovery", lab: "https://portswigger.net/web-security/information-disclosure" }
      ],
      bossLabTitle: "Network Level Firewall Avoidance & Service Scan",
      bossLabScenario: "Design and execute an optimal firewall-evading port scan. Find hidden network services behind strict filtering layers, analyze certificates for target alignment, and verify service integrity.",
      correctFlag: "FLAG{FIREWALL_EVADED_NMAP_SUCCESS}"
    },
    {
      title: "Cloud Infrastructure Security & Auditing",
      competency: "Cloud Infrastructure Auditing",
      days: [
        { name: "Monday", title: "Identifying Public S3 Bucket Policies & File Leakage", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Tuesday", title: "SSRF Exploitation via AWS Instance Metadata v1 (IMDSv1)", lab: "https://portswigger.net/web-security/ssrf" },
        { name: "Wednesday", title: "Bypassing IMDSv2 Token Requirements via Open Redirects", lab: "https://portswigger.net/web-security/ssrf" },
        { name: "Thursday", title: "Misconfigured Azure Blob Container Data Mining", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Friday", title: "Auditing GCP Cloud Function Security & Identity Tokens", lab: "https://portswigger.net/web-security/essential-skills" },
        { name: "Saturday", title: "DNS Hijacking on Unregistered S3 Bucket Bucketeer Subdomains", lab: "https://portswigger.net/web-security/essential-skills" }
      ],
      bossLabTitle: "Cloud SSRF IMDSv2 Multi-Stage Exfiltration Lab",
      bossLabScenario: "Exploit an SSRF vulnerability on an enterprise web host. Leverage a local Open Redirect bypass to obtain a cloud service token from instance metadata, and use that token to download privileged database configuration files.",
      correctFlag: "FLAG{CLOUD_SSRF_IMDSV2_TOKEN_EXFIL}"
    },
    {
      title: "Advanced Chain Vulnerabilities",
      competency: "Advanced Chain Vulnerabilities",
      days: [
        { name: "Monday", title: "Chaining CSRF with Self-XSS for Account Takeover", lab: "https://portswigger.net/web-security/csrf" },
        { name: "Tuesday", title: "Exploiting File Uploads via Path Traversal filename attacks", lab: "https://portswigger.net/web-security/file-upload" },
        { name: "Wednesday", title: "SQL Injection Chained to Local File Inclusion (LFI)", lab: "https://portswigger.net/web-security/sql-injection" },
        { name: "Thursday", title: "SSRF to Internal Admin Panel Blind Exploitation", lab: "https://portswigger.net/web-security/ssrf" },
        { name: "Friday", title: "Chaining Dynamic Template Injection with RCE Filters", lab: "https://portswigger.net/web-security/server-side-template-injection" },
        { name: "Saturday", title: "XXE injection parsing SVG Uploads for System File Extraction", lab: "https://portswigger.net/web-security/xxe" }
      ],
      bossLabTitle: "The Grandmaster Multi-Chain Exploit (LFI to SSRF to RCE)",
      bossLabScenario: "Execute the ultimate hack chain. Leverage a Path Traversal during file upload to place a custom PHP payload, trigger local execution, bypass external security via blind SSRF query parameters, and obtain systemic root access.",
      correctFlag: "FLAG{LFI_SSRF_RCE_GRANDMASTER_PWNED}"
    }
  ];

  for (let w = 0; w < 12; w++) {
    const topicInfo = topics[w];
    const days: DayLesson[] = [];

    for (let d = 0; d < 6; d++) {
      const dayName = topicInfo.days[d].name;
      const dayTitle = topicInfo.days[d].title;
      const labLink = topicInfo.days[d].lab;
      const dayId = `week-${w + 1}-${dayName.toLowerCase()}`;

      const details = getComprehensiveLessonContent(w, d, dayTitle, topicInfo.competency, dayName);

      days.push({
        id: dayId,
        weekIndex: w,
        dayName,
        title: dayTitle,
        durationMinutes: 150, // 30 (Theory) + 90 (Arena) + 30 (Automation)
        unlocked: w === 0 && d === 0, // Week 1 Monday unlocked by default
        completed: false,
        competency: topicInfo.competency,
        theory: {
          title: "Theoretical Principles & Auditing",
          duration: "30 Mins",
          videoBreakdown: details.videoBreakdown,
          whatYouAreDoing: details.whatYouAreDoing,
          vulnerabilityOrigin: details.vulnerabilityOrigin,
          pentesterFocus: details.pentesterFocus,
          payloadCrafting: details.payloadCrafting,
          burpSuiteSetup: details.burpSuiteSetup,
          blueTeamDefense: details.blueTeamDefense,
          usefulResources: details.usefulResources,
          industryInsight: details.industryInsight,
          developerMindset: `The engineering team prioritizes rapid feature deployment and positive user experience paths. Under deadline pressure, developers assume that parameters originating from their own front-end app or client environment are inherently safe, failing to validate data structures on the server or browser runtime.`,
          psychologicalError: `Implicit Trust Bias & Perimeter Blindness: Assuming that because an interface control (like an input field) limits user actions in standard browsers, malicious actors cannot bypass constraints using proxy tools, cURL, or custom script payloads.`,
          attackVectors: `Audit Code -> Identify Weak Input -> Configure Burp Suite -> Craft Payload -> Run Terminal Exploit -> Capture & Submit Flag.`
        },
        digitalArena: {
          title: "The Digital Arena Playground",
          duration: "90 Mins",
          stepByStepTutorial: details.stepByStepTutorial,
          labLink,
          instructions: `1. Review the step-by-step practical tutorial guide inside the Playground area below.\n2. Read the target code inspection snippet inside the Digital Arena panel.\n3. Write and execute your custom exploit payload directly in the local shell terminal.\n4. Review the execution results and copy the extracted FLAG into the answer verification box.`,
          interactiveConsolePlaceholder: `Enter captured FLAG (e.g. FLAG{...})`,
          correctFlag: `FLAG{${dayName.toUpperCase()}_${topicInfo.competency.replace(/[\s&()\-]/g, "_").toUpperCase()}_SUCCESS}`,
          flagSubmitted: "",
          flagVerified: false
        },
        automation: {
          title: "Automation & VDP Reporting Output",
          duration: "30 Mins",
          pythonScript: details.pythonAutomation,
          bashScript: details.bashAutomation,
          pythonExplanation: `Automating this exploit in Python creates a reusable proof-of-concept script for your bug bounty toolkit.`,
          bashExplanation: `Automating this exploit in Bash allows rapid CLI command-line execution across target IP ranges.`,
          vdpReportTemplate: details.vdpReportTemplate,
          checklist: [
            { id: `${dayId}-check-1`, text: "Audit code origin and payload execution logic", completed: false },
            { id: `${dayId}-check-2`, text: "Execute Python & Bash automation scripts in terminal", completed: false },
            { id: `${dayId}-check-3`, text: "Review CVSS string calculations and submit VDP report", completed: false }
          ],
          committed: false,
          reported: false
        }
      });
    }

    const bossLabId = `week-${w + 1}-boss`;
    const bossLab: BossLab = {
      id: bossLabId,
      weekIndex: w,
      title: topicInfo.bossLabTitle,
      scenario: topicInfo.bossLabScenario,
      targetEnvironmentDescription: `Target System: https://enterprise-gateway-${w + 1}.secure-mesh.corp:8443\nNetwork Architecture: Multi-tenant container orchestration cluster with microservice API endpoints, front-end cache node, and decoupled configuration services.`,
      instructions: `1. Review the system architecture and historical logs provided.\n2. Implement a complete chain attack: find the core client configuration vulnerability, override the payload parameters, execute the target payload to trigger internal reflection, and grab the flag.\n3. Input the captured Boss flag in the prompt below to verify server compromise.\n4. Complete and submit the high-impact VDP report including Description, Impact, and enterprise-grade Remediation.`,
      correctFlag: topicInfo.correctFlag,
      flagSubmitted: "",
      flagVerified: false,
      completed: false,
      vdpReport: {
        title: `CRITICAL Vulnerability Report - ${topicInfo.bossLabTitle}`,
        severity: "Critical",
        description: "",
        remediation: "",
        submitted: false
      }
    };

    weeks.push({
      weekNumber: w + 1,
      title: topicInfo.title,
      unlocked: w === 0, // Week 1 unlocked by default
      completed: false,
      days,
      bossLab
    });
  }

  return weeks;
};
