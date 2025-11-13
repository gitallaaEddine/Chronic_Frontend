// src/api/apiClient.js
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACK_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CRITICAL for httpOnly cookies
  timeout: 10000,
});
