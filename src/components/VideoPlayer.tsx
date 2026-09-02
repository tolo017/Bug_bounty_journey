import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Clock, CheckCircle, ShieldCheck, Terminal, Cpu, FileText, Mic, Music, PlayCircle, Radio } from "lucide-react";

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

export type VoiceStyle = "us" | "uk" | "tactical";

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
  const [isMuted, setIsMuted] = useState(false);
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("us");
  const [bgMusic, setBgMusic] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  // Web Audio API Ambient Cyber Soundscape Generator
  useEffect(() => {
    if (bgMusic && isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          audioCtxRef.current = ctx;

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(110, ctx.currentTime); // Low cyber drone
          gain.gain.setValueAtTime(0.015, ctx.currentTime); // Soft ambient volume

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          oscRef.current = osc;
        }
      } catch (e) {}
    } else {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch (e) {}
        oscRef.current = null;
      }
    }

    return () => {
      if (oscRef.current) {
        try { oscRef.current.stop(); } catch (e) {}
        oscRef.current = null;
      }
    };
  }, [bgMusic, isPlaying]);

  // Terminal Typing Simulation Effect
  useEffect(() => {
    const fullCommand = `curl -X POST "https://target.corp/api/v1/exploit" -H "X-Audit-Skill: ${competency}" -d '${payloadCrafting.slice(0, 45)}'`;
    let idx = 0;
    setTypedCommand("");

    if (isPlaying) {
      const interval = setInterval(() => {
        if (idx < fullCommand.length) {
          setTypedCommand((prev) => prev + fullCommand.charAt(idx));
          idx++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [currentChapter, isPlaying, competency, payloadCrafting]);

  // 5 Dedicated Chapters
  const chapters = [
    {
      id: 0,
      title: "1. Lesson Blueprint & Overview",
      icon: Terminal,
      content: `[BRANDING INTRO]\nWelcome to Bug Bounty Mastery Academy. Today we master ${title}.\n\n[PRACTICAL OVERVIEW]\n${whatYouAreDoing}`
    },
    {
      id: 1,
      title: "2. Red Team Vectors vs Blue Team Defenses",
      icon: ShieldCheck,
      content: `[RED TEAM EXPLOIT MECHANICS]\n${vulnerabilityOrigin}\n\n[BLUE TEAM DEFENSE & SECURE CODING]\n${blueTeamDefense}`
    },
    {
      id: 2,
      title: "3. Vulnerability Code Sinks & Inspection",
      icon: Cpu,
      content: `[AUDIT CHECKLIST & SINK INSPECTION]\n${pentesterFocus}`
    },
    {
      id: 3,
      title: "4. Burp Suite & Payload Construction",
      icon: Radio,
      content: `[PAYLOAD CRAFTING LOGIC]\n${payloadCrafting}\n\n[BURP SUITE REPEATER CONFIGURATION]\n${burpSuiteSetup}`
    },
    {
      id: 4,
      title: "5. PortSwigger Practical Lab Demonstration",
      icon: FileText,
      content: `[PRACTICAL DEMONSTRATION & RECAP]\n1. Launch Digital Arena playground.\n2. Supply payload into target console.\n3. Verify response status code and extract captured flag.\n4. Lab Reference: ${labLink || "https://portswigger.net/web-security"}\n\n[BRANDING OUTRO]\nKeep hunting, document your PoCs, and submit your VDP report. See you in the next lesson!`
    }
  ];

  // Speak voiceover
  const triggerVoiceover = (text: string) => {
    if ("speechSynthesis" in window && !isMuted) {
      window.speechSynthesis.cancel();
      const introText = `Welcome to Bug Bounty Mastery Academy. Today we master ${title}. ${text.slice(0, 250)}`;
      const utterance = new SpeechSynthesisUtterance(introText.replace(/[\*\#\`\_\[\]]/g, " "));

      utterance.rate = voiceStyle === "tactical" ? 1.1 : 1.0;
      utterance.pitch = voiceStyle === "uk" ? 1.1 : 1.0;

      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (nextState) {
      triggerVoiceover(chapters[currentChapter].content);
    } else if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleChapterSelect = (idx: number) => {
    setCurrentChapter(idx);
    setProgress((idx / 4) * 100);
    if (isPlaying) {
      triggerVoiceover(chapters[idx].content);
    }
  };

  // Video progress interval
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setCompleted(true);
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            return 100;
          }
          const next = prev + 2.5;
          const nextCh = Math.min(4, Math.floor((next / 100) * 5));
          if (nextCh !== currentChapter) {
            setCurrentChapter(nextCh);
          }
          return next;
        });
      }, 700);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentChapter]);

  const activeCh = chapters[currentChapter];

  return (
    <div className="bg-gradient-to-r from-slate-950 via-hacker-card to-hacker-dark border border-sky-400/50 rounded-2xl p-4 sm:p-6 flex flex-col gap-5 shadow-2xl font-sans">

      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-hacker-border/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/40 flex items-center justify-center shrink-0">
            <Radio size={20} className="text-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-sky-400/20 border border-sky-400/40 text-sky-300 px-2 py-0.5 rounded font-mono font-bold uppercase">
                CYBERPUNK TERMINAL VIDEO STUDIO
              </span>
              <span className="text-[10px] text-hacker-green font-mono font-bold">1080P HD</span>
            </div>
            <h3 className="text-sm font-bold text-white font-mono mt-0.5">{title}</h3>
          </div>
        </div>

        {/* Audio & Voiceover Style Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-hacker-dark border border-hacker-border p-1 rounded-lg text-[10px] font-mono">
            <span className="text-hacker-muted px-1.5 flex items-center gap-1"><Mic size={11} /> Voice:</span>
            <button
              onClick={() => setVoiceStyle("us")}
              className={`px-2 py-0.5 rounded transition-all ${voiceStyle === "us" ? "bg-sky-400 text-black font-bold" : "text-hacker-muted"}`}
            >
              US Lead
            </button>
            <button
              onClick={() => setVoiceStyle("uk")}
              className={`px-2 py-0.5 rounded transition-all ${voiceStyle === "uk" ? "bg-sky-400 text-black font-bold" : "text-hacker-muted"}`}
            >
              UK Spec
            </button>
            <button
              onClick={() => setVoiceStyle("tactical")}
              className={`px-2 py-0.5 rounded transition-all ${voiceStyle === "tactical" ? "bg-sky-400 text-black font-bold" : "text-hacker-muted"}`}
            >
              Tactical
            </button>
          </div>

          <button
            onClick={() => setBgMusic(!bgMusic)}
            className={`p-1.5 rounded border text-xs font-mono transition-all flex items-center gap-1 ${
              bgMusic ? "bg-hacker-amber/20 text-hacker-amber border-hacker-amber/40" : "bg-hacker-dark text-hacker-muted border-hacker-border"
            }`}
            title="Toggle Ambient Cyber Background Audio"
          >
            <Music size={13} /> Synth Soundscape
          </button>
        </div>
      </div>

      {/* Option A: Cyberpunk Hacker Terminal & Visual Walkthrough Screen */}
      <div className="relative aspect-video bg-slate-950 rounded-xl border border-hacker-border overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-2xl group">

        {/* Top Screen Bar */}
        <div className="flex justify-between items-center z-10 font-mono text-xs border-b border-hacker-border/40 pb-2">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-hacker-green animate-ping" : "bg-hacker-muted"}`}></span>
            <span className="text-sky-400 font-bold tracking-wider">
              {isPlaying ? "LIVE TERMINAL EXPLOIT STREAM" : "PAUSED"}
            </span>
          </div>

          <span className="text-[10px] text-hacker-amber font-mono bg-hacker-amber/10 border border-hacker-amber/30 px-2.5 py-0.5 rounded">
            CHAPTER {currentChapter + 1}: {activeCh.title.toUpperCase()}
          </span>
        </div>

        {/* Live Terminal & HTTP Diff Visualization Area */}
        <div className="my-auto z-10 flex flex-col gap-3 font-mono text-xs">

          {/* Animated Typing CLI Command Bar */}
          <div className="bg-black/90 border border-hacker-border p-3 rounded-lg flex items-center gap-2 shadow-inner">
            <span className="text-hacker-green font-bold">root@academy-kali:~#</span>
            <span className="text-white flex-1 truncate">{typedCommand}<span className="animate-pulse">_</span></span>
          </div>

          {/* Interactive Lesson Content Screen */}
          <div className="bg-slate-900/90 border border-sky-400/30 p-4 rounded-xl shadow-xl backdrop-blur-md max-h-48 overflow-y-auto">
            <div className="text-[10px] text-sky-400 font-bold uppercase mb-2 flex items-center gap-1.5">
              <Terminal size={14} /> EXPLOIT ARCHITECTURE & INSTRUCTOR NOTES:
            </div>
            <pre className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed">
              <code>{activeCh.content}</code>
            </pre>
          </div>

        </div>

        {/* Center Play Button Overlay when Paused */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-20">
            <button
              onClick={handlePlayPause}
              className="w-20 h-20 rounded-full bg-sky-500/20 border-2 border-sky-400 text-sky-300 flex items-center justify-center hover:scale-110 transition-all shadow-2xl"
            >
              <Play size={36} className="ml-1" />
            </button>
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              CLICK TO START CYBERPUNK TERMINAL LECTURE
            </span>
          </div>
        )}

        {/* Bottom Custom Video Controls */}
        <div className="z-10 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-hacker-border/60 flex flex-col gap-2 font-mono text-xs">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const val = Number(e.target.value);
              setProgress(val);
              setCurrentChapter(Math.min(4, Math.floor((val / 100) * 5)));
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
                onClick={() => setIsMuted(!isMuted)}
                className={`p-1.5 rounded border transition-all ${
                  !isMuted ? "bg-hacker-green/20 text-hacker-green border-hacker-green/40" : "bg-hacker-dark text-hacker-muted border-hacker-border"
                }`}
              >
                {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <span className="text-[11px] text-hacker-muted">
                Chapter {currentChapter + 1} / 5 • {duration}
              </span>
            </div>

            <span className="text-[10px] text-hacker-green font-bold">
              AUDIO SYNTHESIS: {voiceStyle.toUpperCase()} INSTRUCTOR
            </span>
          </div>
        </div>

      </div>

      {/* 5 Chapter Quick-Nav Selector */}
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
