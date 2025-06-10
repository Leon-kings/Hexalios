/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormatQuote,
  Close,
  ShoppingBag,
  Category,
  LocalOffer,
  Star,
  Store,
  LocationOn,
  Phone,
  Email,
  AccessTime,
} from "@mui/icons-material";
import { shops } from "../../assets/data/data";

export const ExploreSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("products"); // 'products' or 'shops'

  const handleDiscoverClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="w-full rounded-2xl mt-4 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Explore Our Products & Shops
                </h2>
                <p className="text-gray-600">
                  Discover a world of quality products from our curated
                  selection of shops. Whether you're looking for fashion,
                  electronics, or home goods, we've got you covered.
                </p>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start">
                    <FormatQuote className="text-blue-500 mr-2 mt-1" />
                    <p className="text-gray-700 italic">
                      "Our shops are carefully selected to ensure the highest
                      quality products and customer service."
                    </p>
                  </div>
                </div>

                <p className="text-gray-600">
                  We partner with the best local and international shops to
                  bring you a diverse range of products. Each shop is vetted for
                  quality and customer satisfaction.
                </p>

                <p className="text-gray-600">
                  Enjoy seamless shopping experience with our platform. If you
                  have any questions, please{" "}
                  <a
                    href="mailto:support@example.com"
                    className="text-blue-600 hover:underline"
                  >
                    contact our support team
                  </a>
                  .
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDiscoverClick}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Discover More
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Fashion Shop Card */}
                <motion.div
                  className="bg-gray-100 p-6 rounded-lg flex flex-col justify-center h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-2">
                    <Store className="text-gray-700 mr-2" />
                    <h4 className="text-xl font-semibold text-gray-900">
                      Fashion Shops
                    </h4>
                  </div>
                  <span className="text-gray-500">Trendy Collections</span>
                </motion.div>

                {/* First Image */}
                <motion.div
                  className="overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                    alt="Fashion store"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Second Image */}
                <motion.div
                  className="overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                    alt="Tech store"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Tech Shop Card */}
                <motion.div
                  className="bg-gray-100 p-6 rounded-lg flex flex-col justify-center h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-2">
                    <Store className="text-gray-700 mr-2" />
                    <h4 className="text-xl font-semibold text-gray-900">
                      Tech Shops
                    </h4>
                  </div>
                  <span className="text-gray-500">Latest Gadgets</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Explore Our Collection
                    </h3>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Close />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b mb-6">
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeTab === "products"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("products")}
                    >
                      Products
                    </button>
                    <button
                      className={`px-4 py-2 font-medium ${
                        activeTab === "shops"
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("shops")}
                    >
                      Shops
                    </button>
                  </div>

                  {activeTab === "products" ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {shops.flatMap((shop) =>
                        shop.products.map((product) => (
                          <motion.div
                            key={product.id}
                            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            whileHover={{ y: -5 }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h4 className="font-semibold text-lg mb-2">
                                {product.name}
                              </h4>
                              <div className="flex items-center mb-2">
                                <Star className="text-yellow-500 mr-1" />
                                <span className="text-gray-700">
                                  {product.rating}
                                </span>
                                <span className="text-gray-400 mx-2">|</span>
                                <span className="text-gray-500 text-sm">
                                  {shop.name}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mb-3">
                                <LocalOffer className="mr-1 text-gray-400" />
                                <span className="font-medium text-blue-600">
                                  {product.price}
                                </span>
                              </div>
                              <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                <ShoppingBag className="mr-2" />
                                Add to Cart
                              </button>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {shops.map((shop) => (
                        <motion.div
                          key={shop.id}
                          className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                          whileHover={{ y: -5 }}
                        >
                          <img
                            src={shop.image}
                            alt={shop.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-semibold text-lg mb-2">
                              {shop.name}
                            </h4>
                            <div className="flex items-center mb-2">
                              <Star className="text-yellow-500 mr-1" />
                              <span className="text-gray-700">
                                {shop.rating}
                              </span>
                              <span className="text-gray-400 mx-2">|</span>
                              <Category className="text-gray-400 mr-1" />
                              <span className="text-gray-500 text-sm">
                                {shop.category}
                              </span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                              <div className="flex items-start">
                                <LocationOn className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{shop.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="text-gray-400 mr-2" />
                                <span>{shop.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <Email className="text-gray-400 mr-2" />
                                <span>{shop.email}</span>
                              </div>
                              <div className="flex items-start">
                                <AccessTime className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{shop.hours}</span>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4">
                              {shop.description}
                            </p>

                            <button
                              className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
                              onClick={() => setActiveTab("products")}
                            >
                              View Products
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3">
                      Why Shop With Us?
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Curated selection of high-quality products</li>
                      <li>Verified shops with excellent customer service</li>
                      <li>Secure payment options</li>
                      <li>Fast and reliable delivery</li>
                      <li>Easy returns and exchanges</li>
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};
