import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./AuthInput.module.css";
import { memo, useState } from "react";

const AuthInput = ({
  constraint,
  type,
  placeholder,
  icon,
  message,
  autoFocus,
  setValue,
  value,
}) => {
  const [focused, setFocused] = useState(false);

  const invalid = value.isTouched && !constraint(value.value);

  const inputChangeHandler = (e) =>
    setValue((prevState) => {
      return { ...prevState, value: e.target.value };
    });

  const inputBlurHandler = () => {
    inputFocusHandler();
    setValue((prevState) => {
      return { ...prevState, isTouched: true };
    });
  };

  const inputFocusHandler = () => setFocused((prevState) => !prevState);

  return (
    <div>
      <div
        className={`${classes.info} ${
          invalid ? classes.invalid : focused ? classes.active : ""
        } d-flex align-items-center gap-2 mt-3 ps-3 rounded-2 overflow-hidden border`}
      >
        <input
          onFocus={inputFocusHandler}
          autoFocus={autoFocus}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          value={value.value}
          type={type || "text"}
          placeholder={placeholder}
          className="p-2 bg-transparent flex-grow-1 border-0 outline-none"
          style={{ direction: "rtl" }}
        />
        <FontAwesomeIcon
          style={{ color: "var(--address-color)" }}
          icon={icon}
        />
      </div>
      {invalid && <p className={classes.hint}>{message}</p>}
    </div>
  );
};

export default memo(AuthInput);
