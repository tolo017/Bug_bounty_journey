import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles, Clock, CheckCircle, ShieldCheck } from "lucide-react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [useFallbackPlayer, setUseFallbackPlayer] = useState(false);

  // Reliable CORS-enabled media stream URLs
  const videoSources = [
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    "https://vjs.zencdn.net/v/oceans.mp4"
  ];

  const videoUrl = videoSources[title.length % videoSources.length];

  const handlePlayPause = () => {
    if (useFallbackPlayer) {
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        setTimeout(() => setCompleted(true), 3000);
      }
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.warn("Media playback error, switching to Academy HD Lecture Simulation Stream:", err);
              setUseFallbackPlayer(true);
              setIsPlaying(true);
            });
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      const pct = (current / total) * 100;
      setProgress(pct);
      if (pct > 90 && !completed) {
        setCompleted(true);
      }
    }
  };

  // Simulated progress when fallback player is active
  useEffect(() => {
    let interval: any;
    if (useFallbackPlayer && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setCompleted(true);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [useFallbackPlayer, isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProgress(val);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/40 rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-xl font-sans">

      {/* Video Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-hacker-border/40 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-sky-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-mono">{title}</h3>
            <p className="text-[10px] text-hacker-muted font-mono uppercase">Mastery Methodology Video Lecture • {competency}</p>
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

      {/* Video Stream Container */}
      <div className="relative aspect-video bg-black rounded-lg border border-hacker-border overflow-hidden flex flex-col justify-between group shadow-2xl">

        {!useFallbackPlayer ? (
          <video
            ref={videoRef}
            src={videoUrl}
            onTimeUpdate={handleTimeUpdate}
            onError={() => {
              console.warn("Video stream load error, enabling Academy HD Lecture Presentation Stream.");
              setUseFallbackPlayer(true);
            }}
            onEnded={() => {
              setIsPlaying(false);
              setCompleted(true);
            }}
            className="w-full h-full object-cover cursor-pointer"
            onClick={handlePlayPause}
            playsInline
            preload="auto"
          />
        ) : (
          /* Animated High-Tech Academy Lecture Screen */
          <div
            onClick={handlePlayPause}
            className="w-full h-full bg-gradient-to-br from-slate-950 via-sky-950 to-black p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-center z-10 font-mono text-xs">
              <span className="text-sky-400 font-bold flex items-center gap-1.5">
                <ShieldCheck size={16} /> ACADEMY HD LECTURE STREAM
              </span>
              <span className="text-hacker-amber bg-hacker-amber/10 border border-hacker-amber/30 px-2.5 py-0.5 rounded">
                1080P HD
              </span>
            </div>

            {/* Waveform / Visualizer Graphics */}
            <div className="flex flex-col items-center justify-center gap-3 z-10">
              <div className="text-center">
                <div className="text-sm font-bold text-white font-mono">{title}</div>
                <div className="text-xs text-sky-300 font-mono mt-1">Audit Skill: {competency}</div>
              </div>

              {isPlaying && (
                <div className="flex items-center gap-1.5 my-2">
                  <div className="w-1.5 h-8 bg-sky-400 animate-pulse rounded-full"></div>
                  <div className="w-1.5 h-12 bg-hacker-green animate-pulse rounded-full delay-100"></div>
                  <div className="w-1.5 h-6 bg-hacker-amber animate-pulse rounded-full delay-200"></div>
                  <div className="w-1.5 h-10 bg-sky-400 animate-pulse rounded-full delay-150"></div>
                  <div className="w-1.5 h-7 bg-hacker-green animate-pulse rounded-full delay-300"></div>
                </div>
              )}
            </div>

            <div className="text-[10px] text-hacker-muted font-mono z-10 flex justify-between">
              <span>Interactive Methodology Video Stream</span>
              <span>{isPlaying ? "PLAYING" : "PAUSED"}</span>
            </div>
          </div>
        )}

        {/* Top Video Overlay Banner */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
          <span className="text-[10px] bg-black/80 backdrop-blur-md border border-hacker-border/60 text-sky-400 px-2.5 py-1 rounded font-mono">
            {isPlaying ? "● PLAYING HD LECTURE" : "PAUSED"}
          </span>
          <span className="text-[10px] bg-black/80 backdrop-blur-md border border-hacker-border/60 text-hacker-amber px-2.5 py-1 rounded font-mono">
            SKILL: {competency.toUpperCase()}
          </span>
        </div>

        {/* Center Play/Pause Overlay Button */}
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-sky-500/30 border-2 border-sky-400 text-sky-300 flex items-center justify-center hover:scale-110 transition-all shadow-2xl z-20"
          >
            <Play size={28} className="ml-1" />
          </button>
        )}

        {/* Bottom Custom Video Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3 flex flex-col gap-2 z-20 font-mono text-xs">

          {/* Progress Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button onClick={handlePlayPause} className="text-sky-400 hover:text-white transition-colors">
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button onClick={toggleMute} className="text-hacker-muted hover:text-white transition-colors">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <span className="text-[10px] text-hacker-muted">
                {duration} Full Walkthrough
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-hacker-green font-bold">1080P HD</span>
            </div>
          </div>

        </div>

      </div>

      {/* Structured Lecture Summary & Notes */}
      <div className="bg-hacker-dark/80 border border-hacker-border/60 p-3.5 rounded-lg flex flex-col gap-1.5">
        <span className="text-[10px] font-bold text-sky-400 font-mono uppercase">
          LECTURE SYNOPSIS & METHODOLOGY SUMMARY:
        </span>
        <p className="text-xs text-gray-200 leading-relaxed font-sans">
          {methodologySummary}
        </p>
      </div>

    </div>
  );
};
