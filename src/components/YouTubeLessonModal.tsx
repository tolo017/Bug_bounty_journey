import React from "react";
import { CreatorLesson } from "../types/curriculum";
import { PlayCircle, X, ExternalLink, ShieldCheck, Terminal, Code2, BookOpen } from "lucide-react";

interface YouTubeLessonModalProps {
  lesson: CreatorLesson | null;
  isOpen: boolean;
  onClose: () => void;
  dayTitle: string;
}

export const YouTubeLessonModal: React.FC<YouTubeLessonModalProps> = ({
  lesson,
  isOpen,
  onClose,
  dayTitle
}) => {
  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-sky-400/60 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl flex flex-col gap-6 font-sans max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-hacker-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/40 flex items-center justify-center shrink-0">
              <PlayCircle size={24} className="text-sky-400 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-wider">
                EXPERT CREATOR WALKTHROUGH • {dayTitle}
              </div>
              <h2 className="text-lg font-bold text-white font-mono mt-0.5">{lesson.lessonTitle}</h2>
              <p className="text-xs text-hacker-amber font-mono">{lesson.creatorName} ({lesson.channelOrWebsite})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-hacker-dark border border-hacker-border hover:border-red-500/50 text-hacker-muted hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Direct Specific Video Link Header */}
        <div className="bg-sky-400/10 border border-sky-400/30 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-sky-300 font-bold">
            <PlayCircle size={18} /> SPECIFIC TUTORIAL VIDEO LESSON
          </div>
          <a
            href={lesson.specificVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-400 hover:bg-sky-300 text-black font-mono font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow"
          >
            <ExternalLink size={14} /> Watch Full Video ({lesson.creatorName}) →
          </a>
        </div>

        {/* Broad Lesson & Attack Vector Explanation */}
        <div className="bg-hacker-dark border border-hacker-border p-4.5 rounded-xl flex flex-col gap-2 font-sans">
          <div className="text-xs font-bold text-hacker-amber font-mono flex items-center gap-1.5 uppercase">
            <BookOpen size={16} /> BROAD LESSON & ATTACK VECTOR EXPLANATION
          </div>
          <p className="text-xs text-gray-200 leading-relaxed font-sans whitespace-pre-wrap">
            {lesson.broadExplanation}
          </p>
        </div>

        {/* Methodology Overview */}
        <div className="bg-hacker-dark/90 border border-hacker-border p-4.5 rounded-xl flex flex-col gap-2 font-sans">
          <div className="text-xs font-bold text-sky-400 font-mono flex items-center gap-1.5 uppercase">
            <ShieldCheck size={15} /> AUDITING METHODOLOGY OVERVIEW
          </div>
          <p className="text-xs text-gray-200 leading-relaxed font-sans">
            {lesson.methodologyOverview}
          </p>
        </div>

        {/* Step-by-step Walkthrough Checklist */}
        <div className="bg-slate-950 border border-hacker-border p-4 rounded-xl flex flex-col gap-2 font-mono text-xs">
          <div className="font-bold text-hacker-amber flex items-center gap-1.5">
            <Terminal size={15} /> STEP-BY-STEP AUDITING PROCEDURE:
          </div>
          <div className="flex flex-col gap-1.5 mt-1 font-sans text-xs text-gray-300">
            {lesson.stepByStepWalkthrough.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-hacker-card p-2 rounded border border-hacker-border/40 font-mono">
                <span className="text-sky-400 font-bold">•</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Command / Script */}
        <div className="bg-black/80 border border-hacker-border p-4 rounded-xl flex flex-col gap-2 font-mono">
          <div className="text-xs font-bold text-hacker-green flex items-center gap-1.5">
            <Code2 size={15} /> PRACTICAL COMMAND LINE EXAMPLE
          </div>
          <pre className="bg-slate-950 p-3 rounded border border-hacker-border/40 text-xs text-hacker-green overflow-x-auto whitespace-pre-wrap">
            <code>{lesson.practicalCommand}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-hacker-border pt-4">
          <button
            onClick={onClose}
            className="bg-sky-400 hover:bg-sky-300 text-black font-mono font-bold text-xs px-6 py-2 rounded-lg transition-all"
          >
            Return to Lesson Workspace
          </button>
        </div>

      </div>
    </div>
  );
};
