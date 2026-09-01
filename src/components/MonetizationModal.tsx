import React from "react";
import { AccessState } from "../hooks/useLMSState";
import { ShieldCheck, CreditCard, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

interface MonetizationModalProps {
  access: AccessState;
  onOpenCheckout: () => void;
  onToggleAdminAccess: (key: string) => { success: boolean; message: string };
}

export const MonetizationModal: React.FC<MonetizationModalProps> = ({
  access,
  onOpenCheckout
}) => {
  // If user is unlocked
  if (access.isPaid || access.isAdmin) {
    return (
      <div className="bg-hacker-card border border-hacker-green/40 rounded-xl p-3.5 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <ShieldCheck className="text-hacker-green" size={18} />
          <span className="text-white font-bold">FULL PLATFORM LICENSE ACTIVE</span>
          <span className="text-hacker-muted">(Lifetime Access Verified)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-hacker-green bg-hacker-green/10 border border-hacker-green/30 px-3 py-1 rounded-full">
          <CheckCircle size={12} /> All 12 Weeks Unlocked
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
              Enjoy free access to initial modules. Upgrade for <span className="text-white font-bold">$9.50 (PayPal)</span> for lifetime access to all 12 Weeks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCheckout}
            className="bg-hacker-amber hover:bg-amber-400 text-black font-mono font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md"
          >
            <CreditCard size={15} /> Upgrade to Pro ($9.50) <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  // Trial Expired Overlay Modal
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-hacker-amber/60 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6">

        <div className="flex items-center gap-3 border-b border-hacker-border pb-4">
          <div className="w-12 h-12 rounded-xl bg-hacker-amber/10 border border-hacker-amber/40 flex items-center justify-center shrink-0">
            <Sparkles size={24} className="text-hacker-amber" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-mono">Trial Period Ended</h2>
            <p className="text-xs text-hacker-muted">Unlock Lifetime Access to Bug Bounty Mastery</p>
          </div>
        </div>

        <div className="bg-hacker-dark border border-hacker-border p-4 rounded-xl flex flex-col gap-3">
          <div className="text-xs font-bold text-hacker-amber font-mono flex items-center gap-1.5">
            <Sparkles size={14} /> WHAT YOU GET WITH LIFETIME ACCESS
          </div>
          <ul className="text-xs text-gray-300 font-mono flex flex-col gap-2">
            <li className="flex items-center gap-2">✓ 12 Full Weeks of Hands-on Cybersecurity Curriculum</li>
            <li className="flex items-center gap-2">✓ AI Research Log Generator & LinkedIn/CV Integration</li>
            <li className="flex items-center gap-2">✓ GitHub REST API Integration & Automated Script Pushes</li>
            <li className="flex items-center gap-2">✓ Real Bug Bounty Program Directory & VDP Report Templates</li>
          </ul>
        </div>

        {/* PayPal Payment Section */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onOpenCheckout}
            className="w-full bg-hacker-amber hover:bg-amber-400 text-black font-mono font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <CreditCard size={18} /> Open Payment Screen ($9.50) <ArrowRight size={16} />
          </button>

          <span className="text-[10px] text-center text-hacker-muted font-mono">
            One-time lifetime payment of $9.50. Secured via PayPal.
          </span>
        </div>

      </div>
    </div>
  );
};
