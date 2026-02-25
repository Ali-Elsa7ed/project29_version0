// src/components/LoginModal.jsx
import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, LogIn, User, ArrowRight, Shield } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLogin, onAdminLogin, darkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('الرجاء ملء جميع الحقول');
      return;
    }

    setIsLoading(true);
    // محاكاة تأخير للطلب
    setTimeout(() => {
      onLogin({ email, password });
      setIsLoading(false);
    }, 500);
  };

  // بيانات اختبار سريعة
  const quickLogin = (type) => {
    const credentials = {
      admin: { email: 'ali@admin.com', password: 'admin' },
      owner: { email: 'john@example.com', password: 'owner123' },
      user: { email: 'sarah@example.com', password: 'user123' }
    };
    
    const cred = credentials[type];
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
    
    // محاكاة تأخير قليل ثم تسجيل الدخول
    setTimeout(() => {
      setIsLoading(true);
      setTimeout(() => {
        onLogin(cred);
        setIsLoading(false);
      }, 500);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
          darkMode
            ? 'bg-gray-900 border border-gray-700'
            : 'bg-white border border-gray-200'
        }`}
      >
        {/* Gradient Background */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}
              >
                أهلاً بك
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                سجّل دخولك لاستكشاف المشاريع
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email Input */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className={`absolute left-3 top-3.5 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                كلمة المرور
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className={`absolute left-3 top-3.5 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-3.5 ${
                    darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              <LogIn size={18} />
              <span>{isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Admin Login Button */}
            {onAdminLogin && (
              <button
                type="button"
                onClick={onAdminLogin}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <Shield size={18} />
                <span>دخول المسؤول</span>
              </button>
            )}
          </form>

          {/* Info Message */}
          <div className={`mt-6 p-4 rounded-lg ${
            darkMode
              ? 'bg-blue-500/10 border border-blue-500/20'
              : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${
              darkMode ? 'text-blue-400' : 'text-blue-700'
            }`}>
              💡 <strong>استخدم بيانات حقيقية</strong> أو اضغط "دخول المسؤول" لصفحة الإدارة المنفصلة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
