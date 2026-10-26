// frontend/src/utils/generateReceipt.js

/**
 * Downloads / prints an official rental receipt for the user.
 * Generates a clean, printable invoice document locally.
 */
export function downloadRentalReceipt(rental, user) {
  const receiptWindow = window.open("", "_blank", "width=800,height=900");
  if (!receiptWindow) return;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>QuickRent Receipt – ${rental.receipt_id || rental.receiptId || "QR-RECEIPT"}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #faf9f8; color: #1a1d20; padding: 40px 20px; }
    .page { max-width: 650px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 12px; border: 1px solid #e8e8e6; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E24B36; padding-bottom: 20px; margin-bottom: 28px; }
    .logo { font-size: 1.6rem; font-weight: 800; color: #E24B36; }
    .title { font-size: 1.1rem; color: #6c757d; font-weight: 600; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0ee; font-size: 0.95rem; }
    .total { font-weight: 800; font-size: 1.15rem; color: #E24B36; border-top: 2px solid #1a1d20; margin-top: 16px; padding-top: 14px; }
    .footer { margin-top: 32px; font-size: 0.8rem; color: #888; text-align: center; }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">QuickRent</div>
      <div class="title">Official Rental Invoice</div>
    </div>
    <div class="row"><span>Receipt ID</span><strong>${rental.receipt_id || rental.receiptId || "QR-" + Date.now().toString().slice(-8)}</strong></div>
    <div class="row"><span>Item</span><strong>${rental.item_title || rental.itemTitle || "Rented Item"}</strong></div>
    <div class="row"><span>Renter</span><strong>${rental.renter_name || rental.renterName || user?.name || "Customer"}</strong></div>
    <div class="row"><span>Duration</span><strong>${rental.days || 1} day(s) (${rental.start_date || rental.startDate || "Today"} to ${rental.end_date || rental.endDate || "Ongoing"})</strong></div>
    <div class="row"><span>Rent Total</span><strong>₹${rental.rent_total || rental.totalPrice || rental.total_price || 0}</strong></div>
    <div class="row"><span>Security Deposit</span><strong>₹${rental.deposit || (rental.security_deposit_paise ? rental.security_deposit_paise / 100 : 0)}</strong></div>
    <div class="row"><span>Platform Fee</span><strong>₹${rental.platform_fee || rental.platformFee || 0}</strong></div>
    <div class="row total"><span>Total Paid</span><span>₹${rental.grand_total || rental.grandTotal || rental.total_price || (rental.total_amount_paise ? rental.total_amount_paise / 100 : 0)}</span></div>
    <div class="footer">
      QuickRent Marketplace · Official Digital Rental Invoice
    </div>
  </div>
</body>
</html>`;

  receiptWindow.document.write(html);
  receiptWindow.document.close();
  receiptWindow.focus();
  setTimeout(() => receiptWindow.print(), 300);
}
