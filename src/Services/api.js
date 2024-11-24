import axios from 'axios';
const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchUsers = () => API.get("/users");
export const fetchPackages = () => API.get("/packages");
export const fetchTransactions = () => API.get("/transactions");
export const createTransaction = (data) => API.post("/transactions", data);