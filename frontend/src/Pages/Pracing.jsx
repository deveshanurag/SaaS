// src/pages/Pricing.jsx
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-4xl p-8 mt-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Pricing</h1>
          <p className="text-lg text-gray-700 mb-4">
            Our pricing model is transparent and based on the resources used to
            process your text. Here's the breakdown:
          </p>
          <ul className="list-disc pl-8 text-gray-700">
            <li className="mb-2">
              <span className="font-bold">CPU Usage:</span> ₹0.05 per second of
              CPU usage.
            </li>
            <li className="mb-2">
              <span className="font-bold">RAM Usage:</span> ₹0.03 per MB of RAM
              usage.
            </li>
            <li>
              <span className="font-bold">Base Service Fee:</span> ₹1 per
              transaction.
            </li>
          </ul>
          <p className="text-lg text-gray-700 mt-4">
            Your total cost is calculated based on these metrics and displayed
            transparently after each transaction.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
