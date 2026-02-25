// src/components/admin/AdminUsers.jsx
import React, { useState, useMemo } from 'react';
import {
  Trash2, Shield, Lock, Unlock, Search, ChevronUp, ChevronDown,
  Mail, Phone
} from 'lucide-react';
import adminUtils from '../../utils/adminUtils';
import { t } from '../../utils/adminTranslations';

export default function AdminUsers({ darkMode, language = 'ar' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  const users = useMemo(() => {
    let filtered = adminUtils.getAllUsers();

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(u => u.type === filterType);
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, sortOrder, filterType, refreshKey]);

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      adminUtils.deleteUser(userId);
      setRefreshKey(prev => prev + 1); // تحديث الجدول بدون إعادة توجيه
    }
  };

  const handleBlock = (userId) => {
    adminUtils.blockUser(userId);
    setRefreshKey(prev => prev + 1); // تحديث الجدول بدون إعادة توجيه
  };

  const handlePromote = (userId) => {
    if (confirm('Promote this user to admin?')) {
      adminUtils.promoteToAdmin(userId);
      setRefreshKey(prev => prev + 1); // تحديث الجدول بدون إعادة توجيه
    }
  };

  const SortHeader = ({ column, label }) => (
    <button
      onClick={() => {
        if (sortBy === column) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(column);
          setSortOrder('asc');
        }
      }}
      className="flex items-center gap-2 hover:opacity-75 transition-opacity"
    >
      {label}
      {sortBy === column && (
        sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          User Management
        </h1>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage platform users - {users.length} total
        </p>
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
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Filter by Type */}
        <div className="flex gap-3 flex-wrap">
          {['all', 'user', 'owner', 'admin'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === type
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div
        className={`rounded-lg border overflow-x-auto ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <table className="w-full">
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
                <SortHeader column="name" label="Name" />
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <SortHeader column="email" label="Email" />
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Type
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Balance
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Points
              </th>
              <th className={`px-6 py-4 text-right font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr
                  key={user.id}
                  className={`border-b transition-colors hover:${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } ${
                    user.blocked
                      ? darkMode
                        ? 'bg-red-900 bg-opacity-20'
                        : 'bg-red-50'
                      : ''
                  }`}
                >
                  <td className={`px-6 py-4 font-medium ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    <div className={user.blocked ? 'opacity-50 line-through' : ''}>
                      {user.name}
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.type === 'admin'
                          ? 'bg-red-100 text-red-800'
                          : user.type === 'owner'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-medium ${
                    darkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    ${user.balance || 0}
                  </td>
                  <td className={`px-6 py-4 font-medium ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    {user.points || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {user.type !== 'admin' && (
                        <button
                          onClick={() => handlePromote(user.id)}
                          title="Promote to Admin"
                          className="p-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white transition-colors"
                        >
                          <Shield size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleBlock(user.id)}
                        title={user.blocked ? 'Unblock' : 'Block'}
                        className={`p-2 rounded-lg transition-colors text-white ${
                          user.blocked
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-orange-600 hover:bg-orange-700'
                        }`}
                      >
                        {user.blocked ? <Unlock size={18} /> : <Lock size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        title="Delete"
                        className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className={`px-6 py-8 text-center ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  No users found
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
          Showing <span className="font-bold">{users.length}</span> user{users.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
