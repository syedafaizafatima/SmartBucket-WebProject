import api from './api';

export const getRecipes = (params = {}) => {
  return api.get('/recipes', { params });
};

export const getRecipe = (id) => {
  return api.get(`/recipes/${id}`);
};

export const getRecommendedRecipes = () => {
  return api.get('/recipes/recommended');
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

