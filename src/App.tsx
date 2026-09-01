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
import { ThemeToggle } from "./components/ThemeToggle";
import { AdminDashboardModal } from "./components/AdminDashboardModal";
import { AuthModal, AuthUser } from "./components/AuthModal";
import {
  ShieldAlert, BookOpen, Cpu, FileText, ChevronRight, Sparkles, Terminal, Info, ShieldCheck, LogIn, LogOut, Lightbulb, Bot, BookMarked
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
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("bbm_auth_user");
    return saved ? JSON.parse(saved) : null;
  });

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
    <div className="min-h-screen bg-hacker-dark text-gray-100 font-sans pb-12 transition-colors duration-200">

      {/* Header Bar */}
      <header className="border-b border-hacker-border bg-hacker-dark/95 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-hacker-green/10 border border-hacker-green/30 flex items-center justify-center">
            <ShieldAlert size={20} className="text-hacker-green animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wider font-mono">BUG BOUNTY MASTERY ACADEMY</h1>
            <p className="text-[10px] text-hacker-muted font-mono uppercase tracking-widest mt-0.5">3-Month Cybersecurity LMS & Boot Camp Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* Theme Switcher Controls */}
          <ThemeToggle />

          {/* Admin Dashboard Trigger */}
          {access.isAdmin && (
            <button
              onClick={() => setShowAdminDashboard(true)}
              className="text-xs bg-hacker-amber/10 border border-hacker-amber/40 hover:border-hacker-amber text-hacker-amber px-3 py-1.5 rounded font-mono font-bold flex items-center gap-1.5 transition-all"
            >
              <ShieldCheck size={14} /> Admin Portal
            </button>
          )}

          {/* Login / Auth Button */}
          {authUser ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-hacker-green font-bold bg-hacker-green/10 border border-hacker-green/30 px-2.5 py-1 rounded">
                👤 {authUser.username} {authUser.isAdmin ? "(Admin)" : ""}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("bbm_auth_user");
                  localStorage.removeItem("bbm_admin_bypass");
                  setAuthUser(null);
                  window.location.reload();
                }}
                className="text-xs text-hacker-muted hover:text-red-400 font-mono border border-hacker-border px-2.5 py-1 rounded flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-xs bg-hacker-card border border-hacker-border hover:border-hacker-amber text-white font-mono font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-all"
            >
              <LogIn size={13} className="text-hacker-amber" /> Sign In / Portal
            </button>
          )}

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
            <Sparkles size={13} /> {access.isPaid || access.isAdmin ? "PRO ACADEMY ACTIVE" : `4-DAY TRIAL (${access.trialDaysLeft} DAYS LEFT)`}
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
        />

        {/* Admin Dashboard Modal */}
        <AdminDashboardModal
          isOpen={showAdminDashboard}
          onClose={() => setShowAdminDashboard(false)}
          isAdmin={access.isAdmin}
        />

        {/* Authentication & Sign In Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => {
            setAuthUser(user);
            if (user.isAdmin) {
              handleToggleAdminAccess("Jakwath,12.");
            }
          }}
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

                  {/* Theoretical Principles & Auditing (30 Mins) */}
                  {activeTab === "theory" && (
                    <div className="flex flex-col gap-5">

                      {/* Simple Beginner Analogy Card */}
                      {currentDay.theory.beginnerAnalogy && (
                        <div className="bg-gradient-to-r from-amber-950/40 via-hacker-card to-hacker-dark border border-hacker-amber/50 p-5 rounded-xl flex flex-col gap-3 shadow-lg">
                          <div className="text-xs font-bold text-hacker-amber font-mono flex items-center gap-2 uppercase tracking-wider">
                            <Lightbulb size={18} /> BEGINNER ANALOGY & REAL-WORLD STORY
                          </div>
                          <p className="text-sm text-white font-sans leading-relaxed italic">
                            "{currentDay.theory.beginnerAnalogy.story}"
                          </p>
                          <div className="text-xs text-gray-300 font-mono bg-black/60 p-3 rounded border border-hacker-border/40 mt-1">
                            <span className="font-bold text-hacker-amber">REAL WORLD COMPARISON:</span> {currentDay.theory.beginnerAnalogy.realWorldComparison}
                          </div>
                        </div>
                      )}

                      {/* ChatGPT & AI Bug Bounty Auditing Strategy */}
                      {currentDay.theory.chatGptPromptStrategy && (
                        <div className="bg-gradient-to-r from-purple-950/40 via-hacker-card to-hacker-dark border border-purple-400/40 p-4.5 rounded-xl flex flex-col gap-2.5 shadow-md">
                          <div className="text-xs font-bold text-purple-400 font-mono flex items-center gap-2 uppercase tracking-wider">
                            <Bot size={18} /> CHATGPT & AI BUG BOUNTY PROMPT STRATEGY (by Joas Antonio dos Santos Barbosa)
                          </div>
                          <pre className="bg-black/80 border border-hacker-border rounded p-3 text-xs text-purple-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                            <code>{currentDay.theory.chatGptPromptStrategy}</code>
                          </pre>
                        </div>
                      )}

                      {/* Recommended Reading & Book References */}
                      {currentDay.theory.recommendedBooks && currentDay.theory.recommendedBooks.length > 0 && (
                        <div className="bg-hacker-dark/50 border border-hacker-border p-4 rounded-xl flex flex-col gap-3">
                          <div className="text-xs font-bold text-sky-400 font-mono flex items-center gap-2 uppercase tracking-wider">
                            <BookMarked size={18} /> RECOMMENDED READING & BOOK REFERENCES
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentDay.theory.recommendedBooks.map((book, idx) => (
                              <div key={idx} className="bg-hacker-card border border-hacker-border p-3 rounded-lg flex flex-col gap-1.5 font-mono text-xs">
                                <span className="font-bold text-white">{book.title}</span>
                                <span className="text-[10px] text-hacker-amber">Author: {book.author}</span>
                                <p className="text-[11px] text-gray-300 font-sans mt-0.5 leading-relaxed">{book.takeaway}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* What You Are Doing In This Lesson Card */}
                      <div className="bg-gradient-to-r from-emerald-950/30 via-hacker-card to-hacker-dark border border-hacker-green/40 p-4.5 rounded-xl flex flex-col gap-2.5 shadow-md">
                        <div className="text-xs font-bold text-hacker-green font-mono flex items-center gap-1.5 uppercase tracking-wider">
                          <Terminal size={16} /> WHAT YOU ARE DOING IN THIS LESSON
                        </div>
                        <div className="text-xs text-white leading-relaxed font-sans whitespace-pre-wrap">
                          {currentDay.theory.whatYouAreDoing}
                        </div>
                      </div>

                      {/* How The Vulnerability Comes About (Root Cause) */}
                      <div className="bg-hacker-dark/50 border border-hacker-border p-4 rounded-lg flex flex-col gap-2.5">
                        <h3 className="text-xs font-bold text-hacker-amber font-mono uppercase tracking-wider">
                          HOW THE VULNERABILITY COMES ABOUT (ROOT CAUSE)
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {currentDay.theory.vulnerabilityOrigin}
                        </p>
                      </div>

                      {/* Pentester Focus & What To Look For */}
                      <div className="bg-hacker-dark/50 border border-hacker-border p-4 rounded-lg flex flex-col gap-2.5">
                        <h3 className="text-xs font-bold text-hacker-amber font-mono uppercase tracking-wider">
                          PENTESTER FOCUS: WHAT TO LOOK FOR DURING CODE AUDITS
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {currentDay.theory.pentesterFocus}
                        </p>
                      </div>

                      {/* How To Come Up With & Construct Payloads */}
                      <div className="bg-hacker-dark/50 border border-hacker-border p-4 rounded-lg flex flex-col gap-2.5">
                        <h3 className="text-xs font-bold text-hacker-amber font-mono uppercase tracking-wider">
                          PAYLOAD CRAFTING LOGIC & CONSTRUCTION
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-mono bg-black/60 p-3 rounded border border-hacker-border/40 whitespace-pre-wrap">
                          {currentDay.theory.payloadCrafting}
                        </p>
                      </div>

                      {/* Burp Suite Setup & Proxy Configurations */}
                      <div className="bg-hacker-dark/50 border border-hacker-border p-4 rounded-lg flex flex-col gap-2.5">
                        <h3 className="text-xs font-bold text-sky-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                          <Cpu size={14} /> BURP SUITE SETUP & PROXY REPEATER CONFIGURATION
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {currentDay.theory.burpSuiteSetup}
                        </p>
                      </div>

                      {/* Blue Team Defense & Secure Coding Practices */}
                      <div className="bg-hacker-dark/50 border border-hacker-green/40 p-4 rounded-lg flex flex-col gap-2.5">
                        <h3 className="text-xs font-bold text-hacker-green font-mono uppercase tracking-wider flex items-center gap-1.5">
                          <ShieldAlert size={14} /> BLUE TEAM DEFENSE & SECURE CODING PRACTICES
                        </h3>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {currentDay.theory.blueTeamDefense}
                        </p>
                      </div>

                      {/* Useful Resources, Cheat Sheets & Specs */}
                      {currentDay.theory.usefulResources && currentDay.theory.usefulResources.length > 0 && (
                        <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-2.5">
                          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                            <Info size={14} className="text-sky-400" /> USEFUL RESOURCES, CHEAT SHEETS & SPECS
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                            {currentDay.theory.usefulResources.map((res, idx) => (
                              <a
                                key={idx}
                                href={res.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-hacker-dark border border-hacker-border/70 hover:border-sky-400 p-2.5 rounded-lg text-xs font-mono text-gray-200 flex items-center justify-between transition-all group"
                              >
                                <span className="group-hover:text-sky-400 transition-colors font-medium">{res.name}</span>
                                <span className="text-[10px] bg-hacker-card px-2 py-0.5 rounded text-hacker-muted">{res.category}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-2">
                          <h4 className="text-xs font-bold text-hacker-amber font-mono">DEVELOPER MINDSET ASSUMPTION</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{currentDay.theory.developerMindset}</p>
                        </div>
                        <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-2">
                          <h4 className="text-xs font-bold text-hacker-amber font-mono">PSYCHOLOGICAL COGNITIVE ERROR</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{currentDay.theory.psychologicalError}</p>
                        </div>
                      </div>

                      {/* Industry Insight & Statistic (Positioned at Bottom) */}
                      {currentDay.theory.industryInsight && (
                        <div className="bg-hacker-dark/90 border border-hacker-amber/40 p-4 rounded-xl flex flex-col gap-2 mt-1">
                          <div className="text-xs text-white leading-relaxed font-sans font-medium whitespace-pre-wrap">
                            {currentDay.theory.industryInsight}
                          </div>
                        </div>
                      )}

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

                  {/* Automation & VDP Report Writing Tab */}
                  {activeTab === "automation" && (
                    <div className="flex flex-col gap-5">

                      {/* Daily Hands-On Assignment Module */}
                      {currentDay.automation.dailyAssignment && (
                        <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/50 p-5 rounded-xl flex flex-col gap-3 shadow-lg">
                          <div className="text-xs font-bold text-sky-400 font-mono flex items-center gap-2 uppercase tracking-wider">
                            <FileText size={18} /> {currentDay.automation.dailyAssignment.title}
                          </div>
                          <p className="text-xs text-gray-200 font-sans leading-relaxed">
                            <span className="font-bold text-white font-mono">OBJECTIVE:</span> {currentDay.automation.dailyAssignment.objective}
                          </p>
                          <div className="bg-black/60 p-3 rounded-lg border border-hacker-border/40 font-mono text-xs flex flex-col gap-1.5">
                            <span className="font-bold text-hacker-amber">PRACTICAL STEPS TO COMPLETE:</span>
                            {currentDay.automation.dailyAssignment.tasks.map((task, idx) => (
                              <div key={idx} className="text-gray-300 text-[11px] font-sans flex items-start gap-1.5">
                                <span className="text-sky-400 font-mono font-bold">•</span>
                                <span>{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Python Automation Script Suite (Automate Boring Stuff / Black Hat Style) */}
                      <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs text-hacker-muted font-mono border-b border-hacker-border/30 pb-2">
                          <span className="flex items-center gap-1.5"><Terminal size={14} className="text-hacker-amber" /> PYTHON EXPLOIT AUTOMATION FRAMEWORK (Black Hat Python Style)</span>
                          <span className="text-hacker-amber font-bold">PYTHON 3.11</span>
                        </div>
                        <pre className="bg-black/90 border border-hacker-border rounded p-3 text-xs text-hacker-green font-mono overflow-x-auto">
                          <code>{currentDay.automation.pythonScript}</code>
                        </pre>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{currentDay.automation.pythonExplanation}</p>
                      </div>

                      {/* Bash CLI Command Automation Script Suite */}
                      <div className="bg-hacker-dark/40 border border-hacker-border p-4 rounded-lg flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs text-hacker-muted font-mono border-b border-hacker-border/30 pb-2">
                          <span className="flex items-center gap-1.5"><Terminal size={14} className="text-sky-400" /> BASH COMMAND-LINE AUTOMATION SUITE</span>
                          <span className="text-sky-400 font-bold">BASH 5.0</span>
                        </div>
                        <pre className="bg-black/90 border border-hacker-border rounded p-3 text-xs text-sky-300 font-mono overflow-x-auto">
                          <code>{currentDay.automation.bashScript || `#!/usr/bin/env bash\n# Command Line Scan\ncurl -s "http://target.local"`}</code>
                        </pre>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{currentDay.automation.bashExplanation}</p>
                      </div>

                      {/* Vulnerability Report Template */}
                      {currentDay.automation.vdpReportTemplate && (
                        <div className="bg-hacker-dark/60 border border-sky-400/40 p-4.5 rounded-xl flex flex-col gap-3">
                          <div className="flex justify-between items-center border-b border-hacker-border/40 pb-2">
                            <h4 className="text-xs font-bold text-sky-400 font-mono uppercase flex items-center gap-1.5">
                              <FileText size={15} /> CORPORATE VULNERABILITY DISCLOSURE REPORT TEMPLATE
                            </h4>
                            <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono font-bold">
                              {currentDay.automation.vdpReportTemplate.cvssVector} ({currentDay.automation.vdpReportTemplate.cvssScore})
                            </span>
                          </div>

                          <div className="flex flex-col gap-2.5 font-mono text-xs text-gray-200">
                            <div>
                              <span className="text-hacker-amber font-bold">REPORT TITLE:</span> {currentDay.automation.vdpReportTemplate.title}
                            </div>
                            <div className="bg-black/60 p-3 rounded border border-hacker-border/40 font-sans text-xs flex flex-col gap-2">
                              <div><span className="font-bold text-sky-400 font-mono">DESCRIPTION:</span> {currentDay.automation.vdpReportTemplate.description}</div>
                              <div><span className="font-bold text-hacker-green font-mono">STEPS TO REPRODUCE:</span></div>
                              <pre className="font-mono text-[11px] text-gray-300 whitespace-pre-wrap leading-relaxed">{currentDay.automation.vdpReportTemplate.stepsToReproduce}</pre>
                              <div><span className="font-bold text-hacker-amber font-mono">DEVELOPER REMEDIATION:</span> {currentDay.automation.vdpReportTemplate.remediation}</div>
                            </div>
                          </div>
                        </div>
                      )}

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
                        scriptContent={currentDay.automation.pythonScript}
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
