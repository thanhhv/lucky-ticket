import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const handleLogin = () => {
    // Simulate successful login
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">Lottery Pools</Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/past-pools" className="hover:text-blue-400">Past Pools</Link>
        
        {isLoggedIn ? (
          <div 
            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => {
              // Navigate to profile page
              window.location.href = '/profile';
            }}
          >
            <span className="text-white font-bold">U</span>
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
