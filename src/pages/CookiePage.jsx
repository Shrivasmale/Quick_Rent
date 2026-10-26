export default function CookiePage() {
  return (
    <>
      <style>{`
        .cookies-page { padding-top: 84px; min-height: 100vh; background: #FAF9F8; font-family: var(--font-sans); }
        .cookies-hero { max-width: 1080px; margin: 0 auto; padding: 48px 32px 40px; background: #1A1D20; border-radius: 24px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12); position: relative; overflow: hidden; }
        .cookies-hero-content { position: relative; z-index: 1; }
        .cookies-badge { display: inline-block; background: rgba(226, 75, 54, 0.2); color: #FF8A7A; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 8px 16px; border-radius: 20px; margin-bottom: 20px; }
        .cookies-hero h1 { font-family: var(--font-heading); font-size: 3rem; color: #ffffff; margin: 0 0 18px; line-height: 1.15; font-weight: 700; }
        .cookies-hero p { max-width: 760px; color: rgba(255, 255, 255, 0.82); line-height: 1.8; font-size: 1.05rem; margin: 0; }
        .cookies-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 34px; }
        .cookies-card { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; padding: 24px; color: #f5f5f5; }
        .cookies-card strong { display: block; font-size: 1.05rem; margin-bottom: 8px; font-weight: 700; }
        .cookies-card p { margin: 0; color: rgba(255, 255, 255, 0.78); line-height: 1.7; font-size: 0.92rem; }
        .cookies-body { max-width: 1080px; margin: 0 auto; padding: 42px 32px 80px; }
        .cookies-section { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
        .cookies-section:nth-child(odd) .cookies-panel { background: #fff; }
        .cookies-panel { background: white; border-radius: 16px; padding: 28px 30px; border: 1px solid #ECECEB; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); }
        .cookies-panel h2 { font-size: 1.35rem; margin-bottom: 14px; color: #111827; font-weight: 700; }
        .cookies-panel p { margin: 0 0 14px; color: #4b5563; line-height: 1.75; font-size: 0.95rem; }
        .cookies-panel ul { padding-left: 20px; margin: 0; color: #4b5563; }
        .cookies-panel ul li { margin-bottom: 10px; line-height: 1.7; font-size: 0.92rem; }
        .cookies-action { max-width: 1080px; margin: 0 auto; padding: 0 32px 40px; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        .cookies-action p { margin: 0; color: #374151; font-size: 0.95rem; line-height: 1.7; }
        .cookies-action a { display: inline-flex; align-items: center; justify-content: center; padding: 12px 26px; background: #E24B36; color: white; border-radius: 8px; text-decoration: none; font-weight: 700; transition: background 0.2s; }
        .cookies-action a:hover { background: #C93C29; }
        @media (max-width: 960px) { .cookies-summary { grid-template-columns: 1fr; } .cookies-section { grid-template-columns: 1fr; } .cookies-action { flex-direction: column; align-items: stretch; text-align: center; } }
        @media (max-width: 720px) { .cookies-hero { padding: 36px 20px 28px; } .cookies-hero h1 { font-size: 2.1rem; } .cookies-body { padding: 32px 20px 70px; } }
      `}</style>
      <div className="cookies-page">
        <section className="cookies-hero">
          <div className="cookies-hero-content">
            <span className="cookies-badge">Cookie Policy</span>
            <h1>Cookies keep your QuickRent experience faster, safer, and more personal.</h1>
            <p>We use cookies and similar technologies to save your preferences, secure your session, and tailor the platform so renting and listing items feels effortless.</p>
          </div>
          <div className="cookies-summary">
            <div className="cookies-card">
              <strong>Essential cookies</strong>
              <p>These are required for login, checkout, and secure browsing. They keep QuickRent working the way it should.</p>
            </div>
            <div className="cookies-card">
              <strong>Performance cookies</strong>
              <p>These help us understand how the site performs so we can make pages faster and more reliable for everyone.</p>
            </div>
            <div className="cookies-card">
              <strong>Functional cookies</strong>
              <p>These save your layout preferences, language choices, and settings so the site feels customized to you.</p>
            </div>
          </div>
        </section>
        <div className="cookies-body">
          <div className="cookies-section">
            <div className="cookies-panel">
              <h2>What cookies do</h2>
              <p>Cookies are small pieces of data that help QuickRent remember your choices and deliver a faster booking experience.</p>
              <p>They also protect your account by keeping sessions secure and detecting unusual activity on the platform.</p>
            </div>
            <div className="cookies-panel">
              <h2>Managing cookies</h2>
              <p>You can control cookie settings through your browser or device preferences at any time.</p>
              <ul>
                <li>Allow essential cookies to keep core features working.</li>
                <li>Disable performance cookies if you prefer less tracking.</li>
                <li>Note that disabling some cookies may affect your QuickRent experience.</li>
              </ul>
            </div>
          </div>
          <div className="cookies-section">
            <div className="cookies-panel">
              <h2>How we use cookies</h2>
              <p>We use cookies to remember your settings, show relevant content, and analyze site performance so the marketplace stays fast.</p>
              <p>That includes making sure search results load quickly and your rental checkout is smooth.</p>
            </div>
            <div className="cookies-panel">
              <h2>Cookie safety</h2>
              <p>QuickRent only uses cookies for support and site improvement. We do not sell your cookie data to third parties.</p>
              <p>If you have questions about how cookies work, we’re happy to help — just reach out to support.</p>
            </div>
          </div>
        </div>
        <div className="cookies-action">
          <p>If you'd like, you can manage your cookie preferences in your browser settings or contact our support team for assistance.</p>
          <a href="#">Contact Support</a>
        </div>
      </div>
    </>
  );
}
