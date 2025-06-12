/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  StarBorder,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ProductsPage } from "./Products";

export const ShoesProducts = () => {
  // State management
  const [activeTab, setActiveTab] = useState("men");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  // Mock shoe data
  const mockShoes = {
    men: [
      {
        id: 1,
        name: "Men's Running Shoes",
        category: "men",
        price: 89.99,
        rating: 5,
        description: "Lightweight running shoes with responsive cushioning",
        image:
          "https://m.media-amazon.com/images/I/71YHh8OBuJL._AC_UL1500_.jpg",
        sizes: [8, 9, 10, 11, 12],
        colors: ["Black", "Blue", "White"],
        brand: "Nike",
      },
      {
        id: 2,
        name: "Men's Basketball Shoes",
        category: "men",
        price: 119.99,
        rating: 4,
        description: "High-performance basketball shoes with ankle support",
        image:
          "https://m.media-amazon.com/images/I/61k3gS5ZuFL._AC_UL1500_.jpg",
        sizes: [8, 9, 10, 11, 12, 13],
        colors: ["Red", "Black", "White"],
        brand: "Adidas",
      },
      {
        id: 3,
        name: "Men's Casual Sneakers",
        category: "men",
        price: 59.99,
        rating: 4,
        description: "Comfortable everyday sneakers with classic design",
        image:
          "https://m.media-amazon.com/images/I/61g+McQpg7L._AC_UL1500_.jpg",
        sizes: [7, 8, 9, 10, 11],
        colors: ["White", "Gray", "Navy"],
        brand: "Puma",
      },
    ],
    women: [
      {
        id: 101,
        name: "Women's Running Shoes",
        category: "women",
        price: 79.99,
        rating: 5,
        description: "Breathable running shoes with arch support",
        image:
          "https://m.media-amazon.com/images/I/71Yqy6MJgVL._AC_UL1500_.jpg",
        sizes: [5, 6, 7, 8, 9],
        colors: ["Pink", "Purple", "Black"],
        brand: "New Balance",
      },
      {
        id: 102,
        name: "Women's Fashion Sneakers",
        category: "women",
        price: 65.99,
        rating: 4,
        description: "Stylish sneakers perfect for everyday wear",
        image:
          "https://m.media-amazon.com/images/I/71JSmBbLpNL._AC_UL1500_.jpg",
        sizes: [5, 6, 7, 8, 9, 10],
        colors: ["White", "Rose Gold", "Black"],
        brand: "Skechers",
      },
      {
        id: 103,
        name: "Women's Trail Running Shoes",
        category: "women",
        price: 95.99,
        rating: 5,
        description: "Durable trail runners with waterproof membrane",
        image:
          "https://m.media-amazon.com/images/I/71qGKLwZ3VL._AC_UL1500_.jpg",
        sizes: [6, 7, 8, 9],
        colors: ["Teal", "Black", "Gray"],
        brand: "Salomon",
      },
    ],
    kids: [
      {
        id: 201,
        name: "Kids' Light-Up Sneakers",
        category: "kids",
        price: 39.99,
        rating: 5,
        description: "Fun light-up shoes that kids love",
        image:
          "https://m.media-amazon.com/images/I/71y5Yk0tPEL._AC_UL1500_.jpg",
        sizes: [10, 11, 12, 13, 1, 2, 3],
        colors: ["Blue", "Pink", "Black"],
        brand: "Skechers",
      },
      {
        id: 202,
        name: "Kids' Soccer Cleats",
        category: "kids",
        price: 34.99,
        rating: 4,
        description: "Lightweight cleats for young athletes",
        image:
          "https://m.media-amazon.com/images/I/71XgN0mJq5L._AC_UL1500_.jpg",
        sizes: [10, 11, 12, 13, 1, 2, 3],
        colors: ["Black/White", "Blue/White", "Red/Black"],
        brand: "Adidas",
      },
      {
        id: 203,
        name: "Kids' Slip-On Shoes",
        category: "kids",
        price: 29.99,
        rating: 4,
        description: "Easy on/off shoes for busy parents",
        image:
          "https://m.media-amazon.com/images/I/61XZQXFQeVL._AC_UL1500_.jpg",
        sizes: [10, 11, 12, 13, 1, 2, 3],
        colors: ["Black", "Pink", "Blue"],
        brand: "Crocs",
      },
    ],
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from an API
        // For demo, we're using mock data with a delay to simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Combine all shoe products
        const allProducts = [
          ...mockShoes.men,
          ...mockShoes.women,
          ...mockShoes.kids,
        ];

        // Paginate products
        const startIdx = (currentPage - 1) * 9;
        const endIdx = startIdx + 9;
        setProducts(allProducts.slice(startIdx, endIdx));
        setTotalPages(Math.ceil(allProducts.length / 9));
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products. Using sample data instead.");
        setProducts([...mockShoes.men, ...mockShoes.women, ...mockShoes.kids]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category === activeTab
  );

  // Add to cart function that also opens the cart
  const addToCartAndOpen = async (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
          selectedSize: product.sizes[0],
          selectedColor: product.colors[0],
        },
      ];
    }

    setCart(updatedCart);
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
    setShowCart(true);
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateSize = (productId, newSize) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, selectedSize: newSize } : item
      )
    );
  };

  const updateColor = (productId, newColor) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, selectedColor: newColor } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setShowPayment(false);
    setShowDelivery(true);
    setCart([]);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className="w-full rounded-2xl bg-gray-200 text-black mt-4  min-h-screen">
        <ToastContainer />

        {/* Hero Section */}
        <div className="relative bg-indigo-700 rounded-2xl text-white">
          <div className="absolute bg-black inset-0 opacity-50"></div>
          <div className="relative max-w-7xl mx-auto py-10 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
            <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Step Into Style
            </h3>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Discover the perfect pair for every occasion in our premium shoe
              collection
            </p>
          </div>
        </div>

        {/* Product Sections */}
        <section className="py-12 px-4 rounded-2xl sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex border-b mb-8">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "men"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("men")}
              >
                Men's Shoes
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "women"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("women")}
              >
                Women's Shoes
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "kids"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("kids")}
              >
                Kids' Shoes
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
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

                      <div className="relative group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-contain bg-gray-100 p-4"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/300x300?text=Shoe+Image";
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => addToCartAndOpen(product)}
                            className="bg-white p-3 rounded-full hover:bg-gray-100 transition-colors flex items-center"
                          >
                            <ShoppingCart className="text-gray-800 mr-2" />
                            <span className="text-sm font-medium">
                              Add to Cart
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Share fontSize="small" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-blue-600 font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                          {renderStars(product.rating)}
                        </div>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {product.colors.slice(0, 3).map((color) => (
                            <span
                              key={color}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor:
                                  color.toLowerCase() === "white"
                                    ? "#fff"
                                    : color.toLowerCase(),
                              }}
                              title={color}
                            ></span>
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{product.colors.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${
                          currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronLeft />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => {
                              setCurrentPage(page);
                              window.scrollTo(0, 0);
                            }}
                            className={`w-10 h-10 rounded-md ${
                              currentPage === page
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md ${
                          currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Cart Modal */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            >
              <motion.div
                className="bg-white rounded-xl w-full max-w-md h-[90vh] overflow-y-auto"
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
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
                        {cart.map((item) => (
                          <div key={item.id} className="flex border-b pb-4">
                            <img
                              src={item.image}
                              alt=''
                              className="w-20 h-20 object-contain bg-gray-100 rounded-md"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/100x100?text=Shoe";
                              }}
                            />
                            <div className="ml-4 flex-1">
                              <h4 className="font-medium text-black">{item.name}</h4>
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
                                    updateSize(item.id, e.target.value)
                                  }
                                  className="ml-2 text-sm border rounded p-1"
                                >
                                  {item.sizes.map((size) => (
                                    <option key={size} value={size}>
                                      {size}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Color selector */}
                              <div className="mt-1">
                                <label className="text-xs text-gray-500">
                                  Color:
                                </label>
                                <select
                                  value={item.selectedColor}
                                  onChange={(e) =>
                                    updateColor(item.id, e.target.value)
                                  }
                                  className="ml-2 text-black text-sm border rounded p-1"
                                >
                                  {item.colors.map((color) => (
                                    <option key={color} value={color}>
                                      {color}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="flex items-center mt-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Remove fontSize="small" />
                                </button>
                                <span className="mx-2 text-black">{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Add fontSize="small" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
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
                          <span>Total:</span>
                          <span>${calculateTotal()}</span>
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPayment(false)}
            >
              <motion.div
                className="bg-white rounded-xl max-w-md w-full p-6"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Payment Information
                  </h3>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Close />
                  </button>
                </div>

                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: e.target.value,
                          })
                        }
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
                          value={paymentInfo.expiry}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              expiry: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: e.target.value,
                            })
                          }
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
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={paymentInfo.name}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Payment />
                    Pay ${calculateTotal()}
                  </button>
                </form>
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
                  onClick={() => {
                    setShowDelivery(false);
                    setCart([]);
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCart(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative"
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </motion.button>
        </div>
      </div>
      <ProductsPage />
    </>
  );
};
