import { memo } from "react";
import Skeleton from "./Skeleton";

// import
const CardSkeleton = (props) => {
  return (
    <div
      style={props.style}
      className={` d-flex flex-column rounded-3 ${props.className}`}
    >
      <div className={`position-relative overflow-hidden`}>
        <Skeleton delay={props.delay} style={{ height: "150px" }} />
      </div>
      <div className={`flex-grow-1 d-flex flex-column py-3`}>
        <Skeleton delay={props.delay} className="w-50 mb-2" />
        <Skeleton
          delay={props.delay}
          style={{ height: "1.6em" }}
          className="mt-2 mb-3"
        />
        <Skeleton delay={props.delay} className="my-2" />
        <Skeleton delay={props.delay} className="my-2" />
      </div>
    </div>
  );
};

export default memo(CardSkeleton);
