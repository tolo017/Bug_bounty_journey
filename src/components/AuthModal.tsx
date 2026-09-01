import React, { useState } from "react";
import { ShieldCheck, Lock, Mail, UserPlus, LogIn, Sparkles, Key, CheckCircle } from "lucide-react";

export interface AuthUser {
  email: string;
  username: string;
  isAdmin: boolean;
  isPaid: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter a valid email and password.");
      return;
    }

    // Check for Admin Credentials
    const isAdminCred = (email.trim().toLowerCase() === "admin@bugbountymastery.academy" || email.trim().toLowerCase() === "admin") && password.trim() === "Jakwath,12.";
    const isCodeBypass = password.trim() === "Jakwath,12.";

    if (isAdminCred || isCodeBypass) {
      const adminUser: AuthUser = {
        email: email.trim().toLowerCase() || "admin@bugbountymastery.academy",
        username: username.trim() || "Master_Admin",
        isAdmin: true,
        isPaid: true
      };
      localStorage.setItem("bbm_auth_user", JSON.stringify(adminUser));
      localStorage.setItem("bbm_admin_bypass", "true");
      localStorage.setItem("bbm_is_paid", "true");
      onLoginSuccess(adminUser);
      onClose();
      return;
    }

    if (isSignUp) {
      if (!username.trim()) {
        setErrorMsg("Please enter a handle/username for your student profile.");
        return;
      }
      const newUser: AuthUser = {
        email: email.trim().toLowerCase(),
        username: username.trim(),
        isAdmin: false,
        isPaid: false
      };
      localStorage.setItem("bbm_auth_user", JSON.stringify(newUser));
      onLoginSuccess(newUser);
      onClose();
    } else {
      // Standard Student Login
      const savedUserJson = localStorage.getItem("bbm_auth_user");
      let existingUser: AuthUser = {
        email: email.trim().toLowerCase(),
        username: username.trim() || email.split("@")[0],
        isAdmin: false,
        isPaid: localStorage.getItem("bbm_is_paid") === "true"
      };

      if (savedUserJson) {
        try {
          const parsed = JSON.parse(savedUserJson);
          if (parsed.email === email.trim().toLowerCase()) {
            existingUser = parsed;
          }
        } catch (e) {}
      }

      localStorage.setItem("bbm_auth_user", JSON.stringify(existingUser));
      onLoginSuccess(existingUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-hacker-amber/60 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl flex flex-col gap-6 font-sans">

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-hacker-border pb-4">
          <div className="w-12 h-12 rounded-xl bg-hacker-amber/10 border border-hacker-amber/40 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} className="text-hacker-amber" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-mono tracking-wide">
              {isSignUp ? "STUDENT REGISTRATION" : "SECURE ACADEMY LOGIN"}
            </h2>
            <p className="text-xs text-hacker-muted font-mono">
              {isSignUp ? "Create your cybersecurity learner profile" : "Sign in to access your 12-week bootcamp"}
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 font-mono">

          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-white uppercase">Handle / Profile Name:</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Viper_0x"
                  className="w-full bg-hacker-dark border border-hacker-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-hacker-amber"
                />
                <UserPlus size={15} className="absolute left-3 top-2.5 text-hacker-muted" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white uppercase">Email Address:</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@corp.com"
                className="w-full bg-hacker-dark border border-hacker-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-hacker-amber"
              />
              <Mail size={15} className="absolute left-3 top-2.5 text-hacker-muted" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white uppercase">Account Password:</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-hacker-dark border border-hacker-border rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-hacker-amber"
              />
              <Lock size={15} className="absolute left-3 top-2.5 text-hacker-muted" />
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-xs text-red-400">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-hacker-amber hover:bg-amber-400 text-black font-mono font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg mt-2"
          >
            {isSignUp ? <UserPlus size={16} /> : <LogIn size={16} />}
            <span>{isSignUp ? "Create Academy Profile" : "Sign In to Academy"}</span>
          </button>
        </form>

        {/* Toggle Sign Up / Login */}
        <div className="border-t border-hacker-border pt-4 flex justify-between items-center text-xs font-mono text-hacker-muted">
          <span>{isSignUp ? "Already registered?" : "New to the Bootcamp?"}</span>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg("");
            }}
            className="text-hacker-amber font-bold hover:underline"
          >
            {isSignUp ? "Sign In Here" : "Create Student Account"}
          </button>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-mono text-hacker-muted hover:text-white"
          >
            [Continue as Guest Trial]
          </button>
        </div>

      </div>
    </div>
  );
};
