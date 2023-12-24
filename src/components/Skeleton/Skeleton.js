import { memo } from "react";
import "./Skeleton.css";
const Skeleton = ({ className, style }) => {
  return (
    <span style={style} className={`skeleton d-block ${className}`}></span>
  );
};

export default memo(Skeleton);
