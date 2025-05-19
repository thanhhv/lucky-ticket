import React from 'react';

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Win Big with Lottery Pools</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">Join exciting pools, buy tickets, and get a chance to win amazing prizes. All transactions secured on blockchain.</p>
        <button className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300">
          Explore Pools
        </button>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
      </div>
    </div>
  );
};

export default Banner;
