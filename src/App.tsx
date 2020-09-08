import React from "react";
// import logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "./modules/userModule";
import Login from "./components/Login";
import Menu from "./components/menu";
import CharacterSheet from "./components/CharacterSheet";
import SessionTabs from "./components/SessionTabs";

const App: React.FC = () => {

  // state の取得
  const userState = useSelector((state: UserState) => state['user']);
  switch (userState.roll) {
    case "guest":
      return <SessionTabs />;
    case "player":
      return <Menu />;
    case "":
      return <SessionTabs />;
  }
};
export default App;
