import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Accept'] = 'application/json';
// axios.interceptors.request.use(function (cfg) {
//   const token = localStorage.getItem('token');
//   cfg.headers.Auhtorization = token ? `Bearer ${token}` : '';
//   return cfg;
// });

export default axios;
