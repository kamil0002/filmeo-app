import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers['Accept'] = 'application/json';

axios.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
//   config.headers.Auhtorization = token ? `Bearer ${token}` : '';
//   return config;
// });

export default axios;
