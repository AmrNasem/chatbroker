import { useEffect } from "react";
import ReactDOM from "react-dom";

const Overlay = (props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      className={`position-fixed top-0 start-0 w-100 h-100 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>,
    document.getElementById("overlay-root")
  );
};

export default Overlay;
