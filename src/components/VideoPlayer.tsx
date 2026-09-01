import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles, Clock, CheckCircle, RotateCcw } from "lucide-react";

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

  // Reliable open-source educational sample video stream URLs for cybersecurity walkthroughs
  const videoSources = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4"
  ];

  // Pick a video source based on title length
  const videoUrl = videoSources[title.length % videoSources.length];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      const pct = (current / total) * 100;
      setProgress(pct);
      if (pct > 90 && !completed) {
        setCompleted(true);
      }
    }
  };

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
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/40 rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-xl font-sans">

      {/* Video Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-hacker-border/40 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center">
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

        <video
          ref={videoRef}
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            setCompleted(true);
          }}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handlePlayPause}
          playsInline
        />

        {/* Top Video Stats Overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
          <span className="text-[10px] bg-black/80 backdrop-blur-md border border-hacker-border/60 text-sky-400 px-2.5 py-1 rounded font-mono">
            {isPlaying ? "● LIVE STREAMING HD" : "PAUSED"}
          </span>
          <span className="text-[10px] bg-black/80 backdrop-blur-md border border-hacker-border/60 text-hacker-amber px-2.5 py-1 rounded font-mono">
            SKILL: {competency.toUpperCase()}
          </span>
        </div>

        {/* Overlay Play Button when Paused */}
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-sky-500/30 border-2 border-sky-400 text-sky-300 flex items-center justify-center hover:scale-110 transition-all shadow-2xl z-10"
          >
            <Play size={28} className="ml-1" />
          </button>
        )}

        {/* Bottom Custom Video Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-3 flex flex-col gap-2 z-10 font-mono text-xs">

          {/* Progress Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
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
              <Maximize onClick={handleFullscreen} size={14} className="text-hacker-muted cursor-pointer hover:text-white" />
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
