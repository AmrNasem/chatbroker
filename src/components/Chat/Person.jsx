import { memo, useEffect, useState } from "react";
import classes from "./Person.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../store/chat-slice";
import { getDate } from "../../utils/date";

const Person = ({ chat, onToggleAside, online, unread }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const {
    currentChat,
    socket,
    lastMessage: currentLastMessage,
  } = useSelector((state) => state.chats);
  const [lastMessage, setLastMessage] = useState(chat.lastMessage);

  const whichMessage =
    currentChat?._id === chat._id ? currentLastMessage : lastMessage;

  const isMyMessage = whichMessage?.senderId === user.id;

  const date = whichMessage && getDate(whichMessage.createdAt);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      if (chat.members.includes(+data.senderId)) setLastMessage(data);
    });
  }, [socket, chat]);

  useEffect(() => {
    if (currentChat?._id === chat._id) setLastMessage(currentLastMessage);
  }, [currentChat, currentLastMessage, chat]);

  console.log(chat);

  return (
    <div
      onClick={() => {
        onToggleAside();
        if (currentChat?._id === chat._id) return;
        dispatch(openChat({ chat, lastMessage: whichMessage }));
      }}
      className={`transition-main cursor-pointer px-3 ${classes.person} ${
        currentChat?._id === chat._id ? classes.active : ""
      } d-flex gap-3 align-items-center`}
    >
      <div
        style={{
          minWidth: "60px",
          width: "60px",
          minHeight: "60px",
          height: "60px",
        }}
        className="position-relative"
      >
        {online && (
          <span
            style={{ width: "10px", height: "10px", backgroundColor: "#0d0" }}
            className="rounded-circle position-absolute right-0 bottom-0 border translate-middle"
          ></span>
        )}
        <img
          className={`rounded-circle d-block w-100 h-100 object-fit-cover`}
          src={chat.image || require("../../assets/person.jpeg")}
          alt=""
        />
      </div>
      <div className="py-2 flex-grow-1 overflow-hidden">
        <h6 className="text-secondary mt-1" style={{ fontSize: "1.1rem" }}>
          {chat.fullname}
        </h6>
        <p
          className={`text-truncate opacity-75 ${
            unread.find(
              (msg) => msg.conversationId === whichMessage.conversationId
            )
              ? "fw-semibold text-sec"
              : ""
          }`}
          style={{ color: "var(--address-color)", fontSize: "0.9rem" }}
        >
          {isMyMessage && "أنت: "}
          {whichMessage?.text}
        </p>
      </div>
      <div className="d-flex flex-column align-items-end">
        <h6
          style={{ direction: "ltr", fontSize: "0.85rem" }}
          className="opacity-75 text-sec"
        >
          {date}
        </h6>
        {!!unread.length && (
          <span
            className={`rounded-circle ms-1 bg-sec text-white d-inline-block text-center`}
            style={{
              minWidth: "18px",
              minHeight: "18px",
              fontSize: "0.6rem",
            }}
          >
            {unread.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(Person);
