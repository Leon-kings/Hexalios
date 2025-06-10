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
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { sampleProducts } from "../../assets/data/data";

export const ProductsPage = () => {
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

  // API endpoints
  const CART_API = "https://jsonplaceholder.typicode.com/posts"; // Mock API for cart
  const PAYMENT_API = "https://jsonplaceholder.typicode.com/posts"; // Mock API for payment

  // Fetch products from multiple APIs to get variety
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch men's and women's clothing from FakeStoreAPI
        const menResponse = await axios.get(
          "https://fakestoreapi.com/products/category/men's%20clothing"
        );
        const womenResponse = await axios.get(
          "https://fakestoreapi.com/products/category/women's%20clothing"
        );

        // Process men's products
        const menProducts = menResponse.data.map((product) => ({
          id: product.id,
          name: product.title,
          category: "men",
          price: product.price,
          rating: Math.round(product.rating.rate),
          description: product.description,
          image: product.image,
          sizes: ["S", "M", "L", "XL"],
          colors: ["Black", "Blue", "White", "Gray"],
        }));

        // Process women's products
        const womenProducts = womenResponse.data.map((product) => ({
          id: product.id + 1000, // Add offset to avoid ID conflicts
          name: product.title,
          category: "women",
          price: product.price,
          rating: Math.round(product.rating.rate),
          description: product.description,
          image: product.image,
          sizes: ["XS", "S", "M", "L", "XL"],
          colors: ["Pink", "Purple", "White", "Black"],
        }));

        // Process kids products (using mock data)
        const kidsProducts = [
          {
            id: 3001,
            name: "Kids' Colorful T-Shirt",
            category: "kids",
            price: 14.99,
            rating: 4,
            description: "Comfortable cotton t-shirt for kids with fun designs",
            image:
              "https://m.media-amazon.com/images/I/61-jBuhtgZL._AC_UX679_.jpg",
            sizes: ["4", "6", "8", "10", "12"],
            colors: ["Blue", "Red", "Yellow"],
          },
          {
            id: 3002,
            name: "Kids' Jeans",
            category: "kids",
            price: 24.99,
            rating: 5,
            description: "Durable jeans for active kids",
            image:
              "https://m.media-amazon.com/images/I/71WS5e+5QIL._AC_UX679_.jpg",
            sizes: ["4", "6", "8", "10", "12"],
            colors: ["Blue", "Black"],
          },
          {
            id: 3003,
            name: "Kids' Hoodie",
            category: "kids",
            price: 29.99,
            rating: 5,
            description: "Warm and cozy hoodie for children",
            image:
              "https://m.media-amazon.com/images/I/71qod+JQ2VL._AC_UX679_.jpg",
            sizes: ["4", "6", "8", "10", "12"],
            colors: ["Pink", "Blue", "Gray"],
          },
        ];

        // Combine all products
        const allProducts = [...menProducts, ...womenProducts, ...kidsProducts];

        // Paginate products
        const startIdx = (currentPage - 1) * 10;
        const endIdx = startIdx + 10;
        setProducts(allProducts.slice(startIdx, endIdx));
        setTotalPages(Math.ceil(allProducts.length / 10));
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products. Using sample data instead.");
        // Fallback to sample data if API fails

        setProducts(sampleProducts);
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
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);

    try {
      // Send cart data to API
      const response = await axios.post(CART_API, {
        userId: 1, // In a real app, this would be the logged-in user's ID
        date: new Date().toISOString(),
        products: updatedCart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart on server");
    }

    setShowCart(true);
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

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      // Process payment through API
      const paymentResponse = await axios.post(PAYMENT_API, {
        cardNumber: paymentInfo.cardNumber,
        expiry: paymentInfo.expiry,
        cvv: paymentInfo.cvv,
        name: paymentInfo.name,
        amount: calculateTotal(),
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      if (paymentResponse.status === 201) {
        setShowPayment(false);
        setShowDelivery(true);
        // Clear cart after successful payment
        setCart([]);
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const renderStars = (rating) => {
    return Array(rating)
      .fill()
      .map((_, i) => <Star key={i} className="text-yellow-500 text-sm" />);
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
      <div className="bg-white w-full mt-4 rounded-2xl min-h-screen">
        <ToastContainer />

        {/* Product Sections */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
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
                Men's Clothing
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "women"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("women")}
              >
                Women's Clothing
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === "kids"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("kids")}
              >
                Kids' Clothing
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-contain bg-gray-100 p-4"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/300x300?text=Product+Image";
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
                        <h3 className="font-semibold text-lg mb-1">
                          {product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                          <div className="flex">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {product.description}
                        </p>
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
                              alt={item.name}
                              className="w-20 h-20 object-contain bg-gray-100 rounded-md"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://via.placeholder.com/100x100?text=Product";
                              }}
                            />
                            <div className="ml-4 flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-blue-600">
                                ${item.price.toFixed(2)}
                              </p>
                              <div className="flex items-center mt-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Remove fontSize="small" />
                                </button>
                                <span className="mx-2">{item.quantity}</span>
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
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </>
  );
};
