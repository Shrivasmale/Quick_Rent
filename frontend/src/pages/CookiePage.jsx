// frontend/src/pages/CookiePage.jsx
import React from "react";

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-brand-bg pt-[72px] pb-16 px-[4vw] text-brand-dark">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-brand-dark text-white rounded-card p-8 sm:p-10 shadow-card mb-8">
          <span className="px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider">
            Cookie Policy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 mb-3">
            Cookie & Local Storage Practices
          </h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
            We use only essential cookies and client storage for session authentication and interface preferences.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-soft">
            <h2 className="text-lg font-bold mb-3">1. Essential Authentication Cookies</h2>
            <p className="text-xs text-brand-muted leading-relaxed">
              Local storage items are used to maintain your session credentials and provide immediate offline-capable access.
            </p>
          </div>

          <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-soft">
            <h2 className="text-lg font-bold mb-3">2. Preference Storage</h2>
            <p className="text-xs text-brand-muted leading-relaxed">
              We save non-sensitive UI preferences (such as your preferred city filter or wishlist item IDs) locally on your device for immediate page rendering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
