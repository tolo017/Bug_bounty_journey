import React, { useState } from "react";
import { Users, BookOpen, ShieldCheck, Award, FileText, CheckCircle, X, Sparkles } from "lucide-react";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  isAdmin
}) => {
  if (!isOpen || !isAdmin) return null;

  // Retrieve stored profiles from localStorage to calculate student counts
  const savedProfilesJson = localStorage.getItem("bbm_user_profiles");
  const profiles = savedProfilesJson ? JSON.parse(savedProfilesJson) : [
    { id: "p1", username: "ShadowViper_0x", xp: 1250, streak: 5, level: 3 },
    { id: "p2", username: "CyberKnight_88", xp: 3400, streak: 12, level: 6 },
    { id: "p3", username: "ZeroDayHunter", xp: 8200, streak: 28, level: 12 }
  ];

  // Topics and Capstone Assignments List
  const topicAssignments = [
    { id: 1, topic: "Client-Side JS Deconstruction", title: "DOM & Prototype Chain Audit", status: "Evaluated", score: "98/100" },
    { id: 2, topic: "Secret Hunting & Recon", title: "Docker Layer Credential Parsing", status: "Evaluated", score: "95/100" },
    { id: 3, topic: "Advanced IDORs", title: "Multi-Tenant Authorization Escalation", status: "Pending Review", score: "In Review" },
    { id: 4, topic: "Broken Business Logic", title: "Transaction Workflow Collision Attack", status: "Pending Review", score: "In Review" },
    { id: 5, topic: "Session Management & JWT", title: "JWK Key Injection Forgery Analysis", status: "Assigned", score: "Not Submitted" },
    { id: 6, topic: "Advanced Subdomain & Port Recon", title: "Large Scale ASN & VHost Perimeter Scan", status: "Assigned", score: "Not Submitted" },
    { id: 7, topic: "API Reversing & Swagger", title: "BOLA REST Method Tampering Capstone", status: "Assigned", score: "Not Submitted" },
    { id: 8, topic: "Parameter Mining", title: "Cache Poisoning Parameter Audit", status: "Assigned", score: "Not Submitted" },
    { id: 9, topic: "Corporate VDP Reporting", title: "HackerOne Executive Report Review", status: "Assigned", score: "Not Submitted" },
    { id: 10, topic: "Network & Port Recon", title: "Nmap Firewall Evasion Matrix", status: "Assigned", score: "Not Submitted" },
    { id: 11, topic: "Cloud Infrastructure Security", title: "AWS IMDSv2 Token Bypass Assessment", status: "Assigned", score: "Not Submitted" },
    { id: 12, topic: "Advanced Chain Vulnerabilities", title: "Grandmaster LFI to RCE Chain Capstone", status: "Assigned", score: "Not Submitted" },
  ];

  const [activeTab, setActiveTab] = useState<"students" | "assignments">("students");

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-hacker-amber/50 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="bg-hacker-dark px-6 py-4 border-b border-hacker-border flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-hacker-amber/10 border border-hacker-amber/30 flex items-center justify-center">
              <ShieldCheck size={18} className="text-hacker-amber" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-mono tracking-wider">
                ADMINISTRATION & ACADEMY ANALYTICS
              </h2>
              <p className="text-[10px] text-hacker-muted font-mono uppercase">
                Secure Builder Portal & Enrolled Student Statistics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-hacker-dark border border-hacker-border hover:border-red-500/50 text-hacker-muted hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-hacker-border bg-black/40 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2.5 font-mono text-xs font-bold rounded-t-lg border-t border-x transition-all flex items-center gap-2 ${
              activeTab === "students"
                ? "bg-hacker-card border-hacker-amber/40 text-hacker-amber"
                : "border-transparent text-hacker-muted hover:text-white"
            }`}
          >
            <Users size={14} /> Enrolled Students ({profiles.length})
          </button>
          <button
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-2.5 font-mono text-xs font-bold rounded-t-lg border-t border-x transition-all flex items-center gap-2 ${
              activeTab === "assignments"
                ? "bg-hacker-card border-hacker-amber/40 text-hacker-amber"
                : "border-transparent text-hacker-muted hover:text-white"
            }`}
          >
            <FileText size={14} /> Topic Capstone Assignments ({topicAssignments.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">

          {/* Active Registered Students Tab */}
          {activeTab === "students" && (
            <div className="flex flex-col gap-5">

              {/* Overall Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-hacker-dark border border-hacker-border p-4 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                    <Users size={20} className="text-sky-400" />
                  </div>
                  <div>
                    <div className="text-xs text-hacker-muted font-mono uppercase">Total Registered Students</div>
                    <div className="text-xl font-bold font-mono text-white mt-0.5">{profiles.length} Active Learners</div>
                  </div>
                </div>

                <div className="bg-hacker-dark border border-hacker-border p-4 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-hacker-green/10 border border-hacker-green/30 flex items-center justify-center">
                    <Award size={20} className="text-hacker-green" />
                  </div>
                  <div>
                    <div className="text-xs text-hacker-muted font-mono uppercase">Academy XP Generated</div>
                    <div className="text-xl font-bold font-mono text-hacker-green mt-0.5">
                      {profiles.reduce((sum: number, p: any) => sum + (p.xp || 0), 0)} Total XP
                    </div>
                  </div>
                </div>

                <div className="bg-hacker-dark border border-hacker-border p-4 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-hacker-amber/10 border border-hacker-amber/30 flex items-center justify-center">
                    <Sparkles size={20} className="text-hacker-amber" />
                  </div>
                  <div>
                    <div className="text-xs text-hacker-muted font-mono uppercase">Active Study Streaks</div>
                    <div className="text-xl font-bold font-mono text-hacker-amber mt-0.5">
                      {Math.max(...profiles.map((p: any) => p.streak || 1), 1)} Days Max Streak
                    </div>
                  </div>
                </div>
              </div>

              {/* Registered Student Table */}
              <div className="bg-hacker-dark border border-hacker-border rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-black/60 border-b border-hacker-border text-xs font-mono font-bold text-hacker-muted uppercase tracking-wider flex justify-between">
                  <span>Student Handle / Identity</span>
                  <span>XP & Level</span>
                  <span>Study Streak</span>
                </div>
                <div className="divide-y divide-hacker-border/40">
                  {profiles.map((profile: any, idx: number) => (
                    <div key={idx} className="px-4 py-3 flex items-center justify-between font-mono text-xs text-white hover:bg-hacker-card/60 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-hacker-amber/20 border border-hacker-amber/40 flex items-center justify-center text-[10px] font-bold text-hacker-amber">
                          {profile.username?.charAt(0) || "U"}
                        </div>
                        <span className="font-bold">{profile.username || "Anonymous Learner"}</span>
                      </div>
                      <div className="text-sky-400">
                        {profile.xp || 0} XP (Level {profile.level || 1})
                      </div>
                      <div className="text-hacker-amber font-bold flex items-center gap-1">
                        🔥 {profile.streak || 1} Days
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Topic Capstone Assignments Tab */}
          {activeTab === "assignments" && (
            <div className="flex flex-col gap-4">
              <div className="text-xs text-hacker-muted font-mono leading-relaxed">
                Topic Capstone Assignments are evaluated at the conclusion of each 6-day curriculum module. Students complete these real-world auditing assessments before unlocking the next week's module.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {topicAssignments.map((assignment) => (
                  <div key={assignment.id} className="bg-hacker-dark border border-hacker-border/80 hover:border-hacker-amber/50 p-4 rounded-xl flex flex-col justify-between gap-3 transition-all">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-hacker-amber font-bold uppercase">
                        <span>Topic {assignment.id}: {assignment.topic}</span>
                        <span className={`px-2 py-0.5 rounded border ${
                          assignment.status === "Evaluated"
                            ? "bg-hacker-green/10 border-hacker-green/30 text-hacker-green"
                            : assignment.status === "Pending Review"
                            ? "bg-hacker-amber/10 border-hacker-amber/30 text-hacker-amber"
                            : "bg-hacker-card border-hacker-border text-hacker-muted"
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white font-mono mt-1">
                        {assignment.title}
                      </h4>
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-hacker-border/40">
                      <span className="text-hacker-muted">Grade Score:</span>
                      <span className="font-bold text-sky-400">{assignment.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-hacker-dark px-6 py-3.5 border-t border-hacker-border flex justify-between items-center text-xs font-mono">
          <span className="text-hacker-muted">
            Admin Session Verified • Credentials Protected
          </span>
          <button
            onClick={onClose}
            className="bg-hacker-amber hover:bg-amber-400 text-black font-bold px-5 py-1.5 rounded-lg transition-all"
          >
            Close Admin Portal
          </button>
        </div>

      </div>
    </div>
  );
};
