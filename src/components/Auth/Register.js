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

const nameConstraint = (value) => /(^[a-zA-Z]|_).{2}/i.test(value);
const telConstraint = (value) => /\d{3}/i.test(value);
const emailConstraint = (value) => /^[a-zA-Z].*@[a-zA-Z]\w*\.\w+/gi.test(value);
const passowrdConstraint = (value) => value.length >= 6;

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [name, setName] = useState({ value: "", isTouched: false });
  const [phone, setPhone] = useState({ value: "", isTouched: false });
  const [email, setEmail] = useState({ value: "", isTouched: false });
  const [password, setPassword] = useState({ value: "", isTouched: false });

  const registerHandler = (e) => {
    e.preventDefault();
    const isFormValid =
      nameConstraint(name.value) &&
      telConstraint(phone.value) &&
      emailConstraint(email.value) &&
      passowrdConstraint(password.value);

    if (isFormValid) {
      const formdata = new FormData();
      formdata.append("name", name.value);
      formdata.append("phone", phone.value);
      formdata.append("email", email.value);
      formdata.append("password", password.value);

      console.log(name.value);
      console.log(phone.value);
      console.log(email.value);
      console.log(password.value);

      dispatch(authenticateUser("users/register", formdata));
    } else {
      setName((prev) => {
        return { ...prev, isTouched: true };
      });
      setPhone((prev) => {
        return { ...prev, isTouched: true };
      });
      setEmail((prev) => {
        return { ...prev, isTouched: true };
      });
      setPassword((prev) => {
        return { ...prev, isTouched: true };
      });
    }
  };

  return (
    <form>
      <AuthInput
        constraint={nameConstraint}
        icon={useMemo(() => faUser, [])}
        message="الاسم غير صحيح"
        placeholder="الاسم"
        onChange={useCallback(
          (e) =>
            setName((prev) => {
              return { ...prev, value: e.target.value };
            }),
          []
        )}
        onBlur={useCallback(
          () =>
            setName((prev) => {
              return { ...prev, isTouched: true };
            }),
          []
        )}
        value={name.value}
        isTouched={name.isTouched}
      />
      <AuthInput
        constraint={telConstraint}
        icon={useMemo(() => faPhone, [])}
        message="رقم الهاتف غير صحيح"
        placeholder="رقم الهاتف"
        type="tel"
        onChange={useCallback(
          (e) =>
            setPhone((prev) => {
              return { ...prev, value: e.target.value };
            }),
          []
        )}
        onBlur={useCallback(
          () =>
            setPhone((prev) => {
              return { ...prev, isTouched: true };
            }),
          []
        )}
        value={phone.value}
        isTouched={phone.isTouched}
      />
      <AuthInput
        constraint={emailConstraint}
        icon={useMemo(() => faEnvelope, [])}
        message="البريد الإلكتروني غير صحيح"
        placeholder="البريد الإلكتروني"
        type="email"
        onChange={useCallback(
          (e) =>
            setEmail((prev) => {
              return { ...prev, value: e.target.value };
            }),
          []
        )}
        onBlur={useCallback(
          () =>
            setEmail((prev) => {
              return { ...prev, isTouched: true };
            }),
          []
        )}
        value={email.value}
        isTouched={email.isTouched}
      />
      <AuthInput
        constraint={passowrdConstraint}
        icon={useMemo(() => faLock, [])}
        message="لابد أن تكون كلمة السر مكونة من 6 رموز أو أكثر"
        placeholder="كلمة السر"
        type="password"
        onChange={useCallback(
          (e) =>
            setPassword((prev) => {
              return { ...prev, value: e.target.value };
            }),
          []
        )}
        onBlur={useCallback(
          () =>
            setPassword((prev) => {
              return { ...prev, isTouched: true };
            }),
          []
        )}
        value={password.value}
        isTouched={password.isTouched}
      />
      {loading ? (
        <Spinner
          side={30}
          stroke={3.5}
          color="var(--secondary-color)"
          className="mx-auto mt-3"
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
