import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  ExpandMore,
  ExpandLessOutlined,
  LocalShippingOutlined,
  Payments,
  KeyboardReturn,
  LockClock,
  HelpCenter,
  StoreRounded,
} from "@mui/icons-material";

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const navigate = useNavigate();
  const handleContactClick = () => {
    toast.info("Our customer service will contact you shortly!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/63819");
  };

  const faqItems = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.",
      icon: <Payments className="text-blue-500 mr-2" />,
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days. Express shipping is available for an additional fee with delivery in 1-2 business days.",
      icon: <LocalShippingOutlined className="text-green-500 mr-2" />,
    },
    {
      question: "What is your return policy?",
      answer:
        "You can return items within 30 days of purchase for a full refund. Items must be unworn, with tags attached, and in original packaging.",
      icon: <KeyboardReturn className="text-purple-500 mr-2" />,
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard SSL encryption to protect your data. We never store your credit card information on our servers.",
      icon: <LockClock className="text-yellow-500 mr-2" />,
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can use this number on our website or the carrier's website to track your package.",
      icon: <StoreRounded className="text-red-500 mr-2" />,
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination.",
      icon: <LocalShippingOutlined className="text-blue-500 mr-2" />,
    },
  ];

  return (
    <>
      <div className="w-full mt-4 rounded-2xl min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              <HelpCenter className="text-indigo-600 inline mr-2" />
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Find answers to common questions about Hexashop
            </p>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="divide-y divide-gray-200">
              {faqItems.map((item, index) => (
                <div key={index} className="px-4 py-5 sm:px-6">
                  <div
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex text-black justify-between items-center text-left focus:outline-none"
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <h3 className="text-lg leading-6 font-medium text-black">
                        {item.question}
                      </h3>
                    </div>
                    {activeIndex === index ? (
                      <ExpandLessOutlined className="text-gray-500" />
                    ) : (
                      <ExpandMore className="text-gray-500" />
                    )}
                  </div>
                  {activeIndex === index && (
                    <div className="mt-4 pl-8">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Still have questions?
            </h2>
            <p className="mt-2 text-gray-600">
              Contact our customer support team for more information.
            </p>
            <button
              onClick={handleContactClick}
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
