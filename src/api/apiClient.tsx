import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://newsdata.io/api/1',
  timeout: 10000,
});