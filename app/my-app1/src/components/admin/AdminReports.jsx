// src/components/admin/AdminReports.jsx
import React, { useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Download, FileText, TrendingUp, Award, Star
} from 'lucide-react';
import adminUtils from '../../utils/adminUtils';
import { t } from '../../utils/adminTranslations';

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'];

export default function AdminReports({ darkMode, language = 'ar' }) {
  const report = useMemo(() => adminUtils.generateReport(), []);
  const stats = useMemo(() => adminUtils.getDashboardStats(), []);
  const donationsPerDay = useMemo(() => adminUtils.getDonationsPerDay(), []);
  const projectsPerCategory = useMemo(() => adminUtils.getProjectsPerCategory(), []);

  const downloadPDF = () => {
    adminUtils.exportToPDF(report);
  };

  const ReportCard = ({ icon: Icon, title, value, subtitle, color }) => (
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
            {title}
          </p>
          <p
            className={`text-3xl font-bold mt-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            {value}
          </p>
          {subtitle && (
            <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {subtitle}
            </p>
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1
            className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Reports & Analytics
          </h1>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive platform analytics and insights
          </p>
        </div>
        <button
          onClick={downloadPDF}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center gap-2"
        >
          <Download size={20} />
          Download PDF
        </button>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportCard
          icon={TrendingUp}
          title="Most Funded Project"
          value={report.mostFundedProject?.title.slice(0, 30) || 'N/A'}
          subtitle={report.mostFundedProject ? `$${report.mostFundedProject.raised} raised` : 'No projects'}
          color="bg-green-600"
        />
        <ReportCard
          icon={Award}
          title="Top Donor"
          value={report.topDonor?.name || 'N/A'}
          subtitle={report.topDonor ? `${report.topDonor.email}` : 'No donations'}
          color="bg-blue-600"
        />
        <ReportCard
          icon={Star}
          title="Most Active Owner"
          value={report.mostActiveOwnerName || 'N/A'}
          subtitle="Multiple projects"
          color="bg-purple-600"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Users
          </p>
          <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {report.stats.totalUsers}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Projects
          </p>
          <p className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {report.stats.totalProjects}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Raised
          </p>
          <p className={`text-2xl font-bold mt-2 text-green-600`}>
            ${(report.stats.totalDonationAmount / 1000).toFixed(1)}K
          </p>
        </div>
        <div
          className={`p-4 rounded-lg border ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Active Subs
          </p>
          <p className={`text-2xl font-bold mt-2 text-blue-600`}>
            {report.stats.activeSubscriptions}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Over Time */}
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
            Donations Trend
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
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Projects by Category */}
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
            Projects Distribution
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
                }}
              />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Report */}
      <div
        className={`p-6 rounded-lg border ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <h2
          className={`text-lg font-bold mb-6 flex items-center gap-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          <FileText size={20} />
          Report Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Platform Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Total Users:
                </span>
                <span className="font-bold">{report.stats.totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Project Owners:
                </span>
                <span className="font-bold">{report.stats.totalOwners}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Active Projects:
                </span>
                <span className="font-bold">{report.stats.totalProjects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Total Donations:
                </span>
                <span className="font-bold">{report.stats.totalDonations}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Total Raised:
                </span>
                <span className="font-bold text-green-600">
                  ${report.stats.totalDonationAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Subscription Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Active Subscriptions:
                </span>
                <span className="font-bold text-green-600">
                  {report.stats.activeSubscriptions}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Monthly Revenue:
                </span>
                <span className="font-bold text-blue-600">
                  ${report.totalRevenueFromSubscriptions.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Blocked Users:
                </span>
                <span className="font-bold text-red-600">
                  {report.stats.blockedUsers}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Report Generated:
                </span>
                <span className="font-bold text-xs">
                  {new Date(report.generatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`p-4 rounded-lg text-center ${
          darkMode
            ? 'bg-blue-900 border border-blue-800'
            : 'bg-blue-50 border border-blue-200'
        }`}
      >
        <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          Last updated: {new Date(report.generatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
