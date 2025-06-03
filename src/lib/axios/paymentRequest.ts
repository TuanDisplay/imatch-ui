import axios from 'axios';

const paymentRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_PAYMENT,
});

paymentRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await paymentRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await paymentRequest.post(path, data, options);
  return response.data;
};

export const put = async (path: string, data = {}, options = {}) => {
  const response = await paymentRequest.put(path, data, options);
  return response.data;
};

export default paymentRequest;
