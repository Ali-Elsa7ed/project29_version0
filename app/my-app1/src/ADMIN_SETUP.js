// Admin Dashboard - Quick Start Setup

/*
====================================================================
ADMIN DASHBOARD - QUICK START SETUP
====================================================================

Follow these steps to quickly test the complete admin dashboard!

====================================================================
STEP 1: CREATE TEST ADMIN USER
====================================================================

1. Go to your app and login page
2. Open browser DevTools (F12)
3. Go to Console tab
4. Paste this code and press Enter:

*/

// ───────────────────────────────────────────────────
// SETUP CODE - Run in Browser Console
// ───────────────────────────────────────────────────

function setupAdminDashboard() {
  // Sample Users
  const users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      type: 'admin',
      balance: 10000,
      points: 5000,
      notifications: [],
      blocked: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'John Owner',
      email: 'john@example.com',
      password: 'owner123',
      type: 'owner',
      balance: 2500,
      points: 150,
      notifications: [],
      blocked: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Sarah User',
      email: 'sarah@example.com',
      password: 'user123',
      type: 'user',
      balance: 500,
      points: 45,
      notifications: [],
      blocked: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Mike Owner',
      email: 'mike@example.com',
      password: 'owner123',
      type: 'owner',
      balance: 3500,
      points: 200,
      notifications: [],
      blocked: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Emma User',
      email: 'emma@example.com',
      password: 'user123',
      type: 'user',
      balance: 1200,
      points: 80,
      notifications: [],
      blocked: false,
      createdAt: new Date().toISOString(),
    },
  ];

  // Sample Projects
  const projects = [
    {
      id: 1,
      title: 'Food Delivery App',
      description: 'Smart platform connecting local restaurants',
      category: 'Technology',
      goal: 50000,
      raised: 32000,
      owner: 'John Owner',
      backers: 156,
      status: 'Active',
      daysLeft: 15,
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2',
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      title: 'Organic Farming Project',
      description: 'Fresh organic vegetables for the community',
      category: 'Agriculture',
      goal: 30000,
      raised: 28500,
      owner: 'Mike Owner',
      backers: 89,
      status: 'Active',
      daysLeft: 5,
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      title: 'Handcraft Workshop',
      description: 'Empowering women through traditional crafts',
      category: 'Crafts',
      goal: 20000,
      raised: 12000,
      owner: 'John Owner',
      backers: 67,
      status: 'Active',
      daysLeft: 22,
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      title: 'Bookstore & Cafe',
      description: 'Cultural space combining books and coffee',
      category: 'Culture',
      goal: 40000,
      raised: 15000,
      owner: 'Mike Owner',
      backers: 92,
      status: 'Completed',
      daysLeft: 30,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 5,
      title: 'Mobile App Development',
      description: 'Innovative mobile solutions',
      category: 'Technology',
      goal: 60000,
      raised: 25000,
      owner: 'John Owner',
      backers: 120,
      status: 'Expired',
      daysLeft: 0,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Sample Donations
  const donations = [
    {
      id: 1,
      userId: 3,
      projectId: 1,
      amount: 500,
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      userId: 5,
      projectId: 1,
      amount: 1000,
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      userId: 3,
      projectId: 2,
      amount: 2000,
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      userId: 5,
      projectId: 1,
      amount: 1500,
      date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 5,
      userId: 3,
      projectId: 2,
      amount: 3000,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 6,
      userId: 5,
      projectId: 3,
      amount: 800,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 7,
      userId: 3,
      projectId: 1,
      amount: 1200,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 8,
      userId: 5,
      projectId: 2,
      amount: 2500,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 9,
      userId: 3,
      projectId: 4,
      amount: 1000,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 10,
      userId: 5,
      projectId: 1,
      amount: 5000,
      date: new Date().toISOString(),
    },
  ];

  // Sample Subscriptions
  const subscriptions = [
    {
      id: 1,
      userId: 2,
      plan: 'pro',
      startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      userId: 3,
      plan: 'basic',
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      userId: 4,
      plan: 'premium',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      userId: 5,
      plan: 'pro',
      startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Expired
    },
    {
      id: 5,
      userId: 2,
      plan: 'basic',
      startDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      expiryDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // Expired
    },
  ];

  // Save to LocalStorage
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('projects', JSON.stringify(projects));
  localStorage.setItem('donations', JSON.stringify(donations));
  localStorage.setItem('subscriptions', JSON.stringify(subscriptions));

  console.log('✅ Admin Dashboard Test Data Loaded!');
  console.log('📋 Users:', users.length);
  console.log('📊 Projects:', projects.length);
  console.log('💰 Donations:', donations.length);
  console.log('🔄 Subscriptions:', subscriptions.length);
  console.log('\n🔑 Login Credentials:');
  console.log('   Email: admin@example.com');
  console.log('   Password: admin123');
  console.log('   Type: admin');
}

// Run the setup
setupAdminDashboard();

/*
====================================================================
STEP 2: LOGIN AS ADMIN
====================================================================

1. Click the Login button
2. Use these credentials:
   - Email: admin@example.com
   - Password: admin123

====================================================================
STEP 3: ACCESS ADMIN DASHBOARD
====================================================================

1. After logging in, look for "Admin Panel" button
2. Click it to enter the admin dashboard
3. You should see the sidebar with 6 menu items:
   - Dashboard
   - Users
   - Projects
   - Donations
   - Subscriptions
   - Reports

====================================================================
WHAT YOU CAN DO:
====================================================================

DASHBOARD:
✓ View all key statistics
✓ See trends with charts
✓ Monitor platform health

USERS:
✓ Search for users
✓ Filter by type
✓ Promote users to admin
✓ Block/Unblock users
✓ Delete users

PROJECTS:
✓ Search projects
✓ Filter by status
✓ Approve projects
✓ Reject projects
✓ Delete projects

DONATIONS:
✓ View donation history
✓ Filter by project or user
✓ Search donations
✓ Export as CSV
✓ View top projects

SUBSCRIPTIONS:
✓ View all subscriptions
✓ See expired subscriptions
✓ Renew subscriptions
✓ Export as CSV

REPORTS:
✓ View top performers
✓ See platform statistics
✓ View charts and trends
✓ Download reports

====================================================================
ADDITIONAL USERS FOR TESTING:
====================================================================

Owner (Project Creator):
- Email: john@example.com
- Password: owner123
- Type: owner
- Has projects in the system

Regular User:
- Email: sarah@example.com
- Password: user123
- Type: user
- Can donate to projects

====================================================================
SAMPLE DATA INCLUDED:
====================================================================

✓ 5 Users (1 admin, 2 owners, 2 regular users)
✓ 5 Projects (various states: Active, Expired, Completed)
✓ 10 Donations across projects
✓ 5 Subscriptions (some active, some expired)

====================================================================
DARK MODE:
====================================================================

Toggle dark mode using the moon/sun icon in the navbar.
Admin dashboard fully supports both light and dark modes!

====================================================================
TROUBLESHOOTING:
====================================================================

Problem: Still on home page after login
- Verify you're logged in as admin@example.com
- Check user type is 'admin' in console: localStorage.getItem('users')
- Admin button should appear in navbar

Problem: No data in dashboard
- Run setupAdminDashboard() again in console
- Check all data keys existed: users, projects, donations, subscriptions
- Refresh browser (Ctrl+F5)

Problem: Charts not showing
- Recharts should be installed (it is by default)
- Check browser console for errors
- Refresh the page

====================================================================
NEXT STEPS:
====================================================================

1. Test all features by exploring each section
2. Try different filters and searches
3. Export data as CSV
4. Test delete operations
5. Try promoting users to admin
6. Toggle dark mode
7. Test on mobile (responsive design)

====================================================================
CODE MODIFICATIONS:
====================================================================

To integrate with your existing data:

1. Remove setupAdminDashboard() call (it's just for testing)
2. Ensure your data follows the LocalStorage structure:
   - users, projects, donations, subscriptions keys
3. Make sure user.type values are: 'user', 'owner', or 'admin'

The admin dashboard will automatically work with your existing data!

====================================================================
*/

console.log('💡 Admin Dashboard Setup Complete!');
console.log('Run: setupAdminDashboard() to load test data');
