/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Close,
  Visibility,
  VisibilityOff,
  Lock,
  Email,
  Person,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [authMode, setAuthMode] = useState("login");
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => setOpenAuthModal(true);
  const closeModal = () => setOpenAuthModal(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const API_URL = "https://hexaliosnode.onrender.com/auth";

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    login: {},
    register: {},
  });

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

  const handleLogin = async () => {
    if (!validateForm("login")) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.status !== "success") {
        throw new Error(response.data.message || "Login failed");
      }

      const { token, data } = response.data;
      const { user } = data;

      if (!token || !user) {
        throw new Error("Authentication data missing");
      }

      // Store user data in localStorage
      const userData = {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          status: user.status,
          isVerified: user.isVerified,
          lastLogin: user.lastLogin,
        },
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData.user);

      // Redirect based on user status
      if (user.status === "admin") {
        navigate("/admin-dashboard"); // Admin dashboard path
      } else {
        navigate("/user-dashboard"); // User dashboard path
      }

      toast.success(`Welcome back, ${user.name}!`);
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
      const response = await axios.post(`${API_URL}/register`, registerData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.status !== "success") {
        throw new Error(response.data.message || "Registration failed");
      }

      toast.success("Registration successful! Please login.");
      setAuthMode("login");
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setErrors({ login: {}, register: {} });
    if (authMode === "login") {
      setLoginData({ email: "", password: "" });
    } else {
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen rounded-2xl mt-4 mb-2 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <ToastContainer position="top-right" autoClose={3000} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md"
        >
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
                      className={`w-full text-black pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.login.email
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:ring-blue-200"
                      }`}
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
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
                      className={`w-full text-black pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                  <button className="text-sm text-blue-600 hover:underline">
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
                      className={`w-full text-black pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                      className={`w-full text-black pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                      className={`w-full text-black pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                      className={`w-full text-black pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
    </>
  );
};