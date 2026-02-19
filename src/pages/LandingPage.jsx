import React from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-black">
      
      {/* Left Side - Content */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16 text-center md:text-left">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Money Muling Detection
          </h1>

          <p className="text-white text-lg md:text-xl mb-8 max-w-lg drop-shadow-md">
            Detect suspicious financial networks using graph analysis and
            uncover hidden fraud rings in real time.
          </p>

          <Link
            to="/fileUpload"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-xl transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Right Side - Spline */}
      <div className="w-full md:w-1/2 h-64 md:h-full">
        <Spline scene="https://prod.spline.design/rwNXTaUH9i1O1EOC/scene.splinecode" />
      </div>
    </div>
  );
};

export default LandingPage;