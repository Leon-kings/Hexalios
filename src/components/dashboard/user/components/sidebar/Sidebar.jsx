/* eslint-disable no-unused-vars */
// src/components/sidebar/Sidebar.jsx
import React, { useEffect } from "react";
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
  { name: "Dashboard", icon: <DashboardIcon />, path: "/08928" },
  { name: "Users", icon: <PeopleIcon />, path: "/7282/2820" },
  { name: "Contacts", icon: <EmailIcon />, path: "/7233/1719" },
  { name: "Orders", icon: <ShoppingBagIcon />, path: "/0937/8920" },
  { name: "Subscription", icon: <Subscriptions />, path: "/8292/2982" },
  { name: "Bookings", icon: <CalendarIcon />, path: "/7820/9101" },
  { name: "Settings", icon: <SettingsIcon />, path: "/92023" },
];

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Auto-close sidebar on mobile when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        toggleSidebar(true);
      } else {
        toggleSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleSidebar]);

  return (
    <>
      

      {/* Overlay - only shows on mobile when sidebar is open */}
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed md:hidden z-50 top-24 left-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white shadow-md"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      )}

      {/* Sidebar container */}
      <motion.div
        initial={{ x: -300 }}
        animate={{
          x: window.innerWidth < 768 ? (isOpen ? 0 : -300) : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed md:relative z-40 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg md:shadow-none`}
      >
        <div className="flex flex-col h-full p-4 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-8 p-2">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              User Panel
            </h1>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
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
