import "./App.css";
import { HomeUser } from "./components/HomeUser";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserSignin } from "./components/UserSignin";
import { CreateAccount } from "./components/CreateAccount";
import { ListUser } from "./components/ListUsers";
import { TransferMoney } from "./components/TransferMoney";
import { SendConfirm } from "./components/SendConfirm";
function App() {
  return (
    <div>
      {/* <CreateAccount/> */}
      {/* <CreateAccount/> */}
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/transfer" element={<TransferMoney/>} />
            <Route path="/login" element={<UserSignin />}></Route>
            <Route path="/confirmSend" element={<SendConfirm/>}></Route>
            <Route path="/signup" element={<CreateAccount />}></Route>
            <Route path="/" element={<HomeUser />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
      {/* <ListUser/> */}
    </div>
  );
}

export default App;
