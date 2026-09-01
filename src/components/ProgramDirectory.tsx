import React, { useState } from "react";
import { ExternalLink, ShieldAlert, DollarSign, Award, Target, ChevronRight, Search, CheckCircle } from "lucide-react";

export interface BugBountyPlatform {
  name: string;
  type: string;
  url: string;
  description: string;
  minBounty: string;
  avgBounty: string;
  beginnerFriendly: boolean;
  recommendedTargets: string[];
}

export const PLATFORMS: BugBountyPlatform[] = [
  {
    name: "HackerOne",
    type: "Enterprise & Public VDPs",
    url: "https://hackerone.com/bug-bounty-programs",
    description: "The world's largest bug bounty platform with enterprise programs including Google, Uber, GitHub, and Twitter.",
    minBounty: "$100",
    avgBounty: "$1,500 - $5,000",
    beginnerFriendly: true,
    recommendedTargets: ["VDP Public In-Scope Assets", "Department of Defense (DoD)", "Automated API Endpoints"]
  },
  {
    name: "Bugcrowd",
    type: "Public & Private Crowdsourced Security",
    url: "https://bugcrowd.com/programs",
    description: "Hosts top tech companies, fintech platforms, and government organizations with rapid triage and payouts.",
    minBounty: "$150",
    avgBounty: "$1,200 - $4,000",
    beginnerFriendly: true,
    recommendedTargets: ["Tesla Public Program", "Mastercard VDP", "Atlassian Web Scope"]
  },
  {
    name: "Intigriti",
    type: "European & Global Bug Bounties",
    url: "https://www.intigriti.com/public-programs",
    description: "Europe's leading bug bounty platform known for transparent triage, rapid response, and active community challenges.",
    minBounty: "€100",
    avgBounty: "€1,000 - " + "€3,500",
    beginnerFriendly: true,
    recommendedTargets: ["European E-Commerce Web Apps", "Fintech API Platforms"]
  },
  {
    name: "YesWeHack",
    type: "Global Crowdsourced Vulnerability Management",
    url: "https://yeswehack.com/programs",
    description: "Fast-growing global bug bounty platform featuring major enterprise and cloud targets across Asia, Europe, and the US.",
    minBounty: "€150",
    avgBounty: "€1,500 - €6,000",
    beginnerFriendly: false,
    recommendedTargets: ["SaaS Product Platforms", "Cloud Microservices"]
  },
  {
    name: "Immunefi",
    type: "Web3 & Smart Contract Bug Bounties",
    url: "https://immunefi.com/explore/",
    description: "Leading Web3 security platform offering massive bounties (up to $1,000,000+) for DeFi, smart contracts, and Web3 APIs.",
    minBounty: "$1,000",
    avgBounty: "$10,000 - $100,000+",
    beginnerFriendly: false,
    recommendedTargets: ["DeFi Web Frontends", "RPC API Endpoints", "Smart Contract Logic"]
  },
  {
    name: "Open Bug Bounty",
    type: "Non-Profit Public Disclosure",
    url: "https://www.openbugbounty.org/",
    description: "Excellent platform for beginners to report non-intrusive website vulnerabilities (XSS, CSRF, Open Redirects) and build a public reputation profile.",
    minBounty: "Reputation Points / Swag",
    avgBounty: "Badges & Certificates",
    beginnerFriendly: true,
    recommendedTargets: ["Small & Medium Enterprise Websites", "Educational Portals"]
  }
];

export const ProgramDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBeginner, setFilterBeginner] = useState(false);

  const filtered = PLATFORMS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBeginner = filterBeginner ? p.beginnerFriendly : true;
    return matchesSearch && matchesBeginner;
  });

  return (
    <div className="bg-hacker-card border border-hacker-border rounded-xl p-5 shadow-xl flex flex-col gap-5">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-hacker-border pb-4 gap-3">
        <div>
          <div className="text-[10px] text-hacker-green font-mono font-bold uppercase tracking-wider flex items-center gap-1">
            <DollarSign size={12} /> FREELANCE EARNING DIRECTORY
          </div>
          <h2 className="text-lg font-bold text-white font-mono mt-0.5">
            Live Bug Bounty Programs & Freelance Opportunities
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterBeginner(!filterBeginner)}
            className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
              filterBeginner
                ? "bg-hacker-green text-black border-hacker-green font-bold"
                : "bg-hacker-dark text-hacker-muted border-hacker-border hover:border-hacker-green/40"
            }`}
          >
            {filterBeginner ? "✓ Showing Beginner Friendly" : "Filter Beginner Friendly"}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-300 leading-relaxed font-sans">
        Once you complete daily lessons and build your automation scripts, apply your skills directly on live, legal target platforms. Start with public Vulnerability Disclosure Programs (VDPs) to gain reputation points, then transition to paid bounty programs.
      </p>

      {/* Program Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((platform) => (
          <div key={platform.name} className="bg-hacker-dark/60 border border-hacker-border hover:border-hacker-amber/40 rounded-xl p-4 flex flex-col justify-between gap-4 transition-all group">

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-1.5 group-hover:text-hacker-amber transition-all">
                    {platform.name}
                  </h3>
                  <span className="text-[10px] text-hacker-muted font-mono">{platform.type}</span>
                </div>
                {platform.beginnerFriendly && (
                  <span className="text-[9px] bg-hacker-green/10 border border-hacker-green/30 text-hacker-green px-2 py-0.5 rounded font-mono font-semibold">
                    Beginner Friendly
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">{platform.description}</p>

              <div className="bg-black/50 border border-hacker-border/40 p-2.5 rounded-lg flex justify-between items-center text-xs font-mono">
                <span className="text-hacker-muted">Typical Payout Range:</span>
                <span className="text-hacker-amber font-bold">{platform.avgBounty}</span>
              </div>

              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[10px] text-hacker-muted font-mono uppercase">Recommended Initial Targets:</span>
                <div className="flex flex-wrap gap-1">
                  {platform.recommendedTargets.map((target, idx) => (
                    <span key={idx} className="text-[10px] bg-hacker-card border border-hacker-border/60 text-gray-300 px-2 py-0.5 rounded font-mono">
                      • {target}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-hacker-dark border border-hacker-border hover:border-hacker-green hover:bg-hacker-green/10 text-white hover:text-hacker-green text-xs font-mono font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>Explore Programs on {platform.name}</span> <ExternalLink size={13} />
            </a>

          </div>
        ))}
      </div>

    </div>
  );
};
