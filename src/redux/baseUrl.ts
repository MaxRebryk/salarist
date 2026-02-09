import axios from "axios";

export const setBaseUrl = (): void => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;
};

export const setAuthToken = (token: string): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthToken = (): void => {
  axios.defaults.headers.common.Authorization = "";
};

// "https://sallaristbackend.onrender.com/";
