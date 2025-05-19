import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import PoolsList from '../components/PoolsList';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Banner />
      <PoolsList />
    </div>
  );
};

export default HomePage;
