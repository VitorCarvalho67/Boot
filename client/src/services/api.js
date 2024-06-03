import axios from 'axios';
import { server_url } from '../socket'

const api = axios.create({
    baseURL: server_url
});

export default api;