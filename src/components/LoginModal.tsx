import { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (token: string, address: string) => void;
}

const LoginModal = ({ onClose, onLogin }: LoginModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState('');

  const connectMetamask = async () => {
    if (!window.ethereum) {
      setStatus('MetaMask not detected. Please install MetaMask extension.');
      return;
    }

    setIsConnecting(true);
    setStatus('Requesting account access...');
    
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        setStatus('No accounts found. Please create an account in MetaMask.');
        setIsConnecting(false);
        return;
      }

      const address = accounts[0];
      setStatus(`Connected to account: ${address.substring(0, 6)}...${address.substring(38)}`);
      
      // Get sign message from backend
      let message;
      try {
        setStatus('Fetching authentication message...');
        const response = await axios.get(`http://localhost:3000/auth/message?address=${address}`);
        message = response.data.message;
      } catch (error) {
        console.error('Error fetching message from backend:', error);
        // Use default message if backend call fails
        message = `Sign this message to login: nonce=abcd1234`;
      }

      setStatus('Please sign the message in MetaMask...');
      
      // Request signature from user
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      
      setStatus('Verifying signature...');
      
      // Verify signature with backend
      try {
        const verifyResponse = await axios.post('http://localhost:3000/auth/verify', {
          address,
          message,
          signature
        });
        
        // If successful, backend returns a token
        const { token } = verifyResponse.data;
        
        // Save token to localStorage for future API calls
        localStorage.setItem('authToken', token);
        localStorage.setItem('userAddress', address);
        
        setStatus('Login successful!');
        
        // Notify parent component about successful login
        onLogin(token, address);
      } catch (error) {
        console.error('Error verifying signature:', error);
        setStatus('Authentication failed. Please try again.');
        setIsConnecting(false);
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      if (error.code === 4001) {
        // User rejected request
        setStatus('Connection request rejected. Please approve the connection request.');
      } else {
        setStatus('Error connecting to MetaMask. Please try again.');
      }
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
        
        {status && (
          <div className="mb-4 p-3 bg-gray-100 rounded-md text-sm text-gray-700">
            {status}
          </div>
        )}
        
        <div className="py-4">
          <button
            onClick={connectMetamask}
            disabled={isConnecting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            <img 
              src="https://metamask.io/images/metamask-fox.svg" 
              alt="MetaMask" 
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
