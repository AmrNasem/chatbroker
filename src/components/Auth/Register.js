import { memo, useEffect, useMemo, useState } from "react";
import AuthInput from "./AuthInput";
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../UI/Spinner";
import { backend } from "../../App";
import { useNavigate } from "react-router-dom";

const nameConstraint = (value) => /^[a-zA-Z0-9_]{3,20}$/.test(value);
const telConstraint = (value) => /^\d{6,}$/.test(value);
const emailConstraint = (value) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
const passowrdConstraint = (value) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);

const Register = ({ setAlert }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState({ value: "", isTouched: false });
  const [phone, setPhone] = useState({ value: "", isTouched: false });
  const [email, setEmail] = useState({ value: "", isTouched: false });
  const [password, setPassword] = useState({ value: "", isTouched: false });

  useEffect(() => {
    setAlert({ error: false, message: "" });
  }, [setAlert]);

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
      formdata.append("phone_number", phone.value);
      formdata.append("email", email.value);
      formdata.append("password", password.value);

      setLoading(true);
      fetch(`${backend}/users/register`, {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then(({ message }) => {
          if (message)
            setAlert(() => ({ error: true, message: message?.email[0] }));
          else {
            setAlert(() => ({ error: false, message: "تم التسجيل بنجاح!" }));
            navigate("?auth=login");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setAlert(() => ({ error: true, message: "خطأ في التسجيل!" }));
          setLoading(false);
        });
    } else {
      const touchInput = (prev) => ({ ...prev, isTouched: true });
      setName(touchInput);
      setPhone(touchInput);
      setEmail(touchInput);
      setPassword(touchInput);
    }
  };

  return (
    <form>
      <AuthInput
        constraint={nameConstraint}
        icon={useMemo(() => faUser, [])}
        message="الاسم غير صحيح"
        placeholder="الاسم"
        onChange={setName}
        onBlur={setName}
        value={name.value}
        isTouched={name.isTouched}
      />
      <AuthInput
        constraint={telConstraint}
        icon={useMemo(() => faPhone, [])}
        message="رقم الهاتف غير صحيح"
        placeholder="رقم الهاتف"
        type="tel"
        onChange={setPhone}
        onBlur={setPhone}
        value={phone.value}
        isTouched={phone.isTouched}
      />
      <AuthInput
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
