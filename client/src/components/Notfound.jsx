// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-emerald-300 to-teal-100 bg-gray-100 text-gray-800 px-4 mt-2 rounded-2xl">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-center mb-6 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
