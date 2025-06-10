/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  FaTshirt,
  FaShippingFast,
  FaLeaf,
  FaUsers,
  FaAward,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LocalShipping,
  People,
  ProductionQuantityLimits,
} from "@mui/icons-material";

export const About = () => {
  const features = [
    {
      icon: <ProductionQuantityLimits className="w-8 h-8" />,
      title: "Premium Quality",
      description:
        "We source only the finest fabrics and materials for our clothing lines.",
    },
    {
      icon: <LocalShipping className="w-8 h-8" />,
      title: "Fast Shipping",
      description:
        "Get your orders delivered quickly with our express shipping options.",
    },
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Eco-Friendly",
      description:
        "Sustainable practices in every step of our production process.",
    },
    {
      icon: <People className="w-8 h-8" />,
      title: "Customer Focused",
      description: "Dedicated customer service team ready to assist you 24/7.",
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Award Winning",
      description:
        "Recognized for excellence in design and customer satisfaction.",
    },
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      bio: "Fashion industry veteran with 15 years of experience.",
    },
    {
      name: "Sarah Williams",
      role: "Head Designer",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      bio: "Creates stunning collections that blend comfort and style.",
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      bio: "Ensures seamless operations across all our stores.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="w-full rounded-2xl mt-4 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <ToastContainer />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 bg-indigo-700 text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Our Story
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-2xl max-w-3xl mx-auto"
              >
                Redefining fashion with quality, sustainability, and exceptional
                service since 2015.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* About Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At HexaShop, we believe fashion should be sustainable,
                  accessible, and make you feel confident. We're committed to
                  creating high-quality clothing that doesn't compromise on
                  ethics or style.
                </p>
                <p className="text-lg text-gray-600">
                  Our designs blend contemporary trends with timeless elegance,
                  ensuring you always look and feel your best.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="HexaShop store interior"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose HexaShop
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Team Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-indigo-50 rounded-xl p-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">
                  Quality First
                </h3>
                <p className="text-gray-600">
                  Every stitch, every fabric, every detail is carefully selected
                  and crafted to meet our high standards.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">
                  Sustainable Practices
                </h3>
                <p className="text-gray-600">
                  We're committed to reducing our environmental impact through
                  ethical sourcing and production methods.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">
                  Customer Happiness
                </h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We go above and beyond to
                  ensure you love every HexaShop experience.
                </p>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};
