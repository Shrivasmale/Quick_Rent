// frontend/src/components/ForgotPassword.jsx
import React, { useState } from "react";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid registered email address.");
      return;
    }

    setLoading(true);
    // Local password recovery simulation
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={(e) => e.target === e.currentTarget && onBack()}
    >
      <div className="bg-white rounded-modal shadow-2xl border border-brand-border w-full max-w-md overflow-hidden animate-in zoom-in-95">
        <div className="bg-brand-dark text-white p-6 relative">
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onBack}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold text-white transition-colors"
          >
            ✕
          </button>
          <div className="text-2xl mb-2">🔑</div>
          <h2 id="forgot-title" className="text-2xl font-bold">
            Password Recovery
          </h2>
          <p className="text-xs text-white/70 mt-1">
            We will send a secure one-time password recovery link to your inbox.
          </p>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl mx-auto">
                ✓
              </div>
              <h3 className="font-bold text-lg text-brand-dark">Check Your Inbox</h3>
              <p className="text-xs text-brand-muted max-w-xs mx-auto">
                If an account exists for <strong className="text-brand-dark">{email}</strong>, a recovery link has been dispatched to your email.
              </p>
              <button
                type="button"
                onClick={onBack}
                className="w-full py-2.5 bg-brand-primary text-white text-xs font-bold rounded-base shadow-soft hover:bg-brand-hover transition-colors"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-base">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold rounded-base shadow-soft transition-colors flex items-center justify-center gap-2"
              >
                {loading ? "Sending link..." : "Send Recovery Link →"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-xs text-brand-muted hover:text-brand-dark font-semibold"
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
