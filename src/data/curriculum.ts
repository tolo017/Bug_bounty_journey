import { Week, DayLesson, BossLab } from "../types/curriculum";

// 12-Week Progression Schema Details Mapping
const weekSchemas = [
  {
    weekIndex: 0,
    weekTitle: "Target Reconnaissance & OSINT (The Hunter's Foundation)",
    competency: "Asset Mapping (Go/Linux)",
    burpTooling: "Target Tab, Site Map, Scope Configuration",
    portSwiggerLabLink: "https://portswigger.net/web-security/information-disclosure",
    textbookRefs: "WAHH (Ch 4); Bug Bounty Bootcamp (Ch 2-4); Automate the Boring Stuff (Ch 11 - Web Scraping)",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "subdomain_passive_aggregator.py",
    githubAssetDesc: "Custom Python script that queries CRT.sh, SecurityTrails, and HackerTarget APIs concurrently.",
    creatorRef: "STÖK & NahamSec - Recon Methodology & Target Mapping",
    bossLabTitle: "Enterprise Scope Mapper & OSINT Boss Challenge"
  },
  {
    weekIndex: 1,
    weekTitle: "Subdomain Takeovers & Information Disclosure",
    competency: "Cloud Infrastructure & Recon",
    burpTooling: "Burp Intruder for DNS Brute-Forcing & Response Regex Matching",
    portSwiggerLabLink: "https://portswigger.net/web-security/information-disclosure",
    textbookRefs: "Real-World Bug Hunting (Ch 1); Bug Bounty Bootcamp (Ch 5)",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "cname_cloud_takeover_checker.py",
    githubAssetDesc: "Automated scanner matching target DNS CNAME records against dangling AWS S3, GitHub Pages, and Heroku signatures.",
    creatorRef: "InsiderPhD - Uncovering Subdomain Takeovers in Cloud Assets",
    bossLabTitle: "Dangling CNAME & Cloud Bucket Takeover Boss Lab"
  },
  {
    weekIndex: 2,
    weekTitle: "Broken Authentication & Session Management",
    competency: "Session & Token Management",
    burpTooling: "Burp Sequencer (Testing token randomness) & Cookie Editor",
    portSwiggerLabLink: "https://portswigger.net/web-security/authentication",
    textbookRefs: "WAHH Ch 6 & 7; Bug Bounty Bootcamp Ch 13; ChatGPT Tips & Tricks (Prompting for logic bypasses)",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "token_entropy_analyzer.py",
    githubAssetDesc: "Python script testing session token entropy, bitwise randomness, and timestamp predictability.",
    creatorRef: "LiveOverflow - Dissecting Auth Logic & Cookie Padding Oracles",
    bossLabTitle: "OAuth2 & Multi-Factor Auth Bypass Boss Lab"
  },
  {
    weekIndex: 3,
    weekTitle: "IDOR & Broken Object Level Authentication (BOLA)",
    competency: "Access Control (IDOR)",
    burpTooling: "Match and Replace rules, Autorize Burp Extension",
    portSwiggerLabLink: "https://portswigger.net/web-security/access-control",
    textbookRefs: "Real-World Bug Hunting (Ch 3); Bug Bounty Bootcamp Ch 11; Bug Bounty from Scratch",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "idor_parameter_bruteforcer.py",
    githubAssetDesc: "Multi-threaded auto-incremental parameter brute-forcer using Python requests with dual auth headers.",
    creatorRef: "NahamSec - Hunting High-Yield BOLA/IDOR in GraphQL and REST APIs",
    bossLabTitle: "Multi-Tenant API BOLA Exploitation Boss Lab"
  },
  {
    weekIndex: 4,
    weekTitle: "Cross-Site Scripting (XSS) - Reflected, Stored, and DOM",
    competency: "Client-Side Security",
    burpTooling: "Burp Repeater, Custom Intruder payload lists, DOM Invader",
    portSwiggerLabLink: "https://portswigger.net/web-security/cross-site-scripting",
    textbookRefs: "WAHH Ch 12; Bug Bounty Bootcamp Ch 8; ChatGPT Tips & Tricks (WAF bypass payload generation)",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "dom_xss_sink_identifier.py",
    githubAssetDesc: "Regex-based source/sink identifier scanning JS bundles for document.write, innerHTML, and eval.",
    creatorRef: "STÖK & LiveOverflow - Modern DOM XSS & CSP Bypasses",
    bossLabTitle: "Stored XSS & Blind Payload Exfiltration Boss Lab"
  },
  {
    weekIndex: 5,
    weekTitle: "Cross-Site Request Forgery (CSRF) & SameSite Defenses",
    competency: "Client-Side Security",
    burpTooling: "Burp Engagement Tools -> Generate CSRF PoC",
    portSwiggerLabLink: "https://portswigger.net/web-security/csrf",
    textbookRefs: "WAHH Ch 13; Bug Bounty Bootcamp Ch 9; Real-World Bug Hunting (Ch 2)",
    githubAssetType: "Automation Suite" as const,
    githubAssetName: "csrf_poc_generator_suite.py",
    githubAssetDesc: "Python utility generating automated HTML auto-submitting forms and iframe CSRF exploit delivery templates.",
    creatorRef: "Vickie Li - CSRF Token Bypass Techniques in Modern Single Page Apps",
    bossLabTitle: "Cross-Origin State Change & SameSite Lax Bypass Boss Lab"
  },
  {
    weekIndex: 6,
    weekTitle: "SQL Injection (SQLi) & Database Exfiltration",
    competency: "Parameter & Logic Mining",
    burpTooling: "Burp Collaborator (for Out-of-Band SQLi) & Repeater",
    portSwiggerLabLink: "https://portswigger.net/web-security/sql-injection",
    textbookRefs: "WAHH Ch 9; Bug Bounty Bootcamp Ch 6; Black Hat Python (Custom SQL blind infuser)",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "blind_sqli_time_parser.py",
    githubAssetDesc: "Custom blind SQL time-based response parser in Python using raw socket/requests thread pools.",
    creatorRef: "John Hammond - Manual SQL Injection & Out-of-Band Exfiltration",
    bossLabTitle: "Blind Time-Based SQLi Data Exfiltration Boss Lab"
  },
  {
    weekIndex: 7,
    weekTitle: "Server-Side Request Forgery (SSRF) & Cloud Metadata Attacks",
    competency: "Cloud Infrastructure Auditing",
    burpTooling: "Burp Collaborator Client interaction mapping",
    portSwiggerLabLink: "https://portswigger.net/web-security/ssrf",
    textbookRefs: "Real-World Bug Hunting Ch 6; Bug Bounty Bootcamp Ch 12",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "ssrf_cloud_metadata_fuzzer.py",
    githubAssetDesc: "Multi-protocol URL parser testing local loopbacks, DNS rebinding, and cloud metadata endpoints (169.254.169.254).",
    creatorRef: "NahamSec - SSRF to Internal Cloud Compromise",
    bossLabTitle: "AWS IMDSv1/v2 SSRF Metadata Exfiltration Boss Lab"
  },
  {
    weekIndex: 8,
    weekTitle: "XML External Entity (XXE) Injection",
    competency: "API Security Auditing",
    burpTooling: "Content-Type converter extension (JSON to XML conversion)",
    portSwiggerLabLink: "https://portswigger.net/web-security/xxe",
    textbookRefs: "Real-World Bug Hunting Ch 5; Bug Bounty Bootcamp Ch 10",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "blind_xxe_svg_injector.py",
    githubAssetDesc: "Automation script injecting blind XXE payloads into SVG vector image uploads and SOAP text data fields.",
    creatorRef: "InsiderPhD - XXE Exploitation in File Upload Sinks",
    bossLabTitle: "Blind OOB XXE System File Extraction Boss Lab"
  },
  {
    weekIndex: 9,
    weekTitle: "Server-Side Template Injection (SSTI) & Remote Code Execution (RCE)",
    competency: "Advanced Chain Vulnerabilities",
    burpTooling: "Burp Intruder (Fuzzing template engines with payload lists)",
    portSwiggerLabLink: "https://portswigger.net/web-security/server-side-template-injection",
    textbookRefs: "WAHH Ch 16; Black Hat Python (Creating reverse shells)",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "multi_engine_ssti_fuzzer.py",
    githubAssetDesc: "Python-driven multi-engine SSTI fuzzer template covering Jinja2, Twig, Freemarker, and MVEL.",
    creatorRef: "LiveOverflow - Polyglot SSTI to RCE Exploitation",
    bossLabTitle: "Jinja2 RCE & Reverse Shell Execution Boss Lab"
  },
  {
    weekIndex: 10,
    weekTitle: "Race Conditions & Business Logic Vulnerabilities",
    competency: "Business Logic Security",
    burpTooling: "Burp Repeater (Turbo Intruder extension or Single-packet attack HTTP/2 concurrency)",
    portSwiggerLabLink: "https://portswigger.net/web-security/race-conditions",
    textbookRefs: "WAHH Ch 11; Bug Bounty Bootcamp Ch 14",
    githubAssetType: "Python Tool" as const,
    githubAssetName: "race_condition_concurrency_hammer.py",
    githubAssetDesc: "Multi-threaded asyncio Python race condition hammer tool sending simultaneous HTTP/2 single-packet requests.",
    creatorRef: "STÖK & James Kettle - Single-Packet Attack Architecture",
    bossLabTitle: "Coupon Over-Redemption & HTTP/2 Concurrency Boss Lab"
  },
  {
    weekIndex: 11,
    weekTitle: "API Hacking & Mass Assignment (The Final Hunt)",
    competency: "API Security Auditing",
    burpTooling: "Logger++, OpenAPI Parser, Postman integration",
    portSwiggerLabLink: "https://portswigger.net/web-security/api-testing",
    textbookRefs: "Bug Bounty Bootcamp Ch 17; Real-World Bug Hunting Ch 12",
    githubAssetType: "Markdown Report" as const,
    githubAssetName: "master_bounty_portfolio_repo_template.md",
    githubAssetDesc: "Fully polished, unified 12-week GitHub portfolio index and enterprise VDP report repository template.",
    creatorRef: "NahamSec & InsiderPhD - Final VDP Triage & Portfolio Presentation",
    bossLabTitle: "Full-Scope Enterprise API VDP Capstone Audit"
  }
];

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Helper generator creating broad, 100% independent 8-part Red/Blue Team lesson content entries across all 12 weeks
const get8PartLessonContent = (
  weekIndex: number,
  dayIndex: number,
  dayTitle: string,
  schema: typeof weekSchemas[0],
  dayName: string
) => {
  const globalLessonIndex = weekIndex * 6 + dayIndex;

  // 1. Theoretical Foundation & Book Integration
  const section1_TheoreticalFoundation = {
    breakdown: `In modern web architectures, ${dayTitle} represents a fundamental vulnerability class where inputs handled under ${schema.competency} bypass trust boundaries. Under rapid development deadlines, engineering teams assume client-originating data streams or secondary parameter inputs are inherently safe. When sanitization or object-level authorization is omitted, malicious actors alter application state, read unauthorized tenant records, or execute arbitrary commands.`,
    mappedBookChapters: [
      {
        bookTitle: "The Web Application Hacker's Handbook (WAHH)",
        author: "Dafydd Stuttard & Marcus Pinto",
        chapter: "Core Architectural Controls",
        concept: "Exploiting boundary flaws and parameter pollution in client-server data flows."
      },
      {
        bookTitle: "Bug Bounty Bootcamp",
        author: "Vickie Li",
        chapter: "Input Vectors & Attack Mapping",
        concept: "Systematic mapping of input vectors and testing for privilege escalation."
      },
      {
        bookTitle: "Real-World Bug Hunting",
        author: "Peter Yaworski",
        chapter: "Case Studies in Application Logic Flaws",
        concept: "Analyzing disclosed HackerOne/Bugcrowd reports to discover creative WAF bypasses."
      },
      {
        bookTitle: "Bug Bounty Tips & Tricks using ChatGPT",
        author: "Joas Antonio dos Santos Barbosa",
        chapter: "Prompt Engineering for Code Sinks",
        concept: "Leveraging LLMs to extract vulnerability logic and refine technical VDP reports."
      },
      {
        bookTitle: "Bug Bounty from Scratch",
        author: "Vazquez & Javier",
        chapter: "Methodology & Scope Triage",
        concept: "Establishing structured daily hunting workflows and fast scope validation."
      },
      {
        bookTitle: "Automate the Boring Stuff with Python",
        author: "Al Sweigart",
        chapter: "Web Scraping & Request Parsing",
        concept: "Writing custom Python scrapers and automated HTTP requests for bug bounty."
      },
      {
        bookTitle: "Black Hat Python",
        author: "Justin Seitz",
        chapter: "Raw Sockets & Exploitation Utilities",
        concept: "Building high-performance multi-threaded offensive automation scripts."
      }
    ]
  };

  // 2. Video Walkthrough Analysis
  const section2_VideoWalkthroughAnalysis = {
    youtubeSearchTerms: [
      `${schema.creatorRef} ${dayTitle}`,
      `PortSwigger ${dayTitle} tutorial`,
      `Bug Bounty methodology ${schema.weekTitle}`
    ],
    instructorSteps: {
      targetRecon: `1. Reconcile endpoint boundaries using ${schema.burpTooling}.\n2. Capture normal traffic in Burp Suite Proxy and identify parameter fields.`,
      discoveryAndPayload: `3. Inject structured test vectors into parameters handling ${dayTitle}.\n4. Monitor HTTP response codes and response body variations.`,
      exploitation: `5. Escalate initial anomaly into a full proof-of-concept payload.\n6. Verify impact by exfiltrating non-sensitive metadata or confirming state change.`,
      mitigation: `7. Document reproduction steps and map findings to OWASP / CVSS benchmarks.`
    }
  };

  // 3. CTF Arena Track
  const section3_CtfArenaTrack = {
    environmentName: `PortSwigger & Custom Arena: ${dayTitle}`,
    stepByStepLabGuide: [
      `Navigate to PortSwigger Security Academy or target lab instance: ${schema.portSwiggerLabLink}`,
      `Configure Burp Suite Proxy listener and import target scope rules.`,
      `Trigger targeted endpoint using custom payload vectors.`,
      `Exfiltrate system verification token or trigger alert popup flag.`,
      `Submit the retrieved FLAG in the Digital Arena below to verify completion.`
    ],
    terminalPayload: `FLAG{BBM_W${weekIndex + 1}_D${dayIndex + 1}_${dayTitle.toUpperCase().replace(/[^A-Z0-0]/g, "")}}`
  };

  // 4. Automation & Recon Area
  const section4_AutomationAndReconArea = {
    automationStrategy: `Automating discovery of ${dayTitle} using custom Python requests and CLI fuzzing utilities.`,
    nucleiTemplateCommand: `nuclei -u https://target.com -t templates/vulnerabilities/${dayTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}.yaml`,
    ffufGobusterCommand: `ffuf -u https://target.com/FUZZ -w wordlists/parameters.txt -mc 200,302`,
    customPythonScript: `import requests\nimport sys\n\ndef audit_target(url):\n    headers = {'User-Agent': 'BugBountyMastery-Scanner/1.0'}\n    payload = "' OR 1=1 -- "\n    try:\n        res = requests.get(url + "?id=" + payload, headers=headers, timeout=5)\n        if "error" in res.text.lower() or res.status_code == 200:\n            print(f"[+] Potential finding on {url}")
    except Exception as e:\n        pass\n\nif __name__ == "__main__":\n    audit_target("https://example.com/api")`,
    customBashOneLiner: `cat subdomains.txt | httpx -silent | waybackurls | grep "=" | nuclei -t vulnerabilities/ -o results.txt`
  };

  // 5. VDP Report Writing Guide
  const section5_VdpReportWritingGuide = {
    title: `${dayTitle} Vulnerability in Target System`,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
    cvssScore: 8.1,
    description: `During a security audit under ${schema.competency}, a ${dayTitle} vulnerability was identified on the target host. The endpoint fails to adequately validate or sanitize user-supplied input prior to server processing.`,
    impact: `An attacker can leverage this vulnerability to bypass access controls, read or modify sensitive database records, or achieve unauthorized state modifications.`,
    stepsToReproduce: `1. Intercept HTTP request to target endpoint using Burp Suite.\n2. Inject payload into parameter handling input.\n3. Observe anomalous server response or unauthorized data return.`,
    remediation: `Implement strict server-side parameter sanitization, object-level authorization checks, and parameterized queries.`
  };

  // 6. Real-World Case Study
  const section6_RealWorldCaseStudy = {
    disclosedReportTitle: `Disclosed HackerOne Report: ${dayTitle} on Enterprise Host`,
    platform: "HackerOne",
    bountyAwarded: "$3,500 USD",
    targetCompany: "Fortune 500 Enterprise Target",
    hunterMethodology: `The security researcher identified an exposed parameter during routine recon using ${schema.burpTooling}. By manipulating input payloads, the researcher demonstrated unauthorized access, earning a $3,500 bounty.`
  };

  // 7. Live Hunting Grounds
  const section7_LiveHuntingGrounds = {
    curatedProgramLinks: [
      { name: "HackerOne Public Scope", url: "https://hackerone.com/bug-bounty-programs", platform: "HackerOne" },
      { name: "Bugcrowd VDP Directory", url: "https://bugcrowd.com/programs", platform: "Bugcrowd" },
      { name: "Intigriti European Targets", url: "https://www.intigriti.com/programs", platform: "Intigriti" }
    ],
    searchDorks: [
      `site:*.target.com inurl:api`,
      `site:*.target.com ext:php | ext:json`,
      `site:*.target.com "admin" | "dashboard"`
    ],
    scopeInclusionTips: `Ensure testing remains strictly within permitted wildcard subdomains. Respect rate limits and avoid destructive payloads.`
  };

  // 8. Expert Audit Note
  const section8_ExpertAuditNote = `SENIOR AUDITOR REFLECTION:\nWhen hunting for ${dayTitle}, always inspect edge-case endpoints like mobile API handlers or older legacy subdomains. Enterprise targets often apply WAF protections on main web applications while leaving legacy microservices unprotected.`;

  const githubAsset = {
    name: schema.githubAssetName,
    type: schema.githubAssetType,
    description: schema.githubAssetDesc,
    codeOrContent: section4_AutomationAndReconArea.customPythonScript
  };

  const linkedInMilestone = `🚀 Bug Bounty Mastery - Week ${weekIndex + 1} (${schema.weekTitle}) Completed!\n\nJust completed Day ${globalLessonIndex + 1}: ${dayTitle}.\n\n🔑 Key Achievements:\n• Mastered ${schema.burpTooling}\n• Practical Lab: PortSwigger (${schema.portSwiggerLabLink})\n• Built & Pushed GitHub Tool: ${schema.githubAssetName}\n• Mapped textbook theory from ${schema.textbookRefs}\n\nOnwards to mastering full-scope VDP triage! #BugBounty #Cybersecurity #EthicalHacking #InfoSec`;

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
    burpToolingUsed: schema.burpTooling,
    portSwiggerLabLink: schema.portSwiggerLabLink,
    githubPushAsset: githubAsset,
    linkedInMilestoneTemplate: linkedInMilestone,
    theory: {
      title: "Theoretical Principles & Auditing",
      duration: "30 Mins",
      beginnerAnalogy: {
        story: `Imagine an enterprise facility where guards check main entrance badges but leave side loading docks completely unmonitored. On Day ${globalLessonIndex + 1}, ${dayTitle} takes advantage of similar trust boundary gaps in application logic.`,
        realWorldComparison: "The web application relies on implicit trust assumptions across parameter flows or client-side validation logic."
      },
      chatGptPromptStrategy: `Prompt: "Act as a senior cybersecurity auditor. Review the following code snippet for ${dayTitle} vulnerabilities under ${schema.competency}. Identify parameter pollution, missing authorization checks, and payload injection points:\n[PASTE CODE HERE]"`,
      recommendedBooks: section1_TheoreticalFoundation.mappedBookChapters.map(b => ({
        title: b.bookTitle,
        author: b.author,
        chapterLesson: b.chapter,
        whatTheyAreDoing: b.concept,
        detailedExplanation: `Explores deep technical vectors, edge cases, and evasion tricks relevant to ${dayTitle}.`,
        practicalExample: `In ${b.bookTitle}, the author demonstrates auditing ${dayTitle} by intercepting HTTP requests in Burp Suite and modifying parameter values.`,
        howToAdapt: "Adapt this by generating automated custom scripts in Python or Nuclei templates.",
        takeaway: "Never trust client inputs and always implement server-side validation and role-based access control."
      })),
      creatorLessons: [
        {
          creatorName: schema.creatorRef,
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
          practicalCommand: section4_AutomationAndReconArea.nucleiTemplateCommand,
          specificVideoUrl: "https://www.youtube.com/results?search_query=" + encodeURIComponent(`${schema.creatorRef} ${dayTitle}`)
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
      whatYouAreDoing: `RED TEAM AUDIT (Day ${globalLessonIndex + 1} - ${dayName}):\nYou are auditing ${dayTitle} in a target web application under ${schema.competency}.`,
      vulnerabilityOrigin: section1_TheoreticalFoundation.breakdown,
      pentesterFocus: section2_VideoWalkthroughAnalysis.instructorSteps.targetRecon,
      payloadCrafting: section2_VideoWalkthroughAnalysis.instructorSteps.discoveryAndPayload,
      burpSuiteSetup: section2_VideoWalkthroughAnalysis.instructorSteps.exploitation,
      blueTeamDefense: section2_VideoWalkthroughAnalysis.instructorSteps.mitigation,
      developerMindset: "Developers often prioritize speed and feature delivery over input validation edge cases.",
      psychologicalError: "Assuming client-side controls or obscured endpoints are invisible to malicious actors.",
      usefulResources: [
        { name: `OWASP Testing Guide: ${schema.competency}`, url: "https://owasp.org/www-project-web-security-testing-guide/", category: "Standard" },
        { name: `PortSwigger Web Security Academy: ${dayTitle}`, url: schema.portSwiggerLabLink, category: "Lab & Guide" }
      ],
      industryInsight: section8_ExpertAuditNote
    },
    digitalArena: {
      title: "The Digital Arena Playground",
      duration: "90 Mins",
      stepByStepTutorial: section3_CtfArenaTrack.stepByStepLabGuide,
      labLink: schema.portSwiggerLabLink,
      instructions: "Execute payload in terminal shell or Burp Repeater and verify flag.",
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
        { id: `check-2`, text: `Execute Python script (${schema.githubAssetName})`, completed: false },
        { id: `check-3`, text: "Review CVSS calculations and submit VDP report", completed: false }
      ],
      committed: false,
      reported: false
    }
  };
};

