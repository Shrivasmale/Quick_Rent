// frontend/src/components/ListingCard.jsx
import React from "react";

export default function ListingCard({ item, onSelect, onToggleWishlist, isWishlisted }) {
  const imageUrl = item.image_url || item.image || "/images/chair_black_relax.jpg";
  const displayPrice = item.price || (item.daily_rate_paise ? Math.round(item.daily_rate_paise / 100) : 100);

  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className="group bg-white rounded-card overflow-hidden border border-brand-border hover:border-gray-300 shadow-soft hover:shadow-hover transition-all duration-200 cursor-pointer flex flex-col relative"
    >
      {/* Thumbnail Container */}
      <div className="relative h-52 w-full bg-gray-50 overflow-hidden">
        <img
          src={imageUrl}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/chair_black_relax.jpg";
          }}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-dark text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
          {item.category}
        </span>

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist && onToggleWishlist(item.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
            isWishlisted ? "bg-red-50 text-brand-primary" : "bg-white/90 text-gray-400 hover:text-brand-primary"
          }`}
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs uppercase tracking-wider text-brand-muted font-medium mb-1">
          {item.city} · {item.condition}
        </div>
        <h3 className="text-base font-bold text-brand-dark line-clamp-1 group-hover:text-brand-primary transition-colors">
          {item.title}
        </h3>

        <div className="mt-auto pt-3 flex items-baseline justify-between">
          <div>
            <span className="text-lg font-extrabold text-brand-primary">₹{displayPrice}</span>
            <span className="text-xs text-brand-muted font-medium ml-1">/ day</span>
          </div>
          <div className="text-xs text-brand-muted flex items-center gap-1">
            <span className="text-brand-star">★</span> {item.rating || "5.0"}
          </div>
        </div>

        <button
          type="button"
          className="mt-3 w-full py-2 bg-brand-bg group-hover:bg-brand-primary text-brand-dark group-hover:text-white border border-brand-border group-hover:border-brand-primary rounded-base text-xs font-bold transition-colors"
        >
          View Details & Rent →
        </button>
      </div>
    </div>
  );
}
