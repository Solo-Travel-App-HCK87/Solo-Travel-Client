import axios from 'axios';

const baseUrl = 'https://group-project.syhbsrc.site';

export const http = axios.create({
  baseURL: baseUrl,
});
