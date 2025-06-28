/* eslint-disable react-hooks/exhaustive-deps */
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
  Person as PersonIcon,
  Mail as MailIcon,
  Subject as SubjectIcon,
  Dashboard,
  Info as InfoIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const UserContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [stats, setStats] = useState({ total: 0, stats: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(6);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Status colors
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    spam: "bg-red-100 text-red-800",
  };

  // Get logged-in user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setLoggedInUser(parsedUser);
    }
  }, []);

  // Fetch contacts and stats for logged-in user
  const fetchContacts = async () => {
    if (!loggedInUser?.email) return;
    
    try {
      setLoading(true);
      const [contactsRes, statsRes] = await Promise.all([
        axios.get("https://hexaliosnode.onrender.com/contacts"),
        axios.get("https://hexaliosnode.onrender.com/contacts/stats")
      ]);

      // Filter contacts by logged-in user's email
      const filteredContacts = (contactsRes.data.data || []).filter(
        contact => contact.email === loggedInUser.email
      );

      // Filter stats to only show counts for the logged-in user's contacts
      const filteredStats = {
        total: filteredContacts.length,
        stats: (statsRes.data.data?.statusCounts || []).filter(stat => 
          filteredContacts.some(contact => contact.status === stat._id))
      };

      setContacts(filteredContacts);
      setStats(filteredStats);
    } catch (err) {
      toast.error("Failed to fetch data",err);
      setContacts([]);
      setStats({ total: 0, stats: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [loggedInUser?.email]);

  // Pagination
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Handle search - only searches within logged-in user's contacts
  const handleSearch = async () => {
    if (!loggedInUser?.email) return;
    
    if (!searchTerm.trim()) return fetchContacts();

    try {
      setLoading(true);
      const response = await axios.get(
        `https://hexaliosnode.onrender.com/contacts/search?term=${searchTerm}&email=${loggedInUser.email}`
      );
      
      const results = response.data.data?.contacts || [];
      setContacts(results);
      setCurrentPage(1);
      toast.info(results.length ? "Contacts found" : "No contacts found");
    } catch (err) {
      toast.error("Search failed",err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle create - ensures new contact has logged-in user's email
  const handleCreate = async () => {
    try {
      const contactToCreate = {
        ...currentContact,
        email: loggedInUser.email
      };
      
      await axios.post(
        "https://hexaliosnode.onrender.com/contacts",
        contactToCreate
      );
      toast.success("Contact created successfully");
      fetchContacts();
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to create contact",err);
    }
  };

  // Handle update - verifies contact belongs to logged-in user
  const handleUpdate = async () => {
    try {
      if (currentContact.email !== loggedInUser.email) {
        throw new Error("Cannot update other users' contacts");
      }
      
      await axios.put(
        `https://hexaliosnode.onrender.com/contacts/${currentContact._id}`,
        currentContact
      );
      toast.success("Contact updated successfully");
      fetchContacts();
      setShowModal(false);
    } catch (err) {
      toast.error(err.message || "Failed to update contact");
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://hexaliosnode.onrender.com/contacts/${contactToDelete}`
      );
      toast.success("Contact deleted successfully");
      fetchContacts();
      if (currentContacts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      toast.error("Failed to delete contact",err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Modal handlers
  const openCreateModal = () => {
    setCurrentContact({
      name: "",
      email: loggedInUser?.email || "",
      subject: "",
      message: "",
      status: "pending"
    });
    setShowModal(true);
  };

  const openEditModal = (contact) => {
    // Only allow editing if email matches logged-in user
    if (contact.email === loggedInUser?.email) {
      setCurrentContact({ ...contact });
      setShowModal(true);
    } else {
      toast.error("You can only edit your own contacts");
    }
  };

  const openDeleteConfirmation = (id) => {
    setContactToDelete(id);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact(prev => ({ ...prev, [name]: value }));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex w-full min-h-screen rounded-2xl mt-4 mb-2 text-black overflow-hidden bg-gray-100 relative">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto bg-gray-500 rounded-2xl transition-all duration-300">
        <div className="p-4 md:p-6">
          <ToastContainer position="top-right" autoClose={3000} />

          {/* Current User Display */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-800">
              Viewing contacts for: <span className="font-bold">{loggedInUser?.email || "Not logged in"}</span>
            </p>
          </div>

          {/* Header and Search */}
          <div className="flex flex-col md:flex-row p-4 bg-gray-400 justify-between items-center mb-6 gap-4">
            <div className="flex items-center p-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <MailIcon /> Contact Management
              </h2>
            </div>
            <button
              onClick={toggleSidebar}
              className="fixed md:hidden z-50 top-28 left-4 p-2 rounded-lg bg-gray-200 text-gray-800 shadow-md"
            >
              <Dashboard className="text-blue-400" />
            </button>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search your contacts..."
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
                <SearchIcon /> Search
              </button>
              <button
                onClick={openCreateModal}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                disabled={!loggedInUser}
              >
                <AddIcon /> Add Contact
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Your Contacts</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <MailIcon />
                </div>
              </div>
            </div>
            
            {stats.stats.map((stat) => (
              <div key={stat._id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 capitalize">{stat._id}</p>
                    <p className="text-2xl font-bold">{stat.count}</p>
                  </div>
                  <div className={`p-3 rounded-full ${statusColors[stat._id] || 'bg-gray-100 text-gray-800'}`}>
                    <InfoIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : !loggedInUser ? (
              <div className="col-span-full px-6 py-4 text-center text-gray-500">
                Please log in to view contacts
              </div>
            ) : currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center truncate">
                        <MailIcon className="mr-1" size="small" />
                        {contact.email}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center mt-1 truncate">
                        <SubjectIcon className="mr-1" size="small" />
                        {contact.subject}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => openEditModal(contact)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(contact._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex-1">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {contact.message}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[contact.status] || 'bg-gray-100 text-gray-800'}`}
                    >
                      {contact.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full px-6 py-4 text-center text-gray-500">
                No contacts found for your account
              </div>
            )}
          </div>

          {/* Pagination */}
          {contacts.length > contactsPerPage && (
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
          {showModal && currentContact && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">
                    {currentContact._id ? "Edit Contact" : "Add New Contact"}
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={currentContact.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={loggedInUser?.email || ''}
                      className="w-full px-3 py-2 border rounded-md bg-gray-100"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={currentContact.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={currentContact.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={currentContact.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="spam">Spam</option>
                    </select>
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
                    onClick={currentContact._id ? handleUpdate : handleCreate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <CheckIcon /> {currentContact._id ? "Update" : "Create"}
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
                  <p>Are you sure you want to delete this contact? This action cannot be undone.</p>
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