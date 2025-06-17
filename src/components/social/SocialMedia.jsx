/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
  Add,
  Remove,
  Payment,
  LocalShipping,
  CheckCircle,
  Favorite,
  FavoriteBorder,
  Share,
  StarBorder,
} from "@mui/icons-material";
import { products } from "../../assets/data/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SocialMediaSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist =
      typeof window !== "undefined" ? localStorage.getItem("wishlist") : null;
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
  });

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

  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    }
  };

  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    updateWishlist(newWishlist);

    toast.success(
      wishlist.includes(productId)
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  const handleImageClick = (category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const addToCart = (product) => {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    let updatedCart;
    if (existingItemIndex >= 0) {
      // Increment quantity if item exists
      updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };
    } else {
      // Add new item to cart
      const cartItem = {
        ...product,
        quantity: 1,
      };
      updatedCart = [...cart, cartItem];
    }

    setCart(updatedCart);
    toast.success(`${product.name} added to cart!`);
    setShowCart(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    toast.info("Item removed from cart");
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const newCart = [...cart];
    newCart[index] = {
      ...newCart[index],
      quantity: newQuantity,
    };
    setCart(newCart);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Calculate commodity price (80% of total price)
  const calculateCommodityPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * 0.8 * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3 + Math.floor(Math.random() * 3));
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const processCheckout = async () => {
    setIsProcessing(true);
    try {
      // Validate form
      if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.address) {
        throw new Error("Please fill in all required fields");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Order placed successfully!");
      setCart([]);
      setShowPayment(false);
      setShowDelivery(true);
      setCheckoutForm({
        name: "",
        email: "",
        address: "",
        paymentMethod: "credit-card",
      });
    } catch (error) {
      toast.error(error.message || "Checkout failed. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rating ? (
            <Star key={star} className="text-yellow-500 text-sm" />
          ) : (
            <StarBorder key={star} className="text-yellow-500 text-sm" />
          )
        )}
      </div>
    );
  };

  return (
    <>
      <section className="w-full mt-4 rounded-2xl py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <ToastContainer />
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
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover"
                            />
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md"
                            >
                              {wishlist.includes(product.id) ? (
                                <Favorite className="text-red-500" />
                              ) : (
                                <FavoriteBorder className="text-gray-400" />
                              )}
                            </button>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-400 text-lg mb-2">
                              {product.name}
                            </h4>
                            <div className="flex items-center mb-2">
                              {renderStars(product.rating)}
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
                            <button
                              onClick={() => addToCart(product)}
                              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
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

          {/* Cart Modal */}
          <AnimatePresence>
            {showCart && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCart(false)}
              >
                <motion.div
                  className="bg-white rounded-t-xl w-full max-w-md"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Your Cart
                      </h3>
                      <button
                        onClick={() => setShowCart(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Close />
                      </button>
                    </div>

                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="mx-auto text-gray-400 text-4xl mb-4" />
                        <p className="text-gray-600">Your cart is empty</p>
                        <button
                          onClick={() => setShowCart(false)}
                          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 mb-6">
                          {cart.map((item, index) => (
                            <div
                              key={`${item.id}-${index}`}
                              className="flex border-b pb-4"
                            >
                              <img
                                src={item.image}
                                alt=""
                                className="w-20 h-20 object-contain bg-gray-100 rounded-md"
                              />
                              <div className="ml-4 flex-1 text-gray-600">
                                <h4 className="font-medium text-gray-500">
                                  {item.name}
                                </h4>
                                <p className="text-blue-600">${item.price}</p>

                                <div className="flex items-center mt-2">
                                  <button
                                    onClick={() =>
                                      updateQuantity(index, item.quantity - 1)
                                    }
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <Remove fontSize="small" />
                                  </button>
                                  <span className="mx-2 text-gray-500">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(index, item.quantity + 1)
                                    }
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <Add fontSize="small" />
                                  </button>
                                  <button
                                    onClick={() => removeFromCart(index)}
                                    className="ml-auto text-red-500 hover:text-red-700 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex text-black justify-between font-bold text-lg mb-6">
                            <span>Total:</span>
                            <span className="text-blue-400">
                              ${calculateTotal().toFixed(2)}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setShowCart(false);
                              setShowPayment(true);
                            }}
                            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <Payment />
                            Proceed to Payment
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Payment Modal */}
          <AnimatePresence>
            {showPayment && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPayment(false)}
              >
                <motion.div
                  className="bg-white rounded-t-xl w-full max-w-md"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Checkout
                      </h3>
                      <button
                        onClick={() => setShowPayment(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Close />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        processCheckout();
                      }}
                    >
                      {/* Customer Information */}
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={checkoutForm.name}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={checkoutForm.email}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">
                            Shipping Address
                          </label>
                          <textarea
                            name="address"
                            placeholder="123 Main St, City, Country"
                            className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={checkoutForm.address}
                            onChange={handleFormChange}
                            required
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Order Summary
                        </h4>
                        <div className="divide-y divide-gray-200">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="p-4 flex items-center"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-contain bg-gray-100 rounded-md mr-4"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://via.placeholder.com/100x100?text=Shoe";
                                }}
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">
                                  {item.name}
                                </h5>
                                <p className="text-sm text-gray-500">
                                  Size: {item.selectedSize} | Color:{" "}
                                  {item.selectedColor}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Method Selection */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Payment Method
                        </h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="credit-card"
                              checked={
                                checkoutForm.paymentMethod === "credit-card"
                              }
                              onChange={handleFormChange}
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="text-gray-500">Credit Card</span>
                          </label>
                        </div>
                      </div>

                      {/* Credit Card Fields (shown only when credit-card is selected) */}
                      {checkoutForm.paymentMethod === "credit-card" && (
                        <div className="space-y-4 mb-6">
                          <div>
                            <label className="block text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Price Summary */}
                      <div className="border-t pt-4 mb-6">
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-gray-900">
                              ${calculateTotal().toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Commodity Price:
                            </span>
                            <span className="text-gray-900">
                              ${calculateCommodityPrice().toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-blue-500">
                              ${calculateTotal().toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 ${
                          isProcessing ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isProcessing ? "Processing..." : <>Complete Payment</>}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delivery Estimate Modal */}
          <AnimatePresence>
            {showDelivery && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowDelivery(false)}
              >
                <motion.div
                  className="bg-white rounded-xl max-w-md w-full p-6 text-center"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="text-green-500 text-6xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Payment Successful!
                  </h3>

                  <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <LocalShipping className="text-blue-500 text-2xl" />
                      <h4 className="text-lg font-semibold">
                        Delivery Estimate
                      </h4>
                    </div>
                    <p className="text-gray-700">
                      Your order will arrive by{" "}
                      <span className="font-bold">
                        {calculateDeliveryDate()}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      We'll send you a confirmation email with tracking
                      information.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowDelivery(false)}
                    className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};
