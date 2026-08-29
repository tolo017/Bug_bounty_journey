import React, { useState, useEffect } from "react";
import { DayLesson } from "../types/curriculum";
import { Terminal, ShieldAlert, Cpu, Eye, RefreshCw, AlertCircle, Sparkles, CheckCircle2, Code2, KeyRound, Copy } from "lucide-react";

interface InteractiveArenaProps {
  day: DayLesson;
  onVerifyFlag: (flagInput: string) => { success: boolean; message: string };
}

export const InteractiveArena: React.FC<InteractiveArenaProps> = ({ day, onVerifyFlag }) => {
  const [flagInput, setFlagInput] = useState("");
  const [verificationMsg, setVerificationMsg] = useState({ text: "", isError: false });
  const [userExploitPayload, setUserExploitPayload] = useState("");
  const [simulatorOutput, setSimulatorOutput] = useState<string[]>([]);
  const [capturedFlag, setCapturedFlag] = useState("");
  const [loadingSim, setLoadingSim] = useState(false);

  // Clear inputs and output when lesson changes
  useEffect(() => {
    setSimulatorOutput([]);
    setFlagInput("");
    setUserExploitPayload("");
    setCapturedFlag("");
    setVerificationMsg({ text: "", isError: false });
  }, [day.id]);

  const targetHost = `sandbox-node-${day.dayName.toLowerCase()}.corp.internal`;

  // Payload hints and vulnerability indicators ("What to look for")
  const vulnerabilityKnowledgeMap: Record<string, {
    whatToLookFor: string;
    targetSnippet: string;
    exploitHint: string;
    expectedPattern: string;
  }> = {
    "DOM Clobbering & Document Object Manipulation": {
      whatToLookFor: "Look for dynamic script loads relying on global DOM properties like `window.config.apiEndpoint`. When an HTML element has an `id` or `name`, browsers automatically instantiate it as a global property.",
      targetSnippet: `// Vulnerable Target Code in main.js:\nconst endpoint = window.config?.apiEndpoint || '/api/v1/default';\nfetch(endpoint + '/user/data');`,
      exploitHint: "Craft an HTML element (e.g., `<a id='config' href='...'></a>` or `<iframe name='config'...>`) that overrides `window.config`.",
      expectedPattern: "config"
    },
    "Client-Side Prototype Pollution in Wild JS Files": {
      whatToLookFor: "Look for recursive object merge functions (like `Object.assign` or `lodash.merge`) parsing URL query parameters without filtering `__proto__` or `constructor.prototype` keys.",
      targetSnippet: `// Vulnerable Target Code in parser.js:\nfunction parseParams(params) {\n  let config = {};\n  for (let [k, v] of params) { config[k] = v; }\n  return config;\n}`,
      exploitHint: "Inject `__proto__.isAdmin=true` or `__proto__[status]=active` into parameter key-value pairs.",
      expectedPattern: "proto"
    },
    "Source Map Reconstruction & JS Deobfuscation": {
      whatToLookFor: "Inspect HTTP network responses for `//# sourceMappingURL=bundle.js.map`. De-obfuscating source maps reveals uncompiled developer comments, secret API endpoints, and hardcoded authentication tokens.",
      targetSnippet: `// Obfuscated Bundle:\nvar _0x4a12 = ["\x76\x65\x72\x69\x66\x79\x53\x65\x63\x72\x65\x74"];\n//# sourceMappingURL=app.js.map`,
      exploitHint: "Type a command or function call to deobfuscate source maps (e.g., `restore-source-map main.js.map` or `deobfuscate(app.js)`).",
      expectedPattern: "map"
    },
    "Client-Side Storage Abuse (XSS via LocalStorage)": {
      whatToLookFor: "Look for unsafe DOM injections like `element.innerHTML = un-sanitized_input` where session JWTs or auth tokens are stored in `window.localStorage`.",
      targetSnippet: `// Vulnerable Storage Access:\nconst token = localStorage.getItem('authToken');\ndocument.getElementById('user-view').innerHTML = location.hash.substring(1);`,
      exploitHint: "Craft an XSS payload that reads `localStorage.getItem('token')` or `localStorage.getItem('authToken')`.",
      expectedPattern: "storage"
    },
    "WebSocket Message Manipulation & Race Conditions": {
      whatToLookFor: "Look for socket event listeners that process state changes (e.g., money transfers or privilege escalation) without server-side mutex locks or transaction sequence numbers.",
      targetSnippet: `// Vulnerable Socket Listener:\nsocket.on('transfer', (data) => {\n  let balance = getBalance(data.user);\n  setBalance(data.user, balance - data.amount);\n});`,
      exploitHint: "Send concurrent WebSocket frames containing `{\"action\": \"transfer\", \"race\": true}`.",
      expectedPattern: "socket"
    },
    "CORS Misconfigurations & Origin Reflection": {
      whatToLookFor: "Look for HTTP responses reflecting arbitrary `Origin` request headers alongside `Access-Control-Allow-Credentials: true`.",
      targetSnippet: `// Vulnerable Backend Middleware:\nHeader set Access-Control-Allow-Origin "%{HTTP_ORIGIN}e"\nHeader set Access-Control-Allow-Credentials "true"`,
      exploitHint: "Specify a custom spoofed Origin header like `Origin: attacker.com` or `Origin: evil-attacker.local`.",
      expectedPattern: "origin"
    }
  };

  const knowledge = vulnerabilityKnowledgeMap[day.title] || {
    whatToLookFor: "Analyze request headers, body payloads, and dynamic parameter values for weak input sanitization or missing access control checks.",
    targetSnippet: `// Target Application Handler:\nif (req.headers['x-custom-auth']) {\n  grantAccess(req.body);\n}`,
    exploitHint: `Type your custom exploit vector (e.g., payload injection, header tamper, or fuzz string) targeting ${day.competency}.`,
    expectedPattern: "exploit"
  };

  const handleRunSimulation = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!userExploitPayload.trim()) {
      setVerificationMsg({
        text: "Please write or type your custom exploit vector in the payload box first.",
        isError: true
      });
      return;
    }

    setLoadingSim(true);
    setCapturedFlag("");
    setVerificationMsg({ text: "", isError: false });

    setSimulatorOutput([
      `[*] Initializing sandbox runtime environment on ${targetHost}...`,
      `[*] Intercepting outbound requests & parsing user payload vector:`,
      `    >>> ${userExploitPayload.trim()}`
    ]);

    const targetFlag = day.digitalArena.correctFlag;

    setTimeout(() => {
      setSimulatorOutput((prev) => [
        ...prev,
        `[*] Injected payload into application runtime memory state...`,
        `[*] Evaluating server response & state mutation...`
      ]);
    }, 600);

    setTimeout(() => {
      setSimulatorOutput((prev) => [
        ...prev,
        `[+] ATTACK VECTOR SUCCESSFUL! Vulnerability confirmed in sandbox container.`,
        `[+] CAPTURED FLAG: ${targetFlag}`
      ]);
      setCapturedFlag(targetFlag);
      setFlagInput(targetFlag); // Auto-fill into answer box for user convenience
      setLoadingSim(false);
    }, 1500);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagInput) return;
    const res = onVerifyFlag(flagInput);
    setVerificationMsg({
      text: res.message,
      isError: !res.success
    });
  };

  return (
    <div className="bg-hacker-card border border-hacker-border rounded-xl p-5 shadow-lg flex flex-col gap-6">

      {/* Header Bar */}
      <div className="flex justify-between items-center border-b border-hacker-border pb-3">
        <h3 className="font-bold text-white flex items-center gap-2 font-mono text-sm">
          <Terminal size={18} className="text-hacker-green animate-pulse" /> THE DIGITAL ARENA (SELF-CONTAINED LAB)
        </h3>
        <span className="text-xs bg-hacker-dark px-3 py-1 rounded-full border border-hacker-border text-hacker-amber font-mono">
          Host: {targetHost}
        </span>
      </div>

      {/* Target Source Code & Vulnerability Inspection Panel ("What to look for") */}
      <div className="bg-hacker-dark border border-hacker-border p-4 rounded-xl flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-hacker-amber font-mono">
          <Code2 size={16} /> WHAT TO LOOK FOR IN THE SOURCE CODE
        </div>
        <p className="text-xs text-gray-300 leading-relaxed font-sans">
          {knowledge.whatToLookFor}
        </p>

        {/* Vulnerable Code Snippet Display */}
        <div className="bg-black/80 border border-hacker-border/60 rounded-lg p-3 font-mono text-[11px]">
          <div className="text-hacker-muted text-[10px] border-b border-hacker-border/40 pb-1 mb-2 uppercase">
            // Target Code Inspection (Auditing Sandbox)
          </div>
          <pre className="text-hacker-green whitespace-pre-wrap font-mono">
            {knowledge.targetSnippet}
          </pre>
        </div>
      </div>

      {/* Exploit Crafting Input Workspace */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
            <Cpu size={15} className="text-hacker-amber" /> CRAFT & WRITE YOUR EXPLOIT PAYLOAD
          </div>
          <span className="text-[10px] text-hacker-muted font-mono">
            Hint: {knowledge.exploitHint}
          </span>
        </div>

        <form onSubmit={handleRunSimulation} className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={userExploitPayload}
              onChange={(e) => setUserExploitPayload(e.target.value)}
              placeholder="Write your exploit payload vector here... (e.g. __proto__.isAdmin=true)"
              className="flex-1 bg-hacker-dark border border-hacker-border rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-hacker-amber"
            />
            <button
              type="submit"
              disabled={loadingSim}
              className="bg-hacker-amber hover:bg-amber-400 text-black font-bold px-5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 shadow-md"
            >
              {loadingSim ? <RefreshCw className="animate-spin" size={14} /> : <Cpu size={14} />}
              Run Exploit
            </button>
          </div>
        </form>
      </div>

      {/* Local Shell Execution Output */}
      <div className="bg-black border border-hacker-border rounded-xl p-4 font-mono text-xs flex flex-col gap-2 min-h-[160px] max-h-[260px] overflow-y-auto">
        <div className="flex items-center justify-between text-[10px] text-hacker-muted border-b border-hacker-border/30 pb-1.5">
          <span className="flex items-center gap-1.5"><Terminal size={12} className="text-hacker-green" /> INTERACTIVE LOCAL SHELL</span>
          <span>ttyS001</span>
        </div>

        {simulatorOutput.length === 0 ? (
          <div className="text-hacker-muted italic py-4 text-center">
            Type your exploit payload in the box above and click "Run Exploit" to trigger execution...
          </div>
        ) : (
          simulatorOutput.map((logLine, idx) => {
            const isSuccess = logLine.includes("[+]");
            const isError = logLine.includes("[-]");
            return (
              <div
                key={idx}
                className={isSuccess ? "text-hacker-green font-bold" : isError ? "text-red-400 font-bold" : "text-gray-300"}
              >
                {logLine}
              </div>
            );
          })
        )}
      </div>

      {/* Answer & Captured Flag Results Panel */}
      {capturedFlag && (
        <div className="bg-hacker-dark/90 border border-hacker-green/50 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3 animate-fadeIn shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-hacker-green/10 border border-hacker-green/40 flex items-center justify-center shrink-0">
              <KeyRound size={18} className="text-hacker-green" />
            </div>
            <div>
              <div className="text-[10px] text-hacker-muted font-mono uppercase">EXPLOIT RESULT - CAPTURED FLAG</div>
              <div className="text-sm font-bold text-hacker-green font-mono tracking-wide">{capturedFlag}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFlagInput(capturedFlag)}
            className="bg-hacker-green/10 border border-hacker-green/40 hover:bg-hacker-green hover:text-black text-hacker-green text-xs font-mono font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shrink-0"
          >
            <Copy size={13} /> Copy to Submission Box
          </button>
        </div>
      )}

      {/* Answer Submission Form */}
      <form onSubmit={handleVerifySubmit} className="border-t border-hacker-border pt-4 flex flex-col gap-3">
        <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
          <ShieldAlert size={14} className="text-hacker-green" /> SUBMIT CAPTURED FLAG TO VERIFY CHALLENGE
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={flagInput}
            onChange={(e) => {
              setFlagInput(e.target.value);
              setVerificationMsg({ text: "", isError: false });
            }}
            placeholder={day.digitalArena.interactiveConsolePlaceholder}
            className="flex-1 bg-hacker-dark border border-hacker-border rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-hacker-green"
          />
          <button
            type="submit"
            className="bg-hacker-green hover:bg-emerald-400 text-black font-bold px-5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 shrink-0 shadow-md"
          >
            <CheckCircle2 size={14} /> Verify & Complete
          </button>
        </div>

        {verificationMsg.text && (
          <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
            verificationMsg.isError ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-hacker-green/10 border border-hacker-green/20 text-hacker-green"
          }`}>
            <AlertCircle size={14} />
            <span>{verificationMsg.text}</span>
          </div>
        )}
      </form>

    </div>
  );
};

export default InteractiveArena;
