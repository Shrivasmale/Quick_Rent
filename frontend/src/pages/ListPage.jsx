// frontend/src/pages/ListPage.jsx
import React, { useState } from "react";

const CATEGORIES = [
  "Furniture & Living",
  "Living Room",
  "Dining & Bistro",
  "Electronics",
  "Sports & Outdoor",
  "Tools & Equipment",
];

const CONDITIONS = ["Brand New", "Pristine", "Excellent", "Good", "Fair"];

export default function ListPage({ onAddItem, navigate, user, openAuth }) {
  const [form, setForm] = useState({
    title: "",
    category: "Furniture & Living",
    dailyRate: "",
    deposit: "",
    city: user?.city || "Pune",
    condition: "Excellent",
    description: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.slice(0, 4 - form.images.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, uploadEvent.target.result].slice(0, 4),
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      openAuth("login");
      return;
    }

    if (!form.title.trim() || !form.dailyRate || Number(form.dailyRate) <= 0) {
      setError("Please provide a title and valid daily rental rate.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onAddItem({
        title: form.title.trim(),
        category: form.category,
        price: Number(form.dailyRate),
        deposit: Number(form.deposit || 0),
        city: form.city,
        condition: form.condition,
        description: form.description.trim() || "Quality rental item listed on QuickRent.",
        image_url: form.images[0] || "/images/chair_black_relax.jpg",
        images: form.images,
        owner_id: user.id,
        owner_name: user.name,
      });

      setSuccess(true);
      setTimeout(() => navigate("rent"), 2000);
    } catch (err) {
      setError(err.message || "Failed to publish listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-[72px] pb-16 px-[4vw]">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">
            Lender Portal
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
            List Your Item on QuickRent
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Earn recurring rental revenue with zero commission on your first 3 bookings.
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-card border border-brand-border p-12 text-center shadow-card">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 text-3xl flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-2">Item Successfully Listed!</h2>
            <p className="text-sm text-brand-muted mb-6">
              Your listing is now live in the rental store and discoverable across {form.city}.
            </p>
            <button
              type="button"
              onClick={() => navigate("rent")}
              className="px-6 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-base shadow-soft"
            >
              Browse in Store →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-card border border-brand-border p-6 sm:p-8 shadow-card space-y-6">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-base flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                Item Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Modern Solid Walnut Coffee Table"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
              />
            </div>

            {/* Category & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                  City Location *
                </label>
                <select
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                >
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
            </div>

            {/* Pricing & Deposit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                  Daily Rental Rate (₹) *
                </label>
                <input
                  type="number"
                  min="10"
                  required
                  placeholder="150"
                  value={form.dailyRate}
                  onChange={(e) => update("dailyRate", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                  Refundable Deposit (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="600"
                  value={form.deposit}
                  onChange={(e) => update("deposit", e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Condition Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                Condition
              </label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => update("condition", cond)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-base border transition-colors ${
                      form.condition === cond
                        ? "bg-brand-primary text-white border-brand-primary"
                        : "bg-white text-brand-muted border-brand-border hover:text-brand-dark"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Upload Slots */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                Item Photos (Up to 4)
              </label>
              <div className="grid grid-cols-4 gap-3">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-base overflow-hidden border border-brand-border bg-gray-100">
                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-[10px] flex items-center justify-center font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {form.images.length < 4 && (
                  <label className="aspect-square rounded-base border-2 border-dashed border-brand-border hover:border-brand-primary flex flex-col items-center justify-center cursor-pointer transition-colors bg-brand-bg hover:bg-brand-light">
                    <span className="text-xl text-brand-muted">+</span>
                    <span className="text-[10px] text-brand-muted font-bold mt-1">Add Photo</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-brand-muted font-bold mb-1.5">
                Description & Care Notes
              </label>
              <textarea
                rows={3}
                placeholder="Describe material, dimensions, ideal use cases, and included accessories..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-brand-bg border border-brand-border rounded-base outline-none focus:border-brand-primary"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-primary hover:bg-brand-hover text-white text-sm font-bold rounded-base shadow-soft transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing Listing...</span>
                </>
              ) : (
                "Publish Item Listing →"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
