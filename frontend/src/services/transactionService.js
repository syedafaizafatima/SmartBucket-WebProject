import api from './api';

export const getTransactions = async (params = {}) => {
  const response = await api.get('/transactions', { params });
  return response.data;
};

export const getTransaction = (id) => {
  return api.get(`/transactions/${id}`);
};

export const createTransaction = (data) => {
  return api.post('/transactions', data);
};

export const getCashflowStatement = async (params = {}) => {
  const response = await api.get('/transactions/statement', { params });
  return response.data;
};

// ✅ Fixed: use axios instance with Authorization header and get a blob
export const downloadCashflowPDF = (params = {}) => {
  return api.get('/transactions/statement/pdf', {
    params,
    responseType: 'blob', // tell axios we're expecting a PDF
  });
};
