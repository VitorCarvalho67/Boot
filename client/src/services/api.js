import axios from 'axios';
import alter from '../router/index.js';

const api = axios.create({
    // baseURL: 'https://ee96c1521b821e87285e37398926f1f3.serveo.net'
    baseURL: 'http://localhost:3333/'
});

export default api;