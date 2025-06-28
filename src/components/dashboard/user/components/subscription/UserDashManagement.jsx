/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  Email as EmailIcon, 
  Person as PersonIcon,
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Close as CloseIcon, 
  Check as CheckIcon, 
  Verified as VerifiedIcon,
  Unpublished as UnverifiedIcon,
  Dashboard
} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Sidebar } from '../sidebar/Sidebar';

export const UserSubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Get logged-in user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setLoggedInUser(parsedUser);
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchSubscriptions = async () => {
    if (!loggedInUser?.email) return;
    
    try {
      setLoading(true);
      const response = await axios.get('https://hexaliosnode.onrender.com/subscriptions');
      
      // Filter subscriptions by logged-in user's email
      const filteredSubscriptions = response.data.data.subscriptions.filter(
        sub => sub.email === loggedInUser.email
      );
      
      setSubscriptions(filteredSubscriptions);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch subscriptions',error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [loggedInUser?.email]);

  const handleSearch = async () => {
    if (!loggedInUser?.email) return;
    
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hexaliosnode.onrender.com/subscriptions/search?term=${searchTerm}&email=${loggedInUser.email}`
      );
      setSubscriptions(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Search failed',error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubscription({
      ...currentSubscription,
      [name]: value
    });
  };

  const openEditModal = (subscription) => {
    // Only allow editing if email matches logged-in user
    if (subscription.email === loggedInUser?.email) {
      setCurrentSubscription(subscription);
      setShowModal(true);
    } else {
      toast.error('You can only edit your own subscriptions');
    }
  };

  const openCreateModal = () => {
    setCurrentSubscription({
      name: '',
      email: loggedInUser?.email || '',
      isVerified: false
    });
    setShowModal(true);
  };

  const openDeleteConfirmation = (id) => {
    setSubscriptionToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCreate = async () => {
    try {
      // Ensure new subscription has logged-in user's email
      const subscriptionToCreate = {
        ...currentSubscription,
        email: loggedInUser.email
      };
      
      await axios.post('https://hexaliosnode.onrender.com/subscriptions', subscriptionToCreate);
      toast.success('Subscription created successfully');
      setShowModal(false);
      fetchSubscriptions();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create subscription');
    }
  };

  const handleUpdate = async () => {
    try {
      // Verify subscription belongs to logged-in user before updating
      if (currentSubscription.email !== loggedInUser.email) {
        throw new Error('Cannot update other users subscriptions');
      }
      
      await axios.put(
        `https://hexaliosnode.onrender.com/subscriptions/${currentSubscription._id}`, 
        currentSubscription
      );
      toast.success('Subscription updated successfully');
      setShowModal(false);
      fetchSubscriptions();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update subscription');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://hexaliosnode.onrender.com/subscriptions/${subscriptionToDelete}`
      );
      toast.success('Subscription deleted successfully');
      setShowDeleteModal(false);
      fetchSubscriptions();
    } catch (error) {
      toast.error('Failed to delete subscription',error);
    }
  };

  const toggleVerification = async (id, currentStatus) => {
    try {
      await axios.put(
        `https://hexaliosnode.onrender.com/subscriptions/${id}/verify`, 
        { isVerified: !currentStatus }
      );
      toast.success(`Subscription ${!currentStatus ? 'verified' : 'unverified'}`);
      fetchSubscriptions();
    } catch (error) {
      toast.error('Failed to update verification status',error);
    }
  };

  return (
    <div className="flex w-full h-screen mt-4 mb-2 rounded-2xl text-black overflow-hidden bg-gray-100 relative">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-4 md:p-6">
          <ToastContainer position="top-right" autoClose={3000} />

          {/* Current User Display */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-800">
              Viewing subscriptions for: <span className="font-bold">{loggedInUser?.email || 'Not logged in'}</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <EmailIcon /> Subscription Management
              </h2>
            </div>
            <button
              onClick={toggleSidebar}
              className="fixed md:hidden z-50 top-24 left-4 p-2 rounded-lg bg-gray-200 text-gray-800 shadow-md"
            >
              <Dashboard className="text-blue-400" />
            </button>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <SearchIcon /> <span className="hidden sm:inline">Search</span>
              </button>
              <button
                onClick={openCreateModal}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                disabled={!loggedInUser}
              >
                <AddIcon /> <span className="hidden sm:inline">Add Subscription</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : !loggedInUser ? (
              <div className="col-span-full px-6 py-4 text-center text-gray-500">
                Please log in to view subscriptions
              </div>
            ) : subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <div key={subscription._id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <PersonIcon /> {subscription.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <EmailIcon className="mr-1" size="small" />
                        {subscription.email}
                      </div>
                    </div>
                    <div className="flex space-x-2 flex-col gap-3">
                      <button
                        onClick={() => toggleVerification(subscription._id, subscription.isVerified)}
                        className={`p-1 rounded-full ${subscription.isVerified ? 'text-green-600 hover:text-green-800' : 'text-gray-400 hover:text-gray-600'}`}
                        title={subscription.isVerified ? 'Verified' : 'Unverified'}
                      >
                        {subscription.isVerified ? <VerifiedIcon /> : <UnverifiedIcon />}
                      </button>
                      <button
                        onClick={() => openEditModal(subscription)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => openDeleteConfirmation(subscription._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2 items-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                        subscription.isVerified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {subscription.isVerified ? <VerifiedIcon fontSize="small" /> : <UnverifiedIcon fontSize="small" />}
                      {subscription.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Joined: {new Date(subscription.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full px-6 py-4 text-center text-gray-500">
                No subscriptions found for your account
              </div>
            )}
          </div>

          {showModal && currentSubscription && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">
                    {currentSubscription._id ? "Edit Subscription" : "Add New Subscription"}
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
                        value={currentSubscription.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={loggedInUser?.email || ''}
                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                        disabled
                      />
                    </div>

                    {currentSubscription._id && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isVerified"
                          name="isVerified"
                          checked={currentSubscription.isVerified}
                          onChange={(e) => setCurrentSubscription({
                            ...currentSubscription,
                            isVerified: e.target.checked
                          })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isVerified" className="ml-2 block text-sm text-gray-700">
                          Verified
                        </label>
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
                    onClick={currentSubscription._id ? handleUpdate : handleCreate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                  >
                    <CheckIcon /> {currentSubscription._id ? "Update" : "Create"}
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
                    Are you sure you want to delete this subscription? This action
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