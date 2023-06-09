// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44335/api/v1',
    headers: { 'Content-type': 'application/json' }
});

export default api;
