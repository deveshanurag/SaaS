// src/pages/About.jsx
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="w-full max-w-4xl p-8 mt-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">About Us</h1>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to our platform, where we offer text processing services
            with a focus on simplicity, efficiency, and transparency. Our system
            is designed to help users analyze and transform text with real-time
            insights into resource usage.
          </p>
          <p className="text-lg text-gray-700">
            We value your time and resources. Our services are optimized to
            provide accurate results with minimal computational overhead,
            ensuring a cost-effective solution for all your needs.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
