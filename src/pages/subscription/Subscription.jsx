/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Send,
  LocationOn,
  Phone,
  Email,
  AccessTime,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SubscribeSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "https://your-api-endpoint.com/subscribe",
        formData
      );

      toast.success(
        "Subscription successful! You will receive a confirmation email shortly.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Reset form
      setFormData({ name: "", email: "" });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Subscription failed. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 w-full rounded-2xl mt-4 py-16 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content - Subscription Form */}
            <div className="w-full lg:w-8/12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  By Subscribing To Our Newsletter You Can Get 30% Off
                </h2>
                <p className="text-gray-600">
                  Details to details is what makes Hexashop different from the
                  other themes.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email Address"
                      pattern="[^ @]*@[^ @]*"
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="sm:w-auto">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="text-white" />
                      {isSubmitting ? "Submitting..." : "Subscribe"}
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Content - Contact Info */}
            <div className="w-full lg:w-4/12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start">
                    <LocationOn className="text-gray-700 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Store Location:
                      </p>
                      <p className="text-gray-600">
                        Sunny Isles Beach, FL 33160, United States
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-gray-700 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Phone:</p>
                      <p className="text-gray-600">010-020-0340</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <LocationOn className="text-gray-700 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Office Location:
                      </p>
                      <p className="text-gray-600">North Miami Beach</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <AccessTime className="text-gray-700 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Work Hours:</p>
                      <p className="text-gray-600">07:30 AM - 9:30 PM Daily</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Email className="text-gray-700 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Email:</p>
                      <p className="text-gray-600">info@company.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 flex-shrink-0 w-5 h-5">
                      {/* Social icon placeholder */}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Social Media:</p>
                      <p className="text-gray-600">
                        <a href="#" className="text-blue-600 hover:underline">
                          Facebook
                        </a>
                        ,{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Instagram
                        </a>
                        ,{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          LinkedIn
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
