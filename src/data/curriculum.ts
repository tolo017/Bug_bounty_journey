import { Week, DayLesson, BossLab, TextbookReference, BookLesson, CreatorLesson } from "../types/curriculum";

// 12-Week Progression Schema Details Mapping
const weekSchemas = [
  {
    weekIndex: 0,
    weekTitle: "Target Reconnaissance & OSINT (The Hunter's Foundation)",
    competency: "Asset Mapping (Go/Linux)",
    burpTooling: "Target Tab, Site Map, Scope Configuration",
    portSwiggerLabLink: "https://portswigger.net/web-security/information-disclosure",
    textbookRefs: "WAHH (Ch 4); Bug Bounty Bootcamp (Ch 2-4); Automate the Boring Stuff (Ch 11 - Web Scraping)",
    githubAssetType: "Python Tool",
    githubAssetName: "subdomain_passive_aggregator.py",
    githubAssetDesc: "Custom Python script querying CRT.sh, SecurityTrails, and HackerTarget APIs concurrently.",
    bossLabTitle: "Enterprise Scope Mapper & OSINT Boss Challenge"
  },
  {
    weekIndex: 1,
    weekTitle: "Subdomain Takeovers & Information Disclosure",
    competency: "Cloud Infrastructure & Recon",
    burpTooling: "Burp Intruder for DNS Brute-Forcing & Response Regex Matching",
    portSwiggerLabLink: "https://portswigger.net/web-security/information-disclosure",
    textbookRefs: "Real-World Bug Hunting (Ch 1); Bug Bounty Bootcamp (Ch 5)",
    githubAssetType: "Python Tool",
    githubAssetName: "cname_cloud_takeover_checker.py",
    githubAssetDesc: "Automated scanner matching target DNS CNAME records against dangling AWS S3, GitHub Pages, and Heroku signatures.",
    bossLabTitle: "Dangling CNAME & Cloud Bucket Takeover Boss Lab"
  },
  {
    weekIndex: 2,
    weekTitle: "Broken Authentication & Session Management",
    competency: "Session & Token Management",
    burpTooling: "Burp Sequencer (Testing token randomness) & Cookie Editor",
    portSwiggerLabLink: "https://portswigger.net/web-security/authentication",
    textbookRefs: "WAHH Ch 6 & 7; Bug Bounty Bootcamp Ch 13; ChatGPT Tips & Tricks (Prompting for logic bypasses)",
    githubAssetType: "Python Tool",
    githubAssetName: "token_entropy_analyzer.py",
    githubAssetDesc: "Python script testing session token entropy, bitwise randomness, and timestamp predictability.",
    bossLabTitle: "OAuth2 & Multi-Factor Auth Bypass Boss Lab"
  },
  {
    weekIndex: 3,
    weekTitle: "IDOR & Broken Object Level Authentication (BOLA)",
    competency: "Access Control (IDOR)",
    burpTooling: "Match and Replace rules, Autorize Burp Extension",
    portSwiggerLabLink: "https://portswigger.net/web-security/access-control",
    textbookRefs: "Real-World Bug Hunting (Ch 3); Bug Bounty Bootcamp Ch 11; Bug Bounty from Scratch",
    githubAssetType: "Python Tool",
    githubAssetName: "idor_parameter_bruteforcer.py",
    githubAssetDesc: "Multi-threaded auto-incremental parameter brute-forcer using Python requests with dual auth headers.",
    bossLabTitle: "Multi-Tenant API BOLA Exploitation Boss Lab"
  },
  {
    weekIndex: 4,
    weekTitle: "Cross-Site Scripting (XSS) - Reflected, Stored, and DOM",
    competency: "Client-Side Security",
    burpTooling: "Burp Repeater, Custom Intruder payload lists, DOM Invader",
    portSwiggerLabLink: "https://portswigger.net/web-security/cross-site-scripting",
    textbookRefs: "WAHH Ch 12; Bug Bounty Bootcamp Ch 8; ChatGPT Tips & Tricks (WAF bypass payload generation)",
    githubAssetType: "Python Tool",
    githubAssetName: "dom_xss_sink_identifier.py",
    githubAssetDesc: "Regex-based source/sink identifier scanning JS bundles for document.write, innerHTML, and eval.",
    bossLabTitle: "Stored XSS & Blind Payload Exfiltration Boss Lab"
  },
  {
    weekIndex: 5,
    weekTitle: "Cross-Site Request Forgery (CSRF) & SameSite Defenses",
    competency: "Client-Side Security",
    burpTooling: "Burp Engagement Tools -> Generate CSRF PoC",
    portSwiggerLabLink: "https://portswigger.net/web-security/csrf",
    textbookRefs: "WAHH Ch 13; Bug Bounty Bootcamp Ch 9; Real-World Bug Hunting (Ch 2)",
    githubAssetType: "Automation Suite",
    githubAssetName: "csrf_poc_generator_suite.py",
    githubAssetDesc: "Python utility generating automated HTML auto-submitting forms and iframe CSRF exploit delivery templates.",
    bossLabTitle: "Cross-Origin State Change & SameSite Lax Bypass Boss Lab"
  },
  {
    weekIndex: 6,
    weekTitle: "SQL Injection (SQLi) & Database Exfiltration",
    competency: "Parameter & Logic Mining",
    burpTooling: "Burp Collaborator (for Out-of-Band SQLi) & Repeater",
    portSwiggerLabLink: "https://portswigger.net/web-security/sql-injection",
    textbookRefs: "WAHH Ch 9; Bug Bounty Bootcamp Ch 6; Black Hat Python (Custom SQL blind infuser)",
    githubAssetType: "Python Tool",
    githubAssetName: "blind_sqli_time_parser.py",
    githubAssetDesc: "Custom blind SQL time-based response parser in Python using raw socket/requests thread pools.",
    bossLabTitle: "Blind Time-Based SQLi Data Exfiltration Boss Lab"
  },
  {
    weekIndex: 7,
    weekTitle: "Server-Side Request Forgery (SSRF) & Cloud Metadata Attacks",
    competency: "Cloud Infrastructure Auditing",
    burpTooling: "Burp Collaborator Client interaction mapping",
    portSwiggerLabLink: "https://portswigger.net/web-security/ssrf",
    textbookRefs: "Real-World Bug Hunting Ch 6; Bug Bounty Bootcamp Ch 12",
    githubAssetType: "Python Tool",
    githubAssetName: "ssrf_cloud_metadata_fuzzer.py",
    githubAssetDesc: "Multi-protocol URL parser testing local loopbacks, DNS rebinding, and cloud metadata endpoints (169.254.169.254).",
    bossLabTitle: "AWS IMDSv1/v2 SSRF Metadata Exfiltration Boss Lab"
  },
  {
    weekIndex: 8,
    weekTitle: "XML External Entity (XXE) Injection",
    competency: "API Security Auditing",
    burpTooling: "Content-Type converter extension (JSON to XML conversion)",
    portSwiggerLabLink: "https://portswigger.net/web-security/xxe",
    textbookRefs: "Real-World Bug Hunting Ch 5; Bug Bounty Bootcamp Ch 10",
    githubAssetType: "Python Tool",
    githubAssetName: "blind_xxe_svg_injector.py",
    githubAssetDesc: "Automation script injecting blind XXE payloads into SVG vector image uploads and SOAP text data fields.",
    bossLabTitle: "Blind OOB XXE System File Extraction Boss Lab"
  },
  {
    weekIndex: 9,
    weekTitle: "Server-Side Template Injection (SSTI) & Remote Code Execution (RCE)",
    competency: "Advanced Chain Vulnerabilities",
    burpTooling: "Burp Intruder (Fuzzing template engines with payload lists)",
    portSwiggerLabLink: "https://portswigger.net/web-security/server-side-template-injection",
    textbookRefs: "WAHH Ch 16; Black Hat Python (Creating reverse shells)",
    githubAssetType: "Python Tool",
    githubAssetName: "multi_engine_ssti_fuzzer.py",
    githubAssetDesc: "Python-driven multi-engine SSTI fuzzer template covering Jinja2, Twig, Freemarker, and MVEL.",
    bossLabTitle: "Jinja2 RCE & Reverse Shell Execution Boss Lab"
  },
  {
    weekIndex: 10,
    weekTitle: "Race Conditions & Business Logic Vulnerabilities",
    competency: "Business Logic Security",
    burpTooling: "Burp Repeater (Turbo Intruder extension or Single-packet attack HTTP/2 concurrency)",
    portSwiggerLabLink: "https://portswigger.net/web-security/race-conditions",
    textbookRefs: "WAHH Ch 11; Bug Bounty Bootcamp Ch 14",
    githubAssetType: "Python Tool",
    githubAssetName: "race_condition_concurrency_hammer.py",
    githubAssetDesc: "Multi-threaded asyncio Python race condition hammer tool sending simultaneous HTTP/2 single-packet requests.",
    bossLabTitle: "Coupon Over-Redemption & HTTP/2 Concurrency Boss Lab"
  },
  {
    weekIndex: 11,
    weekTitle: "API Hacking & Mass Assignment (The Final Hunt)",
    competency: "API Security Auditing",
    burpTooling: "Logger++, OpenAPI Parser, Postman integration",
    portSwiggerLabLink: "https://portswigger.net/web-security/api-testing",
    textbookRefs: "Bug Bounty Bootcamp Ch 17; Real-World Bug Hunting Ch 12",
    githubAssetType: "Markdown Report",
    githubAssetName: "master_bounty_portfolio_repo_template.md",
    githubAssetDesc: "Fully polished, unified 12-week GitHub portfolio index and enterprise VDP report repository template.",
    bossLabTitle: "Full-Scope Enterprise API VDP Capstone Audit"
  }
];

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Daily titles per week
const weekDailyTitles: string[][] = [
  // Week 1
  [
    "DNS Enumeration & Subdomain Discovery",
    "Certificate Transparency Logs & CRT.sh Mining",
    "Wayback & Gau Endpoint Harvesting",
    "GitHub Secret Hunting & Leaked API Keys",
    "Cloud Asset Discovery & AWS S3 Bucket Mining",
    "Scope Mapping & Port Scanning (Nmap/Masscan)"
  ],
  // Week 2
  [
    "Dangling CNAME Identification & DNS Querying",
    "GitHub Pages & Heroku Takeover Auditing",
    "AWS S3 & Cloudfront Misconfiguration Hunting",
    "Exposed Environment Files (.env, .git/HEAD)",
    "Server Status Pages & Trace Debug Leakage",
    "Source Map Decompilation & JS Leak Mining"
  ],
  // Week 3
  [
    "Session Token Predictability & Entropy Analysis",
    "Cookie Flag Audit (HttpOnly, Secure, SameSite)",
    "Password Reset Flow Flaws & Token Leakage",
    "Multi-Factor Authentication (MFA) Bypasses",
    "JWT Signature Stripping & Key Confusion Attacks",
    "OAuth 2.0 Implicit Grant & Redirect URI Hijacking"
  ],
  // Week 4
  [
    "Numeric IDOR Parameter Fuzzing & Auto-Increment",
    "UUID / GUID Guessability & Entropy Analysis",
    "GraphQL BOLA & Nested Query Exfiltration",
    "HTTP Method Overriding (GET to POST IDOR)",
    "Autorize Burp Extension Multi-Role Auditing",
    "Second-Order IDOR & Indirect Object Reference"
  ],
  // Week 5
  [
    "Reflected XSS Filter Bypasses & HTML Injection",
    "Stored XSS in Rich-Text & Profile Fields",
    "DOM XSS Sink & Source Identification",
    "CSP (Content Security Policy) Bypasses",
    "DOM Clobbering & JS Prototype Pollution",
    "Blind XSS Payload Injection & Callback Logging"
  ],
  // Week 6
  [
    "Basic CSRF Form Generation & Auto-Submit Exploits",
    "SameSite Cookie Lax/Strict Bypass Vectors",
    "CSRF Token Manipulation & Stripping Tricks",
    "Cross-Origin Resource Sharing (CORS) Misconfigurations",
    "JSON CSRF via Content-Type Manipulation",
    "Flash / WebSockets CSRF State Overriding"
  ],
  // Week 7
  [
    "In-Band Error-Based SQL Injection",
    "UNION-Based Data Extraction & Column Mapping",
    "Blind Boolean-Based SQL Injection",
    "Blind Time-Based Delay Injections",
    "Out-of-Band (OOB) SQLi with Burp Collaborator",
    "ORM Injection & NoSQL Injection Vectors"
  ],
  // Week 8
  [
    "Basic In-Band SSRF to Localhost (127.0.0.1)",
    "AWS EC2 IMDSv1 Metadata Exfiltration",
    "GCP & Azure Metadata Endpoint Attacks",
    "DNS Rebinding & Local Loopback Bypasses",
    "Blind Out-of-Band SSRF via Burp Collaborator",
    "Protocol Smuggling (gopher://, dict://) via SSRF"
  ],
  // Week 9
  [
    "Local File Inclusion via XML DTD Injections",
    "Blind Out-of-Band XXE Data Exfiltration",
    "XXE via SVG File Upload Injections",
    "SOAP & Office Document (XLSX/DOCX) XXE",
    "XInclude Attacks & XML Entity Expansion",
    "Bypassing XML Parser Sanitizers & Encoding"
  ],
  // Week 10
  [
    "Jinja2 & Python SSTI to Remote Code Execution",
    "Twig & PHP Template Injection Vectors",
    "Java Spring / Freemarker SSTI Exploitation",
    "Node.js EJS & Jade Template Injection",
    "Command Injection via Raw Shell Arguments",
    "Insecure Deserialization to RCE (Python/Java)"
  ],
  // Week 11
  [
    "HTTP/2 Single-Packet Attack Concurrency",
    "Coupon & Discount Code Over-Redemption Race",
    "Financial Transfer Double-Spend Race Conditions",
    "Workflow Bypass & Step-Skipping Logic Flaws",
    "Negative Value Input Logic Attacks",
    "Rate Limit Bypasses via Header Manipulation"
  ],
  // Week 12
  [
    "REST API Parameter Mining & Mass Assignment",
    "GraphQL Introspection & Schema Mapping",
    "OpenAPI / Swagger Spec Parsing & Endpoint Discovery",
    "API Key Scoping & Excessive Data Exposure",
    "JWT Key Confusion & API Authorization Bypass",
    "Full Enterprise VDP Report Synthesis & Portfolio Push"
  ]
];

