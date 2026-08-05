import React from "react";
import { Week } from "../types/curriculum";
import { Lock, Unlock, CheckCircle2, ChevronRight, Terminal, Award } from "lucide-react";

interface SidebarProps {
  weeks: Week[];
  selectedWeekIndex: number;
  selectedDayId: string;
  viewingBossLab: boolean;
  onSelectWeek: (idx: number) => void;
  onSelectDay: (dayId: string) => void;
  onSelectBossLab: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  weeks,
  selectedWeekIndex,
  selectedDayId,
  viewingBossLab,
  onSelectWeek,
  onSelectDay,
  onSelectBossLab
}) => {
  const currentWeek = weeks[selectedWeekIndex];

  return (
    <div className="w-full lg:w-80 bg-hacker-card border border-hacker-border rounded-xl p-4 flex flex-col gap-6 shadow-lg">

      {/* Week Selector Grid */}
      <div>
        <h3 className="text-xs font-mono font-bold tracking-widest text-hacker-amber mb-3 uppercase flex items-center gap-1">
          <Terminal size={14} /> Week Selection
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {weeks.map((w, idx) => {
            const isSelected = selectedWeekIndex === idx;
            return (
              <button
                key={w.weekNumber}
                onClick={() => w.unlocked && onSelectWeek(idx)}
                disabled={!w.unlocked}
                className={`p-2 rounded-lg text-center font-mono text-sm font-bold border transition-all flex flex-col items-center justify-center relative ${
                  isSelected
                    ? "bg-hacker-amber text-black border-hacker-amber shadow-md scale-105"
                    : w.unlocked
                      ? "bg-hacker-dark border-hacker-border text-white hover:border-hacker-amber"
                      : "bg-hacker-dark/30 border-hacker-border/30 text-hacker-muted cursor-not-allowed opacity-50"
                }`}
                title={w.title}
              >
                <span>W{w.weekNumber}</span>
                {w.completed && (
                  <span className="absolute top-0.5 right-0.5 text-[8px] text-hacker-green">★</span>
                )}
                {!w.unlocked && (
                  <Lock size={10} className="absolute bottom-0.5 right-0.5 text-hacker-muted" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Week Meta */}
      {currentWeek && (
        <div className="bg-hacker-dark/50 border border-hacker-border p-3 rounded-lg">
          <div className="text-[10px] font-mono text-hacker-amber uppercase tracking-wider">ACTIVE SYLLABUS</div>
          <h4 className="font-bold text-sm text-white mt-1 leading-snug">{currentWeek.title}</h4>
        </div>
      )}

      {/* Week Day & Boss Lab Navigation */}
      <div>
        <h3 className="text-xs font-mono font-bold tracking-widest text-hacker-amber mb-3 uppercase flex items-center gap-1">
          <Terminal size={14} /> Lesson Tracks
        </h3>
        <div className="flex flex-col gap-1.5">
          {currentWeek?.days.map((day) => {
            const isSelected = !viewingBossLab && selectedDayId === day.id;
            return (
              <button
                key={day.id}
                onClick={() => day.unlocked && onSelectDay(day.id)}
                disabled={!day.unlocked}
                className={`w-full p-2.5 rounded-lg text-left border flex items-center justify-between transition-all font-mono text-xs ${
                  isSelected
                    ? "bg-hacker-dark border-hacker-amber text-hacker-amber font-semibold shadow-inner pl-4"
                    : day.unlocked
                      ? "bg-hacker-dark border-hacker-border/70 text-gray-300 hover:border-hacker-amber hover:text-white"
                      : "bg-hacker-dark/10 border-hacker-border/20 text-hacker-muted cursor-not-allowed opacity-40"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {day.completed ? (
                    <CheckCircle2 size={13} className="text-hacker-green shrink-0" />
                  ) : day.unlocked ? (
                    <Unlock size={13} className="text-gray-400 shrink-0" />
                  ) : (
                    <Lock size={13} className="text-hacker-muted shrink-0" />
                  )}
                  <span className="truncate">
                    {day.dayName} - {day.title}
                  </span>
                </div>
                {day.unlocked && <ChevronRight size={12} className="text-hacker-muted shrink-0" />}
              </button>
            );
          })}

          {/* Boss Lab Navigation */}
          {currentWeek && (
            <button
              onClick={() => onSelectBossLab()}
              className={`w-full mt-3 p-3 rounded-xl border flex items-center justify-between transition-all font-mono text-xs font-bold ${
                viewingBossLab
                  ? "bg-hacker-dark border-hacker-green text-hacker-green shadow-inner"
                  : "bg-hacker-dark/80 border-hacker-border text-gray-200 hover:border-hacker-green hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Award size={15} className={currentWeek.bossLab.completed ? "text-hacker-green" : "text-hacker-amber"} />
                <span className="truncate">
                  BOSS CHALLENGE: {currentWeek.bossLab.title}
                </span>
              </div>
              {currentWeek.bossLab.completed && (
                <CheckCircle2 size={13} className="text-hacker-green shrink-0" />
              )}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
