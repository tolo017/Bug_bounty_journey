import React from "react";
import { BookLesson } from "../types/curriculum";
import { BookOpen, X, Sparkles, CheckCircle, Terminal, Code2 } from "lucide-react";

interface BookLessonModalProps {
  book: BookLesson | null;
  isOpen: boolean;
  onClose: () => void;
  dayTitle: string;
}

export const BookLessonModal: React.FC<BookLessonModalProps> = ({
  book,
  isOpen,
  onClose,
  dayTitle
}) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-sky-400/60 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl flex flex-col gap-6 font-sans max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-hacker-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/40 flex items-center justify-center shrink-0">
              <BookOpen size={24} className="text-sky-400" />
            </div>
            <div>
              <div className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-wider">
                RECOMMENDED BOOK LESSON • {dayTitle}
              </div>
              <h2 className="text-lg font-bold text-white font-mono mt-0.5">{book.title}</h2>
              <p className="text-xs text-hacker-amber font-mono">Author: {book.author}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-hacker-dark border border-hacker-border hover:border-red-500/50 text-hacker-muted hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chapter Title Badge */}
        <div className="bg-sky-400/10 border border-sky-400/30 p-3.5 rounded-xl font-mono text-xs flex items-center justify-between">
          <span className="font-bold text-sky-300">{book.chapterLesson}</span>
          <span className="text-[10px] bg-sky-400/20 text-sky-200 px-2.5 py-0.5 rounded">ACTIVE TOPIC LESSON</span>
        </div>

        {/* Detailed Chapter Explanation */}
        <div className="bg-hacker-dark border border-hacker-border p-4.5 rounded-xl flex flex-col gap-2.5 font-sans">
          <div className="text-xs font-bold text-hacker-amber font-mono flex items-center gap-1.5 uppercase">
            <Sparkles size={15} /> DETAILED LESSON EXPLANATION FROM BOOK
          </div>
          <p className="text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">
            {book.detailedExplanation}
          </p>
        </div>

        {/* Practical Example Snippet */}
        <div className="bg-black/80 border border-hacker-border p-4 rounded-xl flex flex-col gap-2 font-mono">
          <div className="text-xs font-bold text-hacker-green flex items-center gap-1.5">
            <Code2 size={15} /> PRACTICAL CODE / COMMAND EXAMPLE
          </div>
          <pre className="bg-slate-950 p-3 rounded border border-hacker-border/40 text-xs text-hacker-green overflow-x-auto whitespace-pre-wrap">
            <code>{book.practicalExample}</code>
          </pre>
        </div>

        {/* Key Lesson Takeaway */}
        <div className="bg-hacker-dark/80 border border-hacker-green/30 p-4 rounded-xl flex flex-col gap-1.5 font-mono text-xs">
          <div className="font-bold text-hacker-green flex items-center gap-1.5">
            <CheckCircle size={15} /> KEY ACADEMY TAKEAWAY
          </div>
          <p className="text-gray-300 font-sans text-xs">{book.takeaway}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-hacker-border pt-4">
          <button
            onClick={onClose}
            className="bg-sky-400 hover:bg-sky-300 text-black font-mono font-bold text-xs px-6 py-2 rounded-lg transition-all"
          >
            Return to Lesson
          </button>
        </div>

      </div>
    </div>
  );
};
