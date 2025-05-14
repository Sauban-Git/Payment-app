import { useRecoilValue } from "recoil";
import { recieverAtom } from "../atoms/account";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function SendConfirm() {
  const url = import.meta.env.VITE_BE_URL;
  const navigate = useNavigate();
  const amountRef = useRef();
  const toAccount = useRecoilValue(recieverAtom);
  const token = localStorage.getItem("token");
  const [transferSuccess, setTransferSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  async function sendMoney() {
    const amount = parseFloat(amountRef.current.value);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/account/transfer`,
        {
          toAccount: toAccount._id,
          amount: amountRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setTransferSuccess(true);
      } else {
        setTransferSuccess(false);
        alert(response.data.msg || "Transfer failed");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setTransferSuccess(false);
      alert("An error occurred during transfer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-xl border"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Confirm Transfer
      </h2>

      <div className="bg-blue-50 p-4 rounded-lg mb-4 shadow-inner">
        <p className="text-lg font-medium text-blue-800">
          Sending to:
          <span className="ml-2 font-semibold text-blue-900">
            {toAccount.firstName} {toAccount.lastName}
          </span>
        </p>
      </div>

      <input
        type="number"
        ref={amountRef}
        placeholder="Enter amount"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <AnimatePresence>
        <button
          onClick={sendMoney}
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } ${transferSuccess !== null ? "hidden" : ""} `}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </AnimatePresence>

      <AnimatePresence>
        {transferSuccess !== null && (
          <motion.div
            className={`mt-4 text-center text-2xl font-semibold ${
              transferSuccess ? "text-green-600" : "text-red-600"
            } ${transferSuccess !== null ? "" : "hidden"} `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {transferSuccess
              ? `✅ Transfer of ₹${amountRef.current.value} was Successful`
              : "❌ Transfer Failed"}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <div className={`flex justify-center py-2 px-4 mt-4`}>
          <button
            onClick={() => navigate("/transfer")}
            className={`px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 flex items-center space-x-2 ${
              transferSuccess !== null ? "" : "hidden"
            } `}
          >
            Re-Send
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </AnimatePresence>

      <button
        onClick={() => navigate("/")}
        className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
      >
        Go Home
      </button>
    </motion.div>
  );
}
