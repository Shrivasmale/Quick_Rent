import { useState, useEffect } from "react";
import { useAuth, useApp } from "../App";

export default function Navbar({ currentPage, navigate, openAuth }) {
  const { user, handleLogout } = useAuth();
  const { wishlist } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isHome = currentPage === "home";
  const isTransparent = isHome && !scrolled;
  const navBg = isTransparent ? "rgba(22, 24, 28, 0.45)" : "#ffffff";
  const navBorder = isTransparent ? "rgba(255, 255, 255, 0.12)" : "#EAEAEA";
  const textColor = isTransparent ? "#ffffff" : "#22252A";
  const textMuted = isTransparent ? "rgba(255, 255, 255, 0.85)" : "#555A60";

  const role = user?.role || "guest";

  const links = [
    { label: "Home", page: "home" },
    { label: "Store", page: "rent" },
    { label: "Products", page: "rent" },
    { label: "About Us", page: "about" },
    { label: "Blog", page: "home", targetId: "blog-section" },
    { label: "Contact Us", page: "about" },
  ];

  const handleLinkClick = (link) => {
    if (link.targetId && currentPage === "home") {
      const el = document.getElementById(link.targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(link.page);
      if (link.targetId) {
        setTimeout(() => {
          const el = document.getElementById(link.targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .site-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4vw;
          height: 72px;
          transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          border-bottom: 1px solid transparent;
        }
        .site-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }
        .logo-badge {
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
        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.3px;
        }
        .logo-text span {
          color: #E24B36;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .nav-link-btn {
          background: none;
          border: none;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          padding: 6px 0;
          transition: color 0.15s ease, opacity 0.15s ease;
        }
        .nav-link-btn:hover {
          color: #E24B36 !important;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cart-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border-radius: 20px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cart-pill-count {
          background: #E24B36;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 10px;
        }
        .nav-auth-btn {
          padding: 8px 20px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-outline {
          background: transparent;
          border: 1.5px solid currentColor;
        }
        .btn-filled {
          background: #E24B36;
          color: #ffffff !important;
          border: 1.5px solid #E24B36;
        }
        .btn-filled:hover {
          background: #C93C29;
          border-color: #C93C29;
        }
        .user-avatar-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #E24B36;
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
        }
        .nav-dropdown {
          position: absolute;
          top: 70px;
          right: 4vw;
          background: #ffffff;
          border: 1px solid #EAEAEA;
          border-radius: 10px;
          min-width: 220px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          z-index: 1001;
        }
        .nav-dd-header {
          padding: 14px 18px;
          background: #FAF9F8;
          border-bottom: 1px solid #EAEAEA;
        }
        .nav-dd-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: #1A1D20;
        }
        .nav-dd-role {
          font-size: 0.78rem;
          color: #E24B36;
          margin-top: 2px;
          font-weight: 600;
        }
        .nav-dd-item {
          padding: 10px 18px;
          font-size: 0.9rem;
          color: #333;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .nav-dd-item:hover {
          background: #FDF1EF;
          color: #E24B36;
        }
        .nav-dd-danger {
          color: #D32F2F;
        }
        .nav-dd-danger:hover {
          background: #FFEBEE;
        }
        .nav-burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 6px;
        }
        .nav-burger span {
          display: block;
          width: 24px;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
        }
        .mobile-drawer {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: #ffffff;
          border-bottom: 1px solid #EAEAEA;
          padding: 16px 24px 24px;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
          z-index: 999;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mobile-link-item {
          padding: 10px 0;
          font-size: 1rem;
          font-weight: 600;
          color: #22252A;
          border-bottom: 1px solid #F0F0EE;
          cursor: pointer;
        }
        @media (max-width: 860px) {
          .nav-links { display: none; }
          .nav-burger { display: flex; }
          .cart-pill span:not(.cart-pill-count) { display: none; }
        }
      `}</style>

      <nav
        className="site-nav"
        style={{
          backgroundColor: navBg,
          borderBottomColor: navBorder,
          boxShadow: isTransparent ? "none" : "0 2px 14px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Logo */}
        <div className="site-logo" onClick={() => navigate("home")}>
          <div className="logo-badge">Q</div>
          <div className="logo-text" style={{ color: textColor }}>
            Quick<span>Rent</span>
          </div>
        </div>

        {/* Center Links */}
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.label}>
              <button
                className="nav-link-btn"
                style={{
                  color: textMuted,
                  borderBottom: currentPage === link.page && !link.targetId ? "2px solid #E24B36" : "2px solid transparent",
                }}
                onClick={() => handleLinkClick(link)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Cart / Wishlist indicator */}
          <div
            className="cart-pill"
            style={{
              backgroundColor: isTransparent ? "rgba(255, 255, 255, 0.15)" : "#F8F8F7",
              color: textColor,
              border: `1px solid ${isTransparent ? "rgba(255,255,255,0.2)" : "#EAEAEA"}`,
            }}
            onClick={() => navigate("rent")}
            title="View saved rentals"
          >
            <span>Rentals</span>
            <span className="cart-pill-count">{wishlist ? wishlist.length : 0}</span>
          </div>

          {!user ? (
            <>
              <button
                className="nav-auth-btn btn-outline"
                style={{ color: textColor }}
                onClick={() => openAuth("login")}
              >
                Login
              </button>
              <button
                className="nav-auth-btn btn-filled"
                onClick={() => openAuth("signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <div style={{ position: "relative" }}>
              <button
                className="user-avatar-btn"
                onClick={() => setProfileOpen((prev) => !prev)}
                title={user.name}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </button>

              {profileOpen && (
                <div className="nav-dropdown" onClick={() => setProfileOpen(false)}>
                  <div className="nav-dd-header">
                    <div className="nav-dd-name">{user.name}</div>
                    <div className="nav-dd-role">
                      {role === "lister" ? "Verified Lister" : "Active Renter"}
                    </div>
                  </div>
                  <div className="nav-dd-item" onClick={() => navigate("profile")}>
                    My Dashboard
                  </div>
                  <div className="nav-dd-item" onClick={() => navigate("rent")}>
                    Browse Catalog
                  </div>
                  {role === "lister" && (
                    <div className="nav-dd-item" onClick={() => navigate("list")}>
                      List an Item
                    </div>
                  )}
                  <div
                    className="nav-dd-item nav-dd-danger"
                    onClick={() => {
                      handleLogout();
                      setProfileOpen(false);
                    }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="nav-burger"
            style={{ color: textColor }}
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {links.map((link) => (
            <div
              key={link.label}
              className="mobile-link-item"
              onClick={() => handleLinkClick(link)}
            >
              {link.label}
            </div>
          ))}
          {!user ? (
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                className="nav-auth-btn btn-outline"
                style={{ flex: 1, padding: "10px", color: "#22252A", borderColor: "#CCC" }}
                onClick={() => {
                  openAuth("login");
                  setMenuOpen(false);
                }}
              >
                Login
              </button>
              <button
                className="nav-auth-btn btn-filled"
                style={{ flex: 1, padding: "10px" }}
                onClick={() => {
                  openAuth("signup");
                  setMenuOpen(false);
                }}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
              <div style={{ fontWeight: 600, color: "#1A1D20" }}>{user.name}</div>
              <button
                className="nav-auth-btn btn-filled"
                onClick={() => {
                  navigate("profile");
                  setMenuOpen(false);
                }}
              >
                Dashboard
              </button>
              <button
                className="nav-auth-btn btn-outline"
                style={{ color: "#D32F2F", borderColor: "#D32F2F" }}
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}