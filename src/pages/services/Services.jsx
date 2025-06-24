/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material Icons
import {
  Close,
  Checkroom,
  LocalShipping,
  Spa,
  Star,
  CardGiftcard,
  StyleRounded,
} from "@mui/icons-material";

export const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
    serviceTitle: "",
  });
  const [isBooking, setIsBooking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = [
    {
      id: 1,
      title: "Premium Tailoring",
      description:
        "Custom-fit clothing tailored to your exact measurements for perfect comfort and style.",
      icon: <Checkroom fontSize="large" className="text-indigo-600" />,
      duration: "3-5 days",
    },
    {
      id: 2,
      title: "Express Delivery",
      description:
        "Get your favorite items delivered within 24 hours in selected cities.",
      icon: <LocalShipping fontSize="large" className="text-indigo-600" />,
      duration: "24 hours",
    },
    {
      id: 3,
      title: "Eco Cleaning",
      description:
        "Professional eco-friendly cleaning for your delicate fabrics and premium materials.",
      icon: <Spa fontSize="large" className="text-indigo-600" />,
      duration: "2 days",
    },
    {
      id: 4,
      title: "Personal Stylist",
      description:
        "One-on-one consultation with our fashion experts to elevate your wardrobe.",
      icon: <StyleRounded fontSize="large" className="text-indigo-600" />,
      duration: "1 hour",
    },
    {
      id: 5,
      title: "VIP Membership",
      description:
        "Exclusive access to limited collections, private sales, and personal shopping assistants.",
      icon: <Star fontSize="large" className="text-indigo-600" />,
      duration: "Ongoing",
    },
    {
      id: 6,
      title: "Gift Wrapping",
      description:
        "Elegant gift wrapping with premium materials for special occasions.",
      icon: <CardGiftcard fontSize="large" className="text-indigo-600" />,
      duration: "15 mins",
    },
  ];

  const sendServiceSelectionToAPI = async (service) => {
    try {
      const response = await fetch("https://api.example.com/service-selections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.title,
          selectedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to record service selection");
      }

      const data = await response.json();
      console.log("Service selection recorded:", data);
    } catch (error) {
      console.error("Error recording service selection:", error);
    }
  };

  const handleServiceSelect = async (service) => {
    setSelectedService(service);
    setBookingData(prev => ({
      ...prev,
      serviceTitle: service.title
    }));
    
    await sendServiceSelectionToAPI(service);
    
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
      const completeBookingData = {
        service: {
          id: selectedService.id,
          title: selectedService.title,
          duration: selectedService.duration,
        },
        customer: {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
        },
        bookingDetails: {
          preferredDate: bookingData.date,
          notes: bookingData.notes,
          bookingDate: new Date().toISOString(),
        }
      };

      const response = await fetch("https://api.example.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeBookingData),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const result = await response.json();
      
      toast.success(
        <div>
          <div className="font-bold">Booking confirmed!</div>
          <div>{selectedService.title}</div>
          <div>Booking ID: {result.bookingId || 'N/A'}</div>
        </div>, 
        {
          position: "top-right",
          autoClose: 8000,
          closeOnClick: false,
        }
      );

      setBookingData({
        name: "",
        email: "",
        phone: "",
        date: "",
        notes: "",
        serviceTitle: "",
      });
      setSelectedService(null);
      setIsBooking(false);
    } catch (error) {
      toast.error(
        <div>
          <div>Failed to submit booking for:</div>
          <div className="font-bold">{selectedService.title}</div>
          <div>Please try again.</div>
        </div>, 
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    } finally {
      setIsBooking(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { 
      y: "100vh",
      opacity: 0,
      transition: { duration: 0.3 }
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        damping: 25
      }
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div className="min-h-screen w-full rounded-2xl mt-4 bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          HexaShop Services
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Elevate your shopping experience with our premium services designed
          exclusively for HexaShop customers.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
            onClick={() => handleServiceSelect(service)}
          >
            <div className="p-5 sm:p-6">
              <div className="flex justify-center mb-3 sm:mb-4">
                {service.icon}
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 text-center">
                {service.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 text-center">
                {service.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-medium text-indigo-600">
                  Duration: {service.duration}
                </span>
                <button
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-600 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSelectedService(null)}
            />
            
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed ${isMobile ? 'inset-x-0 bottom-0' : 'inset-0'} bg-white rounded-t-3xl sm:rounded-xl max-w-md w-full mx-auto z-50 shadow-2xl`}
              style={isMobile ? { margin: 0 } : {}}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {selectedService.title}
                  </h3>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-500 p-1"
                  >
                    <Close fontSize="medium" />
                  </button>
                </div>
                
                <div className="flex justify-center my-4 sm:my-6">
                  <div className="text-indigo-600 scale-150">
                    {selectedService.icon}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm sm:text-base mb-4 text-center">
                  {selectedService.description}
                </p>
                
                <div className="mb-5 sm:mb-6 text-center">
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    Estimated duration:
                  </p>
                  <p className="text-base sm:text-lg font-semibold text-indigo-600">
                    {selectedService.duration}
                  </p>
                </div>
                
                <button
                  className="w-full px-4 py-2 sm:py-3 bg-indigo-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsBooking(true)}
                >
                  Book This Service
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBooking && selectedService && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black bg-opacity-50 scroll-auto z-40"
              onClick={() => setIsBooking(false)}
            />
            
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed ${isMobile ? 'inset-x-0 bottom-0' : 'inset-0'} bg-white rounded-t-3xl sm:rounded-xl max-w-md w-full mx-auto z-50 shadow-2xl`}
              style={isMobile ? { margin: 0 } : {}}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Book {selectedService.title}
                  </h3>
                  <button
                    onClick={() => setIsBooking(false)}
                    className="text-gray-400 hover:text-gray-500 p-1"
                  >
                    <Close fontSize="medium" />
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className=" scroll-auto">
                  <div className="space-y-2 sm:space-y-4">
                    <div className="p-3 sm:p-4 bg-gray-200 rounded-lg mb-3 sm:mb-4">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
                        Service Details
                      </h4>
                      <p className="text-gray-700 text-xs sm:text-sm">
                        <span className="font-semibold">Service:</span> {selectedService.title}
                      </p>
                      <p className="text-gray-700 text-xs sm:text-sm">
                        <span className="font-semibold">Duration:</span> {selectedService.duration}
                      </p>
                    </div>
<div className="grid grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={bookingData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div></div>
<div className="grid grid-cols-2"></div>
                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 123-456-7890"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-xs sm:text-sm font-medium text-gray-700">
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
                        className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-xs sm:text-sm font-medium text-gray-700">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={2}
                        value={bookingData.notes}
                        placeholder="Any special requirements..."
                        onChange={handleInputChange}
                        className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm py-2 px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      disabled={isBooking}
                      className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isBooking ? "Processing..." : "Confirm Booking"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};