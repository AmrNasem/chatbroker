import { memo, useEffect, useMemo, useState } from "react";
import classes from "./Auth.module.css";
import AuthInput from "./AuthInput";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useSearchParams } from "react-router-dom";
import { authenticateUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import Spinner from "../../UI/Spinner";
import { backend } from "../../App";

const emailConstraint = (value) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
const passowrdConstraint = (value) =>
  true || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);

const Login = ({ setAlert }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState({ value: "", isTouched: false });
  const [password, setPassword] = useState({ value: "", isTouched: false });
  const [loading, setLoading] = useState(false);
  const setParams = useSearchParams()[1];

  useEffect(() => {
    setAlert({ error: false, message: "" });
  }, [setAlert]);

  const loginHandler = (e) => {
    e.preventDefault();
    const isFormValid =
      emailConstraint(email.value) && passowrdConstraint(password.value);

    if (isFormValid) {
      const formdata = new FormData();
      formdata.append("email", email.value);
      formdata.append("password", password.value);

      setLoading(true);
      fetch(`${backend}/users/login`, {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          const { message } = data;
          console.log(message);
          if (message) setAlert(() => ({ error: true, message }));
          else {
            setAlert(() => ({
              error: false,
              message: "تم تسجيل الدخول بنجاح!",
            }));
            dispatch(authenticateUser(data));
            setParams((prev) => {
              prev.delete("auth");
              return prev;
            });
          }
          setLoading(false);
        })
        .catch(() => {
          setAlert(() => ({ error: true, message: "خطأ في التسجيل!" }));
          setLoading(false);
        });
    } else {
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
        autoFocus
        constraint={emailConstraint}
        icon={useMemo(() => faEnvelope, [])}
        message="البريد الإلكتروني غير صحيح"
        placeholder="البريد الإلكتروني"
        type="email"
        onChange={setEmail}
        onBlur={setEmail}
        value={email.value}
        isTouched={email.isTouched}
      />
      <AuthInput
        constraint={passowrdConstraint}
        icon={useMemo(() => faLock, [])}
        message="لابد أن تكون كلمة السر مكونة من 8 رموز فأكثر وتتضمن حروف كبيرة وصغير وأرقام"
        placeholder="كلمة السر"
        type="password"
        onChange={setPassword}
        onBlur={setPassword}
        value={password.value}
        isTouched={password.isTouched}
      />
      <Link
        className={`${classes["forgot-password"]} mt-2 text-decoration-none d-inline-block`}
      >
        هل نسيت كلمة السر؟
      </Link>
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
          onClick={loginHandler}
        >
          تسجيل الدخول
        </button>
      )}
    </form>
  );
};

export default memo(Login);
