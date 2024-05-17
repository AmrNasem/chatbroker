import { memo, useState } from "react";
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

const inputs = [
  {
    id: "name",
    icon: faUser,
    message: "الاسم غير صحيح!",
    placeholder: "الاسم",
    validate: (value = "") => /^[a-zA-Z_]\w{2,20}$/.test(value),
  },
  {
    type: "tel",
    id: "phone_number",
    icon: faPhone,
    message: "رقم الهاتف غير صحيح!",
    placeholder: "رقم الهاتف",
    validate: (value = "") => /^\d{6,}$/.test(value),
  },
  {
    type: "email",
    id: "email",
    icon: faEnvelope,
    message: "البريد الإلكتروني غير صحيح",
    placeholder: "البريد الإلكتروني",
    validate: (value = "") =>
      /^[a-zA-Z_]\w*(\.[a-zA-Z_]\w*)?@[a-zA-Z_]\w*\.[a-zA-Z]{2,}$/.test(value),
  },
  {
    type: "password",
    id: "password",
    icon: faLock,
    message: "كلمة السر غير صحيحة",
    placeholder: "كلمة السر",
    validate: (value = "") =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value),
  },
];

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [inputsTouched, setInputsTouched] = useState({});

  const registerHandler = async (e) => {
    e.preventDefault();

    const isFormValid = inputs.every((input) =>
      input.validate(formData[input.id])
    );

    if (isFormValid) {
      const formdata = new FormData();
      inputs.forEach((input) => formdata.append(input.id, formData[input.id]));

      setLoading(true);
      try {
        const res = await fetch(`${backend}/users/register`, {
          method: "POST",
          body: formdata,
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        console.log(data);
        navigate("?auth=login");
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    } else {
      const allTouched = {};
      inputs.forEach((input) => (allTouched[input.id] = true));
      setInputsTouched(allTouched);
    }
  };

  console.log(formData.name, inputs[0].validate(formData.name));
  console.log(inputsTouched.name);

  return (
    <form>
      {inputs.map((input) => (
        <AuthInput
          key={input.id}
          id={input.id}
          type={input.type}
          autoFocus={input.id === "name"}
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
