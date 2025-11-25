import api from './api';

export const getDashboardStats = () => {
  return api.get('/admin/dashboard');
};

export const getUserAnalytics = () => {
  return api.get('/admin/analytics/users');
};

export const getSalesAnalytics = (params = {}) => {
  return api.get('/admin/analytics/sales', { params });
};

export const getInventoryAnalytics = () => {
  return api.get('/admin/analytics/inventory');
};

