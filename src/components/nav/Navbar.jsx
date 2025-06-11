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
  ElectricalServices,
  ContactPage,
} from "@mui/icons-material";
import logo from "../../assets/images/logo.png";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navItems = [
    { label: "Home", path: "/", icon: <Home className="size-6 text-white" /> },
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
    },
    {
      label: "Contacts",
      path: "/63819",
      icon: <ContactPage className="size-6 text-white" />,
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard className="w-5 h-5" />,
      requiresAuth: true,
    },
    {
      label: "Settings",
      path: "/settings",
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

  const API_URL = "https://your-api-endpoint.com/auth";

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

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", loginData.email);
      setIsLoggedIn(true);
      setUser({ ...response.data.user, email: loginData.email });
      setOpenAuthModal(false);
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", registerData.email);
      setIsLoggedIn(true);
      setUser({ ...response.data.user, email: registerData.email });
      setOpenAuthModal(false);
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setUser(null);
    setAnchorEl(null);
    navigate("/");
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

  return (
    <>
      <div className="bg-black rounded-2xl text-white shadow-md w-full">
        <div className="container mx-auto px-4">
          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center justify-between py-4">
            <div className="text-xl font-medium">
              <img src={logo} alt="" className="bg-white p-2 rounded-2xl" />
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                if (item.requiresAuth && !isLoggedIn) return null;
                return (
                  <Link to={item.path}>
                    <button
                      key={item.label}
                      className="flex items-center px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </button>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-2">
              {!isLoggedIn ? (
                <>
                  <button
                    className="flex items-center px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setAuthMode("login");
                      setOpenAuthModal(true);
                    }}
                  >
                    <Login className="w-5 h-5" />
                    <span className="ml-2">Login</span>
                  </button>
                  <button
                    className="flex items-center px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setAuthMode("register");
                      setOpenAuthModal(true);
                    }}
                  >
                    <PersonAdd className="w-5 h-5" />
                    <span className="ml-2">Register</span>
                  </button>
                </>
              ) : (
                <div className="relative">
                  <div className="mr-4 text-sm">
                    Hello, {user?.name || user?.email || "User"}
                  </div>
                  <button
                    className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                    onClick={handleMenuOpen}
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <AccountCircle className="w-8 h-8" />
                    )}
                  </button>

                  {anchorEl && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10">
                      <div
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleMenuClose();
                          navigate("/profile");
                        }}
                      >
                        <AccountCircle className="w-5 h-5 mr-2" />
                        <span>Profile</span>
                      </div>
                      <div
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleMenuClose();
                          navigate("/settings");
                        }}
                      >
                        <Settings className="w-5 h-5 mr-2" />
                        <span>Settings</span>
                      </div>
                      <div className="border-t border-gray-200 my-1"></div>
                      <div
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <Logout className="w-5 h-5 mr-2" />
                        <span>Logout</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center justify-between py-4">
            <div className="text-xl font-medium">
              <img src={logo} alt="" className="bg-white p-2 rounded-2xl" />
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
            <div className="md:hidden bg-blue-700 rounded-lg p-4 mb-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  if (item.requiresAuth && !isLoggedIn) return null;
                  return (
                    <>
                      <Link to={item.path}>
                        <button
                          key={item.label}
                          className="w-full flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                        >
                          {item.icon}
                          <span className="ml-2">{item.label}</span>
                        </button>
                      </Link>
                    </>
                  );
                })}

                {!isLoggedIn ? (
                  <>
                    <button
                      className="flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                      onClick={() => {
                        setAuthMode("login");
                        setOpenAuthModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Login className="w-5 h-5 text-white" />
                      <span className="ml-2 text-white">Login</span>
                    </button>
                    <button
                      className="flex items-center px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                      onClick={() => {
                        setAuthMode("register");
                        setOpenAuthModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <PersonAdd className="w-5 h-5 text-white" />
                      <span className="ml-2 text-white">Register</span>
                    </button>
                  </>
                ) : (
                  <>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md relative">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-medium text-gray-800">
                  {authMode === "login"
                    ? "Login to Your Account"
                    : "Create New Account"}
                </h2>
                <button
                  onClick={() => setOpenAuthModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Close className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {authMode === "login" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <div className="text-center text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => setAuthMode("register")}
                      >
                        Register here
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={registerData.name}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={registerData.email}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    <div className="text-center text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => setAuthMode("login")}
                      >
                        Login here
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
