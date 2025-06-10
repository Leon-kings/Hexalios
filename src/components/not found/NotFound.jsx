import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotFound = () => {
  useEffect(() => {
    toast.error("Page not found! Redirecting you...", {
      position: "top-center",
      autoClose: 3000,
    });
  }, []);

  const handleGoHome = () => {
    // Simulate navigation
    toast.info("Taking you home...", { autoClose: 2000 });
    setTimeout(() => (window.location.href = "/"), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating bubbles background */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: `${Math.random() * 150 + 50}px`,
            height: `${Math.random() * 150 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Main card */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-10">
        <div className="text-center">
          {/* Material Icons */}
          <span className="material-icons-outlined  text-red-500 mb-4 animate-pulse">
            error_outline
          </span>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              Go Home
            </button>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};
