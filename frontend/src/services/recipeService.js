import api from './api';

export const getRecipes = async (params = {}) => {
  const response = await api.get('/recipes', { params });
  return response.data;
};

export const getRecipe = async (id) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

export const getRecommendedRecipes = async () => {
  const response = await api.get('/recipes/recommended');
  return response.data;
};

export const createRecipe = (data) => {
  return api.post('/recipes', data);
};

export const updateRecipe = (id, data) => {
  return api.put(`/recipes/${id}`, data);
};

export const deleteRecipe = (id) => {
  return api.delete(`/recipes/${id}`);
};

