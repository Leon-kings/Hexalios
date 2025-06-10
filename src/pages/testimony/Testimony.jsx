/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Close,
  Send,
  Star,
  StarBorder,
  Chat,
  Person,
} from "@mui/icons-material";

export const Testimony = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    testimony: "",
    rating: 5,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [slideDirection, setSlideDirection] = useState("right");

  // Sample testimonies data
  const [testimonies, setTestimonies] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      testimony:
        "HexaShop has the best customer service I have ever experienced. Highly recommended!",
      rating: 5,
      date: "2023-05-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      testimony:
        "Great products at affordable prices. Will definitely shop here again.",
      rating: 4,
      date: "2023-06-22",
    },
    {
      id: 3,
      name: "Charlie Brown",
      testimony:
        "Fast delivery and excellent quality. Very satisfied with my purchase.",
      rating: 5,
      date: "2023-07-10",
    },
    {
      id: 4,
      name: "Diana Prince",
      testimony:
        "The product selection is amazing and the website is so easy to use.",
      rating: 5,
      date: "2023-08-05",
    },
    {
      id: 5,
      name: "Edward Norton",
      testimony: "Good prices but delivery took longer than expected.",
      rating: 3,
      date: "2023-09-12",
    },
  ]);

  // Auto slide effect
  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      if (slideDirection === "right") {
        setCurrentSlide((prev) =>
          prev === testimonies.length - 1 ? 0 : prev + 1
        );
      } else {
        setCurrentSlide((prev) =>
          prev === 0 ? testimonies.length - 1 : prev - 1
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoSlide, slideDirection, testimonies.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.testimony) {
      toast.error("Please fill in all fields");
      return;
    }

    const newTestimony = {
      id: testimonies.length + 1,
      name: formData.name,
      testimony: formData.testimony,
      rating: parseInt(formData.rating),
      date: new Date().toISOString().split("T")[0],
    };

    setTestimonies([newTestimony, ...testimonies]);
    toast.success("Thank you for sharing your testimony!");
    setFormData({ name: "", testimony: "", rating: 5 });
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    setSlideDirection("right");
    setCurrentSlide((prev) => (prev === testimonies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideDirection("left");
    setCurrentSlide((prev) => (prev === 0 ? testimonies.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setSlideDirection(index > currentSlide ? "right" : "left");
    setCurrentSlide(index);
  };

  // For mobile view, we'll show one testimony at a time
  const visibleTestimonies =
    window.innerWidth < 768
      ? [testimonies[currentSlide]]
      : testimonies.slice(currentSlide, currentSlide + 3).length >= 3
      ? testimonies.slice(currentSlide, currentSlide + 3)
      : [
          ...testimonies.slice(currentSlide),
          ...testimonies.slice(0, 3 - (testimonies.length - currentSlide)),
        ];

  return (
    <>
      <div className="w-full rounded-2xl mt-4 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Customer Testimonials
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Hear what our customers say about us
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Chat className="mr-2" />
              Share Your Experience
            </motion.button>
          </div>

          {/* Testimonies Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
              aria-label="Previous testimony"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
              aria-label="Next testimony"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Testimonies Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-10">
              {visibleTestimonies.map((testimony, index) => (
                <motion.div
                  key={testimony.id}
                  initial={{
                    opacity: 0,
                    x: slideDirection === "right" ? 50 : -50,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <Person className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {testimony.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {testimony.date}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) =>
                          i < testimony.rating ? (
                            <Star key={i} className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <StarBorder
                              key={i}
                              className="h-5 w-5 text-gray-300"
                            />
                          )
                        )}
                      </div>
                      <p className="text-gray-600">{testimony.testimony}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimony ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Share Testimony Modal */}
        {isModalOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 bg-gray-500 opacity-75"
                  onClick={() => setIsModalOpen(false)}
                ></div>
              </div>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25 }}
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <Close className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3
                      className="text-2xl leading-6 font-bold text-gray-900"
                      id="modal-headline"
                    >
                      Share Your Experience
                    </h3>
                    <div className="mt-2">
                      <p className="text-md text-gray-500">
                        We value your feedback! Please share your shopping
                        experience with us.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Rating *
                      </label>
                      <select
                        name="rating"
                        id="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      >
                        <option value="" disabled>
                          Select a rating
                        </option>
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating} {rating === 1 ? "star" : "stars"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="testimony"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Testimony *
                      </label>
                      <textarea
                        name="testimony"
                        id="testimony"
                        rows={5}
                        value={formData.testimony}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Tell us about your experience..."
                        required
                      />
                    </div>
                    <div className="mt-6 sm:mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-6 py-3 bg-indigo-600 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Submit Testimony
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
