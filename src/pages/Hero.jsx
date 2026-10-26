import { useState } from "react";
import { useApp, useAuth } from "../App";

export default function Hero({ navigate }) {
  const { items, wishlist, toggleWishlist } = useApp();
  const { user } = useAuth();

  // Selected item modal for consultation or quick view
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Trending items data matching mockup
  const trendingProducts = [
    {
      id: 1,
      title: "Black Relax ST Chair & Table",
      category: "Chair",
      price: "$150.00",
      rating: "5.0",
      reviews: 24,
      image: "/images/chair_black_relax.jpg",
      badge: "Popular",
    },
    {
      id: 2,
      title: "Cozy Duo with Table",
      category: "Living Room",
      price: "$170.00",
      rating: "4.9",
      reviews: 38,
      image: "/images/chair_cozy_duo.jpg",
      badge: "Hot",
    },
    {
      id: 3,
      title: "Elegant Brown Table",
      category: "Table",
      price: "$75.00",
      rating: "4.8",
      reviews: 19,
      image: "/images/table_elegant_brown.jpg",
      badge: null,
    },
    {
      id: 4,
      title: "White Cushion Back Chair",
      category: "Chair",
      price: "$95.00",
      rating: "4.9",
      reviews: 42,
      image: "/images/chair_white_cushion.jpg",
      badge: "Sale",
    },
  ];

  // Latest arrivals data matching 8-grid mockup
  const latestArrivals = [
    {
      id: 5,
      title: "Cushion Comfort Chair",
      category: "Chair",
      price: "$90.00",
      rating: "5.0",
      reviews: 16,
      image: "/images/chair_blue_velvet.jpg",
      badge: "New",
    },
    {
      id: 6,
      title: "Softwood Chair",
      category: "Chair",
      price: "$85.00",
      rating: "4.8",
      reviews: 21,
      image: "/images/chair_softwood.jpg",
      badge: null,
    },
    {
      id: 2,
      title: "Cozy Duo with Table",
      category: "Living Room",
      price: "$170.00",
      rating: "4.9",
      reviews: 38,
      image: "/images/chair_cozy_duo.jpg",
      badge: null,
    },
    {
      id: 4,
      title: "Comfy Wood Chair",
      category: "Chair",
      price: "$65.00",
      rating: "4.7",
      reviews: 14,
      image: "/images/chair_white_cushion.jpg",
      badge: "Sale",
    },
    {
      id: 4,
      title: "White Cushion Back Chair",
      category: "Chair",
      price: "$95.00",
      rating: "4.9",
      reviews: 42,
      image: "/images/chair_white_cushion.jpg",
      badge: null,
    },
    {
      id: 7,
      title: "Home Lounge Set",
      category: "Dining",
      price: "$220.00",
      rating: "5.0",
      reviews: 29,
      image: "/images/table_lounge_dining.jpg",
      badge: "Popular",
    },
    {
      id: 1,
      title: "Black Relax ST Chair & Table",
      category: "Bistro",
      price: "$150.00",
      rating: "5.0",
      reviews: 24,
      image: "/images/chair_black_relax.jpg",
      badge: null,
    },
    {
      id: 3,
      title: "Elegant Brown Table",
      category: "Table",
      price: "$75.00",
      rating: "4.8",
      reviews: 19,
      image: "/images/table_elegant_brown.jpg",
      badge: "Sale",
    },
  ];

  // Video testimonials matching mockup
  const testimonials = [
    {
      id: 1,
      name: "Carlos Hughes",
      role: "Architect, Pune",
      quote: "Furnished my entire 2BHK within 48 hours without spending a fortune upfront. High quality craftsmanship and painless returns.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Chloe Navin",
      role: "Interior Stylist, Mumbai",
      quote: "The flexible rental model is a lifesaver for staging homes and temporary living. The pieces look even better in person.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Brittany Smith",
      role: "Product Designer, Bangalore",
      quote: "I love switching up my apartment layout every 6 months. QuickRent makes sustainable modern living completely hassle-free.",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Software Engineer, Hyderabad",
      quote: "Top notch customer care and genuine solid wood furniture. Zero maintenance worries, easily the best rental platform.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    },
  ];

  // Blog articles matching mockup
  const blogPosts = [
    {
      id: 1,
      title: "Eco-Friendly Furniture: Not Expensive",
      date: "September 18, 2026",
      desc: "How circular economy rental furniture is drastically reducing carbon footprints while making high-end wooden interiors accessible.",
      image: "/images/blog_eco_furniture.jpg",
    },
    {
      id: 2,
      title: "Why Custom Furniture is Worth the Investment",
      date: "September 14, 2026",
      desc: "Balancing comfort, ergonomic support, and timeless aesthetic in contemporary living rooms with bespoke wooden pieces.",
      image: "/images/blog_custom_furniture.jpg",
    },
    {
      id: 3,
      title: "Sustainable Furniture: Eco-Friendly Choices for Your Home",
      date: "September 09, 2026",
      desc: "Discover sustainable fabrics, natural oils, and responsibly sourced teak that keep your home healthy, vibrant, and timeless.",
      image: "/images/blog_sustainable_green.jpg",
    },
  ];

  const handleCardClick = (product) => {
    // If a matching item exists in global items, pass it to navigate
    const matched = items.find((it) => it.id === product.id) || items[0];
    navigate("rent", matched);
  };

  return (
    <div className="home-container">
      <style>{`
        .home-container {
          width: 100%;
          background: #ffffff;
          color: #2D3136;
          overflow-x: hidden;
        }

        /* ── HERO SECTION ── */
        .hero-banner {
          position: relative;
          min-height: 88vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          background-image: linear-gradient(180deg, rgba(18, 20, 24, 0.45) 0%, rgba(18, 20, 24, 0.82) 100%), url('/images/hero_furniture_dark.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 0 0 36px 36px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .hero-kicker {
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.88);
          margin-bottom: 18px;
        }

        .hero-heading {
          font-size: 3.4rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.18;
          max-width: 820px;
          margin: 0 auto 32px;
          letter-spacing: -0.5px;
        }

        .hero-btn {
          display: inline-block;
          background-color: #E24B36;
          color: #ffffff;
          padding: 15px 44px;
          border-radius: 30px;
          font-size: 0.98rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 6px 20px rgba(226, 75, 54, 0.45);
        }

        .hero-btn:hover {
          background-color: #C93C29;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(226, 75, 54, 0.55);
        }

        /* ── VALUE PROPOSITIONS BAR ── */
        .value-strip {
          max-width: 1200px;
          margin: 40px auto 30px;
          padding: 0 32px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .value-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 12px;
          background: #FAF9F8;
          border: 1px solid #EFEFED;
        }

        .value-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          flex-shrink: 0;
        }

        .value-text h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #1A1D20;
          margin-bottom: 3px;
        }

        .value-text p {
          font-size: 0.85rem;
          color: #6C757D;
        }

        /* ── COMMON SECTION STYLES ── */
        .section-wrap {
          max-width: 1240px;
          margin: 70px auto 0;
          padding: 0 32px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 2.1rem;
          font-weight: 700;
          color: #1A1D20;
          letter-spacing: -0.3px;
          margin-bottom: 8px;
        }

        .section-subtitle {
          font-size: 0.95rem;
          color: #6C757D;
          max-width: 600px;
          margin: 0 auto;
        }

        /* ── PRODUCT CARD GRID ── */
        .products-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .product-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #ECECEB;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
          border-color: #DDD;
        }

        .card-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #F7F7F6;
          overflow: hidden;
        }

        .card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .product-card:hover .card-image-wrap img {
          transform: scale(1.03);
        }

        .card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #1A1D20;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-badge.sale {
          background: #E24B36;
        }

        .card-wish-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid #E0E0DE;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.95rem;
          transition: transform 0.15s ease, background-color 0.15s ease;
        }

        .card-wish-btn:hover {
          transform: scale(1.12);
          background: #ffffff;
        }

        .card-info {
          padding: 16px 18px 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-category {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #8C9196;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1A1D20;
          margin-bottom: 8px;
          line-height: 1.35;
        }

        .card-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .star-icons {
          color: #F59E0B;
          font-size: 0.88rem;
          letter-spacing: 1px;
        }

        .rating-num {
          font-size: 0.82rem;
          color: #6C757D;
          font-weight: 500;
        }

        .card-bottom-row {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid #F2F2F0;
        }

        .card-price {
          font-size: 1.15rem;
          font-weight: 800;
          color: #E24B36;
        }

        .card-rent-btn {
          background: #FAF9F8;
          color: #1A1D20;
          border: 1px solid #E0E0DC;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .product-card:hover .card-rent-btn {
          background: #E24B36;
          color: #ffffff;
          border-color: #E24B36;
        }

        /* ── HELP / CONSULTATION SPLIT BANNER ── */
        .help-banner {
          max-width: 1240px;
          margin: 70px auto 0;
          padding: 0 32px;
        }

        .help-card {
          background: #FAF9F8;
          border: 1px solid #EFEFED;
          border-radius: 18px;
          padding: 44px 48px;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 48px;
          align-items: center;
        }

        .help-left h3 {
          font-size: 1.85rem;
          font-weight: 700;
          color: #1A1D20;
          line-height: 1.3;
          margin-bottom: 18px;
        }

        .help-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #E24B36;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          padding: 0;
          transition: gap 0.2s ease;
        }

        .help-link-btn:hover {
          gap: 12px;
          text-decoration: underline;
        }

        .help-right p {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #555A60;
        }

        /* ── LIFESTYLE BANNER WITH HOTSPOT PINS ── */
        .lifestyle-section {
          max-width: 1240px;
          margin: 80px auto 0;
          padding: 0 32px;
        }

        .lifestyle-container {
          position: relative;
          width: 100%;
          min-height: 480px;
          border-radius: 24px;
          overflow: hidden;
          background-image: url('/images/lifestyle_living_room.jpg');
          background-size: cover;
          background-position: center;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.08);
          border: 1px solid #ECECEB;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 40px;
        }

        /* Hotspot pins */
        .hotspot-pin {
          position: absolute;
          width: 22px;
          height: 22px;
          background: #E24B36;
          border: 3px solid #ffffff;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(226, 75, 54, 0.5);
          transition: transform 0.2s ease;
          z-index: 5;
        }

        .hotspot-pin:hover {
          transform: scale(1.35);
        }

        .hotspot-tooltip {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: #1A1D20;
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
          pointer-events: none;
          z-index: 10;
        }

        /* Lifestyle promo card on the right */
        .lifestyle-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid #EAEAEA;
          border-radius: 16px;
          padding: 36px 38px;
          max-width: 380px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
        }

        .lifestyle-card h3 {
          font-size: 1.55rem;
          font-weight: 700;
          color: #1A1D20;
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .lifestyle-discount {
          font-size: 1.25rem;
          font-weight: 700;
          color: #E24B36;
          margin-bottom: 20px;
        }

        .lifestyle-store-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1A1D20;
          color: #ffffff;
          padding: 12px 28px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          border: none;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .lifestyle-store-btn:hover {
          background: #E24B36;
          transform: translateY(-2px);
        }

        /* ── VIDEO TESTIMONIALS SECTION ── */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .testimonial-card {
          background: #FAF9F8;
          border: 1px solid #ECECEB;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
        }

        .testimonial-media {
          position: relative;
          width: 100%;
          height: 180px;
          background: #1A1D20;
          overflow: hidden;
        }

        .testimonial-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.9;
          filter: grayscale(20%);
        }

        .video-play-btn {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background: #E24B36;
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          transition: background 0.15s ease;
        }

        .video-play-btn:hover {
          background: #C93C29;
        }

        .testimonial-body {
          padding: 18px 20px 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .reviewer-name {
          font-size: 0.98rem;
          font-weight: 700;
          color: #1A1D20;
          margin-bottom: 2px;
        }

        .reviewer-role {
          font-size: 0.78rem;
          color: #8C9196;
          margin-bottom: 12px;
        }

        .reviewer-quote {
          font-size: 0.88rem;
          color: #555A60;
          line-height: 1.6;
          font-style: italic;
        }

        /* ── BLOG INSIGHTS SECTION ── */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .blog-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #ECECEB;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.07);
        }

        .blog-img-wrap {
          width: 100%;
          height: 220px;
          background: #F0F0EE;
          overflow: hidden;
        }

        .blog-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .blog-card:hover .blog-img-wrap img {
          transform: scale(1.04);
        }

        .blog-info {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .blog-date {
          font-size: 0.78rem;
          color: #8C9196;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .blog-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1A1D20;
          line-height: 1.35;
          margin-bottom: 10px;
        }

        .blog-desc {
          font-size: 0.88rem;
          color: #555A60;
          line-height: 1.6;
          margin-bottom: 18px;
          flex-grow: 1;
        }

        .blog-link {
          font-size: 0.88rem;
          font-weight: 700;
          color: #E24B36;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .blog-link:hover {
          text-decoration: underline;
        }

        /* ── MODALS (VIDEO / CONSULTATION) ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          background: #ffffff;
          border-radius: 16px;
          max-width: 500px;
          width: 100%;
          padding: 32px;
          position: relative;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #F2F2F0;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-weight: bold;
          font-size: 1rem;
        }

        /* ── RESPONSIVE MEDIA QUERIES (NO CLAMP) ── */
        @media (max-width: 1080px) {
          .products-grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .value-strip {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 860px) {
          .hero-heading {
            font-size: 2.5rem;
          }
          .help-card {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 32px 24px;
          }
          .lifestyle-container {
            justify-content: center;
            min-height: 420px;
            padding: 20px;
          }
          .lifestyle-card {
            max-width: 100%;
          }
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .hero-banner {
            padding: 100px 16px 60px;
            border-radius: 0 0 24px 24px;
          }
          .hero-heading {
            font-size: 1.95rem;
          }
          .section-title {
            font-size: 1.65rem;
          }
          .products-grid-4 {
            grid-template-columns: 1fr;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .section-wrap {
            padding: 0 16px;
          }
        }
      `}</style>

      {/* ── 1. HERO SECTION ── */}
      <section className="hero-banner">
        <div className="hero-kicker">Minimal Meets Functional</div>
        <h1 className="hero-heading">Affordable Elegance, Lasting Comfort</h1>
        <button className="hero-btn" onClick={() => navigate("rent")}>
          Shop Now
        </button>
      </section>

      {/* ── 2. VALUE PROPOSITIONS BAR ── */}
      <div className="value-strip">
        <div className="value-item">
          <div className="value-icon">🪑</div>
          <div className="value-text">
            <h4>Furniture Collection</h4>
            <p>Any furniture for your space</p>
          </div>
        </div>
        <div className="value-item">
          <div className="value-icon">🚚</div>
          <div className="value-text">
            <h4>Free Shipping</h4>
            <p>Free shipping on orders</p>
          </div>
        </div>
        <div className="value-item">
          <div className="value-icon">🔄</div>
          <div className="value-text">
            <h4>100% Money Back</h4>
            <p>If the item doesn't suit you</p>
          </div>
        </div>
      </div>

      {/* ── 3. TRENDING THIS WEEK ── */}
      <section className="section-wrap">
        <div className="section-header">
          <h2 className="section-title">Trending This Week</h2>
          <p className="section-subtitle">
            Carefully selected designs crafted for comfort, style, and everyday flexible living.
          </p>
        </div>

        <div className="products-grid-4">
          {trendingProducts.map((p) => {
            const isWish = wishlist ? wishlist.includes(p.id) : false;
            return (
              <div
                className="product-card"
                key={p.title}
                onClick={() => handleCardClick(p)}
              >
                <div className="card-image-wrap">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  {p.badge && (
                    <span className={`card-badge ${p.badge.toLowerCase()}`}>
                      {p.badge}
                    </span>
                  )}
                  <button
                    className="card-wish-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    title={isWish ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {isWish ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="card-info">
                  <span className="card-category">{p.category}</span>
                  <h3 className="card-title">{p.title}</h3>
                  <div className="card-rating-row">
                    <span className="star-icons">★★★★★</span>
                    <span className="rating-num">
                      {p.rating} ({p.reviews})
                    </span>
                  </div>
                  <div className="card-bottom-row">
                    <span className="card-price">{p.price}</span>
                    <button className="card-rent-btn">Rent Item</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. CONSULTATION / HELP BANNER ── */}
      <section className="help-banner">
        <div className="help-card">
          <div className="help-left">
            <h3>Need help in choosing the right Furniture?</h3>
            <button
              className="help-link-btn"
              onClick={() => setConsultModalOpen(true)}
            >
              ASK FOR HELP <span>→</span>
            </button>
          </div>
          <div className="help-right">
            <p>
              Our interior experts and rental advisors are ready to assist you in curating
              the ideal setup for your apartment, studio, or corporate space. Flexible tenure,
              free relocations, and transparent zero-brokerage pricing.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. LATEST ARRIVALS (8-GRID) ── */}
      <section className="section-wrap">
        <div className="section-header">
          <h2 className="section-title">Latest Arrivals</h2>
          <p className="section-subtitle">
            Discover newly added premium items ready for express delivery and instant setup.
          </p>
        </div>

        <div className="products-grid-4">
          {latestArrivals.map((p, idx) => {
            const isWish = wishlist ? wishlist.includes(p.id) : false;
            return (
              <div
                className="product-card"
                key={`${p.title}-${idx}`}
                onClick={() => handleCardClick(p)}
              >
                <div className="card-image-wrap">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  {p.badge && (
                    <span className={`card-badge ${p.badge.toLowerCase()}`}>
                      {p.badge}
                    </span>
                  )}
                  <button
                    className="card-wish-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    title={isWish ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {isWish ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="card-info">
                  <span className="card-category">{p.category}</span>
                  <h3 className="card-title">{p.title}</h3>
                  <div className="card-rating-row">
                    <span className="star-icons">★★★★★</span>
                    <span className="rating-num">
                      {p.rating} ({p.reviews})
                    </span>
                  </div>
                  <div className="card-bottom-row">
                    <span className="card-price">{p.price}</span>
                    <button className="card-rent-btn">Rent Item</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. LIFESTYLE SHOWCASE BANNER WITH HOTSPOT PINS ── */}
      <section className="lifestyle-section">
        <div className="lifestyle-container">
          {/* Hotspot 1 on Sectional Couch */}
          <div
            className="hotspot-pin"
            style={{ bottom: "28%", left: "32%" }}
            onMouseEnter={() => setActiveHotspot("sofa")}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={() => navigate("rent")}
            title="Cloud Modular Sectional Sofa"
          >
            {activeHotspot === "sofa" && (
              <div className="hotspot-tooltip">
                Cloud Modular Sofa · $180.00/mo
              </div>
            )}
          </div>

          {/* Hotspot 2 on Coffee Table */}
          <div
            className="hotspot-pin"
            style={{ bottom: "22%", left: "54%" }}
            onMouseEnter={() => setActiveHotspot("table")}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={() => navigate("rent")}
            title="Minimalist Low White Coffee Table"
          >
            {activeHotspot === "table" && (
              <div className="hotspot-tooltip">
                Minimalist Coffee Table · $45.00/mo
              </div>
            )}
          </div>

          {/* Promo Card on Right */}
          <div className="lifestyle-card">
            <h3>Designed for your lifestyle, built for your comfort</h3>
            <div className="lifestyle-discount">Get 20% Discount</div>
            <button
              className="lifestyle-store-btn"
              onClick={() => navigate("rent")}
            >
              Visit The Store →
            </button>
          </div>
        </div>
      </section>

      {/* ── 7. VIDEO TESTIMONIALS ── */}
      <section className="section-wrap">
        <div className="section-header">
          <h2 className="section-title">Video Testimonials</h2>
          <p className="section-subtitle">
            Hear why thousands of verified renters love furnishing their homes with QuickRent.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-media">
                <img src={t.photo} alt={t.name} loading="lazy" />
                <button
                  className="video-play-btn"
                  onClick={() => setSelectedVideo(t)}
                >
                  <span>▶</span> Play Video
                </button>
              </div>

              <div className="testimonial-body">
                <div className="reviewer-name">{t.name}</div>
                <div className="reviewer-role">{t.role}</div>
                <p className="reviewer-quote">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. BLOG / ARTICLES SECTION ── */}
      <section className="section-wrap" id="blog-section" style={{ marginBottom: "80px" }}>
        <div className="section-header">
          <h2 className="section-title">Design Inspiration & Stories</h2>
          <p className="section-subtitle">
            Insights on eco-friendly furnishing, interior styling, and flexible modern living.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div className="blog-card" key={post.title}>
              <div className="blog-img-wrap">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="blog-info">
                <span className="blog-date">{post.date}</span>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-desc">{post.desc}</p>
                <span
                  className="blog-link"
                  onClick={() => alert(`Reading article: "${post.title}". Full article coming soon!`)}
                >
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
              <img
                src={selectedVideo.photo}
                alt={selectedVideo.name}
                style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{selectedVideo.name}</h4>
                <p style={{ fontSize: "0.82rem", color: "#6C757D" }}>{selectedVideo.role}</p>
              </div>
            </div>
            <div style={{ background: "#F8F8F7", padding: "18px", borderRadius: "10px", marginBottom: "18px" }}>
              <p style={{ fontStyle: "italic", lineHeight: 1.6, color: "#333" }}>
                "{selectedVideo.quote}"
              </p>
            </div>
            <div style={{ fontSize: "0.85rem", color: "#6C757D", textAlign: "center" }}>
              ✅ Verified QuickRent Customer
            </div>
          </div>
        </div>
      )}

      {/* ── CONSULTATION MODAL ── */}
      {consultModalOpen && (
        <div className="modal-overlay" onClick={() => setConsultModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => {
                setConsultModalOpen(false);
                setConsultSubmitted(false);
              }}
            >
              ✕
            </button>

            {!consultSubmitted ? (
              <>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "8px" }}>
                  Ask For Help
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#6C757D", marginBottom: "20px" }}>
                  Tell us what kind of furniture or space you want to furnish, and our design team will contact you.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setConsultSubmitted(true);
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    defaultValue={user?.name || ""}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid #CCC",
                      fontSize: "0.92rem",
                      outline: "none",
                    }}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    defaultValue={user?.phone || ""}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid #CCC",
                      fontSize: "0.92rem",
                      outline: "none",
                    }}
                  />
                  <textarea
                    rows="3"
                    required
                    placeholder="E.g., Looking for a living room sofa and dining set for 6 months..."
                    style={{
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid #CCC",
                      fontSize: "0.92rem",
                      outline: "none",
                      resize: "none",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#E24B36",
                      color: "#fff",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "none",
                      fontWeight: 700,
                      cursor: "pointer",
                      marginTop: "6px",
                    }}
                  >
                    Submit Request
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>🎉</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>
                  Thank you!
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#6C757D", marginBottom: "20px" }}>
                  Your request has been received. Our team will reach out to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setConsultModalOpen(false);
                    setConsultSubmitted(false);
                  }}
                  style={{
                    backgroundColor: "#1A1D20",
                    color: "#fff",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
