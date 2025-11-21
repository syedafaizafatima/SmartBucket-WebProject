import api from './api';

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.dietaryTags) params.append('dietaryTags', filters.dietaryTags);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

  const response = await api.get(`/products?${params.toString()}`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const comparePrices = async (id) => {
  const response = await api.get(`/products/${id}/compare`);
  return response.data;
};

