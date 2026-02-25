// src/components/admin/AdminDonations.jsx
import React, { useState, useMemo } from 'react';
import {
  Filter, Search, Download, Calendar, TrendingUp,
  ChevronUp, ChevronDown
} from 'lucide-react';
import adminUtils from '../../utils/adminUtils';
import { t } from '../../utils/adminTranslations';

export default function AdminDonations({ darkMode, language = 'ar' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const allDonations = useMemo(() => adminUtils.getAllDonations(), []);
  const allProjects = useMemo(() => adminUtils.getAllProjects(), []);
  const allUsers = useMemo(() => adminUtils.getAllUsers(), []);

  const donations = useMemo(() => {
    let filtered = [...allDonations];

    // Filter by project
    if (filterProject !== 'all') {
      filtered = filtered.filter(d => d.projectId == filterProject);
    }

    // Filter by user
    if (filterUser !== 'all') {
      filtered = filtered.filter(d => d.userId == filterUser);
    }

    // Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(d => {
        const user = allUsers.find(u => u.id == d.userId);
        const project = allProjects.find(p => p.id == d.projectId);
        return (user?.name.toLowerCase().includes(lowerQuery) ||
                user?.email.toLowerCase().includes(lowerQuery) ||
                project?.title.toLowerCase().includes(lowerQuery));
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [searchQuery, filterProject, filterUser, sortBy, sortOrder, allDonations, allProjects, allUsers]);

  const totalDonations = useMemo(() => 
    donations.reduce((sum, d) => sum + d.amount, 0), [donations]);

  const avgDonation = useMemo(() =>
    donations.length > 0 ? (totalDonations / donations.length).toFixed(2) : 0, [donations, totalDonations]);

  const donationsByProject = useMemo(() => {
    const map = {};
    allDonations.forEach(d => {
      const project = allProjects.find(p => p.id == d.projectId);
      const projectName = project?.title || 'Unknown Project';
      map[projectName] = (map[projectName] || 0) + d.amount;
    });
    return map;
  }, [allDonations, allProjects]);

  const SortHeader = ({ column, label }) => (
    <button
      onClick={() => {
        if (sortBy === column) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(column);
          setSortOrder(column === 'date' ? 'desc' : 'asc');
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

  const exportDonations = () => {
    const data = donations.map(d => {
      const user = allUsers.find(u => u.id == d.userId);
      const project = allProjects.find(p => p.id == d.projectId);
      return {
        'User': user?.name || 'N/A',
        'Email': user?.email || 'N/A',
        'Project': project?.title || 'N/A',
        'Amount': `$${d.amount}`,
        'Date': new Date(d.date).toLocaleDateString(),
      };
    });
    adminUtils.exportToCSV(data, 'donations-report.csv');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Donations Management
        </h1>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Track all donations and contributions
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
            Total Donations
          </p>
          <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {donations.length}
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
            Total Amount
          </p>
          <p className={`text-2xl font-bold mt-2 text-green-600`}>
            ${totalDonations.toLocaleString()}
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
            Average Donation
          </p>
          <p className={`text-2xl font-bold mt-2 text-blue-600`}>
            ${avgDonation}
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
            placeholder="Search by user, email, or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filter by Project */}
          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Filter by Project
            </label>
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className={`w-full mt-2 px-4 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Projects</option>
              {allProjects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by User */}
          <div>
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Filter by User
            </label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className={`w-full mt-2 px-4 py-2 rounded-lg border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Users</option>
              {allUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <div className="flex items-end">
            <button
              onClick={exportDonations}
              className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Donations Table */}
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
                Donor
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Email
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Project
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Amount
              </th>
              <th className={`px-6 py-4 text-left font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <SortHeader column="date" label="Date" />
              </th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation, idx) => {
                const user = allUsers.find(u => u.id == donation.userId);
                const project = allProjects.find(p => p.id == donation.projectId);
                return (
                  <tr
                    key={idx}
                    className={`border-b transition-colors hover:${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
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
                    <td className={`px-6 py-4 max-w-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <p className="truncate">{project?.title || 'Deleted Project'}</p>
                    </td>
                    <td className={`px-6 py-4 font-bold text-green-600`}>
                      ${donation.amount}
                    </td>
                    <td className={`px-6 py-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(donation.date).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className={`px-6 py-8 text-center ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  No donations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Top Projects by Amount */}
      <div
        className={`p-6 rounded-lg border ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <TrendingUp size={20} />
          Top Projects by Donations
        </h2>
        <div className="space-y-3">
          {Object.entries(donationsByProject)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([projectName, amount], idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {projectName}
                </span>
                <span className="font-bold text-green-600">
                  ${amount.toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
