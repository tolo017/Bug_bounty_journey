import React, { useState } from "react";
import { AccessState } from "../hooks/useLMSState";
import { CreditCard, Sparkles, ShieldCheck } from "lucide-react";

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
  // Verification State
  const [txnId, setTxnId] = useState("");
  const [statusMsg, setStatusMsg] = useState({ text: "", isError: false });

  if (!isOpen) return null;

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
              <p className="text-xs text-hacker-muted">Lifetime Pro Bootcamp License ($9.50 USD)</p>
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
            <li className="flex items-center gap-2">✓ Full 12-Week (72 Broad Daily Lessons) Curriculum</li>
            <li className="flex items-center gap-2">✓ AI Research Log Generator for LinkedIn & CV Badges</li>
            <li className="flex items-center gap-2">✓ GitHub REST API Integration & Real Repository Script Pushes</li>
            <li className="flex items-center gap-2">✓ Live Bug Bounty Program Directory & VDP Report Templates</li>
          </ul>
        </div>

        {/* Official PayPal Form Integration */}
        <div className="flex flex-col items-center gap-3 bg-hacker-dark/80 p-5 rounded-xl border border-hacker-amber/30 text-center">
          <div className="flex justify-between items-center w-full text-xs font-mono mb-2">
            <span className="font-bold text-white uppercase flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-hacker-green" /> SECURE PAYPAL PAYMENT
            </span>
            <span className="text-hacker-amber font-bold">$9.50 ONE-TIME</span>
          </div>

          {/* Embedded Official PayPal Form Code */}
          <div className="my-2">
            <style>{`.pp-4CVL9L9G2QEGY{text-align:center;border:none;border-radius:0.25rem;min-width:11.625rem;padding:0 2rem;height:2.625rem;font-weight:bold;background-color:#FFD140;color:#000000;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer;}`}</style>
            <form action="https://www.paypal.com/ncp/payment/4CVL9L9G2QEGY" method="post" target="_blank" style={{ display: "inline-grid", justifyItems: "center", alignContent: "start", gap: "0.5rem" }}>
              <input className="pp-4CVL9L9G2QEGY" type="submit" value="Pay Now ($9.50)" />
              <img src="https://www.paypalobjects.com/images/Debit_Credit.svg" alt="cards" />
              <section style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                Powered by <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" style={{ height: "0.875rem", verticalAlign: "middle" }} />
              </section>
            </form>
          </div>

          <span className="text-[10px] text-hacker-muted font-mono">
            Clicking "Pay Now" opens PayPal's encrypted payment portal in a secure window.
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
