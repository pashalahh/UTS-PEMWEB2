import axios from 'axios';

const api = axios.create({
  baseURL: 'https://uts-pemweb-2-w4wu.vercel.app', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;