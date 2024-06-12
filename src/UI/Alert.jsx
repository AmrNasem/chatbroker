import Modal from "./Modal";
import classes from "./Confirm.module.css";

const Alert = ({ children, closureHandler, closing }) => {
  return (
    <Modal
      closing={closing}
      onClick={closureHandler}
      style={{ width: "450px", maxWidth: "100%" }}
      className={`${classes.confirm} ${
        closing ? classes["fade-out"] : ""
      } position-fixed top-50 start-50 bg-white p-3 rounded-2 shadow`}
    >
      <h4 className="text-main">حدثت مشكلة ما!</h4>
      <p className="mb-5 text-secondary">{children}</p>
      <div className="d-flex gap-2">
        <button onClick={closureHandler} className="btn bg-sec text-white">
          حسنًا
        </button>
      </div>
    </Modal>
  );
};

export default Alert;
