import api from './api';

export const getSubscriptions = () => {
  return api.get('/subscriptions');
};

export const getSubscription = (id) => {
  return api.get(`/subscriptions/${id}`);
};

export const createSubscription = (data) => {
  return api.post('/subscriptions', data);
};

export const updateSubscription = (id, data) => {
  return api.put(`/subscriptions/${id}`, data);
};

export const pauseSubscription = (id) => {
  return api.put(`/subscriptions/${id}/pause`);
};

export const resumeSubscription = (id) => {
  return api.put(`/subscriptions/${id}/resume`);
};

export const deleteSubscription = (id) => {
  return api.delete(`/subscriptions/${id}`);
};

