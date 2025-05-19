import React, { useState } from 'react';
import PoolCard from './PoolCard';

// Mock data for pools
const MOCK_POOLS = Array(20).fill(null).map((_, index) => ({
  id: `pool-${index + 1}`,
  name: `Lucky Pool #${index + 1}`,
  prize: `$${(Math.random() * 10000).toFixed(2)}`,
  endTime: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
  image: index % 3 === 0 ? `https://source.unsplash.com/random/300x200?crypto&sig=${index}` : undefined
}));

const PoolsList = () => {
  const [visiblePools, setVisiblePools] = useState(8);
  const [loading, setLoading] = useState(false);
  
  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisiblePools(prev => Math.min(prev + 8, MOCK_POOLS.length));
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Active Lottery Pools</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_POOLS.slice(0, visiblePools).map(pool => (
            <PoolCard 
              key={pool.id}
              id={pool.id}
              name={pool.name}
              prize={pool.prize}
              endTime={pool.endTime}
              image={pool.image}
            />
          ))}
        </div>
        
        {visiblePools < MOCK_POOLS.length && (
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition duration-300 disabled:opacity-70"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolsList;
