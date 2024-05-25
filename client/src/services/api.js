import axios from 'axios';

const url = 'http://localhost:3333/'
// const url = 'https://536a8c3ee76a5fd349ca5407510dde345.serveo.net'

const api = axios.create({
    baseURL: url
});

export default api;