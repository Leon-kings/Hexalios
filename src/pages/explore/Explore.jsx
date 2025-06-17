/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
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
  StarBorder,
  Store,
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Payment as PaymentIcon,
  LocalShipping,
  CheckCircle,
  Add,
  Remove,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { shops } from "../../assets/data/data";

export const ExploreSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("products"); // 'products' or 'shops'
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "credit-card",
    products: [],
    totalPrice: 0,
    commodityPrice: 0,
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist =
      typeof window !== "undefined" ? localStorage.getItem("wishlist") : null;
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const handleDiscoverClick = () => {
    setIsModalOpen(true);
  };

  // Update wishlist in localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Toggle wishlist item
  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    setWishlist(newWishlist);

    toast.success(
      wishlist.includes(productId)
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  // Cart functionality
  const addToCart = (product, size = null) => {
    const selectedSizeToUse = size || product.sizes?.[0] || "One Size";

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === product.id && item.selectedSize === selectedSizeToUse
    );

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
        selectedSize: selectedSizeToUse,
        quantity: 1,
      };
      updatedCart = [...cart, cartItem];
    }

    setCart(updatedCart);
    toast.success(
      `${product.name} (Size: ${selectedSizeToUse}) added to cart!`
    );
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

  const updateSize = (index, newSize) => {
    const newCart = [...cart];
    newCart[index] = {
      ...newCart[index],
      selectedSize: newSize,
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

  // Prepare checkout data before showing payment modal
  const prepareCheckout = () => {
    const products = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      size: item.selectedSize,
      quantity: item.quantity,
      image: item.image,
    }));

    const totalPrice = calculateTotal();
    const commodityPrice = calculateCommodityPrice();

    setCheckoutForm((prev) => ({
      ...prev,
      products,
      totalPrice,
      commodityPrice,
    }));

    setShowCart(false);
    setShowPayment(true);
  };

  // Checkout functionality
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
        products: [],
        totalPrice: 0,
        commodityPrice: 0,
      });
    } catch (error) {
      toast.error(error.message || "Checkout failed. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate cart total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate commodity price (80% of total price)
  const calculateCommodityPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * 0.8 * item.quantity,
      0
    );
  };

  // Calculate estimated delivery date (3-5 business days from now)
  const calculateDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3 + Math.floor(Math.random() * 3));
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Render star ratings
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
                            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
                            whileHover={{ y: -5 }}
                          >
                            {/* Wishlist button */}
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

                            <img
                              src={product.image}
                              alt=""
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-500 text-lg mb-2">
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
                              <button
                                className="mt-2 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                onClick={() => addToCart(product)}
                              >
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
                            alt=""
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-600 text-lg mb-2">
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
                    <h4 className="font-bold text-blue-400 text-lg mb-3">
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
                            className="flex border-b text-black pb-4"
                          >
                            <img
                              src={item.image}
                              alt=""
                              className="w-20 h-20 object-contain bg-gray-100 rounded-md"
                            />
                            <div className="ml-4 flex-1">
                              <h4 className="font-medium text-gray-500">
                                {item.name}
                              </h4>
                              <span className="text-gray-500">
                                ${item.price}
                              </span>

                              {/* Size selector */}
                              {item.sizes && item.sizes.length > 1 && (
                                <div className="mt-1">
                                  <label className="text-xs text-gray-500">
                                    Size:
                                  </label>
                                  <select
                                    value={item.selectedSize}
                                    onChange={(e) =>
                                      updateSize(index, e.target.value)
                                    }
                                    className="ml-2 text-gray-500 text-sm border rounded p-1"
                                  >
                                    {item.sizes.map((size) => (
                                      <option key={size} value={size}>
                                        {size}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}

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
                          // onClick={prepareCheckout}
                          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <PaymentIcon />
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
                    <h3 className="text-2xl font-bold text-gray-900">Checkout</h3>
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
                    {/* Order Summary */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Order Summary
                      </h4>
                      <div className="divide-y divide-gray-200">
                        {cart.map((item) => (
                          <div key={item.id} className="p-4 flex items-center">
                            <img
                              src={item.image}
                              alt=''
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
                          className="w-full px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={checkoutForm.address}
                          onChange={handleFormChange}
                          required
                          rows={3}
                        />
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
                            checked={checkoutForm.paymentMethod === "credit-card"}
                            onChange={handleFormChange}
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="text-black">Credit Card</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={checkoutForm.paymentMethod === "paypal"}
                            onChange={handleFormChange}
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="text-black">PayPal</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank-transfer"
                            checked={checkoutForm.paymentMethod === "bank-transfer"}
                            onChange={handleFormChange}
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="text-black">Bank Transfer</span>
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
                              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">CVV</label>
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
                            className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-4 mb-6">
                      <div className="flex text-black justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-blue-400">
                          ${(calculateTotal() * 1.1).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 ${
                        isProcessing ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : (
                        <>
                          <PaymentIcon />
                          Complete Payment
                        </>
                      )}
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
                    <h4 className="text-lg font-semibold">Delivery Estimate</h4>
                  </div>
                  <p className="text-gray-700">
                    Your order will arrive by{" "}
                    <span className="font-bold">{calculateDeliveryDate()}</span>
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
      </section>
    </>
  );
};