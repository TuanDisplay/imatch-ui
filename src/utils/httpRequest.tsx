import axios from 'axios';

const httpRequest = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL || 'https://jsonplaceholder.typicode.com',
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
