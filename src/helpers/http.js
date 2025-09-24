import axios from 'axios';

const baseUrl = 'https://solo-travel.harryrismananda.site';

export const http = axios.create({
  baseURL: baseUrl,
});
