// frontend/src/hooks/useRentals.js
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { invokeMicroservice } from "../middleware/edgeApiClient";

export function useRentals(userId) {
  const [rentals, setRentals] = useState(() => {
    try {
      const cached = localStorage.getItem("qr_rentals_cache");
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);

  const fetchRentals = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .schema("rentals")
        .from("contracts")
        .select("*, item:items(title, price:daily_rate_paise, image_url)")
        .or(`renter_id.eq.${userId},owner_id.eq.${userId}`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        setRentals(data);
        localStorage.setItem("qr_rentals_cache", JSON.stringify(data));
      }
    } catch (err) {
      console.warn("Using local rentals cache:", err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRentals();

    if (!userId) return;

    // Real-time rental contract updates
    const channel = supabase
      .channel(`rentals:${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "rentals", table: "contracts" },
        () => fetchRentals()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchRentals]);

  const bookItem = async (bookingData) => {
    try {
      const result = await invokeMicroservice("rental-service", bookingData);
      await fetchRentals();
      return result;
    } catch {
      // Local fallback simulation if offline
      const mockRental = {
        id: "rent_" + Date.now(),
        item_id: bookingData.item_id,
        item_title: bookingData.item_title,
        renter_name: bookingData.renter_name,
        renter_phone: bookingData.renter_phone,
        start_date: bookingData.start_date,
        end_date: bookingData.end_date,
        days: bookingData.days,
        total_amount_paise: bookingData.total_amount_paise,
        total_price: Math.round(bookingData.total_amount_paise / 100),
        status: "CONFIRMED",
        created_at: new Date().toISOString(),
        receipt_id: "QR-" + Date.now().toString().slice(-8),
      };
      setRentals((prev) => [mockRental, ...prev]);
      localStorage.setItem("qr_rentals_cache", JSON.stringify([mockRental, ...rentals]));
      return { success: true, hold: mockRental };
    }
  };

  return { rentals, loading, refetch: fetchRentals, bookItem };
}
