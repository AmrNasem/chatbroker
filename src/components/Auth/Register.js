import { memo, useCallback, useMemo, useState } from "react";
import AuthInput from "./AuthInput";
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../store/auth-slice";
import Spinner from "../../UI/Spinner";

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const inputs = [
    {
      key: "name",
      constraint: useCallback((value) => /\w{3}/i.test(value), []),
      icon: useMemo(() => faUser, []),
      message: "الاسم غير صحيح",
      placeholder: "الاسم",
      type: "text",
      state: useState({ value: "", isTouched: false }),
    },
    {
      key: "phone",
      constraint: useCallback((value) => /\d{3}/i.test(value), []),
      icon: useMemo(() => faPhone, []),
      message: "رقم الهاتف غير صحيح",
      placeholder: "رقم الهاتف",
      type: "tel",
      state: useState({ value: "", isTouched: false }),
    },
    {
      key: "email",
      constraint: useCallback(
        (value) => /^[a-zA-Z]\w*@[a-zA-Z]\w*\.\w+/i.test(value),
        []
      ),
      icon: useMemo(() => faEnvelope, []),
      message: "البريد الإلكتروني غير صحيح",
      placeholder: "البريد الإلكتروني",
      type: "email",
      state: useState({ value: "", isTouched: false }),
    },
    {
      key: "password",
      constraint: useCallback((value) => value.length >= 6, []),
      icon: useMemo(() => faLock, []),
      message: "لابد أن تكون كلمة السر مكونة من 6 رموز أو أكثر",
      placeholder: "كلمة السر",
      type: "password",
      state: useState({ value: "", isTouched: false }),
    },
  ];

  const registerHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    let isFormValid = true;
    inputs.forEach((input) => {
      formdata.append(input.key, input.state[0].value);
      isFormValid = isFormValid && input.constraint(input.state[0].value);
    });
    if (isFormValid) {
      dispatch(authenticateUser("users/register", formdata));
    } else
      inputs.forEach((input) =>
        input.state[1]((prevState) => {
          return { ...prevState, isTouched: true };
        })
      );
  };

  return (
    <form>
      {inputs.map((input, index) => (
        <AuthInput
          key={index}
          constraint={input.constraint}
          icon={input.icon}
          message={input.message}
          placeholder={input.placeholder}
          type={input.type}
          setValue={input.state[1]}
          value={input.state[0]}
        />
      ))}
      {loading ? (
        <Spinner
          side={30}
          stroke={3}
          color="var(--secondary-color)"
          className="mx-auto my-2"
        />
      ) : (
        <button
          className="d-block w-100 p-2 mt-4 rounded-2 border-0 text-white"
          style={{ backgroundColor: "var(--secondary-color)" }}
          onClick={registerHandler}
        >
          إنشاء حساب
        </button>
      )}
    </form>
  );
};

export default memo(Register);
