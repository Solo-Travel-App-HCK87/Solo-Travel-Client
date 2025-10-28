import axios from 'axios';

const baseUrl = 'https://ip-p2.bluecoree.site';

export const http = axios.create({
  baseURL: baseUrl,
});
