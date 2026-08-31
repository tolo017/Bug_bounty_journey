import React, { useState } from "react";
import { AccessState } from "../hooks/useLMSState";
import { CreditCard, ShieldCheck, Sparkles, KeyRound, Settings, ArrowRight } from "lucide-react";

interface PaymentCheckoutModalProps {
  access: AccessState;
  isOpen: boolean;
  onClose: () => void;
  onUnlockPayment: () => void;
  onToggleAdminAccess: (key: string) => { success: boolean; message: string };
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  access,
  isOpen,
  onClose,
  onUnlockPayment,
  onToggleAdminAccess
}) => {
  // Configurable Payment Link Slot (Only editable by builder)
  const [paymentLinkSlot, setPaymentLinkSlot] = useState(
    localStorage.getItem("bbm_payment_link_slot") || "https://www.paypal.com/paypalme/yourusername/9.50"
  );
  const [showLinkConfig, setShowLinkConfig] = useState(false);

  // Verification / Admin Override State
  const [txnId, setTxnId] = useState("");
  const [builderCode, setBuilderCode] = useState("");
  const [showBuilderSlot, setShowBuilderSlot] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", isError: false });

  if (!isOpen) return null;

  const handleSavePaymentSlot = () => {
    localStorage.setItem("bbm_payment_link_slot", paymentLinkSlot.trim());
    setShowLinkConfig(false);
    setStatusMsg({ text: "Payment Gateway Slot URL locked and updated!", isError: false });
  };

  const handleProceedToGateway = () => {
    const activeSlot = localStorage.getItem("bbm_payment_link_slot") || paymentLinkSlot;
    window.open(activeSlot, "_blank");
    setStatusMsg({
      text: "Redirecting to your payment checkout screen! Enter your transaction reference below after completion.",
      isError: false
    });
  };

  const handleConfirmPaid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnId.trim()) {
      setStatusMsg({ text: "Please enter your transaction ID / reference email.", isError: true });
      return;
    }
    onUnlockPayment();
    setStatusMsg({ text: "Payment Confirmed! Lifetime Pro Access Unlocked.", isError: false });
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const handleBuilderBypass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderCode.trim()) return;
    const res = onToggleAdminAccess(builderCode);
    setStatusMsg({ text: res.message, isError: !res.success });
    if (res.success) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
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
              <h2 className="text-lg font-bold text-white font-mono">Bug Bounty Mastery - Checkout Screen</h2>
              <p className="text-xs text-hacker-muted">Lifetime Pro License Upgrade ($9.50 USD)</p>
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
            <Sparkles size={14} /> LIFETIME UNLOCK BENEFITS ($9.50 ONE-TIME)
          </div>
          <ul className="text-gray-300 flex flex-col gap-1.5 leading-relaxed">
            <li className="flex items-center gap-2">✓ Full 12-Week Phased Cybersecurity Syllabus</li>
            <li className="flex items-center gap-2">✓ AI Research Log Generator for LinkedIn & CV Badges</li>
            <li className="flex items-center gap-2">✓ GitHub REST API Integration & Automated Tool Commits</li>
            <li className="flex items-center gap-2">✓ Live Bug Bounty Program Directory & VDP Templates</li>
          </ul>
        </div>

        {/* Gateway Redirect Trigger */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="font-bold text-white uppercase">SECURE PAYMENT GATEWAY</span>

            {/* Payment link configuration button ONLY visible to Builder/Admin */}
            {access.isAdmin && (
              <button
                type="button"
                onClick={() => setShowLinkConfig(!showLinkConfig)}
                className="text-[10px] text-hacker-amber hover:text-white flex items-center gap-1"
              >
                <Settings size={11} /> [Admin: Edit Payment Slot Link]
              </button>
            )}
          </div>

          {/* Builder Payment Slot Configurator */}
          {access.isAdmin && showLinkConfig && (
            <div className="bg-hacker-dark p-3 rounded-lg border border-hacker-border flex flex-col gap-2">
              <label className="text-[10px] text-hacker-amber font-mono">Builder Slot Payment URL:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={paymentLinkSlot}
                  onChange={(e) => setPaymentLinkSlot(e.target.value)}
                  placeholder="https://paypal.me/yourusername/9.50"
                  className="flex-1 bg-hacker-card border border-hacker-border rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSavePaymentSlot}
                  className="bg-hacker-green text-black font-mono font-bold text-xs px-3 py-1 rounded"
                >
                  Save Link
                </button>
              </div>
            </div>
          )}

          {/* Main Action Button Redirecting to Payment Screen */}
          <button
            onClick={handleProceedToGateway}
            className="w-full bg-hacker-amber hover:bg-amber-400 text-black font-mono font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <CreditCard size={18} /> Proceed to Payment Screen ($9.50) <ArrowRight size={16} />
          </button>
          <span className="text-[10px] text-center text-hacker-muted font-mono">
            Directs to the official payment checkout provider in a secure window.
          </span>
        </div>

        {/* Transaction Verification Slot */}
        <form onSubmit={handleConfirmPaid} className="border-t border-hacker-border pt-4 flex flex-col gap-2.5">
          <span className="text-xs font-mono font-bold text-white">CONFIRM COMPLETED TRANSACTION:</span>
          <div className="flex gap-2">
            <input
              type="text"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              placeholder="Enter PayPal Transaction ID / Email..."
              className="flex-1 bg-hacker-dark border border-hacker-border rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-hacker-green"
            />
            <button
              type="submit"
              className="bg-hacker-green hover:bg-emerald-400 text-black font-bold font-mono text-xs px-4 rounded"
            >
              Confirm Access
            </button>
          </div>
        </form>

        {/* Builder / Admin Access Override Slot */}
        <div className="flex flex-col items-center gap-2 border-t border-hacker-border/40 pt-3">
          <button
            type="button"
            onClick={() => setShowBuilderSlot(!showBuilderSlot)}
            className="text-[11px] text-hacker-muted hover:text-white font-mono flex items-center gap-1"
          >
            <KeyRound size={12} /> Website Builder Access Slot
          </button>

          {showBuilderSlot && (
            <form onSubmit={handleBuilderBypass} className="w-full bg-hacker-dark p-3 rounded-lg border border-hacker-border flex flex-col gap-2">
              <span className="text-[10px] text-hacker-muted font-mono uppercase">Builder Access Key:</span>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={builderCode}
                  onChange={(e) => setBuilderCode(e.target.value)}
                  placeholder="Enter Builder Access Code..."
                  className="flex-1 bg-hacker-card border border-hacker-border rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-hacker-amber"
                />
                <button
                  type="submit"
                  className="bg-hacker-amber text-black font-mono font-bold text-xs px-3 rounded"
                >
                  Bypass
                </button>
              </div>
            </form>
          )}
        </div>

        {statusMsg.text && (
          <div className={`p-2.5 rounded text-xs font-mono ${statusMsg.isError ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-hacker-green/10 text-hacker-green border border-hacker-green/20"}`}>
            {statusMsg.text}
          </div>
        )}

      </div>
    </div>
  );
};
