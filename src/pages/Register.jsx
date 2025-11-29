import React, { useState } from "react";
import { registerUser } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password });
      toast.success("🎉 Account created successfully!", { autoClose: 1500 });
      navigate("/login");
    } catch (error) {
      toast.error("❌ Registration failed! Try again.", { autoClose: 1500 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-xl rounded-xl p-8 w-96 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Join Medical Store and start shopping 🩺
        </p>

        {/* Name */}
        <label className="font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="border w-full p-2 mt-1 mb-4 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email */}
        <label className="font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="example@email.com"
          className="border w-full p-2 mt-1 mb-4 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <label className="font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Your password"
          className="border w-full p-2 mt-1 mb-6 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-lg transition duration-300 font-semibold"
        >
          Sign Up
        </button>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
