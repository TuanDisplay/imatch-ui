import axios from 'axios';

const ideaRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_IDEA,
});

ideaRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export const get = async (path: string, options = {}) => {
  const response = await ideaRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, data = {}, options = {}) => {
  const response = await ideaRequest.post(path, data, options);
  return response.data;
};

export default ideaRequest;
