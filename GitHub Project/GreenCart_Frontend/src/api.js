import axios from "axios";

const API_URL = "http://localhost:8080/register";
const API_URL_1 = "http://localhost:8080/products";
const API_URL_2 = "http://localhost:8080/admin";
const API_URL_3 = "http://localhost:8080/events";
const API_URL_4 = "http://localhost:8080/orders";




export const signup = async (userData) => {
  return axios.post(`${API_URL}/signup`, userData);
};

export const login = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const Sellproducts = async (userData) => {
  return axios.post(`${API_URL_1}/add`, userData);
};

export const shop = async (userData) => {
  return axios.post(`${API_URL_1}/fetch`, userData);
};

export const adminsignup = async (userData) => {
  return axios.post(`${API_URL_2}/signup`, userData);
};

export const adminlogin = async (credentials) => {
  return axios.post(`${API_URL_2}/login`, credentials);
};

export const getEvents = async (credentials) => {
  return axios.get(`${API_URL_3}/fetch`, credentials);
};

export const addEvent = async (credentials) => {
  return axios.post(`${API_URL_3}/add`, credentials);
};

export const updateEvent = async (id,credentials) => {
  return axios.put(`${API_URL_3}/${id}`, credentials);
};

export const deleteEvent = async (id) => {
  return axios.delete(`${API_URL_3}/${id}`);
};

export const orders = async (credentials) => {
  return axios.post(`${API_URL_4}/add`,credentials);
};