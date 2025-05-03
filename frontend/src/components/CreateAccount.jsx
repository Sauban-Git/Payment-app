import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function CreateAccount() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  async function createAccount() {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const idk = await axios.post(
      "http://localhost:3000/user/signup",
      {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = idk.data;
    const token = res.token;
    storeAuth(token);
    usernameRef.current.value = "";
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <div className="flex justify-center">
      <div className="grid p-5 justify-center rounded-xl shadow-xl ">
        <div className="m-2 rounded-xl p-2 shadow-2xl">
          <input
            className="m-2 p-2"
            type="text"
            placeholder="Enter first name"
            ref={firstNameRef}
          />
        </div>
        <div className="m-2 rounded-xl p-2 shadow-2xl">
          <input
            className="m-2 p-2"
            type="text"
            placeholder="Enter last name"
            ref={lastNameRef}
          />
        </div>
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
        {/* <div className="m-2 rounded-xl p-2 shadow-2xl flex justify-center bg-blue-500"> */}
        <button
          onClick={createAccount}
          className="m-2 rounded-xl p-2 shadow-2xl flex justify-center bg-blue-500"
        >
          Submit
        </button>
        <div className="p-2 m-2">
          Have Account?{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Sign in
          </Link>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

function storeAuth(token) {
  localStorage.setItem("token", token);
}
