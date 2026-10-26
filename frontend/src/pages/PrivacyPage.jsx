// frontend/src/pages/PrivacyPage.jsx
import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-bg pt-[72px] pb-16 px-[4vw] text-brand-dark">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-brand-dark text-white rounded-card p-8 sm:p-10 shadow-card mb-8">
          <span className="px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider">
            Privacy First
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 mb-3">
            Your data belongs to you — we keep it safe and transparent.
          </h1>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
            QuickRent is built to protect your personal information while giving you the freedom to rent and lend with confidence.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-soft">
            <h2 className="text-lg font-bold mb-3">1. Information We Collect</h2>
            <p className="text-xs text-brand-muted leading-relaxed mb-3">
              We collect information strictly necessary to facilitate verified rentals, secure escrow payments, and maintain community safety.
            </p>
            <ul className="text-xs text-brand-muted space-y-2 list-disc list-inside">
              <li>Profile data: Full name, verified mobile number, email, and city of residence.</li>
              <li>Booking records: Rental start and end dates, contract IDs, and delivery instructions.</li>
              <li>Security signals: Client IP, browser user agent, and correlation IDs for fraud prevention.</li>
            </ul>
          </div>

          <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-soft">
            <h2 className="text-lg font-bold mb-3">2. How Your Data is Protected</h2>
            <p className="text-xs text-brand-muted leading-relaxed mb-3">
              All data is stored in PostgreSQL behind strict Row-Level Security (RLS) policies. Sensitive financial transactions never touch our application servers and are processed directly via PCI-DSS compliant gateways.
            </p>
            <p className="text-xs text-brand-muted leading-relaxed">
              Private invoices and KYC receipts are stored in private storage buckets accessible only via short-lived, cryptographically signed URLs.
            </p>
          </div>

          <div className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-soft">
            <h2 className="text-lg font-bold mb-3">3. Your Rights & Data Portability</h2>
            <p className="text-xs text-brand-muted leading-relaxed mb-3">
              You maintain full ownership of your data. You may request a complete export of your rental history or request permanent account deletion by contacting support@quickrent.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
