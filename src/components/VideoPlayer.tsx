import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Clock, CheckCircle, ShieldCheck, Terminal, Cpu, FileText, ChevronRight, BookOpen } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  duration: string;
  methodologySummary: string;
  competency: string;
  whatYouAreDoing: string;
  vulnerabilityOrigin: string;
  pentesterFocus: string;
  payloadCrafting: string;
  burpSuiteSetup: string;
  blueTeamDefense: string;
  labLink?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  duration,
  methodologySummary,
  competency,
  whatYouAreDoing,
  vulnerabilityOrigin,
  pentesterFocus,
  payloadCrafting,
  burpSuiteSetup,
  blueTeamDefense,
  labLink
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // 5 Dedicated AI Video Walkthrough Chapters for the lesson
  const chapters = [
    {
      id: 0,
      title: "1. Overview & What You Are Learning",
      icon: BookOpen,
      badgeColor: "text-sky-400 bg-sky-400/10 border-sky-400/30",
      content: whatYouAreDoing || methodologySummary
    },
    {
      id: 1,
      title: "2. Red Team Exploitation vs Blue Team Defense",
      icon: ShieldCheck,
      badgeColor: "text-hacker-amber bg-hacker-amber/10 border-hacker-amber/30",
      content: `RED TEAM EXPLOIT METHODOLOGY:\n${vulnerabilityOrigin}\n\nBLUE TEAM DEFENSE & SECURE CODING:\n${blueTeamDefense}`
    },
    {
      id: 2,
      title: "3. Vulnerability Detection & Code Audit Checklist",
      icon: Terminal,
      badgeColor: "text-hacker-green bg-hacker-green/10 border-hacker-green/30",
      content: pentesterFocus
    },
    {
      id: 3,
      title: "4. Payload Crafting & Burp Suite Proxy Setup",
      icon: Cpu,
      badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/30",
      content: `${payloadCrafting}\n\nBURP SUITE REPEATER CONFIGURATION:\n${burpSuiteSetup}`
    },
    {
      id: 4,
      title: "5. PortSwigger Practical Lab & Flag Walkthrough",
      icon: FileText,
      badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
      content: `PRACTICAL LAB WALKTHROUGH:\n1. Launch the interactive Digital Arena playground below.\n2. Review target code execution paths and payload requirements.\n3. Execute custom payload in local terminal shell and copy captured flag.\n4. Access external PortSwigger reference lab: ${labLink || "https://portswigger.net/web-security"}`
    }
  ];

  const speakText = (text: string) => {
    if (synth && isAudioEnabled) {
      synth.cancel(); // Stop current speech
      const cleanText = text.replace(/[\*\#\`\_]/g, " ").slice(0, 300);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      synth.speak(utterance);
    }
  };

  const handlePlayPause = () => {
    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);

    if (nextPlayState) {
      speakText(chapters[currentChapter].content);
    } else if (synth) {
      synth.cancel();
    }
  };

  const handleChapterSelect = (chapterIdx: number) => {
    setCurrentChapter(chapterIdx);
    setProgress((chapterIdx / (chapters.length - 1)) * 100);
    if (isPlaying) {
      speakText(chapters[chapterIdx].content);
    }
  };

  // Automatic video progress timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setCompleted(true);
            if (synth) synth.cancel();
            return 100;
          }
          const nextVal = prev + 2;
          const nextChapter = Math.min(4, Math.floor((nextVal / 100) * 5));
          if (nextChapter !== currentChapter) {
            setCurrentChapter(nextChapter);
          }
          return nextVal;
        });
      }, 800);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentChapter, synth]);

  const activeChapterObj = chapters[currentChapter];
  const ActiveIcon = activeChapterObj.icon;

  return (
    <div className="bg-gradient-to-r from-slate-950 via-hacker-card to-hacker-dark border border-sky-400/50 rounded-2xl p-4 sm:p-6 flex flex-col gap-5 shadow-2xl font-sans">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-hacker-border/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/40 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-sky-400/20 border border-sky-400/40 text-sky-300 px-2 py-0.5 rounded font-mono font-bold uppercase">
                AI VIDEO WALKTHROUGH LECTURE
              </span>
              <span className="text-[10px] text-hacker-amber font-mono font-bold">1080P HD</span>
            </div>
            <h3 className="text-sm font-bold text-white font-mono mt-0.5">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-hacker-dark border border-hacker-border text-sky-300 px-3 py-1 rounded font-mono flex items-center gap-1.5">
            <Clock size={13} /> {duration} FULL LECTURE
          </span>
          {completed && (
            <span className="text-xs bg-hacker-green/10 border border-hacker-green/30 text-hacker-green px-3 py-1 rounded font-mono font-bold flex items-center gap-1.5">
              <CheckCircle size={13} /> Completed
            </span>
          )}
        </div>
      </div>

      {/* Main AI Video Screen Presentation Overlay */}
      <div className="relative aspect-video bg-black/95 rounded-xl border border-hacker-border overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl group">

        {/* Top Video Overlay Controls */}
        <div className="flex justify-between items-center z-20 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-red-500 animate-ping" : "bg-hacker-muted"}`}></span>
            <span className="text-sky-400 font-bold tracking-wider">
              {isPlaying ? "● STREAMING AI LECTURE VIDEO" : "PAUSED"}
            </span>
          </div>

          <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold uppercase ${activeChapterObj.badgeColor}`}>
            {activeChapterObj.title}
          </span>
        </div>

        {/* Center AI Presenter Screen Content */}
        <div className="my-auto z-20 flex flex-col gap-3 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold uppercase">
            <ActiveIcon size={18} /> {activeChapterObj.title}
          </div>

          <div className="bg-slate-900/90 border border-hacker-border/80 p-4 sm:p-5 rounded-xl shadow-xl backdrop-blur-md">
            <pre className="font-mono text-xs text-gray-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
              <code>{activeChapterObj.content}</code>
            </pre>
          </div>
        </div>

        {/* Center Play Button Overlay when Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-30">
            <button
              onClick={handlePlayPause}
              className="w-20 h-20 rounded-full bg-sky-500/20 border-2 border-sky-400 text-sky-300 flex items-center justify-center hover:scale-110 transition-all shadow-2xl"
            >
              <Play size={36} className="ml-1" />
            </button>
          </div>
        )}

        {/* Bottom Custom Video Controls Bar */}
        <div className="z-20 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-hacker-border/60 flex flex-col gap-2 font-mono text-xs">

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const val = Number(e.target.value);
              setProgress(val);
              const chapterIdx = Math.min(4, Math.floor((val / 100) * 5));
              setCurrentChapter(chapterIdx);
            }}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayPause}
                className="bg-sky-400/20 hover:bg-sky-400 text-sky-300 hover:text-black border border-sky-400/40 p-1.5 rounded transition-all"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={() => {
                  const nextAudio = !isAudioEnabled;
                  setIsAudioEnabled(nextAudio);
                  if (!nextAudio && synth) synth.cancel();
                }}
                className={`p-1.5 rounded border transition-all ${
                  isAudioEnabled
                    ? "bg-hacker-green/20 text-hacker-green border-hacker-green/40"
                    : "bg-hacker-dark text-hacker-muted border-hacker-border"
                }`}
                title="AI Speech Voiceover Audio"
              >
                {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <span className="text-[11px] text-hacker-muted">
                Chapter {currentChapter + 1} of 5 • {duration} Lecture
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-hacker-green font-bold">AI NARRATIVE SYNTHESIS ACTIVE</span>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive 5-Chapter Navigation Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs">
        {chapters.map((ch, idx) => {
          const ChIcon = ch.icon;
          const isActive = currentChapter === idx;
          return (
            <button
              key={ch.id}
              onClick={() => handleChapterSelect(idx)}
              className={`p-2.5 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                isActive
                  ? "bg-sky-400 text-black border-sky-400 font-bold shadow-md"
                  : "bg-hacker-dark border-hacker-border/80 text-gray-300 hover:border-sky-400/50"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px]">
                <ChIcon size={14} />
                <span className="truncate">{ch.title.split(" ")[0]}</span>
              </div>
              <span className="text-[10px] opacity-80 truncate">{ch.title.split(" ").slice(1).join(" ")}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
