import classes from "./Badge.module.css";
import { faRepeat, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const Badge = (props) => {

  return (
    <div
      style={{
        color: props.swap ? "var(--main-color)" : "white",
        backgroundColor: props.swap ? "#FFF1E1" : props.sell ? "var(--main-color)" : "#550000",
        paddingRight: props.swap ? "6px" : "18px",
      }}
      className={`${classes.badge} ${props.swap ? "z-1" : ""} ${props.className
        } position-relative text-nowrap pb-1 ps-1 mt-2 d-flex align-items-center gap-1`}
    >
      <span
        style={{
          borderRightColor: props.swap ? "#FFF1E1" : props.sell ? "var(--main-color)" : "white",

        }}
        className={`position-absolute end-100 w-0 h-0 ${classes.arrow}`}
      ></span>
      {props.swap ? (
        <FontAwesomeIcon icon={faRepeat} />
      ) : (
        <FontAwesomeIcon icon={faTag} />
      )}
      <span style={{ fontSize: "100%" }} className="fw-semibold">
        متاح {props.swap ? "للاستبدال" : props.sell ? "للبيع" : "للإيجار"}

      </span>
    </div>
  );
};

export default memo(Badge);
