/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AccountCircle,
  Login,
  Logout,
  PersonAdd,
  Home,
  Dashboard,
  Settings,
  Close,
  Menu,
  ShoppingCart,
  Security,
  Info,
  ContactEmergency,
  ContactPage,
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  ElectricalServices,
  People,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setOpenAuthModal(true);
  const closeModal = () => setOpenAuthModal(false);

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    login: {
      email: "",
      password: "",
    },
    register: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Close modal when clicking outside content
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home className="size-6 text-white" />,
      requiresAuth: false,
    },
    {
      label: "Servises",
      path: "/78318",
      icon: <ElectricalServices className="size-6 text-white" />,
    },
    {
      label: "About",
      path: "/68329",
      icon: <Info className="size-6 text-white" />,
    },
    {
      label: "Shops",
      path: "/89309",
      icon: <ShoppingCart className="size-6 text-white" />,
      requiresAuth: false,
    },
    {
      label: "Contacts",
      path: "/63819",
      icon: <ContactPage className="size-6 text-white" />,
      requiresAuth: false,
    },
    {
      path: "/92023",
      icon: <Settings className="w-5 h-5" />,
      requiresAuth: true,
    },
  ];

  // Check for existing session on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      verifyToken(token, email);
    }
  }, []);

  const API_URL = "https://hexaliosnode.onrender.com/auth";

  const verifyToken = async (token, email) => {
    try {
      const response = await axios.get(`${API_URL}/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLoggedIn(true);
      setUser({ ...response.data.user, email });
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
  };

  const validateForm = (mode) => {
    let valid = true;
    const newErrors = {
      login: { email: "", password: "" },
      register: { name: "", email: "", password: "", confirmPassword: "" },
    };

    if (mode === "login") {
      if (!loginData.email) {
        newErrors.login.email = "Email is required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
        newErrors.login.email = "Email is invalid";
        valid = false;
      }

      if (!loginData.password) {
        newErrors.login.password = "Password is required";
        valid = false;
      }
    } else {
      if (!registerData.name) {
        newErrors.register.name = "Name is required";
        valid = false;
      }

      if (!registerData.email) {
        newErrors.register.email = "Email is required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
        newErrors.register.email = "Email is invalid";
        valid = false;
      }

      if (!registerData.password) {
        newErrors.register.password = "Password is required";
        valid = false;
      } else if (registerData.password.length < 6) {
        newErrors.register.password = "Password must be at least 6 characters";
        valid = false;
      }

      if (registerData.password !== registerData.confirmPassword) {
        newErrors.register.confirmPassword = "Passwords don't match";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // Check for existing login on app load
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      const now = new Date();
      const expirationDate = new Date(parsedData.expiresAt);

      if (now < expirationDate) {
        setIsLoggedIn(true);
        setUser(parsedData.user);
      } else {
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const handleLogin = async () => {
    if (!validateForm("login")) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      console.log("API Response:", response.data);

      if (!response.data || response.data.status !== "success") {
        throw new Error(
          response.data?.message || "Login failed: Invalid server response"
        );
      }

      if (!response.data.token) {
        throw new Error("Authentication failed: No token received");
      }

      if (!response.data.data?.user) {
        throw new Error("User data not found in response");
      }

      const loggedInUser = response.data.data.user;

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 2);

      const userData = {
        token: response.data.token,
        email: loggedInUser.email,
        user: loggedInUser,
        expiresAt: expirationDate.toISOString(),
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData.user);

      const redirectPath =
        loggedInUser.status === "admin"
          ? "/83992"
          : "/08928";
      navigate(redirectPath);

      toast.success(`Welcome back, ${loggedInUser.name}!`);
      closeModal();
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!validateForm("register")) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
      });

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 2);

      const userData = {
        token: response.data.token || response.data.accessToken,
        email: registerData.email,
        user: {
          ...(response.data.user || response.data),
          email: registerData.email,
        },
        expiresAt: expirationDate.toISOString(),
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Registration successful!");

      setIsLoggedIn(true);
      setUser(userData.user);
      closeModal();
      setRegisterData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setLoginData({ email: "", password: "" });
    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({
      login: { email: "", password: "" },
      register: { name: "", email: "", password: "", confirmPassword: "" },
    });
  };

  const handleRemember = () => {
    toast.success("Remember your password because it's good!");
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUser(null);
    toast.success("Logged out successfully!");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Helper function to get the correct path based on user status
  const getNavItemPath = (item) => {
    if (item.dynamicPath && typeof item.path === "function") {
      return item.path(user);
    }
    return item.path;
  };

  return (
    <>
      <div className="bg-black text-white shadow-md w-full fixed top-0 left-0 z-40">
        <div className="mx-auto px-4 w-full">
          {/* Desktop Navbar */}
          <div className="hidden lg:flex items-center justify-between py-4 w-full">
            <div className="text-xl font-medium">
              <img
                src={logo}
                alt=""
                className="bg-white p-2 rounded-2xl w-26 h-16 object-contain"
              />
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                if (item.requiresAuth && !isLoggedIn) return null;
                const path = getNavItemPath(item);
                return (
                  <Link to={path} key={item.label}>
                    <button className="flex items-center px-3 py-2 xl:px-4 rounded hover:bg-blue-700 transition-colors">
                      {item.icon}
                      <span className="ml-1 lg:ml-2 text-sm lg:text-base">
                        {item.label}
                      </span>
                    </button>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-1 xl:space-x-2">
              {!isLoggedIn ? (
                <>
                  <button
                    className="flex items-center px-3 py-2 xl:px-4 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setAuthMode("login");
                      openModal();
                      resetForm();
                    }}
                  >
                    <Login className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="ml-1 lg:ml-2 text-sm lg:text-base">
                      Login
                    </span>
                  </button>
                  <button
                    className="flex items-center px-3 py-2 xl:px-4 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setAuthMode("register");
                      openModal();
                      resetForm();
                    }}
                  >
                    <PersonAdd className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="ml-1 lg:ml-2 text-sm lg:text-base">
                      Register
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link to={user?.status === "admin" ? "/83992" : "/08928"}>
                    <button className="flex items-center px-3 py-2 xl:px-4 rounded hover:bg-blue-700 transition-colors">
                      <Dashboard className="w-4 h-4 lg:w-5 lg:h-5" />
                      <span className="ml-1 lg:ml-2 text-sm lg:text-base">
                        Dashboard
                      </span>
                    </button>
                  </Link>
                  <div className="relative">
                    <div className="mr-2 lg:mr-4 text-xs lg:text-sm">
                      Hello, {user?.name || user?.email || "User"}
                    </div>
                    <button
                      className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                      onClick={handleMenuOpen}
                    >
                      {user?.avatar ? (
                        <People className="text-blue-500 w-6 h-6 lg:w-8 lg:h-8" />
                      ) : (
                        <AccountCircle className="w-6 h-6 lg:w-8 lg:h-8" />
                      )}
                    </button>

                    {anchorEl && (
                      <div className="absolute right-0 mt-2 w-40 lg:w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
                        <div
                          className="flex items-center px-3 lg:px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleMenuClose();
                            navigate("/profile");
                          }}
                        >
                          <AccountCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                          <span className="text-xs lg:text-sm">Profile</span>
                        </div>
                        <div
                          className="flex items-center px-3 lg:px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleMenuClose();
                            navigate("/settings");
                          }}
                        >
                          <Settings className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                          <span className="text-xs lg:text-sm">Settings</span>
                        </div>
                        <div className="border-t border-gray-200 my-1"></div>
                        <div
                          className="flex items-center px-3 lg:px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <Logout className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                          <span className="text-xs lg:text-sm">Logout</span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tablet/Mobile Navbar */}
          <div className="lg:hidden flex items-center justify-between py-4 w-full">
            <div className="text-xl font-medium">
              <img
                src={logo}
                alt=""
                className="bg-white p-2 rounded-2xl w-18 h-12 md:w-19 md:h-16 object-contain"
              />
            </div>

            <button
              className="p-2 rounded-md hover:bg-blue-700"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-blue-700 p-4 w-full">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  if (item.requiresAuth && !isLoggedIn) return null;
                  const path = getNavItemPath(item);
                  return (
                    <Link to={path} key={item.label}>
                      <button className="w-full flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors">
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </button>
                    </Link>
                  );
                })}

                {!isLoggedIn ? (
                  <>
                    <button
                      className="flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                      onClick={() => {
                        setAuthMode("login");
                        openModal();
                        setMobileMenuOpen(false);
                        resetForm();
                      }}
                    >
                      <Login className="w-5 h-5 text-white" />
                      <span className="ml-2 text-white">Login</span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                      onClick={() => {
                        setAuthMode("register");
                        openModal();
                        setMobileMenuOpen(false);
                        resetForm();
                      }}
                    >
                      <PersonAdd className="w-5 h-5 text-white" />
                      <span className="ml-2 text-white">Register</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={user?.status === "admin" ? "/83992" : "/08928"}>
                      <button className="w-full flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors">
                        <Dashboard className="w-5 h-5 text-white" />
                        <span className="ml-2 text-white">Dashboard</span>
                      </button>
                    </Link>
                    <div className="px-4 py-2 text-white text-sm">
                      Hello, {user?.name || user?.email || "User"}
                    </div>
                    <button
                      className="flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                      onClick={() => {
                        handleNavigation("/profile");
                      }}
                    >
                      <AccountCircle className="w-5 h-5 text-white" />
                      <span className="ml-2 text-white">Profile</span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                      onClick={() => {
                        handleNavigation("/settings");
                      }}
                    >
                      <Settings className="w-5 h-5 text-white" />
                      <span className="ml-2 text-white">Settings</span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                      onClick={handleLogout}
                    >
                      <Logout className="w-5 h-5 text-white" />
                      <span className="ml-2 text-white">Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Auth Modal */}
        {openAuthModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleOutsideClick}
          >
            <ToastContainer position="top-right" autoClose={3000} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
              >
                <Close className="h-6 w-6" />
              </button>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <h1 className="text-2xl font-bold text-center">
                  {authMode === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-center text-blue-100 mt-1">
                  {authMode === "login"
                    ? "Sign in to access your account"
                    : "Join us to get started"}
                </p>
              </div>

              <div className="p-6">
                {authMode === "login" ? (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Email className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          className={`w-full pl-10 text-black pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.login.email
                              ? "border-red-500 focus:ring-red-200"
                              : "border-gray-300 focus:ring-blue-200"
                          }`}
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.login.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.login.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`w-full pl-10 pr-10 text-black py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.login.password
                              ? "border-red-500 focus:ring-red-200"
                              : "border-gray-300 focus:ring-blue-200"
                          }`}
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                      </div>
                      {errors.login.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.login.password}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Remember me
                        </label>
                      </div>
                      <button
                        onClick={handleRemember}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
                      onClick={handleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                      ) : (
                        "Sign In"
                      )}
                    </motion.button>

                    <div className="text-center text-sm text-gray-600 pt-2">
                      Don't have an account?{" "}
                      <button
                        className="text-blue-600 hover:underline font-medium"
                        onClick={() => {
                          setAuthMode("register");
                          resetForm();
                        }}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Person className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          className={`w-full pl-10 text-black pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.register.name
                              ? "border-red-500 focus:ring-red-200"
                              : "border-gray-300 focus:ring-blue-200"
                          }`}
                          value={registerData.name}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              name: e.target.value,
                            })
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.register.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.register.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Email className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          className={`w-full pl-10 text-black pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.register.email
                              ? "border-red-500 focus:ring-red-200"
                              : "border-gray-300 focus:ring-blue-200"
                          }`}
                          value={registerData.email}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              email: e.target.value,
                            })
                          }
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.register.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.register.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`w-full pl-10 text-black pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.register.password
                              ? "border-red-500 focus:ring-red-200"
                              : "border-gray-300 focus:ring-blue-200"
                          }`}
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              password: e.target.value,
                            })
                          }
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </button>
                      </div>
                      {errors.register.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.register.password}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Must be at least 6 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className={`w-full pl-10 pr-10 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.register.confirmPassword
                              ? "border-red-500 focus:ring-red-200"
                              : "border-gray-300 focus:ring-blue-200"
                          }`}
                          value={registerData.confirmPassword}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              confirmPassword: e.target.value,
                            })
                          }
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </button>
                      </div>
                      {errors.register.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.register.confirmPassword}
                        </p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
                      onClick={handleRegister}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                      ) : (
                        "Sign Up"
                      )}
                    </motion.button>

                    <div className="text-center text-sm text-gray-600 pt-2">
                      Already have an account?{" "}
                      <button
                        className="text-blue-600 hover:underline font-medium"
                        onClick={() => {
                          setAuthMode("login");
                          resetForm();
                        }}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
      {/* Add padding to the main content to account for fixed navbar */}
      <div className="pt-24"></div>
    </>
  );
};