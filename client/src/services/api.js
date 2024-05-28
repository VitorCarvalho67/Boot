import axios from 'axios';

const server_url = 'http://localhost:3333/'
// const url = 'https://8f8cb937a1319a14d2b5c31410da01fd.serveo.net/'

const api = axios.create({
    baseURL: server_url
});

export default api;