import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function UserSignin() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BE_URL;
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  async function loginUser() {
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/user/signin`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, msg } = response.data;
      if (!token) {
        alert(msg || "Login failed.");
      } else {
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Sign In to Your Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email"
            ref={usernameRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={loginUser}
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login to your account"}
          </button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Create account
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
