import { memo, useState } from "react";
import classes from "./Auth.module.css";
import AuthInput from "./AuthInput";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useSearchParams } from "react-router-dom";
import { authenticateUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import Spinner from "../../UI/Spinner";
import { backend } from "../../App";

const inputs = [
  {
    type: "email",
    id: "email",
    icon: faEnvelope,
    message: "البريد الإلكتروني غير صحيح",
    placeholder: "البريد الإلكتروني",
    validate: (value) =>
      /^[a-zA-Z_]\w*(\.[a-zA-Z_]\w*)?@[a-zA-Z_]\w*\.[a-zA-Z]{2,}$/.test(value),
  },
  {
    type: "password",
    id: "password",
    icon: faLock,
    message: "كلمة السر غير صحيحة",
    placeholder: "كلمة السر",
    validate: (value) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
  },
];

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [inputsTouched, setInputsTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setParams = useSearchParams()[1];

  const loginHandler = async (e) => {
    e.preventDefault();

    const isFormValid = inputs.every((input) =>
      input.validate(formData[input.id])
    );

    if (isFormValid) {
      const formdata = new FormData();
      inputs.forEach((input) => formdata.append(input.id, formData[input.id]));

      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${backend}/users/login`, {
          method: "POST",
          body: formdata,
        });
        if (!res.ok) throw new Error("خطأ في تسجيل الدخول");
        const data = await res.json();
        console.log(data);
        dispatch(authenticateUser(data));
        setParams((prev) => {
          prev.delete("auth");
          return prev;
        });
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    } else {
      const allTouched = {};
      inputs.forEach((input) => {
        allTouched[input.id] = true;
      });
      setInputsTouched(allTouched);
    }
  };

  return (
    <form>
      {inputs.map((input) => (
        <AuthInput
          key={input.id}
          id={input.id}
          type={input.type}
          autoFocus={input.id === "email"}
          icon={input.icon}
          message={input.message}
          placeholder={input.placeholder}
          onChange={setFormData}
          onBlur={setInputsTouched}
          value={formData[input.id]}
          invalid={
            !input.validate(formData[input.id]) && inputsTouched[input.id]
          }
        />
      ))}
      <Link
        className={`${classes["forgot-password"]} mt-2 text-decoration-none d-inline-block`}
      >
        هل نسيت كلمة السر؟
      </Link>
      <p
        style={{ fontSize: "0.85rem" }}
        className="fw-semibold mt-2 text-center text-danger"
      >
        {error}
      </p>
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
