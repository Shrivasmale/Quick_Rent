import React, { useState } from "react";

export default function Footer({ navigate }) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="site-footer">
      <style>{`
        .site-footer {
          background-color: #FAF9F8;
          color: #2D3136;
          padding: 60px 4vw 28px;
          border-top: 1px solid #ECECEB;
          margin-top: 60px;
        }

        .footer-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.3fr;
          gap: 48px;
          margin-bottom: 48px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
        }

        .footer-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          margin-bottom: 16px;
        }

        .footer-logo-badge {
          width: 38px;
          height: 38px;
          background: #E24B36;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 800;
          font-size: 1.15rem;
          box-shadow: 0 3px 8px rgba(226, 75, 54, 0.35);
        }

        .footer-logo-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1A1D20;
          letter-spacing: -0.3px;
        }

        .footer-logo-name span {
          color: #E24B36;
        }

        .footer-desc {
          color: #6C757D;
          line-height: 1.65;
          font-size: 0.92rem;
          max-width: 320px;
          margin-bottom: 22px;
        }

        .footer-social-row {
          display: flex;
          gap: 12px;
        }

        .social-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #E2E2E0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #495057;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .social-circle-btn:hover {
          background: #E24B36;
          color: #ffffff;
          border-color: #E24B36;
          transform: translateY(-2px);
        }

        .footer-col-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1A1D20;
          margin-bottom: 20px;
        }

        .footer-link-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link-item {
          color: #6C757D;
          font-size: 0.92rem;
          cursor: pointer;
          transition: color 0.15s ease;
        }

        .footer-link-item:hover {
          color: #E24B36;
        }

        .newsletter-desc {
          font-size: 0.88rem;
          color: #6C757D;
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .newsletter-input {
          padding: 12px 16px;
          border: 1px solid #DEDEDC;
          border-radius: 8px;
          font-size: 0.9rem;
          outline: none;
          background: #ffffff;
          color: #2D3136;
        }

        .newsletter-input:focus {
          border-color: #E24B36;
        }

        .newsletter-btn {
          padding: 11px 20px;
          background: #E24B36;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .newsletter-btn:hover {
          background: #C93C29;
        }

        .footer-bottom-bar {
          max-width: 1240px;
          margin: 0 auto;
          padding-top: 24px;
          border-top: 1px solid #EAEAEA;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #8C9196;
          font-size: 0.85rem;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-legal-links {
          display: flex;
          gap: 20px;
        }

        .footer-legal-link {
          color: #8C9196;
          cursor: pointer;
          transition: color 0.15s ease;
        }

        .footer-legal-link:hover {
          color: #1A1D20;
        }

        @media (max-width: 960px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 580px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="footer-inner">
        {/* Brand Col */}
        <div className="footer-brand-col">
          <div className="footer-logo-row" onClick={() => navigate("home")}>
            <div className="footer-logo-badge">Q</div>
            <div className="footer-logo-name">
              Quick<span>Rent</span>
            </div>
          </div>
          <p className="footer-desc">
            Affordable elegance and lasting comfort for modern homes. Rent designer furniture
            and curated living essentials on flexible terms.
          </p>
          <div className="footer-social-row">
            <span className="social-circle-btn" title="Facebook">f</span>
            <span className="social-circle-btn" title="Twitter">𝕏</span>
            <span className="social-circle-btn" title="Instagram">ig</span>
            <span className="social-circle-btn" title="LinkedIn">in</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-link-list">
            <li className="footer-link-item" onClick={() => navigate("home")}>Home</li>
            <li className="footer-link-item" onClick={() => navigate("rent")}>Store / Browse</li>
            <li className="footer-link-item" onClick={() => navigate("rent")}>Products</li>
            <li className="footer-link-item" onClick={() => navigate("about")}>About Us</li>
            <li className="footer-link-item" onClick={() => navigate("about")}>Contact Us</li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h4 className="footer-col-title">Important Links</h4>
          <ul className="footer-link-list">
            <li className="footer-link-item" onClick={() => navigate("privacy")}>Privacy Policy</li>
            <li className="footer-link-item" onClick={() => navigate("terms")}>Terms of Service</li>
            <li className="footer-link-item" onClick={() => navigate("cookie")}>Cookie Policy</li>
            <li className="footer-link-item" onClick={() => navigate("terms")}>Refund Policy</li>
            <li className="footer-link-item" onClick={() => navigate("about")}>Trust & Safety</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="footer-col-title">Newsletter</h4>
          <p className="newsletter-desc">
            Subscribe for seasonal arrivals, interior styling tips, and exclusive rental discount offers.
          </p>
          {subscribed ? (
            <div style={{ color: "#2E7D32", fontWeight: 600, fontSize: "0.9rem" }}>
              ✅ You are subscribed! Check your inbox soon.
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div>
          © {currentYear} QuickRent Inc. All rights reserved.
        </div>
        <div className="footer-legal-links">
          <span className="footer-legal-link" onClick={() => navigate("privacy")}>Privacy</span>
          <span className="footer-legal-link" onClick={() => navigate("terms")}>Terms</span>
          <span className="footer-legal-link" onClick={() => navigate("cookie")}>Cookies</span>
        </div>
      </div>
    </footer>
  );
}