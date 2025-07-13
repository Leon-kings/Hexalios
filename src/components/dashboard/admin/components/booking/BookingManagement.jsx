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
  CalendarToday as CalendarIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Dashboard,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(6);

  // Status colors
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  };

  // Safely get nested properties
  const getSafe = (obj, path, defaultValue = "") => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
  };

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://hexaliosnode.onrender.com/bookings");
      
      // Safely handle response data with multiple fallbacks
      const bookingsData = response.data?.data?.bookings || 
                         response.data?.bookings || 
                         (Array.isArray(response.data) ? response.data : []);
      
      setBookings(bookingsData);
    } catch (err) {
      console.error("Fetch error:", {
        message: err.message,
        response: err.response?.data,
        config: err.config
      });
      toast.error("Failed to fetch bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return fetchBookings();

    try {
      setLoading(true);
      const response = await axios.get(
        `https://hexaliosnode.onrender.com/bookings/search?term=${searchTerm}`
      );
      
      const results = response.data?.data?.bookings || 
                     response.data?.bookings || 
                     [];
      setBookings(results);
      setCurrentPage(1);
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Search failed");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle create
  const handleCreate = async () => {
    try {
      await axios.post(
        "https://hexaliosnode.onrender.com/bookings",
        currentBooking
      );
      toast.success("Booking created successfully");
      fetchBookings();
      setShowModal(false);
    } catch (err) {
      console.error("Create error:", err);
      toast.error("Failed to create booking");
    }
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://hexaliosnode.onrender.com/bookings/${currentBooking._id}`,
        currentBooking
      );
      toast.success("Booking updated successfully");
      fetchBookings();
      setShowModal(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update booking");
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://hexaliosnode.onrender.com/bookings/${bookingToDelete}`
      );
      toast.success("Booking deleted successfully");
      fetchBookings();
      if (currentBookings.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete booking");
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Modal handlers
  const openCreateModal = () => {
    setCurrentBooking({
      _id: null,
      service: {
        title: "",
        duration: 30,
      },
      customer: {
        name: "",
        email: "",
        phone: "",
      },
      bookingDetails: {
        preferredDate: new Date().toISOString().slice(0, 16),
        notes: "",
        status: "pending",
      },
    });
    setShowModal(true);
  };

  const openEditModal = (booking) => {
    setCurrentBooking({ 
      ...booking,
      bookingDetails: {
        ...booking.bookingDetails,
        preferredDate: booking.bookingDetails?.preferredDate 
          ? new Date(booking.bookingDetails.preferredDate).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16)
      }
    });
    setShowModal(true);
  };

  const openDeleteConfirmation = (id) => {
    setBookingToDelete(id);
    setShowDeleteModal(true);
  };

  const handleNestedInputChange = (parent, field, value) => {
    setCurrentBooking(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex w-full min-h-screen rounded-2xl mt-4 mb-2 text-black overflow-hidden bg-gray-100 relative">
      <Sidebar isOpen={sidebarOpen}  />

      <div className="flex-1 overflow-auto bg-gray-500 rounded-2xl transition-all duration-300">
        <div className="p-4 md:p-6">
          <ToastContainer position="top-right" autoClose={3000} />

          {/* Header and Search */}
          <div className="w-full flex flex-col md:flex-row p-4 bg-gray-400 justify-between items-center mb-6 gap-4">
            <div className="flex items-center p-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <CalendarIcon /> Booking Management
              </h2>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="fixed md:hidden z-50 top-28 left-4 p-2 rounded-lg bg-gray-200 text-gray-800 shadow-md"
            >
              <Dashboard className="text-blue-400" />
            </button>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="w-full pl-10 pr-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <SearchIcon className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <SearchIcon /> 
              </button>
              <button
                onClick={openCreateModal}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <AddIcon /> 
              </button>
            </div>
          </div>

          {/* Booking List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : currentBookings.length > 0 ? (
              currentBookings.map((booking) => (
                <div
                  key={booking._id || Math.random().toString(36).substr(2, 9)}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {getSafe(booking, 'customer.name', 'No name')}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 truncate">
                        <EmailIcon className="mr-1" size="small" />
                        {getSafe(booking, 'customer.email', 'No email')}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 truncate">
                        <PhoneIcon className="mr-1" size="small" />
                        {getSafe(booking, 'customer.phone', 'No phone')}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-2">
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

                  <div className="mt-4 flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {getSafe(booking, 'service.title', 'No service title')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {booking.bookingDetails?.preferredDate
                        ? new Date(booking.bookingDetails.preferredDate).toLocaleString()
                        : 'No date set'}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mt-2">
                      {getSafe(booking, 'bookingDetails.notes', 'No notes')}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[getSafe(booking, 'bookingDetails.status', 'pending')] || 
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {getSafe(booking, 'bookingDetails.status', 'pending')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {getSafe(booking, 'service.duration', '0')} mins
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full px-6 py-4 text-center text-gray-500">
                No bookings found
              </div>
            )}
          </div>

          {/* Pagination */}
          {bookings.length > bookingsPerPage && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <ChevronLeft />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-1 border-t border-b ${currentPage === index + 1 ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <ChevronRight />
                </button>
              </nav>
            </div>
          )}

          {/* Create/Edit Modal */}
          {showModal && currentBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">
                    {currentBooking._id ? "Edit Booking" : "Create New Booking"}
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      value={currentBooking.service?.title || ''}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "service",
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Duration (minutes) *
                    </label>
                    <input
                      type="number"
                      value={currentBooking.service?.duration || 30}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "service",
                          "duration",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={currentBooking.customer?.name || ''}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "customer",
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Email *
                    </label>
                    <input
                      type="email"
                      value={currentBooking.customer?.email || ''}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "customer",
                          "email",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Phone *
                    </label>
                    <input
                      type="tel"
                      value={currentBooking.customer?.phone || ''}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "customer",
                          "phone",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      value={currentBooking.bookingDetails?.preferredDate || new Date().toISOString().slice(0, 16)}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "bookingDetails",
                          "preferredDate",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      value={currentBooking.bookingDetails?.status || 'pending'}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "bookingDetails",
                          "status",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
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
                      value={currentBooking.bookingDetails?.notes || ''}
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
                  <p>Are you sure you want to delete this booking? This action cannot be undone.</p>
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