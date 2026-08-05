import React, { useState } from "react";
import { BossLab } from "../types/curriculum";
import { Terminal, ShieldAlert, FileText, CheckCircle2, ChevronRight, Activity, Globe, Send, Loader } from "lucide-react";

interface BossLabSimulatorProps {
  bossLab: BossLab;
  onVerifyBossFlag: (flagInput: string) => { success: boolean; message: string };
  onSubmitReport: (
    title: string,
    severity: "Low" | "Medium" | "High" | "Critical",
    description: string,
    remediation: string
  ) => { success: boolean; message: string };
}

export const BossLabSimulator: React.FC<BossLabSimulatorProps> = ({
  bossLab,
  onVerifyBossFlag,
  onSubmitReport
}) => {
  const [flagInput, setFlagInput] = useState("");
  const [flagMessage, setFlagMessage] = useState({ text: "", isError: false });

  // Report Form State
  const [reportTitle, setReportTitle] = useState(bossLab.vdpReport.title || `VDP-Report: ${bossLab.title}`);
  const [reportSeverity, setReportSeverity] = useState<"Low" | "Medium" | "High" | "Critical">(
    bossLab.vdpReport.severity || "Critical"
  );
  const [reportDescription, setReportDescription] = useState(bossLab.vdpReport.description || "");
  const [reportRemediation, setReportRemediation] = useState(bossLab.vdpReport.remediation || "");
  const [reportMessage, setReportMessage] = useState("");

  const [simOutput, setSimOutput] = useState<string[]>([]);
  const [isRunningExploit, setIsRunningExploit] = useState(false);

  const handleLaunchBossExploit = () => {
    setIsRunningExploit(true);
    setSimOutput(["[*] Deploying advanced attack suite..."]);

    setTimeout(() => {
      setSimOutput(prev => [
        ...prev,
        "[*] Scanning target ports...",
        "[*] Port 8443 (HTTPS) identified as active gateway.",
        "[*] Analyzing server HTTP headers... Found outdated security middleware."
      ]);
    }, 500);

    setTimeout(() => {
      setSimOutput(prev => [
        ...prev,
        "[*] Initiating prototype injection payload parameter parsing...",
        "[*] Bypassing secondary server routing barriers using HTTP Parameter Pollution (HPP)...",
        "[+] SERVER STATE CRITICAL COMPROMISE: Object space polluted."
      ]);
    }, 1200);

    setTimeout(() => {
      setSimOutput(prev => [
        ...prev,
        "[*] Leaking configuration data via unauthenticated environment queries...",
        `[+] ATTACK CHAIN COMPLETED SUCCESSFULLY!`,
        `[+] FLAG RECOVERED: ${bossLab.correctFlag}`
      ]);
      setIsRunningExploit(false);
      setFlagInput(bossLab.correctFlag);
    }, 2200);
  };

  const handleVerifyFlag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagInput) return;
    const res = onVerifyBossFlag(flagInput);
    setFlagMessage({
      text: res.message,
      isError: !res.success
    });
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bossLab.flagVerified) {
      setReportMessage("Error: You must compromise the target system and verify the Boss Flag first.");
      return;
    }
    if (!reportDescription.trim() || !reportRemediation.trim()) {
      setReportMessage("Please provide detailed executive descriptions and remediation steps before submitting.");
      return;
    }

    const res = onSubmitReport(reportTitle, reportSeverity, reportDescription, reportRemediation);
    setReportMessage(res.message);
  };

  return (
    <div className="bg-hacker-card border border-hacker-border rounded-xl p-6 shadow-xl flex flex-col gap-6">

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-hacker-border pb-4 gap-4">
        <div>
          <span className="text-xs bg-red-500/10 text-red-500 px-3 py-1 rounded-full font-mono font-bold tracking-widest border border-red-500/20 uppercase">
            Boss Lab Level {bossLab.weekIndex + 1}
          </span>
          <h2 className="text-xl font-bold text-white mt-2 font-mono">{bossLab.title}</h2>
        </div>
        <div className="text-xs text-hacker-muted bg-hacker-dark px-3 py-1.5 rounded border border-hacker-border font-mono leading-relaxed">
          <span className="text-hacker-green">SYSTEM AUDITING ENVIROMENT ACTIVE</span>
        </div>
      </div>

      {/* Lab Scenario and Target Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-hacker-dark border border-hacker-border p-4 rounded-lg flex flex-col gap-2">
          <div className="text-xs text-hacker-amber font-mono font-bold">MISSION OBJECTIVE & SCENARIO</div>
          <p className="text-xs text-gray-300 leading-relaxed">{bossLab.scenario}</p>
        </div>
        <div className="bg-hacker-dark border border-hacker-border p-4 rounded-lg flex flex-col gap-2 justify-between">
          <div>
            <div className="text-xs text-hacker-amber font-mono font-bold">TARGET ENVIRONMENT ARCHITECTURE</div>
            <pre className="text-[10px] text-hacker-green font-mono mt-1 leading-normal whitespace-pre-wrap">
              {bossLab.targetEnvironmentDescription}
            </pre>
          </div>
          <div className="text-[11px] text-hacker-muted">
            <span className="text-red-500 font-bold">⚠️ Warning:</span> This simulation represents an authentic corporate microservice cluster.
          </div>
        </div>
      </div>

      {/* Simulated Terminal and Target Exploit button */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
            <Activity size={14} className="text-red-500" /> SYSTEM ATTACK TERMINAL
          </span>
          <button
            onClick={handleLaunchBossExploit}
            disabled={isRunningExploit}
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-2 shadow-md"
          >
            {isRunningExploit ? (
              <>
                <Loader className="animate-spin" size={13} /> Injecting Exploit...
              </>
            ) : (
              <>
                <Globe size={13} /> Compromise Server Sandbox
              </>
            )}
          </button>
        </div>

        <div className="bg-black border border-hacker-border rounded-lg p-3 min-h-[160px] font-mono text-xs flex flex-col gap-1.5 overflow-y-auto max-h-[250px]">
          {simOutput.length === 0 ? (
            <span className="text-hacker-muted italic">Click 'Compromise Server Sandbox' to begin the complex vulnerability exploitation process...</span>
          ) : (
            simOutput.map((out, idx) => {
              const isSuccess = out.includes("[+]");
              return (
                <div key={idx} className={isSuccess ? "text-hacker-green" : "text-gray-300"}>
                  {out}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Verify Flag */}
      <div className="bg-hacker-dark/50 border border-hacker-border rounded-xl p-5">
        <form onSubmit={handleVerifyFlag} className="flex flex-col gap-3">
          <div className="text-xs font-bold text-hacker-amber font-mono">SUBMIT EXTRACTED FLAG TO UNLOCK DOCUMENTATION PHASE</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={flagInput}
              onChange={(e) => {
                setFlagInput(e.target.value);
                setFlagMessage({ text: "", isError: false });
              }}
              placeholder="e.g. FLAG{...}"
              className="flex-1 bg-hacker-dark border border-hacker-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-hacker-green"
            />
            <button
              type="submit"
              className="bg-hacker-green hover:bg-emerald-400 text-black font-bold px-5 rounded text-xs font-mono transition-all flex items-center gap-1 shrink-0"
            >
              <ShieldAlert size={14} /> Verify Boss Flag
            </button>
          </div>
          {flagMessage.text && (
            <div className={`p-2.5 rounded text-xs flex items-center gap-2 ${
              flagMessage.isError ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-hacker-green/10 border border-hacker-green/20 text-hacker-green"
            }`}>
              <CheckCircle2 size={14} />
              <span>{flagMessage.text}</span>
            </div>
          )}
        </form>
      </div>

      {/* Corporate Reporting Section */}
      <div className="border-t border-hacker-border pt-6 mt-2">
        <h3 className="font-bold text-white flex items-center gap-2 text-md mb-4 font-mono">
          <FileText size={18} className="text-sky-400" /> CORPORATE VULNERABILITY REPORT (VDP)
        </h3>

        {!bossLab.flagVerified ? (
          <div className="bg-hacker-dark border border-hacker-border/70 p-5 rounded-lg text-center text-xs text-hacker-muted leading-relaxed">
            🔓 Compromise target sandbox and verify the Boss Flag above to unlock reporting documentation steps and finalize the weekly challenge.
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs text-hacker-muted font-mono uppercase">Vulnerability Report Title</label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="bg-hacker-dark border border-hacker-border rounded p-2 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-hacker-amber"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-hacker-muted font-mono uppercase">Vulnerability Severity</label>
                <select
                  value={reportSeverity}
                  onChange={(e) => setReportSeverity(e.target.value as any)}
                  className="bg-hacker-dark border border-hacker-border rounded p-2 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-hacker-amber"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-hacker-muted font-mono uppercase">Vulnerability Technical Description</label>
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder="Describe how the attack vector functions, the developer's architectural errors, and the technical impact on organizational systems."
                rows={5}
                className="bg-hacker-dark border border-hacker-border rounded p-3 text-xs text-white font-sans leading-relaxed focus:outline-none focus:ring-1 focus:ring-hacker-amber"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-hacker-muted font-mono uppercase">Corporate Enterprise Remediation Guide</label>
              <textarea
                value={reportRemediation}
                onChange={(e) => setReportRemediation(e.target.value)}
                placeholder="Step-by-step developer guidelines on how to secure code logic. Recommend safe cryptographic parameters, framework configurations, or libraries."
                rows={4}
                className="bg-hacker-dark border border-hacker-border rounded p-3 text-xs text-white font-sans leading-relaxed focus:outline-none focus:ring-1 focus:ring-hacker-amber"
                required
              />
            </div>

            <div className="flex justify-end gap-3 items-center">
              {reportMessage && (
                <span className="text-xs text-hacker-green font-mono">{reportMessage}</span>
              )}
              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-400 text-black font-bold px-6 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 shadow-md"
              >
                <Send size={13} /> Submit VDP Report & Complete Week
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
export default BossLabSimulator;
