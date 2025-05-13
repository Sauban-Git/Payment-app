import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function CreateAccount() {
  const url = import.meta.env.VITE_BE_URL;
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function createAccount() {
    setLoading(true);
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(
        `${url}/user/signup`,
        { firstName, lastName, username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.token;
      storeAuth(token);

      // Clear fields
      usernameRef.current.value = "";
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      passwordRef.current.value = "";

      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please check your input.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Create Account</h2>

        <div className="space-y-4">
          <input
            ref={firstNameRef}
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            ref={lastNameRef}
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            ref={usernameRef}
            type="text"
            placeholder="Email or Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password (min 6 characters)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={createAccount}
            disabled={loading}
            className={`w-full py-2 mt-4 font-semibold rounded-lg transition-colors ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Creating..." : "Submit"}
          </button>
        </div>

        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function storeAuth(token) {
  localStorage.setItem("token", token);
}
