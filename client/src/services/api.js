import axios from 'axios';

const api = axios.create({
    baseURL: 'https://6e6496e183ac88b221c87bbf5fc91620.serveo.net'
    // baseURL: 'http://localhost:3333/'
});

export default api;