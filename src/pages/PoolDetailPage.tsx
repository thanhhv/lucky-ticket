import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MintTicketModal from '../components/MintTicketModal';

interface PoolApiData {
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
  data: PoolApiData;
}

const PoolDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pool, setPool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<any>({});
  const [showMintModal, setShowMintModal] = useState(false);
  
  useEffect(() => {
    const fetchPoolData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ApiResponse>(`http://localhost:3000/api/pools/${id || '1'}`);
        
        // Combine API data with mock data for fields not provided by API
        const apiData = response.data.data;
        
        setPool({
          id: apiData.poolId.toString(),
          name: apiData.tokenName,
          image: `https://source.unsplash.com/random/800x400?crypto&sig=${apiData.poolId}`,
          createdDate: new Date(apiData.createdAt).toLocaleDateString(),
          endDate: new Date(apiData.endTime).toLocaleDateString(),
          endTime: apiData.endTime, // Store the original endTime from API
          poolAddress: apiData.token,
          chain: 'Ethereum', // Mock data as API doesn't provide this
          soldTickets: 42, // Mock data
          totalTickets: 100, // Mock data
          totalPrize: `$${parseInt(apiData.requiredAmount) * 100}`, // Calculate based on requiredAmount
          serviceFee: `$${parseInt(apiData.requiredAmount) * 5}`, // 5% of total prize
          description: `This is an exciting lottery pool for ${apiData.tokenName} tokens. Join now for a chance to win big rewards!`,
          rules: `Mint tickets to participate. Each ticket costs $1. Winners will be selected randomly after the pool ends on ${new Date(apiData.endTime).toLocaleDateString()}.`,
          status: apiData.status,
          requiredAmount: apiData.requiredAmount,
          tokenName: apiData.tokenName
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching pool data:', err);
        setError('Failed to load pool details. Please try again later.');
        
        // Fallback to mock data if API fails
        setPool({
          id: id || '1',
          name: `Lucky Pool #${id || '1'}`,
          image: `https://source.unsplash.com/random/800x400?crypto&sig=${id || '1'}`,
          createdDate: '2025-05-15',
          endDate: '2025-05-20',
          endTime: '2025-05-20T23:59:59.000Z', // Mock endTime in ISO format
          poolAddress: '0x1234567890abcdef1234567890abcdef12345678',
          chain: 'Ethereum',
          soldTickets: 42,
          totalTickets: 100,
          totalPrize: '$10,000',
          serviceFee: '$500',
          description: 'This is an exciting lottery pool with amazing prizes. Join now for a chance to win big rewards!',
          rules: 'Mint tickets to participate. Each ticket costs $1. Winners will be selected randomly after the pool ends.',
          status: 'active',
          requiredAmount: '10',
          tokenName: 'MTK'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPoolData();
  }, [id]);
  
  useEffect(() => {
    if (!pool) return;
    
    const calculateTimeLeft = () => {
      // Use endTime directly from API instead of endDate
      const endTime = new Date(pool.endTime);
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [pool]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error && !pool) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!pool) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          No pool data available.
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Pool Header */}
          <div className="h-64 bg-gray-200 relative">
            <img 
              src={pool.image} 
              alt={pool.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{pool.name}</h1>
            </div>
          </div>
          
          {/* Pool Content */}
          <div className="p-6">
            {/* Status Badge */}
            <div className="mb-4 flex justify-end">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                pool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {pool.status === 'active' ? 'Active' : pool.status}
              </span>
            </div>
            
            {/* Countdown Timer */}
            <div className="mb-8 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Time Remaining</h3>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{timeLeft.days}</div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{timeLeft.hours}</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{timeLeft.minutes}</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{timeLeft.seconds}</div>
                  <div className="text-sm text-gray-600">Seconds</div>
                </div>
              </div>
            </div>
            
            {/* Pool Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pool Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created Date:</span>
                    <span className="font-medium">{pool.createdDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">{pool.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pool Address:</span>
                    <span className="font-medium truncate max-w-[200px]">{pool.poolAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chain:</span>
                    <span className="font-medium">{pool.chain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Required Amount:</span>
                    <span className="font-medium">{pool.requiredAmount} {pool.tokenName}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Prize Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tickets Sold:</span>
                    <span className="font-medium">{pool.soldTickets}/{pool.totalTickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Prize:</span>
                    <span className="font-medium text-green-600">{pool.totalPrize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee (5%):</span>
                    <span className="font-medium">{pool.serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket Price:</span>
                    <span className="font-medium">{pool.requiredAmount} {pool.tokenName}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description and Rules */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-700 mb-4">{pool.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Participation & Reward Rules</h3>
              <p className="text-gray-700">{pool.rules}</p>
            </div>
            
            {/* Mint Button */}
            <div className="text-center">
              <button
                onClick={() => setShowMintModal(true)}
                disabled={pool.status !== 'active'}
                className={`${
                  pool.status === 'active' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white px-8 py-3 rounded-lg font-semibold shadow-md transition duration-300`}
              >
                Mint Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showMintModal && (
        <MintTicketModal 
          poolName={pool.name}
          tokenName={pool.tokenName}
          requiredAmount={pool.requiredAmount}
          poolAddress={pool.poolAddress}
          onClose={() => setShowMintModal(false)}
        />
      )}
    </div>
  );
};

export default PoolDetailPage;
