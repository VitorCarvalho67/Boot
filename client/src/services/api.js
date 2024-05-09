import axios from 'axios';

const api = axios.create({
    baseURL: 'https://f2fdbb955859cc9a90251287b3a788da.serveo.net/'
    // baseURL: 'http://localhost:3333/'
});

export default api;