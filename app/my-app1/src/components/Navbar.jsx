import React from 'react';
import { Sun, Moon, Heart, Settings, Plus, Bell, User, LogOut, LogIn, Target, Shield } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, currentUser, setCurrentUser, view, setView, favorites = [] }) {
  return (
    <nav role="navigation" aria-label="الشريط العلوي الرئيسي" className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button type="button" aria-label="الانتقال إلى الصفحة الرئيسية" onClick={() => setView('home')} className="flex items-center gap-3 cursor-pointer">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>منصة المشاريع</h1>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-transform`}
              title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
              aria-pressed={darkMode}
              aria-label={darkMode ? 'تبديل إلى الوضع النهاري' : 'تبديل إلى الوضع الليلي'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* زر حول المنصة */}
            <button
              type="button"
              onClick={() => setView('about')}
              className={`hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${view === 'about' ? 'bg-gray-200 text-gray-900' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              title="حول المنصة"
              aria-label="حول المنصة"
            >
              حول
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* زر المفضلة */}
                <button
                  type="button"
                  onClick={() => setView('favorites')}
                  className={`relative p-2 rounded-lg transition-colors ${view === 'favorites' ? 'bg-red-100 text-red-600' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  title="المفضلة"
                  aria-label={`المفضلة، ${favorites.length} عناصر`}
                >
                  <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-current' : ''}`} />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold" aria-hidden="true">
                      {favorites.length}
                    </span>
                  )}
                </button>

                {/* أزرار أصحاب المشاريع */}
                {currentUser.type === 'owner' && (
                  <>
                    <button
                      onClick={() => setView('dashboard')}
                      className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'dashboard' ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      title="لوحة التحكم"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="hidden lg:inline">لوحة التحكم</span>
                    </button>

                    <button
                      onClick={() => setView('add-project')}
                      className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                      title="إضافة مشروع"
                    >
                      <Plus className="w-5 h-5" />
                      <span className="hidden md:inline">إضافة مشروع</span>
                    </button>
                  </>
                )}

                {/* زر Admin Panel */}
                {currentUser.type === 'admin' && (
                  <button
                    onClick={() => setView('admin')}
                    className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'admin' ? 'bg-red-600 text-white' : darkMode ? 'bg-gray-700 text-red-400 hover:bg-red-600 hover:text-white' : 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white'}`}
                    title="Admin Panel"
                  >
                    <Shield className="w-5 h-5" />
                    <span className="hidden lg:inline">Admin Panel</span>
                  </button>
                )}

                {/* زر الإشعارات */}
                <button
                  type="button"
                  onClick={() => setView('notifications')}
                  className={`relative p-2 rounded-lg transition-colors ${view === 'notifications' ? 'bg-blue-100 text-blue-600' : darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  title="الإشعارات"
                  aria-label={`الإشعارات، ${ (currentUser.notifications||[]).filter(n=>!n.read).length } غير مقروءة`}
                >
                  <Bell className="w-5 h-5" />
                  {(currentUser.notifications||[]).filter(n=>!n.read).length > 0 && (
                    <>
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold" aria-hidden="true">
                        {(currentUser.notifications||[]).filter(n=>!n.read).length}
                      </span>
                      <span className="sr-only">{(currentUser.notifications||[]).filter(n=>!n.read).length} إشعارات غير مقروءة</span>
                    </>
                  )}
                </button>

                {/* زر الإعدادات */}
                <button
                  type="button"
                  onClick={() => setView('settings')}
                  className={`p-2 rounded-lg transition-colors ${view === 'settings' ? 'bg-purple-100 text-purple-600' : darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                  title="الإعدادات"
                  aria-label="الإعدادات"
                >
                  <Settings className="w-5 h-5" />
                </button>

                {/* معلومات المستخدم */}
                <button type="button" aria-label="عرض معلومات المستخدم" onClick={() => setView('settings')} className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <User className="w-5 h-5" />
                  <div className="flex flex-col leading-none">
                    <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{currentUser.name}</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{currentUser.points || 0} نقاط</span>
                  </div>
                </button>

                {/* زر تسجيل الخروج */}
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('currentUser');
                    setCurrentUser(null);
                    setView('home');
                  }}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-red-600' : 'bg-gray-100 hover:bg-red-500 hover:text-white'}`}
                  title="تسجيل الخروج"
                  aria-label="تسجيل الخروج"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={()=>setView('login')}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                aria-label="تسجيل الدخول"
              >
                <LogIn className="w-5 h-5" />
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
