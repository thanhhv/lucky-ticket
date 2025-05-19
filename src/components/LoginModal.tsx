import { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal = ({ onClose, onLogin }: LoginModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectMetamask = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate Metamask connection
      setTimeout(() => {
        onLogin();
        setIsConnecting(false);
      }, 1000);
      
      // In a real implementation, we would use window.ethereum
      // if (window.ethereum) {
      //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      //   if (accounts.length > 0) {
      //     onLogin();
      //   }
      // }
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Login</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="py-4">
          <button
            onClick={connectMetamask}
            disabled={isConnecting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <img 
              src="https://metamask.io/images/metamask-fox.svg" 
              alt="Metamask" 
              className="w-6 h-6"
            />
            <span>{isConnecting ? 'Connecting...' : 'Connect with MetaMask'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
