import api from './api';

export const getProductReviews = async (productId) => {
  return await api.get(`/reviews/product/${productId}`);
};

export const getReview = async (reviewId) => {
  return await api.get(`/reviews/${reviewId}`);
};

export const createReview = async (reviewData) => {
  return await api.post('/reviews', reviewData);
};

export const updateReview = async (reviewId, reviewData) => {
  return await api.put(`/reviews/${reviewId}`, reviewData);
};

export const deleteReview = async (reviewId) => {
  return await api.delete(`/reviews/${reviewId}`);
};

export const markReviewHelpful = async (reviewId) => {
  return await api.put(`/reviews/${reviewId}/helpful`);
};

export const getUserReviews = async () => {
  return await api.get('/reviews/user/me');
};

