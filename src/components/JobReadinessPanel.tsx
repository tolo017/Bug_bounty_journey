import React from "react";
import { Award, Briefcase, Code, FileText, CheckCircle2 } from "lucide-react";

interface JobReadinessProps {
  score: number;
  practical: number;
  commits: number;
  reports: number;
  competencies: { name: string; score: number }[];
}

export const JobReadinessPanel: React.FC<JobReadinessProps> = ({
  score,
  practical,
  commits,
  reports,
  competencies
}) => {
  // Determine readiness category
  const getReadinessLabel = (score: number) => {
    if (score >= 90) return { text: "Battle Tested / Direct Hire", color: "text-hacker-green" };
    if (score >= 70) return { text: "Strong Candidate / Interview Ready", color: "text-emerald-400" };
    if (score >= 40) return { text: "Junior / VDP Eligible", color: "text-hacker-amber" };
    return { text: "In Training", color: "text-hacker-muted" };
  };

  const label = getReadinessLabel(score);

  return (
    <div className="bg-hacker-card border border-hacker-border rounded-xl p-5 shadow-lg flex flex-col gap-6">

      {/* Dynamic Main Gauge */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Briefcase size={18} className="text-hacker-amber" /> JOB READINESS METRIC
          </h3>
          <span className={`text-xs font-mono font-bold uppercase ${label.color}`}>
            {label.text}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            {/* Circular representation in dashboard */}
            <div className="w-16 h-16 rounded-full border-4 border-hacker-dark flex items-center justify-center font-mono font-bold text-lg text-white">
              {score}%
              {/* Overlay ring border */}
              <div
                className="absolute inset-0 rounded-full border-4 border-hacker-amber animate-pulse"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${score}%, 0 ${score}%)`,
                  opacity: 0.3
                }}
              ></div>
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full bg-hacker-dark h-3 rounded-full overflow-hidden border border-hacker-border">
              <div
                className="bg-gradient-to-r from-red-500 via-hacker-amber to-hacker-green h-full rounded-full transition-all duration-700"
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-hacker-muted mt-2">
              Weighted algorithm evaluates technical precision (40% practical labs), tool builds (30% GitHub commits), and compliance documentation (30% VDP reporting tasks).
            </p>
          </div>
        </div>
      </div>

      {/* Structured Category Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category 1: Practical Labs */}
        <div className="bg-hacker-dark border border-hacker-border p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white flex items-center gap-1">
              <Award size={13} className="text-hacker-green" /> Labs (40%)
            </span>
            <span className="text-xs font-mono font-bold text-hacker-green">{practical}%</span>
          </div>
          <div className="w-full bg-hacker-card h-1.5 rounded-full overflow-hidden">
            <div className="bg-hacker-green h-full" style={{ width: `${practical}%` }}></div>
          </div>
        </div>

        {/* Category 2: Tool Automation Commits */}
        <div className="bg-hacker-dark border border-hacker-border p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white flex items-center gap-1">
              <Code size={13} className="text-hacker-amber" /> GitHub Commits (30%)
            </span>
            <span className="text-xs font-mono font-bold text-hacker-amber">{commits}%</span>
          </div>
          <div className="w-full bg-hacker-card h-1.5 rounded-full overflow-hidden">
            <div className="bg-hacker-amber h-full" style={{ width: `${commits}%` }}></div>
          </div>
        </div>

        {/* Category 3: Enterprise Reporting */}
        <div className="bg-hacker-dark border border-hacker-border p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white flex items-center gap-1">
              <FileText size={13} className="text-sky-400" /> VDP Reporting (30%)
            </span>
            <span className="text-xs font-mono font-bold text-sky-400">{reports}%</span>
          </div>
          <div className="w-full bg-hacker-card h-1.5 rounded-full overflow-hidden">
            <div className="bg-sky-400 h-full" style={{ width: `${reports}%` }}></div>
          </div>
        </div>
      </div>

      {/* Corporate Competencies achieved */}
      <div>
        <h4 className="text-xs font-bold text-hacker-amber mb-3 tracking-widest font-mono uppercase">
          CORPORATE COMPETENCY GAUGES
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {competencies.map((comp) => (
            <div key={comp.name} className="bg-hacker-dark/50 border border-hacker-border/70 p-3 rounded-lg flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-300 truncate max-w-[80%]" title={comp.name}>
                  {comp.name}
                </span>
                <span className={`text-[11px] font-mono font-bold ${comp.score > 75 ? 'text-hacker-green' : comp.score > 40 ? 'text-hacker-amber' : 'text-hacker-muted'}`}>
                  {comp.score}%
                </span>
              </div>
              <div className="w-full bg-hacker-card h-1 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    comp.score > 75
                      ? 'bg-hacker-green'
                      : comp.score > 40
                        ? 'bg-hacker-amber'
                        : 'bg-hacker-muted'
                  }`}
                  style={{ width: `${comp.score}%` }}
                ></div>
              </div>
              {comp.score >= 100 && (
                <div className="flex items-center gap-1 text-[9px] text-hacker-green mt-0.5">
                  <CheckCircle2 size={10} /> Certified Expert
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
