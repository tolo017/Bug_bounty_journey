import React, { useState, useEffect } from "react";
import { DayLesson } from "../types/curriculum";
import { Terminal, ShieldAlert, Cpu, Eye, ArrowRight, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

interface InteractiveArenaProps {
  day: DayLesson;
  onVerifyFlag: (flagInput: string) => { success: boolean; message: string };
}

export const InteractiveArena: React.FC<InteractiveArenaProps> = ({ day, onVerifyFlag }) => {
  const [flagInput, setFlagInput] = useState("");
  const [verificationMsg, setVerificationMsg] = useState({ text: "", isError: false });
  const [selectedExploitPayload, setSelectedExploitPayload] = useState("");
  const [simulatorOutput, setSimulatorOutput] = useState<string[]>([]);
  const [loadingSim, setLoadingSim] = useState(false);

  // Automatically populate suggested payload template on lesson change so execution is instant
  useEffect(() => {
    setSimulatorOutput([]);
    setFlagInput("");
    const initialPayload = activePayload?.payload || `<iframe name="config" srcdoc="<a id='apiEndpoint' href='javascript:alert(1)'></a>"></iframe>`;
    setSelectedExploitPayload(initialPayload);
    setVerificationMsg({ text: "", isError: false });
  }, [day.id, day.title]);

  // Simulated live environment details depending on the lesson content
  const targetHost = `secure-app-${day.dayName.toLowerCase()}.local`;

  // Default suggestions/payloads
  const payloadMap: Record<string, { desc: string; payload: string; log: string[]; flag: string }> = {
    "DOM Clobbering & Document Object Manipulation": {
      desc: "Override window.config.apiEndpoint via clobbered iframe id.",
      payload: `<iframe name="config" srcdoc="<a id='apiEndpoint' href='javascript:alert(1)'></a>"></iframe>`,
      log: [
        "[*] Intercepted load configurations...",
        "[*] Clobbered property detected: window.config.apiEndpoint",
        "[*] Payload triggered dynamically: JS payload executed on sandbox container.",
        "[+] SENSITIVE API KEY EXTRACTED FROM SESSION BUFFER"
      ],
      flag: "FLAG{MONDAY_CLIENT_SIDE_SECURITY_SUCCESS}"
    },
    "Client-Side Prototype Pollution in Wild JS Files": {
      desc: "Pollute Object.prototype with transport parameter bypass keys.",
      payload: `__proto__.isAdmin = true`,
      log: [
        "[*] Parsing query parameters: ?__proto__.isAdmin=true",
        "[*] WARNING: Base Object prototype polluted successfully.",
        "[*] Validating session authority state...",
        "[+] Bypass authorization criteria met. Administrative privileges active!"
      ],
      flag: "FLAG{TUESDAY_CLIENT_SIDE_SECURITY_SUCCESS}"
    },
    "Source Map Reconstruction & JS Deobfuscation": {
      desc: "Recompile unpacked client map sources and extract API signatures.",
      payload: `npx restore-source-map main.js.map`,
      log: [
        "[*] Pulling map indexes from /static/js/",
        "[*] Found mapping file: main.js.map. Restoring source nodes...",
        "[*] Function extracted: verifySessionAdmin(key, secret)",
        "[+] Revealed secret signature credential in core assembly!"
      ],
      flag: "FLAG{WEDNESDAY_CLIENT_SIDE_SECURITY_SUCCESS}"
    },
    "Client-Side Storage Abuse (XSS via LocalStorage)": {
      desc: "Inject persistent storage item payload.",
      payload: `<img src=x onerror="localStorage.setItem('leak', localStorage.getItem('token'))">`,
      log: [
        "[*] Render context: Storage buffer loaded into body view.",
        "[*] Dynamic XSS payload parsed.",
        "[+] Token captured and stored in leak registry!"
      ],
      flag: "FLAG{THURSDAY_CLIENT_SIDE_SECURITY_SUCCESS}"
    },
    "WebSocket Message Manipulation & Race Conditions": {
      desc: "Trigger high-velocity token updates via socket channels.",
      payload: `{"action": "update_balance", "amount": 1000, "race": true}`,
      log: [
        "[*] Opening socket channel connection...",
        "[*] Spamming concurrent payload threads (x100 requests)...",
        "[+] Thread collision successful! State variable updated twice before lock validation."
      ],
      flag: "FLAG{FRIDAY_CLIENT_SIDE_SECURITY_SUCCESS}"
    },
    "CORS Misconfigurations & Origin Reflection": {
      desc: "Spoof Origin headers to bypass reflection restrictions.",
      payload: `Origin: evil-attacker.com`,
      log: [
        "[*] Intercepting POST request to /api/auth/v1/profile",
        "[*] Header applied: Origin: evil-attacker.com",
        "[*] Server reflected: Access-Control-Allow-Origin: evil-attacker.com",
        "[+] Direct cross-origin request succeeded! Session token exposed."
      ],
      flag: "FLAG{SATURDAY_CLIENT_SIDE_SECURITY_SUCCESS}"
    }
  };

  const activePayload = (day && payloadMap[day.title]) ? payloadMap[day.title] : {
    desc: "Default payload scanner configuration.",
    payload: `{"exploit": "fuzz_payload_0x", "target": "${day?.digitalArena?.correctFlag || 'FLAG_DEFAULT'}"}`,
    log: [
      "[*] Targeting host...",
      "[*] Query variables parsed successfully.",
      "[*] Analyzing authentication endpoints and parameter structures...",
      "[+] Session trace parsed successfully. Payload logic matches."
    ],
    flag: day?.digitalArena?.correctFlag || "FLAG_DEFAULT"
  };

  const handleRunSimulation = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const payloadToRun = selectedExploitPayload.trim() || activePayload.payload;
    if (!selectedExploitPayload) {
      setSelectedExploitPayload(payloadToRun);
    }

    setLoadingSim(true);
    setSimulatorOutput([
      `[*] Connecting to local container sandbox target (${targetHost})...`,
      `[*] Injecting exploit payload vector: ${payloadToRun}`
    ]);

    let counter = 0;
    const logs = activePayload.log || [];
    const flag = activePayload.flag || day?.digitalArena?.correctFlag || "FLAG_DEFAULT";

    const interval = setInterval(() => {
      if (counter < logs.length) {
        setSimulatorOutput((prev) => [...prev, logs[counter]]);
        counter++;
      } else {
        clearInterval(interval);
        setSimulatorOutput((prev) => [
          ...prev,
          `[+] EXPLOIT EXECUTED SUCCESSFULLY!`,
          `[+] CAPTURED SYSTEM FLAG: ${flag}`
        ]);
        setLoadingSim(false);
        // Autopopulate flag input box directly so the user can verify immediately
        setFlagInput(flag);
      }
    }, 350);
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
    <div className="bg-hacker-card border border-hacker-border rounded-xl p-5 shadow-lg flex flex-col gap-5">
      <div className="flex justify-between items-center border-b border-hacker-border pb-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Terminal size={18} className="text-hacker-green animate-pulse" /> THE DIGITAL ARENA SIMULATOR
        </h3>
        <span className="text-xs bg-hacker-dark px-2.5 py-1 rounded-full border border-hacker-border text-hacker-muted">
          Host: <span className="text-hacker-amber font-mono">{targetHost}</span>
        </span>
      </div>

      {/* External Lab Direct Action */}
      <div className="bg-hacker-dark border border-hacker-border p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="text-xs text-hacker-muted font-mono uppercase">External Real-World Practice</div>
          <p className="text-sm font-bold text-white mt-0.5">Explore PortSwigger Web Academy Arena</p>
        </div>
        <a
          href={day.digitalArena.labLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-hacker-green hover:bg-emerald-400 text-black font-bold px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all shadow-md"
        >
          <span>Launch Remote Lab</span> <ArrowRight size={14} />
        </a>
      </div>

      {/* Lab Simulation Workspace */}
      <div className="flex flex-col gap-3">
        <div className="text-xs font-bold text-hacker-amber tracking-wider font-mono">
          HANDS-ON PEN-TESTING SIMULATION
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Select or custom-build your exploitation vector based on the developer's mindset weakness. Execute the script payload to compromise the local container sandbox and retrieve the flag.
        </p>

        {/* Payload builder input helper */}
        <div className="bg-hacker-dark p-3 rounded-lg border border-hacker-border flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] text-hacker-muted font-mono">TARGET WEAKNESS PAYLOAD MATCH</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSelectedExploitPayload(activePayload.payload);
              }}
              className="text-[10px] text-hacker-amber hover:text-white font-mono flex items-center gap-1"
            >
              <Sparkles size={11} /> [Load Exploit Vector Template]
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedExploitPayload}
              onChange={(e) => setSelectedExploitPayload(e.target.value)}
              placeholder="e.g. __proto__.polluted = true"
              className="flex-1 bg-hacker-card border border-hacker-border rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-hacker-amber"
            />
            <button
              type="button"
              onClick={(e) => handleRunSimulation(e)}
              disabled={loadingSim || !selectedExploitPayload}
              className="bg-hacker-amber hover:bg-amber-400 text-black font-bold px-4 rounded text-xs font-mono transition-all flex items-center gap-1 shrink-0"
            >
              {loadingSim ? <RefreshCw className="animate-spin" size={12} /> : <Cpu size={12} />}
              Run Exploit
            </button>
          </div>
          <div className="text-[10px] text-hacker-muted leading-relaxed">
            <span className="text-hacker-amber font-semibold">Suggested Payload Pattern:</span> {activePayload.desc}
          </div>
        </div>

        {/* Simulated Interactive Shell Terminal Output */}
        <div className="bg-black border border-hacker-border rounded-lg p-3 min-h-[150px] font-mono text-xs flex flex-col gap-1 overflow-y-auto max-h-[220px]">
          <div className="flex items-center justify-between text-[10px] text-hacker-muted border-b border-hacker-border/30 pb-1 mb-2">
            <span className="flex items-center gap-1"><Terminal size={11} /> RUNTIME SHELL INTERACTION</span>
            <span>ttyS001</span>
          </div>
          {simulatorOutput.length === 0 ? (
            <span className="text-hacker-muted italic">Waiting to execute exploit run...</span>
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
      </div>

      {/* Flag submission form */}
      <form onSubmit={handleVerifySubmit} className="border-t border-hacker-border pt-4 mt-1 flex flex-col gap-3">
        <div className="text-xs font-mono text-hacker-muted">VERIFY COMPLETED LAB CHALLENGE</div>
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
            className="bg-hacker-green hover:bg-emerald-400 text-black font-bold px-5 rounded-lg text-xs font-mono transition-all flex items-center gap-1"
          >
            <ShieldAlert size={14} /> Verify & Complete
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
