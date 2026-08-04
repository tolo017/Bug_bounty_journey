import React, { useState } from "react";
import { UserStats, AVATARS } from "../hooks/useLMSState";
import { Shield, Sparkles, Flame, Trophy, Check } from "lucide-react";

interface ProfilePanelProps {
  stats: UserStats;
  onUpdateStats: (updater: Partial<UserStats>) => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ stats, onUpdateStats }) => {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(stats.name);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const currentAvatar = AVATARS.find((a) => a.id === stats.avatar) || AVATARS[0];
  const levelProgress = stats.xp % 1000;
  const progressPercent = Math.min(100, Math.round((levelProgress / 1000) * 100));

  const handleSaveName = () => {
    if (nameInput.trim()) {
      onUpdateStats({ name: nameInput.trim() });
      setEditingName(false);
    }
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
                  title="Click to rename"
                >
                  {stats.name} <span className="text-xs text-hacker-muted">(edit)</span>
                </h3>
              )}
              <span className="text-xs bg-hacker-border border border-hacker-border text-hacker-green px-2 py-0.5 rounded font-mono">
                {currentAvatar.name}
              </span>
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

        {/* Right Side: Streak Stats */}
        <div className="flex gap-4 items-center">
          <div className="bg-hacker-dark border border-hacker-border px-3 py-2 rounded-lg text-center flex items-center gap-2">
            <Flame className="text-red-500 animate-pulse" size={20} />
            <div>
              <div className="text-xs text-hacker-muted font-mono leading-none">STREAK</div>
              <div className="text-lg font-bold text-white font-mono leading-none mt-1">{stats.streak} Days</div>
            </div>
          </div>

          <div className="bg-hacker-dark border border-hacker-border px-3 py-2 rounded-lg text-center flex items-center gap-2">
            <Trophy className="text-hacker-amber" size={20} />
            <div>
              <div className="text-xs text-hacker-muted font-mono leading-none">RANK</div>
              <div className="text-lg font-bold text-white font-mono leading-none mt-1">
                {stats.level >= 10 ? "ELITE" : stats.level >= 5 ? "PRO" : "ROOKIE"}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Avatar Selection Modal */}
      {showAvatarSelector && (
        <div className="mt-4 p-4 bg-hacker-dark border border-hacker-border rounded-xl">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-hacker-amber">SELECT SPECIALIST CLASS</h4>
            <button
              onClick={() => setShowAvatarSelector(false)}
              className="text-xs text-hacker-muted hover:text-white"
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
                    <div className="text-xs font-bold text-white leading-none">{av.name}</div>
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
