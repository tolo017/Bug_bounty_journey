import { Week, DayLesson, BossLab } from "../types/curriculum";

// Helper to generate weeks data
export const generateDefaultCurriculum = (): Week[] => {
  const weeks: Week[] = [];

  const competencies = [
    "Client-Side Security",
    "Secret Hunting & Recon",
    "Access Control (IDOR)",
    "Business Logic Security",
    "Session & Token Management",
    "Asset Mapping (Go/Linux)",
    "API Security Auditing",
    "Parameter & Logic Mining",
    "Corporate Reporting & VDP",
    "Network & Port Recon",
    "Cloud Infrastructure Auditing",
    "Advanced Chain Vulnerabilities"
  ];

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
          content: `Mastering ${dayTitle} (${topicInfo.competency}) requires stepping away from blind scanners and deconstructing software architecture from first principles.\n\nWHAT TO LOOK FOR DURING CODE AUDITS:\n1. Search JavaScript bundles & API source files for un-sanitized parameter reflections, global DOM object assignments, dynamic HTTP header handling, or missing authorization decorators.\n2. Inspect network requests for implicit trust models (e.g. relying on client-supplied X-User-ID headers, unverified JWT signatures, or un-encoded parameter merges).\n3. Test edge cases by mutating parameter types (e.g. strings to arrays/objects, positive integers to negative/fractional numbers, or standard JSON to polluted object prototypes).\n\nHOW TO CRAFT YOUR CUSTOM EXPLOIT:\nTo exploit this vulnerability in the Digital Arena terminal below, analyze the target source snippet provided in the inspection panel. Identify the un-sanitized variable, construct a targeted payload (such as property injections, custom header overrides, or prototype pollution assignments), and run the exploit locally to capture the verification flag.`,
          developerMindset: `The engineering team prioritizes rapid feature deployment and positive user experience paths. Under deadline pressure, developers assume that parameters originating from their own front-end app or client environment are inherently safe, failing to validate data structures on the server or browser runtime.`,
          psychologicalError: `Implicit Trust Bias & Perimeter Blindness: Assuming that because an interface control (like an input field) limits user actions in standard browsers, malicious actors cannot bypass constraints using proxy tools, cURL, or custom script payloads.`,
          attackVectors: `Step 1: Code Auditing & Identification -> Step 2: Interception & Parameter Mutating -> Step 3: Payload Injection -> Step 4: State Contamination / Privilege Escalation -> Step 5: Confidential Flag / Data Extraction.`
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
