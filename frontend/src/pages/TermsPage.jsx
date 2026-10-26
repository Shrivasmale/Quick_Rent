// frontend/src/pages/TermsPage.jsx
import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-bg pt-[72px] pb-16 px-[4vw] text-brand-dark">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-brand-dark text-white rounded-card p-8 sm:p-10 shadow-card mb-8">
          <span className="px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider">
            Legal Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 mb-3">
            QuickRent Terms of Service
          </h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
            Please review the contractual terms and community expectations governing rental agreements on QuickRent.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-soft">
            <h2 className="text-lg font-bold mb-3">1. Agreement to Terms</h2>
            <p className="text-xs text-brand-muted leading-relaxed">
              By accessing QuickRent or completing a rental reservation, you agree to comply with our community standards, payment terms, and security deposit guidelines.
            </p>
          </div>

          <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-soft">
            <h2 className="text-lg font-bold mb-3">2. Rental Periods & Item Care</h2>
            <p className="text-xs text-brand-muted leading-relaxed mb-3">
              Renters agree to care for rented goods in a clean, smoke-free environment. Normal wear and tear is expected, but willful damages or missing accessories may be deducted from the security deposit upon return inspection.
            </p>
            <p className="text-xs text-brand-muted leading-relaxed">
              Extensions must be booked at least 24 hours prior to contract expiration subject to item availability.
            </p>
          </div>

          <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-soft">
            <h2 className="text-lg font-bold mb-3">3. Security Deposits & Escrow</h2>
            <p className="text-xs text-brand-muted leading-relaxed">
              All security deposits are held in escrow. Upon verified return of the item to the owner, deposits are unlocked and refunded directly to the original payment source within 2 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
