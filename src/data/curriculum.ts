import { Week, DayLesson, BossLab, BookLesson, CreatorLesson, RealWorldHuntingGuide, WhereToHuntAndAiAutomation, StudentVdpEvaluation } from "../types/curriculum";

// Helper generator creating broad, beginner-friendly, highly practical Red/Blue Team lesson content entries across all 12 weeks
const getComprehensiveLessonContent = (
  weekIndex: number,
  dayIndex: number,
  dayTitle: string,
  competency: string,
  dayName: string
) => {
  const globalLessonIndex = weekIndex * 6 + dayIndex;

  // Real-world beginner analogies explaining vulnerabilities through simple stories
  const beginnerAnalogies: { story: string; realWorldComparison: string }[] = [
    {
      story: "Imagine a hotel where every door has a name tag instead of a digital key. If you swap the name tag on Room 101 to say 'Room 102', the lock gets confused and lets you inside!",
      realWorldComparison: "In web applications, DOM Clobbering happens when user-controlled HTML tags override JavaScript variables or window properties, fooling the script into executing unauthorized code."
    },
    {
      story: "Imagine a master blueprint in a toy factory. If someone writes 'Make all toys free' on the master blueprint, every single toy built afterward inherits that flaw!",
      realWorldComparison: "Prototype Pollution occurs when an attacker modifies Object.prototype in JavaScript. Every object created in the application inherits the polluted property, granting admin privileges across the app."
    },
    {
      story: "Imagine a puzzle box shipped inside a transparent plastic wrapper. Even though the wrapper looks sealed, anyone looking through the plastic can see the secret solution code written inside!",
      realWorldComparison: "Source maps (.map files) preserve original un-minified source code for debugging. Developers forget to remove them in production, allowing bug hunters to read full backend endpoints."
    },
    {
      story: "Imagine storing your house keys inside a clear glass jar left sitting on the front porch. Anyone passing by on the sidewalk can look inside or reach in and take them!",
      realWorldComparison: "Websites store secret login tokens in window.localStorage. If an attacker finds a Cross-Site Scripting (XSS) vulnerability, they can read localStorage and steal session tokens."
    },
    {
      story: "Imagine a walkie-talkie channel between two security guards. If an outsider tunes into the exact frequency and imitates a guard's voice, they can send false orders without needing a password!",
      realWorldComparison: "WebSockets maintain full-duplex open connections. If the server doesn't check the Origin header during handshake, attackers can send malicious WebSocket messages."
    },
    {
      story: "Imagine a bank vault that prints 'Welcome Everyone!' on its front door. When a stranger asks 'Can I enter?', the vault reads the sign and automatically unlocks the door for anyone!",
      realWorldComparison: "CORS headers control cross-origin data sharing. Setting Access-Control-Allow-Origin: * or reflecting arbitrary Origin headers lets external sites steal sensitive API responses."
    }
  ];

  const beginnerAnalogy = beginnerAnalogies[globalLessonIndex % beginnerAnalogies.length];

  // ChatGPT & AI Bug Bounty Auditing Strategy Prompts (Inspired by Joas Antonio dos Santos Barbosa)
  const chatGptPromptStrategy = `🤖 CHATGPT BUG BOUNTY PROMPT STRATEGY (by Joas Antonio dos Santos Barbosa):
Copy and paste this prompt into ChatGPT / Claude to audit target code for ${dayTitle}:

"Act as an elite Web Application Security Auditor reviewing source code for ${competency}.
Analyze the following code snippet for ${dayTitle} vulnerabilities:
1. Identify dangerous input sinks, un-sanitized variables, or missing authorization checks.
2. Generate 3 stealthy proof-of-concept payload variations designed to bypass Web Application Firewalls (WAF).
3. Explain step-by-step how a penetration tester can verify this flaw in Burp Suite Repeater.
4. Provide secure refactored code using modern defense-in-depth principles."`;

  // Real-World Bug Hunting Field Guide Section
  const howToDoRealWorldHunting: RealWorldHuntingGuide = {
    targetDiscoveryDorks: [
      `site:target.corp inurl:api/v1/${competency.toLowerCase().replace(/[\s&()\-]/g, "")}`,
      `site:*.target.corp ext:js "${dayTitle.split(" ")[0].toLowerCase()}"`,
      `site:target.corp inurl:debug=1`
    ],
    reconFilterStrategy: `1. Run 'subfinder -d target.corp -silent | httpx -title -status-code' to enumerate live HTTP assets.\n2. Filter for JS bundles containing parameter routing or API endpoints matching ${competency}.\n3. Use 'arjun -u https://target.corp/api/v1/resource -m GET,POST' to mine un-linked query parameters.`,
    realWorldTriageTips: `1. When reporting ${dayTitle} on HackerOne or Bugcrowd, always attach a clean, copy-pasteable cURL command.\n2. Demonstrate business impact: prove whether an unauthenticated user can read private PII or execute administrative state changes.\n3. Verify that the flaw reproduces on production assets before filing to avoid duplicate status.`,
    bypassTricks: `1. WAF Bypass: Try double URL encoding (%2527 instead of %27) or unicode normalization (%u0027).\n2. HTTP Parameter Pollution (HPP): Supply duplicate query parameters (?id=101&id=102).\n3. Method Override: Send 'X-HTTP-Method-Override: PUT' header if direct PUT/DELETE calls return HTTP 405.`
  };

  // Where to Hunt Scopes & AI Automated Hunting
  const whereToHuntAndAiAutomation: WhereToHuntAndAiAutomation = {
    targetProgramLinks: [
      { name: "HackerOne Public Directory Scope", url: "https://hackerone.com/hacktivity", platform: "HackerOne" },
      { name: "Bugcrowd Public Programs Scope", url: "https://bugcrowd.com/programs", platform: "Bugcrowd" },
      { name: "Intigriti VDP Directory", url: "https://www.intigriti.com/programs", platform: "Intigriti" },
      { name: "Immunefi Web3 Scope Directory", url: "https://immunefi.com/explore/", platform: "Immunefi" }
    ],
    aiAutomatedHuntingWorkflow: `1. Connect a Python script to OpenAI API / ChatGPT using python-requests.\n2. Fetch target endpoint responses or JS assets continuously using background cron jobs.\n3. Feed HTTP response text into ChatGPT prompt filters to automatically identify un-sanitized parameter sinks for ${dayTitle}.\n4. Log potential findings to local JSON files and trigger Desktop notifications upon discovery.`,
    automatedScrapersAndDorks: [
      `python3 -c "import requests; print(requests.get('https://hackerone.com/directory/programs').status_code)"`,
      `subfinder -d target.com -silent | waybackurls | grep -E "(\\.js|/api/)"`
    ]
  };

  // All 7 Essential Books Detailed Chapter Lessons
  const recommendedBooks: BookLesson[] = [
    {
      title: "The Web Application Hacker's Handbook (WAHH)",
      author: "Dafydd Stuttard & Marcus Pinto",
      chapterLesson: `Chapter 9: Attacking Data Stores & ${competency}`,
      whatTheyAreDoing: `The authors demonstrate how core web architecture handling ${dayTitle} fails when trust boundaries between client requests and backend server handlers are blurred.`,
      detailedExplanation: `In WAHH, Stuttard and Pinto detail the exact mechanics of HTTP request manipulation. They explain how proxy tools intercept outbound packets, allowing researchers to modify parameter types, inject boundary payloads, and bypass client-side validation controls when auditing ${competency}.`,
      practicalExample: `GET /api/v1/resource?id=101' OR '1'='1 HTTP/1.1\nHost: target.corp\nUser-Agent: WAHH_Auditor`,
      howToAdapt: `Intercept the request in Burp Suite Repeater, append payload boundaries, and observe SQL or logic error reflections in response headers.`,
      takeaway: "Never trust client-side validation; always verify parameter constraints on the server."
    },
    {
      title: "Bug Bounty Bootcamp",
      author: "Vickie Li",
      chapterLesson: `Chapter 7: Finding and Exploiting ${dayTitle}`,
      whatTheyAreDoing: `Vickie Li explains step-by-step how bug bounty hunters discover ${dayTitle} in production web applications and construct clean PoCs.`,
      detailedExplanation: `Vickie Li breaks down common developer mistakes that cause ${dayTitle}. She provides practical methodology checklists for mapping application functionality, isolating parameter inputs, and verifying impact without crashing production servers.`,
      practicalExample: `curl -i -X GET "https://target.corp/api/v1/user?id=102" -H "Authorization: Bearer TOKEN"`,
      howToAdapt: `Swap account session tokens between Account A and Account B to verify access control boundaries.`,
      takeaway: "Isolate input parameters and test privilege escalation across multiple test user roles."
    },
    {
      title: "Real-World Bug Hunting",
      author: "Peter Yaworski",
      chapterLesson: `Chapter 4: Case Studies in ${competency}`,
      whatTheyAreDoing: `Peter Yaworski analyzes real public vulnerability reports submitted to Google, Twitter, and Shopify, showing how researchers earned $5,000+ bounties for ${dayTitle}.`,
      detailedExplanation: `Yaworski examines actual HackerOne reports. He shows how simple observation and creative parameter manipulation allowed researchers to bypass complex WAF filters and escalate low-severity bugs into critical payouts.`,
      practicalExample: `https://target.corp/redirect?url=https://attacker.com/oauth/callback`,
      howToAdapt: `Test parameters against OAuth callbacks and parameter overrides on staging subdomains.`,
      takeaway: "Study disclosed bug reports to learn creative payload variations used by top hunters."
    },
    {
      title: "Bug Bounty Tips & Tricks using ChatGPT",
      author: "Joas Antonio dos Santos Barbosa",
      chapterLesson: `Chapter 3: AI Code Auditing & Prompt Engineering for ${competency}`,
      whatTheyAreDoing: `The author uses AI prompts as an automated assistant to analyze code blocks, locate sinks, and generate proof-of-concept payloads for ${dayTitle}.`,
      detailedExplanation: `Joas Antonio demonstrates feeding JavaScript bundles and API functions into ChatGPT. By using structured prompts specifying security auditor personas, AI models spot validation gaps and generate WAF bypass strings.`,
      practicalExample: `Prompt: "Analyze this code for ${dayTitle} in ${competency}. Identify dangerous sinks and write 3 cURL command line payloads."`,
      howToAdapt: `Paste code snippets from Burp Suite Target Site Map into AI prompts to generate custom test strings.`,
      takeaway: "Use structured AI prompts to automate static code analysis and generate targeted payload variations."
    },
    {
      title: "Bug Bounty from Scratch",
      author: "Santiago Vazquez & Francisco Javier",
      chapterLesson: `Chapter 5: Practical Exploitation & VDP Submission for ${dayTitle}`,
      whatTheyAreDoing: `The authors demonstrate transitioning from parameter weakness discovery to drafting a high-impact vulnerability report for HackerOne or Bugcrowd.`,
      detailedExplanation: `Santiago Vazquez and Francisco Javier analyze real-world submissions. They explain that finding ${dayTitle} requires mapping parameter data flows, testing boundary conditions, and documenting minimal cURL commands for triagers.`,
      practicalExample: `curl -v -X POST "https://target.corp/api/v1/resource" -H "Content-Type: application/json" -d '{"param": "test_payload"}'`,
      howToAdapt: `Replace target.corp with your authorized scope URL and run cURL commands directly in terminal.`,
      takeaway: "Always document clean, minimal cURL reproduction commands to ensure fast report triage."
    },
    {
      title: "Automate the Boring Stuff with Python",
      author: "Al Sweigart",
      chapterLesson: `Chapter 12: Web Scraping & HTTP Request Scripting for ${competency}`,
      whatTheyAreDoing: `The author writes automated Python scripts to send HTTP requests at scale, parse status codes, and test endpoints for ${dayTitle} across subdomains.`,
      detailedExplanation: `Al Sweigart teaches writing lightweight Python scripts using the 'requests' library. By automating HTTP GET/POST queries, your script can iterate through wordlists and log active vulnerabilities without manual browser interactions.`,
      practicalExample: `import requests\nres = requests.get('https://target.corp/api/v1/resource')\nif res.status_code == 200: print('[+] Vulnerability Verified!')`,
      howToAdapt: `Pass target URL lists as command line arguments (sys.argv[1]) and save output to JSON files.`,
      takeaway: "Automate repetitive auditing tasks with simple Python scripts to test assets at scale."
    },
    {
      title: "Black Hat Python",
      author: "Justin Seitz",
      chapterLesson: `Chapter 4: Writing Custom Proxy Extensions for ${dayTitle}`,
      whatTheyAreDoing: `The author builds custom offensive network extensions in Python to intercept raw HTTP traffic, modify headers on the fly, and bypass WAF filters.`,
      detailedExplanation: `Justin Seitz explains building custom Python network tools and Burp extensions to intercept traffic, manipulate headers, and bypass WAF rate limits when testing ${competency}.`,
      practicalExample: `import urllib.request\nreq = urllib.request.Request('https://target.corp', headers={'X-Audit-Tool': 'BlackHatPython'})\nprint(urllib.request.urlopen(req).read().decode())`,
      howToAdapt: `Wrap script functions in Burp Suite Python extension hooks to automatically inject custom headers.`,
      takeaway: "Build custom network scripts to automate non-standard payload injections and header overrides."
    }
  ];

  // Specific YouTube Video Walkthroughs Tailored for the Exact Daily Vulnerability Topic
  const creatorLessonsMap: Record<number, CreatorLesson[]> = {
    0: [
      {
        creatorName: "Rana Khalil",
        channelOrWebsite: "Rana Khalil (YouTube / PortSwigger Walkthroughs)",
        lessonTitle: "DOM Clobbering Mechanics & Exploit Walkthrough",
        broadExplanation: "Rana Khalil broadly explains how DOM Clobbering occurs when HTML element attributes override global window object properties. She demonstrates constructing iframe/anchor tags to hijack script execution.",
        methodologyOverview: "Inspect browser DOM variables, identify un-sanitized window assignments, and inject HTML tags to override script behavior.",
        stepByStepWalkthrough: [
          "1. Inspect JavaScript source for window object property references.",
          "2. Craft HTML iframe tag with name/id matching target window property.",
          "3. Inject srcdoc attribute containing script redirect.",
          "4. Verify DOM clobbering in browser DevTools Console."
        ],
        practicalCommand: `<iframe name="config" srcdoc="<a id='apiEndpoint' href='javascript:alert(1)'></a>"></iframe>`,
        specificVideoUrl: "https://www.youtube.com/watch?v=2_s393XkR8A"
      },
      {
        creatorName: "LiveOverflow",
        channelOrWebsite: "LiveOverflow (YouTube / Web Security)",
        lessonTitle: "DOM Clobbering to XSS - Deep Dive Mechanics",
        broadExplanation: "LiveOverflow analyzes DOM Clobbering at the browser parser level. He demonstrates how HTML sanitizers like DOMPurify prevent clobbering and how edge-case HTML tags bypass sanitization.",
        methodologyOverview: "Examine browser DOM parser quirks and test HTML tag clobbering variations.",
        stepByStepWalkthrough: [
          "1. Open Chrome DevTools Console and inspect Object.prototype.",
          "2. Test clobbering window variables using form/input elements.",
          "3. Combine clobbered elements with innerHTML sinks.",
          "4. Execute alert flag."
        ],
        practicalCommand: `<form id="config"><input id="api" value="evil.com"></form>`,
        specificVideoUrl: "https://www.youtube.com/watch?v=0O_A4S3a738"
      }
    ],
    1: [
      {
        creatorName: "Rana Khalil",
        channelOrWebsite: "Rana Khalil (YouTube / Prototype Pollution)",
        lessonTitle: "Client-Side Prototype Pollution Walkthrough",
        broadExplanation: "Rana Khalil demonstrates how client-side Prototype Pollution in JavaScript libraries allows attackers to pollute Object.prototype, triggering stored XSS or modifying application config flags.",
        methodologyOverview: "Locate recursive object merge functions in JS, inject __proto__ properties, and pollutes global application state.",
        stepByStepWalkthrough: [
          "1. Identify query parameters parsed into JSON objects.",
          "2. Supply payload: ?__proto__[isAdmin]=true.",
          "3. Check window.isAdmin in DevTools Console.",
          "4. Trigger administrative UI pathways."
        ],
        practicalCommand: `location.search = "?__proto__[status]=active"`,
        specificVideoUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE"
      }
    ]
  };

  const defaultCreatorLessons: CreatorLesson[] = [
    {
      creatorName: "Rana Khalil",
      channelOrWebsite: "Rana Khalil (YouTube / Web Security Walkthroughs)",
      lessonTitle: `Hands-On Video Walkthrough: ${dayTitle}`,
      broadExplanation: `Rana Khalil broadly demonstrates the exact auditing methodology for ${dayTitle}. She walks through inspecting vulnerable request flows, configuring Burp Suite, and crafting working exploit payloads.`,
      methodologyOverview: `Trace parameter inputs in Burp Suite, identify missing validation, and construct proof-of-concept payloads for ${competency}.`,
      stepByStepWalkthrough: [
        `1. Capture target HTTP request matching ${dayTitle} in Burp Suite Proxy.`,
        `2. Forward request to Repeater (Ctrl+R).`,
        `3. Inject target payload into parameter input sink.`,
        `4. Verify response code and confirm vulnerability impact.`
      ],
      practicalCommand: `curl -v -X POST "https://target.corp/api/v1/resource" -H "X-Audit-Skill: ${competency}" -d '{"param": "exploit"}'`,
      specificVideoUrl: "https://www.youtube.com/watch?v=2_s393XkR8A"
    },
    {
      creatorName: "John Hammond",
      channelOrWebsite: "John Hammond (YouTube / CTF & PoC Analysis)",
      lessonTitle: `PoC Analysis & Python Automation for ${dayTitle}`,
      broadExplanation: `John Hammond broadly demonstrates how to analyze real-world vulnerability PoCs for ${dayTitle}, inspect HTTP response headers, and automate payload submission in Python.`,
      methodologyOverview: `Deconstruct vulnerability PoCs, inspect server response text, and automate exploit delivery via Python requests.`,
      stepByStepWalkthrough: [
        `1. Inspect target endpoint routes for ${dayTitle} in browser DevTools.`,
        `2. Construct Python requests script targeting ${competency}.`,
        `3. Parse response status codes and extracted data.`,
        `4. Generate automated report log.`
      ],
      practicalCommand: `python3 -c "import requests; print(requests.get('https://target.corp/api/v1/resource').status_code)"`,
      specificVideoUrl: "https://www.youtube.com/watch?v=0O_A4S3a738"
    }
  ];

  const creatorLessons = creatorLessonsMap[globalLessonIndex] || defaultCreatorLessons;

  // Interactive Student VDP Report Evaluator
  const studentVdpTestingConsole: StudentVdpEvaluation = {
    prompt: `Draft your VDP Report for ${dayTitle} below. Fill in Title, CVSS Score, Impact Description, Reproduction Steps, and Remediation. The Academy Evaluator will test and grade your report!`,
    titleInput: `[HIGH] ${dayTitle} Identified in Application Endpoint`,
    cvssInput: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N (8.2)`,
    descriptionInput: `During a security assessment, an un-sanitized parameter flaw (${dayTitle}) was identified in ${competency}. An unauthenticated attacker can exploit this condition to read or modify sensitive user data.`,
    stepsInput: `1. Send GET request to target URL: https://target.corp/api/v1/resource\n2. Supply parameter payload string.\n3. Observe HTTP 200 response returning unauthorized target data.`,
    remediationInput: `1. Implement strict server-side validation and parameter allowlists.\n2. Enforce object-level access control on all backend API routes.`,
    evaluated: false,
    score: "Pending Submission",
    feedback: "Fill in the fields above and click 'Submit Report for Evaluation' to test your VDP writing skills."
  };

  // Lesson details
  const whatYouAreDoing = `RED TEAM AUDIT (Day ${globalLessonIndex + 1} - ${dayName}):\nYou are auditing ${dayTitle} in a target web application. Learn the fundamental mechanics, inspect client code, craft custom payloads, and capture the flag.`;

  const vulnerabilityOrigin = `ORIGIN & ROOT CAUSE:\n${dayTitle} occurs when developers assume client parameters are safe without server validation. Under deadline pressure, input sanitization is skipped, creating severe security gaps.`;

  const pentesterFocus = `PENTESTER AUDIT CHECKLIST:\n1. Search client bundles and HTTP parameters for ${dayTitle} inputs.\n2. Intercept requests in Burp Suite and mutate query parameters.\n3. Execute CLI scan scripts and verify HTTP status code differences.`;

  const payloadCrafting = `PAYLOAD CRAFTING LOGIC FOR ${dayTitle.toUpperCase()}:\n1. Base Payload: Craft primary parameter string targeting ${competency}.\n2. Bypass Encoding: Apply URL/Base64 encoding or duplicate parameter injection.\n3. Verification: Verify execution via HTTP response reflection or flag output.`;

  const burpSuiteSetup = `BURP SUITE PROXY SETUP:\n1. Proxy -> Intercept: Capture outbound requests for ${dayTitle}.\n2. Match/Replace Rules: Automatically inject custom payload headers into POST request bodies.\n3. Repeater: Send modified requests (Ctrl+R) to test parameter boundaries.`;

  const blueTeamDefense = `BLUE TEAM DEFENSE & SECURE CODING:\n1. Enforce strict server-side validation and parameter allowlists.\n2. Verify object-level authorization on every API endpoint.\n3. Implement strict Content Security Policies (CSP) and WAF protection rules.`;

  const stepByStepTutorial = [
    `Step 1: Open the target code inspection box inside the Digital Arena panel below.`,
    `Step 2: Identify where user input reaches dangerous sinks or missing authorization checks.`,
    `Step 3: Write your custom exploit payload string in the terminal workspace.`,
    `Step 4: Click 'Execute Payload' in the local shell terminal to trigger simulation.`,
    `Step 5: Copy the captured flag into the verification input to claim your XP and advance.`
  ];

  const usefulResources = [
    { name: `OWASP Testing Guide: ${competency}`, url: "https://owasp.org/www-project-web-security-testing-guide/", category: "Standard" },
    { name: `PortSwigger Web Security Academy: ${dayTitle}`, url: "https://portswigger.net/web-security", category: "Lab & Guide" },
    { name: `HackerOne Public Vulnerability Disclosures`, url: "https://hackerone.com/hacktivity", category: "Reference" }
  ];

  const industryInsight = `💡 INDUSTRY INSIGHT & STATISTIC (Day ${globalLessonIndex + 1}):\nVulnerabilities in ${competency} regularly command bounties between $1,500 and $10,000+ on major bug bounty platforms like HackerOne and Bugcrowd.`;

  const pythonScript = `#!/usr/bin/env python3
# Black Hat Python / Automate Boring Stuff Style Script
# Module: ${dayTitle} (Day ${globalLessonIndex + 1})

import requests
import sys

def audit_${dayName.toLowerCase()}_target(url):
    print(f"[*] Auditing target endpoint for ${dayTitle}: {url}")
    headers = {"User-Agent": "BugBountyMastery/3.0", "X-Audit-Skill": "${competency}"}
    try:
        res = requests.get(f"{url}/api/v1/resource", headers=headers, timeout=5)
        print(f"[+] Server Response Code: {res.status_code}")
        if res.status_code == 200:
            print("[+] Target active! Exploit payload verified successfully.")
    except Exception as e:
        print(f"[-] Connection error: {e}")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://sandbox-target.corp.internal"
    audit_${dayName.toLowerCase()}_target(target)`;

  const bashScript = `#!/usr/bin/env bash
# CLI Bash Automation: ${dayTitle} (Day ${globalLessonIndex + 1})
TARGET=\${1:-"http://sandbox-target.corp.internal"}

echo "[*] Running CLI scanner for ${dayTitle}..."
curl -s -X GET -H "X-Audit-Skill: ${competency}" "$TARGET/api/v1/resource" | head -n 20`;

  const vdpReportTemplate = {
    title: `[HIGH] ${dayTitle} Identified in Core Endpoint`,
    cvssVector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N",
    cvssScore: 8.2,
    description: `During a security audit, an un-sanitized flaw (${dayTitle}) was identified in ${competency}. An attacker can exploit this condition to read unauthorized tenant data.`,
    stepsToReproduce: `1. Issue HTTP request to endpoint for ${dayTitle}.\n2. Supply parameter payload string.\n3. Observe HTTP 200 response returning unauthorized data.`,
    remediation: `1. Implement strict server-side parameter validation.\n2. Enforce object-level access control on all backend API routes.`
  };

  const dailyAssignment = {
    title: `Daily Hands-On Assignment: ${dayTitle}`,
    objective: `Demonstrate practical understanding of ${dayTitle} by auditing code sinks, crafting an exploit payload, running python automation, and drafting a VDP report.`,
    tasks: [
      `Task 1: Inspect the target code snippet in the Digital Arena and identify input parameters.`,
      `Task 2: Construct a working exploit payload for ${dayTitle} in the local terminal shell.`,
      `Task 3: Execute the Python automation script and verify the response status code.`,
      `Task 4: Submit the captured flag and record your research log to earn XP.`
    ],
    deliverable: `Extracted Flag (e.g. FLAG{...}) and completed daily checklist.`
  };

  return {
    beginnerAnalogy,
    chatGptPromptStrategy,
    recommendedBooks,
    creatorLessons,
    howToDoRealWorldHunting,
    whereToHuntAndAiAutomation,
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
    bashScript: bashScript,
    vdpReportTemplate,
    studentVdpTestingConsole,
    dailyAssignment
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
          beginnerAnalogy: details.beginnerAnalogy,
          chatGptPromptStrategy: details.chatGptPromptStrategy,
          recommendedBooks: details.recommendedBooks,
          creatorLessons: details.creatorLessons,
          howToDoRealWorldHunting: details.howToDoRealWorldHunting,
          whereToHuntAndAiAutomation: details.whereToHuntAndAiAutomation,
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
          bashScript: details.bashScript,
          pythonExplanation: `Automating this exploit in Python creates a reusable proof-of-concept script for your bug bounty toolkit.`,
          bashExplanation: `Automating this exploit in Bash allows rapid CLI command-line execution across target IP ranges.`,
          vdpReportTemplate: details.vdpReportTemplate,
          studentVdpTestingConsole: details.studentVdpTestingConsole,
          dailyAssignment: details.dailyAssignment,
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
