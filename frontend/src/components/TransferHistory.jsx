import { motion } from "framer-motion";

export function TransferHistory({ debited = [], credited = [] }) {
  if (debited.length === 0 && credited.length === 0) {
    return (
      <motion.div
        className="group relative p-4 text-center rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
      >
        <div>No Transaction Found</div>
      </motion.div>
    );
  } else {
    return (
      <div className="grid sm:grid-cols-5">
        {/* Received transactions */}
        <div className="sm:col-span-2 grid gap-4 p-4">
          <h1 className="text-center">Credited</h1>
          <div className="transaction-list max-h-48 overflow-y-auto">
            {credited.map((transaction, index) => (
              <motion.div
                key={transaction._id}
                className="group relative p-4 rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="space-y-1">
                  <p className="text-lg font-semibold">
                    From: {transaction.senderId.firstName}{" "}
                    {transaction.senderId.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.senderId.username}
                  </p>
                  <p className="text-md font-medium text-green-500">
                    Amount: ₹{transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    Time: {new Date(transaction.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="hidden sm:col-span-1 sm:flex justify-center">
          <div className="w-px bg-gray-300 h-full" />
        </div>

        {/* Sent transactions */}
        <div className="sm:col-span-2 grid gap-4 p-4">
          <h1 className="text-center">Debited</h1>
          <div className="transaction-list max-h-48 overflow-y-auto">
            {debited.map((transaction, index) => (
              <motion.div
                key={transaction._id}
                className="group relative p-4 rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="space-y-1">
                  <p className="text-lg font-semibold">
                    To: {transaction.receiverId.firstName}{" "}
                    {transaction.receiverId.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.receiverId.username}
                  </p>
                  <p className="text-md font-medium text-red-500">
                    Amount: ₹{transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    Time: {new Date(transaction.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
