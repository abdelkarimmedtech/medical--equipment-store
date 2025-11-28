import axios from "axios";

// Create an axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // 🔗 Backend base URL
});

// 🔒 Attach token to all requests if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ⬇️ API Methods

// 🆕 Register
export const registerUser = (data) => API.post("/users/register", data);

// 🔑 Login
export const loginUser = (data) => API.post("/users/login", data);

// 📦 Get products
export const getProducts = () => API.get("/products");

export default API;
