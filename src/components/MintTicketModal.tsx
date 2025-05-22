import React, { useState } from 'react';

interface MintTicketModalProps {
  poolName: string;
  ticketPrice: number;
  maxTickets: number;
  onClose: () => void;
  onMint: (quantity: number) => void;
}

const MintTicketModal: React.FC<MintTicketModalProps> = ({ 
  poolName, 
  ticketPrice, 
  maxTickets, 
  onClose, 
  onMint 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxTickets) {
      setQuantity(value);
    }
  };
  
  const handleMint = () => {
    setIsProcessing(true);
    // Simulate transaction processing
    setTimeout(() => {
      onMint(quantity);
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Mint Tickets</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="py-4 space-y-4">
          <div>
            <p className="text-gray-700 mb-2">Pool: <span className="font-medium">{poolName}</span></p>
            <p className="text-gray-700 mb-2">Price: <span className="font-medium">${ticketPrice} per ticket</span></p>
            <p className="text-gray-700 mb-2">Available: <span className="font-medium">{maxTickets} tickets</span></p>
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={maxTickets}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="bg-gray-100 p-3 rounded-md">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Cost:</span>
              <span className="font-bold text-green-600">${(quantity * ticketPrice).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleMint}
            disabled={isProcessing}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-300 disabled:opacity-70"
          >
            {isProcessing ? 'Processing...' : 'Confirm Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintTicketModal;
