/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  ShoppingCart as CartIcon,
  Dashboard,
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [userCounter, setUserCounter] = useState(0);
  const [stats, setStats] = useState(null);
  const [dailyRevenue, setDailyRevenue] = useState([]);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://hexaliosnode.onrender.com/orders");
      const orderData = response.data;
      setOrders(Array.isArray(orderData) ? orderData : []);
      
      // Check if we need to open a new page
      if (userCounter >= 10) {
        window.open(window.location.href, '_blank');
        setUserCounter(0);
      } else {
        setUserCounter(prev => prev + (Array.isArray(orderData) ? orderData.length : 0));
      }
    } catch (err) {
      setOrders([]);
      toast.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const response = await axios.get("https://hexaliosnode.onrender.com/orders/stats");
      setStats(response.data.data);
    } catch (err) {
      toast.error("Failed to load statistics", err);
    }
  };

  // Fetch daily revenue
  const fetchDailyRevenue = async () => {
    try {
      const response = await axios.get("https://hexaliosnode.onrender.com/orders/revenue");
      setDailyRevenue(response.data.data);
    } catch (err) {
      toast.error("Failed to load revenue data", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchStatistics();
    fetchDailyRevenue();
  }, [searchTerm]);

  // Handle search by ID
  const handleSearchById = async () => {
    if (!searchTerm) return fetchOrders();

    try {
      setLoading(true);
      const response = await axios.get(
        `https://hexaliosnode.onrender.com/orders/${searchTerm}`
      );
      if (response.data.data.order) {
        setOrders([response.data.data.order]);
        toast.success("Order found successfully!");
      } else {
        setOrders([]);
        toast.info("Order not found!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error searching for order");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://hexaliosnode.onrender.com/orders/${orderIdToDelete}`
      );
      toast.success("Order deleted successfully");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to delete order", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://hexaliosnode.onrender.com/orders/${currentOrder._id}`,
        currentOrder
      );
      toast.success("Order updated successfully");
      fetchOrders();
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to update order", err);
    }
  };

  // Handle create
  const handleCreate = async () => {
    try {
      await axios.post("https://hexaliosnode.onrender.com/orders", currentOrder);
      toast.success("Order created successfully");
      fetchOrders();
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to create order", err);
    }
  };

  // Open edit modal
  const openEditModal = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirmation = (id) => {
    setOrderIdToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested input change
  const handleNestedInputChange = (path, e) => {
    const { name, value } = e.target;
    setCurrentOrder((prev) => ({
      ...prev,
      [path]: {
        ...prev[path],
        [name]: value
      }
    }));
  };

  // Handle array input change
  const handleArrayInputChange = (arrayName, index, e) => {
    const { name, value } = e.target;
    setCurrentOrder((prev) => {
      const updatedArray = [...prev[arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [name]: value
      };
      return {
        ...prev,
        [arrayName]: updatedArray
      };
    });
  };

  // Add product to order
  const addProduct = () => {
    setCurrentOrder((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          productId: "",
          name: "",
          price: 0,
          quantity: 1
        }
      ]
    }));
  };

  // Remove product from order
  const removeProduct = (index) => {
    setCurrentOrder((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts.splice(index, 1);
      return {
        ...prev,
        products: updatedProducts
      };
    });
  };

  return (
    <>
      <div className="flex w-full h-screen rounded-2xl mt-4 mb-2 text-black overflow-hidden bg-gray-100 relative">
        <Sidebar isOpen={sidebarOpen} />
        
        <div className="flex-1 overflow-auto bg-gray-500 rounded-2xl transition-all duration-300">
          <div className="p-4 md:p-6">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header and Search */}
            <div className="flex flex-col md:flex-row p-4 bg-gray-400 justify-between items-center mb-6 gap-4">
              <div className="flex items-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <CartIcon /> Order Management
                </h2>
              </div>
              <div className="flex flex-col text-black sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by order ID, customer name or email..."
                    className="w-full pl-10 pr-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchIcon className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button
                  onClick={handleSearchById}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <SearchIcon /> Search
                </button>
                <button
                  onClick={() => {
                    setCurrentOrder({
                      customer: {
                        name: "",
                        email: "",
                        address: ""
                      },
                      products: [{
                        productId: "",
                        name: "",
                        price: 0,
                        quantity: 1
                      }],
                      payment: {
                        method: "card",
                        amount: 0,
                        status: "pending",
                        currency: "usd",
                        cardDetails: {
                          number: "",
                          nameOnCard: "",
                          expiryDate: "",
                          cvv: ""
                        }
                      },
                      shipping: {
                        status: "processing",
                        estimatedDelivery: new Date()
                      },
                      totalPrice: 0
                    });
                    setShowModal(true);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <AddIcon /> Add Order
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                  <p className="text-2xl font-bold">${stats.totalRevenue?.toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-700">Paid Orders</h3>
                  <p className="text-2xl font-bold">{stats.paidCount || 0} (${stats.paidAmount?.toFixed(2) || 0})</p>
                </div>
              </div>
            )}

            {/* Orders List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-500">Order</h3>
                        <p className="text-green-400">#{order._id}</p>
                        <p className="text-sm text-gray-600">
                          <strong>Customer:</strong> {order.customer.name} 
                        </p>
                        <p className="text-gray-600"><strong>Email:</strong>{order.customer.email}</p>
                        <p className="text-sm text-gray-600">
                          <strong>Address:</strong> {order.customer.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Total:</strong> ${order.totalPrice?.toFixed(2)}
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.payment.status === "paid" ? "bg-green-100 text-green-800" :
                            order.payment.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            <PaymentIcon className="w-3 h-3 mr-1" /> Payment: {order.payment.status}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.shipping.status === "delivered" ? "bg-green-100 text-green-800" :
                            order.shipping.status === "shipped" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            <ShippingIcon className="w-3 h-3 mr-1" /> Shipping: {order.shipping.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(order)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => openDeleteConfirmation(order._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full px-6 py-4 text-center text-gray-500">
                  No orders found
                </div>
              )}
            </div>

            {/* Order Modal */}
            {showModal && currentOrder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">
                      {currentOrder._id ? "Edit Order" : "Add New Order"}
                    </h2>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Customer Section */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={currentOrder.customer.name}
                            onChange={(e) => handleNestedInputChange("customer", e)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={currentOrder.customer.email}
                            onChange={(e) => handleNestedInputChange("customer", e)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={currentOrder.customer.address}
                            onChange={(e) => handleNestedInputChange("customer", e)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Products Section */}
                    <div className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium text-gray-900">Products</h3>
                        <button
                          onClick={addProduct}
                          className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          Add Product
                        </button>
                      </div>
                      {currentOrder.products.map((product, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 border p-2 rounded">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                            <input
                              type="text"
                              name="productId"
                              value={product.productId}
                              onChange={(e) => handleArrayInputChange("products", index, e)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={product.name}
                              onChange={(e) => handleArrayInputChange("products", index, e)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                              type="number"
                              name="price"
                              value={product.price}
                              onChange={(e) => handleArrayInputChange("products", index, e)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="flex-grow">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                              <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                onChange={(e) => handleArrayInputChange("products", index, e)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                              />
                            </div>
                            <button
                              onClick={() => removeProduct(index)}
                              className="px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                              disabled={currentOrder.products.length <= 1}
                            >
                              <DeleteIcon fontSize="small" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Section */}
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                          <select
                            name="method"
                            value={currentOrder.payment.method}
                            onChange={(e) => handleNestedInputChange("payment", e)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="card">Credit Card</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                          <input
                            type="number"
                            name="amount"
                            value={currentOrder.payment.amount}
                            onChange={(e) => handleNestedInputChange("payment", e)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            name="status"
                            value={currentOrder.payment.status}
                            onChange={(e) => handleNestedInputChange("payment", e)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                          <select
                            name="currency"
                            value={currentOrder.payment.currency}
                            onChange={(e) => handleNestedInputChange("payment", e)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="gbp">GBP</option>
                          </select>
                        </div>
                      </div>

                      {currentOrder.payment.method === "card" && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <input
                              type="text"
                              name="number"
                              value={currentOrder.payment.cardDetails?.number || ""}
                              onChange={(e) => handleNestedInputChange("payment.cardDetails", e)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                            <input
                              type="text"
                              name="nameOnCard"
                              value={currentOrder.payment.cardDetails?.nameOnCard || ""}
                              onChange={(e) => handleNestedInputChange("payment.cardDetails", e)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={currentOrder.payment.cardDetails?.expiryDate || ""}
                              onChange={(e) => handleNestedInputChange("payment.cardDetails", e)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              name="cvv"
                              value={currentOrder.payment.cardDetails?.cvv || ""}
                              onChange={(e) => handleNestedInputChange("payment.cardDetails", e)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Shipping Section */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            name="status"
                            value={currentOrder.shipping.status}
                            onChange={(e) => handleNestedInputChange("shipping", e)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery</label>
                          <input
                            type="date"
                            name="estimatedDelivery"
                            value={currentOrder.shipping.estimatedDelivery ? new Date(currentOrder.shipping.estimatedDelivery).toISOString().split('T')[0] : ""}
                            onChange={(e) => handleNestedInputChange("shipping", {
                              target: {
                                name: "estimatedDelivery",
                                value: new Date(e.target.value)
                              }
                            })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
                      <input
                        type="number"
                        name="totalPrice"
                        value={currentOrder.totalPrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="p-4 border-t flex justify-end space-x-3">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2"
                    >
                      <CloseIcon /> Cancel
                    </button>
                    <button
                      onClick={currentOrder._id ? handleUpdate : handleCreate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                      <CheckIcon /> {currentOrder._id ? "Update" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold text-red-600">
                      Confirm Deletion
                    </h2>
                  </div>
                  <div className="p-4">
                    <p>
                      Are you sure you want to delete this order? This action
                      cannot be undone.
                    </p>
                  </div>
                  <div className="p-4 border-t flex justify-end space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2"
                    >
                      <CloseIcon /> Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                    >
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};