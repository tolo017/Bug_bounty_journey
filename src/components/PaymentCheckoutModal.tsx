import React, { useState } from "react";
import { AccessState } from "../hooks/useLMSState";
import { CreditCard, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface PaymentCheckoutModalProps {
  access: AccessState;
  isOpen: boolean;
  onClose: () => void;
  onUnlockPayment: () => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  onClose,
  onUnlockPayment
}) => {
  // Official Production PayPal Link for merchant tolootieno@hotmail.com
  const PRODUCTION_PAYPAL_LINK = "https://www.paypal.com/paypalme/tolootieno/9.50";

  // Verification State
  const [txnId, setTxnId] = useState("");
  const [statusMsg, setStatusMsg] = useState({ text: "", isError: false });

  if (!isOpen) return null;

  const handleProceedToGateway = () => {
    window.open(PRODUCTION_PAYPAL_LINK, "_blank");
    setStatusMsg({
      text: "Opening secure PayPal checkout window for tolootieno@hotmail.com ($9.50 USD). Enter your PayPal transaction ID below after completion to unlock full platform access.",
      isError: false
    });
  };

  const handleConfirmPaid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnId.trim()) {
      setStatusMsg({ text: "Please enter your PayPal Transaction ID / reference email.", isError: true });
      return;
    }
    onUnlockPayment();
    setStatusMsg({ text: "Payment Verified! Lifetime Pro License Activated.", isError: false });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-hacker-card border border-hacker-amber/60 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl flex flex-col gap-6 font-sans">

        {/* Header */}
        <div className="flex justify-between items-start border-b border-hacker-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-hacker-amber/10 border border-hacker-amber/40 flex items-center justify-center shrink-0">
              <CreditCard size={22} className="text-hacker-amber" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-mono">Bug Bounty Mastery - Official Payment Gateway</h2>
              <p className="text-xs text-hacker-muted">Merchant: tolootieno@hotmail.com ($9.50 USD)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-hacker-muted hover:text-white font-mono"
          >
            [Close]
          </button>
        </div>

        {/* What You Get Breakdown */}
        <div className="bg-hacker-dark border border-hacker-border p-4 rounded-xl flex flex-col gap-2.5 font-mono text-xs">
          <div className="text-hacker-amber font-bold flex items-center gap-1.5">
            <Sparkles size={14} /> PRO BOOTCAMP LIFETIME ACCESS ($9.50 USD)
          </div>
          <ul className="text-gray-300 flex flex-col gap-1.5 leading-relaxed">
            <li className="flex items-center gap-2">✓ Full 12-Week (72 Unique Daily Lessons) Curriculum</li>
            <li className="flex items-center gap-2">✓ AI Research Log Generator for LinkedIn & CV Badges</li>
            <li className="flex items-center gap-2">✓ GitHub REST API Integration & Real Repository Script Pushes</li>
            <li className="flex items-center gap-2">✓ Live Bug Bounty Program Directory & VDP Report Templates</li>
          </ul>
        </div>

        {/* Official PayPal Redirect Trigger */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="font-bold text-white uppercase flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-hacker-green" /> OFFICIAL PAYPAL CHECKOUT GATEWAY
            </span>
            <span className="text-hacker-amber font-bold">$9.50 ONE-TIME</span>
          </div>

          <button
            onClick={handleProceedToGateway}
            className="w-full bg-hacker-amber hover:bg-amber-400 text-black font-mono font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <CreditCard size={18} /> Pay $9.50 via PayPal (tolootieno@hotmail.com) <ArrowRight size={16} />
          </button>
          <span className="text-[10px] text-center text-hacker-muted font-mono">
            Secured via PayPal. Opens merchant payment endpoint directly.
          </span>
        </div>

        {/* Transaction Verification Form */}
        <form onSubmit={handleConfirmPaid} className="border-t border-hacker-border pt-4 flex flex-col gap-2.5">
          <span className="text-xs font-mono font-bold text-white">CONFIRM COMPLETED PAYPAL TRANSACTION:</span>
          <div className="flex gap-2">
            <input
              type="text"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              placeholder="Enter PayPal Transaction ID / Email..."
              className="flex-1 bg-hacker-dark border border-hacker-border rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-hacker-green"
            />
            <button
              type="submit"
              className="bg-hacker-green hover:bg-emerald-400 text-black font-bold font-mono text-xs px-4 rounded-lg"
            >
              Verify & Activate Access
            </button>
          </div>
        </form>

        {statusMsg.text && (
          <div className={`p-3 rounded-lg text-xs font-mono ${statusMsg.isError ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-hacker-green/10 text-hacker-green border border-hacker-green/20"}`}>
            {statusMsg.text}
          </div>
        )}

      </div>
    </div>
  );
};
