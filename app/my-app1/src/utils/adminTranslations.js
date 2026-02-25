// src/utils/adminTranslations.js - ترجمات لوحة التحكم

export const adminTranslations = {
  ar: {
    // الشريط الجانبي
    dashboard: 'لوحة التحكم',
    overview: 'نظرة عامة',
    users: 'المستخدمين',
    projects: 'المشاريع',
    donations: 'التبرعات',
    subscriptions: 'الاشتراكات',
    reports: 'التقارير',
    logout: 'تسجيل الخروج',
    
    // النظرة العامة
    totalUsers: 'إجمالي المستخدمين',
    totalProjects: 'إجمالي المشاريع',
    totalDonations: 'إجمالي التبرعات',
    activeSubscriptions: 'الاشتراكات النشطة',
    totalOwners: 'إجمالي المالكين',
    blockedUsers: 'المستخدمين المحظورين',
    revenueThisMonth: 'الإيراد هذا الشهر',
    platformStatus: 'حالة المنصة',
    
    // جدول المستخدمين
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    type: 'النوع',
    balance: 'الرصيد',
    points: 'النقاط',
    actions: 'الإجراءات',
    promote: 'ترقية',
    block: 'حظر',
    delete: 'حذف',
    search: 'بحث...',
    user: 'مستخدم',
    owner: 'مالك',
    admin: 'مسؤول',
    
    // جدول المشاريع
    projectTitle: 'عنوان المشروع',
    category: 'الفئة',
    goal: 'الهدف',
    raised: 'المبلغ المجموع',
    backers: 'الداعمون',
    status: 'الحالة',
    progress: 'التقدم',
    owner: 'المالك',
    approve: 'موافقة',
    reject: 'رفض',
    active: 'نشط',
    completed: 'مكتمل',
    expired: 'منتهي الصلاحية',
    
    // جدول التبرعات
    donor: 'المتبرع',
    amount: 'المبلغ',
    date: 'التاريخ',
    project: 'المشروع',
    totalCount: 'إجمالي التبرعات',
    totalAmount: 'إجمالي المبلغ',
    averageDonation: 'متوسط التبرع',
    
    // جدول الاشتراكات
    plan: 'الخطة',
    startDate: 'تاريخ البداية',
    expiryDate: 'تاريخ الانتهاء',
    daysLeft: 'الأيام المتبقية',
    renew: 'تجديد',
    
    // الإجراءات العامة
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    export: 'تصدير',
    filter: 'تصفية',
    sort: 'ترتيب',
    refresh: 'تحديث',
    language: 'اللغة',
    darkMode: 'الوضع الليلي',
    lightMode: 'الوضع الفاتح',
    selectAll: 'اختيار الكل',
    clearFilters: 'مسح المرشحات',
    
    // الرسائل
    confirmDelete: 'هل أنت متأكد من الحذف؟',
    deleteSuccess: 'تم الحذف بنجاح',
    updateSuccess: 'تم التحديث بنجاح',
    errorMessage: 'حدث خطأ. يرجى المحاولة لاحقاً',
    noDataFound: 'لا توجد بيانات',
    success: 'تم بنجاح',
    error: 'خطأ',
  },
  en: {
    // Sidebar
    dashboard: 'Dashboard',
    overview: 'Overview',
    users: 'Users',
    projects: 'Projects',
    donations: 'Donations',
    subscriptions: 'Subscriptions',
    reports: 'Reports',
    logout: 'Logout',
    
    // Overview
    totalUsers: 'Total Users',
    totalProjects: 'Total Projects',
    totalDonations: 'Total Donations',
    activeSubscriptions: 'Active Subscriptions',
    totalOwners: 'Total Owners',
    blockedUsers: 'Blocked Users',
    revenueThisMonth: 'Revenue This Month',
    platformStatus: 'Platform Status',
    
    // Users Table
    name: 'Name',
    email: 'Email',
    type: 'Type',
    balance: 'Balance',
    points: 'Points',
    actions: 'Actions',
    promote: 'Promote',
    block: 'Block',
    delete: 'Delete',
    search: 'Search...',
    user: 'User',
    owner: 'Owner',
    admin: 'Admin',
    
    // Projects Table
    projectTitle: 'Project Title',
    category: 'Category',
    goal: 'Goal',
    raised: 'Raised',
    backers: 'Backers',
    status: 'Status',
    progress: 'Progress',
    owner: 'Owner',
    approve: 'Approve',
    reject: 'Reject',
    active: 'Active',
    completed: 'Completed',
    expired: 'Expired',
    
    // Donations Table
    donor: 'Donor',
    amount: 'Amount',
    date: 'Date',
    project: 'Project',
    totalCount: 'Total Donations',
    totalAmount: 'Total Amount',
    averageDonation: 'Average Donation',
    
    // Subscriptions Table
    plan: 'Plan',
    startDate: 'Start Date',
    expiryDate: 'Expiry Date',
    daysLeft: 'Days Left',
    renew: 'Renew',
    
    // General Actions
    confirm: 'Confirm',
    cancel: 'Cancel',
    export: 'Export',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    selectAll: 'Select All',
    clearFilters: 'Clear Filters',
    
    // Messages
    confirmDelete: 'Are you sure you want to delete?',
    deleteSuccess: 'Deleted successfully',
    updateSuccess: 'Updated successfully',
    errorMessage: 'An error occurred. Please try again later',
    noDataFound: 'No data found',
    success: 'Success',
    error: 'Error',
  }
};

export const t = (lang, key) => {
  return adminTranslations[lang]?.[key] || key;
};
