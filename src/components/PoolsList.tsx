import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PoolCard from './PoolCard';

interface Pool {
  _id: string;
  poolId: number;
  token: string;
  tokenName: string;
  requiredAmount: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

interface ApiResponse {
  success: boolean;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  data: Pool[];
}

const PoolsList = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(`http://localhost:3000/api/pools?page=${page}`);
        setPools(prevPools => page === 1 ? response.data.data : [...prevPools, ...response.data.data]);
        setTotalPages(response.data.pagination.totalPages);
        setError(null);
      } catch (err) {
        console.error('Error fetching pools:', err);
        setError('Failed to load pools. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, [page]);
  
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Helper function to format end time
  const formatEndTime = (endTimeStr: string) => {
    const endTime = new Date(endTimeStr);
    const now = new Date();
    const diffMs = endTime.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Ended';
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Active Lottery Pools</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {pools.length === 0 && !loading && !error ? (
          <div className="text-center text-gray-600 py-10">
            No active pools found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pools.map(pool => (
              <PoolCard 
                key={pool._id}
                id={pool.poolId.toString()}
                name={pool.tokenName}
                endTime={formatEndTime(pool.endTime)}
                participant="0/20"
                requiredAmount={pool.requiredAmount}
                image={`/lucky-ticket.png`}
              />
            ))}
          </div>
        )}
        
        {page < totalPages && (
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
