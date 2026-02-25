// src/components/admin/AdminSidebar.jsx
import React from 'react';
import {
  LayoutDashboard, Users, FileText, Zap, MessageSquare,
  BarChart3, LogOut, ChevronRight, Menu, X
} from 'lucide-react';
import { t } from '../../utils/adminTranslations';

export default function AdminSidebar({ 
  currentPage, 
  setCurrentPage, 
  darkMode, 
  onLogout,
  isMobileOpen,
  setIsMobileOpen,
  language = 'ar'
}) {
  const menuItems = [
    { id: 'overview', label: t(language, 'overview'), icon: LayoutDashboard },
    { id: 'users', label: t(language, 'users'), icon: Users },
    { id: 'projects', label: t(language, 'projects'), icon: FileText },
    { id: 'donations', label: t(language, 'donations'), icon: Zap },
    { id: 'subscriptions', label: t(language, 'subscriptions'), icon: MessageSquare },
    { id: 'reports', label: t(language, 'reports'), icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`fixed md:hidden top-4 left-4 z-40 p-2 rounded-lg ${
          darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-screen transition-all duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${
          darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
        } border-r overflow-y-auto z-30`}
      >
        {/* Logo */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={24} className="text-white" />
            </div>
            <div>
              <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Admin
              </h2>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Panel
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight size={18} />}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>{t(language, 'logout')}</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
