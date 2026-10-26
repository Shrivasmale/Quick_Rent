// frontend/src/hooks/useItems.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

const SEED_ITEMS = [
  { id: "11111111-1111-1111-1111-111111111111", title: "Black Relax ST Chair & Table", category: "Furniture & Living", price: 150, deposit: 600, city: "Pune", condition: "Pristine", description: "Modern black metal framed relaxed dining chairs with stylish bistro table. Weather resistant and ergonomic.", is_active: true, rating: 5.0, rent_count: 42, image_url: "/images/chair_black_relax.jpg" },
  { id: "22222222-2222-2222-2222-222222222222", title: "Cozy Duo with Table", category: "Furniture & Living", price: 170, deposit: 750, city: "Mumbai", condition: "Brand New", description: "Set of two boucle cream lounge armchairs paired with a solid oak round coffee table. Unmatched comfort.", is_active: true, rating: 4.9, rent_count: 38, image_url: "/images/chair_cozy_duo.jpg" },
  { id: "33333333-3333-3333-3333-333333333333", title: "Elegant Brown Table", category: "Furniture & Living", price: 75, deposit: 300, city: "Bangalore", condition: "Excellent", description: "Minimalist solid dark walnut timber accent table with tripod legs. Ideal for living spaces and corners.", is_active: true, rating: 4.8, rent_count: 29, image_url: "/images/table_elegant_brown.jpg" },
  { id: "44444444-4444-4444-4444-444444444444", title: "White Cushion Back Chair", category: "Furniture & Living", price: 95, deposit: 400, city: "Pune", condition: "Excellent", description: "Contemporary natural oak chair with plush rounded white cushion back. Includes cozy accent throw.", is_active: true, rating: 4.9, rent_count: 31, image_url: "/images/chair_white_cushion.jpg" },
  { id: "55555555-5555-5555-5555-555555555555", title: "Cushion Comfort Velvet Chair", category: "Furniture & Living", price: 90, deposit: 350, city: "Delhi", condition: "Pristine", description: "Sculpted royal blue velvet accent chair with tapered natural wood legs. Soft touch luxury finish.", is_active: true, rating: 5.0, rent_count: 25, image_url: "/images/chair_blue_velvet.jpg" },
  { id: "66666666-6666-6666-6666-666666666666", title: "Softwood Dining Chair", category: "Furniture & Living", price: 85, deposit: 320, city: "Pune", condition: "Brand New", description: "Architectural solid light oak dining chair designed for posture support and seamless minimalism.", is_active: true, rating: 4.8, rent_count: 19, image_url: "/images/chair_softwood.jpg" },
  { id: "77777777-7777-7777-7777-777777777777", title: "Home Lounge Dining Set", category: "Furniture & Living", price: 220, deposit: 900, city: "Mumbai", condition: "Excellent", description: "Round dining table with two supportive upholstered armchairs. Perfect for intimate spaces and breakfasts.", is_active: true, rating: 5.0, rent_count: 33, image_url: "/images/table_lounge_dining.jpg" },
];

export function useItems() {
  const [items, setItems] = useState(() => {
    try {
      const cached = localStorage.getItem("qr_items_cache");
      return cached ? JSON.parse(cached) : SEED_ITEMS;
    } catch {
      return SEED_ITEMS;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error: fetchErr } = await supabase
        .from("items")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (fetchErr) throw fetchErr;

      if (data && data.length > 0) {
        // Map daily_rate_paise to price in rupees
        const normalized = data.map((it) => ({
          ...it,
          price: it.daily_rate_paise ? Math.round(it.daily_rate_paise / 100) : it.price || 100,
          deposit: it.security_deposit_paise ? Math.round(it.security_deposit_paise / 100) : it.deposit || 0,
        }));
        setItems(normalized);
        localStorage.setItem("qr_items_cache", JSON.stringify(normalized));
      }
    } catch (err) {
      console.warn("Using local items cache:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();

    // Real-time subscription to public.items
    const channel = supabase
      .channel("public:items")
      .on("postgres_changes", { event: "*", schema: "public", table: "items" }, () => {
        fetchItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchItems]);

  const addItem = async (itemData) => {
    const newItem = {
      ...itemData,
      id: "it_" + Date.now(),
      created_at: new Date().toISOString(),
      is_active: true,
      price: Number(itemData.price),
      deposit: Number(itemData.deposit || 0),
      daily_rate_paise: Math.round(Number(itemData.price) * 100),
      security_deposit_paise: Math.round(Number(itemData.deposit || 0) * 100),
      rent_count: 0,
      rating: 5.0,
    };

    setItems((prev) => [newItem, ...prev]);
    try {
      localStorage.setItem("qr_items_cache", JSON.stringify([newItem, ...items]));
      await supabase.from("items").insert(newItem);
    } catch {
      // Local fallback preserved
    }
    return newItem;
  };

  return { items, loading, error, refetch: fetchItems, addItem };
}
