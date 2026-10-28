// frontend/src/components/storefront/StorefrontTopBar.jsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function StorefrontTopBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full bg-[#0E2721] text-white/90 text-xs py-2 px-[4vw] border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Free delivery message */}
        <div className="flex items-center gap-2">
          <span>🚚</span>
          <span>Free delivery & setup on orders over ₹999</span>
        </div>

        {/* Center: Sustainable/Trust highlight */}
        <div className="hidden lg:flex items-center gap-2 text-white/80">
          <span>🌿</span>
          <span>Verified Quality & Eco-Friendly Maintenance</span>
        </div>

        {/* Right: Helpline, Currency & Theme Switcher */}
        <div className="flex items-center gap-4 text-white/80">
          <a href="tel:+912048607368" className="hover:text-white transition-colors hidden sm:inline">
            📞 +91 (020) 4860-RENT
          </a>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="font-semibold text-white/90">INR (₹)</span>
          <span className="text-white/30">|</span>
          {/* Quick theme switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium text-[11px] transition-colors"
            title="Switch between Storefront UI and Classic QuickRent UI"
          >
            <span>{theme === "storefront" ? "⚡ Classic UI" : "🌿 Storefront UI"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
