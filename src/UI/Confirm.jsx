import React from "react";
import Modal from "./Modal";
import classes from "./Confirm.module.css";
import Spinner from "./Spinner";

const Confirm = ({
  children,
  actionHandler,
  closureHandler,
  closing,
  loading,
}) => {
  return (
    <Modal
      closing={closing}
      onClick={closureHandler}
      style={{ width: "450px", maxWidth: "100%" }}
      className={`${classes.confirm} ${
        closing ? classes["fade-out"] : ""
      } position-fixed top-50 start-50 bg-white p-3 rounded-2 shadow`}
    >
      <h3 className="text-main">تأكيد</h3>
      <p className="mb-5 text-secondary">{children}</p>
      <div className="d-flex gap-2">
        {loading ? (
          <Spinner side={40} color="var(--secondary-color)" stroke={4} />
        ) : (
          <button onClick={actionHandler} className="btn bg-sec text-white">
            تأكيد
          </button>
        )}
        <button
          onClick={closureHandler}
          className="btn btn-outline border border-sec text-sec"
        >
          إلغاء
        </button>
      </div>
    </Modal>
  );
};

export default Confirm;