// Helper to build explicit 8-section architecture for a lesson
const build8SectionArchitecture = (
  weekIndex: number,
  dayIndex: number,
  dayTitle: string,
  schema: typeof weekSchemas[0],
  dayName: string
) => {
  const globalLessonIndex = weekIndex * 6 + dayIndex;
  const flagCode = `FLAG{BBM_W${weekIndex + 1}_D${dayIndex + 1}_${dayTitle.toUpperCase().replace(/[^A-Z0-9]/g, "")}}`;

  // 1. THE ROOT CAUSE (WHY IT BREAKS)
  const section1_RootCause = {
    foundationalArchitecture: `In modern web applications, ${dayTitle} occurs when input handling under ${schema.competency} fails to enforce strict boundaries at the data and protocol layers.`,
    codingMistakeAndLogicFailure: `Developers routinely trust client-originating data, header inputs, or parameter references without performing server-side validation or role-based access checks. Under pressure, input sanitization is delegated to client-side JavaScript or weak regex filters.`,
    protocolAndCodeLevelImpact: `At the protocol level, HTTP parameters are processed raw by backend handlers. When malicious payloads pass unsanitised, the engine interprets user data as structural commands, causing unauthorized state modification, data leak, or remote execution.`
  };

  // 2. TEXTBOOK CROSS-REFERENCE & RESOLUTION MAP
  const textbookList: TextbookReference[] = [
    {
      bookTitle: "The Web Application Hacker's Handbook (WAHH)",
      author: "Dafydd Stuttard & Marcus Pinto",
      chapter: "Core Architectural Controls & Data Handling",
      authorMethodology: "Stuttard & Pinto emphasize boundary defense and mapping hidden parameters in HTTP request streams.",
      adviceToSolveOrBypass: "Enforce strict server-side parameterization and treat all incoming HTTP headers as untrusted user input."
    },
    {
      bookTitle: "Bug Bounty Bootcamp",
      author: "Vickie Li",
      chapter: "Target Reconnaissance & Input Vector Discovery",
      authorMethodology: "Vickie Li recommends isolating parameters using automated fuzzing and analyzing response diffs.",
      adviceToSolveOrBypass: "Filter input through strict allowlists and apply context-aware encoding prior to rendering or execution."
    },
    {
      bookTitle: "Real-World Bug Hunting",
      author: "Peter Yaworski",
      chapter: "Disclosed Case Studies in Web Vulnerabilities",
      authorMethodology: "Yaworski walks through real-world HackerOne reports where simple logic flaws led to high-yield bounties.",
      adviceToSolveOrBypass: "Analyze secondary endpoints (e.g. mobile API versions) where security controls are often omitted."
    },
    {
      bookTitle: "Bug Bounty Tips & Tricks using ChatGPT",
      author: "Joas Antonio dos Santos Barbosa",
      chapter: "Prompt Engineering for Code Audit",
      authorMethodology: "Barbosa details using LLMs to reverse engineer obfuscated logic and construct custom payloads.",
      adviceToSolveOrBypass: "Use structured AI prompts to test corner cases in validation functions."
    },
    {
      bookTitle: "Bug Bounty from Scratch",
      author: "Vazquez & Javier",
      chapter: "Methodology & VDP Triage",
      authorMethodology: "Focuses on rapid scope identification and systematic daily hunting routines.",
      adviceToSolveOrBypass: "Maintain clean notes and verify all findings manually before submitting to VDP triage."
    },
    {
      bookTitle: "Automate the Boring Stuff with Python",
      author: "Al Sweigart",
      chapter: "Web Scraping & Request Automation",
      authorMethodology: "Teaches writing custom Python requests and BeautifulSoup parsing scripts.",
      adviceToSolveOrBypass: "Script repetitive parameter testing to maximize daily coverage."
    },
    {
      bookTitle: "Black Hat Python",
      author: "Justin Seitz",
      chapter: "Raw Sockets & High-Performance Offensive Tooling",
      authorMethodology: "Demonstrates building low-level socket tools and multi-threaded scanners.",
      adviceToSolveOrBypass: "Build multi-threaded async request engines to detect subtle race conditions and timing anomalies."
    }
  ];

  const section2_TextbookCrossReference = {
    textbookList,
    overallResolutionStrategy: `Combine WAHH boundary mapping with Black Hat Python automation to verify ${dayTitle} vulnerabilities while maintaining strict scope adherence.`
  };

  // 3. RED TEAM PERSPECTIVE (OFFENSIVE TACTICS & EXPLOITATION)
  const section3_RedTeamPerspective = {
    discoveryAndWeaponization: `Red Team Operators locate ${dayTitle} by mapping target endpoints using ${schema.burpTooling}. Once an endpoint is isolated, payload vectors are injected into query string parameters and HTTP headers to evaluate server reflection or timing differences.`,
    burpSuiteExecutionSteps: [
      `1. Intercept target HTTP requests in Burp Suite Proxy and send to Repeater (Ctrl+R).`,
      `2. Identify parameters handling input under ${schema.competency}.`,
      `3. Configure Burp Intruder (Ctrl+I) payload positions around candidate parameter values.`,
      `4. Load custom payload lists or use extensions like Autorize / Turbo Intruder to evaluate access controls or timing delays.`,
      `5. Analyze response HTTP status codes, body diffs, and headers to confirm payload execution.`
    ],
    jsDeconstructionGuide: {
      sourceMappingAndDevTools: `Open Browser DevTools (F12) -> Network & Sources tab. Inspect loaded .js bundles (e.g., app.min.js, main.js). Enable Source Maps (.js.map) if present to view unminified source code.`,
      deobfuscationTechnique: `If JavaScript is obfuscated, copy code into DevTools Pretty Print ({}) or use online deobfuscators. Look for array decoding functions, string rotation logic, and hex/unicode encodings.`,
      sinkAndSourceIdentification: `Search for DOM sources (location.search, location.hash, document.referrer) and sinks (document.write, innerHTML, eval, setTimeout). Trace data flow from source to sink.`,
      apiEndpointAndKeyMining: `Run regex search across all JS files for hidden endpoints and keys:\nRegex for keys: (api[_-]?key|secret|token|auth)["']?\\s*[:=]\\s*["']([^"']+)["']\nRegex for endpoints: (/[a-zA-Z0-9_/-]+\\?(?:[a-zA-Z0-9_]+=[a-zA-Z0-9_]+&?)*)`,
      clientSideLogicBypass: `Locate client-side validation logic (e.g., if (!isAdmin) return;). Set DevTools breakpoints on event handlers or override return values in Console to bypass client-side checks.`
    }
  };

  // 4. BLUE TEAM PERSPECTIVE (DEFENSIVE TACTICS & DETECTION)
  const section4_BlueTeamPerspective = {
    logAnalysisExamples: [
      {
        serverType: "Nginx" as const,
        logSnippet: `192.168.1.105 - - [02/Sep/2026:14:22:10 +0000] "GET /api/v1/user?id=' OR '1'='1 HTTP/1.1" 200 4520 "-" "Mozilla/5.0"`,
        anomalyExplanation: "Notice SQL injection payload appended to 'id' parameter causing a status 200 with an unusually large response byte count (4520 bytes)."
      },
      {
        serverType: "AWS CloudWatch" as const,
        logSnippet: `{"timestamp":"2026-09-02T14:22:15Z","requestUri":"/admin/config","userAgent":"BugBountyMastery-Scanner","status":200,"userId":"anon"}`,
        anomalyExplanation: "Unauthenticated user 'anon' successfully accessing /admin/config indicating an IDOR or missing authorization check."
      }
    ],
    indicatorsOfCompromise: [
      `High frequency of requests with unusual character encodings (%27, %22, %3C, %3E).`,
      `Anomalous user agents or rapid request bursts from single IP addresses.`,
      `Responses containing database error strings, trace logs, or unexpected record counts.`
    ],
    remediationCodeSnippet: {
      language: "TypeScript / Node.js",
      description: "Secure Production-Grade Input Validation & Parameterized Handler",
      secureCode: `import { Request, Response } from 'express';\nimport { z } from 'zod';\n\nconst InputSchema = z.object({\n  id: z.string().uuid({ message: "Invalid ID format" })\n});\n\nexport const handleSecureRequest = async (req: Request, res: Response) => {\n  try {\n    // 1. Strict Schema Validation\n    const { id } = InputSchema.parse(req.query);\n    \n    // 2. Server-Side Session & Role Verification\n    if (!req.session?.userId) {\n      return res.status(401).json({ error: "Unauthorized" });\n    }\n    \n    // 3. Parameterized Query (No String Concatenation)\n    const userRecord = await db.query('SELECT id, email FROM users WHERE id = $1 AND tenant_id = $2', [id, req.session.tenantId]);\n    \n    return res.json(userRecord.rows[0]);\n  } catch (err) {\n    return res.status(400).json({ error: "Invalid Request Parameters" });\n  }\n};`
    }
  };

  // 5. AUTOMATION WORKSHOP
  const section5_AutomationWorkshop = {
    toolType: "Python" as const,
    scriptName: schema.githubAssetName,
    code: `import requests\nimport sys\nimport time\n\n# Day ${globalLessonIndex + 1}: ${dayTitle}\n# Automated Audit Tool Engineered for Bug Bounty Mastery\n\nTarget_URL = "https://example.com/api"\n\ndef audit_target(url):\n    print(f"[*] Auditing {url} for ${dayTitle}...")\n    headers = {\n        "User-Agent": "BBM-Automation-Engine/1.0",\n        "Accept": "application/json"\n    }\n    payloads = ["' OR 1=1 --", "../../../etc/passwd", "<script>alert(1)</script>"]\n    \n    for p in payloads:\n        try:\n            res = requests.get(url, params={"q": p}, headers=headers, timeout=5)\n            if res.status_code == 200 and ("root:" in res.text or "syntax" in res.text.lower()):\n                print(f"[+] POTENTIAL VULNERABILITY DETECTED with payload: {p}")\n            else:\n                print(f"[-] Test vector executed cleanly. Status: {res.status_code}")\n        except Exception as e:\n            print(f"[!] Request exception: {e}")\n\nif __name__ == "__main__":\n    audit_target(Target_URL)`,
    lineByLineExplanation: [
      `Line 1-3: Import required standard libraries (requests, sys, time) for HTTP handling.`,
      `Line 5-6: Define script header and metadata corresponding to Day ${globalLessonIndex + 1}.`,
      `Line 8: Define target endpoint URL string.`,
      `Line 10-14: Define audit_target function and construct custom User-Agent headers to identify scanner traffic.`,
      `Line 15: Define array of payload vectors testing boundary input conditions.`,
      `Line 17-23: Loop over payloads, dispatching HTTP GET requests with a 5-second timeout and evaluating response body diffs.`,
      `Line 25-26: Script execution entry point passing Target_URL to audit handler.`
    ]
  };

  // 6. PORTSWIGGER LAB LINKS & LAB SOLVING GUIDE
  const section6_PortSwiggerGuide = {
    directLabUrl: schema.portSwiggerLabLink,
    strategicSolvingGuide: [
      `1. Open the PortSwigger Web Security Academy lab link: ${schema.portSwiggerLabLink}`,
      `2. Direct Burp Suite Proxy traffic through your browser extension (e.g., FoxyProxy).`,
      `3. Intercept the target request in Burp Proxy and examine parameter handling under ${schema.competency}.`,
      `4. Execute test payload in Burp Repeater, confirming reflection or structural changes in response.`,
      `5. Submit flag or trigger alert popup to complete the practical lab module.`
    ]
  };

  // 7. THE DIGITAL PLAYGROUND (IN-APP INTERACTIVE LAB)
  const section7_DigitalPlayground = {
    title: `Digital Arena Simulator: ${dayTitle}`,
    mode: "Terminal Simulation" as const,
    instructions: `Analyze the simulated terminal output below. Deconstruct the response headers or payload reflect to find the hidden FLAG string and verify completion.`,
    initialCodeOrConsole: `$ bbm-audit --target https://lab-w${weekIndex + 1}d${dayIndex + 1}.bugbountymastery.internal --module ${dayTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}\n[*] Connecting to target environment...\n[+] Handshake verified (200 OK)\n[+] Response Headers:\n    Server: BBM-SecureServer/2.4\n    X-Lab-Token: ${flagCode}\n[+] Target ready for interactive testing.`,
    expectedInputOrFlag: flagCode,
    hints: [
      `Look at the 'X-Lab-Token' header in the simulated terminal log.`,
      `Copy the entire flag string starting with FLAG{ and ending with }`
    ],
    correctFeedback: `✓ EXCELLENT WORK! Flag verified successfully. You have cleared the practical Digital Arena challenge for Day ${globalLessonIndex + 1}!`
  };

  // 8. GITHUB PORTFOLIO & LINKEDIN INTEGRATION
  const section8_PortfolioIntegration = {
    githubAssetName: schema.githubAssetName,
    githubAssetType: schema.githubAssetType,
    githubAssetDescription: schema.githubAssetDesc,
    githubCodeOrMarkdown: section5_AutomationWorkshop.code,
    linkedInTemplate: `🚀 Bug Bounty Mastery - Week ${weekIndex + 1} (${schema.weekTitle}) Milestone Achieved!\n\nToday I completed Day ${globalLessonIndex + 1}: ${dayTitle}.\n\n🛡️ RED TEAM EXPLOITATION:\n• Mastered ${schema.burpTooling} for parameter discovery\n• Reverse engineered client-side JavaScript bundles and mapped hidden API sinks\n\n🏰 BLUE TEAM DEFENSE:\n• Analyzed server log IoCs and implemented secure parameterized validation\n\n⚙️ AUTOMATION:\n• Engineered custom Python tool: ${schema.githubAssetName}\n• Completed practical lab: ${schema.portSwiggerLabLink}\n\nContinuous learning toward enterprise VDP triage mastery! #BugBounty #Cybersecurity #EthicalHacking #RedTeam #BlueTeam`
  };

  const recommendedBooks: BookLesson[] = textbookList.map((b) => ({
    title: b.bookTitle,
    author: b.author,
    chapterLesson: b.chapter,
    whatTheyAreDoing: b.authorMethodology,
    detailedExplanation: `Explores deep technical vectors, edge cases, and evasion tricks relevant to ${dayTitle}.`,
    practicalExample: `In ${b.bookTitle}, the author demonstrates auditing ${dayTitle} by intercepting HTTP requests in Burp Suite and modifying parameter values.`,
    howToAdapt: "Adapt this by generating automated custom scripts in Python or Nuclei templates.",
    takeaway: b.adviceToSolveOrBypass
  }));

  const creatorLessons: CreatorLesson[] = [
    {
      creatorName: "NahamSec & STÖK",
      channelOrWebsite: "YouTube & Bug Hunter Methodology",
      lessonTitle: `Mastering ${dayTitle}`,
      broadExplanation: `Comprehensive walkthrough on identifying ${dayTitle} vulnerabilities in production environments.`,
      methodologyOverview: "Asset discovery -> Recon filtering -> Parameter fuzzing -> Payload validation -> PoC creation.",
      stepByStepWalkthrough: [
        "Use Sublist3r and Amass to discover target subdomains.",
        "Run ffuf or gau to collect endpoints and parameters.",
        `Intercept traffic using ${schema.burpTooling} and manipulate input vectors.`,
        "Confirm response diffs and write a reproducible PoC."
      ],
      practicalCommand: `nuclei -u https://target.com -t vulnerabilities/`,
      specificVideoUrl: "https://www.youtube.com/results?search_query=" + encodeURIComponent(`NahamSec STÖK ${dayTitle}`)
    }
  ];

  return {
    architecture: {
      section1_RootCause,
      section2_TextbookCrossReference,
      section3_RedTeamPerspective,
      section4_BlueTeamPerspective,
      section5_AutomationWorkshop,
      section6_PortSwiggerGuide,
      section7_DigitalPlayground,
      section8_PortfolioIntegration
    },
    burpToolingUsed: schema.burpTooling,
    portSwiggerLabLink: schema.portSwiggerLabLink,
    theory: {
      title: "Theoretical Principles & Auditing",
      duration: "30 Mins",
      beginnerAnalogy: {
        story: `Imagine an enterprise facility where guards check main entrance badges but leave side loading docks completely unmonitored. On Day ${globalLessonIndex + 1}, ${dayTitle} takes advantage of similar trust boundary gaps in application logic.`,
        realWorldComparison: "The web application relies on implicit trust assumptions across parameter flows or client-side validation logic."
      },
      chatGptPromptStrategy: `Prompt: "Act as a senior cybersecurity auditor. Review the following code snippet for ${dayTitle} vulnerabilities under ${schema.competency}. Identify parameter pollution, missing authorization checks, and payload injection points:\n[PASTE CODE HERE]"`,
      recommendedBooks,
      creatorLessons,
      howToDoRealWorldHunting: {
        targetDiscoveryDorks: [
          `site:*.target.com inurl:api`,
          `site:*.target.com ext:php | ext:json`,
          `site:*.target.com "admin" | "dashboard"`
        ],
        reconFilterStrategy: `Filter parameters for handling numeric IDs or sensitive user tokens.`,
        realWorldTriageTips: "Focus on active endpoints with high impact potential.",
        bypassTricks: "Try header injection, double encoding, and alternative HTTP methods."
      },
      whereToHuntAndAiAutomation: {
        targetProgramLinks: [
          { name: "HackerOne Public Scope", url: "https://hackerone.com/bug-bounty-programs", platform: "HackerOne" },
          { name: "Bugcrowd VDP Directory", url: "https://bugcrowd.com/programs", platform: "Bugcrowd" }
        ],
        aiAutomatedHuntingWorkflow: "Combine ChatGPT / Claude analysis with Nuclei scanning for high-confidence finding triage.",
        automatedScrapersAndDorks: [`site:*.target.com inurl:api`]
      },
      whatYouAreDoing: `RED TEAM AUDIT (Day ${globalLessonIndex + 1} - ${dayName}):\nYou are auditing ${dayTitle} in a target web application under ${schema.competency}.`,
      vulnerabilityOrigin: section1_RootCause.foundationalArchitecture,
      pentesterFocus: section3_RedTeamPerspective.discoveryAndWeaponization,
      payloadCrafting: section3_RedTeamPerspective.burpSuiteExecutionSteps.join("\n"),
      burpSuiteSetup: schema.burpTooling,
      blueTeamDefense: section4_BlueTeamPerspective.indicatorsOfCompromise.join("\n"),
      developerMindset: "Developers often prioritize speed and feature delivery over input validation edge cases.",
      psychologicalError: "Assuming client-side controls or obscured endpoints are invisible to malicious actors.",
      usefulResources: [
        { name: `OWASP Testing Guide: ${schema.competency}`, url: "https://owasp.org/www-project-web-security-testing-guide/", category: "Standard" },
        { name: `PortSwigger Web Security Academy: ${dayTitle}`, url: schema.portSwiggerLabLink, category: "Lab & Guide" }
      ],
      industryInsight: `SENIOR AUDITOR REFLECTION:\nWhen hunting for ${dayTitle}, always inspect edge-case endpoints like mobile API handlers or older legacy subdomains.`
    },
    digitalArena: {
      title: "The Digital Arena Playground",
      duration: "90 Mins",
      stepByStepTutorial: section6_PortSwiggerGuide.strategicSolvingGuide,
      labLink: schema.portSwiggerLabLink,
      instructions: "Execute payload in terminal shell or Burp Repeater and verify flag.",
      interactiveConsolePlaceholder: "Enter captured FLAG",
      correctFlag: flagCode,
      flagSubmitted: "",
      flagVerified: false
    },
    automation: {
      title: "Automation & VDP Reporting Output",
      duration: "30 Mins",
      pythonScript: section5_AutomationWorkshop.code,
      bashScript: `cat subdomains.txt | httpx -silent | waybackurls | grep "=" | nuclei -t vulnerabilities/ -o results.txt`,
      pythonExplanation: "Automate vulnerability scanning in Python.",
      bashExplanation: "Run CLI scanner in Bash.",
      vdpReportTemplate: {
        title: `${dayTitle} Vulnerability in Target System`,
        cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
        cvssScore: 8.1,
        description: `During a security audit under ${schema.competency}, a ${dayTitle} vulnerability was identified on the target host.`,
        stepsToReproduce: `1. Intercept HTTP request to target endpoint using Burp Suite.\n2. Inject payload into parameter handling input.\n3. Observe anomalous server response or unauthorized data return.`,
        remediation: `Implement strict server-side parameter sanitization, object-level authorization checks, and parameterized queries.`
      },
      dailyAssignment: {
        title: `Capstone Task: ${dayTitle}`,
        objective: `Analyze, document, and automate exploit verification for ${dayTitle}.`,
        tasks: [
          "Intercept request in Burp Suite",
          "Reverse engineer client-side JS logic",
          "Execute automation script and submit VDP report"
        ],
        deliverable: "Committed Python tool & submitted VDP report."
      },
      checklist: [
        { id: `check-1`, text: "Audit code origin and payload execution logic", completed: false },
        { id: `check-2`, text: `Execute Python script (${schema.githubAssetName})`, completed: false },
        { id: `check-3`, text: "Review CVSS calculations and submit VDP report", completed: false }
      ],
      committed: false,
      reported: false
    }
  };
};

