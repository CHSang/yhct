import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ButtonField from "../../components/ButtonField";
import InputField from "../../components/InputField";
import {validateEmail, validatePassword} from "../../services/ValidationService";

import {
  addUserInfo,
  getUserInfo,
  signUpUserWithEmailAndPassword,
} from "../../services/FirebaseService";
import BackgroundLayer from "../BackgroundLayer";
import { SignUpWrapper } from "./Style";
import {  notification } from "antd";
import { Constants } from "../../constants/Constants";

type SignupProps = {
  handleChangeLoginState: Function;
};

const SignUp = ({ handleChangeLoginState}: SignupProps) => {
  const history = useHistory();
  const [state, setstate] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    className: "",
    studentNumber: "",
    isSubmitButtonDisable: true,
  });

  useEffect(() => {
    let isSubmitButtonDisable = true;
    if (
      state.name &&
      state.email &&
      state.phoneNumber &&
      state.password &&
      state.className &&
      state.studentNumber
    ) {
      isSubmitButtonDisable = false;
    }

    setstate((prev) => ({
      ...prev,
      isSubmitButtonDisable,
    }));
  }, [
    state.name,
    state.email,
    state.phoneNumber,
    state.password,
    state.className,
    state.studentNumber,
  ]);

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
    if (!validateEmail(state.email)) {
      openNotification("Email không hợp lệ");
      return;
    }

    if (!validatePassword(state.password)) {
      openNotification("Mật khẩu ít nhất có 6 ký tự");
      return;
    }

    let user = await getUserInfo(state.email);
    if (user) {
      openNotification("Tài khoản đã tồn tại");
      return;
    }

    try {
      await signUpUserWithEmailAndPassword(state.email, state.password);
      await addUserInfo({
        name: state.name,
        email: state.email,
        phoneNumber: state.phoneNumber,
        className: state.className,
        studentNumber: state.studentNumber,
      });
      localStorage.setItem(Constants.EMAIL, state.email);
      sessionStorage.setItem(Constants.IS_LOGIN_SUCCESS, "true");
      handleChangeLoginState(true, state.email);
      history.push("/home");
    } catch (error) {
      openNotification("Không thể đăng ký thành viên");
    }
  };

  return (
    <BackgroundLayer>
      <SignUpWrapper>
        <div className="content">
          <label className="caption">Đăng ký</label>
          <div className="input_section">
            <InputField
              id="name"
              placeholder="Họ và tên"
              value={state.name}
              type="text"
              onChange={handleOnChange}
            />
            <InputField
              id="email"
              placeholder="Email"
              value={state.email}
              type="email"
              onChange={handleOnChange}
            />
            <InputField
              id="phoneNumber"
              placeholder="Số điện thoại"
              value={state.phoneNumber}
              type="number"
              onChange={handleOnChange}
            />
            <InputField
              id="password"
              placeholder="Mật khẩu"
              value={state.password}
              type="password"
              onChange={handleOnChange}
            />
            <InputField
              id="className"
              placeholder="Lớp"
              value={state.className}
              type="text"
              onChange={handleOnChange}
            />
            <InputField
              id="studentNumber"
              placeholder="Mã số sinh viên"
              value={state.studentNumber}
              type="text"
              onChange={handleOnChange}
            />
            <div className="button_submit">
              <ButtonField
                onClick={() => handleSubmit()}
                disabled={state.isSubmitButtonDisable}
                label="Đăng ký"
              />
            </div>
          </div>
        </div>
      </SignUpWrapper>
    </BackgroundLayer>
  );
};

export default SignUp;
