import api from './api';

export const getGroupBuys = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.product) params.append('product', filters.product);
  if (filters.category) params.append('category', filters.category);
  
  return await api.get(`/group-buys?${params.toString()}`);
};

export const getGroupBuy = async (id) => {
  return await api.get(`/group-buys/${id}`);
};

export const createGroupBuy = async (groupBuyData) => {
  return await api.post('/group-buys', groupBuyData);
};

export const updateGroupBuy = async (id, groupBuyData) => {
  return await api.put(`/group-buys/${id}`, groupBuyData);
};

export const deleteGroupBuy = async (id) => {
  return await api.delete(`/group-buys/${id}`);
};

export const joinGroupBuy = async (id, quantity = 1) => {
  return await api.post(`/group-buys/${id}/join`, { quantity });
};

export const leaveGroupBuy = async (id) => {
  return await api.post(`/group-buys/${id}/leave`);
};

export const getUserGroupBuys = async () => {
  return await api.get('/group-buys/user/me');
};

