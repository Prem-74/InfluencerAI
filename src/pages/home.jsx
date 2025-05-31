// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/final_influencers.json';

const FILTER_KEYS = [
  'category',
  'location',
  'language',
  'pricing_tier',
  'collaboration_open',
  'previous_collaborations'
];

export default function Home() {
  const [filterType, setFilterType] = useState('category');
  const [filterValue, setFilterValue] = useState('');
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (filterType === 'language') {
      const allLanguages = data.flatMap((i) => i.languages);
      setOptions([...new Set(allLanguages)].sort());
    } else if (filterType === 'previous_collaborations') {
      const allCollabs = data.flatMap((i) => i.previous_collaborations);
      setOptions([...new Set(allCollabs)].sort());
    } else if (filterType === 'collaboration_open') {
      setOptions(['true', 'false']);
    } else {
      const values = [...new Set(data.map((i) => i[filterType]))].sort();
      setOptions(values);
    }
    setFilterValue('');
  }, [filterType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterType && filterValue) {
      navigate(`/explore?filter=${filterType}&value=${filterValue}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Discover Influencers</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <label className="block text-gray-700">Filter By</label>
        <select
          className="w-full p-3 border rounded-lg text-gray-700"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {FILTER_KEYS.map((key) => (
            <option key={key} value={key}>{key.replace(/_/g, ' ')}</option>
          ))}
        </select>

        {options.length > 0 && (
          <>
            <label className="block text-gray-700 capitalize">Select {filterType.replace(/_/g, ' ')}</label>
            <select
              className="w-full p-3 border rounded-lg text-gray-700"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="" disabled>Select a {filterType}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </>
        )}

        <button
          type="submit"
          disabled={!filterValue}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Explore
        </button>
      </form>
    </div>
  );
}
