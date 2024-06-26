import { memo, useState } from "react";
import AuthInput from "./AuthInput";
import Spinner from "../../UI/Spinner";
import { backend } from "../../App";
import { useNavigate } from "react-router-dom";
import { register as inputs } from "../../utils/inputs";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      setError("");
      try {
        const res = await fetch(`${backend}/users/register`, {
          method: "POST",
          body: formdata,
          headers: {
            Accept: "application/json",
          },
        });
        if (!res.ok) throw new Error("خطأ في إنشاء الحساب، حاول في وقت آخر");
        const data = await res.json();
        console.log(data);
        navigate("?auth=login");
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    } else {
      const allTouched = {};
      inputs.forEach((input) => (allTouched[input.id] = true));
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
          onClick={registerHandler}
        >
          إنشاء حساب
        </button>
      )}
    </form>
  );
};

export default memo(Register);
