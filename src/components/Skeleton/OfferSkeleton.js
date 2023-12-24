import { memo } from "react";
import Skeleton from "./Skeleton";

const OfferSkeleton = ({ style }) => {
  return (
    <div style={style} className={`rounded-3`}>
      <div className={`position-relative overflow-hidden`}>
        <Skeleton style={{ height: "150px" }} />
      </div>
      <div className={`py-3`}>
        <Skeleton className="w-50 mx-auto" />
        <Skeleton className="my-2" />
      </div>
    </div>
  );
};

export default memo(OfferSkeleton);
