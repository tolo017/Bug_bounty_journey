import React, { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Shield, Sparkles, Clock, CheckCircle } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  duration: string;
  methodologySummary: string;
  competency: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  duration,
  methodologySummary,
  competency
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => {
        setCompleted(true);
      }, 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/40 rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-xl">

      {/* Video Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-hacker-border/40 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center">
            <Sparkles size={16} className="text-sky-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-mono">{title}</h3>
            <p className="text-[10px] text-hacker-muted font-mono uppercase">Mastery Methodology Breakdown • {competency}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-sky-400/10 border border-sky-400/30 text-sky-300 px-2.5 py-1 rounded font-mono flex items-center gap-1">
            <Clock size={12} /> {duration} LECTURE
          </span>
          {completed && (
            <span className="text-[10px] bg-hacker-green/10 border border-hacker-green/30 text-hacker-green px-2.5 py-1 rounded font-mono font-bold flex items-center gap-1">
              <CheckCircle size={12} /> Watched
            </span>
          )}
        </div>
      </div>

      {/* Video Screen Overlay Container */}
      <div className="relative aspect-video bg-black/90 rounded-lg border border-hacker-border overflow-hidden flex flex-col justify-between p-4 group">

        {/* Top Video Overlay Stats */}
        <div className="flex justify-between items-center z-10">
          <span className="text-[10px] bg-black/70 backdrop-blur-md border border-hacker-border/60 text-sky-400 px-2.5 py-1 rounded font-mono">
            REC • ACADEMY LECTURE HD
          </span>
          <span className="text-[10px] bg-black/70 backdrop-blur-md border border-hacker-border/60 text-hacker-amber px-2.5 py-1 rounded font-mono">
            AUDIT SKILL: {competency.toUpperCase()}
          </span>
        </div>

        {/* Center Play Button Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <button
            onClick={togglePlay}
            className={`w-16 h-16 rounded-full border-2 transition-all flex items-center justify-center shadow-2xl ${
              isPlaying
                ? "bg-hacker-amber/20 border-hacker-amber text-hacker-amber scale-105"
                : "bg-sky-400/20 border-sky-400 text-sky-300 hover:scale-110"
            }`}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            {isPlaying ? "SIMULATING STREAM... (CLICK TO PAUSE)" : "CLICK TO PLAY METHODOLOGY LECTURE"}
          </span>
        </div>

        {/* Bottom Video Controls Bar */}
        <div className="flex justify-between items-center z-10 bg-black/80 backdrop-blur-md p-2 rounded border border-hacker-border/60 font-mono text-xs">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-sky-400 hover:text-white">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={() => setIsMuted(!isMuted)} className="text-hacker-muted hover:text-white">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span className="text-[10px] text-hacker-muted">
              {isPlaying ? "03:45 / " : "00:00 / "}{duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-hacker-green font-bold">HIGH DEFINITION</span>
            <Maximize size={14} className="text-hacker-muted cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>

      {/* Structured Methodology Summary */}
      <div className="bg-hacker-dark/80 border border-hacker-border/60 p-3.5 rounded-lg flex flex-col gap-1.5 font-sans">
        <span className="text-[10px] font-bold text-sky-400 font-mono uppercase">
          LECTURE SYNOPSIS & METHODOLOGY SUMMARY:
        </span>
        <p className="text-xs text-gray-200 leading-relaxed">
          {methodologySummary}
        </p>
      </div>

    </div>
  );
};
