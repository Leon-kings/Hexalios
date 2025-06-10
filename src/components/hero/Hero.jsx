/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bannerItems, categories } from "../../assets/data/data";
import side from '../../assets/images/left-banner-image.jpg';

// Mock API data for category items
const categoryItems = {
  women: [
    {
      id: 1,
      name: "Summer Dress",
      type: "Dress",
      price: "$49.99",
      sizes: ["S", "M", "L", "XL"],
      stock: 12,
      image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Lightweight summer dress with floral pattern"
    },
    {
      id: 2,
      name: "Denim Jacket",
      type: "Jacket",
      price: "$79.99",
      sizes: ["S", "M", "L"],
      stock: 8,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Classic blue denim jacket with front pockets"
    },
    {
      id: 3,
      name: "High Waist Jeans",
      type: "Pants",
      price: "$59.99",
      sizes: ["28", "30", "32", "34"],
      stock: 15,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Comfortable high waist jeans with stretch fabric"
    },
    {
      id: 4,
      name: "Silk Blouse",
      type: "Top",
      price: "$65.00",
      sizes: ["XS", "S", "M"],
      stock: 5,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Elegant silk blouse with button front"
    }
  ],
  men: [
    {
      id: 1,
      name: "Classic Suit",
      type: "Suit",
      price: "$199.99",
      sizes: ["38", "40", "42", "44"],
      stock: 7,
      image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Premium wool suit with two-button jacket"
    },
    {
      id: 2,
      name: "Casual T-Shirt",
      type: "Top",
      price: "$24.99",
      sizes: ["S", "M", "L", "XL"],
      stock: 20,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "100% cotton crew neck t-shirt"
    },
    {
      id: 3,
      name: "Chino Pants",
      type: "Pants",
      price: "$45.00",
      sizes: ["30", "32", "34", "36"],
      stock: 12,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Classic fit chino pants in multiple colors"
    },
    {
      id: 4,
      name: "Leather Jacket",
      type: "Jacket",
      price: "$249.99",
      sizes: ["M", "L", "XL"],
      stock: 3,
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Genuine leather motorcycle jacket"
    }
  ],
  kids: [
    {
      id: 1,
      name: "Cartoon T-Shirt",
      type: "Top",
      price: "$19.99",
      sizes: ["4", "6", "8", "10"],
      stock: 25,
      image: "https://images.unsplash.com/photo-1583744946564-b52d01e2da64?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Fun cartoon print t-shirt for kids"
    },
    {
      id: 2,
      name: "Denim Overalls",
      type: "Overalls",
      price: "$34.99",
      sizes: ["2T", "3T", "4T"],
      stock: 10,
      image: "https://images.unsplash.com/photo-1601512444020-94430c291557?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Adorable denim overalls with adjustable straps"
    },
    {
      id: 3,
      name: "Sneakers",
      type: "Shoes",
      price: "$39.99",
      sizes: ["10", "11", "12", "13"],
      stock: 18,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Comfortable sneakers with velcro straps"
    },
    {
      id: 4,
      name: "Winter Coat",
      type: "Jacket",
      price: "$59.99",
      sizes: ["5", "6", "7", "8"],
      stock: 6,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Warm winter coat with hood"
    }
  ]
};

export const Hero = () => {
  const [showShopModal, setShowShopModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(null);

  const handlePurchaseClick = () => {
    setShowShopModal(true);
  };

  const handleDiscoverClick = (category) => {
    setShowCategoryModal(category.toLowerCase());
  };

  const closeModal = () => {
    setShowShopModal(false);
    setShowCategoryModal(null);
  };

  const shopInfo = {
    name: "Leon Shop",
    address: "123 Fashion Street, Style City",
    phone: "+1 (555) 123-4567",
    email: "info@leonshop.com",
    hours: "Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-8PM",
    description:
      "We offer premium clothing collections for men, women, and kids with the latest fashion trends and accessories to complete your look.",
  };

  return (
    <>
      <div className="w-full min-h-screen mt-4 rounded-2xl bg-white py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />

        {/* Shop Information Modal */}
        {showShopModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    About {shopInfo.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">Our Story</h4>
                    <p className="text-gray-600">{shopInfo.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">
                      Contact Information
                    </h4>
                    <ul className="text-gray-600 space-y-2">
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {shopInfo.address}
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {shopInfo.phone}
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {shopInfo.email}
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {shopInfo.hours}
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        toast.success("We'll contact you soon!");
                        closeModal();
                      }}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 capitalize">
                    {showCategoryModal} Collection
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryItems[showCategoryModal]?.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-2/3">
                          <h4 className="font-semibold text-black text-lg">{item.name}</h4>
                          <p className="text-gray-500 text-sm mb-2">{item.type}</p>
                          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">
                              {item.price}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                item.stock > 5
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.stock} in stock
                            </span>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Sizes: {item.sizes.join(", ")}
                            </span>
                            <button
                              onClick={() => {
                                toast.success(`${item.name} added to cart!`);
                              }}
                              className="text-sm bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700 transition duration-300"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <button
                    onClick={() => {
                      toast.success(
                        `Browsing ${showCategoryModal} collection!`
                      );
                      closeModal();
                    }}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                  >
                    View All {showCategoryModal} Items
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Banner */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-xl overflow-hidden shadow-xl h-96 lg:h-auto"
            >
              <img
                src={side}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                <div className="text-center p-6">
                  <motion.h4
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  >
                    We Are HEXASHOP
                  </motion.h4>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-xl text-white block mb-6"
                  >
                    Awesome, clean & Perfect Collection
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePurchaseClick}
                    className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition duration-300"
                  >
                    Purchase Now!
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Right Banner Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bannerItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl overflow-hidden shadow-xl h-64 sm:h-auto"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0  bg-opacity-30 flex flex-col items-center justify-center p-4 text-center">
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h4>
                    <span className="text-white">{item.subtitle}</span>
                  </div>
                  <div className="absolute inset-0  bg-opacity-0 hover:bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-500">
                    <div className="text-center p-4">
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-white mb-4">{item.description}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDiscoverClick(item.title)}
                        className="px-6 py-2 bg-white text-gray-800 font-semibold rounded-full transition duration-300 text-sm"
                      >
                        Discover More
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};