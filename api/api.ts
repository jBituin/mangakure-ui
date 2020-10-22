import httpClient from './httpClient';

const api = new httpClient();

api._baseURL = 'http://localhost:4000/manga';
api._headers = {
  accept: 'application/json',
};

export default api;
