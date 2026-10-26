export default function TermsPage() {
  return (
    <>
      <style>{`
        .terms-page { padding-top: 84px; min-height: 100vh; background: #FAF9F8; font-family: var(--font-sans); }
        .terms-hero { max-width: 1080px; margin: 0 auto; padding: 48px 32px 40px; background: #1A1D20; border-radius: 24px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12); position: relative; overflow: hidden; }
        .terms-badge { display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 20px; background: rgba(226, 75, 54, 0.2); color: #FF8A7A; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; }
        .terms-hero h1 { font-family: var(--font-heading); font-size: 3rem; color: #fff; margin: 0 0 18px; line-height: 1.15; font-weight: 700; }
        .terms-hero p { max-width: 760px; color: rgba(255, 255, 255, 0.82); line-height: 1.8; font-size: 1.05rem; margin: 0; }
        .terms-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
        .terms-card { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 24px; color: #f5f5f5; }
        .terms-card strong { display: block; font-size: 1.05rem; margin-bottom: 8px; font-weight: 700; }
        .terms-card p { margin: 0; color: rgba(255, 255, 255, 0.78); line-height: 1.7; font-size: 0.92rem; }
        .terms-body { max-width: 1080px; margin: 0 auto; padding: 42px 32px 80px; }
        .terms-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
        .terms-panel { background: #fff; border-radius: 16px; padding: 28px 32px; border: 1px solid #ECECEB; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); }
        .terms-panel h2 { font-size: 1.35rem; margin-bottom: 14px; color: #111827; font-weight: 700; }
        .terms-panel p { margin: 0 0 14px; color: #4B5563; line-height: 1.75; font-size: 0.95rem; }
        .terms-panel ul { padding-left: 20px; margin: 0; color: #4B5563; }
        .terms-panel ul li { margin-bottom: 10px; line-height: 1.7; font-size: 0.92rem; }
        .terms-cta { max-width: 1080px; margin: 0 auto; padding: 0 32px 40px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .terms-cta p { margin: 0; color: #4b5563; font-size: 0.95rem; line-height: 1.7; }
        .terms-cta a { display: inline-flex; align-items: center; justify-content: center; padding: 12px 26px; background: #E24B36; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 700; transition: background 0.2s; }
        .terms-cta a:hover { background: #C93C29; }
        @media (max-width: 960px) { .terms-summary, .terms-section { grid-template-columns: 1fr; } .terms-cta { flex-direction: column; align-items: stretch; text-align: center; } }
        @media (max-width: 720px) { .terms-hero { padding: 36px 20px 28px; } .terms-hero h1 { font-size: 2.1rem; } .terms-body { padding: 32px 20px 70px; } }
      `}</style>
      <div className="terms-page">
        <section className="terms-hero">
          <div className="terms-badge">Terms of Service</div>
          <h1>Rules for renting and sharing on QuickRent, made clear and easy to follow.</h1>
          <p>These terms define how renters, listers, and the platform interact so every transaction stays fair and trusted.</p>
          <div className="terms-summary">
            <div className="terms-card">
              <strong>Fair use</strong>
              <p>Everyone must use QuickRent respectfully, honestly, and in line with the platform’s community standards.</p>
            </div>
            <div className="terms-card">
              <strong>Secure bookings</strong>
              <p>Payments and deposits must be completed before rentals begin so both parties are protected.</p>
            </div>
            <div className="terms-card">
              <strong>Community safety</strong>
              <p>Bad behavior, fraud, or misrepresentation may result in restrictions or account suspension.</p>
            </div>
          </div>
        </section>
        <div className="terms-body">
          <div className="terms-section">
            <div className="terms-panel">
              <h2>Using QuickRent</h2>
              <p>By using QuickRent, you agree to provide accurate information, respect other users, and follow all applicable laws.</p>
              <p>Accounts must represent real individuals, and listings should be honest and accurate.</p>
            </div>
            <div className="terms-panel">
              <h2>Booking & Payment</h2>
              <p>Renters must pay the rental fee and any deposit for a booking to be confirmed. Owners should keep items available and ready as promised.</p>
              <ul>
                <li>Payments must be completed before pickup or delivery.</li>
                <li>Deposits are held to protect against loss or damage.</li>
                <li>Refunds follow the platform’s cancellation and damage policies.</li>
              </ul>
            </div>
          </div>
          <div className="terms-section">
            <div className="terms-panel">
              <h2>Safety & Conduct</h2>
              <p>QuickRent is a community marketplace. Harassment, fraud, and policy abuse are not tolerated.</p>
              <p>Report issues quickly, inspect items carefully, and communicate openly with your rental partner.</p>
            </div>
            <div className="terms-panel">
              <h2>Support & disputes</h2>
              <p>If a rental issue arises, contact support right away. We’ll help resolve disputes fairly and keep the marketplace safe.</p>
            </div>
          </div>
        </div>
        <div className="terms-cta">
          <p>Questions about your rights or obligations on QuickRent? Contact support for help and fast guidance.</p>
          <a href="#">Contact Support</a>
        </div>
      </div>
    </>
  );
}
