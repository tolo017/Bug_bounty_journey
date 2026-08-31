import { Week, DayLesson, BossLab } from "../types/curriculum";

// Helper to generate beginner-friendly lesson content for all 12 weeks
const getLessonDetails = (weekIndex: number, dayIndex: number, dayTitle: string, competency: string) => {
  const analogies: Record<number, string> = {
    0: `💡 FUN ANALOGY (Client-Side Security):\nImagine a coat-check attendant at a party. Instead of checking your physical ticket, they ask "What jacket is yours?" If you say "The expensive leather jacket," they hand it to you! DOM & Prototype Pollution happen when the browser trusts input from the URL or DOM without checking if you own or control it.`,
    1: `💡 FUN ANALOGY (Secret Hunting):\nImagine a developer moving into a new apartment and hiding their spare house key under the doormat. Even after painting the front door, the key is still sitting under the mat! Developers accidentally leave API keys, cloud secrets, and database passwords inside compiled JS files or Git commit histories.`,
    2: `💡 FUN ANALOGY (IDOR Bypasses):\nImagine a hotel where every room keycard has the room number printed in marker on the back. If your keycard says "Room 101", and you scribble "102" over it with a pen, the door unlocks! IDOR happens when an app trusts a user ID in the request header or URL without checking if you belong to that account.`,
    3: `💡 FUN ANALOGY (Business Logic Flaws):\nImagine a vending machine that sells sodas for $2.00. If you enter "-5 sodas", the machine gives you $10.00 cash back instead of charging you! Business logic flaws happen when developers forget to check if numbers make sense in real life (like negative prices or race conditions).`,
    4: `💡 FUN ANALOGY (JWT & Session Exploits):\nImagine a VIP concert wristband stamped with ink. If you erase the security stamp using alcohol and write "STAGE PASS - NONE" in sharpie, the bouncer lets you backstage without verifying who signed it! JWT 'None' algorithm attacks happen when servers accept unsigned security tokens.`,
    5: `💡 FUN ANALOGY (Asset Mapping & Recon):\nImagine a detective trying to locate every entrance to a giant skyscraper. Instead of knocking on the front glass door, they check the emergency exits, basement loading docks, and rooftop helicopter pads. Subdomain recon finds forgotten internal servers that lack security patches.`,
    6: `💡 FUN ANALOGY (API Security & BOLA):\nImagine an online food delivery app. When you order Burger #5, the app sends \`GET /api/orders/5\`. If you change it to \`GET /api/orders/6\`, you can view another customer's full home address and credit card details! BOLA occurs when APIs fail to verify resource ownership.`,
    7: `💡 FUN ANALOGY (Parameter Mining):\nImagine a secret club door with no doorknob. If you whisper "debug=true" or "admin=1" through the keyhole, the door swings wide open! Parameter mining tools (like Arjun) test thousands of secret parameter names to find hidden developer backdoors.`,
    8: `💡 FUN ANALOGY (Corporate VDP Reporting):\nImagine calling 911 to report a building fire. You don't just say "Fire!"; you give the exact address, floor number, room, and how to put it out. A great VDP report provides clear step-by-step reproduction steps so engineering teams can fix the bug immediately.`,
    9: `💡 FUN ANALOGY (Network & Port Recon):\nImagine walking down a quiet neighborhood street at night, gently tapping on front doors, back windows, and side gates to see which ones are unlocked. Nmap port scanning checks every network port to identify running services.`,
    10: `💡 FUN ANALOGY (Cloud Infrastructure Auditing):\nImagine an office receptionist who trusts anyone wearing a high-vis vest. If you ask her, "Please print out the master safe password from the internal cloud server," she prints it out and hands it to you! SSRF attacks trick cloud servers into exfiltrating private AWS/GCP metadata credentials.`,
    11: `💡 FUN ANALOGY (Advanced Exploit Chains):\nImagine a row of dominoes. Knocking over the first tiny domino (a small file upload flaw) triggers a medium domino (path traversal), which knocks down the giant domino (Remote Code Execution)! Exploit chaining connects small bugs into a high-impact takeover.`
  };

  const tutorials: Record<number, string[]> = {
    0: [
      `Step 1: Inspect the target code snippet in the Digital Arena panel below to locate un-sanitized dynamic variables.`,
      `Step 2: Identify where user input (query strings or DOM properties) flows without sanitization.`,
      `Step 3: Construct your exploit payload (e.g., __proto__.isAdmin=true or clobbering iframe IDs).`,
      `Step 4: Click 'Run Exploit' to execute your payload in the terminal shell and retrieve the flag!`,
      `Step 5: Copy the captured flag into the verification box and click 'Verify & Complete'.`
    ],
    1: [
      `Step 1: Audit compiled JavaScript bundles or source files looking for API key signatures (AWS, Firebase, GCP).`,
      `Step 2: Search for regex patterns matching secret strings (e.g., AKIA..., AIza..., or secret_key).`,
      `Step 3: Type your secret extraction command or regex payload in the payload workspace.`,
      `Step 4: Execute the script in the terminal shell to extract leaked credentials and system flags.`,
      `Step 5: Submit the verified flag to complete the lesson and record your research log.`
    ],
    2: [
      `Step 1: Examine the API endpoint structure (e.g., /api/user/101 or X-User-ID: 101).`,
      `Step 2: Test modifying numeric IDs, substituting UUIDs, or using HTTP Parameter Pollution (HPP).`,
      `Step 3: Type your header override or parameter injection string in the exploit box.`,
      `Step 4: Run the exploit in the terminal shell to bypass authorization checks and capture the flag.`,
      `Step 5: Copy the flag into the submission box to earn XP and unlock the next lesson!`
    ],
    3: [
      `Step 1: Review the business workflow order (e.g. Item Select -> Discount -> Payment -> Disbursement).`,
      `Step 2: Identify parameter logic flaws such as negative amounts, fractional quantities, or step-skipping.`,
      `Step 3: Type your business logic payload (e.g. {"quantity": -5} or out-of-order execution steps).`,
      `Step 4: Run the exploit to trigger state collision and retrieve the challenge flag.`,
      `Step 5: Paste the flag into the submission box and confirm completion.`
    ],
    4: [
      `Step 1: Inspect the JWT session token structure (Header.Payload.Signature).`,
      `Step 2: Identify vulnerabilities like 'alg': 'none', weak secret keys, or JWK header injections.`,
      `Step 3: Write your forged token payload specifying administrative roles.`,
      `Step 4: Execute the payload in the terminal shell to bypass authentication barriers.`,
      `Step 5: Submit the extracted flag to claim your JWT Forger badge!`
    ],
    5: [
      `Step 1: Use automated subdomain enumeration techniques (Subfinder, Amass, Massdns).`,
      `Step 2: Probe for live HTTP endpoints and virtual host (VHost) configurations using ffuf.`,
      `Step 3: Type your recon command or VHost target parameter in the payload workspace.`,
      `Step 4: Run the scan in the terminal shell to discover hidden admin subdomains and flags.`,
      `Step 5: Verify the flag to record your Recon Specialist achievement.`
    ],
    6: [
      `Step 1: Reverse-engineer exposed Swagger / OpenAPI endpoints to map schema objects.`,
      `Step 2: Test for Broken Object Level Authorization (BOLA) by changing object resource IDs.`,
      `Step 3: Type your API method override or BOLA payload string in the terminal prompt.`,
      `Step 4: Execute the exploit to mutate administrative API configurations and grab the flag.`,
      `Step 5: Complete verification and log your daily research progress.`
    ],
    7: [
      `Step 1: Scan target web endpoints for un-linked parameters using Arjun or Param Miner logic.`,
      `Step 2: Look for hidden administrative flags like debug=true, admin=1, or X-HTTP-Method-Override.`,
      `Step 3: Type your parameter mining string in the payload workspace.`,
      `Step 4: Run the exploit in the shell to discover secret caching parameters and flags.`,
      `Step 5: Verify the flag to complete the parameter mining module.`
    ],
    8: [
      `Step 1: Organize your vulnerability findings into Executive Summary, Impact, and PoC steps.`,
      `Step 2: Calculate accurate CVSS v3.1 / v4.0 severity vector strings.`,
      `Step 3: Type your report summary and remediation guidance in the structured fields.`,
      `Step 4: Run verification to submit your corporate security assessment.`,
      `Step 5: Submit the report to earn corporate reporting credentials.`
    ],
    9: [
      `Step 1: Optimize Nmap scan timing parameters to avoid firewall rate-limiting (-T3/T4).`,
      `Step 2: Probe service banners and cryptographic SSL/TLS cipher suites on target ports.`,
      `Step 3: Type your firewall-evading scan string in the payload workspace.`,
      `Step 4: Run the network scan in the shell to locate un-filtered administration ports.`,
      `Step 5: Submit the verified network flag.`
    ],
    10: [
      `Step 1: Identify Server-Side Request Forgery (SSRF) endpoints targeting AWS/GCP metadata.`,
      `Step 2: Test bypassing IMDSv2 token headers using Open Redirects or local headers.`,
      `Step 3: Type your SSRF metadata query string (e.g., http://169.254.169.254/latest/meta-data/).`,
      `Step 4: Execute the SSRF exploit to exfiltrate cloud service tokens and flags.`,
      `Step 5: Paste the flag to unlock the Cloud Exfiltrator badge!`
    ],
    11: [
      `Step 1: Identify initial entry points (e.g. path traversal during SVG file upload).`,
      `Step 2: Chain local file inclusion (LFI) with SSRF query parameters targeting internal nodes.`,
      `Step 3: Write your multi-stage exploit chain payload string in the workspace.`,
      `Step 4: Run the exploit chain in the terminal shell to achieve Remote Code Execution (RCE).`,
      `Step 5: Copy the grandmaster flag and submit to complete the 12-week program!`
    ]
  };

  const simpleExplanations: Record<number, string> = {
    0: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how browser JavaScript variables can be modified by manipulating the HTML DOM tree or query string.`,
    1: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how to scan code files and server configurations to find accidentally published API keys and passwords.`,
    2: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how web apps check user permissions, and how changing an ID number lets you view another person's account.`,
    3: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how apps process workflows like shopping carts and payments, and how unexpected inputs break logic.`,
    4: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how web sessions use security tokens (JWTs) to remember logins, and how modifying token signatures grants admin rights.`,
    5: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how to map out a company's entire digital presence across subdomains, IP ranges, and open ports.`,
    6: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how modern mobile apps and web frontends communicate with backend APIs, and how to find hidden API endpoints.`,
    7: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how to discover hidden URL parameters that developers used during testing but forgot to remove.`,
    8: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how to translate technical hacking findings into clear, high-impact security reports for companies.`,
    9: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how network packets travel across firewalls and how port scanners fingerprint active servers.`,
    10: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how cloud servers (AWS, Azure, GCP) store access keys and how SSRF tricks servers into leaking them.`,
    11: `Mastering ${dayTitle} (${competency}) is beginner-friendly! You are learning how expert researchers combine small, low-severity bugs into complete server takeovers.`
  };

  return {
    content: simpleExplanations[weekIndex],
    funAnalogy: analogies[weekIndex],
    stepByStepTutorial: tutorials[weekIndex]
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

      const details = getLessonDetails(w, d, dayTitle, topicInfo.competency);

      days.push({
        id: dayId,
        weekIndex: w,
        dayName,
        title: dayTitle,
        durationMinutes: 150, // 30 (Theory) + 90 (Arena) + 30 (Automation)
        unlocked: w === 0 && d === 0, // Week 1 Monday is unlocked by default
        completed: false,
        competency: topicInfo.competency,
        theory: {
          title: "Theoretical Theory & Logic",
          duration: "30 Mins",
          content: details.content,
          funAnalogy: details.funAnalogy,
          stepByStepTutorial: details.stepByStepTutorial,
          developerMindset: `The engineering team prioritizes rapid feature deployment and positive user experience paths. Under deadline pressure, developers assume that parameters originating from their own front-end app or client environment are inherently safe, failing to validate data structures on the server or browser runtime.`,
          psychologicalError: `Implicit Trust Bias & Perimeter Blindness: Assuming that because an interface control (like an input field) limits user actions in standard browsers, malicious actors cannot bypass constraints using proxy tools, cURL, or custom script payloads.`,
          attackVectors: `Audit Code -> Identify Weak Input -> Craft Payload -> Run Terminal Exploit -> Capture & Submit Flag.`
        },
        digitalArena: {
          title: "The Digital Arena",
          duration: "90 Mins",
          labLink,
          instructions: `1. Read the target code inspection snippet inside the Digital Arena panel below.\n2. Identify the weak parameter or vulnerable logic path.\n3. Write and execute your custom exploit payload directly in the local shell terminal.\n4. Review the execution results and copy the extracted FLAG into the answer verification box.`,
          interactiveConsolePlaceholder: `Enter captured FLAG (e.g. FLAG{...})`,
          correctFlag: `FLAG{${dayName.toUpperCase()}_${topicInfo.competency.replace(/[\s&()\-]/g, "_").toUpperCase()}_SUCCESS}`,
          flagSubmitted: "",
          flagVerified: false
        },
        automation: {
          title: "Automation & Output",
          duration: "30 Mins",
          language: d % 2 === 0 ? "python" : "bash",
          scriptTemplate: d % 2 === 0
            ? `#!/usr/bin/env python3\nimport requests\nimport sys\n\n# Dynamic Exploit Script for ${dayTitle}\nTARGET_URL = "http://target.local/api/v1/exploit"\n\ndef exploit(url):\n    print(f"[*] Attacking: {url}")\n    payload = {"payload": "__proto__.polluted"}\n    headers = {"X-Custom-Bypass": "True"}\n    response = requests.post(url, json=payload, headers=headers)\n    if response.status_code == 200:\n        print("[+] Exploit completed successfully!")\n        print(f"[+] Output: {response.text}")\n    else:\n        print("[-] Exploit failed.")\n\nif __name__ == "__main__":\n    url = sys.argv[1] if len(sys.argv) > 1 else TARGET_URL\n    exploit(url)`
            : `#!/usr/bin/env bash\n# Bash Automation Tool for ${dayTitle}\nTARGET=$1\nif [ -z "$TARGET" ]; then\n  TARGET="http://target.local"\nfi\n\necho "[*] Mapping targets on: $TARGET"\ncurl -s -X POST -H "Content-Type: application/json" -d '{"audit": "true"}' "$TARGET" | grep -E "(flag|vuln|error)"`,
          explanation: `Automating this exploit is crucial for professional engagements. By codifying this process, you create a reusable asset for your bug bounty arsenal. This script implements target extraction, request crafting, custom bypass headers, and validates output payloads in real-time.`,
          checklist: [
            { id: `${dayId}-check-1`, text: "Understand the target core payload mechanisms", completed: false },
            { id: `${dayId}-check-2`, text: "Customize the script to fit target boundaries", completed: false },
            { id: `${dayId}-check-3`, text: "Verify that the automated flag is successfully parsed", completed: false }
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
