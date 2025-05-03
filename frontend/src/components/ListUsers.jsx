import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import { recieverAtom } from "../atoms/account";

export function ListUser({ usersList }) { 
  const navigate = useNavigate();
  const setToAccount = useSetRecoilState(recieverAtom)
  return (
    <div>
      {usersList.map((user) => (
        <div key={user._id} className="group m-2 shadow-xl relative p-6 border border-gray-300">
          <ul >
            <li>
              {user.firstName} {user.lastName}
            </li>
            <li>{user.username}</li>
              <button
                onClick={() => {
                  setToAccount(user)
                  navigate("/confirmSend")
                }}
                className="absolute top-1/2  right-2 hidden group-hover:inline-block bg-blue-500 text-white px-4 py-2 rounded transform -translate-y-1/2"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            
          </ul>
        </div>
      ))}
    </div>
  );
}
