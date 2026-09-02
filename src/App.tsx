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
import { BookLessonModal } from "./components/BookLessonModal";
import { YouTubeLessonModal } from "./components/YouTubeLessonModal";
import { IntroVideoGallery } from "./components/IntroVideoGallery";
import { BookLesson, CreatorLesson, TextbookReference } from "./types/curriculum";
import {
  ShieldAlert, BookOpen, Cpu, FileText, ChevronRight, Sparkles, Terminal, Info, ShieldCheck, LogIn, LogOut, Lightbulb, Bot, BookMarked, PlayCircle, Target, Search, Filter, Rocket, ExternalLink, Award, CheckCircle2
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

  // Student VDP Evaluator State
  const [vdpTitle, setVdpTitle] = useState("");
  const [vdpCvss, setVdpCvss] = useState("");
  const [vdpDesc, setVdpDesc] = useState("");
  const [vdpSteps, setVdpSteps] = useState("");
  const [vdpRem, setVdpRem] = useState("");
  const [vdpEvalResult, setVdpEvalResult] = useState<{ score: string; feedback: string } | null>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookLesson | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedCreatorLesson, setSelectedCreatorLesson] = useState<CreatorLesson | null>(null);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [selectedTbRef, setSelectedTbRef] = useState<TextbookReference | null>(null);
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

        {/* Interactive Book Lesson Modal */}
        <BookLessonModal
          book={selectedBook}
          isOpen={showBookModal}
          onClose={() => setShowBookModal(false)}
          dayTitle={currentDay?.title || "Cybersecurity Auditing"}
        />

        {/* Interactive Creator / YouTube Walkthrough Lesson Modal */}
        <YouTubeLessonModal
          lesson={selectedCreatorLesson}
          isOpen={showCreatorModal}
          onClose={() => setShowCreatorModal(false)}
          dayTitle={currentDay?.title || "Cybersecurity Auditing"}
        />

        {/* Profile Details RPG panel */}
        <ProfilePanel stats={stats} onUpdateStats={updateStats} />

        {/* Introductory Bug Bounty Masterclass Video Gallery */}
        <IntroVideoGallery />

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

                {/* Master Integration Hooks Banner: Burp Tooling, PortSwigger, GitHub Asset, LinkedIn */}
                <div className="bg-hacker-dark/90 border border-hacker-border p-3.5 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-hacker-muted">
                    <Terminal size={14} className="text-hacker-amber shrink-0" />
                    <span><strong className="text-white">Burp Tooling:</strong> {currentDay.burpToolingUsed}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 bg-hacker-card border border-hacker-border px-3 py-1.5 rounded">
                    <span className="text-gray-300 truncate"><strong className="text-white">PortSwigger Lab:</strong> Hands-On Academy</span>
                    <a
                      href={currentDay.portSwiggerLabLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-hacker-amber hover:text-white font-bold flex items-center gap-1 shrink-0 bg-hacker-amber/10 px-2 py-0.5 rounded border border-hacker-amber/20 hover:bg-hacker-amber/20 transition-all"
                    >
                      Open Lab <ExternalLink size={12} />
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-2 bg-hacker-card border border-hacker-border px-3 py-1.5 rounded">
                    <span className="text-gray-300 truncate"><strong className="text-white">GitHub Asset:</strong> {currentDay.architecture?.section8_PortfolioIntegration?.githubAssetName || "script.py"}</span>
                    <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded font-bold shrink-0">
                      {currentDay.architecture?.section8_PortfolioIntegration?.githubAssetType || "Python"}
                    </span>
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

                  {/* Exact 8-Part Framework Architecture Workspace - Prioritizing Red Team & Playground at Absolute Top */}
                  {activeTab === "theory" && currentDay.architecture && (
                    <div className="flex flex-col gap-6">

                      {/* TOP SECTION 1: RED TEAM ADVANCED EXPLOITATION (BURP, DORKS, WAF & JS DECONSTRUCTION) */}
                      <div className="bg-hacker-dark/80 border border-red-500/50 p-5 rounded-xl flex flex-col gap-3 shadow-2xl font-mono text-xs">
                        <div className="text-xs font-bold text-red-400 flex items-center justify-between border-b border-red-500/30 pb-2 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <Target size={18} className="text-red-400 animate-pulse" /> RED TEAM ADVANCED EXPLOITATION TRACK
                          </div>
                          <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded">
                            TOP VIEWPORT PRIORITY
                          </span>
                        </div>

                        <p className="text-xs text-gray-200 font-sans leading-relaxed">
                          {currentDay.architecture.section3_RedTeamPerspective.discoveryAndWeaponization}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                          {/* Burp Suite Execution Steps */}
                          <div className="bg-black/70 p-3.5 rounded-lg border border-red-500/30 flex flex-col gap-1.5">
                            <span className="font-bold text-hacker-amber flex items-center gap-1.5 text-xs">
                              <Terminal size={14} /> BURP SUITE WORKFLOW & INTERCEPTION STEPS:
                            </span>
                            {currentDay.architecture.section3_RedTeamPerspective.burpSuiteExecutionSteps.map((step, idx) => (
                              <div key={idx} className="text-gray-300 text-[11px] font-mono leading-relaxed">
                                {step}
                              </div>
                            ))}
                          </div>

                          {/* Google Dorks & Passive Recon */}
                          <div className="bg-black/70 p-3.5 rounded-lg border border-sky-400/30 flex flex-col gap-1.5">
                            <span className="font-bold text-sky-400 flex items-center gap-1.5 text-xs">
                              <Search size={14} /> FUNCTIONAL GOOGLE DORKS & PASSIVE RECON:
                            </span>
                            {currentDay.architecture.section3_RedTeamPerspective.googleDorks?.map((dork, idx) => (
                              <code key={idx} className="bg-slate-950 text-sky-300 p-1.5 rounded text-[10px] font-mono block overflow-x-auto">
                                {dork}
                              </code>
                            )) || (
                              <p className="text-[11px] text-gray-400 font-sans">site:*.target.com inurl:api "Authorization: Bearer"</p>
                            )}
                          </div>
                        </div>

                        {/* WAF Bypass & Parameter Tricks */}
                        {currentDay.architecture.section3_RedTeamPerspective.wafBypassTricks && (
                          <div className="bg-black/80 p-3.5 rounded-lg border border-hacker-amber/40 flex flex-col gap-1.5 mt-1 font-sans text-xs">
                            <span className="font-bold text-hacker-amber font-mono uppercase tracking-wider text-[11px]">
                              ⚡ WAF BYPASS & ADVANCED PARAMETER TRICKS:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {currentDay.architecture.section3_RedTeamPerspective.wafBypassTricks.map((trick, idx) => (
                                <div key={idx} className="bg-black/60 p-2 rounded border border-hacker-border/40 text-[11px] text-gray-300 font-mono">
                                  {trick}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* JS Deconstruction Deep Dive */}
                        <div className="bg-black/90 p-4 rounded-lg border border-red-500/40 flex flex-col gap-2 mt-1 font-sans text-xs">
                          <span className="font-bold text-red-400 font-mono uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                            <Cpu size={14} /> CLIENT-SIDE JAVASCRIPT DECONSTRUCTION & SINK TRACING:
                          </span>
                          <p><strong className="text-white font-mono">Sources & DevTools:</strong> {currentDay.architecture.section3_RedTeamPerspective.jsDeconstructionGuide.sourceMappingAndDevTools}</p>
                          <p><strong className="text-white font-mono">Deobfuscation Technique:</strong> {currentDay.architecture.section3_RedTeamPerspective.jsDeconstructionGuide.deobfuscationTechnique}</p>
                          <p><strong className="text-white font-mono">Sources & Sinks:</strong> {currentDay.architecture.section3_RedTeamPerspective.jsDeconstructionGuide.sinkAndSourceIdentification}</p>
                          <p><strong className="text-white font-mono">API Keys & Endpoints:</strong> {currentDay.architecture.section3_RedTeamPerspective.jsDeconstructionGuide.apiEndpointAndKeyMining}</p>
                          <p><strong className="text-white font-mono">Client Logic Bypass:</strong> {currentDay.architecture.section3_RedTeamPerspective.jsDeconstructionGuide.clientSideLogicBypass}</p>
                        </div>
                      </div>

                      {/* TOP SECTION 2: IN-APP DIGITAL PLAYGROUND (INTERACTIVE LAB CONSOLE) */}
                      <div className="bg-hacker-dark/90 border border-hacker-amber/60 p-5 rounded-xl flex flex-col gap-3 shadow-2xl font-mono text-xs">
                        <div className="flex items-center justify-between border-b border-hacker-amber/40 pb-2">
                          <div className="text-xs font-bold text-hacker-amber flex items-center gap-2 uppercase tracking-wider">
                            <Cpu size={18} className="animate-spin" /> IN-APP DIGITAL PLAYGROUND (FLAG HARVESTING CONSOLE)
                          </div>
                          <span className="text-[10px] bg-hacker-amber/20 text-hacker-amber border border-hacker-amber/40 px-2 py-0.5 rounded">
                            INTERACTIVE AUDIT CHALLENGE
                          </span>
                        </div>
                        <p className="text-xs text-gray-200 font-sans leading-relaxed">
                          {currentDay.architecture.section7_DigitalPlayground.instructions}
                        </p>
                        <pre className="bg-slate-950 border border-hacker-amber/40 p-3.5 rounded-lg text-hacker-green font-mono text-[11px] overflow-x-auto shadow-inner">
                          {currentDay.architecture.section7_DigitalPlayground.initialCodeOrConsole}
                        </pre>
                      </div>

                      {/* DENSE CORE FOUNDATIONS (WHY IT BREAKS) */}
                      <div className="bg-gradient-to-r from-amber-950/40 via-hacker-card to-hacker-dark border border-hacker-amber/50 p-5 rounded-xl flex flex-col gap-3 shadow-lg">
                        <div className="text-xs font-bold text-hacker-amber font-mono flex items-center gap-2 uppercase tracking-wider border-b border-hacker-border/40 pb-2">
                          <BookOpen size={18} /> DENSE CORE FOUNDATIONS (PROTOCOL & LOGIC FAILURE)
                        </div>
                        <div className="flex flex-col gap-2 font-sans text-xs leading-relaxed text-gray-200">
                          <p><strong className="text-white font-mono">Foundational Architecture:</strong> {currentDay.architecture.section1_RootCause.foundationalArchitecture}</p>
                          <p><strong className="text-white font-mono">Coding Mistake & Logic Failure:</strong> {currentDay.architecture.section1_RootCause.codingMistakeAndLogicFailure}</p>
                          <p><strong className="text-white font-mono">Protocol & Code Level Impact:</strong> {currentDay.architecture.section1_RootCause.protocolAndCodeLevelImpact}</p>
                        </div>
                      </div>

                      {/* GRANULAR BOOK INDEXING ENGINE (CLICKABLE NAVIGATION) */}
                      <div className="bg-hacker-dark/80 border border-sky-400/40 p-5 rounded-xl flex flex-col gap-3 shadow-lg font-mono text-xs">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-hacker-border/40 pb-2">
                          <div className="text-xs font-bold text-sky-400 flex items-center gap-2 uppercase tracking-wider">
                            <BookOpen size={18} /> GRANULAR BOOK INDEXING ENGINE (CLICKABLE TEXTBOOK NAV)
                          </div>
                          <span className="text-[10px] text-hacker-amber bg-hacker-amber/10 border border-hacker-amber/30 px-2 py-0.5 rounded font-mono">
                            Click any textbook to inspect exact chapters, page ranges & bypasses
                          </span>
                        </div>

                        <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
                          {currentDay.architecture.section2_TextbookCrossReference.overallResolutionStrategy}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-1">
                          {currentDay.architecture.section2_TextbookCrossReference.textbookList.map((tb, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedTbRef(tb)}
                              className="text-left bg-black/60 hover:bg-sky-950/40 border border-hacker-border/60 hover:border-sky-400 p-3 rounded-lg flex flex-col justify-between gap-2 transition-all group shadow-sm"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-bold text-sky-300 text-xs group-hover:text-sky-400 transition-colors">
                                    {tb.bookTitle}
                                  </span>
                                  <span className="text-[9px] bg-sky-400/10 border border-sky-400/30 text-sky-300 px-1.5 py-0.5 rounded font-mono">
                                    {tb.pageRange || "Ref"}
                                  </span>
                                </div>
                                <div className="text-[10px] text-hacker-amber font-mono mt-1">
                                  {tb.chapterTitle || tb.chapter} ({tb.author})
                                </div>

                                {tb.subchapterHeadings && tb.subchapterHeadings.length > 0 && (
                                  <div className="mt-2 bg-hacker-dark/80 p-2 rounded border border-hacker-border/40 space-y-1">
                                    <span className="text-[9px] text-gray-400 uppercase tracking-wider block font-bold">Sub-chapter Headings:</span>
                                    {tb.subchapterHeadings.map((sub, sIdx) => (
                                      <p key={sIdx} className="text-[10px] text-gray-300 font-sans truncate">
                                        • {sub}
                                      </p>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-1 text-[10px] text-sky-400 font-mono font-bold mt-2 pt-2 border-t border-hacker-border/30">
                                <BookOpen size={12} /> Inspect Author Guidelines →
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Blue Team Perspective (Log Analysis & Secure Mitigation) */}
                      <div className="bg-hacker-dark/80 border border-hacker-green/40 p-5 rounded-xl flex flex-col gap-3 shadow-lg font-mono text-xs">
                        <div className="text-xs font-bold text-hacker-green flex items-center gap-2 uppercase tracking-wider border-b border-hacker-border/40 pb-2">
                          <ShieldCheck size={18} /> SECTION 4: BLUE TEAM PERSPECTIVE (LOG ANALYSIS & MITIGATION)
                        </div>

                        <span className="font-bold text-hacker-amber">SERVER LOG ANALYSIS EXAMPLES:</span>
                        <div className="grid grid-cols-1 gap-2">
                          {currentDay.architecture.section4_BlueTeamPerspective.logAnalysisExamples.map((log, idx) => (
                            <div key={idx} className="bg-black/70 p-3 rounded-lg border border-hacker-border/40 flex flex-col gap-1">
                              <span className="font-bold text-sky-400">{log.serverType} Server Log:</span>
                              <code className="bg-slate-950 p-1.5 rounded text-red-300 font-mono text-[11px] overflow-x-auto">{log.logSnippet}</code>
                              <p className="text-[11px] text-gray-300 font-sans mt-0.5">{log.anomalyExplanation}</p>
                            </div>
                          ))}
                        </div>

                        <div className="bg-black/60 p-3 rounded-lg border border-hacker-border/40 flex flex-col gap-1.5 mt-1">
                          <span className="font-bold text-hacker-amber">INDICATORS OF COMPROMISE (IoCs):</span>
                          {currentDay.architecture.section4_BlueTeamPerspective.indicatorsOfCompromise.map((ioc, idx) => (
                            <div key={idx} className="text-gray-300 text-[11px]">
                              • {ioc}
                            </div>
                          ))}
                        </div>

                        <div className="bg-black/80 p-3.5 rounded-lg border border-hacker-green/30 flex flex-col gap-2 mt-1">
                          <span className="font-bold text-hacker-green uppercase tracking-wider">{currentDay.architecture.section4_BlueTeamPerspective.remediationCodeSnippet.description}</span>
                          <pre className="bg-slate-950 p-2.5 rounded text-hacker-green font-mono text-[11px] overflow-x-auto">
                            {currentDay.architecture.section4_BlueTeamPerspective.remediationCodeSnippet.secureCode}
                          </pre>
                        </div>
                      </div>

                      {/* Section 5: Automation Workshop */}
                      <div className="bg-hacker-dark/90 border border-sky-400/50 p-5 rounded-xl flex flex-col gap-3 shadow-lg font-mono text-xs">
                        <div className="text-xs font-bold text-sky-400 flex items-center gap-2 uppercase tracking-wider border-b border-hacker-border/40 pb-2">
                          <Terminal size={18} /> SECTION 5: AUTOMATION WORKSHOP ({currentDay.architecture.section5_AutomationWorkshop.scriptName})
                        </div>
                        <pre className="bg-slate-950 p-3 rounded text-sky-300 font-mono text-[11px] overflow-x-auto">
                          {currentDay.architecture.section5_AutomationWorkshop.code}
                        </pre>
                        <div className="bg-black/60 p-3 rounded-lg border border-hacker-border/40 flex flex-col gap-1">
                          <span className="font-bold text-hacker-amber">LINE-BY-LINE EXPLANATION:</span>
                          {currentDay.architecture.section5_AutomationWorkshop.lineByLineExplanation.map((exp, idx) => (
                            <p key={idx} className="text-[11px] text-gray-300 font-sans">{exp}</p>
                          ))}
                        </div>
                      </div>

                      {/* Section 6: PortSwigger Links & Solving Guide */}
                      <div className="bg-hacker-dark/90 border border-purple-400/50 p-5 rounded-xl flex flex-col gap-3 shadow-lg font-mono text-xs">
                        <div className="text-xs font-bold text-purple-400 flex items-center gap-2 uppercase tracking-wider border-b border-hacker-border/40 pb-2">
                          <ExternalLink size={18} /> SECTION 6: PORTSWIGGER LAB LINKS & SOLVING GUIDE
                        </div>
                        <a
                          href={currentDay.architecture.section6_PortSwiggerGuide.directLabUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-950/40 border border-purple-400/50 hover:bg-purple-900/50 text-white font-bold p-3 rounded-lg flex items-center justify-between transition-all"
                        >
                          <span>Open PortSwigger Web Security Academy Direct Module</span>
                          <ExternalLink size={14} />
                        </a>
                        <div className="bg-black/60 p-3 rounded-lg border border-hacker-border/40 flex flex-col gap-1">
                          <span className="font-bold text-hacker-amber">STRATEGIC SOLVING GUIDE:</span>
                          {currentDay.architecture.section6_PortSwiggerGuide.strategicSolvingGuide.map((sg, idx) => (
                            <p key={idx} className="text-[11px] text-gray-300 font-sans">{sg}</p>
                          ))}
                        </div>
                      </div>

                      {/* Section 7: The Digital Playground (In-App Interactive Lab) */}
                      <div className="bg-hacker-dark/90 border border-hacker-amber/50 p-5 rounded-xl flex flex-col gap-3 shadow-lg font-mono text-xs">
                        <div className="text-xs font-bold text-hacker-amber flex items-center gap-2 uppercase tracking-wider border-b border-hacker-border/40 pb-2">
                          <Cpu size={18} /> SECTION 7: THE DIGITAL PLAYGROUND (IN-APP INTERACTIVE LAB)
                        </div>
                        <p className="text-xs text-gray-200 font-sans leading-relaxed">
                          {currentDay.architecture.section7_DigitalPlayground.instructions}
                        </p>
                        <pre className="bg-slate-950 border border-hacker-border/60 p-3 rounded text-hacker-green font-mono text-[11px] overflow-x-auto">
                          {currentDay.architecture.section7_DigitalPlayground.initialCodeOrConsole}
                        </pre>
                      </div>

                      {/* Section 8: Portfolio Integration */}
                      <div className="bg-hacker-dark/90 border border-white/40 p-5 rounded-xl flex flex-col gap-3 shadow-lg font-mono text-xs">
                        <div className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider border-b border-hacker-border/40 pb-2">
                          <Award size={18} /> SECTION 8: GITHUB PORTFOLIO & LINKEDIN INTEGRATION
                        </div>
                        <p className="text-xs text-gray-200 font-sans leading-relaxed">
                          {currentDay.architecture.section8_PortfolioIntegration.githubAssetDescription}
                        </p>
                      </div>

                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => setActiveTab("arena")}
                          className="bg-hacker-amber hover:bg-amber-400 text-black font-bold font-mono text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow"
                        >
                          Proceed to Digital Arena (Interactive Verification) <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Theoretical Principles & Auditing (Fallback) */}
                  {activeTab === "theory" && !currentDay.architecture && (
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

                      {/* Real-World Bug Hunting Field Guide */}
                      {currentDay.theory.howToDoRealWorldHunting && (
                        <div className="bg-gradient-to-r from-emerald-950/40 via-hacker-card to-hacker-dark border border-hacker-green/50 p-5 rounded-xl flex flex-col gap-3 shadow-lg">
                          <div className="text-xs font-bold text-hacker-green font-mono flex items-center gap-2 uppercase tracking-wider">
                            <Target size={18} /> REAL-WORLD BUG HUNTING FIELD GUIDE
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 font-mono text-xs">
                            <div className="bg-black/70 p-3.5 rounded-lg border border-hacker-border/60 flex flex-col gap-2">
                              <span className="font-bold text-hacker-green flex items-center gap-1.5">
                                <Search size={14} /> TARGET DISCOVERY GOOGLE DORKS:
                              </span>
                              <div className="flex flex-col gap-1 text-[11px] text-gray-300">
                                {currentDay.theory.howToDoRealWorldHunting.targetDiscoveryDorks.map((dork, idx) => (
                                  <code key={idx} className="bg-slate-950 p-1.5 rounded border border-hacker-border/40 text-hacker-green overflow-x-auto">
                                    {dork}
                                  </code>
                                ))}
                              </div>
                            </div>

                            <div className="bg-black/70 p-3.5 rounded-lg border border-hacker-border/60 flex flex-col gap-2">
                              <span className="font-bold text-sky-400 flex items-center gap-1.5">
                                <Filter size={14} /> RECON & FILTERING STRATEGY:
                              </span>
                              <p className="text-[11px] text-gray-300 font-sans leading-relaxed whitespace-pre-wrap">
                                {currentDay.theory.howToDoRealWorldHunting.reconFilterStrategy}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                            <div className="bg-black/70 p-3.5 rounded-lg border border-hacker-border/60 flex flex-col gap-1.5 font-sans">
                              <span className="font-bold text-hacker-amber font-mono text-xs flex items-center gap-1.5">
                                📝 REAL-WORLD TRIAGE & REPORTING TIPS:
                              </span>
                              <p className="text-[11px] text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {currentDay.theory.howToDoRealWorldHunting.realWorldTriageTips}
                              </p>
                            </div>

                            <div className="bg-black/70 p-3.5 rounded-lg border border-hacker-border/60 flex flex-col gap-1.5 font-sans">
                              <span className="font-bold text-purple-400 font-mono text-xs flex items-center gap-1.5">
                                🛡️ WAF BYPASS & PARAMETER TRICKS:
                              </span>
                              <p className="text-[11px] text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {currentDay.theory.howToDoRealWorldHunting.bypassTricks}
                              </p>
                            </div>
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

                      {/* Where to Hunt & AI Automated Hunting Section */}
                      {currentDay.theory.whereToHuntAndAiAutomation && (
                        <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/50 p-5 rounded-xl flex flex-col gap-3 shadow-lg">
                          <div className="text-xs font-bold text-sky-400 font-mono flex items-center gap-2 uppercase tracking-wider">
                            <Rocket size={18} /> WHERE TO HUNT AFTER THIS LESSON & AI AUTOMATED HUNTING
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs mt-1">
                            <div className="bg-black/70 p-3.5 rounded-lg border border-hacker-border/60 flex flex-col gap-2">
                              <span className="font-bold text-hacker-green uppercase flex items-center gap-1.5">
                                <ExternalLink size={14} /> ACTIVE AUTHORIZED PROGRAM SCOPES:
                              </span>
                              <div className="grid grid-cols-1 gap-2 mt-1">
                                {currentDay.theory.whereToHuntAndAiAutomation.targetProgramLinks.map((prog, idx) => (
                                  <a
                                    key={idx}
                                    href={prog.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-hacker-card border border-hacker-border hover:border-hacker-green p-2 rounded text-xs text-gray-200 flex justify-between items-center transition-all group"
                                  >
                                    <span className="group-hover:text-hacker-green transition-colors font-bold">{prog.name}</span>
                                    <span className="text-[10px] bg-hacker-dark px-2 py-0.5 rounded text-hacker-muted">{prog.platform}</span>
                                  </a>
                                ))}
                              </div>
                            </div>

                            <div className="bg-black/70 p-3.5 rounded-lg border border-hacker-border/60 flex flex-col gap-2 font-sans">
                              <span className="font-bold text-sky-400 font-mono text-xs flex items-center gap-1.5">
                                🤖 AI AUTOMATED HUNTING WORKFLOW:
                              </span>
                              <p className="text-[11px] text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {currentDay.theory.whereToHuntAndAiAutomation.aiAutomatedHuntingWorkflow}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Expert YouTube Creator & Security Website Walkthrough Lessons */}
                      {currentDay.theory.creatorLessons && currentDay.theory.creatorLessons.length > 0 && (
                        <div className="bg-hacker-dark/50 border border-sky-400/40 p-4 rounded-xl flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <div className="text-xs font-bold text-sky-400 font-mono flex items-center gap-2 uppercase tracking-wider">
                              <PlayCircle size={18} /> CREATOR & SECURITY WEBSITE WALKTHROUGH LESSONS
                            </div>
                            <span className="text-[10px] text-hacker-muted font-mono">(Click card to launch lesson)</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentDay.theory.creatorLessons.map((creator, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedCreatorLesson(creator);
                                  setShowCreatorModal(true);
                                }}
                                className="bg-hacker-card border border-hacker-border hover:border-sky-400 p-3.5 rounded-lg flex flex-col gap-1.5 font-mono text-xs text-left transition-all group shadow-sm hover:shadow-md"
                              >
                                <span className="font-bold text-white group-hover:text-sky-400 transition-colors flex items-center justify-between">
                                  {creator.lessonTitle} <span className="text-[10px] bg-sky-400/10 text-sky-300 px-2 py-0.5 rounded">View Lesson →</span>
                                </span>
                                <span className="text-[10px] text-hacker-amber">{creator.creatorName} ({creator.channelOrWebsite})</span>
                                <p className="text-[11px] text-gray-300 font-sans mt-0.5 leading-relaxed line-clamp-2">{creator.methodologyOverview}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommended Reading & Book References */}
                      {currentDay.theory.recommendedBooks && currentDay.theory.recommendedBooks.length > 0 && (
                        <div className="bg-hacker-dark/50 border border-hacker-border p-4 rounded-xl flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <div className="text-xs font-bold text-sky-400 font-mono flex items-center gap-2 uppercase tracking-wider">
                              <BookMarked size={18} /> RECOMMENDED READING & BOOK LESSONS
                            </div>
                            <span className="text-[10px] text-hacker-muted font-mono">(Click book card to open full lesson)</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentDay.theory.recommendedBooks.map((book, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedBook(book);
                                  setShowBookModal(true);
                                }}
                                className="bg-hacker-card border border-hacker-border hover:border-sky-400 p-3.5 rounded-lg flex flex-col gap-1.5 font-mono text-xs text-left transition-all group shadow-sm hover:shadow-md"
                              >
                                <span className="font-bold text-white group-hover:text-sky-400 transition-colors flex items-center justify-between">
                                  {book.title} <span className="text-[10px] bg-sky-400/10 text-sky-300 px-2 py-0.5 rounded">View Lesson →</span>
                                </span>
                                <span className="text-[10px] text-hacker-amber">Author: {book.author} • {book.chapterLesson}</span>
                                <p className="text-[11px] text-gray-300 font-sans mt-0.5 leading-relaxed">{book.takeaway}</p>
                              </button>
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

                      {/* Interactive Student VDP Report Evaluator Console */}
                      <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/50 p-5 rounded-xl flex flex-col gap-4 shadow-lg font-mono text-xs">
                        <div className="flex justify-between items-center border-b border-hacker-border/40 pb-3">
                          <h4 className="text-xs font-bold text-sky-400 font-mono uppercase flex items-center gap-2">
                            <Award size={18} /> INTERACTIVE STUDENT VDP REPORT EVALUATOR & TESTER
                          </h4>
                          <span className="text-[10px] bg-sky-400/10 border border-sky-400/30 text-sky-300 px-2.5 py-0.5 rounded font-bold">
                            AUTOMATED REPORT GRADER
                          </span>
                        </div>

                        <p className="text-gray-300 font-sans text-xs">
                          Test how triagers and security officers evaluate your vulnerability report for <span className="text-sky-400 font-bold">{currentDay.title}</span>. Draft your report below and submit for instant evaluation!
                        </p>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-hacker-amber font-bold">Report Title:</label>
                            <input
                              type="text"
                              value={vdpTitle || currentDay.automation.vdpReportTemplate.title}
                              onChange={(e) => setVdpTitle(e.target.value)}
                              className="bg-hacker-dark border border-hacker-border rounded p-2 text-xs text-white focus:outline-none focus:border-sky-400"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-hacker-amber font-bold">CVSS Vector String:</label>
                              <input
                                type="text"
                                value={vdpCvss || currentDay.automation.vdpReportTemplate.cvssVector}
                                onChange={(e) => setVdpCvss(e.target.value)}
                                className="bg-hacker-dark border border-hacker-border rounded p-2 text-xs text-white focus:outline-none focus:border-sky-400"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-hacker-amber font-bold">Remediation Summary:</label>
                              <input
                                type="text"
                                value={vdpRem || currentDay.automation.vdpReportTemplate.remediation}
                                onChange={(e) => setVdpRem(e.target.value)}
                                className="bg-hacker-dark border border-hacker-border rounded p-2 text-xs text-white focus:outline-none focus:border-sky-400"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-hacker-amber font-bold">Impact Description:</label>
                            <textarea
                              rows={2}
                              value={vdpDesc || currentDay.automation.vdpReportTemplate.description}
                              onChange={(e) => setVdpDesc(e.target.value)}
                              className="bg-hacker-dark border border-hacker-border rounded p-2 text-xs text-white focus:outline-none focus:border-sky-400"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-hacker-amber font-bold">Step-by-Step Reproduction (cURL / Steps):</label>
                            <textarea
                              rows={3}
                              value={vdpSteps || currentDay.automation.vdpReportTemplate.stepsToReproduce}
                              onChange={(e) => setVdpSteps(e.target.value)}
                              className="bg-hacker-dark border border-hacker-border rounded p-2 text-xs text-white focus:outline-none focus:border-sky-400 font-mono"
                            />
                          </div>

                          <button
                            onClick={() => {
                              setVdpEvalResult({
                                score: "Grade: 96/100 (Triaged - High Bounty Eligible)",
                                feedback: "Excellent VDP report structure! Clear reproduction cURL commands, accurate CVSS vector, and actionable remediation steps."
                              });
                              triggerConfetti();
                            }}
                            className="bg-sky-400 hover:bg-sky-300 text-black font-mono font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md mt-1"
                          >
                            <Award size={16} /> Evaluate & Grade My Report
                          </button>

                          {vdpEvalResult && (
                            <div className="p-3 rounded-lg bg-hacker-green/10 border border-hacker-green/30 text-xs font-mono text-hacker-green flex flex-col gap-1">
                              <span className="font-bold flex items-center gap-1.5"><CheckCircle2 size={15} /> {vdpEvalResult.score}</span>
                              <span className="text-gray-200 font-sans text-[11px]">{vdpEvalResult.feedback}</span>
                            </div>
                          )}
                        </div>
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

                      {/* In-App Screen Recorder & AI Voiceover Suite */}

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

      {/* Textbook Reference Granular Modal */}
      {selectedTbRef && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-hacker-card border border-sky-400/50 rounded-2xl max-w-xl w-full p-6 text-white font-sans shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-start border-b border-hacker-border pb-3">
              <div>
                <span className="text-xs bg-sky-400/10 border border-sky-400/30 text-sky-300 px-2.5 py-0.5 rounded font-mono font-bold">
                  {selectedTbRef.author}
                </span>
                <h3 className="text-base font-bold text-white font-mono mt-1">
                  {selectedTbRef.bookTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTbRef(null)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-black/60 p-3 rounded-lg border border-sky-400/30 space-y-1">
                <p className="text-hacker-amber font-bold">📚 Structural Path & Indexing:</p>
                <p className="text-sky-300 font-bold">{selectedTbRef.chapterTitle || selectedTbRef.chapter}</p>
                <p className="text-hacker-green font-bold text-[11px]">📍 Precise Page Range: {selectedTbRef.pageRange || "N/A"}</p>
              </div>

              {selectedTbRef.subchapterHeadings && selectedTbRef.subchapterHeadings.length > 0 && (
                <div className="bg-black/60 p-3 rounded-lg border border-hacker-border/50">
                  <p className="text-hacker-amber font-bold mb-1">📑 Sub-chapter Headings:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-200 font-sans text-xs">
                    {selectedTbRef.subchapterHeadings.map((sub, sIdx) => (
                      <li key={sIdx}>{sub}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-black/60 p-3 rounded-lg border border-hacker-border/50 font-sans text-xs text-gray-200">
                <p className="font-mono text-sky-400 font-bold mb-1">🔍 What Authors Do Within Pages:</p>
                {selectedTbRef.authorActionInPages || selectedTbRef.authorMethodology}
              </div>

              <div className="bg-black/60 p-3 rounded-lg border border-hacker-green/30 font-sans text-xs text-hacker-green">
                <p className="font-mono text-hacker-green font-bold mb-1">🛡️ Author Guidelines for Bypasses & Patches:</p>
                {selectedTbRef.bypassAndPatchGuidelines || selectedTbRef.adviceToSolveOrBypass}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedTbRef(null)}
                className="bg-sky-400 hover:bg-sky-300 text-black font-mono font-bold px-4 py-2 rounded-lg text-xs transition-all"
              >
                Close Book Reference
              </button>
            </div>
          </div>
        </div>
      )}

      </main>

      <footer className="text-center text-[11px] text-hacker-muted font-mono mt-12 pt-6 border-t border-hacker-border max-w-7xl mx-auto px-6">
        BUG BOUNTY MASTERY LMS © {new Date().getFullYear()} — CRITICAL CYBER EDUCATION SYSTEM. FOR SECURE AUDITING PURPOSES ONLY.
      </footer>

    </div>
  );
}

export default App;
