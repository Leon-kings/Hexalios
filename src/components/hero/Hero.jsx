/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Close,
  Add,
  Remove,
  Payment,
  LocalShipping,
  CheckCircle,
  Star,
  StarBorder,
  Info,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bannerItems, categories } from "../../assets/data/data";
import side from "../../assets/images/left-banner-image.jpg";
import axios from "axios";

// Mock API data for category items
const categoryItems = {
  women: [
    {
      id: 1,
      name: "Summer Dress",
      type: "Dress",
      price: 49.99,
      sizes: ["S", "M", "L", "XL"],
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Lightweight summer dress with floral pattern",
      rating: 4,
      colors: ["Blue", "White", "Pink"],
    },
    {
      id: 2,
      name: "Denim Jacket",
      type: "Jacket",
      price: 79.99,
      sizes: ["S", "M", "L"],
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Classic blue denim jacket with front pockets",
      rating: 5,
      colors: ["Blue", "Black"],
    },
    {
      id: 3,
      name: "High Waist Jeans",
      type: "Pants",
      price: 59.99,
      sizes: ["28", "30", "32", "34"],
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Comfortable high waist jeans with stretch fabric",
      rating: 4,
      colors: ["Blue", "Black", "Gray"],
    },
    {
      id: 4,
      name: "Silk Blouse",
      type: "Top",
      price: 65.0,
      sizes: ["XS", "S", "M"],
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Elegant silk blouse with button front",
      rating: 3,
      colors: ["White", "Pink"],
    },
  ],
  men: [
    {
      id: 1,
      name: "Classic Suit",
      type: "Suit",
      price: 199.99,
      sizes: ["38", "40", "42", "44"],
      stock: 7,
      image:
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Premium wool suit with two-button jacket",
      rating: 5,
      colors: ["Black", "Navy", "Gray"],
    },
    {
      id: 2,
      name: "Casual T-Shirt",
      type: "Top",
      price: 24.99,
      sizes: ["S", "M", "L", "XL"],
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "100% cotton crew neck t-shirt",
      rating: 4,
      colors: ["White", "Black", "Gray", "Blue"],
    },
    {
      id: 3,
      name: "Chino Pants",
      type: "Pants",
      price: 45.0,
      sizes: ["30", "32", "34", "36"],
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Classic fit chino pants in multiple colors",
      rating: 4,
      colors: ["Khaki", "Navy", "Gray"],
    },
    {
      id: 4,
      name: "Leather Jacket",
      type: "Jacket",
      price: 249.99,
      sizes: ["M", "L", "XL"],
      stock: 3,
      image:
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Genuine leather motorcycle jacket",
      rating: 5,
      colors: ["Black", "Brown"],
    },
  ],
  kids: [
    {
      id: 1,
      name: "Cartoon T-Shirt",
      type: "Top",
      price: 19.99,
      sizes: ["4", "6", "8", "10"],
      stock: 25,
      image:
        "https://images.unsplash.com/photo-1583744946564-b52d01e2da64?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Fun cartoon print t-shirt for kids",
      rating: 4,
      colors: ["Blue", "Red", "Green"],
    },
    {
      id: 2,
      name: "Denim Overalls",
      type: "Overalls",
      price: 34.99,
      sizes: ["2T", "3T", "4T"],
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1601512444020-94430c291557?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Adorable denim overalls with adjustable straps",
      rating: 5,
      colors: ["Blue", "Light Blue"],
    },
    {
      id: 3,
      name: "Sneakers",
      type: "Shoes",
      price: 39.99,
      sizes: ["10", "11", "12", "13"],
      stock: 18,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Comfortable sneakers with velcro straps",
      rating: 4,
      colors: ["Black", "White", "Red"],
    },
    {
      id: 4,
      name: "Winter Coat",
      type: "Jacket",
      price: 59.99,
      sizes: ["5", "6", "7", "8"],
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      description: "Warm winter coat with hood",
      rating: 4,
      colors: ["Red", "Blue", "Pink"],
    },
  ],
};

