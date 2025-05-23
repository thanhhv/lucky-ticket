import React, { useState } from 'react';
import { ethers } from 'ethers';

interface MintTicketModalProps {
  poolName: string;
  tokenName: string;
  requiredAmount: string;
  poolAddress: string;
  onClose: () => void;
}

const MintTicketModal: React.FC<MintTicketModalProps> = ({ 
  poolName, 
  tokenName,
  requiredAmount,
  poolAddress,
  onClose
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const handleMint = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
      }
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please create an account in MetaMask.");
      }
      
      // Connect to the custom RPC
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("wallet_addEthereumChain", [
        {
          chainId: "0x1", // This should be the correct chainId for your network
          chainName: "MegaETH",
          rpcUrls: ["https://carrot.megaeth.com/rpc"],
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18
          }
        }
      ]);
      
      // Create contract instance for the token (ERC20)
      const tokenAbi = [
        "function approve(address spender, uint256 amount) external returns (bool)",
        "function allowance(address owner, address spender) external view returns (uint256)"
      ];
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(poolAddress, tokenAbi, signer);
      
      // Create contract instance for the prize pool
      const prizePoolAddress = "0x906623Aa8789127A5f7E5bF1f7499E7D5dbC6c0E";
      const prizePoolAbi = [
        "function deposit(uint256 _amount) external"
      ];
      const prizePoolContract = new ethers.Contract(prizePoolAddress, prizePoolAbi, signer);
      
      // Convert requiredAmount to wei (assuming 18 decimals)
      const amount = ethers.utils.parseUnits(requiredAmount, 18);
      
      // First approve the prize pool contract to spend tokens
      const approveTx = await tokenContract.approve(prizePoolAddress, amount);
      await approveTx.wait();
      
      // Then deposit to the prize pool
      const depositTx = await prizePoolContract.deposit(amount);
      const receipt = await depositTx.wait();
      
      setTxHash(receipt.transactionHash);
      setIsProcessing(false);
    } catch (err: any) {
      console.error("Error minting ticket:", err);
      setError(err.message || "Failed to mint ticket. Please try again.");
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Mint Ticket</h2>
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
            <p className="text-gray-700 mb-2">Required Amount: <span className="font-medium">{requiredAmount} {tokenName}</span></p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {txHash && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Transaction successful! 
              <div className="text-sm mt-1 break-all">
                Transaction hash: {txHash}
              </div>
            </div>
          )}
          
          <div className="bg-gray-100 p-3 rounded-md">
            <div className="flex justify-between">
              <span className="text-gray-700">Total Cost:</span>
              <span className="font-bold text-green-600">{requiredAmount} {tokenName}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              By confirming, you will be prompted to approve the transaction in MetaMask.
            </p>
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
            disabled={isProcessing || !!txHash}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-300 disabled:opacity-70"
          >
            {isProcessing ? 'Processing...' : txHash ? 'Completed' : 'Confirm Mint'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintTicketModal;
