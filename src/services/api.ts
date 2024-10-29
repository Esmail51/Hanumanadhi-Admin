import axios from 'axios';

const api = axios.create({
//   baseURL: 'https://backend-esmails-projects.vercel.app',
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
