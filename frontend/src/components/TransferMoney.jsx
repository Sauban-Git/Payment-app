import axios from "axios";
import { useRecoilState } from "recoil";
import { userListAtom } from "../atoms/account";
import { ListUser } from "./ListUsers";

export function TransferMoney() {
  const token = localStorage.getItem("token");
  const [usersList, setUserslist] = useRecoilState(userListAtom);
  async function searchAcc(value) {
    const users = await axios.post(
      "http://localhost:3000/user/users",
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
  }
  return (
    <div className="flex justify-center">
      <div>
        <div className="m-2 rounded-xl p-2 shadow-2xl">
          <input
            onChange={(e) => {
              searchAcc(e.target.value);
            }}
            className="m-2 p-2 hover:bg-gray-200 rounded-md"
            type="text"
            placeholder="Enter name or email to search"
          />
        </div>
        <div className="m-2 grid justify-center ">
          <ListUser usersList={usersList} />
        </div>
      </div>
    </div>
  );
}
