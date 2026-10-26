// frontend/src/components/Footer.jsx
import React, { useState } from "react";

export default function Footer({ navigate }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-bg text-brand-dark border-t border-brand-border mt-auto pt-14 pb-8 px-[4vw]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-brand-border">
        {/* Brand Column */}
        <div className="md:col-span-1 flex flex-col">
          <div
            onClick={() => navigate("home")}
            className="flex items-center gap-2.5 cursor-pointer select-none mb-4"
          >
            <div className="w-[34px] h-[34px] bg-brand-primary rounded-[8px] flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              QR
            </div>
            <span className="text-xl font-bold tracking-tight">
              Quick<span className="text-brand-primary">Rent</span>
            </span>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed mb-4">
            India's modern rental platform for high-quality furniture, decor, and living essentials.
          </p>
          <div className="text-xs text-brand-muted">
            📍 Pune · Mumbai · Bangalore · Delhi
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm text-brand-muted font-medium">
            <li><button type="button" onClick={() => navigate("rent")} className="hover:text-brand-primary transition-colors">Browse Store</button></li>
            <li><button type="button" onClick={() => navigate("list")} className="hover:text-brand-primary transition-colors">List Your Item</button></li>
            <li><button type="button" onClick={() => navigate("profile")} className="hover:text-brand-primary transition-colors">My Rentals</button></li>
            <li><button type="button" onClick={() => navigate("about")} className="hover:text-brand-primary transition-colors">About Us</button></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-4">Trust & Legal</h4>
          <ul className="space-y-2.5 text-sm text-brand-muted font-medium">
            <li><button type="button" onClick={() => navigate("privacy")} className="hover:text-brand-primary transition-colors">Privacy Policy</button></li>
            <li><button type="button" onClick={() => navigate("terms")} className="hover:text-brand-primary transition-colors">Terms of Service</button></li>
            <li><button type="button" onClick={() => navigate("cookie")} className="hover:text-brand-primary transition-colors">Cookie Preferences</button></li>
            <li><span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded font-semibold">🔒 256-bit SSL Security</span></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark mb-4">Stay Inspired</h4>
          <p className="text-xs text-brand-muted mb-3 leading-relaxed">
            Get curated home staging ideas and exclusive weekly rental discounts.
          </p>
          {subscribed ? (
            <div className="p-3 bg-brand-light text-brand-primary text-xs font-semibold rounded-base border border-brand-primary/20">
              ✓ Thank you! You are subscribed to QuickRent updates.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="flex-1 px-3 py-2 text-xs bg-white border border-brand-border rounded-base outline-none focus:border-brand-primary transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-base transition-colors shadow-soft"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Attribution */}
      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-2">
        <div>© {new Date().getFullYear()} QuickRent Marketplace Inc. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <span>Serverless Microservices</span>
          <span>·</span>
          <span>Supabase PostgreSQL + RLS</span>
        </div>
      </div>
    </footer>
  );
}
