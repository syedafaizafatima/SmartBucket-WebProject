import api from './api';

export const getTransactions = (params = {}) => {
  return api.get('/transactions', { params });
};

export const getTransaction = (id) => {
  return api.get(`/transactions/${id}`);
};

export const createTransaction = (data) => {
  return api.post('/transactions', data);
};

export const getCashflowStatement = (params = {}) => {
  return api.get('/transactions/statement', { params });
};

export const downloadCashflowPDF = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // Open in new tab to trigger download
  window.open(`${apiUrl}/transactions/statement/pdf?${queryString}&token=${token}`, '_blank');
};

