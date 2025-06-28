/* eslint-disable no-unused-vars */
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
  Dashboard,
} from "@mui/icons-material";
import { Sidebar } from "../sidebar/Sidebar";

export const UserDashManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Get logged-in user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setLoggedInUser(parsedUser);
    }
  }, []);

  // Fetch users - only those matching logged-in user's email
  const fetchUsers = async () => {
    if (!loggedInUser?.email) return;

    try {
      setLoading(true);
      const response = await axios.get("https://hexaliosnode.onrender.com/auth");
      const allUsers = Array.isArray(response.data.data.users) 
        ? response.data.data.users 
        : [];
      
      // Filter users by currently logged-in user's email
      const filteredUsers = allUsers.filter(user => 
        user.email === loggedInUser.email
      );
      
      setUsers(filteredUsers);
    } catch (err) {
      toast.error("Failed to fetch users",err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Refresh when loggedInUser changes
  useEffect(() => {
    fetchUsers();
  }, [loggedInUser?.email]);

  const handleSearch = async () => {
    if (!searchTerm) return fetchUsers();
    if (!loggedInUser?.email) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://hexaliosnode.onrender.com/auth/${searchTerm}`
      );

      // Verify the found user matches logged-in user's email
      if (response.data.data.user?.email === loggedInUser.email) {
        setUsers([response.data.data.user]);
        toast.success("User found!");
      } else {
        setUsers([]);
        toast.info("No matching user found");
      }
    } catch (err) {
      toast.error("Search failed",err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://hexaliosnode.onrender.com/auth/${userIdToDelete}`
      );
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed",err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdate = async () => {
    try {
      // Ensure we're only updating the logged-in user's data
      if (currentUser.email !== loggedInUser.email) {
        throw new Error("Cannot modify other users' data");
      }

      await axios.put(
        `https://hexaliosnode.onrender.com/auth/${currentUser._id}`,
        currentUser
      );
      toast.success("User updated");
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleCreate = async () => {
    try {
      // New users must have the logged-in user's email
      const userToCreate = {
        ...currentUser,
        email: loggedInUser.email
      };
      
      await axios.post("https://hexaliosnode.onrender.com/auth", userToCreate);
      toast.success("User created");
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      toast.error("Create failed",err);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const openEditModal = (user) => {
    // Only allow editing if email matches
    if (user.email === loggedInUser?.email) {
      setCurrentUser(user);
      setShowModal(true);
    } else {
      toast.error("Cannot edit other users' data");
    }
  };

  const openDeleteConfirmation = (id) => setUserIdToDelete(id) || setShowDeleteModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const isAdmin = loggedInUser?.status === "admin";

  return (
    <div className="flex w-full h-screen rounded-2xl mt-4 mb-2 text-black overflow-hidden bg-gray-100 relative">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto bg-gray-500 rounded-2xl transition-all duration-300">
        <div className="p-4 md:p-6">
          <ToastContainer position="top-right" autoClose={3000} />

          {/* Header showing current user's email */}
          <div className="mb-4 p-2 bg-blue-100 rounded-lg">
            <p className="text-sm font-medium">
              Viewing data for: <span className="font-bold">{loggedInUser?.email || "Not logged in"}</span>
            </p>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row p-4 bg-gray-400 justify-between items-center mb-6 gap-4">
            <div className="flex items-center p-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <PersonIcon /> User Management
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by ID..."
                  className="w-full pl-10 pr-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <SearchIcon /> Search
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    setCurrentUser({
                      name: "",
                      email: loggedInUser?.email || "",
                      status: "user",
                    });
                    setShowModal(true);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <AddIcon /> Add User
                </button>
              )}
            </div>
          </div>

          {/* User Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : users.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-1">ID: {user._id}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(user._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "admin" ? "bg-purple-100 text-purple-800" :
                      user.status === "editor" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full px-6 py-4 text-center text-gray-500">
                {loggedInUser 
                  ? "No matching users found for your account" 
                  : "Please log in to view user data"}
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
                        value={loggedInUser?.email || ""}
                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                        disabled
                      />
                    </div>
                    {isAdmin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role
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
                    )}
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
                  <p>Are you sure you want to delete this user?</p>
                  <p className="text-sm text-gray-600 mt-1">
                    This action cannot be undone.
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