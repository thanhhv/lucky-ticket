import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Check if user is already logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const address = localStorage.getItem('userAddress');
    
    if (token && address) {
      setIsLoggedIn(true);
      setUserAddress(address);
    }
  }, []);
  
  const handleLogin = (token: string, address: string) => {
    setIsLoggedIn(true);
    setUserAddress(address);
    setShowLoginModal(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userAddress');
    setIsLoggedIn(false);
    setUserAddress('');
  };
  
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">Lottery Pools</Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/past-pools" className="hover:text-blue-400">Past Pools</Link>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-300">
              {userAddress.substring(0, 6)}...{userAddress.substring(38)}
            </span>
            <div 
              className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => {
                window.location.href = '/profile';
              }}
              title="View Profile"
            >
              <span className="text-white font-bold">
                {userAddress ? userAddress.substring(2, 4).toUpperCase() : 'U'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-300 hover:text-white"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        ) : (
          <button 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            onClick={() => setShowLoginModal(true)}
          >
            Login
          </button>
        )}
      </div>
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
        />
      )}
    </nav>
  );
};

export default Navbar;
