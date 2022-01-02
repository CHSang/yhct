import React, { useState, useEffect } from "react";
import { LoginWrapper } from "./Style";
import { Checkbox, notification  } from "antd";
import { signinWithEmailAndPassword } from "../../services/FirebaseService";
import { Constants } from "../../constants/Constants";
import { useHistory } from "react-router-dom";
import InputField from "../../components/InputField";
import ButtonField from "../../components/ButtonField";
import BackgroundLayer from "../BackgroundLayer";


type LoginProps = {
  handleChangeLoginState: Function;
};

const Login = ({ handleChangeLoginState}: LoginProps)  => {
  const history = useHistory();
  const [state, setstate] = useState({
    email: "",
    password: "",
    isAutoLogin: false,
    isSubmitButtonDisable: true,
  });

  useEffect(() => {
    let isSubmitButtonDisable = true;
    if (state.email && state.password) {
      isSubmitButtonDisable = false;
    }

    setstate((prev) => ({
      ...prev,
      isSubmitButtonDisable,
    }));
  }, [state.email, state.password]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let key = event.target.id;
    setstate((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const openNotification = (message: string) => {
    notification['error']({
      message: 'Thông báo',
      description: message,
      duration: 3,
      onClick: () => {},
    });
  };

  const handleSubmit = async () => {
    try {
      await signinWithEmailAndPassword(state.email, state.password);
      sessionStorage.setItem(Constants.IS_LOGIN_SUCCESS, "true");
      localStorage.setItem(Constants.EMAIL, state.email);
      if (state.isAutoLogin) {
        localStorage.setItem(Constants.IS_LOGIN_SUCCESS, "true");
      } else {
        localStorage.removeItem(Constants.IS_LOGIN_SUCCESS);
      }
      handleChangeLoginState(true, state.email);
      history.push("/home");
    } catch (error) {
      openNotification("Email và mật khẩu không hợp lệ")
    }
  };

  const toggleAutoLoginChange = () => {
    setstate((prev) => ({
      ...prev,
      isAutoLogin: !prev.isAutoLogin,
    }));
  };

  return (
    <BackgroundLayer>
      <LoginWrapper>
        <label className="caption">Đăng nhập</label>
        <div>
          <InputField
            id="email"
            placeholder="Email"
            value={state.email}
            type="email"
            onChange={handleOnChange}
          />
          <InputField
            id="password"
            placeholder="Mật khẩu"
            value={state.password}
            type="password"
            onChange={handleOnChange}
          />
          <div className="checkbox_section">
            <Checkbox
              checked={state.isAutoLogin}
              onChange={toggleAutoLoginChange}
            >
              Duy trì đăng nhập
            </Checkbox>
          </div>
          <div className="button_submit">
            <div className="button_login">
              <ButtonField
                onClick={() => handleSubmit()}
                disabled={state.isSubmitButtonDisable}
                label="Đăng nhập"
              />
            </div>
            <div className="button_register">
              <ButtonField
                type="link"
                onClick={() => history.push("signUp")}
                label="Đăng ký tạo tài khoản"
              />
            </div>
          </div>
        </div>
      </LoginWrapper>
    </BackgroundLayer>
  );
};

export default Login;
