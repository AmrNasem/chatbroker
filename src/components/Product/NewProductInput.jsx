import { memo } from "react";
import classes from "./NewProductInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const NewProductInput = ({
  label,
  className,
  inputClassName,
  onChange,
  onBlur,
  value,
  options,
  id,
  valid,
  type,
  subLabel,
  placeholder,
  message,
}) => {
  return (
    <div style={{ flex: 1, minWidth: "200px" }} className={`${className}`}>
      <label htmlFor={id} className={`mb-2 ${label ? "" : "invisible"}`}>
        {label}{" "}
        {subLabel && (
          <span
            style={{ fontSize: "0.8rem" }}
            className="d-inline-block fw-semibold me-1 text-black-50"
          >
            ({subLabel})
          </span>
        )}
      </label>
      {options ? (
        <select
          id={id}
          className={` ${inputClassName} d-block p-2 rounded-2 outline-none border transition-main w-100 ${classes.input}`}
          onBlur={onBlur}
          onChange={onChange}
          value={JSON.stringify(value)}
        >
          {options.map((option, i) => (
            <option key={i} value={JSON.stringify(option)}>
              {option.title || option.name_ar || option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          cols="30"
          rows="10"
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          placeholder={placeholder || "اكتب هنا.."}
          className={`d-block scrollbar-none p-2 rounded-2 outline-none ${
            valid ? "" : "invalid"
          } border transition-main w-100 ${classes.input} ${inputClassName}`}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          onBlur={onBlur}
          onChange={onChange}
          onWheel={(e) => e.target.blur()}
          value={value || ""}
          placeholder={placeholder || "اكتب هنا.."}
          className={`d-block p-2 w-100 ${inputClassName} 
          ${
            valid ? "" : "invalid"
          } rounded-2 outline-none border transition-main ${classes.input}`}
        />
      )}
      <p
        style={{ fontSize: "0.8rem" }}
        className={`d-flex ${
          valid ? "invisible" : ""
        } gap-1 align-items-center mt-1 mb-0 fw-semibold text-danger`}
      >
        <FontAwesomeIcon icon={faCircleExclamation} />
        <span className="d-block">{message}</span>
      </p>
    </div>
  );
};

export default memo(NewProductInput);
