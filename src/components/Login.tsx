import React, { useState } from "react";
import { Button, TextField, makeStyles, List } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import userModule, { UserState } from "../modules/userModule";
import { getRoll } from "../database/database";
import { apiTest } from "../axios/router";

const main_bg_color = 'rgb( 0, 220, 255)';
const sub_bg_color = 'rgb( 200, 200, 200)';
const main_font_color = 'black';

const useStyle = makeStyles({
  // root: {
  //   backgroundColor: main_bg_color,
  //   sub_bg_color: 'rgb( 200, 200, 200)',
  //   main_font_color: 'black',
  // },
  tab_menu: {
    marginTop: '50px',
    paddingBottom: '40px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    width: '100%',
    margin: '0 auto',
  },
  hamburger: {
    display: 'block',
    transform: 'rotate(90deg)',
  },
  menu_label: {
    width: 'calc(5% - 5px)',
    height: '5vh',
    borderBottom: '3px solid var(--main_bg_color)',
    borderLeft: '1px solid var(--main_bg_color)',
    borderRight: '1px solid var(--main_bg_color)',
    backgroundColor: 'var(--sub_bg_color)',
    lineHeight: '5vh',
    fontSize: '1.2rem',
    textAlign: 'center',
    color: 'var(--main_font_color)',
    display: 'block',
    float: 'left',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
  },
  loginTextField: {
    display: 'grid',
    width: 'fit-content',
  }
});


const Login = () => {  
  const classes = useStyle(useStyle);
  const dispatch = useDispatch();
  const userState = useSelector((state: UserState) => state["user"]);
  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    await apiTest();
    const roll = getRoll(userState.userId, userState.password);

    dispatch(userModule.actions.setRoll(roll));
  };

  return (
    <div>
      <List>
        
      </List>
    </div>
    /*
    <div className="App">
      <header>
        <h1>
          新クトゥルフ神話TRPG
          <br />
          キャラクターシート＆セッションサポーター(仮)
        </h1>
      </header>
      <main>
        <div className={classes.loginTextField}>
          <TextField
            id="inputUserId"
            label="ユーザーID(半角英数)"
            onChange={handleChangeUserId}
            value={userId}
          />
          <TextField
            id="inputPassword"
            label="パスワード"
            onChange={handleChangePassword}
            value={password}
            type="password"
          />
        </div>
        <Button variant='contained' onClick={login} >{"ログイン"}</Button>
      </main>

      <footer>
        <p>
          このページはスクリプト実装途中です。次のページに進むには
          <a href="menu.html?id=guest">こちら</a>をクリックしてください。
        </p>
      </footer>
    </div>
    */
  );
};

export default Login;
