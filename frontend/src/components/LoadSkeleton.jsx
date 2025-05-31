export function LoadSkeleton() {
  return (
    <div
        className="m-6 animate-pulse"
      >
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 text-white rounded-lg shadow-md">
          <div>
            <h1 className="text-xl font-bold">
              <div>{""}</div>
            </h1>
            <p><div>{""}</div></p>
          </div>
          <div className="size-20 rounded-full bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Account Info - first on mobile */}
          <div
            className="order-1 md:order-3 md:col-span-3 bg-gray-100 rounded-lg shadow-md p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-lg font-semibold mb-2"><div>{""}</div></h2>
            <p><div>{""}</div></p>
            <p><div>{""}</div></p>
            <div className="flex justify-center space-x-4 flex-wrap gap-y-4 p-3">
              {/* Balance Card */}
              <div className="bg-gray-100 shadow-md rounded-xl p-6 w-64 text-center border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  <div>{""}</div>
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  <div>{""}</div>
                </p>
              </div>

              {/* Send Money Button */}
              <button
                className="px-6 py-3 bg-gray-100 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 flex items-center space-x-2"
              >
                <span className="font-medium"><div>{""}</div></span>
                
              </button>
            </div>
          </div>

          {/* Transaction History - in the middle on both */}
          <div
            className="order-2 md:order-2 md:col-span-6 bg-gray-100 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-lg text-center font-semibold mb-4">
              <div>{""}</div>
            </h2>

            <div>{""}</div>
          </div>

          <div
            className="order-3 md:order-1 md:col-span-3 text-center bg-gray-100 rounded-lg shadow-md p-4"
            
          >
            <h2 className="text-lg font-semibold mb-2"><div>{""}</div></h2>
            <div className="flex justify-center p-3">
              <button
                
                className="px-6 py-3 bg-gray-100 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 flex items-center space-x-2"
              >
                <span className="font-medium"><div>{""}</div></span>
                
              </button>
            </div>
          </div>
        </div>
      </div>

  );
}
