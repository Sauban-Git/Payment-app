import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/account";
import photo from "../assets/photo.png";
import { useEffect } from "react";

export function HomeUser() {
  const navigate = useNavigate();
  let pressed = false;
  const [userInfo, setUserinfo] = useRecoilState(userAtom);
  const token = localStorage.getItem("token");

  async function sendMoney() {
    navigate("/transfer")
    
  }

  async function fetchUserData() {
    try {
      const response = await axios.get("http://localhost:3000/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data.balance) {
        console.log(response.data.msg);
        alert(response.data.msg);
        navigate("/signup");
      } else {
        setUserinfo(response.data);
        pressed = true;
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  //   const res = HomeUser();

  return (
    <div className="m-3">
      <div className="m-3 flex justify-between">
        <div className="flex items-center justify-center">
          <p className="">
            Hello {userInfo.firstName} {userInfo.lastName}
            <br />
            Welcome Back
          </p>
        </div>
        <div className="w-30">
          <img src={photo} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-3">showing options</div>
        <div className="col-span-6">
          <div>shcowing transaction history</div>
          <div className="p-2 m-2 flex justify-center">
            <button disabled={pressed} className="m-2 p-5 shadow-xl rounded-xl">
              {userInfo !== null ? userInfo.balance : "Loading.."}
            </button>
            <button className="m-2 p-5 shadow-xl rounded-xl" onClick={sendMoney}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="col-span-3">account info</div>
      </div>
    </div>
  );
}
