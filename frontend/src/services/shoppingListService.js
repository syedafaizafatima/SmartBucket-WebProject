import api from './api';

export const getShoppingLists = async () => {
  const response = await api.get('/shopping-lists');
  return response.data;
};

export const getShoppingList = (id) => {
  return api.get(`/shopping-lists/${id}`);
};

export const createShoppingList = (data) => {
  return api.post('/shopping-lists', data);
};

export const generateAIShoppingList = async (data) => {
  const response = await api.post('/shopping-lists/generate-ai', data);
  return response.data;
};

export const updateShoppingList = (id, data) => {
  return api.put(`/shopping-lists/${id}`, data);
};

export const deleteShoppingList = (id) => {
  return api.delete(`/shopping-lists/${id}`);
};

