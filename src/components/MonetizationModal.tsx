import React, { useState } from "react";
import { AccessState } from "../hooks/useLMSState";
import { ShieldCheck, CreditCard, Lock, Sparkles, Key, CheckCircle, AlertTriangle } from "lucide-react";

interface MonetizationModalProps {
  access: AccessState;
  onUnlockPayment: () => void;
  onToggleAdminAccess: (key: string) => { success: boolean; message: string };
}

export const MonetizationModal: React.FC<MonetizationModalProps> = ({
  access,
  onUnlockPayment,
  onToggleAdminAccess
}) => {
  const [adminKey, setAdminKey] = useState("");
  const [adminMsg, setAdminMsg] = useState({ text: "", isError: false });
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSimulatePayPal = () => {
    setIsSimulatingPayment(true);
    setTimeout(() => {
      setIsSimulatingPayment(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        onUnlockPayment();
      }, 1200);
    }, 1500);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onToggleAdminAccess(adminKey);
    setAdminMsg({ text: res.message, isError: !res.success });
  };

  // If user is paid or admin, show an active status badge
  if (access.isPaid || access.isAdmin) {
    return (
      <div className="bg-hacker-card border border-hacker-green/40 rounded-xl p-3.5 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <ShieldCheck className="text-hacker-green" size={18} />
          <span className="text-white font-bold">FULL PLATFORM LICENSE ACTIVE</span>
          <span className="text-hacker-muted">
            ({access.isAdmin ? "Developer Admin Bypass Active" : "PayPal Lifetime Unlocked"})
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-hacker-green bg-hacker-green/10 border border-hacker-green/30 px-3 py-1 rounded-full">
          <CheckCircle size={12} /> All 12 Weeks Unlocked & Monitored
        </div>
      </div>
    );
  }

  // Active Trial Banner
  if (!access.isTrialExpired) {
    return (
      <div className="bg-gradient-to-r from-amber-950/40 via-hacker-card to-hacker-dark border border-hacker-amber/40 rounded-xl p-4 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-hacker-amber/10 border border-hacker-amber/30 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-hacker-amber animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-mono">4-DAY FREE TRIAL ACTIVE</span>
              <span className="text-[10px] bg-hacker-amber/20 border border-hacker-amber/40 text-hacker-amber px-2 py-0.5 rounded font-mono font-bold">
                {access.trialDaysLeft} Days Remaining
              </span>
            </div>
            <p className="text-xs text-hacker-muted mt-0.5">
              Enjoy full access to Week 1 curriculum. Upgrade anytime for <span className="text-white font-bold">$9.50 (PayPal)</span> for lifetime access to all 12 Weeks.
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulatePayPal}
          className="bg-hacker-amber hover:bg-amber-400 text-black font-mono font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md shrink-0"
        >
          <CreditCard size={15} /> Upgrade for $9.50
        </button>
      </div>
    );
  }

  // Trial Expired Overlay Modal
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-hacker-amber/60 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6">

        <div className="flex items-center gap-3 border-b border-hacker-border pb-4">
          <div className="w-12 h-12 rounded-xl bg-hacker-amber/10 border border-hacker-amber/40 flex items-center justify-center shrink-0">
            <Lock size={24} className="text-hacker-amber" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-mono">Trial Period Ended (4 Days)</h2>
            <p className="text-xs text-hacker-muted">Unlock Lifetime Access to Bug Bounty Mastery</p>
          </div>
        </div>

        <div className="bg-hacker-dark border border-hacker-border p-4 rounded-xl flex flex-col gap-3">
          <div className="text-xs font-bold text-hacker-amber font-mono flex items-center gap-1.5">
            <Sparkles size={14} /> WHAT YOU GET WITH LIFETIME ACCESS
          </div>
          <ul className="text-xs text-gray-300 font-mono flex flex-col gap-2">
            <li className="flex items-center gap-2">✓ 12 Full Weeks of Hands-on Cybersecurity Curriculum</li>
            <li className="flex items-center gap-2">✓ Screen Recorder & AI Voiceover PoC Video Generator</li>
            <li className="flex items-center gap-2">✓ GitHub REST API Integration & LinkedIn Ledger Pushes</li>
            <li className="flex items-center gap-2">✓ Real Bug Bounty Program Directory & VDP Report Templates</li>
          </ul>
        </div>

        {/* PayPal Payment Simulation Section */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-white font-mono uppercase">Pay via PayPal</div>
          <button
            onClick={handleSimulatePayPal}
            disabled={isSimulatingPayment || paymentSuccess}
            className="w-full bg-hacker-amber hover:bg-amber-400 text-black font-mono font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            {isSimulatingPayment ? (
              <span>Connecting to PayPal...</span>
            ) : paymentSuccess ? (
              <span className="text-black flex items-center gap-1"><CheckCircle size={16} /> Payment Verified! Unlocking...</span>
            ) : (
              <>
                <CreditCard size={18} /> Pay $9.50 via PayPal & Unlock
              </>
            )}
          </button>
          <span className="text-[10px] text-center text-hacker-muted font-mono">
            One-time lifetime payment of $9.50. Secured via PayPal.
          </span>
        </div>

        {/* Developer Admin Bypass Key Accordion */}
        <div className="border-t border-hacker-border pt-4">
          <form onSubmit={handleAdminSubmit} className="flex flex-col gap-2">
            <div className="text-[11px] font-mono text-hacker-muted flex items-center gap-1">
              <Key size={12} className="text-hacker-amber" /> Developer / Owner Admin Bypass Key
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter Admin Bypass Key (e.g. master_key_0x)"
                className="flex-1 bg-hacker-dark border border-hacker-border rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-hacker-amber"
              />
              <button
                type="submit"
                className="bg-hacker-dark border border-hacker-border hover:border-hacker-amber text-white font-mono text-xs px-3 rounded-lg"
              >
                Bypass
              </button>
            </div>
            {adminMsg.text && (
              <span className={`text-[10px] font-mono ${adminMsg.isError ? "text-red-400" : "text-hacker-green"}`}>
                {adminMsg.text}
              </span>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};
