/* eslint-disable no-unused-vars */
// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  People as PeopleIcon,
  Email as EmailIcon,
  ShoppingBag as ShoppingBagIcon,
  CreditCard as CreditCardIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Sidebar } from "./components/sidebar/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE_URL = "https://your-api-endpoint.com/api";

// API service functions
const fetchDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
  if (!response.ok) throw new Error("Failed to fetch dashboard stats");
  return response.json();
};

const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

const fetchContacts = async () => {
  const response = await fetch(`${API_BASE_URL}/contacts`);
  if (!response.ok) throw new Error("Failed to fetch contacts");
  return response.json();
};

const fetchOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
};

const fetchPayments = async () => {
  const response = await fetch(`${API_BASE_URL}/payments`);
  if (!response.ok) throw new Error("Failed to fetch payments");
  return response.json();
};

const fetchBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/bookings`);
  if (!response.ok) throw new Error("Failed to fetch bookings");
  return response.json();
};

// Custom hook for data fetching
const useFetchData = (fetchFunction, params = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await fetchFunction(params);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFunction(params);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, params]);

  return { data, loading, error, refetch };
};

export const Dashboard = () => {
  const {
    data: statsData,
    loading,
    error,
    refetch,
  } = useFetchData(fetchDashboardStats);
  const [activeModal, setActiveModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing data...");
    try {
      await refetch();
      toast.success("Data refreshed successfully", { id: refreshToast });
    } catch (err) {
      toast.error(`Error refreshing data: ${err.message}`, {
        id: refreshToast,
      });
    }
  };

  const openModal = async (type) => {
    setActiveModal(type);
    setModalLoading(true);
    toast.loading(`Loading ${type} data...`);

    try {
      let data;
      switch (type) {
        case "users":
          data = await fetchUsers();
          break;
        case "contacts":
          data = await fetchContacts();
          break;
        case "orders":
          data = await fetchOrders();
          break;
        case "payments":
          data = await fetchPayments();
          break;
        case "bookings":
          data = await fetchBookings();
          break;
        default:
          break;
      }
      setModalData(data);
      toast.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} data loaded`
      );
    } catch (err) {
      toast.error(`Failed to load ${type}: ${err.message}`);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  if (error) {
    toast.error(`Failed to load dashboard data: ${error.message}`);
  }

  // Chart data generators
  const generateUserGrowthData = () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [15, 25, 32, 28, 41, 37],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  });

  const generateBookingTrendsData = () => ({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Bookings",
        data: [12, 19, 15, 21, 24, 32, 28],
        fill: false,
        backgroundColor: "rgba(220, 38, 38, 0.7)",
        borderColor: "rgba(220, 38, 38, 1)",
        tension: 0.3,
      },
    ],
  });

  const generateContactSourcesData = () => ({
    labels: ["Website", "Email", "Phone", "Social"],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(59, 130, 246, 0.7)",
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const generateOrderValueData = () => ({
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [12500, 18900, 15300, 21500],
        backgroundColor: "rgba(139, 92, 246, 0.7)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 1,
      },
    ],
  });

  const generatePaymentMethodsData = () => ({
    labels: ["Credit Card", "PayPal", "Bank Transfer", "Other"],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(220, 38, 38, 0.7)",
        ],
        borderColor: [
          "rgba(16, 185, 129, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(220, 38, 38, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const stats = [
    {
      title: "Total Users",
      value: statsData?.users?.total || "0",
      change: statsData?.users?.change || "+0%",
      icon: <PeopleIcon fontSize="medium" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200",
      type: "users",
      chart: (
        <Bar
          data={generateUserGrowthData()}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      ),
    },
    {
      title: "Contacts",
      value: statsData?.contacts?.total || "0",
      change: statsData?.contacts?.change || "+0%",
      icon: <EmailIcon fontSize="medium" />,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200",
      type: "contacts",
      chart: (
        <Pie
          data={generateContactSourcesData()}
          options={{
            responsive: true,
            plugins: { legend: { position: "right" } },
          }}
        />
      ),
    },
    {
      title: "Orders",
      value: statsData?.orders?.total || "0",
      change: statsData?.orders?.change || "+0%",
      icon: <ShoppingBagIcon fontSize="medium" />,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200",
      type: "orders",
      chart: (
        <Bar
          data={generateOrderValueData()}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      ),
    },
    {
      title: "Payments",
      value: statsData?.payments?.total || "0",
      change: statsData?.payments?.change || "+0%",
      icon: <CreditCardIcon fontSize="medium" />,
      color:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200",
      type: "payments",
      chart: (
        <Pie
          data={generatePaymentMethodsData()}
          options={{
            responsive: true,
            plugins: { legend: { position: "right" } },
          }}
        />
      ),
    },
    {
      title: "Bookings",
      value: statsData?.bookings?.total || "0",
      change: statsData?.bookings?.change || "+0%",
      icon: <CalendarIcon fontSize="medium" />,
      color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200",
      type: "bookings",
      chart: (
        <Line
          data={generateBookingTrendsData()}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      ),
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const StatsCard = ({ title, value, change, icon, color, type, chart }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl shadow-sm ${color} flex flex-col cursor-pointer`}
      onClick={() => {
        openModal(type);
        toast.success(`Opening ${title} details`);
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-2 rounded-lg bg-white bg-opacity-30">{icon}</div>
      </div>
      <p
        className={`mt-4 text-sm ${
          change.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        {change} from last month
      </p>
    </motion.div>
  );

  const ChartCard = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-full">
      <h3 className="text-lg text-black dark:text-white font-semibold mb-4">
        {title}
      </h3>
      <div className="h-64">{children}</div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Dashboard Overview
              </h3>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshIcon className={`${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>

          {loading && !statsData ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    <StatsCard {...stat} />
                  </motion.div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <ChartCard title="User Growth">
                  <Bar
                    data={generateUserGrowthData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "top" },
                        tooltip: { mode: "index", intersect: false },
                      },
                      scales: {
                        y: { beginAtZero: true },
                      },
                    }}
                  />
                </ChartCard>

                <ChartCard title="Booking Trends">
                  <Line
                    data={generateBookingTrendsData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "top" },
                        tooltip: { mode: "index", intersect: false },
                      },
                      scales: {
                        y: { beginAtZero: true },
                      },
                    }}
                  />
                </ChartCard>

                <ChartCard title="Contact Sources">
                  <Pie
                    data={generateContactSourcesData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "right" },
                      },
                    }}
                  />
                </ChartCard>

                <ChartCard title="Order Revenue">
                  <Bar
                    data={generateOrderValueData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "top" },
                        tooltip: { mode: "index", intersect: false },
                      },
                      scales: {
                        y: { beginAtZero: true },
                      },
                    }}
                  />
                </ChartCard>

                <ChartCard title="Payment Methods">
                  <Pie
                    data={generatePaymentMethodsData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: "right" },
                      },
                    }}
                  />
                </ChartCard>
              </div>
            </>
          )}

          <AnimatePresence>
            {activeModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-xl font-semibold dark:text-white">
                      {activeModal.charAt(0).toUpperCase() +
                        activeModal.slice(1)}{" "}
                      Details
                    </h3>
                    <button
                      onClick={closeModal}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <CloseIcon fontSize="medium" />
                    </button>
                  </div>
                  <div className="p-4">
                    {modalLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : modalData ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              {Object.keys(modalData[0] || {}).map((key) => (
                                <th
                                  key={key}
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {modalData.map((item, index) => (
                              <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                  <td
                                    key={i}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                                  >
                                    {typeof value === "object"
                                      ? JSON.stringify(value)
                                      : value}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No data available
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