// Generator for default curriculum
export const generateDefaultCurriculum = (): Week[] => {
  const weeks: Week[] = [];

  weekSchemas.forEach((schema, weekIdx) => {
    const dailyTitles = weekDailyTitles[weekIdx] || weekDailyTitles[0];
    const days: DayLesson[] = dailyTitles.map((dayTitle, dayIdx) => {
      const dayName = dayNames[dayIdx];
      const details = build8SectionArchitecture(weekIdx, dayIdx, dayTitle, schema, dayName);

      return {
        id: `week-${weekIdx + 1}-${dayName.toLowerCase()}`,
        weekIndex: weekIdx,
        dayName,
        title: dayTitle,
        durationMinutes: 150,
        unlocked: weekIdx === 0 && dayIdx === 0,
        completed: false,
        competency: schema.competency,
        burpToolingUsed: schema.burpTooling,
        portSwiggerLabLink: schema.portSwiggerLabLink,
        architecture: details.architecture,
        theory: details.theory,
        digitalArena: details.digitalArena,
        automation: details.automation
      };
    });

    const bossLab: BossLab = {
      id: `week-${weekIdx + 1}-boss`,
      weekIndex: weekIdx,
      title: schema.bossLabTitle,
      scenario: `Enterprise Red Team Capstone: Demonstrate comprehensive exploitation in ${schema.weekTitle}.`,
      targetEnvironmentDescription: `Target System: https://lab-week${weekIdx + 1}.bugbountymastery.internal`,
      instructions: `Identify vulnerable parameter handling under ${schema.competency}, trigger payload execution, exfiltrate flag, and submit a high-impact VDP report.`,
      correctFlag: `FLAG{BOSS_LAB_WEEK_${weekIdx + 1}_ENTERPRISE_CLEARED}`,
      flagSubmitted: "",
      flagVerified: false,
      completed: false,
      vdpReport: {
        title: `Enterprise Vulnerability Audit Report - Week ${weekIdx + 1}`,
        severity: weekIdx >= 8 ? "Critical" : "High",
        description: `During the Week ${weekIdx + 1} Boss Lab challenge, critical flaws were discovered under ${schema.competency}.`,
        remediation: "Implement strict input validation, server-side authorization, and secure coding controls.",
        submitted: false
      }
    };

    weeks.push({
      weekNumber: weekIdx + 1,
      title: schema.weekTitle,
      unlocked: weekIdx === 0,
      completed: false,
      days,
      bossLab
    });
  });

  return weeks;
};
