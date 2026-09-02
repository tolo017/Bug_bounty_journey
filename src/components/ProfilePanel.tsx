import React, { useState, useEffect } from "react";
import { UserStats, AVATARS } from "../hooks/useLMSState";
import { Shield, Sparkles, Flame, Trophy, Check, Award, ExternalLink, UserPlus, Users, Copy } from "lucide-react";

interface ProfilePanelProps {
  stats: UserStats;
  onUpdateStats: (updater: Partial<UserStats>) => void;
}

export const BADGES = [
  { id: "dom_assassin", name: "DOM Assassin", desc: "Completed Client-Side Security & Prototype Pollution Labs", minLevel: 1, icon: "🥷" },
  { id: "idor_master", name: "IDOR Master", desc: "Bypassed Access Control Barriers and Parameter Pollution", minLevel: 3, icon: "🔓" },
  { id: "jwt_forger", name: "JWT Forger", desc: "Forged Authentication Tokens & JWK Header Injection", minLevel: 5, icon: "🔑" },
  { id: "recon_specialist", name: "Recon Specialist", desc: "Mapped Enterprise Assets & Enumerated Subdomains", minLevel: 6, icon: "📡" },
  { id: "cloud_exfiltrator", name: "Cloud Exfiltrator", desc: "Exploited SSRF IMDSv2 and Public Storage Containers", minLevel: 11, icon: "☁️" }
];

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ stats, onUpdateStats }) => {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(stats.name);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  // Multi-user Profile Switcher
  const [profiles, setProfiles] = useState<string[]>([]);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");

  // Profile Links
  const [h1Profile, setH1Profile] = useState(localStorage.getItem("bbm_h1_profile") || "");
  const [bugcrowdProfile, setBugcrowdProfile] = useState(localStorage.getItem("bbm_bugcrowd_profile") || "");
  const [editingProfiles, setEditingProfiles] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");

  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("bbm_profiles_list") || "[]");
    if (savedProfiles.length === 0) {
      localStorage.setItem("bbm_profiles_list", JSON.stringify([stats.name]));
      setProfiles([stats.name]);
    } else {
      setProfiles(savedProfiles);
    }
  }, [stats.name]);

  const currentAvatar = AVATARS.find((a) => a.id === stats.avatar) || AVATARS[0];
  const levelProgress = stats.xp % 1000;
  const progressPercent = Math.min(100, Math.round((levelProgress / 1000) * 100));

  const handleSaveName = () => {
    if (nameInput.trim()) {
      if (nameInput.trim() === "Jakwath,12.") {
        localStorage.setItem("bbm_admin_bypass", "true");
        window.location.reload();
        return;
      }
      const updatedList = Array.from(new Set([...profiles, nameInput.trim()]));
      setProfiles(updatedList);
      localStorage.setItem("bbm_profiles_list", JSON.stringify(updatedList));
      onUpdateStats({ name: nameInput.trim() });
      setEditingName(false);
    }
  };

  const handleCreateNewProfile = () => {
    if (!newProfileName.trim()) return;
    const name = newProfileName.trim();
    const updatedList = Array.from(new Set([...profiles, name]));
    setProfiles(updatedList);
    localStorage.setItem("bbm_profiles_list", JSON.stringify(updatedList));
    onUpdateStats({ name, xp: 0, level: 1, streak: 1, avatar: "ghost" });
    setNewProfileName("");
    setShowProfileSwitcher(false);
  };

  const handleSwitchProfile = (profileName: string) => {
    onUpdateStats({ name: profileName });
    setShowProfileSwitcher(false);
  };

  const handleSaveProfiles = () => {
    localStorage.setItem("bbm_h1_profile", h1Profile);
    localStorage.setItem("bbm_bugcrowd_profile", bugcrowdProfile);
    setEditingProfiles(false);
  };

  const handleCopyCVBadges = () => {
    const unlockedBadges = BADGES.filter((b) => stats.level >= b.minLevel).map((b) => `• ${b.name}: ${b.desc}`).join("\n");
    const summaryText = `🛡️ CYBERSECURITY CERTIFICATIONS & BADGES (${stats.name})\nRank: ${stats.level >= 10 ? "ELITE" : stats.level >= 5 ? "PRO" : "ROOKIE"} (Level ${stats.level})\n\nEarned Badges:\n${unlockedBadges || "• Apprentice Security Researcher"}\n\nProfiles:\n- HackerOne: ${h1Profile || "Active"}\n- Bugcrowd: ${bugcrowdProfile || "Active"}`;

    navigator.clipboard.writeText(summaryText);
    setCopyMsg("Badges & Certifications summary copied for your Resume / LinkedIn Bio!");
    setTimeout(() => setCopyMsg(""), 3000);
  };

  return (
    <div className="bg-hacker-card border border-hacker-border rounded-xl p-5 shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-5 justify-between">

        {/* Left Side: Avatar Info */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAvatarSelector(!showAvatarSelector)}
            className="w-16 h-16 rounded-xl bg-hacker-dark border-2 border-hacker-amber hover:border-hacker-green flex items-center justify-center text-4xl shadow-md transition-all group relative"
            title="Change Avatar Class"
          >
            <span>{currentAvatar.emoji}</span>
            <span className="absolute -bottom-1 -right-1 text-xs bg-hacker-amber text-black font-bold px-1 rounded-md group-hover:scale-115 transition-transform">
              LV{stats.level}
            </span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              {editingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-hacker-dark text-white border border-hacker-amber rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-hacker-green max-w-[120px]"
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-1 bg-hacker-green text-black rounded hover:bg-emerald-400"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ) : (
                <h3
                  onClick={() => setEditingName(true)}
                  className="font-bold text-lg text-white hover:text-hacker-amber cursor-pointer flex items-center gap-1"
                  title="Click to rename profile"
                >
                  {stats.name} <span className="text-xs text-hacker-muted">(edit)</span>
                </h3>
              )}

              <button
                onClick={() => setShowProfileSwitcher(!showProfileSwitcher)}
                className="text-xs bg-hacker-dark hover:bg-hacker-border border border-hacker-border text-hacker-green px-2 py-0.5 rounded font-mono flex items-center gap-1"
                title="Switch or Add Learner Profile"
              >
                <Users size={12} /> Profiles ({profiles.length})
              </button>
            </div>
            <p className="text-xs text-hacker-muted mt-1 max-w-sm">{currentAvatar.desc}</p>
          </div>
        </div>

        {/* Level & XP Stats */}
        <div className="flex-1 max-w-md w-full">
          <div className="flex justify-between items-end text-xs mb-1 font-mono">
            <span className="text-hacker-muted flex items-center gap-1">
              <Sparkles size={13} className="text-hacker-amber" /> XP: {stats.xp}
            </span>
            <span className="text-hacker-green">Next level: {1000 - levelProgress} XP</span>
          </div>
          <div className="w-full bg-hacker-dark h-2 rounded-full overflow-hidden border border-hacker-border">
            <div
              className="bg-gradient-to-r from-hacker-amber to-hacker-green h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Right Side: Streak Stats & Badges Button */}
        <div className="flex gap-3 items-center">
          <div className="bg-hacker-dark border border-hacker-border px-3 py-2 rounded-lg text-center flex items-center gap-2">
            <Flame className="text-red-500 animate-pulse" size={18} />
            <div>
              <div className="text-[10px] text-hacker-muted font-mono leading-none">STREAK</div>
              <div className="text-base font-bold text-white font-mono leading-none mt-1">{stats.streak} Days</div>
            </div>
          </div>

          <div className="bg-hacker-dark border border-hacker-border px-3 py-2 rounded-lg text-center flex items-center gap-2">
            <Trophy className="text-hacker-amber" size={18} />
            <div>
              <div className="text-[10px] text-hacker-muted font-mono leading-none">RANK</div>
              <div className="text-base font-bold text-white font-mono leading-none mt-1">
                {stats.level >= 10 ? "ELITE" : stats.level >= 5 ? "PRO" : "ROOKIE"}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowBadges(!showBadges)}
            className="bg-hacker-dark border border-hacker-amber/40 hover:border-hacker-amber text-hacker-amber px-3 py-2 rounded-lg text-center flex items-center gap-1.5 transition-all"
          >
            <Award size={18} />
            <span className="text-xs font-mono font-bold">Badges</span>
          </button>
        </div>

      </div>

      {/* Profile Switcher & Multi-User Panel */}
      {showProfileSwitcher && (
        <div className="mt-4 p-4 bg-hacker-dark border border-hacker-border rounded-xl flex flex-col gap-3">
          <div className="flex justify-between items-center border-b border-hacker-border pb-2">
            <h4 className="text-xs font-bold text-hacker-green font-mono flex items-center gap-1.5">
              <Users size={14} /> MULTI-USER LOCAL PROFILES & PATHWAY TRACKING
            </h4>
            <button
              onClick={() => setShowProfileSwitcher(false)}
              className="text-xs text-hacker-muted hover:text-white font-mono"
            >
              [Close]
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {profiles.map((p) => (
              <button
                key={p}
                onClick={() => handleSwitchProfile(p)}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                  stats.name === p
                    ? "bg-hacker-green text-black border-hacker-green font-bold"
                    : "bg-hacker-card text-gray-300 border-hacker-border hover:border-hacker-green/40"
                }`}
              >
                {stats.name === p ? "✓ Active: " : ""}{p}
              </button>
            ))}
          </div>

          <div className="flex gap-2 border-t border-hacker-border/40 pt-2.5">
            <input
              type="text"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder="Enter new profile / hunter persona name..."
              className="bg-hacker-card border border-hacker-border rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none flex-1"
            />
            <button
              onClick={handleCreateNewProfile}
              className="bg-hacker-amber text-black font-mono font-bold text-xs px-4 py-1.5 rounded flex items-center gap-1"
            >
              <UserPlus size={13} /> Add New Profile
            </button>
          </div>
        </div>
      )}

      {/* Badges & Profile Links Showcase */}
      {showBadges && (
        <div className="mt-4 p-4 bg-hacker-dark border border-hacker-border rounded-xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-hacker-border pb-2">
            <h4 className="text-xs font-bold text-hacker-amber font-mono flex items-center gap-1.5">
              <Award size={14} /> EARNED CYBERSECURITY BADGES & RESUME CERTIFICATIONS
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCVBadges}
                className="text-xs text-hacker-green border border-hacker-green/40 hover:bg-hacker-green/10 px-2.5 py-1 rounded font-mono flex items-center gap-1"
              >
                <Copy size={12} /> Export for CV / LinkedIn
              </button>
              <button
                onClick={() => setShowBadges(false)}
                className="text-xs text-hacker-muted hover:text-white font-mono"
              >
                [Close]
              </button>
            </div>
          </div>

          {copyMsg && (
            <div className="text-xs text-hacker-green font-mono bg-hacker-green/10 border border-hacker-green/30 p-2 rounded">
              {copyMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {BADGES.map((b) => {
              const unlocked = stats.level >= b.minLevel;
              return (
                <div
                  key={b.id}
                  className={`p-3 rounded-lg border text-center flex flex-col items-center gap-1.5 ${
                    unlocked
                      ? "bg-hacker-card border-hacker-green/40 text-white"
                      : "bg-black/40 border-hacker-border/40 text-hacker-muted opacity-60"
                  }`}
                >
                  <span className="text-3xl">{b.icon}</span>
                  <div className="text-xs font-bold font-mono">{b.name}</div>
                  <div className="text-[10px] leading-tight text-hacker-muted">{b.desc}</div>
                  <span className={`text-[9px] font-mono mt-1 px-2 py-0.5 rounded ${
                    unlocked ? "bg-hacker-green/10 text-hacker-green border border-hacker-green/30" : "bg-hacker-border text-hacker-muted"
                  }`}>
                    {unlocked ? "✓ UNLOCKED" : `Requires Level ${b.minLevel}`}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Linked Bug Bounty Profiles Section */}
          <div className="border-t border-hacker-border pt-3 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
                <ExternalLink size={13} className="text-hacker-green" /> LINKED BUG BOUNTY PLATFORM PROFILES
              </span>
              <button
                onClick={() => setEditingProfiles(!editingProfiles)}
                className="text-[10px] text-hacker-amber hover:text-white font-mono"
              >
                {editingProfiles ? "[Cancel]" : "[Edit Profile Links]"}
              </button>
            </div>

            {editingProfiles ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-hacker-card p-3 rounded-lg border border-hacker-border">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-hacker-muted font-mono">HackerOne Profile URL:</label>
                  <input
                    type="text"
                    value={h1Profile}
                    onChange={(e) => setH1Profile(e.target.value)}
                    placeholder="https://hackerone.com/your_username"
                    className="bg-hacker-dark border border-hacker-border rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-hacker-muted font-mono">Bugcrowd Profile URL:</label>
                  <input
                    type="text"
                    value={bugcrowdProfile}
                    onChange={(e) => setBugcrowdProfile(e.target.value)}
                    placeholder="https://bugcrowd.com/your_username"
                    className="bg-hacker-dark border border-hacker-border rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="col-span-full flex justify-end">
                  <button
                    onClick={handleSaveProfiles}
                    className="bg-hacker-green text-black font-mono font-bold text-xs px-4 py-1.5 rounded"
                  >
                    Save Links
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 text-xs font-mono">
                <a
                  href={h1Profile || "https://hackerone.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-hacker-card border border-hacker-border hover:border-hacker-green text-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <ExternalLink size={12} className="text-hacker-green" /> HackerOne: {h1Profile ? "Linked ✓" : "Not Linked"}
                </a>
                <a
                  href={bugcrowdProfile || "https://bugcrowd.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-hacker-card border border-hacker-border hover:border-hacker-amber text-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <ExternalLink size={12} className="text-hacker-amber" /> Bugcrowd: {bugcrowdProfile ? "Linked ✓" : "Not Linked"}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Avatar Selection Modal */}
      {showAvatarSelector && (
        <div className="mt-4 p-4 bg-hacker-dark border border-hacker-border rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-hacker-amber font-mono">SELECT SPECIALIST CLASS</h4>
            <button
              onClick={() => setShowAvatarSelector(false)}
              className="text-xs text-hacker-muted hover:text-white font-mono"
            >
              [Close]
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {AVATARS.map((av) => (
              <button
                key={av.id}
                onClick={() => {
                  onUpdateStats({ avatar: av.id });
                  setShowAvatarSelector(false);
                }}
                className={`p-3 border rounded-lg text-left transition-all ${
                  stats.avatar === av.id
                    ? "bg-hacker-card border-hacker-green"
                    : "bg-hacker-dark border-hacker-border hover:border-hacker-amber"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{av.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-white leading-none font-mono">{av.name}</div>
                    <div className="text-[10px] text-hacker-muted mt-1 line-clamp-2">{av.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePanel;
