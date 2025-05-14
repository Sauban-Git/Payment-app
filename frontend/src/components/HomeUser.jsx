import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/account";
import photo from "../assets/photo.png";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { TransferHistory } from "./TransferHistory";

export function HomeUser() {
  const url = import.meta.env.VITE_BE_URL;
  const navigate = useNavigate();
  const [userInfo, setUserinfo] = useRecoilState(userAtom);
  const token = localStorage.getItem("token");

  function sendMoney() {
    navigate("/transfer");
  }

  function logOut() {
    localStorage.clear();
    navigate("/login");
  }

  async function fetchUserData() {
    try {
      const response = await axios.get(`${url}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.balance) {
        navigate("/login");
      } else {
        setUserinfo(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  useEffect(() => {
    fetchUserData();
    // fetchTransactionHistory();
  }, []);

  return (
    <motion.div
      className="m-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-md">
        <div>
          <h1 className="text-xl font-bold">
            Hello {userInfo.firstName} {userInfo.lastName}
          </h1>
          <p>Welcome back 👋</p>
        </div>
        <img
          src={photo}
          className="w-16 h-16 rounded-full shadow-md"
          alt="User"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Account Info - first on mobile */}
        <motion.div
          className="order-1 md:order-3 md:col-span-3 bg-white rounded-lg shadow-md p-4 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold mb-2">Account Info</h2>
          <p>Email: {userInfo.username}</p>
          <p>ID: {userInfo.id}</p>
          <div className="flex justify-center space-x-4 flex-wrap gap-y-4 p-3">
            {/* Balance Card */}
            <div className="bg-white shadow-md rounded-xl p-6 w-64 text-center border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Balance
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {userInfo ? `₹${userInfo.balance}` : "Loading..."}
              </p>
            </div>

            {/* Send Money Button */}
            <button
              onClick={sendMoney}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 flex items-center space-x-2"
            >
              <span className="font-medium">Send Money</span>
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
        </motion.div>

        {/* Transaction History - in the middle on both */}
        <motion.div
          className="order-2 md:order-2 md:col-span-6 bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg text-center font-semibold mb-4">
            Transaction History
          </h2>

          <TransferHistory
            debited={userInfo.sent}
            credited={userInfo.received}
          />
        </motion.div>

        {/* Options - last on mobile */}
        <motion.div
          className="order-3 md:order-1 md:col-span-3 text-center bg-white rounded-lg shadow-md p-4"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold mb-2">Options</h2>
          <div className="flex justify-center p-3">
            <button
              onClick={logOut}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 flex items-center space-x-2"
            >
              <span className="font-medium">logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
