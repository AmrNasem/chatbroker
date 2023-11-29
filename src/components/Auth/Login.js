import { memo, useCallback, useMemo, useState } from "react";
import classes from "./Auth.module.css";
import AuthInput from "./AuthInput";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { authenticateUser } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../UI/Spinner";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const inputs = [
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

  const loginHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    let isFormValid = true;
    inputs.forEach((input) => {
      formdata.append(input.key, input.state[0].value);
      isFormValid = isFormValid && input.constraint(input.state[0].value);
    });
    if (isFormValid) {
      dispatch(authenticateUser("users/login", formdata));
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
      <Link
        className={`${classes["forgot-password"]} mt-2 text-decoration-none d-inline-block`}
      >
        هل نسيت كلمة السر؟
      </Link>
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
          onClick={loginHandler}
        >
          تسجيل الدخول
        </button>
      )}
    </form>
  );
};

export default memo(Login);
