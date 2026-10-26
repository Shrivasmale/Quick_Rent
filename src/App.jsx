import { useState, createContext, useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import RentPage from "./pages/RentPage";
import ListPage from "./pages/ListPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiePage from "./pages/CookiePage";
import AuthModal from "./components/AuthModal";
import ProfilePage from "./pages/ProfilePage";
import ItemDetailPage from "./pages/ItemDetailPage";
import BookingForm from "./components/BookingForm";
import Footer from "./components/footer";
import ForgotPassword from "./components/ForgotPassword";


export const AuthContext = createContext(null);
export const AppContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const useApp = () => useContext(AppContext);

function getDemoItems() {
  return [
    { id: 1, title: "Black Relax ST Chair & Table", category: "Furniture & Living", price: 150, deposit: 600, city: "Pune", condition: "Pristine", description: "Modern black metal framed relaxed dining chairs with stylish bistro table. Weather resistant and ergonomic.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Aarav Sharma", ownerPhone: "9876543210", createdAt: new Date().toISOString(), rentCount: 42, rating: "5.0", image: "/images/chair_black_relax.jpg" },
    { id: 2, title: "Cozy Duo with Table", category: "Furniture & Living", price: 170, deposit: 750, city: "Mumbai", condition: "Brand New", description: "Set of two boucle cream lounge armchairs paired with a solid oak round coffee table. Unmatched comfort.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Priya Nair", ownerPhone: "9876543211", createdAt: new Date().toISOString(), rentCount: 38, rating: "4.9", image: "/images/chair_cozy_duo.jpg" },
    { id: 3, title: "Elegant Brown Table", category: "Furniture & Living", price: 75, deposit: 300, city: "Bangalore", condition: "Excellent", description: "Minimalist solid dark walnut timber accent table with tripod legs. Ideal for living spaces and corners.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Vikram Singh", ownerPhone: "9876543212", createdAt: new Date().toISOString(), rentCount: 29, rating: "4.8", image: "/images/table_elegant_brown.jpg" },
    { id: 4, title: "White Cushion Back Chair", category: "Furniture & Living", price: 95, deposit: 400, city: "Pune", condition: "Excellent", description: "Contemporary natural oak chair with plush rounded white cushion back. Includes cozy accent throw.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Sneha Patil", ownerPhone: "9876543213", createdAt: new Date().toISOString(), rentCount: 31, rating: "4.9", image: "/images/chair_white_cushion.jpg" },
    { id: 5, title: "Cushion Comfort Chair", category: "Furniture & Living", price: 90, deposit: 350, city: "Delhi", condition: "Pristine", description: "Sculpted royal blue velvet accent chair with tapered natural wood legs. Soft touch luxury finish.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Rohan Kapoor", ownerPhone: "9876543214", createdAt: new Date().toISOString(), rentCount: 25, rating: "5.0", image: "/images/chair_blue_velvet.jpg" },
    { id: 6, title: "Softwood Chair", category: "Furniture & Living", price: 85, deposit: 320, city: "Pune", condition: "Brand New", description: "Architectural solid light oak dining chair designed for posture support and seamless minimalism.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Ananya Rao", ownerPhone: "9876543215", createdAt: new Date().toISOString(), rentCount: 19, rating: "4.8", image: "/images/chair_softwood.jpg" },
    { id: 7, title: "Home Lounge Set", category: "Furniture & Living", price: 220, deposit: 900, city: "Mumbai", condition: "Excellent", description: "Round dining table with two supportive upholstered armchairs. Perfect for intimate spaces and breakfasts.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Rahul Sharma", ownerPhone: "9876543210", createdAt: new Date().toISOString(), rentCount: 33, rating: "5.0", image: "/images/table_lounge_dining.jpg" },
    { id: 8, title: "Sony A7III Camera", category: "Electronics", price: 800, deposit: 5000, city: "Pune", condition: "Excellent", description: "Full frame mirrorless camera with 28-70mm kit lens. Perfect for events and travel.", isAvailable: true, rentedTill: null, ownerId: 0, ownerName: "Rahul Sharma", ownerPhone: "9876543210", createdAt: new Date().toISOString(), rentCount: 24, rating: "4.8", image: "" },
  ];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [authModal, setAuthModal] = useState(null);

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("qr_user")) || null; }
    catch { return null; }
  });

  const [items, setItems] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem("qr_items"));
      return s && s.length > 0 ? s : getDemoItems();
    } catch { return getDemoItems(); }
  });

  const [rentals, setRentals] = useState(() => {
    try { return JSON.parse(localStorage.getItem("qr_rentals")) || []; }
    catch { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("qr_wishlist")) || []; }
    catch { return []; }
  });

  useEffect(() => { localStorage.setItem("qr_items", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("qr_rentals", JSON.stringify(rentals)); }, [rentals]);
  useEffect(() => { localStorage.setItem("qr_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  // Auto-release items when rent is over
  useEffect(() => {
    const checkExpiry = () => {
      const todayString = new Date().toISOString().split("T")[0];
      setItems(prev => {
        let hasChanges = false;
        const updated = prev.map(it => {
          if (!it.isAvailable && it.rentedTill && it.rentedTill < todayString) {
            hasChanges = true;
            return { ...it, isAvailable: true, rentedTill: null };
          }
          return it;
        });
        return hasChanges ? updated : prev;
      });
    };
    checkExpiry();
    const timer = setInterval(checkExpiry, 60000 * 5); // check every 5 mins
    return () => clearInterval(timer);
  }, []);

  const handleSignup = (userData) => {
    const newUser = { ...userData, id: Date.now(), joinedDate: new Date().toLocaleDateString("en-IN") };
    setUser(newUser);
    localStorage.setItem("qr_user", JSON.stringify(newUser));
    setAuthModal(null);
  };

  const handleLogin = (userData) => {
    const u = { ...userData, id: userData.id || Date.now() };
    setUser(u);
    localStorage.setItem("qr_user", JSON.stringify(u));
    setAuthModal(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("qr_user");
    setCurrentPage("home");
  };

  const updateUserRole = (newRole) => {
    const updated = { ...user, role: newRole };
    setUser(updated);
    localStorage.setItem("qr_user", JSON.stringify(updated));
  };

  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: Date.now(),
      ownerId: user?.id,
      ownerName: user?.name,
      ownerPhone: user?.phone,
      createdAt: new Date().toISOString(),
      isAvailable: true,
      rentedTill: null,
      rentCount: 0,
      rating: "New",
    };
    setItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const rentItem = (rentalData) => {
    const newRental = {
      ...rentalData,
      id: Date.now(),
      renterId: user?.id,
      renterName: user?.name,
      renterEmail: user?.email,
      renterPhone: user?.phone,
      status: "active",
      createdAt: new Date().toISOString(),
      receiptId: "QR" + Date.now().toString().slice(-8),
    };
    setRentals(prev => [newRental, ...prev]);
    setItems(prev => prev.map(it =>
      it.id === rentalData.itemId
        ? { ...it, isAvailable: false, rentedTill: rentalData.endDate, rentCount: (it.rentCount || 0) + 1 }
        : it
    ));
    return newRental;
  };

  const toggleWishlist = (itemId) => {
    setWishlist(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const navigate = (page, item = null) => {
    setSelectedItem(item);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleSignup, handleLogout, updateUserRole }}>
      <AppContext.Provider value={{ items, rentals, wishlist, addItem, rentItem, toggleWishlist, selectedItem }}>
        <div style={{ fontFamily: "var(--font-sans)", minHeight: "100vh", background: "#ffffff", width: "100%" }}>
          <Navbar currentPage={currentPage} navigate={navigate} openAuth={setAuthModal} />
          {currentPage === "home"    && <Hero navigate={navigate} />}
          {currentPage === "rent"    && <RentPage navigate={navigate} openAuth={setAuthModal} />}
          {currentPage === "list"    && <ListPage navigate={navigate} openAuth={setAuthModal} />}
          {currentPage === "about"   && <AboutPage navigate={navigate} />}
          {currentPage === "privacy" && <PrivacyPage />}
          {currentPage === "terms"   && <TermsPage />}
          {currentPage === "cookie"  && <CookiePage />}
          {currentPage === "profile" && <ProfilePage navigate={navigate} />}
          {authModal === "forgot" && <ForgotPassword onBack={() => setAuthModal("login")} />}
          {(authModal === "login" || authModal === "signup") && (
            <AuthModal mode={authModal} onClose={() => setAuthModal(null)} switchMode={setAuthModal} />
          )}
          <Footer navigate={navigate} />
        </div>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}