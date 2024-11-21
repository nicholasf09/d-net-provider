import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

export const loginUser = (credentials) => API.post('/users', credentials);
export const fetchCustomers = () => API.get('/customers');
export const addTransaction = (data) => API.post('/transactions', data);