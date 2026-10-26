export default function PrivacyPage() {
  return (
    <>
      <style>{`
        .privacy-page { padding-top: 84px; min-height: 100vh; background: #FAF9F8; font-family: var(--font-sans); }
        .privacy-hero { max-width: 1080px; margin: 0 auto; padding: 48px 32px 40px; background: #1A1D20; border-radius: 24px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12); position: relative; overflow: hidden; }
        .privacy-badge { display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 20px; background: rgba(226, 75, 54, 0.2); color: #FF8A7A; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; }
        .privacy-hero h1 { font-family: var(--font-heading); font-size: 3rem; color: #fff; margin: 0 0 18px; line-height: 1.15; font-weight: 700; }
        .privacy-hero p { max-width: 760px; color: rgba(255, 255, 255, 0.82); line-height: 1.8; font-size: 1.05rem; margin: 0; }
        .privacy-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
        .privacy-card { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 24px; color: #f5f5f5; }
        .privacy-card strong { display: block; font-size: 1.05rem; margin-bottom: 8px; font-weight: 700; }
        .privacy-card p { margin: 0; color: rgba(255, 255, 255, 0.78); line-height: 1.7; font-size: 0.92rem; }
        .privacy-body { max-width: 1080px; margin: 0 auto; padding: 42px 32px 80px; }
        .privacy-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
        .privacy-panel { background: #fff; border-radius: 16px; padding: 28px 32px; border: 1px solid #ECECEB; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); }
        .privacy-panel h2 { font-size: 1.35rem; margin-bottom: 14px; color: #111827; font-weight: 700; }
        .privacy-panel p { margin: 0 0 14px; color: #4B5563; line-height: 1.75; font-size: 0.95rem; }
        .privacy-panel ul { padding-left: 20px; margin: 0; color: #4B5563; }
        .privacy-panel ul li { margin-bottom: 10px; line-height: 1.7; font-size: 0.92rem; }
        .privacy-cta { max-width: 1080px; margin: 0 auto; padding: 0 32px 40px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .privacy-cta p { margin: 0; color: #4b5563; font-size: 0.95rem; line-height: 1.7; }
        .privacy-cta a { display: inline-flex; align-items: center; justify-content: center; padding: 12px 26px; background: #E24B36; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 700; transition: background 0.2s; }
        .privacy-cta a:hover { background: #C93C29; }
        @media (max-width: 960px) { .privacy-summary, .privacy-section { grid-template-columns: 1fr; } .privacy-cta { flex-direction: column; align-items: stretch; text-align: center; } }
        @media (max-width: 720px) { .privacy-hero { padding: 36px 20px 28px; } .privacy-hero h1 { font-size: 2.1rem; } .privacy-body { padding: 32px 20px 70px; } }
      `}</style>
      <div className="privacy-page">
        <section className="privacy-hero">
          <div className="privacy-badge">Privacy First</div>
          <h1>Your data belongs to you — we keep it safe and transparent.</h1>
          <p>QuickRent is built to protect your personal information while giving you the freedom to rent and lend with confidence.</p>
          <div className="privacy-summary">
            <div className="privacy-card">
              <strong>Secure by design</strong>
              <p>Every account action and booking is protected by smart controls and secure session handling.</p>
            </div>
            <div className="privacy-card">
              <strong>Clear usage</strong>
              <p>We use data only to deliver the service, improve the platform, and keep our marketplace trustworthy.</p>
            </div>
            <div className="privacy-card">
              <strong>Your control</strong>
              <p>Update profile details, review settings, or request data removal when you need to.</p>
            </div>
          </div>
        </section>
        <div className="privacy-body">
          <div className="privacy-section">
            <div className="privacy-panel">
              <h2>Information we collect</h2>
              <p>We gather only what is necessary to support rentals, verify accounts, and keep transactions reliable.</p>
              <ul>
                <li>Personal details like name, email, phone, and profile data.</li>
                <li>Booking information, rental histories, and item preferences.</li>
                <li>Usage signals such as activity trends, browser type, and device details.</li>
              </ul>
            </div>
            <div className="privacy-panel">
              <h2>How we use your data</h2>
              <p>Your information is used to create a seamless rental experience, resolve issues quickly, and protect the community.</p>
              <ul>
                <li>Process bookings, manage payments, and support listing activity.</li>
                <li>Improve search relevance, item discovery, and personalized recommendations.</li>
                <li>Secure accounts and prevent unauthorized access or fraud.</li>
              </ul>
            </div>
          </div>
          <div className="privacy-section">
            <div className="privacy-panel">
              <h2>Sharing & retention</h2>
              <p>We never sell your personal data. Sharing happens only when needed for rental service delivery or legal compliance.</p>
              <p>We retain information as long as necessary to support your account and the services you use.</p>
            </div>
            <div className="privacy-panel">
              <h2>Your rights</h2>
              <p>You can review, update, or remove your account data at any time. If you have questions, our support team is ready to help.</p>
              <ul>
                <li>Access your stored information.</li>
                <li>Correct inaccurate account details.</li>
                <li>Request data deletion when you no longer need the service.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="privacy-cta">
          <p>Need help with your privacy settings? Reach out to our support team and we’ll guide you through the process.</p>
          <a href="#">Contact Support</a>
        </div>
      </div>
    </>
  );
}
