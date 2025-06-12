/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  });
  const [isBooking, setIsBooking] = useState(false);

  const services = [
    {
      id: 1,
      title: "Premium Tailoring",
      description:
        "Custom-fit clothing tailored to your exact measurements for perfect comfort and style.",
      icon: "✂️",
      duration: "3-5 days",
    },
    {
      id: 2,
      title: "Express Delivery",
      description:
        "Get your favorite items delivered within 24 hours in selected cities.",
      icon: "🚚",
      duration: "24 hours",
    },
    {
      id: 3,
      title: "Eco Cleaning",
      description:
        "Professional eco-friendly cleaning for your delicate fabrics and premium materials.",
      icon: "🌿",
      duration: "2 days",
    },
    {
      id: 4,
      title: "Personal Stylist",
      description:
        "One-on-one consultation with our fashion experts to elevate your wardrobe.",
      icon: "👔",
      duration: "1 hour",
    },
    {
      id: 5,
      title: "VIP Membership",
      description:
        "Exclusive access to limited collections, private sales, and personal shopping assistants.",
      icon: "⭐",
      duration: "Ongoing",
    },
    {
      id: 6,
      title: "Gift Wrapping",
      description:
        "Elegant gift wrapping with premium materials for special occasions.",
      icon: "🎁",
      duration: "15 mins",
    },
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    toast.success(`${service.title} selected!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    
    try {
      // Simulate API call
      const response = await fetch("https://api.example.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: selectedService,
          customer: bookingData,
          bookingDate: new Date().toISOString(),
        }),
      });

      // In a real app, you would check response.ok and handle errors
      toast.success(`Booking confirmed for ${selectedService.title}!`, {
        position: "top-right",
        autoClose: 5000,
      });

      // Reset form and close modals
      setBookingData({
        name: "",
        email: "",
        phone: "",
        date: "",
        notes: "",
      });
      setSelectedService(null);
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsBooking(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="min-h-screen w-full rounded-2xl mt-4 bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HexaShop Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elevate your shopping experience with our premium services designed
            exclusively for HexaShop customers.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => handleServiceSelect(service)}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-indigo-600">
                    Duration: {service.duration}
                  </span>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceSelect(service);
                    }}
                  >
                    Select
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedService.title}
                </h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-6xl text-center my-6">
                {selectedService.icon}
              </div>
              <p className="text-gray-600 mb-4">
                {selectedService.description}
              </p>
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500">
                  Estimated duration:
                </p>
                <p className="text-lg font-semibold text-indigo-600">
                  {selectedService.duration}
                </p>
              </div>
              <button
                className="w-full px-4 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsBooking(true)}
              >
                Book This Service
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Booking Form Modal */}
        {isBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Book {selectedService?.title}
                </h3>
                <button
                  onClick={() => setIsBooking(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleBookingSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="hexashop"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="info2example.com"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 83902-29200"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={bookingData.notes}
                      placeholder="............"
                      onChange={handleInputChange}
                      className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isBooking}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBooking ? "Processing..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
};