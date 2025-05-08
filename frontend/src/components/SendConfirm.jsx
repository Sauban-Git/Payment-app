import { useRecoilValue } from "recoil";
import { recieverAtom } from "../atoms/account";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SendConfirm() {
  const url = import.meta.env.VITE_BE_URL
    const navigate = useNavigate();
  const amountRef = useRef();
  const toAccount = useRecoilValue(recieverAtom);
  const token = localStorage.getItem("token");
  const [transferSuccess, setTransferSuccess] = useState(null); // null | true | false

  async function sendMoney() {
    const transferStatus = await axios.post(
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
    console.log(transferStatus.data.success);
    setTransferSuccess(transferStatus.data.success);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Confirm Transfer
      </h2>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-lg text-gray-700 font-medium">
          Sending to:
          <span className="font-semibold ml-2 text-gray-900">
            {toAccount.firstName} {toAccount.lastName}
          </span>
        </p>
      </div>

      <input
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter amount to send"
        ref={amountRef}
        type="number"
      />

      <button
        onClick={sendMoney}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Send
      </button>

      {transferSuccess !== null && (
        <div className="mt-4 text-center text-2xl">
          {transferSuccess ? (
            <span className="text-green-600">✅ Transfer Successful</span>
          ) : (
            <span className="text-red-600">❌ Transfer Failed</span>
          )}
        </div>
      )}
      <button
        onClick={() => navigate("/")}
        className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition"
      >
        Go Home
      </button>
    </div>
  );
}
