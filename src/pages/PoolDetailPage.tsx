import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MintTicketModal from '../components/MintTicketModal';

// Mock data for a pool
const getMockPoolData = (id: string) => ({
  id,
  name: `Lucky Pool #${id}`,
  image: `https://source.unsplash.com/random/800x400?crypto&sig=${id}`,
  createdDate: '2025-05-15',
  endDate: '2025-05-20',
  poolAddress: '0x1234567890abcdef1234567890abcdef12345678',
  chain: 'Ethereum',
  soldTickets: 42,
  totalTickets: 100,
  totalPrize: '$10,000',
  serviceFee: '$500',
  description: 'This is an exciting lottery pool with amazing prizes. Join now for a chance to win big rewards!',
  rules: 'Mint tickets to participate. Each ticket costs $1. Winners will be selected randomly after the pool ends.',
});

const PoolDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [pool, setPool] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<any>({});
  const [showMintModal, setShowBuyModal] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch pool data from API
    setPool(getMockPoolData(id || '1'));
  }, [id]);
  
  useEffect(() => {
    if (!pool) return;
    
    const calculateTimeLeft = () => {
      const endDate = new Date(pool.endDate);
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
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
  
  if (!pool) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          Loading...
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
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
                    <span className="font-medium">$1 per ticket</span>
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
            
            {/* Buy Button */}
            <div className="text-center">
              <button
                onClick={() => setShowBuyModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition duration-300"
              >
                Mint Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showMintModal && (
        <MintTicketModal 
          poolName={pool.name}
          ticketPrice={1}
          maxTickets={pool.totalTickets - pool.soldTickets}
          onClose={() => setShowBuyModal(false)}
          onMint={(quantity) => {
            // Handle buy logic here
            console.log(`Bought ${quantity} tickets`);
            setShowBuyModal(false);
          }}
        />
      )}
    </div>
  );
};

export default PoolDetailPage;
