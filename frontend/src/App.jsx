// frontend/src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import RentPage from "./pages/RentPage";
import ListPage from "./pages/ListPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiePage from "./pages/CookiePage";
import AuthModal from "./components/AuthModal";
import ForgotPassword from "./components/ForgotPassword";
import ProtectedRoute from "./middleware/ProtectedRoute";
import ErrorBoundary from "./middleware/ErrorBoundary";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import { useItems } from "./hooks/useItems";
import { useRentals } from "./hooks/useRentals";
import { useLocalStorage } from "./hooks/useLocalStorage";
import StorefrontTopBar from "./components/storefront/StorefrontTopBar";
import StorefrontNavbar from "./components/storefront/StorefrontNavbar";
import StorefrontFooter from "./components/storefront/StorefrontFooter";

export default function App() {
  const { user, updateUserRole } = useAuth();
  const { isStorefront, theme, toggleTheme } = useTheme();
  const { items, addItem } = useItems();
  const { rentals, bookItem } = useRentals(user?.id);
  const [wishlist, setWishlist] = useLocalStorage("qr_wishlist", []);

  const [currentPage, setCurrentPage] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'signup' | 'forgot' | null
  const [profileDefaultTab, setProfileDefaultTab] = useState("overview");
  const [rentInitialCategory, setRentInitialCategory] = useState("All");
  const [rentInitialSearch, setRentInitialSearch] = useState("");

  const navigate = (page, params = {}) => {
    if (params?.item) {
      setSelectedItem(params.item);
    } else if (page !== "rent") {
      setSelectedItem(null);
    }

    if (params?.tab) {
      setProfileDefaultTab(params.tab);
    }

    if (params?.category) {
      setRentInitialCategory(params.category);
    } else if (page === "rent" && !params?.category) {
      setRentInitialCategory("All");
    }

    if (params?.search !== undefined) {
      setRentInitialSearch(params.search);
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleWishlist = (itemId) => {
    setWishlist((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col ${isStorefront ? "bg-[#FAF9F5] text-[#1A1E20]" : "bg-brand-bg text-brand-dark"}`}>
        {/* Top Utility Announcement Bar (Storefront Theme) */}
        {isStorefront && <StorefrontTopBar />}

        {/* Dynamic Theme Navbar */}
        {isStorefront ? (
          <StorefrontNavbar
            currentPage={currentPage}
            navigate={navigate}
            openAuth={setAuthModal}
            wishlistCount={wishlist.length}
          />
        ) : (
          <Navbar
            currentPage={currentPage}
            navigate={navigate}
            openAuth={setAuthModal}
            wishlistCount={wishlist.length}
          />
        )}

        {/* Dynamic Route View */}
        <div className="flex-grow">
          {currentPage === "home" && (
            <Hero
              items={items}
              onSelectItem={(item) => navigate("rent", { item })}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
              navigate={navigate}
            />
          )}

          {currentPage === "rent" && (
            <RentPage
              items={items}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
              onBookItem={bookItem}
              openAuth={setAuthModal}
              user={user}
              initialCategory={rentInitialCategory}
              initialSearch={rentInitialSearch}
            />
          )}

          {currentPage === "list" && (
            <ProtectedRoute onAuthRequired={setAuthModal}>
              <ListPage
                onAddItem={addItem}
                navigate={navigate}
                user={user}
                openAuth={setAuthModal}
              />
            </ProtectedRoute>
          )}

          {currentPage === "profile" && (
            <ProtectedRoute onAuthRequired={setAuthModal}>
              <ProfilePage
                user={user}
                rentals={rentals}
                items={items}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
                onSelectItem={(item) => navigate("rent", { item })}
                updateUserRole={updateUserRole}
                navigate={navigate}
                defaultTab={profileDefaultTab}
              />
            </ProtectedRoute>
          )}

          {currentPage === "about" && <AboutPage navigate={navigate} />}
          {currentPage === "privacy" && <PrivacyPage />}
          {currentPage === "terms" && <TermsPage />}
          {currentPage === "cookie" && <CookiePage />}
        </div>

        {/* Authentication Dialog Modals */}
        {authModal === "forgot" && (
          <ForgotPassword onBack={() => setAuthModal("login")} />
        )}
        {(authModal === "login" || authModal === "signup") && (
          <AuthModal
            mode={authModal}
            onClose={() => setAuthModal(null)}
            switchMode={setAuthModal}
          />
        )}

        {/* Dynamic Theme Footer */}
        {isStorefront ? (
          <StorefrontFooter navigate={navigate} />
        ) : (
          <Footer navigate={navigate} />
        )}

        {/* Floating Theme Switcher Pill */}
        <div className="fixed bottom-5 right-5 z-50">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0E2721] text-white shadow-lg hover:shadow-xl border border-white/20 text-xs font-semibold hover:bg-[#163A32] transition-all transform hover:-translate-y-0.5"
            title="Toggle between Storefront and Classic UI themes"
          >
            <span>{isStorefront ? "🌿" : "⚡"}</span>
            <span>Theme: {isStorefront ? "Storefront" : "Classic"}</span>
            <span className="text-[10px] opacity-70 underline ml-1">Switch</span>
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}

