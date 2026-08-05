import React, { useState } from "react";
import { GitHubSettings } from "../hooks/useLMSState";
import { Github, Settings, CheckCircle2, AlertCircle, Share2, Copy, ArrowUpRight, Terminal, RefreshCw } from "lucide-react";

interface SocialIntegratorProps {
  lessonTitle: string;
  scriptContent: string;
  gitHubSettings: GitHubSettings;
  onUpdateGitHub: (updater: Partial<GitHubSettings>) => void;
  onMarkCommitted: () => void;
}

export const SocialIntegrator: React.FC<SocialIntegratorProps> = ({
  lessonTitle,
  scriptContent,
  gitHubSettings,
  onUpdateGitHub,
  onMarkCommitted
}) => {
  const [showConfig, setShowConfig] = useState(!gitHubSettings.token);
  const [patInput, setPatInput] = useState(gitHubSettings.token);
  const [usernameInput, setUsernameInput] = useState(gitHubSettings.username);
  const [repoInput, setRepoInput] = useState(gitHubSettings.repo);

  // Status & Logs
  const [actionStatus, setActionStatus] = useState({ text: "", isError: false });
  const [isProcessing, setIsProcessing] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Open Modal/Public Ledger Details
  const [showLedgerModal, setShowLedgerModal] = useState(false);

  // Markdown Summary
  const mdSummary = `### 🎯 Bug Bounty Mastery - Daily Vulnerability Summary\n` +
    `- **Lesson:** ${lessonTitle}\n` +
    `- **Automation Target:** Code vulnerability exploits on localized microservices\n\n` +
    `#### 🛠️ Automation Script Snippet:\n` +
    `\`\`\`python\n` +
    `${scriptContent}\n` +
    `\`\`\`\n\n` +
    `*Generated via the interactive Bug Bounty Mastery LMS. Battle-tested, production-ready.*`;

  const handleSaveSettings = () => {
    onUpdateGitHub({
      token: patInput.trim(),
      username: usernameInput.trim(),
      repo: repoInput.trim()
    });
    setShowConfig(false);
    setActionStatus({ text: "GitHub authentication details synchronized locally.", isError: false });
  };

  const addLog = (log: string) => {
    setTerminalLogs((prev) => [...prev, log]);
  };

  // Real GitHub API Integration
  const handlePushToGitHub = async () => {
    if (!gitHubSettings.token || !gitHubSettings.username || !gitHubSettings.repo) {
      setShowConfig(true);
      setActionStatus({ text: "Please enter your GitHub credentials first.", isError: true });
      return;
    }

    setIsProcessing(true);
    setTerminalLogs(["[*] Connecting to GitHub REST API..."]);

    const path = `scripts/${lessonTitle.replace(/[\s&()\-]/g, "-").toLowerCase()}.py`;
    const message = `docs: push automation script for ${lessonTitle} via Bug Bounty Mastery`;
    const contentEncoded = btoa(unescape(encodeURIComponent(scriptContent)));

    try {
      // 1. Check if repo exists
      addLog(`[*] Verifying repository status: ${gitHubSettings.username}/${gitHubSettings.repo}`);
      const repoRes = await fetch(`https://api.github.com/repos/${gitHubSettings.username}/${gitHubSettings.repo}`, {
        headers: {
          Authorization: `token ${gitHubSettings.token}`,
          Accept: "application/vnd.github.v3+json"
        }
      });

      if (repoRes.status === 404) {
        addLog(`[!] Repository not found. Attempting to create: ${gitHubSettings.repo}`);
        const createRes = await fetch(`https://api.github.com/user/repos`, {
          method: "POST",
          headers: {
            Authorization: `token ${gitHubSettings.token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
          },
          body: JSON.stringify({
            name: gitHubSettings.repo,
            private: false,
            description: "Automated cybersecurity scripts engineered in Bug Bounty Mastery LMS"
          })
        });

        if (createRes.status === 201) {
          addLog(`[+] Successfully created public repository: ${gitHubSettings.repo}`);
        } else {
          throw new Error("Failed to create repository automatically.");
        }
      } else {
        addLog(`[+] Validated active repository: ${gitHubSettings.repo}`);
      }

      // 2. Try fetching existing file to get SHA (needed for file updates in GitHub REST API)
      addLog(`[*] Checking for existing files on path: ${path}`);
      let fileSha = "";
      const fileRes = await fetch(`https://api.github.com/repos/${gitHubSettings.username}/${gitHubSettings.repo}/contents/${path}`, {
        headers: {
          Authorization: `token ${gitHubSettings.token}`,
          Accept: "application/vnd.github.v3+json"
        }
      });

      if (fileRes.status === 200) {
        const fileData = await fileRes.json();
        fileSha = fileData.sha;
        addLog(`[*] Found existing asset. Preparing revision push... (sha: ${fileSha.slice(0, 8)})`);
      } else {
        addLog(`[*] No existing file on path. Preparing initial commit...`);
      }

      // 3. Write/Update file content
      const pushRes = await fetch(`https://api.github.com/repos/${gitHubSettings.username}/${gitHubSettings.repo}/contents/${path}`, {
        method: "PUT",
        headers: {
          Authorization: `token ${gitHubSettings.token}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json"
        },
        body: JSON.stringify({
          message,
          content: contentEncoded,
          sha: fileSha || undefined
        })
      });

      if (pushRes.status === 200 || pushRes.status === 201) {
        addLog(`[+] CODE COMMITTED SUCCESSFULLY!`);
        addLog(`[+] Terminal: git add ${path}`);
        addLog(`[+] Terminal: git commit -m "${message}"`);
        addLog(`[+] Terminal: git push origin main`);
        setActionStatus({ text: `Exploit code pushed successfully to ${gitHubSettings.repo}!`, isError: false });
        onMarkCommitted();
      } else {
        const errData = await pushRes.json();
        throw new Error(errData.message || "Push failed.");
      }

    } catch (err: any) {
      addLog(`[-] Error: ${err.message || err}`);
      setActionStatus({ text: `GitHub Connection failed: ${err.message || err}`, isError: true });
    } finally {
      setIsProcessing(false);
    }
  };

  // LinkedIn Sharing URL
  const handleLinkedInShare = () => {
    const postText = `🚀 Bug Bounty Mastery speedrun! I just completed the advanced challenge: "${lessonTitle}". Automated the exploit payload and committed my script straight to GitHub! \n\nLearning with elite standard simulations on Client-Side, IDORs, and VDP audits. \n#bugbounty #hacking #cybersecurity #learning`;
    navigator.clipboard.writeText(postText);

    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://github.com/" + (gitHubSettings.username || "tolo017") + "/" + (gitHubSettings.repo || "bug-bounty-mastery-scripts"))}`;
    window.open(url, "_blank");

    setActionStatus({ text: "Catchy post content copied to clipboard! Opening LinkedIn share interface...", isError: false });
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(mdSummary);
    setActionStatus({ text: "Markdown summary copied to clipboard!", isError: false });
  };

  return (
    <div className="bg-hacker-card border border-hacker-border rounded-xl p-5 shadow-lg flex flex-col gap-4">

      {/* Title */}
      <div className="flex justify-between items-center border-b border-hacker-border pb-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Github size={18} className="text-white" /> AUTOMATION & PUBLIC LEDGER
        </h3>
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="text-xs text-hacker-muted hover:text-hacker-amber flex items-center gap-1 font-mono"
        >
          <Settings size={13} /> [Configure GitHub Credentials]
        </button>
      </div>

      {/* GitHub Setup Card */}
      {showConfig && (
        <div className="bg-hacker-dark border border-hacker-border/70 p-4 rounded-lg flex flex-col gap-3">
          <div className="text-xs font-mono font-bold text-hacker-amber">GITHUB SECURE CONNECTION (LOCAL STORAGE ONLY)</div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-hacker-muted font-mono uppercase">Personal Access Token</label>
              <input
                type="password"
                value={patInput}
                onChange={(e) => setPatInput(e.target.value)}
                placeholder="ghp_..."
                className="bg-hacker-card border border-hacker-border rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-hacker-amber"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-hacker-muted font-mono uppercase">GitHub Username</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="octocat"
                className="bg-hacker-card border border-hacker-border rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-hacker-amber"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-hacker-muted font-mono uppercase">Repository Name</label>
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="bug-bounty-mastery-scripts"
                className="bg-hacker-card border border-hacker-border rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-hacker-amber"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-1">
            <p className="text-[9px] text-hacker-muted max-w-[70%]">
              Tokens are never transmitted to outside trackers. They are stored entirely locally on your sandbox environment to directly query GitHub API.
            </p>
            <button
              onClick={handleSaveSettings}
              className="bg-hacker-amber hover:bg-amber-400 text-black font-bold px-4 py-1.5 rounded text-xs font-mono transition-all"
            >
              Sync Connection
            </button>
          </div>
        </div>
      )}

      {/* Primary Integration Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setShowLedgerModal(true)}
          className="flex-1 bg-hacker-dark hover:bg-hacker-border border border-hacker-border text-white hover:text-hacker-green font-bold py-2.5 rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Share2 size={14} className="text-hacker-green" /> Publish to Public Ledger
        </button>

        <button
          onClick={handlePushToGitHub}
          disabled={isProcessing}
          className="bg-white hover:bg-gray-100 text-black font-bold px-6 py-2.5 rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
        >
          {isProcessing ? <RefreshCw className="animate-spin" size={14} /> : <Github size={14} />}
          Push Exploit Script to GitHub
        </button>
      </div>

      {actionStatus.text && (
        <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
          actionStatus.isError ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-hacker-green/10 border border-hacker-green/20 text-hacker-green"
        }`}>
          {actionStatus.isError ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
          <span>{actionStatus.text}</span>
        </div>
      )}

      {/* Modal displaying Markdown summary and Dual Share targets */}
      {showLedgerModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-hacker-card border border-hacker-border w-full max-w-2xl rounded-xl p-6 flex flex-col gap-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-hacker-border pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="text-hacker-green" size={18} />
                <h3 className="font-bold text-white text-sm font-mono">AI-GENERATED PUBLIC LEDGER</h3>
              </div>
              <button
                onClick={() => {
                  setShowLedgerModal(false);
                  setTerminalLogs([]);
                }}
                className="text-xs text-hacker-muted hover:text-white"
              >
                [ESC Close]
              </button>
            </div>

            {/* Markdown Summary block */}
            <div className="bg-hacker-dark border border-hacker-border rounded-lg p-4 max-h-[220px] overflow-y-auto font-sans text-xs flex flex-col gap-3">
              <pre className="font-mono text-[11px] text-gray-300 leading-relaxed whitespace-pre-wrap">
                {mdSummary}
              </pre>
            </div>

            {/* Simulated Live Terminal */}
            {terminalLogs.length > 0 && (
              <div className="bg-black border border-hacker-border rounded-lg p-3 max-h-[120px] overflow-y-auto font-mono text-[10px]">
                {terminalLogs.map((log, i) => (
                  <div key={i} className={log.includes("[+]") ? "text-hacker-green" : log.includes("[-]") ? "text-red-400" : "text-gray-400"}>
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Dual Actions Inside Ledger Modal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-hacker-border pt-4">
              <button
                onClick={handleCopyMarkdown}
                className="bg-hacker-dark hover:bg-hacker-border border border-hacker-border text-white text-xs font-mono py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <Copy size={13} /> Copy Markdown
              </button>

              <button
                onClick={handlePushToGitHub}
                disabled={isProcessing}
                className="bg-white hover:bg-gray-100 text-black text-xs font-mono py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <Github size={13} /> Push to GitHub Repo
              </button>

              <button
                onClick={handleLinkedInShare}
                className="bg-[#0077b5] hover:bg-[#006295] text-white text-xs font-mono py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <ArrowUpRight size={13} /> Post to LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default SocialIntegrator;
