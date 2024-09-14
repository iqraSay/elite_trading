import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import Header from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center ">
        <FaExclamationTriangle className="text-6xl text-red-600 mb-4" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 rounded shadow-md transition-transform transform hover:-translate-y-1">
          Go Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorPage;
