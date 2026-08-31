import { Week, DayLesson, BossLab } from "../types/curriculum";

// Helper to generate PortSwigger-aligned comprehensive lesson content
const getLessonDetails = (weekIndex: number, dayIndex: number, dayTitle: string, competency: string) => {
  const whatYouAreDoingMap: Record<number, string> = {
    0: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are auditing client-side JavaScript source code to uncover un-sanitized DOM manipulations, global variable overrides, and prototype pollution vectors. You will intercept network requests, construct custom DOM/prototype payloads, and trigger state mutations in the browser sandbox.`,
    1: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are acting as a reconnaissance specialist searching through compiled JavaScript bundles, Docker container layers, and Git commit logs. Your goal is to identify hardcoded API keys, database credentials, and cloud secrets left behind by developers.`,
    2: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are testing multi-tenant access control boundaries. You will intercept HTTP API calls and tamper with numeric identifiers, UUID parameters, and custom request headers (such as X-User-ID) to access unauthorized user data.`,
    3: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are auditing business logic workflows in e-commerce and transaction systems. You will test edge cases like negative cart quantities, out-of-order multi-step execution, and race conditions to bypass price and quota checks.`,
    4: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are analyzing JSON Web Tokens (JWT) used for session authentication. You will forge token signatures using the 'None' algorithm, crack weak HMAC secrets using Hashcat, and perform JWK header injection attacks.`,
    5: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are mapping a target organization's entire external digital footprint using Go-based tools (Subfinder, Amass, Massdns, Naabu, ffuf). You will discover un-linked subdomains, virtual hosts, and open administrative ports.`,
    6: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are reverse-engineering REST and GraphQL APIs. You will parse exposed Swagger/OpenAPI specifications, test for Broken Object Level Authorization (BOLA), and escalate privileges using HTTP method overrides (GET to PUT/POST).`,
    7: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are mining hidden HTTP parameters and debug query flags using Arjun and Param Miner. You will uncover hidden developer backdoors (like debug=true or admin=1) and test custom cache-control headers.`,
    8: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are mastering corporate-grade Vulnerability Disclosure Program (VDP) reporting. You will structure high-impact bug reports for HackerOne and Bugcrowd, calculate precise CVSS v3.1/v4.0 vectors, and write clear remediation steps.`,
    9: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are performing network-level reconnaissance and firewall evasion. You will optimize Nmap timing scans, bypass filtering layers using source port decoys, and fingerprint SSL/TLS cryptographic cipher suites.`,
    10: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are auditing cloud infrastructure security across AWS, GCP, and Azure. You will exploit Server-Side Request Forgery (SSRF) vulnerabilities to bypass AWS IMDSv2 metadata checks and extract temporary cloud credentials.`,
    11: `WHAT YOU ARE DOING IN THIS LESSON:\nYou are executing complex multi-vulnerability exploit chains. You will combine path traversal file upload bugs with Local File Inclusion (LFI) and SSRF to achieve full system Remote Code Execution (RCE).`
  };

  const tutorialsMap: Record<number, string[]> = {
    0: [
      `Step 1: Open the target code inspection box below and locate un-sanitized DOM or variable assignments.`,
      `Step 2: Identify where user input (query parameters or hash fragments) is passed to dangerous sinks like innerHTML or Object.assign.`,
      `Step 3: Construct your exploit payload (e.g. __proto__.isAdmin=true or clobbering an iframe ID).`,
      `Step 4: Execute the payload in the local shell terminal to compromise the sandbox container.`,
      `Step 5: Copy the captured flag into the verification box and click 'Verify & Complete' to earn XP.`
    ],
    1: [
      `Step 1: Inspect compiled JavaScript bundles or environment files looking for API key signatures.`,
      `Step 2: Apply regex search patterns matching AWS keys (AKIA...), GCP keys (AIza...), or Firebase databases.`,
      `Step 3: Enter your credential extraction payload or regex search query in the workspace.`,
      `Step 4: Run the exploit in the terminal shell to parse leaked secrets and retrieve system flags.`,
      `Step 5: Submit the verified flag to record your research log on GitHub.`
    ],
    2: [
      `Step 1: Intercept the target API request (e.g. GET /api/v1/users/101 or X-User-ID: 101).`,
      `Step 2: Test modifying numeric IDs, substituting UUIDs, or injecting HTTP Parameter Pollution (HPP) strings.`,
      `Step 3: Type your header override or parameter payload string in the terminal workspace.`,
      `Step 4: Run the exploit to bypass access controls and extract the flag.`,
      `Step 5: Submit the flag to claim your IDOR Master badge.`
    ],
    3: [
      `Step 1: Analyze the multi-step transaction workflow (Select -> Discount -> Checkout -> Disbursement).`,
      `Step 2: Test logic edge cases such as negative quantities (-5), fractional prices, or out-of-order execution steps.`,
      `Step 3: Type your business logic exploit payload in the workspace.`,
      `Step 4: Execute the payload in the terminal shell to trigger state collision and retrieve the flag.`,
      `Step 5: Paste the flag into the verification input to complete the challenge.`
    ],
    4: [
      `Step 1: Decode the JWT session token parts (Header, Payload, Signature) using Base64 decoding.`,
      `Step 2: Identify token flaws such as alg: 'none', weak secret keys, or JWK header injection points.`,
      `Step 3: Write your modified token payload specifying administrative roles.`,
      `Step 4: Run the token forgery exploit in the terminal shell to bypass authentication barriers.`,
      `Step 5: Submit the flag to claim your JWT Forger badge.`
    ],
    5: [
      `Step 1: Run subdomain discovery tools (Subfinder, Amass) against the target domain.`,
      `Step 2: Probe for live HTTP services and virtual hosts (VHosts) using ffuf and Massdns.`,
      `Step 3: Type your recon command or target subdomain parameter in the terminal workspace.`,
      `Step 4: Execute the scan in the terminal shell to discover hidden admin subdomains and flags.`,
      `Step 5: Submit the flag to log your Recon Specialist achievement.`
    ],
    6: [
      `Step 1: Audit exposed Swagger / OpenAPI endpoints to map resource paths and parameters.`,
      `Step 2: Test for Broken Object Level Authorization (BOLA) by changing object resource IDs in GET/PUT calls.`,
      `Step 3: Write your API method override or BOLA payload in the workspace.`,
      `Step 4: Run the exploit in the terminal shell to mutate administrative configurations.`,
      `Step 5: Submit the verified API flag.`
    ],
    7: [
      `Step 1: Scan target web endpoints for un-linked parameters using Arjun or Param Miner logic.`,
      `Step 2: Look for hidden administrative flags like debug=true, admin=1, or X-HTTP-Method-Override.`,
      `Step 3: Type your parameter mining string in the payload workspace.`,
      `Step 4: Run the exploit in the shell to discover secret caching parameters and flags.`,
      `Step 5: Verify the flag to complete the parameter mining module.`
    ],
    8: [
      `Step 1: Organize vulnerability findings into Executive Summary, Impact Analysis, and PoC steps.`,
      `Step 2: Calculate accurate CVSS v3.1 / v4.0 severity vector strings.`,
      `Step 3: Enter your structured report description and remediation guidance in the form.`,
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
      `Step 1: Locate Server-Side Request Forgery (SSRF) parameters targeting AWS/GCP metadata endpoints.`,
      `Step 2: Test bypassing IMDSv2 token headers using Open Redirects or local header manipulation.`,
      `Step 3: Type your SSRF metadata query string (e.g. http://169.254.169.254/latest/meta-data/).`,
      `Step 4: Execute the SSRF exploit to exfiltrate cloud service tokens and flags.`,
      `Step 5: Paste the flag to unlock the Cloud Exfiltrator badge.`
    ],
    11: [
      `Step 1: Identify initial entry points (e.g. path traversal during SVG file upload).`,
      `Step 2: Chain local file inclusion (LFI) with SSRF query parameters targeting internal nodes.`,
      `Step 3: Write your multi-stage exploit chain payload string in the workspace.`,
      `Step 4: Run the exploit chain in the terminal shell to achieve Remote Code Execution (RCE).`,
      `Step 5: Copy the grandmaster flag and submit to complete the 12-week program!`
    ]
  };

  const resourcesMap: Record<number, { name: string; url: string; category: string }[]> = {
    0: [
      { name: "PortSwigger Web Security Academy: DOM Clobbering", url: "https://portswigger.net/web-security/dom-based/dom-clobbering", category: "Lab & Guide" },
      { name: "OWASP Client-Side Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", category: "Standard" },
      { name: "DOM Purify Library Documentation", url: "https://github.com/cure53/DOMPurify", category: "Defense" }
    ],
    1: [
      { name: "Trufflehog Secret Scanner Repository", url: "https://github.com/trufflesecurity/trufflehog", category: "Tooling" },
      { name: "GitGuardian Secret Detection Standards", url: "https://www.gitguardian.com/", category: "Reference" },
      { name: "Regex101 Pattern Tester", url: "https://regex101.com/", category: "Utility" }
    ],
    2: [
      { name: "PortSwigger Access Control Cheat Sheet", url: "https://portswigger.net/web-security/access-control", category: "Cheat Sheet" },
      { name: "OWASP Insecure Direct Object Reference Prevention", url: "https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html", category: "Standard" }
    ],
    3: [
      { name: "PortSwigger Business Logic Vulnerabilities Guide", url: "https://portswigger.net/web-security/logic-flaws", category: "Guide" },
      { name: "OWASP Business Logic Testing Checklist", url: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/10-Business_Logic_Testing/README", category: "Checklist" }
    ],
    4: [
      { name: "RFC 7519: JSON Web Token (JWT) Specification", url: "https://datatracker.ietf.org/doc/html/rfc7519", category: "RFC Spec" },
      { name: "JWT.io Token Debugger & Encoder", url: "https://jwt.io/", category: "Tooling" },
      { name: "PortSwigger JWT Security Testing", url: "https://portswigger.net/web-security/jwt", category: "Lab & Guide" }
    ],
    5: [
      { name: "ProjectDiscovery Subfinder Repository", url: "https://github.com/projectdiscovery/subfinder", category: "Tooling" },
      { name: "OWASP Amass Reconnaissance Framework", url: "https://github.com/owasp-amass/amass", category: "Tooling" },
      { name: "ffuf Fast Web Fuzzer Repository", url: "https://github.com/ffuf/ffuf", category: "Tooling" }
    ],
    6: [
      { name: "OWASP API Security Top 10 Specification", url: "https://owasp.org/www-project-api-security/", category: "Standard" },
      { name: "PortSwigger API Security Testing Guide", url: "https://portswigger.net/web-security/api-testing", category: "Guide" }
    ],
    7: [
      { name: "Arjun Parameter Discovery Suite", url: "https://github.com/s0md3v/Arjun", category: "Tooling" },
      { name: "PortSwigger Web Cache Poisoning & Parameter Mining", url: "https://portswigger.net/web-security/web-cache-poisoning", category: "Guide" }
    ],
    8: [
      { name: "FIRST CVSS v3.1 Calculator Specification", url: "https://www.first.org/cvss/calculator/3.1", category: "Calculator" },
      { name: "HackerOne Bug Report Writing Guide", url: "https://www.hackerone.com/", category: "Guide" }
    ],
    9: [
      { name: "Nmap Network Mapper Official Reference Manual", url: "https://nmap.org/book/man.html", category: "Documentation" },
      { name: "SSL Labs Server Test Tool", url: "https://www.ssllabs.com/ssltest/", category: "Tooling" }
    ],
    10: [
      { name: "AWS Instance Metadata Service v2 (IMDSv2) Docs", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html", category: "Cloud Docs" },
      { name: "PortSwigger Server-Side Request Forgery (SSRF) Labs", url: "https://portswigger.net/web-security/ssrf", category: "Guide" }
    ],
    11: [
      { name: "PortSwigger Exploit Chaining & RCE Guides", url: "https://portswigger.net/web-security/server-side-template-injection", category: "Guide" },
      { name: "PayloadsAllTheThings Exploitation Repository", url: "https://github.com/swisskyrepo/PayloadsAllTheThings", category: "Repository" }
    ]
  };

  const insightsMap: Record<number, string> = {
    0: `💡 INDUSTRY INSIGHT & STATISTIC:\nAccording to HackerOne's Top Vulnerability Reports, client-side vulnerabilities like Prototype Pollution and DOM Clobbering regularly command bounties between $1,500 and $7,500 on major tech programs like Google, GitHub, and Shopify.`,
    1: `💡 INDUSTRY INSIGHT & STATISTIC:\nHardcoded cloud keys remain the #1 source of fast bounties for beginners. Over $10,000,000 in bounties were awarded on Bugcrowd for leaked AWS S3 keys, Firebase endpoints, and Docker configs in recent years.`,
    2: `💡 INDUSTRY INSIGHT & STATISTIC:\nInsecure Direct Object References (IDOR) are ranked in the top 3 highest-paying bug classes on Bugcrowd and HackerOne due to their severe privacy impact, averaging $2,000 - $10,000 per submission.`,
    3: `💡 INDUSTRY INSIGHT & STATISTIC:\nBusiness logic flaws require zero automated tools—only keen analytical observation. Researchers who identified race condition flaws in gift card checkouts earned $15,000+ bounties on major airline and e-commerce targets.`,
    4: `💡 INDUSTRY INSIGHT & STATISTIC:\nJWT signature bypasses represent critical (CVSS 9.0+) severity bugs. On corporate multi-tenant applications, a single valid JWT signature forgery report often results in maximum bounty payouts ($10,000+).`,
    5: `💡 INDUSTRY INSIGHT & STATISTIC:\nSubdomain enumeration tools built in Go (Subfinder, Amass, Naabu) process over 100,000 subdomains per minute. Finding a forgotten staging server (\`staging-api.corp.com\`) is the most common gateway to finding zero-day bugs.`,
    6: `💡 INDUSTRY INSIGHT & STATISTIC:\nBroken Object Level Authorization (BOLA) is the #1 vulnerability on the OWASP API Top 10. Modern mobile and SaaS apps communicate exclusively via REST/GraphQL APIs, making API auditing the highest-yield bounty domain.`,
    7: `💡 INDUSTRY INSIGHT & STATISTIC:\nParameter mining uncovers backdoors that automated web vulnerability scanners completely miss. Over 40% of web application firewalls (WAFs) can be bypassed simply by discovering a secret \`debug=1\` query parameter.`,
    8: `💡 INDUSTRY INSIGHT & STATISTIC:\nClear, professional VDP reports get triaged 3x faster and receive higher bounties. Top researchers format their reports using executive summaries, exact cURL commands, and CVSS vector strings.`,
    9: `💡 INDUSTRY INSIGHT & STATISTIC:\nNetwork-level port scanning reveals non-HTTP services like Redis (port 6379), ElasticSearch (port 9200), and Memcached (port 11211) that are frequently exposed without password authentication.`,
    10: `💡 INDUSTRY INSIGHT & STATISTIC:\nCloud SSRF vulnerabilities targeting AWS IMDSv2 metadata endpoints earned the highest single bounty in bug bounty history ($50,000+) on major fintech cloud infrastructure programs.`,
    11: `💡 INDUSTRY INSIGHT & STATISTIC:\nExploit chaining converts multiple $500 Low/Medium severity reports into a single $25,000+ Critical Remote Code Execution (RCE) submission that permanently elevates a researcher's reputation on HackerOne.`
  };

  const simpleExplanations: Record<number, string> = {
    0: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how browser JavaScript variables can be modified by manipulating DOM elements or query parameters, enabling you to identify client-side state corruption.`,
    1: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how to audit compiled code files, Docker layers, and Git commit histories to extract hardcoded API keys and cloud passwords.`,
    2: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how applications verify user account ownership, and how mutating ID parameters allows viewing or editing unauthorized tenant records.`,
    3: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how applications process business workflows like cart purchases and discount codes, and how edge case inputs bypass price checks.`,
    4: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how session tokens (JWTs) maintain authentication state, and how modifying algorithm headers grants administrative access.`,
    5: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how to map an enterprise's external attack surface across subdomains, IP ranges, virtual hosts, and open ports using Go toolchains.`,
    6: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how modern frontends communicate with REST and GraphQL APIs, and how to reverse-engineer Swagger specifications to find BOLA vulnerabilities.`,
    7: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how to discover hidden URL parameters and debug query flags that developers used during testing but left enabled in production.`,
    8: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how to translate technical security findings into executive-grade vulnerability disclosure reports for HackerOne and Bugcrowd.`,
    9: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how network packets travel across firewalls and how port scanners fingerprint running services without triggering IPS rate limits.`,
    10: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how cloud environments (AWS, GCP, Azure) manage instance credentials and how SSRF tricks servers into exfiltrating metadata keys.`,
    11: `Mastering ${dayTitle} (${competency}) connects theory directly with hands-on practice! You will learn how elite researchers chain low-severity bugs (like path traversal or LFI) together to achieve full Remote Code Execution (RCE).`
  };

  return {
    whatYouAreDoing: whatYouAreDoingMap[weekIndex],
    content: simpleExplanations[weekIndex],
    stepByStepTutorial: tutorialsMap[weekIndex],
    usefulResources: resourcesMap[weekIndex],
    industryInsight: insightsMap[weekIndex]
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
          title: "Theoretical Principles & Auditing",
          duration: "30 Mins",
          whatYouAreDoing: details.whatYouAreDoing,
          content: details.content,
          stepByStepTutorial: details.stepByStepTutorial,
          usefulResources: details.usefulResources,
          industryInsight: details.industryInsight,
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
