export function generateInvoice(influencer) {
  const amount = influencer.pricing_tier === "high" ? 50000 : influencer.pricing_tier === "medium" ? 25000 : 10000;
  return {
    invoiceId: "INV-" + Math.floor(Math.random() * 100000),
    influencer: influencer.name,
    amount,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    items: [
      { description: "Sponsored Post", price: amount }
    ]
  };
}
