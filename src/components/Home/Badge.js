import classes from "./Badge.module.css";
import { faRepeat, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const Badge = (props) => {
  return (
    <div
      style={{
        color: props.swap ? "var(--main-color)" : "white",
        backgroundColor: props.swap ? "#FFF1E1" : "var(--main-color)",
        paddingRight: props.swap ? "6px" : "18px",
      }}
      className={`${classes.badge} ${props.swap ? "z-1" : ""} ${
        props.className
      } position-relative text-nowrap pb-1 ps-1 mt-2 d-flex align-items-center gap-1`}
    >
      <span
        style={{
          borderRightColor: props.swap ? "#FFF1E1" : "var(--main-color)",
        }}
        className={`position-absolute end-100 w-0 h-0 ${classes.arrow}`}
      ></span>
      {props.swap ? (
        <FontAwesomeIcon icon={faRepeat} />
      ) : (
        <FontAwesomeIcon icon={faTag} />
      )}
      <span style={{ fontSize: "0.78rem" }} className="fw-semibold">
        متاح {props.swap ? "للاستبدال" : "للبيع"}
      </span>
    </div>
  );
};

export default memo(Badge);
