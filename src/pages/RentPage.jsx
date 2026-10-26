import { useState } from "react";
import { useApp, useAuth } from "../App";
import ItemDetailPage from "./ItemDetailPage";

const CATS = ["All","Electronics","Vehicles","Party & Events","Sports & Outdoor","Tools & Equipment","Furniture & Appliances"];
const ICONS = {
  Electronics:"📷", Vehicles:"🏍️", "Party & Events":"🎉",
  "Sports & Outdoor":"⛺", "Tools & Equipment":"🔧", "Furniture & Appliances":"🛋️",
};

export default function RentPage({ navigate, openAuth }) {
  const { items, wishlist, toggleWishlist } = useApp();
  const { user } = useAuth();

  const [search, setSearch]   = useState("");
  const [cat, setCat]         = useState("All");
  const [city, setCity]       = useState("All");
  const [sortBy, setSortBy]   = useState("newest");
  const [detailItem, setDetailItem] = useState(null); // ← opens full page

  const cities = ["All", ...new Set(items.map(i => i.city))];

  let filtered = items.filter(it => {
    const matchSearch = it.title.toLowerCase().includes(search.toLowerCase()) ||
                        it.city.toLowerCase().includes(search.toLowerCase());
    const matchCat  = cat  === "All" || it.category === cat;
    const matchCity = city === "All" || it.city === city;
    return matchSearch && matchCat && matchCity;
  });

  if (sortBy === "price-low")  filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating")     filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  else filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // If a detail item is selected show full page
  if (detailItem) {
    return (
      <ItemDetailPage
        item={detailItem}
        navigate={(page) => {
          setDetailItem(null);
          if (page !== "rent") navigate(page);
          // if page === "rent" just close detail → back to listing grid
        }}
        openAuth={openAuth}
      />
    );
  }

  return (
    <>
      <style>{`
        .rp { padding-top: 72px; min-height: 100vh; background: #FAF9F8; font-family: var(--font-sans); }
        .rp-hero { background: #1A1D20; padding: 48px 4vw 40px; color: #fff; }
        .rp-hero h1 { font-family: var(--font-heading); font-size: 2.4rem; font-weight: 700; color: #fff; }
        .rp-hero p { font-size: 0.95rem; opacity: 0.82; color: #fff; margin-top: 6px; }
        .rp-search-bar { display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap; max-width: 800px; }
        .rp-input { flex: 1; min-width: 200px; padding: 13px 20px; border-radius: 8px; border: 1px solid #333; font-size: 0.92rem; outline: none; background: #2A2D32; color: #fff; }
        .rp-input::placeholder { color: #888; }
        .rp-select { padding: 13px 20px; border-radius: 8px; border: 1px solid #333; font-size: 0.88rem; outline: none; background: #2A2D32; color: #fff; cursor: pointer; }

        .rp-cats { display: flex; gap: 10px; padding: 24px 4vw 0; overflow-x: auto; scrollbar-width: none; }
        .rp-cats::-webkit-scrollbar { display: none; }
        .rp-cat { padding: 8px 18px; border-radius: 6px; font-size: 0.88rem; font-weight: 500; cursor: pointer; border: 1px solid #E2E2E0; background: #fff; transition: all .15s ease; white-space: nowrap; color: #495057; }
        .rp-cat.active { background: #E24B36; color: #fff; border-color: #E24B36; font-weight: 600; }
        .rp-cat:hover:not(.active) { border-color: #E24B36; color: #E24B36; }

        .rp-bar { display: flex; justify-content: space-between; align-items: center; padding: 20px 4vw 0; flex-wrap: wrap; gap: 12px; }
        .rp-count { font-size: 0.9rem; color: #6C757D; }
        .rp-sort { padding: 8px 16px; border: 1px solid #CCC; border-radius: 6px; font-size: 0.85rem; outline: none; cursor: pointer; background: #fff; color: #2D3136; }

        .rp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; padding: 24px 4vw 56px; max-width: 1300px; margin: 0 auto; }

        .rp-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #ECECEB; box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: transform .2s ease, box-shadow .2s ease; cursor: pointer; position: relative; display: flex; flex-direction: column; }
        .rp-card:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(0,0,0,0.08); border-color: #DDD; }
        .rp-card-img { height: 200px; display: flex; align-items: center; justify-content: center; font-size: 3rem; position: relative; overflow: hidden; background: #F7F7F6; }
        .rp-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rp-tag { position: absolute; top: 12px; left: 12px; border-radius: 4px; padding: 3px 10px; font-size: 0.72rem; font-weight: 700; z-index: 2; text-transform: uppercase; }
        .rp-wish { position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.92); border: 1px solid #E0E0DE; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: transform .15s ease; z-index: 2; }
        .rp-wish:hover { transform: scale(1.12); }

        .rp-body { padding: 18px 20px 20px; display: flex; flex-direction: column; flex-grow: 1; }
        .rp-cat-tag { font-size: 0.75rem; color: #8C9196; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .rp-title { font-size: 1.05rem; font-weight: 700; color: #1A1D20; margin-top: 4px; }
        .rp-loc { font-size: 0.82rem; color: #6C757D; margin-top: 3px; }
        .rp-price { font-size: 1.2rem; font-weight: 800; color: #E24B36; margin-top: 12px; }
        .rp-price span { font-size: 0.75rem; font-weight: 500; color: #888; }
        .rp-meta { display: flex; gap: 12px; margin-top: 8px; font-size: 0.8rem; color: #6C757D; }
        .rp-unavail { display: inline-block; background: #FFEBEE; color: #D32F2F; border-radius: 4px; padding: 3px 10px; font-size: 0.75rem; font-weight: 600; }
        .rp-view-btn {
          width: 100%; margin-top: 14px; padding: 10px;
          background: #FAF9F8; color: #1A1D20;
          border: 1px solid #D0D0CE; border-radius: 6px;
          font-weight: 700; font-size: 0.85rem;
          cursor: pointer; transition: all .15s ease;
        }
        .rp-card:hover .rp-view-btn { background: #E24B36; color: #fff; border-color: #E24B36; }

        @media (max-width: 600px) {
          .rp-hero { padding: 32px 20px 28px; }
          .rp-hero h1 { font-size: 1.85rem; }
          .rp-cats { padding: 16px 20px 0; }
          .rp-bar { padding: 12px 20px 0; }
          .rp-grid { padding: 16px 20px 40px; grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rp">
        {/* Header */}
        <div className="rp-hero">
          <h1>Rent Items Near You</h1>
          <p>Browse verified items — click any item to see full details and book</p>
          <div className="rp-search-bar">
            <input
              className="rp-input"
              placeholder="🔍 Search items, city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="rp-select" value={city} onChange={e => setCity(e.target.value)}>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Category filter */}
        <div className="rp-cats">
          {CATS.map(c => (
            <div key={c} className={`rp-cat ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
              {ICONS[c] || "🔍"} {c}
            </div>
          ))}
        </div>

        {/* Count + sort */}
        <div className="rp-bar">
          <div className="rp-count">{filtered.length} items found</div>
          <select className="rp-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Grid */}
        <div className="rp-grid">
          {filtered.length === 0 && (
            <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"60px 20px", fontFamily:"'DM Sans',sans-serif", color:"#aaa" }}>
              <div style={{ fontSize:"3rem", marginBottom:12 }}>🔍</div>
              <div style={{ fontSize:"1.1rem", fontWeight:600, color:"#555" }}>No items found</div>
              <div style={{ marginTop:6 }}>Try a different search or category</div>
            </div>
          )}

          {filtered.map(item => {
            const isWished = wishlist.includes(item.id);
            const firstImg = item.images?.[0] || item.image || null;

            return (
              <div
                className="rp-card"
                key={item.id}
                onClick={() => setDetailItem(item)}
              >
                {/* Image area */}
                <div className="rp-card-img" style={{
                  background: firstImg
                    ? "transparent"
                    : item.isAvailable
                      ? "linear-gradient(135deg,#ffe0cc,#ffb380)"
                      : "linear-gradient(135deg,#f0f0f0,#e0e0e0)"
                }}>
                  {firstImg
                    ? <img src={firstImg} alt={item.title} />
                    : <span style={{ fontSize:"3rem" }}>{ICONS[item.category] || "📦"}</span>
                  }

                  {/* Rating / New badge */}
                  {item.rating !== "New"
                    ? <span className="rp-tag" style={{ background:"#fff3e0", color:"#e65100" }}>⭐ {item.rating}</span>
                    : <span className="rp-tag" style={{ background:"#e8f5e9", color:"#2e7d32" }}>🆕 New</span>
                  }

                  {/* Multi-image indicator */}
                  {item.images?.length > 1 && (
                    <span style={{
                      position:"absolute", bottom:10, right:10, zIndex:2,
                      background:"rgba(0,0,0,0.55)", color:"#fff",
                      borderRadius:50, padding:"2px 9px",
                      fontFamily:"'DM Sans',sans-serif", fontSize:"0.72rem"
                    }}>
                      📷 {item.images.length}
                    </span>
                  )}

                  {/* Wishlist button */}
                  <button
                    className="rp-wish"
                    onClick={e => {
                      e.stopPropagation();
                      if (!user) { openAuth("login"); return; }
                      toggleWishlist(item.id);
                    }}
                  >
                    {isWished ? "❤️" : "🤍"}
                  </button>

                  {/* Hover overlay */}
                  <div className="rp-card-overlay">
                    <div className="rp-card-overlay-txt">View Details →</div>
                  </div>
                </div>

                {/* Card body */}
                <div className="rp-body">
                  <div className="rp-cat-tag">{ICONS[item.category]} {item.category}</div>
                  <div className="rp-title">{item.title}</div>
                  <div className="rp-loc">📍 {item.city} · {item.condition} condition</div>
                  <div className="rp-price">₹{item.price} <span>/day · ₹{item.deposit} deposit</span></div>
                  <div className="rp-meta">
                    <span>🔄 {item.rentCount || 0} rented</span>
                    <span>👤 {item.ownerName}</span>
                  </div>
                  {!item.isAvailable && item.rentedTill && (
                    <div style={{ marginTop:8 }}>
                      <span className="rp-unavail">
                        🔴 Unavailable till {new Date(item.rentedTill).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  )}
                  <button className="rp-view-btn">
                    {item.isAvailable ? "View Details & Book →" : "View Details"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}