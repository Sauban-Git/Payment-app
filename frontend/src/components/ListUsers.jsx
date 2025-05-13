import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { recieverAtom } from "../atoms/account";
import { motion } from "framer-motion";

export function ListUser({ usersList }) {
  const navigate = useNavigate();
  const setToAccount = useSetRecoilState(recieverAtom);

  return (
    <div className="grid gap-4 p-4">
      {usersList.map((user, index) => (
        <motion.div
          key={user._id}
          className="group relative p-4 rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="space-y-1">
            <p className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-600">{user.username}</p>
          </div>

          <button
            onClick={() => {
              setToAccount(user);
              navigate("/confirmSend");
            }}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-2 rounded-lg hidden md:group-hover:inline-block md:group-hover:scale-105 transition-transform duration-200 md:flex md:items-center"
          >
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

          {/* Mobile: always visible button */}
          <div className="md:hidden mt-3">
            <button
              onClick={() => {
                setToAccount(user);
                navigate("/confirmSend");
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium"
            >
              Send
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
