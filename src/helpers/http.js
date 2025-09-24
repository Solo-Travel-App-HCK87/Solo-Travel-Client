import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const http = axios.create({
  baseURL: baseUrl,
});
