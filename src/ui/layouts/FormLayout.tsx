import React, { useState } from "react";
import { ApiAuth } from "@/utils/services/Auth.service"; // Sesuaikan dengan path ke ApiAuth service

const FormLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = { email, password };
      const response = await ApiAuth.login(data);

      // Assuming the API response contains the token or user data
      localStorage.setItem("token", response.token); // Store the token if needed
      // Redirect or handle login success here, for example:
      window.location.href = "/"; // Sesuaikan dengan tujuan setelah login sukses
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-600">
            Welcome back, please sign in to continue
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor-oranye"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor-oranye"
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-md text-white font-semibold ${
              loading
                ? "bg-gray-400"
                : "bg-customColor-oranye hover:bg-orange-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormLayout;
