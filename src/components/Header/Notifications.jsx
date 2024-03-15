import React, { memo } from "react";
import NotificationItem from "./NotificationItem";

const Notifications = ({ className, style, mobile }) => {
  return (
    <div style={style} className={`d-flex flex-column bg-white ${className}`}>
      {!mobile && (
        <span
          style={{
            right: "10px",
            border: "10px solid transparent",
            borderBottomColor: "white",
          }}
          className="d-block position-absolute bottom-100"
        ></span>
      )}
      <div className="d-flex justify-content-center align-items-center gap-2 px-3">
        <h5 style={{ color: "#424750", margin: 0 }}>الإشعارات</h5>
        <button
          style={{ border: "1px solid var(--main-color)" }}
          className="d-block text-main my-3 me-auto btn"
        >
          علم الكل كمقروء
        </button>
      </div>
      <div
        style={{ maxHeight: mobile ? "100%" : "400px" }}
        className="flex-grow-1 overflow-auto scrollbar-none"
      >
        <NotificationItem unread />
        <NotificationItem />
        <NotificationItem unread />
        <NotificationItem unread />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </div>
  );
};

export default memo(Notifications);
