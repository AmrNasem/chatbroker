import { memo } from "react";
import "./Skeleton.css";
const Skeleton = ({ className, style, delay }) => {
  return (
    <span
      style={{ animationDelay: `${delay * 150}ms`, ...style }}
      className={`skeleton d-block ${className}`}
    ></span>
  );
};

export default memo(Skeleton);