// Daily titles per week to ensure 72 unique, highly relevant security topics
const weekDailyTitles: string[][] = [
  // Week 1: Target Reconnaissance & OSINT
  [
    "DNS Enumeration & Subdomain Discovery",
    "Certificate Transparency Logs & CRT.sh Mining",
    "Wayback & Gau Endpoint Harvesting",
    "GitHub Secret Hunting & Leaked API Keys",
    "Cloud Asset Discovery & AWS S3 Bucket Mining",
    "Scope Mapping & Port Scanning (Nmap/Masscan)"
  ],
  // Week 2: Subdomain Takeovers & Information Disclosure
  [
    "Dangling CNAME Identification & DNS Querying",
    "GitHub Pages & Heroku Takeover Auditing",
    "AWS S3 & Cloudfront Misconfiguration Hunting",
    "Exposed Environment Files (.env, .git/HEAD)",
    "Server Status Pages & Trace Debug Leakage",
    "Source Map Decompilation & JS Leak Mining"
  ],
  // Week 3: Broken Authentication & Session Management
  [
    "Session Token Predictability & Entropy Analysis",
    "Cookie Flag Audit (HttpOnly, Secure, SameSite)",
    "Password Reset Flow Flaws & Token Leakage",
    "Multi-Factor Authentication (MFA) Bypasses",
    "JWT Signature Stripping & Key Confusion Attacks",
    "OAuth 2.0 Implicit Grant & Redirect URI Hijacking"
  ],
  // Week 4: IDOR & Broken Object Level Authentication (BOLA)
  [
    "Numeric IDOR Parameter Fuzzing & Auto-Increment",
    "UUID / GUID Guessability & Entropy Analysis",
    "GraphQL BOLA & Nested Query Exfiltration",
    "HTTP Method Overriding (GET to POST IDOR)",
    "Autorize Burp Extension Multi-Role Auditing",
    "Second-Order IDOR & Indirect Object Reference"
  ],
  // Week 5: Cross-Site Scripting (XSS)
  [
    "Reflected XSS Filter Bypasses & HTML Injection",
    "Stored XSS in Rich-Text & Profile Fields",
    "DOM XSS Sink & Source Identification",
    "CSP (Content Security Policy) Bypasses",
    "DOM Clobbering & JS Prototype Pollution",
    "Blind XSS Payload Injection & Callback Logging"
  ],
  // Week 6: Cross-Site Request Forgery (CSRF)
  [
    "Basic CSRF Form Generation & Auto-Submit Exploits",
    "SameSite Cookie Lax/Strict Bypass Vectors",
    "CSRF Token Manipulation & Stripping Tricks",
    "Cross-Origin Resource Sharing (CORS) Misconfigurations",
    "JSON CSRF via Content-Type Manipulation",
    "Flash / WebSockets CSRF State Overriding"
  ],
  // Week 7: SQL Injection (SQLi)
  [
    "In-Band Error-Based SQL Injection",
    "UNION-Based Data Extraction & Column Mapping",
    "Blind Boolean-Based SQL Injection",
    "Blind Time-Based Delay Injections",
    "Out-of-Band (OOB) SQLi with Burp Collaborator",
    "ORM Injection & NoSQL Injection Vectors"
  ],
  // Week 8: Server-Side Request Forgery (SSRF)
  [
    "Basic In-Band SSRF to Localhost (127.0.0.1)",
    "AWS EC2 IMDSv1 Metadata Exfiltration",
    "GCP & Azure Metadata Endpoint Attacks",
    "DNS Rebinding & Local Loopback Bypasses",
    "Blind Out-of-Band SSRF via Burp Collaborator",
    "Protocol Smuggling (gopher://, dict://) via SSRF"
  ],
  // Week 9: XML External Entity (XXE) Injection
  [
    "Local File Inclusion via XML DTD Injections",
    "Blind Out-of-Band XXE Data Exfiltration",
    "XXE via SVG File Upload Injections",
    "SOAP & Office Document (XLSX/DOCX) XXE",
    "XInclude Attacks & XML Entity Expansion",
    "Bypassing XML Parser Sanitizers & Encoding"
  ],
  // Week 10: Server-Side Template Injection (SSTI) & RCE
  [
    "Jinja2 & Python SSTI to Remote Code Execution",
    "Twig & PHP Template Injection Vectors",
    "Java Spring / Freemarker SSTI Exploitation",
    "Node.js EJS & Jade Template Injection",
    "Command Injection via Raw Shell Arguments",
    "Insecure Deserialization to RCE (Python/Java)"
  ],
  // Week 11: Race Conditions & Business Logic Vulnerabilities
  [
    "HTTP/2 Single-Packet Attack Concurrency",
    "Coupon & Discount Code Over-Redemption Race",
    "Financial Transfer Double-Spend Race Conditions",
    "Workflow Bypass & Step-Skipping Logic Flaws",
    "Negative Value Input Logic Attacks",
    "Rate Limit Bypasses via Header Manipulation"
  ],
  // Week 12: API Hacking & Mass Assignment
  [
    "REST API Parameter Mining & Mass Assignment",
    "GraphQL Introspection & Schema Mapping",
    "OpenAPI / Swagger Spec Parsing & Endpoint Discovery",
    "API Key Scoping & Excessive Data Exposure",
    "JWT Key Confusion & API Authorization Bypass",
    "Full Enterprise VDP Report Synthesis & Portfolio Push"
  ]
];

