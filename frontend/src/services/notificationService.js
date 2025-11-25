import api from './api';

export const getNotifications = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.read !== undefined) params.append('read', filters.read);
  if (filters.type) params.append('type', filters.type);
  if (filters.limit) params.append('limit', filters.limit);
  
  return await api.get(`/notifications?${params.toString()}`);
};

export const getNotification = async (id) => {
  return await api.get(`/notifications/${id}`);
};

export const createNotification = async (notificationData) => {
  return await api.post('/notifications', notificationData);
};

export const markAsRead = async (id) => {
  return await api.put(`/notifications/${id}/read`);
};

export const markAllAsRead = async () => {
  return await api.put('/notifications/read-all');
};

export const deleteNotification = async (id) => {
  return await api.delete(`/notifications/${id}`);
};

export const deleteAllNotifications = async () => {
  return await api.delete('/notifications');
};

export const getUnreadCount = async () => {
  return await api.get('/notifications/unread/count');
};

