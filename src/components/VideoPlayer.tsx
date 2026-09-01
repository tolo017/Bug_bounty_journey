import React, { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles, Clock, CheckCircle, ShieldCheck, Film } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  duration: string;
  methodologySummary: string;
  competency: string;
  embedId?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  duration,
  methodologySummary,
  competency,
  embedId
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useInteractiveView, setUseInteractiveView] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Reliable educational cybersecurity YouTube embed IDs
  const knownEmbedIds: Record<string, string> = {
    "DOM Clobbering & Document Object Manipulation": "2_s393XkR8A",
    "Client-Side Prototype Pollution in Wild JS Files": "0O_A4S3a738",
    "Source Map Reconstruction & JS Deobfuscation": "3Kq1MIfTWCE",
    "Client-Side Storage Abuse (XSS via LocalStorage)": "4m6n02y0_6c",
    "WebSocket Message Manipulation & Race Conditions": "YVf1wZ_8u3A",
    "CORS Misconfigurations & Origin Reflection": "43OVqL_pI9s"
  };

  const activeEmbedId = embedId || knownEmbedIds[title] || "2_s393XkR8A";

  const handleStartVideo = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setCompleted(true);
    }, 5000);
  };

  return (
    <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/40 rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-xl font-sans">

      {/* Video Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-hacker-border/40 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center shrink-0">
            <Film size={16} className="text-sky-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-mono">{title}</h3>
            <p className="text-[10px] text-hacker-muted font-mono uppercase">Simplified Cybersecurity Video Walkthrough • {competency}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseInteractiveView(!useInteractiveView)}
            className="text-[10px] bg-hacker-card border border-hacker-border hover:border-sky-400 text-sky-300 px-2.5 py-1 rounded font-mono"
          >
            {useInteractiveView ? "Switch to Video Walkthrough" : "Switch to Terminal View"}
          </button>

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

      {/* Video Stream Container */}
      <div className="relative aspect-video bg-black rounded-lg border border-hacker-border overflow-hidden flex flex-col justify-between group shadow-2xl">

        {!useInteractiveView && !iframeError ? (
          isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeEmbedId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setIframeError(true)}
            />
          ) : (
            /* Custom Cybersecurity Video Cover Screen */
            <div
              onClick={handleStartVideo}
              className="w-full h-full bg-gradient-to-br from-slate-950 via-sky-950 to-black p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden group/screen"
            >
              <div className="flex justify-between items-center z-10 font-mono text-xs">
                <span className="text-sky-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck size={16} /> CYBERSECURITY WALKTHROUGH LECTURE
                </span>
                <span className="text-hacker-amber bg-hacker-amber/10 border border-hacker-amber/30 px-2.5 py-0.5 rounded">
                  HD LESSON VIDEO
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="flex flex-col items-center justify-center gap-3 z-10 my-auto">
                <button className="w-16 h-16 rounded-full bg-sky-500/20 border-2 border-sky-400 text-sky-300 flex items-center justify-center group-hover/screen:scale-110 transition-all shadow-2xl">
                  <Play size={28} className="ml-1" />
                </button>
                <div className="text-center font-mono">
                  <div className="text-sm font-bold text-white">{title}</div>
                  <div className="text-xs text-sky-300 mt-1">Click to launch cybersecurity video walkthrough on {competency}</div>
                </div>
              </div>

              <div className="text-[10px] text-hacker-muted font-mono z-10 flex justify-between">
                <span>Simplified Academy Tutorial Video</span>
                <span>Click to launch stream</span>
              </div>
            </div>
          )
        ) : (
          /* Animated High-Tech Terminal Presentation Stream */
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-sky-950 to-black p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center z-10 font-mono text-xs">
              <span className="text-sky-400 font-bold flex items-center gap-1.5">
                <ShieldCheck size={16} /> ACADEMY TERMINAL PRESENTATION STREAM
              </span>
              <span className="text-hacker-amber bg-hacker-amber/10 border border-hacker-amber/30 px-2.5 py-0.5 rounded">
                1080P HD
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 z-10 my-auto">
              <div className="text-center font-mono">
                <div className="text-sm font-bold text-white">{title}</div>
                <div className="text-xs text-sky-300 mt-1">Audit Skill: {competency}</div>
              </div>

              <div className="flex items-center gap-1.5 my-2">
                <div className="w-1.5 h-8 bg-sky-400 animate-pulse rounded-full"></div>
                <div className="w-1.5 h-12 bg-hacker-green animate-pulse rounded-full delay-100"></div>
                <div className="w-1.5 h-6 bg-hacker-amber animate-pulse rounded-full delay-200"></div>
                <div className="w-1.5 h-10 bg-sky-400 animate-pulse rounded-full delay-150"></div>
                <div className="w-1.5 h-7 bg-hacker-green animate-pulse rounded-full delay-300"></div>
              </div>
            </div>

            <div className="text-[10px] text-hacker-muted font-mono z-10 flex justify-between">
              <span>Simplified Cybersecurity Walkthrough</span>
              <span>Active</span>
            </div>
          </div>
        )}

      </div>

      {/* Structured Lecture Summary & Notes */}
      <div className="bg-hacker-dark/80 border border-hacker-border/60 p-3.5 rounded-lg flex flex-col gap-1.5">
        <span className="text-[10px] font-bold text-sky-400 font-mono uppercase">
          LECTURE SYNOPSIS & SIMPLIFIED LESSON NOTES:
        </span>
        <p className="text-xs text-gray-200 leading-relaxed font-sans">
          {methodologySummary}
        </p>
      </div>

    </div>
  );
};