// Helper to generate weeks data
export const generateDefaultCurriculum = (): Week[] => {
  const weeks: Week[] = [];

  weekSchemas.forEach((schema, weekIdx) => {
    const dailyTitles = weekDailyTitles[weekIdx] || weekDailyTitles[0];
    const days: DayLesson[] = dailyTitles.map((dayTitle, dayIdx) => {
      const dayName = dayNames[dayIdx];
      const lessonDetails = get8PartLessonContent(weekIdx, dayIdx, dayTitle, schema, dayName);

      return {
        id: `week-${weekIdx + 1}-${dayName.toLowerCase()}`,
        weekIndex: weekIdx,
        dayName,
        title: dayTitle,
        durationMinutes: 150, // 30 + 90 + 30
        unlocked: weekIdx === 0 && dayIdx === 0, // Unlock Week 1 Day 1 by default
        completed: false,
        competency: schema.competency,
        burpToolingUsed: schema.burpTooling,
        portSwiggerLabLink: schema.portSwiggerLabLink,
        githubPushAsset: lessonDetails.githubPushAsset,
        linkedInMilestoneTemplate: lessonDetails.linkedInMilestoneTemplate,
        framework: lessonDetails.framework,
        theory: lessonDetails.theory,
        digitalArena: lessonDetails.digitalArena,
        automation: lessonDetails.automation
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
      unlocked: weekIdx === 0, // Week 1 unlocked by default
      completed: false,
      days,
      bossLab
    });
  });

  return weeks;
};
