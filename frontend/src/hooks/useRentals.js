// frontend/src/hooks/useRentals.js
import { useState, useCallback } from "react";

export function useRentals(userId) {
  const [rentals, setRentals] = useState(() => {
    try {
      const cached = localStorage.getItem("qr_rentals_cache");
      if (!cached) return [];
      const parsed = JSON.parse(cached);
      return userId ? parsed.filter((r) => !r.renter_id || r.renter_id === userId) : parsed;
    } catch {
      return [];
    }
  });
  const loading = false;

  const fetchRentals = useCallback(() => {
    try {
      const cached = localStorage.getItem("qr_rentals_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (userId) {
          setRentals(parsed.filter((r) => !r.renter_id || r.renter_id === userId));
        } else {
          setRentals(parsed);
        }
      }
    } catch (err) {
      console.warn("Error reading local rentals:", err);
    }
  }, [userId]);

  const bookItem = async (bookingData) => {
    const mockRental = {
      id: "rent_" + Date.now(),
      renter_id: userId || "usr_guest",
      item_id: bookingData.item_id,
      item_title: bookingData.item_title,
      renter_name: bookingData.renter_name,
      renter_phone: bookingData.renter_phone,
      start_date: bookingData.start_date,
      end_date: bookingData.end_date,
      days: bookingData.days,
      total_amount_paise: bookingData.total_amount_paise,
      total_price: Math.round(bookingData.total_amount_paise / 100),
      deposit: bookingData.deposit || 0,
      status: "CONFIRMED",
      created_at: new Date().toISOString(),
      receipt_id: "QR-" + Date.now().toString().slice(-8),
    };

    setRentals((prev) => {
      const updated = [mockRental, ...prev];
      try {
        localStorage.setItem("qr_rentals_cache", JSON.stringify(updated));
      } catch (err) {
        console.warn("Error saving rental:", err);
      }
      return updated;
    });

    return { success: true, hold: mockRental };
  };

  return { rentals, loading, refetch: fetchRentals, bookItem };
}
