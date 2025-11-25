import api from './api';

export const getShoppingLists = () => {
  return api.get('/shopping-lists');
};

export const getShoppingList = (id) => {
  return api.get(`/shopping-lists/${id}`);
};

export const createShoppingList = (data) => {
  return api.post('/shopping-lists', data);
};

export const generateAIShoppingList = (data) => {
  return api.post('/shopping-lists/generate-ai', data);
};

export const updateShoppingList = (id, data) => {
  return api.put(`/shopping-lists/${id}`, data);
};

export const deleteShoppingList = (id) => {
  return api.delete(`/shopping-lists/${id}`);
};

