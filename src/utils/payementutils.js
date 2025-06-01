const paymentStatusStore = {};

export function processPayout(invoiceId) {
  paymentStatusStore[invoiceId] = "paid";
}

export function getPaymentStatus(invoiceId) {
  return paymentStatusStore[invoiceId] || "pending";
}
