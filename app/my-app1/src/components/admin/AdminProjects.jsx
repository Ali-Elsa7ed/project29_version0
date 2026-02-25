// src/components/admin/AdminProjects.jsx
import React, { useState, useMemo } from 'react';
import {
  Trash2, CheckCircle, XCircle, Search, ChevronUp, ChevronDown,
  Eye, DollarSign, Target
} from 'lucide-react';
import adminUtils from '../../utils/adminUtils';
import { t } from '../../utils/adminTranslations';

export default function AdminProjects({ darkMode, language = 'ar' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');

  const projects = useMemo(() => {
    let filtered = adminUtils.getAllProjects();

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus);
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.owner.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [searchQuery, sortBy, sortOrder, filterStatus]);

  const handleDelete = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      adminUtils.deleteProject(projectId);
      window.location.reload();
    }
  };

  const handleApprove = (projectId) => {
    adminUtils.approveProject(projectId);
    window.location.reload();
  };

  const handleReject = (projectId) => {
    if (confirm('Reject this project?')) {
      adminUtils.rejectProject(projectId);
      window.location.reload();
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'Expired': 'bg-red-100 text-red-800',
      'Rejected': 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getProgressPercentage = (raised, goal) => {
    return Math.min(Math.round((raised / goal) * 100), 100);
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
          Project Management
        </h1>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage crowdfunding projects - {projects.length} total
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
            placeholder="Search projects or owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Filter by Status */}
        <div className="flex gap-3 flex-wrap">
          {['all', 'Active', 'Completed', 'Expired', 'Rejected'].map(status => (
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
      </div>

      {/* Projects Table */}
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
                <SortHeader column="title" label="Project Title" />
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <SortHeader column="owner" label="Owner" />
              </th>
              <th className={`px-6 py-4 text-center font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Progress
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Goal
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Raised
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
            {projects.length > 0 ? (
              projects.map(project => {
                const progress = getProgressPercentage(project.raised, project.goal);
                return (
                  <tr
                    key={project.id}
                    className={`border-b transition-colors hover:${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <td className={`px-6 py-4 font-medium ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      <div className="max-w-xs">
                        <p className="font-semibold">{project.title}</p>
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {project.category}
                        </p>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.owner}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className={`text-xs mt-1 font-semibold ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {progress}%
                        </p>
                      </div>
                    </td>
                    <td className={`px-6 py-4 font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Target size={16} />
                        ${project.goal}
                      </div>
                    </td>
                    <td className={`px-6 py-4 font-medium ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} />
                        ${project.raised}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        getStatusColor(project.status)
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {project.status === 'Active' && (
                          <>
                            <button
                              onClick={() => handleApprove(project.id)}
                              title="Mark as Approved"
                              className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleReject(project.id)}
                              title="Reject"
                              className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(project.id)}
                          title="Delete"
                          className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
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
                  No projects found
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
          Showing <span className="font-bold">{projects.length}</span> project{projects.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
