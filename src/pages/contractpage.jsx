import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ContractPage() {
  const { state } = useLocation();
  const { contractHtml, link } = state || {};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📄 Contract Preview</h1>
      {contractHtml ? (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contractHtml + `<p><strong>Signature Link:</strong> <a href="${link}" class="text-blue-600 underline" target="_blank">${link}</a></p>` }} />
      ) : (
        <p>No contract found.</p>
      )}
    </div>
  );
}
