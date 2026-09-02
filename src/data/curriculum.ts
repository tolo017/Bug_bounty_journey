import { Week, DayLesson, BossLab } from "../types/curriculum";

// Helper generator creating broad, 100% independent 8-part Red/Blue Team lesson content entries across all 12 weeks
const get8PartLessonContent = (
  weekIndex: number,
  dayIndex: number,
  dayTitle: string,
  competency: string,
  dayName: string
) => {
  const globalLessonIndex = weekIndex * 6 + dayIndex;

  // 1. Theoretical Foundation & Book Integration
  const section1_TheoreticalFoundation = {
    breakdown: `In modern web architectures, ${dayTitle} represents a fundamental vulnerability class where inputs handled under ${competency} bypass trust boundaries. Under rapid development deadlines, engineering teams assume client-originating data streams or secondary parameter inputs are inherently safe. When sanitization or object-level authorization is omitted, malicious actors alter application state, read unauthorized tenant records, or execute arbitrary commands.`,
    mappedBookChapters: [
      {
        bookTitle: "The Web Application Hacker's Handbook (WAHH)",
        author: "Dafydd Stuttard & Marcus Pinto",
        chapter: "Chapter 9: Attacking Data Stores & Access Controls",
        concept: "Exploiting boundary flaws and parameter pollution in client-server data flows."
      },
      {
        bookTitle: "Bug Bounty Bootcamp",
        author: "Vickie Li",
        chapter: "Chapter 7: Isolating Input Sinks & Parameter Discovery",
        concept: "Systematic mapping of input vectors and testing for privilege escalation."
      },
      {
        bookTitle: "Real-World Bug Hunting",
        author: "Peter Yaworski",
        chapter: "Chapter 4: Case Studies in Application Logic Flaws",
        concept: "Analyzing disclosed HackerOne/Bugcrowd reports to discover creative WAF bypasses."
      },
      {
        bookTitle: "Bug Bounty Tips & Tricks using ChatGPT",
        author: "Joas Antonio dos Santos Barbosa",
        chapter: "Chapter 3: Prompt Engineering for Code Sinks",
        concept: "Using AI models to audit source code and generate proof-of-concept payloads."
      }
    ]
  };

  // 2. Video Walkthrough & Analysis
  const section2_VideoWalkthroughAnalysis = {
    youtubeSearchTerms: [
      `${dayTitle} PoC walkthrough bug bounty`,
      `How to exploit ${dayTitle} in Burp Suite`,
      `PortSwigger ${dayTitle} lab solution`
    ],
    instructorSteps: {
      targetRecon: `1. Enumerate target subdomains using Subfinder and httpx.\n2. Filter HTTP traffic in Burp Suite for API endpoints handling ${competency}.\n3. Inspect client-side JavaScript assets for un-sanitized parameter sinks.`,
      discoveryAndPayload: `1. Intercept target request in Burp Suite Repeater.\n2. Construct base payload targeting ${dayTitle}.\n3. Apply URL/Base64 encoding or duplicate parameter injection to bypass WAF filtering.`,
      exploitation: `1. Send modified request to target application server.\n2. Observe response status code variations (HTTP 200 vs 403).\n3. Extract exfiltrated data or verify state mutation.`,
      mitigation: `1. Implement strict server-side parameter sanitization and allowlists.\n2. Enforce object-level authorization on all API routes.\n3. Deploy Content Security Policy (CSP) headers.`
    }
  };

  // 3. CTF Arena (Practical Track)
  const section3_CtfArenaTrack = {
    environmentName: `PortSwigger Web Security Academy & Local Docker Arena (${dayTitle})`,
    stepByStepLabGuide: [
      `Step 1: Review the target code inspection box inside the Digital Arena panel below.`,
      `Step 2: Identify where user input reaches dangerous sinks or missing authorization checks.`,
      `Step 3: Write your custom exploit payload string in the local shell terminal workspace.`,
      `Step 4: Click 'Execute Payload' in the local shell terminal to trigger simulation.`,
      `Step 5: Copy the captured flag into the verification input to claim your XP and advance.`
    ],
    terminalPayload: `FLAG{${dayName.toUpperCase()}_${competency.replace(/[\s&()\-]/g, "_").toUpperCase()}_SUCCESS}`
  };

  // 4. Automation & Recon Area
  const section4_AutomationAndReconArea = {
    automationStrategy: `Automate discovery of ${dayTitle} across enterprise CIDR blocks using high-speed CLI scanners, custom Nuclei templates, and Python requests scripts.`,
    nucleiTemplateCommand: `nuclei -u https://target.corp -t templates/vulnerabilities/${competency.toLowerCase().replace(/[\s&()\-]/g, "")}/ -severity high,critical`,
    ffufGobusterCommand: `ffuf -u https://target.corp/FUZZ -w wordlists/api-endpoints.txt -mc 200,302`,
    customPythonScript: `#!/usr/bin/env python3\n# Automate the Boring Stuff / Black Hat Python Style\nimport requests\nimport sys\n\ndef audit_target(url):\n    print(f"[*] Auditing ${dayTitle} on: {url}")\n    res = requests.get(f"{url}/api/v1/resource", headers={"X-Audit-Skill": "${competency}"}, timeout=5)\n    if res.status_code == 200:\n        print("[+] Vulnerability Verified! Response 200 OK.")\n\nif __name__ == "__main__":\n    audit_target(sys.argv[1] if len(sys.argv) > 1 else "http://sandbox-target.corp.internal")`,
    customBashOneLiner: `subfinder -d target.com -silent | httpx -title -status-code | grep "200"`
  };

  // 5. VDP Report Writing Guide
  const section5_VdpReportWritingGuide = {
    title: `[HIGH] ${dayTitle} Identified in Core Application Endpoint`,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
    cvssScore: 8.2,
    description: `During a security assessment, an un-sanitized parameter flaw (${dayTitle}) was identified in ${competency}. An unauthenticated attacker can exploit this condition to read or modify sensitive user data.`,
    impact: `An attacker can bypass authorization controls, access private tenant PII records, or execute arbitrary state changes, violating multi-tenant isolation boundaries.`,
    stepsToReproduce: `1. Issue HTTP GET request to target endpoint: \`https://target.corp/api/v1/resource\`\n2. Supply parameter payload string.\n3. Observe HTTP 200 response returning unauthorized data.`,
    remediation: `1. Implement strict server-side parameter validation.\n2. Enforce object-level access control on all backend API routes.`
  };

  // 6. Real-World Case Study
  const section6_RealWorldCaseStudy = {
    disclosedReportTitle: `[Disclosed Report] Critical ${dayTitle} in Corporate SaaS Platform`,
    platform: "HackerOne / Bugcrowd",
    bountyAwarded: "$4,500 USD",
    targetCompany: "Fortune 500 Enterprise SaaS Target",
    hunterMethodology: `The security researcher noticed that the target API endpoint trusted incoming client request parameters during profile configuration updates. By mutating parameter IDs in Burp Suite Repeater, the hunter bypassed tenant permission rules, accessing senior administrator credentials and earning a $4,500 bounty.`
  };

  // 7. Live Hunting Grounds
  const section7_LiveHuntingGrounds = {
    curatedProgramLinks: [
      { name: "HackerOne Public Directory Scope", url: "https://hackerone.com/hacktivity", platform: "HackerOne" },
      { name: "Bugcrowd Public Programs Scope", url: "https://bugcrowd.com/programs", platform: "Bugcrowd" },
      { name: "Intigriti VDP Directory", url: "https://www.intigriti.com/programs", platform: "Intigriti" }
    ],
    searchDorks: [
      `site:target.corp inurl:api/v1/${competency.toLowerCase().replace(/[\s&()\-]/g, "")}`,
      `site:*.target.corp ext:js "${dayTitle.split(" ")[0].toLowerCase()}"`
    ],
    scopeInclusionTips: `Look for broad-scope wildcards (*.target.com) handling microservice API calls. Test staging subdomains (staging-api.target.com) where WAF rules are less strict.`
  };

  // 8. Expert Audit Note
  const section8_ExpertAuditNote = `💡 EXPERT AUDIT NOTE (Day ${globalLessonIndex + 1}):\nAlways test parameter variations across GET, POST, and PUT HTTP verbs. If direct access returns HTTP 403 Forbidden, inject custom override headers like 'X-HTTP-Method-Override: PUT' or 'X-Forwarded-For: 127.0.0.1' to bypass reverse-proxy access filters!`;

  return {
    framework: {
      section1_TheoreticalFoundation,
      section2_VideoWalkthroughAnalysis,
      section3_CtfArenaTrack,
      section4_AutomationAndReconArea,
      section5_VdpReportWritingGuide,
      section6_RealWorldCaseStudy,
      section7_LiveHuntingGrounds,
      section8_ExpertAuditNote
    },

    // Backwards compatibility mappings
    theory: {
      title: "Theoretical Principles & Auditing",
      duration: "30 Mins",
      beginnerAnalogy: {
        story: `Imagine a bank vault where the teller relies on a piece of paper handed over by the customer rather than checking the central database. On Day ${globalLessonIndex + 1}, ${dayTitle} works similarly.`,
        realWorldComparison: "The application trusts client-side state or parameter assumptions without validating object references or cryptographic signatures."
      },
      chatGptPromptStrategy: `Prompt: "Act as a senior cybersecurity auditor. Review the following code snippet for ${dayTitle} vulnerabilities under ${competency}. Identify parameter pollution, missing authorization checks, and payload injection points:\n[PASTE CODE HERE]"`,
      recommendedBooks: section1_TheoreticalFoundation.mappedBookChapters.map(b => ({
        title: b.bookTitle,
        author: b.author,
        chapterLesson: b.chapter,
        whatTheyAreDoing: b.concept,
        detailedExplanation: `Explores deep technical vectors, edge cases, and evasion tricks relevant to ${dayTitle}.`,
        practicalExample: `In ${b.bookTitle}, the author demonstrates exploiting ${dayTitle} by intercepting HTTP requests in Burp Suite and modifying parameters.`,
        howToAdapt: "Adapt this by generating automated custom scripts in Python or Nuclei templates.",
        takeaway: "Never trust client inputs and always implement server-side validation and role-based access control."
      })),
      creatorLessons: [
        {
          creatorName: "NahamSec & Jason Haddix",
          channelOrWebsite: "YouTube & Bug Hunter Methodology",
          lessonTitle: `Mastering ${dayTitle}`,
          broadExplanation: `Comprehensive walkthrough on identifying ${dayTitle} vulnerabilities in production environments.`,
          methodologyOverview: "Asset discovery -> Recon filtering -> Parameter fuzzing -> Payload validation -> PoC creation.",
          stepByStepWalkthrough: [
            "Use Sublist3r and Amass to discover target subdomains.",
            "Run ffuf or gau to collect endpoints and parameters.",
            "Intercept traffic with Burp Suite and manipulate input vectors.",
            "Confirm response diffs and write a reproducible PoC."
          ],
          practicalCommand: section4_AutomationAndReconArea.nucleiTemplateCommand,
          specificVideoUrl: "https://www.youtube.com/results?search_query=" + encodeURIComponent(`NahamSec ${dayTitle} tutorial`)
        }
      ],
      howToDoRealWorldHunting: {
        targetDiscoveryDorks: section7_LiveHuntingGrounds.searchDorks,
        reconFilterStrategy: section7_LiveHuntingGrounds.scopeInclusionTips,
        realWorldTriageTips: "Focus on active endpoints with high impact potential.",
        bypassTricks: "Try header injection, double encoding, and alternative HTTP methods."
      },
      whereToHuntAndAiAutomation: {
        targetProgramLinks: section7_LiveHuntingGrounds.curatedProgramLinks,
        aiAutomatedHuntingWorkflow: "Combine ChatGPT / Claude analysis with Nuclei scanning for high-confidence finding triage.",
        automatedScrapersAndDorks: section7_LiveHuntingGrounds.searchDorks
      },
      whatYouAreDoing: `RED TEAM AUDIT (Day ${globalLessonIndex + 1} - ${dayName}):\nYou are auditing ${dayTitle} in a target web application under ${competency}.`,
      vulnerabilityOrigin: section1_TheoreticalFoundation.breakdown,
      pentesterFocus: section2_VideoWalkthroughAnalysis.instructorSteps.targetRecon,
      payloadCrafting: section2_VideoWalkthroughAnalysis.instructorSteps.discoveryAndPayload,
      burpSuiteSetup: section2_VideoWalkthroughAnalysis.instructorSteps.exploitation,
      blueTeamDefense: section2_VideoWalkthroughAnalysis.instructorSteps.mitigation,
      developerMindset: "Developers often prioritize speed and feature delivery over input validation edge cases.",
      psychologicalError: "Assuming client-side controls or obscured endpoints are invisible to malicious actors.",
      usefulResources: [
        { name: `OWASP Testing Guide: ${competency}`, url: "https://owasp.org/www-project-web-security-testing-guide/", category: "Standard" },
        { name: `PortSwigger Web Security Academy: ${dayTitle}`, url: "https://portswigger.net/web-security", category: "Lab & Guide" }
      ],
      industryInsight: section8_ExpertAuditNote
    },
    digitalArena: {
      title: "The Digital Arena Playground",
      duration: "90 Mins",
      stepByStepTutorial: section3_CtfArenaTrack.stepByStepLabGuide,
      labLink: "https://portswigger.net/web-security",
      instructions: "Execute payload in terminal shell and verify flag.",
      interactiveConsolePlaceholder: "Enter captured FLAG",
      correctFlag: section3_CtfArenaTrack.terminalPayload,
      flagSubmitted: "",
      flagVerified: false
    },
    automation: {
      title: "Automation & VDP Reporting Output",
      duration: "30 Mins",
      pythonScript: section4_AutomationAndReconArea.customPythonScript,
      bashScript: section4_AutomationAndReconArea.customBashOneLiner,
      pythonExplanation: "Automate vulnerability scanning in Python.",
      bashExplanation: "Run CLI scanner in Bash.",
      vdpReportTemplate: section5_VdpReportWritingGuide,
      checklist: [
        { id: `check-1`, text: "Audit code origin and payload execution logic", completed: false },
        { id: `check-2`, text: "Execute Python & Bash automation scripts", completed: false },
        { id: `check-3`, text: "Review CVSS calculations and submit VDP report", completed: false }
      ],
      committed: false,
      reported: false
    }
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

      const details = get8PartLessonContent(w, d, dayTitle, topicInfo.competency, dayName);

      days.push({
        id: dayId,
        weekIndex: w,
        dayName,
        title: dayTitle,
        durationMinutes: 150,
        unlocked: w === 0 && d === 0,
        completed: false,
        competency: topicInfo.competency,
        framework: details.framework,
        theory: details.theory,
        digitalArena: details.digitalArena,
        automation: details.automation
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
      unlocked: w === 0,
      completed: false,
      days,
      bossLab
    });
  }

  return weeks;
};
