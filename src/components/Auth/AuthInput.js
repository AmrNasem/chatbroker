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
  onChange,
  onBlur,
  value,
  isTouched,
}) => {
  const [focused, setFocused] = useState(false);

  const invalid = isTouched && !constraint(value);

  const inputBlurHandler = () => {
    inputFocusHandler();
    onBlur();
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
          onChange={onChange}
          value={value}
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
