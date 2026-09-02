import React, { useState } from "react";
import { PlayCircle, ExternalLink, Sparkles, Video, X } from "lucide-react";

export const INTRO_VIDEOS = [
  {
    id: "v1",
    title: "How to Start Bug Bounty Hunting in 2026 (Full Roadmap)",
    creator: "John Hammond",
    description: "John Hammond breaks down the complete roadmap to becoming a bug hunter, setting up your Kali Linux lab, and filing your first report.",
    url: "https://www.youtube.com/watch?v=2_s393XkR8A"
  },
  {
    id: "v2",
    title: "Bug Bounty Hunting for Beginners (Networking & HTTP Fundamentals)",
    creator: "David Bombal",
    description: "David Bombal explains HTTP request/response headers, proxy interception in Burp Suite, and tracing TCP packets.",
    url: "https://www.youtube.com/watch?v=0O_A4S3a738"
  },
  {
    id: "v3",
    title: "Bug Bounty Methodology & Finding Your First Vulnerability",
    creator: "Vickie Li (Author of Bug Bounty Bootcamp)",
    description: "Vickie Li demonstrates her systematic methodology for isolating parameter sinks, testing IDORs, and avoiding duplicate reports.",
    url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE"
  },
  {
    id: "v4",
    title: "Offensive Recon & Real-World Bug Bounty Automation",
    creator: "Ryan Montgomery",
    description: "Ryan Montgomery walks through building automated reconnaissance pipelines, subdomain discovery, and scanning CIDR blocks.",
    url: "https://www.youtube.com/watch?v=4m6n02y0_6c"
  }
];

export const IntroVideoGallery: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-sky-950/40 via-hacker-card to-hacker-dark border border-sky-400/40 rounded-xl p-4 shadow-lg flex flex-col gap-3 font-sans">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center shrink-0">
            <Video size={16} className="text-sky-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
              🎬 INTRODUCTORY BUG BOUNTY MASTERCLASS GALLERY
            </h3>
            <p className="text-[10px] text-hacker-muted font-mono">
              Curated introductory video walk-throughs by John Hammond, David Bombal, Vickie Li & Ryan Montgomery
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs bg-sky-400/10 border border-sky-400/30 text-sky-300 hover:text-white px-3 py-1.5 rounded font-mono font-bold flex items-center gap-1 transition-all"
        >
          <Sparkles size={13} /> {isOpen ? "Hide Gallery" : "View Introductory Videos"}
        </button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 border-t border-hacker-border/40 pt-3">
          {INTRO_VIDEOS.map((vid) => (
            <div key={vid.id} className="bg-hacker-dark border border-hacker-border/80 hover:border-sky-400 p-3 rounded-xl flex flex-col justify-between gap-2.5 transition-all group">
              <div>
                <span className="text-[10px] bg-sky-400/10 border border-sky-400/30 text-sky-300 px-2 py-0.5 rounded font-mono font-bold">
                  {vid.creator}
                </span>
                <h4 className="text-xs font-bold text-white font-mono mt-1.5 group-hover:text-sky-400 transition-colors">
                  {vid.title}
                </h4>
                <p className="text-[11px] text-gray-300 font-sans mt-1 leading-relaxed">
                  {vid.description}
                </p>
              </div>

              <a
                href={vid.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-400/20 hover:bg-sky-400 text-sky-300 hover:text-black border border-sky-400/40 text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all mt-1"
              >
                <PlayCircle size={13} /> Watch Masterclass Video <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
