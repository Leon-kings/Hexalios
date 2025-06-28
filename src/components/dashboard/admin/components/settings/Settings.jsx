/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import {
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  Notifications as NotificationsIcon,
  Person as ProfileIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Menu as MenuIcon,
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";

export const SettingsPanel = () => {
  // State management
  const [activeTab, setActiveTab] = useState("general");
  const [editPassword, setEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Default settings structure
  const [settings, setSettings] = useState({
    general: {
      language: "en",
      timezone: "est",
    },
    appearance: {
      theme: "light",
      accentColor: "blue",
      fontSize: "medium",
    },
    notifications: {
      email: true,
      push: false,
      sound: true,
      marketing: false,
      newsletter: true,
    },
    profile: {
      name: "",
      email: "",
      language: "en",
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      password: "********",
    },
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://api.example.com/user/settings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUserData(response.data);

        // Update settings with API data
        setSettings((prev) => ({
          ...prev,
          profile: {
            name: response.data.fullName || "",
            email: response.data.email || "",
            language: response.data.language || "en",
          },
          general: {
            language: response.data.language || "en",
            timezone: response.data.timezone || "est",
          },
          appearance: {
            theme: response.data.theme || "light",
            accentColor: response.data.accentColor || "blue",
            fontSize: response.data.fontSize || "medium",
          },
          notifications: {
            email: response.data.notifications?.email || true,
            push: response.data.notifications?.push || false,
            sound: response.data.notifications?.sound || true,
            marketing: response.data.notifications?.marketing || false,
            newsletter: response.data.notifications?.newsletter || true,
          },
          security: {
            twoFactor: response.data.security?.twoFactor || false,
            loginAlerts: response.data.security?.loginAlerts || true,
            password: "********",
          },
        }));
      } catch (error) {
        toast.error("Failed to fetch user data");
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  // Handlers
  const handleSettingChange = (category, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const savePassword = async () => {
    // Validate passwords
    const newErrors = {};
    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        "https://api.example.com/user/password",
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Password updated successfully");
      setEditPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update password";
      toast.error(message);
      if (error.response?.data?.field) {
        setErrors({ [error.response.data.field]: message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(
        "https://api.example.com/user/settings",
        {
          // Profile data
          fullName: settings.profile.name,
          email: settings.profile.email,
          language: settings.profile.language,

          // General settings
          timezone: settings.general.timezone,

          // Appearance
          theme: settings.appearance.theme,
          accentColor: settings.appearance.accentColor,
          fontSize: settings.appearance.fontSize,

          // Notifications
          notifications: {
            email: settings.notifications.email,
            push: settings.notifications.push,
            sound: settings.notifications.sound,
            marketing: settings.notifications.marketing,
            newsletter: settings.notifications.newsletter,
          },

          // Security
          security: {
            twoFactor: settings.security.twoFactor,
            loginAlerts: settings.security.loginAlerts,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (userData) {
      setSettings({
        general: {
          language: userData.language || "en",
          timezone: userData.timezone || "est",
        },
        appearance: {
          theme: userData.theme || "light",
          accentColor: userData.accentColor || "blue",
          fontSize: userData.fontSize || "medium",
        },
        notifications: {
          email: userData.notifications?.email || true,
          push: userData.notifications?.push || false,
          sound: userData.notifications?.sound || true,
          marketing: userData.notifications?.marketing || false,
          newsletter: userData.notifications?.newsletter || true,
        },
        profile: {
          name: userData.fullName || "",
          email: userData.email || "",
          language: userData.language || "en",
        },
        security: {
          twoFactor: userData.security?.twoFactor || false,
          loginAlerts: userData.security?.loginAlerts || true,
          password: "********",
        },
      });
    }
    toast.info("Settings reset to default");
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen mt-4 mb-2 rounded-2xl bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Responsive Sidebar Navigation */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed md:relative z-20 w-64 bg-white dark:bg-gray-800 shadow-lg p-4 h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile menu button */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex items-center mb-8">
          <SettingsIcon className="text-blue-500 mr-2" />
          <h1 className="text-xl font-bold">Settings</h1>
        </div>

        <nav>
          <ul className="space-y-2">
            {[
              { id: "general", icon: <SettingsIcon />, label: "General" },
              { id: "appearance", icon: <PaletteIcon />, label: "Appearance" },
              {
                id: "notifications",
                icon: <NotificationsIcon />,
                label: "Notifications",
              },
              { id: "profile", icon: <ProfileIcon />, label: "Profile" },
              { id: "security", icon: <LockIcon />, label: "Security" },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => {
                    setActiveTab(tab.id);
                    setEditPassword(false);
                    setIsSidebarOpen(false);
                  }}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto transition-all duration-300">
        {/* Mobile menu button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden mb-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        )}

        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={tabVariants}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-3xl mx-auto"
        >
          {/* User Email Banner */}
          {settings.profile.email && (
            <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6">
              <EmailIcon className="text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Logged in as
                </p>
                <p className="font-medium">{settings.profile.email}</p>
              </div>
            </div>
          )}

          {/* Tab content sections */}
          {activeTab === "general" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <SettingsIcon className="mr-2" /> General Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Language
                  </label>
                  <div className="flex items-center">
                    <LanguageIcon className="text-gray-500 mr-3" />
                    <select
                      value={settings.general.language}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "language",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) =>
                      handleSettingChange("general", "timezone", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  >
                    <option value="est">Eastern Time (EST/EDT)</option>
                    <option value="pst">Pacific Time (PST/PDT)</option>
                    <option value="cst">Central Time (CST/CDT)</option>
                    <option value="mst">Mountain Time (MST/MDT)</option>
                    <option value="gmt">GMT/BST</option>
                    <option value="cet">
                      Central European Time (CET/CEST)
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <PaletteIcon className="mr-2" /> Appearance
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-4">
                    Theme
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() =>
                        handleSettingChange("appearance", "theme", "light")
                      }
                      className={`flex flex-col items-center p-4 rounded-lg border ${
                        settings.appearance.theme === "light"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <LightModeIcon className="mx-auto mb-2 text-2xl" />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() =>
                        handleSettingChange("appearance", "theme", "dark")
                      }
                      className={`flex flex-col items-center p-4 rounded-lg border ${
                        settings.appearance.theme === "dark"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <DarkModeIcon className="mx-auto mb-2 text-2xl" />
                      <span>Dark</span>
                    </button>
                    <button
                      onClick={() =>
                        handleSettingChange("appearance", "theme", "system")
                      }
                      className={`flex flex-col items-center p-4 rounded-lg border ${
                        settings.appearance.theme === "system"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <SettingsIcon className="mx-auto mb-2 text-2xl" />
                      <span>System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Accent Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "blue",
                      "red",
                      "green",
                      "purple",
                      "orange",
                      "pink",
                      "teal",
                      "yellow",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          handleSettingChange(
                            "appearance",
                            "accentColor",
                            color
                          )
                        }
                        className={`w-10 h-10 rounded-full bg-${color}-500 ${
                          settings.appearance.accentColor === color
                            ? "ring-2 ring-offset-2 ring-blue-500"
                            : ""
                        }`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Font Size
                  </label>
                  <div className="flex items-center space-x-4">
                    {["small", "medium", "large"].map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          handleSettingChange("appearance", "fontSize", size)
                        }
                        className={`px-4 py-2 rounded-lg ${
                          settings.appearance.fontSize === size
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <NotificationsIcon className="mr-2" /> Notifications
              </h2>

              <div className="space-y-4">
                {[
                  {
                    id: "email",
                    label: "Email Notifications",
                    description: "Receive important updates via email",
                    value: settings.notifications.email,
                  },
                  {
                    id: "push",
                    label: "Push Notifications",
                    description: "Get instant browser notifications",
                    value: settings.notifications.push,
                  },
                  {
                    id: "sound",
                    label: "Sound Alerts",
                    description: "Play sound for new notifications",
                    value: settings.notifications.sound,
                  },
                  {
                    id: "marketing",
                    label: "Marketing Emails",
                    description: "Receive promotional offers and updates",
                    value: settings.notifications.marketing,
                  },
                  {
                    id: "newsletter",
                    label: "Weekly Newsletter",
                    description: "Get our curated content weekly",
                    value: settings.notifications.newsletter,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.value}
                        onChange={() =>
                          handleSettingChange(
                            "notifications",
                            item.id,
                            !item.value
                          )
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ProfileIcon className="mr-2" /> Profile Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) =>
                      handleSettingChange("profile", "name", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) =>
                      handleSettingChange("profile", "email", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Language Preference
                  </label>
                  <select
                    value={settings.profile.language}
                    onChange={(e) =>
                      handleSettingChange("profile", "language", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <LockIcon className="mr-2" /> Security
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {settings.security.twoFactor
                        ? "Enabled - Provides extra security"
                        : "Disabled - Add an extra layer of security"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactor}
                      onChange={() =>
                        handleSettingChange(
                          "security",
                          "twoFactor",
                          !settings.security.twoFactor
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium">Login Alerts</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {settings.security.loginAlerts
                        ? "Enabled - Get notified of new logins"
                        : "Disabled - No alerts for new logins"}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.loginAlerts}
                      onChange={() =>
                        handleSettingChange(
                          "security",
                          "loginAlerts",
                          !settings.security.loginAlerts
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    {!editPassword ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditPassword(true)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                      >
                        Change Password
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setEditPassword(false);
                          setErrors({});
                        }}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                      >
                        Cancel
                      </motion.button>
                    )}
                  </div>

                  {!editPassword ? (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">
                          Current Password
                        </label>
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-500 hover:text-blue-500"
                        >
                          {showPassword ? <HideIcon /> : <ShowIcon />}
                        </button>
                      </div>
                      <div className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="font-mono">
                          {showPassword
                            ? settings.security.password
                            : "•".repeat(8)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className={`w-full p-3 border rounded-lg pr-10 ${
                              errors.currentPassword
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="Enter current password"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-blue-500"
                          >
                            {showPassword ? <HideIcon /> : <ShowIcon />}
                          </button>
                        </div>
                        {errors.currentPassword && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.currentPassword}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          New Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className={`w-full p-3 border rounded-lg ${
                            errors.newPassword
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.newPassword}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className={`w-full p-3 border rounded-lg ${
                            errors.confirmPassword
                              ? "border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="Confirm new password"
                        />
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end pt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={savePassword}
                          disabled={loading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save Password"}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center"
            >
              <CloseIcon className="mr-2" /> Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center disabled:opacity-50"
            >
              <SaveIcon className="mr-2" />{" "}
              {loading ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