export const Hero = () => {
  const [showShopModal, setShowShopModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(null);
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
  });

  const handlePurchaseClick = () => {
    setShowShopModal(true);
  };

  const handleDiscoverClick = (category) => {
    setShowCategoryModal(category.toLowerCase());
    setSelectedSize(null);
  };

  const closeModal = () => {
    setShowShopModal(false);
    setShowCategoryModal(null);
    setSelectedSize(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const addToCart = (product, size = null) => {
    const selectedSizeToUse = size || selectedSize || product.sizes[0];

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

  const processCheckout = async () => {
    setIsProcessing(true);
    try {
      // Validate form
      if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.address) {
        throw new Error("Please fill in all required fields");
      }

      // Prepare order data
      const orderData = {
        customer: {
          name: checkoutForm.name,
          email: checkoutForm.email,
          address: checkoutForm.address,
        },
        paymentMethod: checkoutForm.paymentMethod,
        products: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          size: item.selectedSize,
          quantity: item.quantity,
        })),
        totalPrice: calculateTotal(),
        commodityPrice: calculateCommodityPrice(),
      };

      // Send order to API
      const response = await axios.post(
        "https://api.example.com/orders",
        orderData
      );

      if (response.data.success) {
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
      } else {
        throw new Error(
          response.data.message || "Checkout failed. Please try again."
        );
      }
    } catch (error) {
      toast.error(error.message || "Checkout failed. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateCommodityPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * 0.8 * item.quantity,
      0
    );
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

  const shopInfo = {
    name: "HEXASHOP",
    address: "123 Fashion Street, Style City",
    phone: "+250 (78) 794-4577",
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
                    <Info className="text-black font-bold" /> ABOUT{" "}
                    {shopInfo.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gray-700"
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

                  <div className="mt-4"></div>
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
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-2/3">
                          <h4 className="font-semibold text-black text-lg">
                            {item.name}
                          </h4>
                          <p className="text-gray-500 text-sm mb-2">
                            {item.type}
                          </p>
                          <p className="text-gray-600 text-sm mb-3">
                            {item.description}
                          </p>

                          <div className="flex items-center mb-2">
                            <div className="flex mr-2 font-bold">
                              {renderStars(item.rating)}
                            </div>
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

                          <p className="text-gray-700 font-medium mb-3">
                            ${item.price.toFixed(2)}
                          </p>

                          <div className="mb-3">
                            <h4 className="font-medium text-gray-900 text-sm mb-1">
                              Colors
                            </h4>
                            <div className="flex space-x-1">
                              {item.colors.map((color) => (
                                <button
                                  key={color}
                                  className="w-6 h-6 rounded-full border border-gray-200 focus:outline-none"
                                  style={{
                                    backgroundColor:
                                      color.toLowerCase() === "white"
                                        ? "#fff"
                                        : color.toLowerCase() === "black"
                                        ? "#000"
                                        : color.toLowerCase() === "navy"
                                        ? "#001f3f"
                                        : color.toLowerCase() === "gray"
                                        ? "#808080"
                                        : color.toLowerCase() === "red"
                                        ? "#ff0000"
                                        : color.toLowerCase() === "blue"
                                        ? "#0000ff"
                                        : color.toLowerCase() === "green"
                                        ? "#008000"
                                        : color.toLowerCase() === "pink"
                                        ? "#ffc0cb"
                                        : color.toLowerCase() === "light blue"
                                        ? "#add8e6"
                                        : "#fff",
                                  }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 text-sm mb-1">
                              Size
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {item.sizes.map((size) => (
                                <div
                                  key={size}
                                  onClick={() => handleSizeSelect(size)}
                                  className={`px-2 py-1 text-xs text-black border rounded-md focus:outline-none ${
                                    selectedSize === size
                                      ? "border-indigo-500 bg-indigo-100 text-indigo-700"
                                      : "border-gray-200 hover:border-indigo-300"
                                  }`}
                                >
                                  {size}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => addToCart(item)}
                              className={`text-sm py-1 px-3 rounded transition duration-300 ${
                                item.stock > 0
                                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
                              }`}
                              disabled={item.stock === 0}
                            >
                              {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

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
                className="bg-white rounded-t-xl w-full max-w-md h-[80vh] overflow-y-auto"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
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
                      <ShoppingCart className="mx-auto text-gray-400 text-4xl mb-4" />
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
                            <div className="ml-4 flex-1">
                              <h4 className="font-medium text-gray-600">
                                {item.name}
                              </h4>
                              <p className="text-blue-600">
                                ${item.price.toFixed(2)}
                              </p>

                              {/* Size selector */}
                              <div className="mt-1">
                                <label className="text-xs text-gray-500">
                                  Size:
                                </label>
                                <select
                                  value={item.selectedSize}
                                  onChange={(e) =>
                                    updateSize(index, e.target.value)
                                  }
                                  className="ml-2 text-gray-600 text-sm border rounded p-1"
                                >
                                  {item.sizes.map((size) => (
                                    <option key={size} value={size}>
                                      {size}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="flex items-center mt-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(index, item.quantity - 1)
                                  }
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Remove fontSize="small" />
                                </button>
                                <span className="mx-2 text-gray-600">
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
                        <div className="flex justify-between font-bold text-lg mb-6">
                          <span className="text-gray-600">Total:</span>
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
        <PaymentModal
          showPayment={showPayment}
          setShowPayment={setShowPayment}
          checkoutForm={checkoutForm}
          handleFormChange={handleFormChange}
          calculateTotal={calculateTotal}
          calculateCommodityPrice={calculateCommodityPrice}
          cart={cart}
          isProcessing={isProcessing}
          processCheckout={processCheckout}
        />

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

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Banner */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-xl overflow-hidden shadow-xl h-96 lg:h-auto"
            >
              <img src={side} alt="" className="w-full h-full object-cover" />
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
                    className="px-8 py-3 bg-white text-white font-semibold rounded-full hover:bg-gray-200 transition duration-300"
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
                        className="px-6 py-2 bg-white text-white font-semibold rounded-full transition duration-300 text-sm"
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

// Payment Modal Component
const PaymentModal = ({
  showPayment,
  setShowPayment,
  checkoutForm,
  handleFormChange,
  calculateTotal,
  calculateCommodityPrice,
  cart,
  isProcessing,
  processCheckout,
}) => {
  return (
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
                      className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={checkoutForm.address}
                      onChange={handleFormChange}
                      required
                      rows={3}
                    />
                  </div>
                </div>

                {/* Products Information */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Order Summary
                  </h4>
                  <div className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <div key={item.id} className="p-4 flex items-center">
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
                        checked={checkoutForm.paymentMethod === "credit-card"}
                        onChange={handleFormChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span>Credit Card</span>
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
                      <span className="text-gray-600">Commodity Price:</span>
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
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <Payment />
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
  );
};
