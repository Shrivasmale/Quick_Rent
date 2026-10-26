// frontend/src/components/AuthModal.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ mode = "login", onClose, switchMode }) {
  const { handleLogin, handleSignup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Pune",
    password: "",
    role: "renter",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const update = (key, val) => {
    if (key === "phone") val = val.replace(/[^0-9]/g, "").slice(0, 10);
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Standard RFC email validation regex (no artificial restrictions)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        if (!form.name.trim()) {
          setError("Full name is required.");
          setLoading(false);
          return;
        }
        await handleSignup({
          email: form.email,
          password: form.password,
          name: form.name,
          phone: form.phone,
          city: form.city,
          role: form.role,
        });
      } else {
        await handleLogin({
          email: form.email,
          password: form.password,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-modal shadow-2xl border border-brand-border w-full max-w-md overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-brand-dark text-white p-6 relative">
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold text-white transition-colors"
          >
            ✕
          </button>
          <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center font-extrabold text-sm mb-3">
            QR
          </div>
          <h2 id="auth-modal-title" className="text-2xl font-bold">
            {mode === "signup" ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-white/70 mt-1">
            {mode === "signup"
              ? "Join thousands of members renting and listing verified essentials."
              : "Sign in to manage your bookings and rentals."}
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-base flex items-start gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {mode === "signup" && (
            <>
              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1">
                    City
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                  >
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1">
                  Primary Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => update("role", "renter")}
                    className={`py-2 text-xs font-bold rounded-base border transition-colors ${
                      form.role === "renter"
                        ? "bg-brand-light border-brand-primary text-brand-primary"
                        : "border-brand-border bg-white text-brand-muted"
                    }`}
                  >
                    🔍 Rent Items
                  </button>
                  <button
                    type="button"
                    onClick={() => update("role", "lister")}
                    className={`py-2 text-xs font-bold rounded-base border transition-colors ${
                      form.role === "lister"
                        ? "bg-brand-light border-brand-primary text-brand-primary"
                        : "border-brand-border bg-white text-brand-muted"
                    }`}
                  >
                    📦 List & Earn
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="name@domain.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <label className="text-xs uppercase tracking-wider text-brand-muted font-bold">
                Password *
              </label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => switchMode("forgot")}
                  className="text-xs text-brand-primary font-semibold hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary pr-12"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-brand-dark"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-primary hover:bg-brand-hover disabled:bg-gray-400 text-white font-bold rounded-base shadow-soft transition-colors text-sm mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : mode === "signup" ? (
              "Create Account →"
            ) : (
              "Sign In →"
            )}
          </button>

          <div className="text-center text-xs text-brand-muted pt-2">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-bold text-brand-primary hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                New to QuickRent?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-bold text-brand-primary hover:underline"
                >
                  Create Account
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
