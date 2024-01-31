import { memo } from "react";
import Skeleton from "./Skeleton";

const OfferSkeleton = ({ style, delay }) => {
  return (
    <div style={style} className={`rounded-3`}>
      <div className={`position-relative overflow-hidden`}>
        <Skeleton delay={delay} style={{ height: "150px" }} />
      </div>
      <div className={`py-3`}>
        <Skeleton delay={delay} className="w-50 mx-auto" />
        <Skeleton delay={delay} className="my-2" />
      </div>
    </div>
  );
};

export default memo(OfferSkeleton);
