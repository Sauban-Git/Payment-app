import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";

export function UserSignin() {
  const url = import.meta.env.VITE_BE_URL
  const usernameRef = useRef();
  const passwordRef = useRef();
  async function loginUser() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const login = await axios.post(
      `${url}/user/signin`,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!login.data.token) {
      alert(login.data.msg);
    } else {
      localStorage.setItem("token", login.data.token);
    }
  }
  return (
    <div className="flex justify-center">
      <div className="grid p-5 justify-center rounded-xl shadow-xl" >
        <div className="m-2 rounded-xl p-2 shadow-2xl">
          <input
            className="m-2 p-2"
            type="text"
            placeholder="Enter username or email"
            ref={usernameRef}
          />
        </div>
        <div className="m-2 rounded-xl p-2 shadow-2xl">
          <input
            className="m-2 p-2"
            type="text"
            placeholder="Enter password of at least 6 letter"
            ref={passwordRef}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={loginUser}
        >
          Login to your account
        </button>
        <div className="text-sm  text-gray-100 dark:text-gray-500">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
