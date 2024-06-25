import Skeleton from "./Skeleton";

const PersonSkeleton = ({ delay }) => {
  return (
    <div className="d-flex align-items-center py-2 px-3 gap-2">
      <Skeleton
        delay={delay}
        style={{ width: "60px", height: "60px" }}
        className="rounded-pill"
      />
      <div className="flex-grow-1">
        <Skeleton delay={delay} className="mb-2" />
        <Skeleton delay={delay} />
      </div>
    </div>
  );
};

export default PersonSkeleton;
