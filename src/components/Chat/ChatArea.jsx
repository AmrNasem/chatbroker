import {
  faBars,
  faCamera,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import Message from "./Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../Skeleton/Skeleton";
import { fetchMessages, sendMessage } from "../../store/chat-slice";
import classes from "./ChatArea.module.css";

const ChatArea = ({ style, className, onToggleAside }) => {
  const areaRef = useRef();
  const dispatch = useDispatch();
  const { currentChat, messages, loading, error, socket, onlineUsers } =
    useSelector((state) => state.chats);
  const { user, token } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  const online = onlineUsers?.find(
    (u) => user.id !== +u && currentChat.members.includes(+u)
  )
    ? true
    : false;

  useEffect(() => {
    if (areaRef.current)
      areaRef.current.scrollTo(0, areaRef.current.scrollHeight);
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && messages) {
      const newMessage = {
        senderId: user.id,
        receiverId: currentChat.members.find((m) => m !== user.id),
        text: message.trim(),
      };

      socket.emit("sendMessage", {
        ...newMessage,
        conversationId: currentChat._id,
        image: currentChat.image,
      });
      dispatch(sendMessage({ ...newMessage, createdAt: new Date() }));
      setMessage("");
    }
  };

  return (
    <div style={style} className={`${className} d-flex flex-column`}>
      <div className="d-flex align-items-center gap-1 px-3 py-2 border-bottom">
        <button
          className="px-2 py-1 border-0 bg-transparent d-lg-none"
          style={{ fontSize: "1.1rem" }}
          onClick={onToggleAside}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="flex-grow-1 d-flex justify-content-between gap-2 align-items-center">
          <h6 className="text-secondary mt-1" style={{ fontSize: "1.1rem" }}>
            {currentChat.fullname}
          </h6>
          <div
            style={{ width: "40px", height: "40px" }}
            className="position-relative"
          >
            {online && (
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#0d0",
                }}
                className="rounded-circle position-absolute right-0 bottom-0 border translate-middle"
              ></span>
            )}
            <img
              className={`rounded-circle d-block w-100 h-100 object-fit-cover`}
              src={currentChat.image || require("../../assets/person.jpeg")}
              alt=""
            />
          </div>
        </div>
      </div>
      <div
        ref={areaRef}
        className={`p-3 flex-grow-1 overflow-auto scrollbar-none ${classes.area}`}
      >
        {loading ? (
          [...Array(4).keys()].map((i) => (
            <Skeleton
              key={i}
              className={`my-4 ${i % 2 ? "me-auto" : ""}`}
              style={{ maxWidth: "60%", height: "1rem" }}
            />
          ))
        ) : error ? (
          <p className="text-center text-danger fw-semibold my-2">
            {error}،{" "}
            <button
              onClick={() => {
                if (currentChat)
                  dispatch(
                    fetchMessages({
                      token,
                      userIds: currentChat.members.join("/"),
                    })
                  );
              }}
              className="text-sec bg-transparent border-0"
            >
              حاول مرة أخرى
            </button>
          </p>
        ) : messages.length ? (
          messages.map((message, i) => <Message key={i} message={message} />)
        ) : (
          <h4 className="text-center position-relative top-50 start-50 opacity-75 translate-middle">
            أرسل أول رسالة
          </h4>
        )}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="d-flex gap-2 px-3 mt-1 align-items-center"
      >
        <button
          style={{
            width: "40px",
            height: "40px",
            cursor: message.trim() ? "pointer" : "auto",
          }}
          className={`border-0 px-2 bg-sec transition-main rounded-circle position-relative text-white ${
            message.trim() ? "" : "opacity-75"
          }`}
        >
          <FontAwesomeIcon
            className={`position-absolute start-50 top-50 translate-middle`}
            icon={faPaperPlane}
          />
          {/* <FontAwesomeIcon
            className={`position-absolute start-50 top-50 translate-middle ${
              message.trim() ? classes["fade-out"] : classes["fade-in"]
            }`}
            icon={faMicrophone}
          /> */}
        </button>
        <div className="parent-input-focus transition-main border flex-grow-1 d-flex gap-1 align-items-center bg-light p-1 rounded-pill">
          <button
            style={{ fontSize: "1.1rem", color: "var(--address-color)" }}
            className="border-0 px-2 bg-transparent"
          >
            <FontAwesomeIcon icon={faSmile} />
          </button>
          <input
            autoFocus
            className=" w-100 border-0 outline-none bg-transparent p-2"
            type="text"
            placeholder="مراسلة"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            style={{ fontSize: "1.1rem", color: "var(--address-color)" }}
            className="border-0 px-2 bg-transparent"
          >
            <FontAwesomeIcon icon={faCamera} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(ChatArea);
