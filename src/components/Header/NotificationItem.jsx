import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import classes from "./NotificationItem.module.css";

const NotificationItem = ({ unread }) => {
  return (
    <div
      className={`${
        unread ? classes.unread : ""
      } transition-main cursor-pointer d-flex gap-2 px-3 py-2 position-relative ${
        classes.notification
      }`}
    >
      <div className={`${classes.avatar} rounded-circle overflow-hidden`}>
        <img
          src={require("../../assets/avatar.png")}
          className="w-100 h-100 object-fit-cover"
          alt=""
        />
      </div>
      <div>
        <div className="d-flex mb-2 gap-1 justify-content-between align-items-center">
          <h6 style={{ color: "#424750" }} className="mb-0">
            مصطفى الشهاوي
          </h6>
          <div
            style={{ color: "var(--address-color)" }}
            className="text-nowrap d-flex align-items-center gap-1"
          >
            <FontAwesomeIcon icon={faClock} />
            <span className="d-block">منذ 1 ساعة</span>
          </div>
        </div>
        <p className={`overflow-hidden ${classes.text}`} title="">
          تم انتهاء مدة حجز بلايستيشن 4، هل تريد مد فترة الحجز بحد أقصى 5 أيام
          تم انتهاء مدة حجز بلايستيشن 4، هل تريد مد فترة الحجز بحد أقصى 5 أيام
        </p>
      </div>
      <span
        style={{ height: "1px" }}
        className="d-block position-absolute top-100 start-50 translate-middle bg-secondary w-25"
      ></span>
    </div>
  );
};

export default memo(NotificationItem);
