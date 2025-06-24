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
  Menu as MenuIcon,
  Dashboard,
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hexaliosnode.onrender.com/auth"
      );
      console.log(response.data.data.users);
      const userdata = response.data.data.users;
      setUsers(Array.isArray(userdata) ? response.data.data.users : []);
    } catch (err) {
      setUsers([]);
      toast.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  // Handle search by ID
  const handleSearchById = async () => {
    console.log("Searching for:", searchTerm);
    if (!searchTerm) return fetchUsers();

    try {
      setLoading(true);
      const response = await axios.get(
        `https://hexaliosnode.onrender.com/auth/${searchTerm}`
      );
      console.log("API Response:", response.data.data);

      if (response.data.data.user) {
        setUsers([response.data.data.user]); // Wrap in array if your UI expects an array
        toast.success("User found successfully!");
      } else {
        setUsers([]);
        toast.info("User not found!");
      }
    } catch (err) {
      console.error("Search error:", err);
      toast.error(err.response?.data?.message || "Error searching for user");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://hexaliosnode.onrender.com/auth/${userIdToDelete}`
      );
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://hexaliosnode.onrender.com/auth/${currentUser._id}`,
        currentUser
      );
      toast.success("User updated successfully");
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to update user", err);
    }
  };

  // Handle create
  const handleCreate = async () => {
    try {
      await axios.post("https://hexaliosnode.onrender.com/auth", currentUser);
      toast.success("User created successfully");
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to create user", err);
    }
  };

  // Open edit modal
  const openEditModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  // Open delete confirmation
  const openDeleteConfirmation = (id) => {
    setUserIdToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex w-full h-screen rounded-2xl mt-4 mb-2 text-black overflow-hidden bg-gray-100 relative">
        {/* Mobile sidebar toggle button */}

        {/* Sidebar - overlays content on mobile, hovers on desktop */}
        <Sidebar isOpen={sidebarOpen}  />

        {/* Main content - responsive to screen size */}
        <div className="flex-1 overflow-auto bg-gray-500 rounded-2xl transition-all duration-300">
          <div className="p-4 md:p-6">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header and Search - responsive layout */}
            <div className="flex flex-col md:flex-row p-4 bg-gray-400 justify-between items-center mb-6 gap-4">
              <div className="flex items-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <PersonIcon /> User Management
                </h2>
              </div>
              <button
                onClick={toggleSidebar}
                className="fixed md:hidden z-50 top-28 left-4 p-2 rounded-lg bg-gray-200 text-gray-800 shadow-md"
              >
                <Dashboard className="text-blue-400" />
              </button>
              <div className="flex flex-col text-black sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
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
                  <SearchIcon />{" "}
                  <span className="hidden sm:inline">Search</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentUser({
                      name: "",
                      email: "",
                      status: "",
                    });
                    setShowModal(true);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <AddIcon /> <span className="hidden sm:inline">Add User</span>
                </button>
              </div>
            </div>

            {/* Responsive card container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-500">
                          {user._id}
                        </h3>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex">
                          {user.email}
                        </p>
                      </div>
                      <div className="grid space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-blue-600 mt-2 hover:text-blue-900"
                          title="Edit"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => openDeleteConfirmation(user._id)}
                          className="text-red-600 mt-2 hover:text-red-900"
                          title="Delete"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.status === "editor"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status === "admin" ? (
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17 11c.34 0 .67.04 1 .09V6.27L10.5 3 3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82.55-.13 1.08-.32 1.6-.55-.69-.98-1.1-2.17-1.1-3.45 0-3.31 2.69-6 6-6z" />
                            <path d="M17 13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12-1.12-.51-1.12-1.12.5-1.12 1.12-1.12zm0 5.37c-.93 0-1.74-.46-2.24-1.17.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17z" />
                          </svg>
                        ) : (
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full px-6 py-4 text-center text-gray-500">
                  No users found
                </div>
              )}
            </div>

            {/* Edit/Create Modal */}
            {showModal && currentUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                  <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">
                      {currentUser._id ? "Edit User" : "Add New User"}
                    </h2>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={currentUser.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={currentUser.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={!!currentUser._id}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          status
                        </label>
                        <select
                          name="status"
                          value={currentUser.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="user">User</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          name="status"
                          value={currentUser.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
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
                      onClick={currentUser._id ? handleUpdate : handleCreate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    >
                      <CheckIcon /> {currentUser._id ? "Update" : "Create"}
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
                      Are you sure you want to delete this user? This action
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
