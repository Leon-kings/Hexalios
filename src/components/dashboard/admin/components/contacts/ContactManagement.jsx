/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  CalendarToday as CalendarIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Sidebar from "./Sidebar";

export const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/bookings");
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch bookings", error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/bookings/search?term=${searchTerm}`
      );
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Search failed", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking({
      ...currentBooking,
      [name]: value,
    });
  };

  const handleNestedInputChange = (parent, field, value) => {
    setCurrentBooking({
      ...currentBooking,
      [parent]: {
        ...currentBooking[parent],
        [field]: value,
      },
    });
  };

  const openEditModal = (booking) => {
    setCurrentBooking(booking);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setCurrentBooking({
      service: {
        id: "",
        title: "",
        description: "",
        duration: 30,
      },
      customer: {
        name: "",
        email: "",
        phone: "",
      },
      bookingDetails: {
        preferredDate: new Date(),
        notes: "",
        status: "pending",
      },
    });
    setShowModal(true);
  };

  const openDeleteConfirmation = (id) => {
    setBookingToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCreate = async () => {
    try {
      await axios.post("/api/bookings", currentBooking);
      toast.success("Booking created successfully");
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to create booking", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/bookings/${currentBooking._id}`, currentBooking);
      toast.success("Booking updated successfully");
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/bookings/${bookingToDelete}`);
      toast.success("Booking deleted successfully");
      setShowDeleteModal(false);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to delete booking", error);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-100 relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-4 md:p-6">
          <ToastContainer position="top-right" autoClose={3000} />

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <CalendarIcon /> Booking Management
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by name, email, phone or service..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <SearchIcon className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <SearchIcon /> <span className="hidden sm:inline">Search</span>
              </button>
              <button
                onClick={openCreateModal}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <AddIcon />{" "}
                <span className="hidden sm:inline">New Booking</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.customer.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <EmailIcon className="mr-1" size="small" />
                        {booking.customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <PhoneIcon className="mr-1" size="small" />
                        {booking.customer.phone}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(booking)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(booking._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.service.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(
                        booking.bookingDetails.preferredDate
                      ).toLocaleString()}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          statusColors[booking.bookingDetails.status]
                        }`}
                      >
                        {booking.bookingDetails.status}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        {booking.service.duration} mins
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full px-6 py-4 text-center text-gray-500">
                No bookings found
              </div>
            )}
          </div>

          {showModal && currentBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">
                    {currentBooking._id ? "Edit Booking" : "Create New Booking"}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={currentBooking.service.title}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "service",
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={currentBooking.service.duration}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "service",
                            "duration",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        value={currentBooking.customer.name}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "customer",
                            "name",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Email
                      </label>
                      <input
                        type="email"
                        value={currentBooking.customer.email}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "customer",
                            "email",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Phone
                      </label>
                      <input
                        type="tel"
                        value={currentBooking.customer.phone}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "customer",
                            "phone",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={new Date(
                          currentBooking.bookingDetails.preferredDate
                        )
                          .toISOString()
                          .slice(0, 16)}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "bookingDetails",
                            "preferredDate",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={currentBooking.bookingDetails.status}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "bookingDetails",
                            "status",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={currentBooking.bookingDetails.notes}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "bookingDetails",
                            "notes",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                      />
                    </div>
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
                    onClick={currentBooking._id ? handleUpdate : handleCreate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <CheckIcon /> {currentBooking._id ? "Update" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          )}

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
                    Are you sure you want to delete this booking? This action
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
  );
};
