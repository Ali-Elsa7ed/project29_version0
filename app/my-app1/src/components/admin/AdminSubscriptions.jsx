// src/components/admin/AdminSubscriptions.jsx
import React, { useState, useMemo } from 'react';
import {
  RefreshCw, AlertCircle, CheckCircle, Calendar, Search,
  Download
} from 'lucide-react';
import adminUtils from '../../utils/adminUtils';
import { t } from '../../utils/adminTranslations';

export default function AdminSubscriptions({ darkMode, language = 'ar' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const allSubscriptions = useMemo(() => adminUtils.getAllSubscriptions(), []);
  const allUsers = useMemo(() => adminUtils.getAllUsers(), []);

  const subscriptions = useMemo(() => {
    let filtered = [...allSubscriptions];

    // Filter by status
    if (filterStatus === 'active') {
      filtered = filtered.filter(s => new Date(s.expiryDate) >= new Date());
    } else if (filterStatus === 'expired') {
      filtered = filtered.filter(s => new Date(s.expiryDate) < new Date());
    }

    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(s => {
        const user = allUsers.find(u => u.id == s.userId);
        return user?.name.toLowerCase().includes(lowerQuery) ||
               user?.email.toLowerCase().includes(lowerQuery) ||
               (s.plan || 'basic').toLowerCase().includes(lowerQuery);
      });
    }

    return filtered;
  }, [searchQuery, filterStatus, allSubscriptions, allUsers]);

  const stats = useMemo(() => {
    const active = allSubscriptions.filter(s => new Date(s.expiryDate) >= new Date());
    const expired = allSubscriptions.filter(s => new Date(s.expiryDate) < new Date());
    const revenue = allSubscriptions.reduce((sum, s) => {
      const planType = (s.plan || 'basic').toLowerCase();
      const plan = planType === 'pro' ? 9.99 : planType === 'premium' ? 19.99 : 4.99;
      return sum + plan;
    }, 0);
    return { active: active.length, expired: expired.length, revenue };
  }, [allSubscriptions]);

  const handleRenew = (subscriptionId) => {
    adminUtils.renewSubscription(subscriptionId);
    window.location.reload();
  };

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();
  const daysUntilExpiry = (expiryDate) => {
    const days = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const getPlanColor = (plan) => {
    const colors = {
      'basic': 'bg-gray-100 text-gray-800',
      'pro': 'bg-blue-100 text-blue-800',
      'premium': 'bg-purple-100 text-purple-800',
    };
    return colors[plan] || 'bg-gray-100 text-gray-800';
  };

  const exportSubscriptions = () => {
    const data = subscriptions.map(s => {
      const user = allUsers.find(u => u.id == s.userId);
      return {
        'User': user?.name || 'N/A',
        'Email': user?.email || 'N/A',
        'Plan': s.plan,
        'Start Date': new Date(s.startDate).toLocaleDateString(),
        'Expiry Date': new Date(s.expiryDate).toLocaleDateString(),
        'Status': isExpired(s.expiryDate) ? 'Expired' : 'Active',
      };
    });
    adminUtils.exportToCSV(data, 'subscriptions-report.csv');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Subscriptions Management
        </h1>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage user subscriptions and memberships
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`p-4 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Active Subscriptions
          </p>
          <p className={`text-2xl font-bold mt-2 text-green-600`}>
            {stats.active}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Expired Subscriptions
          </p>
          <p className={`text-2xl font-bold mt-2 text-red-600`}>
            {stats.expired}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Monthly Revenue
          </p>
          <p className={`text-2xl font-bold mt-2 text-blue-600`}>
            ${stats.revenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={20}
            className={`absolute left-3 top-3 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}
          />
          <input
            type="text"
            placeholder="Search by user name, email, or plan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Filters and Export */}
        <div className="flex gap-3 flex-wrap items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            {['all', 'active', 'expired'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={exportSubscriptions}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div
        className={`rounded-lg border overflow-x-auto ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <table className="w-full min-w-max">
          <thead>
            <tr
              className={`border-b ${
                darkMode
                  ? 'border-gray-700 bg-gray-900'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                User
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Email
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Plan
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Start Date
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Expiry Date
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Status
              </th>
              <th className={`px-6 py-4 text-right font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription, idx) => {
                const user = allUsers.find(u => u.id == subscription.userId);
                const expired = isExpired(subscription.expiryDate);
                const daysLeft = daysUntilExpiry(subscription.expiryDate);

                return (
                  <tr
                    key={idx}
                    className={`border-b transition-colors hover:${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    } ${expired ? (darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50') : ''}`}
                  >
                    <td className={`px-6 py-4 font-medium ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {user?.name || 'Unknown'}
                    </td>
                    <td className={`px-6 py-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {user?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        getPlanColor(subscription.plan || 'basic')
                      }`}>
                        {((subscription.plan || 'basic').charAt(0).toUpperCase() + (subscription.plan || 'basic').slice(1))}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(subscription.startDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(subscription.expiryDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {expired ? (
                          <>
                            <AlertCircle size={16} className="text-red-600" />
                            <span className="text-red-600 font-semibold">Expired</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} className="text-green-600" />
                            <span className="text-green-600 font-semibold">{daysLeft} days</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleRenew(subscription.id)}
                        className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center gap-2"
                      >
                        <RefreshCw size={16} />
                        Renew
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className={`px-6 py-8 text-center ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  No subscriptions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div
        className={`p-4 rounded-lg ${
          darkMode
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-gray-50 border border-gray-200'
        }`}
      >
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Showing <span className="font-bold">{subscriptions.length}</span> subscription{subscriptions.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
