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
        <Skeleton style={{ height: "150px" }} />
      </div>
      <div className={`flex-grow-1 d-flex flex-column py-3`}>
        <Skeleton className="w-50" />
        <p className="fw-semibold overflow-hidden text-ellipsis mt-2 mb-1">
          <Skeleton style={{ height: "0.7em" }} className="my-1" />
          <Skeleton style={{ height: "0.7em" }} className="w-75 my-1" />
        </p>
        <Skeleton className="my-2" />
        <Skeleton className="my-2" />
      </div>
    </div>
  );
};

export default memo(CardSkeleton);
