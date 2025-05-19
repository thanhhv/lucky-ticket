import React, { useState } from 'react';
import Navbar from '../components/Navbar';

// Mock data for user profile
const USER_PROFILE = {
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  totalAssets: '$5,245.78',
};

// Mock data for participation history
const PARTICIPATION_HISTORY = Array(25).fill(null).map((_, index) => ({
  id: `participation-${index + 1}`,
  poolName: `Lucky Pool #${index + 1}`,
  participationDate: `2025-${(index % 12) + 1}-${(index % 28) + 1}`,
  status: index % 3 === 0 ? 'Won' : 'Lost',
  ticketsBought: Math.floor(Math.random() * 10) + 1,
  totalTickets: 100,
  reward: index % 3 === 0 ? `$${(Math.random() * 1000).toFixed(2)}` : '-'
}));

const UserProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PARTICIPATION_HISTORY.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(PARTICIPATION_HISTORY.length / itemsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">User Profile</h1>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img 
                  src={USER_PROFILE.avatar} 
                  alt={USER_PROFILE.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              
              {/* User Info */}
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{USER_PROFILE.name}</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-gray-600">Wallet Address:</span>
                    <span className="font-medium text-gray-800 break-all">{USER_PROFILE.walletAddress}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-gray-600">Total Assets:</span>
                    <span className="font-medium text-green-600">{USER_PROFILE.totalAssets}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Participation History */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Participation History</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pool Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participation Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tickets
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reward
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.poolName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.participationDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Won' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.ticketsBought}/{item.totalTickets}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{item.reward}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, PARTICIPATION_HISTORY.length)}</span> of{' '}
                  <span className="font-medium">{PARTICIPATION_HISTORY.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === i + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
