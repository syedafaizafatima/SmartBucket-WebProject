import api from './api';

export const getBlogs = (params = {}) => {
  return api.get('/blogs', { params });
};

export const getFeaturedBlogs = () => {
  return api.get('/blogs/featured');
};

export const getBlog = (id) => {
  return api.get(`/blogs/${id}`);
};

export const createBlog = (data) => {
  return api.post('/blogs', data);
};

export const updateBlog = (id, data) => {
  return api.put(`/blogs/${id}`, data);
};

export const deleteBlog = (id) => {
  return api.delete(`/blogs/${id}`);
};

