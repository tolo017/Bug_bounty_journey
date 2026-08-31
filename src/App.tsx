import React, { useState } from "react";
import { useLMSState } from "./hooks/useLMSState";
import { Sidebar } from "./components/Sidebar";
import { ProfilePanel } from "./components/ProfilePanel";
import { JobReadinessPanel } from "./components/JobReadinessPanel";
import { InteractiveArena } from "./components/InteractiveArena";
import { MonetizationModal } from "./components/MonetizationModal";
import { PaymentCheckoutModal } from "./components/PaymentCheckoutModal";
import { ProgramDirectory } from "./components/ProgramDirectory";
import { BossLabSimulator } from "./components/BossLabSimulator";
import { SocialIntegrator } from "./components/SocialIntegrator";
import {
  ShieldAlert, BookOpen, Cpu, FileText, ChevronRight, RefreshCw, Sparkles, Terminal, Info
} from "lucide-react";
import confetti from "canvas-confetti";

function App() {
  const {
    weeks,
    stats,
    gitHubSettings,
    selectedWeekIndex,
    selectedDayId,
    viewingBossLab,
    access,
    setSelectedWeekIndex,
    setSelectedDayId,
    setViewingBossLab,
    updateStats,
    updateGitHubSettings,
    handleVerifyDayFlag,
    handleToggleChecklist,
    handleMarkAsCommitted,
    handleVerifyBossFlag,
    handleSubmitVDPReport,
    handleUnlockPayment,
    handleToggleAdminAccess,
    handleResetProgress,
    getJobReadinessStats,
  } = useLMSState();

  const currentWeek = weeks[selectedWeekIndex];
  const currentDay = currentWeek?.days.find((d) => d.id === selectedDayId) || currentWeek?.days[0];
  const bossLab = currentWeek?.bossLab;

  // Track active sub-section tab inside Lesson page
  const [activeTab, setActiveTab] = useState<"theory" | "arena" | "automation">("theory");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Job readiness scores
  const readiness = getJobReadinessStats();

  const handleDaySelect = (dayId: string) => {
    setSelectedDayId(dayId);
    setViewingBossLab(false);
    setActiveTab("theory");
  };

  const handleBossLabSelect = () => {
    setViewingBossLab(true);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#10b981", "#f59e0b", "#3b82f6"]
    });
  };

  return (
    <div className="min-h-screen bg-hacker-dark text-gray-100 font-sans pb-12">

      {/* Header Bar */}
      <header className="border-b border-hacker-border bg-hacker-dark/95 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-hacker-green/10 border border-hacker-green/30 flex items-center justify-center">
            <ShieldAlert size={20} className="text-hacker-green animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wider font-mono">BUG BOUNTY MASTERY</h1>
            <p className="text-[10px] text-hacker-muted font-mono uppercase tracking-widest mt-0.5">3-Month Cybersecurity LMS Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset your LMS progress? This clears local state.")) {
                handleResetProgress();
              }
            }}
            className="text-[11px] hover:text-red-400 text-hacker-muted font-mono border border-hacker-border hover:border-red-500/30 px-3 py-1.5 rounded transition-all bg-hacker-dark"
          >
            Reset Progress
          </button>

          <span className="text-xs bg-hacker-card border border-hacker-amber/40 px-3 py-1.5 rounded font-mono text-hacker-amber font-bold flex items-center gap-1.5">
            <Sparkles size={13} /> {access.isPaid || access.isAdmin ? "PRO LICENSE ACTIVE" : `4-DAY TRIAL (${access.trialDaysLeft} DAYS LEFT)`}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-6 flex flex-col gap-6">

        {/* Trial & Monetization Banner / Modal */}
        <MonetizationModal
          access={access}
          onOpenCheckout={() => setShowCheckoutModal(true)}
          onToggleAdminAccess={handleToggleAdminAccess}
        />

        {/* Dedicated Payment Checkout Screen Modal */}
        <PaymentCheckoutModal
          access={access}
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          onUnlockPayment={handleUnlockPayment}
          onToggleAdminAccess={handleToggleAdminAccess}
        />

        {/* Profile Details RPG panel */}
        <ProfilePanel stats={stats} onUpdateStats={updateStats} />

        {/* Dynamic Job Readiness Metrics Panel */}
        <JobReadinessPanel
          score={readiness.score}
          practical={readiness.practical}
          commits={readiness.commits}
          reports={readiness.reports}
          competencies={readiness.competencies}
        />

        {/* Bug Bounty Freelance Opportunities Directory */}
        <ProgramDirectory />

        {/* Workspace and Syllabus Grid */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Syllabus Navigation Sidebar */}
          <Sidebar
            weeks={weeks}
            selectedWeekIndex={selectedWeekIndex}
            selectedDayId={selectedDayId}
            viewingBossLab={viewingBossLab}
            onSelectWeek={(idx) => {
              setSelectedWeekIndex(idx);
              setViewingBossLab(false);
              const firstDayId = weeks[idx].days[0].id;
              setSelectedDayId(firstDayId);
            }}
            onSelectDay={handleDaySelect}
            onSelectBossLab={handleBossLabSelect}
          />

          {/* Workspace Area */}
          <div className="flex-1 flex flex-col gap-6">

            {!viewingBossLab && currentDay ? (
              // Active Lesson Workspace
              <div className="bg-hacker-card border border-hacker-border rounded-xl p-5 shadow-xl flex flex-col gap-6">

                {/* Title and stats summary */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-hacker-border pb-4 gap-3">
                  <div>
                    <div className="text-[10px] text-hacker-amber font-mono font-bold uppercase tracking-wider">
                      Week {selectedWeekIndex + 1}: {currentDay.dayName}
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1 font-mono leading-snug">
                      {currentDay.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-hacker-dark border border-hacker-border px-3 py-1 rounded text-hacker-muted font-mono uppercase">
                      Skill: {currentDay.competency}
                    </span>
                    {currentDay.completed && (
                      <span className="text-xs bg-hacker-green/10 border border-hacker-green/20 text-hacker-green px-3 py-1 rounded font-mono uppercase font-semibold">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                </div>

                {/* Triple Lesson Sections Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveTab("theory")}
                    className={`p-3 rounded-lg text-center font-mono text-xs font-bold border transition-all flex flex-col items-center gap-1.5 ${
                      activeTab === "theory"
                        ? "bg-hacker-amber text-black border-hacker-amber shadow-md"
                        : "bg-hacker-dark border-hacker-border text-white hover:border-hacker-amber/50"
                    }`}
                  >
                    <BookOpen size={16} />
                    <span>Theory & Logic (30M)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("arena")}
                    className={`p-3 rounded-lg text-center font-mono text-xs font-bold border transition-all flex flex-col items-center gap-1.5 ${
                      activeTab === "arena"
                        ? "bg-hacker-green text-black border-hacker-green shadow-md"
                        : "bg-hacker-dark border-hacker-border text-white hover:border-hacker-green/50"
                    }`}
                  >
                    <Cpu size={16} />
                    <span>Digital Arena (90M)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("automation")}
                    className={`p-3 rounded-lg text-center font-mono text-xs font-bold border transition-all flex flex-col items-center gap-1.5 ${
                      activeTab === "automation"
                        ? "bg-sky-400 text-black border-sky-400 shadow-md"
                        : "bg-hacker-dark border-hacker-border text-white hover:border-sky-400/50"
                    }`}
                  >
                    <Terminal size={16} />
                    <span>Automation (30M)</span>
                  </button>
                </div>

                {/* Tab content renderer */}
                <div className="min-h-[300px]">

                  {/* Theoretical Theory (30 Mins) */}
                  {activeTab === "theory" && (
                    <div className="flex flex-col gap-5">
                      <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-3">
                        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                          <BookOpen size={16} className="text-hacker-amber" /> THEORETICAL PRINCIPLES & LOGIC
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {currentDay.theory.content}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-2">
                          <h4 className="text-xs font-bold text-hacker-amber font-mono">DEVELOPER MINDSET ERROR</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{currentDay.theory.developerMindset}</p>
                        </div>
                        <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-2">
                          <h4 className="text-xs font-bold text-hacker-amber font-mono">PSYCHOLOGICAL COGNITIVE BIAS</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{currentDay.theory.psychologicalError}</p>
                        </div>
                      </div>

                      <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-2">
                        <h4 className="text-xs font-bold text-hacker-amber font-mono">REAL-WORLD ATTACK VECTOR CHAIN</h4>
                        <p className="text-xs text-gray-300 leading-relaxed">{currentDay.theory.attackVectors}</p>
                      </div>

                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => setActiveTab("arena")}
                          className="bg-hacker-amber hover:bg-amber-400 text-black font-bold font-mono text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow"
                        >
                          Proceed to Digital Arena <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Digital Arena Panel */}
                  {activeTab === "arena" && (
                    <div className="flex flex-col gap-5">
                      <InteractiveArena
                        day={currentDay}
                        onVerifyFlag={(flag) => {
                          const res = handleVerifyDayFlag(selectedWeekIndex, currentDay.id, flag);
                          if (res.success) {
                            triggerConfetti();
                          }
                          return res;
                        }}
                      />

                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => setActiveTab("automation")}
                          className="bg-hacker-green hover:bg-emerald-400 text-black font-bold font-mono text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow"
                        >
                          Proceed to Automation Task <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Automation & Output */}
                  {activeTab === "automation" && (
                    <div className="flex flex-col gap-5">

                      {/* Code Script View */}
                      <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs text-hacker-muted font-mono border-b border-hacker-border/30 pb-2">
                          <span>SCRIPT TEMPLATE (AUTOPARSING PROTOTYPE)</span>
                          <span className="text-hacker-amber font-bold">{currentDay.automation.language.toUpperCase()}</span>
                        </div>
                        <pre className="bg-black/80 border border-hacker-border rounded p-3 text-xs text-hacker-green font-mono overflow-x-auto">
                          <code>{currentDay.automation.scriptTemplate}</code>
                        </pre>
                        <p className="text-xs text-gray-300 leading-relaxed">{currentDay.automation.explanation}</p>
                      </div>

                      {/* Lesson Checklist */}
                      <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-3">
                        <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                          DAILY COMPLETE & VERIFY CHECKLIST
                        </h4>
                        <div className="flex flex-col gap-2.5 mt-1">
                          {currentDay.automation.checklist.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleToggleChecklist(selectedWeekIndex, currentDay.id, item.id)}
                              className="flex items-center gap-3 text-left bg-hacker-dark border border-hacker-border/60 hover:border-hacker-amber/30 p-2.5 rounded transition-all group"
                            >
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                item.completed
                                  ? "bg-hacker-amber border-hacker-amber text-black"
                                  : "border-hacker-border group-hover:border-hacker-amber"
                              }`}>
                                {item.completed && <span className="text-[10px] font-bold">✓</span>}
                              </div>
                              <span className={`text-xs ${item.completed ? "text-hacker-muted line-through" : "text-gray-200"}`}>
                                {item.text}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Social ledger sharing & GitHub pushes triggers */}
                      <SocialIntegrator
                        lessonTitle={currentDay.title}
                        scriptContent={currentDay.automation.scriptTemplate}
                        gitHubSettings={gitHubSettings}
                        onUpdateGitHub={updateGitHubSettings}
                        onMarkCommitted={() => {
                          handleMarkAsCommitted(selectedWeekIndex, currentDay.id);
                          triggerConfetti();
                        }}
                      />
                    </div>
                  )}

                </div>

              </div>
            ) : bossLab ? (
              // Active Boss Lab Workspace
              <div className="flex flex-col gap-6">
                <BossLabSimulator
                  bossLab={bossLab}
                  onVerifyBossFlag={(flag) => {
                    const res = handleVerifyBossFlag(selectedWeekIndex, flag);
                    if (res.success) {
                      triggerConfetti();
                    }
                    return res;
                  }}
                  onSubmitReport={(title, severity, desc, rem) => {
                    const res = handleSubmitVDPReport(selectedWeekIndex, title, severity, desc, rem);
                    if (res.success) {
                      triggerConfetti();
                    }
                    return res;
                  }}
                />
              </div>
            ) : (
              <div className="bg-hacker-card border border-hacker-border p-8 rounded-xl text-center font-mono text-sm text-hacker-muted">
                No syllabus module found. Reset or reload the environment index.
              </div>
            )}

          </div>

        </div>

      </main>

      <footer className="text-center text-[11px] text-hacker-muted font-mono mt-12 pt-6 border-t border-hacker-border max-w-7xl mx-auto px-6">
        BUG BOUNTY MASTERY LMS © {new Date().getFullYear()} — CRITICAL CYBER EDUCATION SYSTEM. FOR SECURE AUDITING PURPOSES ONLY.
      </footer>

    </div>
  );
}

export default App;
