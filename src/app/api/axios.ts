import axios from 'axios';
const BASE_URL = 'https://article-bcss.onrender.com/api';

export default axios.create({
    baseURL: BASE_URL
});