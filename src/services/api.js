import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend server URL
});

// 🔹 Automatically attach token to every request if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =================== AUTH APIs =================== //

// 🔸 Register user (now includes name 👌)
export const registerUser = (userData) => API.post("/users/register", userData);

// 🔸 Login user
export const loginUser = (userData) => API.post("/users/login", userData);

// =================== PRODUCT APIs =================== //

// 🔸 Fetch all products (protected)
export const getProducts = () => API.get("/products");

// 🔸 Add new product (admin only)
export const addProduct = (productData) => API.post("/products", productData);
 
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);

// 🔸 Delete product
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// 🔸 Reduce stock when adding to cart
export const reduceStock = (id, quantity) => API.patch(`/products/${id}/reduce-stock`, { quantity });

// 🔸 Increase stock when removing from cart
export const increaseStock = (id, quantity) => API.patch(`/products/${id}/increase-stock`, { quantity });

export default API;
