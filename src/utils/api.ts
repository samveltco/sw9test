import axios from 'axios';

axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('jwtToken');
  config.headers.Authorization = token;
  return config;
});
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error?.response?.status === 401) {
    window.localStorage.removeItem('jwtToken');
    window.location.href = '/home';
  }
  throw new Error(error.response?.data?.message || error.message);
});
