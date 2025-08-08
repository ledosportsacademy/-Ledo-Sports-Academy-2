// API Service for Ledo Sports Academy

const API_BASE_URL = '/api';

// Generic API request function
async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Hero Slides API
const heroApi = {
  getAll: () => apiRequest('/heroes'),
  getById: (id) => apiRequest(`/heroes/${id}`),
  create: (data) => apiRequest('/heroes', 'POST', data),
  update: (id, data) => apiRequest(`/heroes/${id}`, 'PUT', data),
  delete: (id) => apiRequest(`/heroes/${id}`, 'DELETE')
};

// Activities API
const activityApi = {
  getAll: () => apiRequest('/activities'),
  getByStatus: (status) => apiRequest(`/activities/status/${status}`),
  getById: (id) => apiRequest(`/activities/${id}`),
  create: (data) => apiRequest('/activities', 'POST', data),
  update: (id, data) => apiRequest(`/activities/${id}`, 'PUT', data),
  delete: (id) => apiRequest(`/activities/${id}`, 'DELETE')
};

// Members API
const memberApi = {
  getAll: () => apiRequest('/members'),
  getById: (id) => apiRequest(`/members/${id}`),
  create: (data) => apiRequest('/members', 'POST', data),
  update: (id, data) => apiRequest(`/members/${id}`, 'PUT', data),
  delete: (id) => apiRequest(`/members/${id}`, 'DELETE')
};

// Donations API
const donationApi = {
  getAll: () => apiRequest('/donations'),
  getById: (id) => apiRequest(`/donations/${id}`),
  create: (data) => apiRequest('/donations', 'POST', data),
  update: (id, data) => apiRequest(`/donations/${id}`, 'PUT', data),
  delete: (id) => apiRequest(`/donations/${id}`, 'DELETE'),
  getTotal: () => apiRequest('/donations/stats/total')
};

// Expenses API
const expenseApi = {
  getAll: () => apiRequest('/expenses'),
  getByCategory: (category) => apiRequest(`/expenses/category/${category}`),
  getById: (id) => apiRequest(`/expenses/${id}`),
  create: (data) => apiRequest('/expenses', 'POST', data),
  update: (id, data) => apiRequest(`/expenses/${id}`, 'PUT', data),
  delete: (id) => apiRequest(`/expenses/${id}`, 'DELETE'),
  getTotal: () => apiRequest('/expenses/stats/total'),
  getByCategories: () => apiRequest('/expenses/stats/by-category')
};

// Experiences API
const experienceApi = {
  getAll: () => apiRequest('/experiences'),
  getById: (id) => apiRequest(`/experiences/${id}`),
  create: (data) => apiRequest('/experiences', 'POST', data),
  update: (id, data) => apiRequest(`/experiences/${id}`, 'PUT', data),
  delete: (id) => apiRequest(`/experiences/${id}`, 'DELETE')
};

// Weekly Fees API
const weeklyFeeApi = {
  getAll: () => apiRequest('/weekly-fees'),
  getByMember: (memberId) => apiRequest(`/weekly-fees/member/${memberId}`),
  create: (data) => apiRequest('/weekly-fees', 'POST', data),
  addPayment: (id, data) => apiRequest(`/weekly-fees/${id}/payments`, 'POST', data),
  updatePayment: (id, paymentId, data) => apiRequest(`/weekly-fees/${id}/payments/${paymentId}`, 'PUT', data),
  delete: (id) => apiRequest(`/weekly-fees/${id}`, 'DELETE'),
  getStats: () => apiRequest('/weekly-fees/stats/payments')
};

// Gallery API
const galleryApi = {
  getAll: () => apiRequest('/gallery'),
  getTop5: () => apiRequest('/gallery/top5'),
  getByAlbum: (album) => apiRequest(`/gallery/album/${album}`),
  getById: (id) => apiRequest(`/gallery/${id}`),
  create: (data) => apiRequest('/gallery', 'POST', data),
  update: (id, data) => apiRequest(`/gallery/${id}`, 'PUT', data),
  updateTop5: (id, data) => apiRequest(`/gallery/${id}/top5`, 'PUT', data),
  delete: (id) => apiRequest(`/gallery/${id}`, 'DELETE')
};

// Export all APIs
const api = {
  hero: heroApi,
  activity: activityApi,
  member: memberApi,
  donation: donationApi,
  expense: expenseApi,
  experience: experienceApi,
  weeklyFee: weeklyFeeApi,
  gallery: galleryApi
};