import React from 'react';
import { Link } from 'react-router-dom';

interface PoolCardProps {
  id: string;
  name: string;
  prize: string;
  endTime: string;
  image?: string;
}

const PoolCard: React.FC<PoolCardProps> = ({ id, name, prize, endTime, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="h-40 bg-gray-200 relative">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <span className="text-white text-2xl font-bold">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Prize:</span>
            <span className="font-medium text-green-600">{prize}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Ends in:</span>
            <span className="font-medium text-orange-600">{endTime}</span>
          </div>
        </div>
        
        <Link 
          to={`/pool/${id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PoolCard;
