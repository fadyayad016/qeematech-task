import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <svg 
          className="w-16 h-16 text-red-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">403 - Access Denied</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Oops! It looks like you don't have the necessary permissions to view this page. 
        Please contact your administrator if you think this is a mistake.
      </p>

      <Link to="/">
        <Button variant="primary" className="px-8 py-3">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Unauthorized;