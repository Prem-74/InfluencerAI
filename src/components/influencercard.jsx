// 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateContract } from "../utils/contractutils";
import { sendForSignature } from "../utils/signatureutils";
import { generateInvoice } from "../utils/invoiceutils";
import { processPayout } from "../utils/payementutils";

export default function InfluencerCard({ influencer }) {
  const navigate = useNavigate();
  const profile = influencer.platforms[0];
  const fallbackImage = 'https://via.placeholder.com/80?text=User';

  const collabStatus = influencer.collaboration_open
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

  async function generateVoiceMessage(influencer) {
    const lang = influencer.languages?.[0]?.toLowerCase() || "english";
    const name = influencer.name;
    const category = influencer.category;
    const platform = influencer.platforms?.[0]?.platform || "Instagram";

    const prompt = `
Write a short and friendly outreach message to ${name}, a ${category} influencer, in ${lang}. Mention their content on ${platform} and say we're excited to explore a possible collaboration.
    `;

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      const data = await res.json();
      const message = data.choices[0].message.content;

      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = lang.includes("hindi") ? "hi-IN" : "en-US";
      speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Voice generation failed", err);
      alert("Failed to generate or speak the message.");
    }
  }

  function handleGenerateContract(influencer) {
    const html = generateContract(influencer);
    const link = sendForSignature(influencer.creator_id);
    navigate("/contract", {
      state: { contractHtml: html, link }
    });
  }

  function handleGenerateInvoice(influencer) {
    const invoice = generateInvoice(influencer);
    processPayout(invoice.invoiceId);
    navigate("/invoice", {
      state: { invoice }
    });
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border rounded-xl p-4 shadow-sm hover:shadow-md bg-white">
      <img
        src={profile?.profile_image || fallbackImage}
        alt={influencer.name}
        className="w-16 h-16 object-cover rounded-full border"
        onError={(e) => (e.target.src = fallbackImage)}
      />

      <div className="flex-1">
        <h2 className="text-lg font-semibold">{influencer.name}</h2>
        <p className="text-sm text-gray-500">
          {influencer.category} — {influencer.location}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          Tags: {influencer.tags.join(', ')}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Pricing Tier: <span className="font-medium">{influencer.pricing_tier}</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Followers: <span className="font-medium">{profile.followers.toLocaleString()}</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Collaborated with: {influencer.previous_collaborations.join(', ')}
        </p>

        <span className={`text-xs px-3 py-1 rounded-full ${collabStatus} font-medium`}>
          {influencer.collaboration_open ? 'Open to Collaborate' : 'Not Available'}
        </span>

        <button
          onClick={() => generateVoiceMessage(influencer)}
          className="mt-3 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-sm"
        >
          🗣️ Generate Voice Message
        </button>

        <button
          onClick={() => handleGenerateContract(influencer)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
        >
          📄 Generate Contract
        </button>

        <button
          onClick={() => handleGenerateInvoice(influencer)}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm"
        >
          💳 Generate Invoice
        </button>
      </div>
    </div>
  );
}

