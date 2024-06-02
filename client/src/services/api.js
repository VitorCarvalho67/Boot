import axios from 'axios';

// const server_url = 'https://775238df4fdf41270a2b5ee9721545f9.serveo.net';
const server_url = 'http://localhost:3333/';

const api = axios.create({
    baseURL: server_url
});

export default api;