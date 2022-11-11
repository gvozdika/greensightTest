import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.API_HOST,
});

export default apiClient;
