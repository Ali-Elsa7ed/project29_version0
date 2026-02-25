// Admin utility functions for data management

export const adminUtils = {
  // ======== Users Management ========
  getAllUsers: () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  },

  getUserById: (userId) => {
    const users = adminUtils.getAllUsers();
    return users.find(u => u.id === userId);
  },

  deleteUser: (userId) => {
    const users = adminUtils.getAllUsers();
    const filtered = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(filtered));
    return true;
  },

  blockUser: (userId) => {
    const users = adminUtils.getAllUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.blocked = !user.blocked;
      localStorage.setItem('users', JSON.stringify(users));
    }
    return user;
  },

  promoteToAdmin: (userId) => {
    const users = adminUtils.getAllUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.type = 'admin';
      localStorage.setItem('users', JSON.stringify(users));
    }
    return user;
  },

  updateUser: (userId, updates) => {
    const users = adminUtils.getAllUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      Object.assign(user, updates);
      localStorage.setItem('users', JSON.stringify(users));
    }
    return user;
  },

  // ======== Projects Management ========
  getAllProjects: () => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    return projects;
  },

  deleteProject: (projectId) => {
    const projects = adminUtils.getAllProjects();
    const filtered = projects.filter(p => p.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(filtered));
    return true;
  },

  updateProjectStatus: (projectId, status) => {
    const projects = adminUtils.getAllProjects();
    const project = projects.find(p => p.id === projectId);
    if (project) {
      project.status = status;
      localStorage.setItem('projects', JSON.stringify(projects));
    }
    return project;
  },

  approveProject: (projectId) => {
    return adminUtils.updateProjectStatus(projectId, 'Active');
  },

  rejectProject: (projectId) => {
    return adminUtils.updateProjectStatus(projectId, 'Rejected');
  },

  // ======== Donations Management ========
  getAllDonations: () => {
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    return donations;
  },

  getDonationsByProject: (projectId) => {
    const donations = adminUtils.getAllDonations();
    return donations.filter(d => d.projectId === projectId);
  },

  getDonationsByUser: (userId) => {
    const donations = adminUtils.getAllDonations();
    return donations.filter(d => d.userId === userId);
  },

  getTotalDonationsByProject: (projectId) => {
    const donations = adminUtils.getDonationsByProject(projectId);
    return donations.reduce((sum, d) => sum + d.amount, 0);
  },

  // ======== Subscriptions Management ========
  getAllSubscriptions: () => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    return subscriptions;
  },

  getExpiredSubscriptions: () => {
    const subscriptions = adminUtils.getAllSubscriptions();
    return subscriptions.filter(s => new Date(s.expiryDate) < new Date());
  },

  getActiveSubscriptions: () => {
    const subscriptions = adminUtils.getAllSubscriptions();
    return subscriptions.filter(s => new Date(s.expiryDate) >= new Date());
  },

  renewSubscription: (subscriptionId) => {
    const subscriptions = adminUtils.getAllSubscriptions();
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    if (subscription) {
      const currentExpiry = new Date(subscription.expiryDate);
      const newExpiry = new Date(currentExpiry.getTime() + 30 * 24 * 60 * 60 * 1000);
      subscription.expiryDate = newExpiry.toISOString();
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
    return subscription;
  },

  // ======== Dashboard Statistics ========
  getDashboardStats: () => {
    const users = adminUtils.getAllUsers();
    const projects = adminUtils.getAllProjects();
    const donations = adminUtils.getAllDonations();
    const subscriptions = adminUtils.getAllSubscriptions();

    const owners = users.filter(u => u.type === 'owner').length;
    const totalDonationAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    const activeSubscriptions = adminUtils.getActiveSubscriptions().length;

    return {
      totalUsers: users.length,
      totalOwners: owners,
      totalProjects: projects.length,
      totalDonationAmount,
      totalDonations: donations.length,
      activeSubscriptions,
      blockedUsers: users.filter(u => u.blocked).length,
    };
  },

  // ======== Charts Data ========
  getDonationsPerDay: () => {
    const donations = adminUtils.getAllDonations();
    const dataMap = {};

    donations.forEach(d => {
      const date = new Date(d.date).toLocaleDateString('en-US');
      dataMap[date] = (dataMap[date] || 0) + d.amount;
    });

    return Object.entries(dataMap).map(([date, amount]) => ({
      date: new Date(date).getTime() > new Date().getTime() - 30 * 24 * 60 * 60 * 1000 ? date : null,
      amount
    })).filter(d => d.date !== null);
  },

  getProjectsPerCategory: () => {
    const projects = adminUtils.getAllProjects();
    const categoryMap = {};

    projects.forEach(p => {
      const category = p.category || 'Other';
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    return Object.entries(categoryMap).map(([category, count]) => ({
      category,
      count
    }));
  },

  // ======== Reports ========
  generateReport: () => {
    const users = adminUtils.getAllUsers();
    const projects = adminUtils.getAllProjects();
    const donations = adminUtils.getAllDonations();

    // Most funded project
    const mostFundedProject = projects.reduce((max, p) => 
      (p.raised > (max?.raised || 0)) ? p : max, null);

    // Top donor
    const donorMap = {};
    donations.forEach(d => {
      donorMap[d.userId] = (donorMap[d.userId] || 0) + d.amount;
    });
    const topDonorId = Object.entries(donorMap).reduce((max, [id, amount]) => 
      amount > (donorMap[max] || 0) ? id : max, null);
    const topDonor = topDonorId ? users.find(u => u.id == topDonorId) : null;

    // Most active owner
    const ownerProjectMap = {};
    projects.forEach(p => {
      ownerProjectMap[p.owner] = (ownerProjectMap[p.owner] || 0) + 1;
    });
    const mostActiveOwnerName = Object.entries(ownerProjectMap).reduce((max, [name, count]) => 
      count > (ownerProjectMap[max] || 0) ? name : max, null);

    return {
      generatedAt: new Date().toISOString(),
      mostFundedProject,
      topDonor,
      mostActiveOwnerName,
      stats: adminUtils.getDashboardStats(),
      totalRevenueFromSubscriptions: donations.reduce((sum, d) => sum + (d.amount * 0.1), 0),
    };
  },

  // ======== Search & Filter ========
  searchUsers: (query) => {
    const users = adminUtils.getAllUsers();
    const lowerQuery = query.toLowerCase();
    return users.filter(u => 
      u.name.toLowerCase().includes(lowerQuery) ||
      u.email.toLowerCase().includes(lowerQuery)
    );
  },

  searchProjects: (query) => {
    const projects = adminUtils.getAllProjects();
    const lowerQuery = query.toLowerCase();
    return projects.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.owner.toLowerCase().includes(lowerQuery)
    );
  },

  // ======== Export Functions ========
  exportToCSV: (data, filename) => {
    const csv = convertToCSV(data);
    downloadFile(csv, filename, 'text/csv');
  },

  exportToPDF: (report) => {
    // PDF export - basic
    let content = 'CROWDFUNDING PLATFORM - ADMIN REPORT\n';
    content += `Generated: ${new Date(report.generatedAt).toLocaleString()}\n\n`;
    content += '=== STATISTICS ===\n';
    content += `Total Users: ${report.stats.totalUsers}\n`;
    content += `Total Projects: ${report.stats.totalProjects}\n`;
    content += `Total Donations: ${report.stats.totalDonations}\n`;
    content += `Total Raised: $${report.stats.totalDonationAmount.toLocaleString()}\n`;
    content += `Active Subscriptions: ${report.stats.activeSubscriptions}\n\n`;
    content += '=== TOP PERFORMERS ===\n';
    if (report.mostFundedProject) {
      content += `Most Funded Project: ${report.mostFundedProject.title}\n`;
      content += `  Raised: $${report.mostFundedProject.raised}\n`;
    }
    if (report.topDonor) {
      content += `Top Donor: ${report.topDonor.name}\n`;
    }
    content += `Most Active Owner: ${report.mostActiveOwnerName || 'N/A'}\n`;

    downloadFile(content, filename, 'text/plain');
  },
};

// Helper functions
const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csv = [headers.join(',')];
  data.forEach(row => {
    csv.push(headers.map(h => JSON.stringify(row[h])).join(','));
  });
  return csv.join('\n');
};

const downloadFile = (content, filename, type) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:' + type + ';charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default adminUtils;
