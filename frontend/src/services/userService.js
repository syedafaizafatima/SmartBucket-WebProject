import api from './api';

export const getUserProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.put('/auth/updateprofile', userData);
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await api.put('/auth/updatepassword', passwordData);
  return response.data;
};

// Admin functions
export const getAllUsers = () => {
  return api.get('/users');
};

export const getUser = (id) => {
  return api.get(`/users/${id}`);
};

export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

