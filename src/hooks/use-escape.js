import { useEffect } from "react";

const useEscape = (callback) => {
  useEffect(() => {
    const deactivate = (e) => {
      if (e.key === "Escape") callback(e);
    };
    window.addEventListener("keydown", deactivate);
    return () => window.removeEventListener("keydown", deactivate);
  }, [callback]);
};

export default useEscape;
