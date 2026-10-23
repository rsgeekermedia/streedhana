import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // keep this if your backend uses cookies
});

// Optional: Request interceptor (if you add auth later)
api.interceptors.request.use(
  (config) => {
    // Example: attach token if stored
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor (central error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can globally handle 401, 500, etc.
    return Promise.reject(error);
  }
);

export default api;