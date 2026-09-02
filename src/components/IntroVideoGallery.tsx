import React, { useState } from "react";
import { PlayCircle, ExternalLink, Sparkles, Video, BookOpen, Layers } from "lucide-react";

export interface MasterclassVideo {
  id: string;
  title: string;
  creator: string;
  playlistOrSeries: string;
  instructionalSegment: string;
  description: string;
  url: string;
}

export const INTRO_VIDEOS: MasterclassVideo[] = [
  {
    id: "v1",
    title: "Practical Threat Analysis & Disclosed Bug Walkthroughs",
    creator: "John Hammond",
    playlistOrSeries: "Practical Threat Analysis & Disclosed CVE Breakdown",
    instructionalSegment: "Segment 1: Deconstructing HTTP Payloads & Analysing Real-World Disclosed Bounties",
    description: "John Hammond breaks down real-world disclosed reports, setting up Kali Linux auditing tools, analyzing raw server logs, and writing professional triage documentation.",
    url: "https://www.youtube.com/watch?v=2_s393XkR8A"
  },
  {
    id: "v2",
    title: "Bug Bounty Program & Expert Interview Masterclass",
    creator: "David Bombal",
    description: "David Bombal interviews top bug hunters, explains HTTP/2 request manipulation, TCP packet tracing, and Burp Suite Proxy interception setups.",
    playlistOrSeries: "David Bombal's Bug Bounty Program & Expert Interview Series",
    instructionalSegment: "Segment 2: HTTP Interception, Header Manipulation & Target Mapping",
    url: "https://www.youtube.com/watch?v=0O_A4S3a738"
  },
  {
    id: "v3",
    title: "Web Vulnerability Breakdowns & Technical Lectures",
    creator: "Vickie Li (Author of Bug Bounty Bootcamp)",
    description: "Vickie Li delivers deep-dive technical lectures breaking down IDORs, XSS DOM sinks, logic flaws, and systematic target auditing methodologies.",
    playlistOrSeries: "Vickie Li's Web Vulnerability Breakdowns & Technical Lectures",
    instructionalSegment: "Segment 3: Isolating Sinks, Parameter Fuzzing & Filter Bypasses",
    url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE"
  },
  {
    id: "v4",
    title: "Zero to Hero Bug Bounty & Web Hacking Series",
    creator: "Ryan John (Montgomery)",
    description: "Ryan John walks through automated asset mapping, multi-threaded subdomain enumeration, CIDR expansion, and building custom Go/Python offensive tools.",
    playlistOrSeries: "Ryan John's 'Zero to Hero' Bug Bounty & Web Hacking Playlist",
    instructionalSegment: "Segment 4: Subdomain Recon, Asset Discovery & Automation Pipelines",
    url: "https://www.youtube.com/watch?v=4m6n02y0_6c"
  }
];

export const IntroVideoGallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<MasterclassVideo | null>(null);

  return (
    <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/40 rounded-xl p-4 shadow-lg flex flex-col gap-3 font-sans">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center shrink-0">
            <Video size={16} className="text-sky-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
              🎬 VERIFIED YOUTUBE KNOWLEDGE STREAM (ELITE SECURITY CREATORS)
            </h3>
            <p className="text-[10px] text-hacker-muted font-mono">
              Embedded playlists & instructional segments from David Bombal, Vickie Li, Ryan John & John Hammond
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs bg-sky-400/10 border border-sky-400/30 text-sky-300 hover:text-white px-3 py-1.5 rounded font-mono font-bold flex items-center gap-1 transition-all"
        >
          <Sparkles size={13} /> {isOpen ? "Hide Stream" : "View Verified Stream"}
        </button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 border-t border-hacker-border/40 pt-3">
          {INTRO_VIDEOS.map((vid) => (
            <div key={vid.id} className="bg-hacker-dark border border-hacker-border/80 hover:border-sky-400 p-3 rounded-xl flex flex-col justify-between gap-2.5 transition-all group">
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] bg-sky-400/10 border border-sky-400/30 text-sky-300 px-2 py-0.5 rounded font-mono font-bold">
                    {vid.creator}
                  </span>
                  <span className="text-[9px] text-hacker-amber font-mono flex items-center gap-1">
                    <Layers size={10} /> Verified
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white font-mono mt-2 group-hover:text-sky-400 transition-colors">
                  {vid.title}
                </h4>

                <div className="mt-1.5 bg-black/60 p-2 rounded border border-hacker-border/40 text-[10px] font-mono text-sky-300/90">
                  <p className="text-hacker-amber font-bold">📺 {vid.playlistOrSeries}</p>
                  <p className="text-gray-300 mt-0.5">📍 {vid.instructionalSegment}</p>
                </div>

                <p className="text-[11px] text-gray-300 font-sans mt-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <button
                  onClick={() => setSelectedVideo(vid)}
                  className="w-full bg-hacker-card hover:bg-sky-900/40 text-sky-300 border border-sky-400/30 text-[11px] font-mono font-bold px-2 py-1 rounded flex items-center justify-center gap-1 transition-all"
                >
                  <BookOpen size={12} /> View Segment Breakdown
                </button>
                <a
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-sky-400/20 hover:bg-sky-400 text-sky-300 hover:text-black border border-sky-400/40 text-[11px] font-mono font-bold px-2 py-1.5 rounded flex items-center justify-center gap-1.5 transition-all"
                >
                  <PlayCircle size={13} /> Watch Video <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Segment Breakdown Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-hacker-card border border-sky-400/50 rounded-2xl max-w-lg w-full p-6 text-white font-sans shadow-2xl flex flex-col gap-4">
            <div className="flex justify-between items-start border-b border-hacker-border pb-3">
              <div>
                <span className="text-xs bg-sky-400/10 border border-sky-400/30 text-sky-300 px-2 py-0.5 rounded font-mono font-bold">
                  {selectedVideo.creator}
                </span>
                <h3 className="text-sm font-bold text-white font-mono mt-1">
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-black/60 p-3 rounded-lg border border-sky-400/30">
                <p className="text-hacker-amber font-bold">📂 Series / Playlist Path:</p>
                <p className="text-white text-xs mt-0.5">{selectedVideo.playlistOrSeries}</p>
              </div>

              <div className="bg-black/60 p-3 rounded-lg border border-sky-400/30">
                <p className="text-hacker-green font-bold">🎯 Instructional Segment:</p>
                <p className="text-white text-xs mt-0.5">{selectedVideo.instructionalSegment}</p>
              </div>

              <div className="bg-black/60 p-3 rounded-lg border border-hacker-border/50 font-sans text-xs text-gray-200">
                <p className="font-mono text-sky-400 font-bold mb-1">📝 Practical Takeaway:</p>
                {selectedVideo.description}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <a
                href={selectedVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-400 hover:bg-sky-300 text-black font-mono font-bold px-4 py-2 rounded-lg flex items-center gap-2 text-xs transition-all"
              >
                <PlayCircle size={15} /> Launch External Stream
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
