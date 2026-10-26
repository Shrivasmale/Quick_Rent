// frontend/src/pages/AboutPage.jsx
import React, { useEffect, useState } from "react";

export default function AboutPage({ navigate }) {
  const [stats, setStats] = useState({ users: 0, items: 0, saved: 0, cities: 0 });

  useEffect(() => {
    // Smooth counter animation
    const targets = { users: 15400, items: 3200, saved: 4200000, cities: 4 };
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      setStats({
        users: Math.floor(progress * targets.users),
        items: Math.floor(progress * targets.items),
        saved: Math.floor(progress * targets.saved),
        cities: Math.floor(progress * targets.cities),
      });
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg pt-[72px] pb-16 text-brand-dark">
      {/* ── Editorial Hero ── */}
      <section className="bg-brand-dark text-white px-[4vw] py-20 rounded-b-[32px] shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            Our Mission & Story
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Empowering Smarter Living Through Resource Sharing.
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            QuickRent was created to challenge the cycle of disposable furniture and high-commitment ownership. We enable modern households to access premium home essentials on flexible, circular terms.
          </p>
        </div>
      </section>

      {/* ── Impact Numbers ── */}
      <section className="max-w-5xl mx-auto px-[4vw] -mt-10 relative z-10">
        <div className="bg-white rounded-card shadow-card border border-brand-border p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-primary">
              {stats.users.toLocaleString()}+
            </div>
            <div className="text-xs text-brand-muted font-medium mt-1">Active Members</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-primary">
              {stats.items.toLocaleString()}+
            </div>
            <div className="text-xs text-brand-muted font-medium mt-1">Verified Items</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-primary">
              ₹{(stats.saved / 100000).toFixed(1)}L+
            </div>
            <div className="text-xs text-brand-muted font-medium mt-1">Saved by Renters</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-primary">
              {stats.cities} Major Hubs
            </div>
            <div className="text-xs text-brand-muted font-medium mt-1">Pune, Mumbai, BLR, DEL</div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="max-w-5xl mx-auto px-[4vw] py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">
            Our Standards
          </div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-3">Built on Transparency & Care</h2>
          <p className="text-sm text-brand-muted">
            Every transaction on QuickRent is backed by verified identification, escrow deposits, and comprehensive quality checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "🛡️",
              title: "Verified Community",
              desc: "Every lender and renter passes KYC and phone verification before transactions are finalized.",
            },
            {
              icon: "🌱",
              title: "Circular Economy",
              desc: "By keeping premium goods in circulation, we reduce moving landfill waste by up to 60% per household.",
            },
            {
              icon: "🤝",
              title: "Zero-Hassle Support",
              desc: "Our concierge team assists with delivery coordination, inspection handoffs, and quick deposit refunds.",
            },
          ].map((val) => (
            <div
              key={val.title}
              className="bg-white rounded-card border border-brand-border p-6 shadow-soft flex flex-col"
            >
              <div className="w-12 h-12 rounded-base bg-brand-light text-brand-primary text-2xl flex items-center justify-center mb-4">
                {val.icon}
              </div>
              <h3 className="text-base font-bold text-brand-dark mb-2">{val.title}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner (Clean SPA navigate) ── */}
      <section className="max-w-5xl mx-auto px-[4vw]">
        <div className="bg-brand-dark text-white rounded-card p-8 sm:p-12 text-center shadow-card relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Ready to Upgrade Your Living Space?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mb-6">
              Browse our curated collection of living room, dining, and lifestyle rentals available today.
            </p>
            <button
              type="button"
              onClick={() => navigate("rent")}
              className="px-8 py-3 bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold rounded-base shadow-soft transition-colors"
            >
              Explore Rentals Now →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
