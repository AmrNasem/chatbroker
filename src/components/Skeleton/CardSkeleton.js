import { memo } from "react";
import Skeleton from "./Skeleton";

// import
const CardSkeleton = ({ delay, className, style }) => {
  return (
    <div style={style} className={` d-flex flex-column rounded-3 ${className}`}>
      <div className={`position-relative overflow-hidden`}>
        <Skeleton delay={delay} style={{ height: "150px" }} />
      </div>
      <div className={`flex-grow-1 d-flex flex-column py-3`}>
        <Skeleton delay={delay} className="w-50 mb-2" />
        <Skeleton
          delay={delay}
          style={{ height: "1.6em" }}
          className="mt-2 mb-3"
        />
        <Skeleton delay={delay} className="my-2" />
        <Skeleton delay={delay} className="my-2" />
      </div>
    </div>
  );
};

export default memo(CardSkeleton);
