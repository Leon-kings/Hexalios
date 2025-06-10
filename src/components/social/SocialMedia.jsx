/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Pinterest,
  LinkedIn,
  YouTube,
  Close,
  ShoppingBag,
  Star,
  LocalOffer,
} from "@mui/icons-material";
import { products } from "../../assets/data/data";

export const SocialMediaSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const socialItems = [
    {
      id: 1,
      title: "Fashion",
      category: "fashion",
      icon: <Instagram className="text-white text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      link: "https://instagram.com",
    },
    {
      id: 2,
      title: "New",
      category: "new",
      icon: <Instagram className="text-white text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      link: "https://instagram.com",
    },
    {
      id: 3,
      title: "Brand",
      category: "brand",
      icon: <Instagram className="text-white text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1542295669297-4d352b042bca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      link: "https://instagram.com",
    },
    {
      id: 4,
      title: "Makeup",
      category: "makeup",
      icon: <Instagram className="text-white text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      link: "https://instagram.com",
    },
    {
      id: 5,
      title: "Leather",
      category: "leather",
      icon: <Instagram className="text-white text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      link: "https://instagram.com",
    },
    {
      id: 6,
      title: "Bag",
      category: "bag",
      icon: <Instagram className="text-white text-2xl" />,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      link: "https://instagram.com",
    },
  ];

  const handleImageClick = (category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="w-full mt-4 rounded-2xl py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Social Media
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Details to details is what makes Hexashop different from the other
              themes.
            </motion.p>
          </div>

          {/* Social Media Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {socialItems.map((item) => (
              <motion.div
                key={item.id}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleImageClick(item.category)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white p-4">
                    <div className="bg-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      {item.icon}
                    </div>
                    <h6 className="font-semibold">{item.title}</h6>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            className="flex justify-center space-x-6 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600"
            >
              <Facebook className="text-3xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-400"
            >
              <Twitter className="text-3xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-600"
            >
              <Instagram className="text-3xl" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-red-600"
            >
              <Pinterest className="text-3xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-700"
            >
              <LinkedIn className="text-3xl" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-red-600"
            >
              <YouTube className="text-3xl" />
            </a>
          </motion.div>

          {/* Product Modal */}
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
                  className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 capitalize">
                        {currentCategory} Products
                      </h3>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Close />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {products[currentCategory]?.map((product) => (
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
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                              <LocalOffer className="mr-1 text-gray-400" />
                              <span className="font-medium text-blue-600">
                                {product.price}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                              {product.description}
                            </p>
                            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                              <ShoppingBag className="mr-2" />
                              Add to Cart
                            </button>
                          </div>
                        </motion.div>
                      ))}
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
        </div>
      </section>
    </>
  );
};
