import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://536a8c3ee76a5fd349ca5407510dde345.serveo.net'
    baseURL: 'http://localhost:3333/'
});

export default api;