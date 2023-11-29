import { useEffect } from "react";
import ReactDOM from "react-dom";

const Overlay = (props) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      className={`z-1000 position-fixed top-0 start-0 w-100 h-100 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>,
    document.getElementById("overlay-root")
  );
};

export default Overlay;
