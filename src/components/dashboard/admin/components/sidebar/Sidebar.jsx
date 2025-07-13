/* eslint-disable no-unused-vars */
// src/components/sidebar/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  ShoppingBag as ShoppingBagIcon,
  CreditCard as CreditCardIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Subscriptions,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/83992" },
  { name: "Users", icon: <PeopleIcon />, path: "/72822/98011" },
  { name: "Contacts", icon: <EmailIcon />, path: "/82922/67289" },
  { name: "Orders", icon: <ShoppingBagIcon />, path: "/92023/12381" },
  { name: "Subscription", icon: <Subscriptions />, path: "/73282/12102" },
  { name: "Bookings", icon: <CalendarIcon />, path: "/67282/28202" },
  { name: "Settings", icon: <SettingsIcon />, path: "/92023" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  // Auto-close sidebar on mobile when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Set initial state based on screen size
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile menu button - fixed outside sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed md:hidden z-50 top-22 left-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white shadow-md"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        />
      )}

      {/* Sidebar container */}
      <motion.div
        initial={{ x: -300 }}
        animate={{
          x: window.innerWidth < 768 ? (isOpen ? 0 : -300) : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed md:relative z-50 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg md:shadow-none`}
      >
        <div className="flex flex-col h-full p-4 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8 p-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h3>
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => window.innerWidth < 768 && toggleSidebar()}
                    className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto p-2">
            <div className="p-3 text-sm text-gray-500 dark:text-gray-400">
              v1.0.0
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};