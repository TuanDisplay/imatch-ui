import axios from 'axios';

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

httpRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await httpRequest.post(path, data, options);
  return response.data;
};

export default httpRequest;
