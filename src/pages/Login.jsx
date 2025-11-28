import React, { useState } from "react";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });

      // Save token & user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", response.data.user.name || "User");
      localStorage.setItem("role", response.data.user.role || "user");

      toast.success("🎉 Login successful!", { autoClose: 1500 });

      // 🎯 Redirect based on role
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (error) {
      toast.error("❌ Login failed! Check your credentials.", { autoClose: 1500 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
