import { useSelector } from "react-redux";
import { getDate } from "../../utils/date";
import { useEffect, useState } from "react";

const Message = ({ message }) => {
  const user = useSelector((state) => state.auth.user);
  const isMyMessage = message.senderId === user.id;

  const currentTime = new Date();

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <div
      style={{ fontSize: "0.9rem" }}
      className={`fw-semibold d-flex flex-column align-items-${isMyMessage ? "start" : "end"
        }`}
    >
      <span dir="ltr" className={`d-block mb-1 text-secondary`}>
        {/* {getDate(message.createdAt)} */}
        {formatTime(currentTime)}
      </span>
      <p
        className={`text-white p-2 ${isMyMessage ? "bg-sec" : "bg-main"}`}
        style={{
          maxWidth: "80%",
          borderRadius: `${isMyMessage ? "0.5rem" : ""} 0 0.5rem 0.5rem`,
        }}
      >
        {message.text}
      </p>
    </div>
  );
};

export default Message;
