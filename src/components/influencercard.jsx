import React from 'react';

export default function InfluencerCard({ influencer }) {
  const profile = influencer.platforms[0];
  const fallbackImage = 'https://via.placeholder.com/80?text=User';

  const collabStatus = influencer.collaboration_open
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';

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
      </div>
      <span
        className={`text-xs px-3 py-1 rounded-full ${collabStatus} font-medium`}
      >
        {influencer.collaboration_open ? 'Open to Collaborate' : 'Not Available'}
      </span>
    </div>
  );
}
