import axios from "axios";
import { useRecoilState } from "recoil";
import { userListAtom } from "../atoms/account";
import { ListUser } from "./ListUsers";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function TransferMoney() {
  const url = import.meta.env.VITE_BE_URL;
  const token = localStorage.getItem("token");
  const [usersList, setUserslist] = useRecoilState(userListAtom);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        searchAcc(searchTerm);
      }
    }, 300); // debounce effect

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  async function searchAcc(value) {
    try {
      const users = await axios.post(
        `${url}/user/users`,
        {
          username: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserslist(users.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  }

  return (
    <motion.div
      className="flex justify-center min-h-screen bg-gray-50 pt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-xl px-4">
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
            Search Users to Transfer
          </h2>

          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4"
            type="text"
            placeholder="Enter name or email"
          />

          <div className="mt-4">
            {usersList.length > 0 ? (
              <ListUser usersList={usersList} />
            ) : (
              <p className="text-center text-gray-500">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
