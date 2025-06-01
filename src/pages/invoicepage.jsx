import React from 'react';
import { useLocation } from 'react-router-dom';

export default function InvoicePage() {
  const { state } = useLocation();
  const { invoice } = state || {};

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">💳 Invoice</h1>
      {invoice ? (
        <div className="space-y-2 text-gray-700">
          <p><strong>Invoice ID:</strong> {invoice.invoiceId}</p>
          <p><strong>Amount:</strong> ₹{invoice.amount}</p>
          <p><strong>Due Date:</strong> {invoice.dueDate}</p>
          <p><strong>Items:</strong> {invoice.items[0].description}</p>
        </div>
      ) : (
        <p>No invoice found.</p>
      )}
    </div>
  );
}
