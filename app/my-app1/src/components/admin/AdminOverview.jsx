// src/components/admin/AdminOverview.jsx
import React, { useMemo } from 'react';
import {
  Users, FileText, Zap, DollarSign, TrendingUp, Lock, Activity,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import adminUtils from '../../utils/adminUtils';
import { t } from '../../utils/adminTranslations';

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'];

export default function AdminOverview({ darkMode, language = 'ar' }) {
  const stats = useMemo(() => adminUtils.getDashboardStats(), []);
  const donationsPerDay = useMemo(() => adminUtils.getDonationsPerDay(), []);
  const projectsPerCategory = useMemo(() => adminUtils.getProjectsPerCategory(), []);

  const StatCard = ({ icon: Icon, label, value, change, color }) => (
    <div
      className={`p-6 rounded-lg border ${
        darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {label}
          </p>
          <p
            className={`text-3xl font-bold mt-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {typeof value === 'number' && value > 1000
              ? `$${(value / 1000).toFixed(1)}K`
              : value}
          </p>
          {change && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm font-medium ${
                change > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change > 0 ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              <span>{Math.abs(change)}% from last month</span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${color}`}
        >
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Admin Dashboard
        </h1>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Welcome back! Here's your platform overview.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats.totalUsers}
          change={12}
          color="bg-blue-600"
        />
        <StatCard
          icon={FileText}
          label="Total Projects"
          value={stats.totalProjects}
          change={8}
          color="bg-purple-600"
        />
        <StatCard
          icon={DollarSign}
          label="Total Raised"
          value={stats.totalDonationAmount}
          change={15}
          color="bg-green-600"
        />
        <StatCard
          icon={Zap}
          label="Total Donations"
          value={stats.totalDonations}
          change={-3}
          color="bg-yellow-600"
        />
        <StatCard
          icon={Users}
          label="Project Owners"
          value={stats.totalOwners}
          change={5}
          color="bg-pink-600"
        />
        <StatCard
          icon={Activity}
          label="Active Subscriptions"
          value={stats.activeSubscriptions}
          change={20}
          color="bg-cyan-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Per Day - Line Chart */}
        <div
          className={`p-6 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2
            className={`text-lg font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Donations Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationsPerDay}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? '#374151' : '#E5E7EB'}
              />
              <XAxis
                stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                  color: darkMode ? '#F3F4F6' : '#111827',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                dot={{ fill: '#3B82F6' }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Projects Per Category - Bar Chart */}
        <div
          className={`p-6 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <h2
            className={`text-lg font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Projects by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectsPerCategory}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? '#374151' : '#E5E7EB'}
              />
              <XAxis
                dataKey="category"
                stroke={darkMode ? '#9CA3AF' : '#6B7280'}
              />
              <YAxis stroke={darkMode ? '#9CA3AF' : '#6B7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                  color: darkMode ? '#F3F4F6' : '#111827',
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
            >
              Platform Status
            </h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Active Users
              </span>
              <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {stats.totalUsers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Blocked Users
              </span>
              <span className={`font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                {stats.blockedUsers}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-700">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                System Health
              </span>
              <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                100%
              </span>
            </div>
          </div>
        </div>

        <div
          className={`p-6 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <h3
            className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors text-left"
            >
              + Create Announcement
            </button>
            <button
              className="w-full px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors text-left"
            >
              + Send Email Campaign
            </button>
            <button
              className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors text-left"
            >
              + Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
