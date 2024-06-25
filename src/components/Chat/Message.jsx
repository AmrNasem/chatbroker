import { useSelector } from "react-redux";
import { getDate } from "../../utils/date";

const Message = ({ message }) => {
  const user = useSelector((state) => state.auth.user);
  const isMyMessage = message.senderId === user.id;

  return (
    <div
      style={{ fontSize: "0.9rem" }}
      className={`fw-semibold d-flex flex-column align-items-${
        isMyMessage ? "start" : "end"
      }`}
    >
      <span dir="ltr" className={`d-block mb-1 text-secondary`}>
        {getDate(message.createdAt)}
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
