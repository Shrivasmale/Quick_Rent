// frontend/src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { downloadRentalReceipt } from "../utils/generateReceipt";
import ListingCard from "../components/ListingCard";

// Sub-components declared outside render to prevent React re-creation & ESLint errors
function StatBox({ icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-card border border-brand-border shadow-soft flex items-center gap-3">
      <div className="w-10 h-10 rounded-base bg-brand-light text-brand-primary flex items-center justify-center text-lg font-bold shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-xs text-brand-muted font-medium">{label}</div>
        <div className="text-lg font-extrabold text-brand-dark">{value}</div>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, desc, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-card border border-brand-border p-10 text-center text-brand-muted my-4">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-base font-bold text-brand-dark mb-1">{title}</h3>
      <p className="text-xs max-w-xs mx-auto mb-4">{desc}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="px-5 py-2 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-base shadow-soft transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function RentalRow({ rental, user }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadRentalReceipt(rental, user);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-card border border-brand-border p-4 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-base bg-brand-bg border border-brand-border flex items-center justify-center text-xl shrink-0">
          📦
        </div>
        <div>
          <div className="text-sm font-bold text-brand-dark">{rental.item_title || rental.itemTitle || "Rental Contract"}</div>
          <div className="text-xs text-brand-muted mt-0.5">
            {rental.start_date || rental.startDate} → {rental.end_date || rental.endDate} · {rental.days || 1} day(s)
          </div>
          <div className="text-[11px] text-green-700 font-semibold mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {rental.status || "CONFIRMED"} · Receipt ID: {rental.receipt_id || rental.receiptId || "QR-REC"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <div className="text-right">
          <div className="text-base font-extrabold text-brand-primary">
            ₹{rental.total_price || rental.grand_total || rental.grandTotal || (rental.total_amount_paise ? rental.total_amount_paise / 100 : 0)}
          </div>
          <div className="text-[10px] text-brand-muted">Total Paid</div>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="px-3 py-1.5 bg-brand-bg hover:bg-brand-light text-brand-dark border border-brand-border rounded-base text-xs font-bold transition-colors flex items-center gap-1"
        >
          <span>🧾</span>
          <span>{downloading ? "Opening..." : "Invoice"}</span>
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage({ user, rentals = [], items = [], wishlist = [], onToggleWishlist, onSelectItem, updateUserRole, navigate, defaultTab = "overview" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [roleModal, setRoleModal] = useState(false);

  const myListings = items.filter((it) => it.owner_id === user?.id || it.ownerId === user?.id);
  const myRentals = rentals;
  const wishlistedItems = items.filter((it) => wishlist.includes(it.id));

  const isLister = user?.role === "lister";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "rentals", label: `My Rentals (${myRentals.length})` },
    { id: "wishlist", label: `Saved (${wishlistedItems.length})` },
    ...(isLister ? [{ id: "listings", label: `My Listings (${myListings.length})` }] : []),
  ];

  return (
    <div className="min-h-screen bg-brand-bg pt-[72px] pb-16 px-[4vw]">
      <div className="max-w-5xl mx-auto mt-6">
        {/* Profile Card Banner */}
        <div className="bg-brand-dark text-white rounded-card p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left z-10">
            <div className="w-16 h-16 rounded-full bg-brand-primary text-white text-2xl font-black flex items-center justify-center shadow-soft">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-primary/20 text-brand-primary uppercase">
                  {user?.role}
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">
                {user?.email} · 📍 {user?.city || "Pune"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRoleModal(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-base text-xs font-bold backdrop-blur-sm transition-colors z-10"
          >
            Switch to {isLister ? "Renter Mode" : "Lister Mode"}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-brand-border mt-8 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-base border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-brand-primary text-brand-primary bg-white"
                  : "border-transparent text-brand-muted hover:text-brand-dark"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatBox icon="📦" label="Total Bookings" value={myRentals.length} />
                <StatBox icon="❤️" label="Saved Items" value={wishlistedItems.length} />
                <StatBox icon="🏷️" label="Active Listings" value={myListings.length} />
              </div>

              {/* Recent Rentals Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-muted">
                  Recent Bookings
                </h3>
                {myRentals.length === 0 ? (
                  <EmptyState
                    icon="📦"
                    title="No Bookings Yet"
                    desc="You haven't booked any rental items yet. Browse our store to get started."
                    actionLabel="Explore Catalog"
                    onAction={() => navigate("rent")}
                  />
                ) : (
                  myRentals.slice(0, 3).map((r) => <RentalRow key={r.id} rental={r} user={user} />)
                )}
              </div>
            </div>
          )}

          {activeTab === "rentals" && (
            <div className="space-y-3">
              {myRentals.length === 0 ? (
                <EmptyState
                  icon="📦"
                  title="No Active Rentals"
                  desc="You do not have any active rental orders."
                  actionLabel="Browse Available Items"
                  onAction={() => navigate("rent")}
                />
              ) : (
                myRentals.map((r) => <RentalRow key={r.id} rental={r} user={user} />)
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div>
              {wishlistedItems.length === 0 ? (
                <EmptyState
                  icon="❤️"
                  title="Your Wishlist is Empty"
                  desc="Save items to compare and book later by clicking the heart button on any item."
                  actionLabel="Discover Items"
                  onAction={() => navigate("rent")}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedItems.map((item) => (
                    <ListingCard
                      key={item.id}
                      item={item}
                      onSelect={onSelectItem}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={true}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "listings" && isLister && (
            <div>
              {myListings.length === 0 ? (
                <EmptyState
                  icon="🏷️"
                  title="No Listings Published"
                  desc="You haven't listed any items for rent yet. Earn passive income by sharing your unused goods."
                  actionLabel="Create First Listing"
                  onAction={() => navigate("list")}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myListings.map((item) => (
                    <ListingCard
                      key={item.id}
                      item={item}
                      onSelect={onSelectItem}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlist.includes(item.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Role Switcher Modal */}
      {roleModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setRoleModal(false)}
        >
          <div className="bg-white rounded-modal shadow-2xl border border-brand-border w-full max-w-sm p-6 text-brand-dark">
            <h3 className="text-xl font-bold mb-2">Switch Account Role</h3>
            <p className="text-xs text-brand-muted mb-4">
              Select your primary mode on QuickRent. You can toggle between modes at any time.
            </p>
            <div className="space-y-2 mb-6">
              <button
                type="button"
                onClick={() => {
                  updateUserRole("renter");
                  setRoleModal(false);
                }}
                className={`w-full p-3 rounded-base border text-left font-bold text-sm transition-colors ${
                  user?.role === "renter"
                    ? "bg-brand-light border-brand-primary text-brand-primary"
                    : "border-brand-border hover:bg-brand-bg text-brand-dark"
                }`}
              >
                🔍 Renter Mode (Discover and rent items)
              </button>
              <button
                type="button"
                onClick={() => {
                  updateUserRole("lister");
                  setRoleModal(false);
                }}
                className={`w-full p-3 rounded-base border text-left font-bold text-sm transition-colors ${
                  user?.role === "lister"
                    ? "bg-brand-light border-brand-primary text-brand-primary"
                    : "border-brand-border hover:bg-brand-bg text-brand-dark"
                }`}
              >
                📦 Lister Mode (Publish listings & manage earnings)
              </button>
            </div>
            <button
              type="button"
              onClick={() => setRoleModal(false)}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-brand-dark font-bold text-xs rounded-base"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
