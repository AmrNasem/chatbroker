import classes from "./Badge.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";

const Badge = ({ style, className, icon, borderRightColor, children }) => {
  return (
    <div
      style={style}
      className={`${classes.badge} ${className} position-relative text-nowrap pb-1 ps-1 mt-2 d-flex align-items-center gap-1`}
    >
      <span
        style={{ borderRightColor }}
        className={`position-absolute end-100 w-0 h-0 ${classes.arrow}`}
      ></span>
      <FontAwesomeIcon icon={icon} />
      <span className="fw-semibold">{children}</span>
    </div>
  );
};

export default memo(Badge);
