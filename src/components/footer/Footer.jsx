/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Room,
  Email,
  Phone,
  Home,
  Info,
  Help,
  ContactMail,
  LocalShipping,
  QuestionAnswer,
} from "@mui/icons-material";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <>
      <footer className="w-full rounded-2xl mt-4 bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1 - Logo & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/150x50?text=HexaShop"
                  alt="HexaShop Ecommerce"
                  className="h-10"
                />
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Room className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    16501 Collins Ave, Sunny Isles Beach, FL 33160, United
                    States
                  </Link>
                </li>
                <li className="flex items-start">
                  <Email className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                  <a
                    href="mailto:hexashop@company.com"
                    className="hover:text-white transition-colors"
                  >
                    hexashop@company.com
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                  <a
                    href="tel:0100200340"
                    className="hover:text-white transition-colors"
                  >
                    010-020-0340
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Column 2 - Shopping Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Shopping & Categories
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/shop/men"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Men's Shopping
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/women"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Women's Shopping
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop/kids"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    Kid's Shopping
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 3 - Useful Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Useful Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <Home className="text-gray-400 mr-2 text-sm" />
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <Info className="text-gray-400 mr-2 text-sm" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <Help className="text-gray-400 mr-2 text-sm" />
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <ContactMail className="text-gray-400 mr-2 text-sm" />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 4 - Help & Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Help & Information
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <Help className="text-gray-400 mr-2 text-sm" />
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <QuestionAnswer className="text-gray-400 mr-2 text-sm" />
                    FAQ's
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <LocalShipping className="text-gray-400 mr-2 text-sm" />
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tracking"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <LocalShipping className="text-gray-400 mr-2 text-sm" />
                    Tracking ID
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Copyright & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-gray-400">
                Copyright © {new Date().getFullYear()} HexaShop Co., Ltd. All
                Rights Reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Design:{" "}
                <a
                  href="https://templatemo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TemplateMo
                </a>
              </p>
            </div>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <LinkedIn />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};
