import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import influencersData from '../data/final_influencers.json';
import InfluencerCard from '../components/influencercard';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filterType = searchParams.get('filter');
  const value = searchParams.get('value');

  useEffect(() => {
    if (!filterType || !value) return;

    const matches = influencersData.filter((i) => {
      const val = value.toLowerCase();
      switch (filterType) {
        case 'language':
          return i.languages.map(l => l.toLowerCase()).includes(val);
        case 'previous_collaborations':
          return i.previous_collaborations.map(c => c.toLowerCase()).includes(val);
        case 'collaboration_open':
          return String(i.collaboration_open) === val;
        default:
          return i[filterType]?.toString().toLowerCase() === val;
      }
    });

    setFiltered(matches);
  }, [filterType, value]);

  const visible = filtered.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Exploring by {filterType}: <span className="capitalize">{value}</span>
      </h2>
      <input
        className="w-full max-w-md p-3 mb-6 border rounded"
        type="text"
        placeholder="Search within results..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid gap-4">
        {visible.map((i) => (
          <InfluencerCard key={i.creator_id} influencer={i} />
        ))}
        {visible.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
}
