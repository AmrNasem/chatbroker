import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./AuthInput.module.css";
import { memo } from "react";

const AuthInput = ({
  type = "text",
  placeholder,
  icon,
  message,
  autoFocus,
  onChange,
  onBlur,
  value = "",
  id,
  invalid,
}) => {
  return (
    <div>
      <div
        className={`${classes.info} ${
          invalid ? classes.invalid : ""
        } d-flex align-items-center gap-2 mt-3 ps-3 rounded-2 overflow-hidden`}
      >
        <input
          autoFocus={autoFocus}
          id={id}
          onChange={(e) =>
            onChange((prev) => ({ ...prev, [e.target.id]: e.target.value }))
          }
          onBlur={(e) => onBlur((prev) => ({ ...prev, [e.target.id]: true }))}
          value={value}
          type={type}
          placeholder={placeholder}
          className="w-100 p-2 flex-grow-1 border-0 outline-none"
          style={{ direction: "rtl" }}
        />
        <FontAwesomeIcon icon={icon} />
      </div>
      {invalid && <p className={classes.hint}>{message}</p>}
    </div>
  );
};

export default memo(AuthInput);
