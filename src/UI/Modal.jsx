import { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = ({ className, onClick, children, bdClassName, closing }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return ReactDOM.createPortal(
    <>
      <div
        className={`${bdClassName} ${classes.modal} ${
          closing ? classes.closing : ""
        } z-1000 position-fixed top-0 start-0 w-100 h-100`}
        onClick={onClick}
      ></div>
      <Popup className={className}>{children}</Popup>
    </>,
    document.getElementById("overlay-root")
  );
};

const Popup = ({ children, className }) => {
  return ReactDOM.createPortal(
    <div className={`z-1001 ${className}`}>{children}</div>,
    document.getElementById("popup-root")
  );
};

export default Modal;
