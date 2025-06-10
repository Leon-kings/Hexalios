/* eslint-disable react-hooks/exhaustive-deps */
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
  Favorite,
  FavoriteBorder,
  Share
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { kidsProducts } from "../../../assets/data/data";

export const KidsLatest = () => {
  // State management
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit-card'
  });
  const [wishlist, setWishlist] = useState([]);

  // Refs
  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);
  const productsPerPage = useRef(4);

  // Responsive products per page
  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth >= 1024) {
        productsPerPage.current = 4;
      } else if (window.innerWidth >= 768) {
        productsPerPage.current = 3;
      } else if (window.innerWidth >= 640) {
        productsPerPage.current = 2;
      } else {
        productsPerPage.current = 1;
      }
    };

    updateProductsPerPage();
    window.addEventListener("resize", updateProductsPerPage);

    return () => window.removeEventListener("resize", updateProductsPerPage);
  }, []);

  // Auto slide effect
  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideInterval.current = setInterval(() => {
        setCurrentSlide(
          (prev) =>
            (prev + 1) % Math.ceil(kidsProducts.length / productsPerPage.current)
        );
      }, 3000);
    };

    startAutoSlide();

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [kidsProducts.length, productsPerPage.current]);

  // Pause/resume auto-slide
  const pauseAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  const resumeAutoSlide = () => {
    pauseAutoSlide();
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide(
        (prev) =>
          (prev + 1) % Math.ceil(kidsProducts.length / productsPerPage.current)
      );
    }, 3000);
  };

  // Product modal handlers
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setIsProductModalOpen(true);
    pauseAutoSlide();
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedSize(null);
    resumeAutoSlide();
  };

  // Cart functionality
  const addToCart = (product, size = null) => {
    const selectedSizeToUse =
      size || (selectedProduct && selectedSize) || product.sizes[0];

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.id === product.id && item.selectedSize === selectedSizeToUse
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

    if (isProductModalOpen) {
      closeProductModal();
    }
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
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Checkout functionality
  const processCheckout = async () => {
    setIsProcessing(true);
    try {
      // Validate form
      if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.address) {
        throw new Error('Please fill in all required fields');
      }

      // Replace with your actual API endpoint
      const response = await fetch('https://api.example.com/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          total: calculateTotal(),
          customer: checkoutForm,
          paymentMethod: checkoutForm.paymentMethod
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const data = await response.json();
      toast.success("Order placed successfully!");
      setCart([]);
      setShowPayment(false);
      setShowDelivery(true);
      setCheckoutForm({
        name: '',
        email: '',
        address: '',
        paymentMethod: 'credit-card'
      });
    } catch (error) {
      toast.error(error.message || "Checkout failed. Please try again.");
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate cart total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Navigation controls
  const goToPrevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(kidsProducts.length / productsPerPage.current)) %
        Math.ceil(kidsProducts.length / productsPerPage.current)
    );
    pauseAutoSlide();
    resumeAutoSlide();
  };

  const goToNextSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev + 1) % Math.ceil(kidsProducts.length / productsPerPage.current)
    );
    pauseAutoSlide();
    resumeAutoSlide();
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
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
          {/* Section Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Kid's Latest
              </h2>
              <p className="text-lg text-gray-600">
                Details to details is what makes Hexashop different.
              </p>
            </motion.div>
          </div>

          {/* Product Carousel */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={pauseAutoSlide}
            onMouseLeave={resumeAutoSlide}
          >
            <div className="relative h-[500px] sm:h-[450px] md:h-[400px]">
              <div
                ref={sliderRef}
                className="flex absolute top-0 left-0 transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {kidsProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
                  >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col relative">
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

                      {/* Product Image */}
                      <div className="relative h-64 flex-grow">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => openProductModal(product)}
                              className="p-3 text-white rounded-full transition duration-300 shadow-md"
                              aria-label="View details"
                            >
                              <EyeIcon className="text-white" />
                            </button>
                            <button
                              onClick={() => addToCart(product)}
                              className="p-3 text-white rounded-full transition duration-300 shadow-md"
                              aria-label="Add to cart"
                            >
                              <CartIcon className="text-white" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Share fontSize="small" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-indigo-600">
                            ${product.price.toFixed(2)}
                          </span>
                          {renderStars(product.rating)}
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <StockStatus stock={product.stock} />
                          <AddToCartButton
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            stock={product.stock}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Detail Modal */}
          {isProductModalOpen && selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={closeProductModal}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              onAddToCart={() => addToCart(selectedProduct, selectedSize)}
            />
          )}

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
                          {cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex border-b pb-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-contain bg-gray-100 rounded-md"
                              />
                              <div className="ml-4 flex-1">
                                <h4 className="font-medium">{item.name}</h4>
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
                                    className="ml-2 text-sm border rounded p-1"
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
                                  <span className="mx-2">{item.quantity}</span>
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
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
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
        </div>
      </section>
    </>
  );
};

// Reusable Components
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const StockStatus = ({ stock }) => (
  <span
    className={`text-sm font-bold ${
      stock > 10
        ? "text-green-600"
        : stock > 0
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    {stock > 10
      ? "In Stock"
      : stock > 0
      ? `Only ${stock} left`
      : "Out of Stock"}
  </span>
);

const AddToCartButton = ({ onClick, disabled, stock }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1 text-sm rounded-lg ${
      disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 text-white"
    }`}
  >
    {stock === 0 ? "Sold Out" : "Add to Cart"}
  </button>
);

const ProductModal = ({
  product,
  onClose,
  selectedSize,
  onSizeSelect,
  onAddToCart,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Close />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <div className="flex items-center mb-4">
              <div className="flex mr-4">
                {[...Array(5)].map((_, i) =>
                  i < product.rating ? (
                    <Star key={i} className="text-yellow-500" />
                  ) : (
                    <StarBorder key={i} className="text-yellow-500" />
                  )
                )}
              </div>
              <StockStatus stock={product.stock} />
            </div>

            <p className="text-2xl font-bold text-indigo-600 mb-4">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Colors</h4>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Size</h4>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => onSizeSelect(size)}
                    className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      selectedSize === size
                        ? "border-indigo-500 bg-indigo-100 text-indigo-700"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <AddToCartButton
              onClick={onAddToCart}
              disabled={product.stock === 0}
              stock={product.stock}
            />
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Payment Modal with slide-up animation
const PaymentModal = ({
  showPayment,
  setShowPayment,
  checkoutForm,
  handleFormChange,
  calculateTotal,
  isProcessing,
  processCheckout
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

              <form onSubmit={(e) => {
                e.preventDefault();
                processCheckout();
              }}>
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
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={checkoutForm.address}
                      onChange={handleFormChange}
                      required
                      rows={3}
                    />
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={checkoutForm.paymentMethod === 'credit-card'}
                        onChange={handleFormChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span>Credit Card</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={checkoutForm.paymentMethod === 'paypal'}
                        onChange={handleFormChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span>PayPal</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={checkoutForm.paymentMethod === 'bank-transfer'}
                        onChange={handleFormChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>

                {/* Credit Card Fields (shown only when credit-card is selected) */}
                {checkoutForm.paymentMethod === 'credit-card' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2 ${
                    isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    'Processing...'
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