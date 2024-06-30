import classes from "./Chatbot.module.css";
import RobotIcon from "../../Icons/RobotIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { backend } from "../../App";
import { useSelector } from "react-redux";
import Skeleton from "../Skeleton/Skeleton";
import Message from "../Chat/Message";
import useKey from "../../hooks/use-key";
import Swal from "sweetalert2";

const Chatbot = () => {
  const [isChatting, setIsChatting] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({
    value: null,
    loading: true,
    error: null,
  });
  const chatRef = useRef();
  const chatButtonRef = useRef();
  const areaRef = useRef();

  const toggleChatHandler = () => {
    if (isChatting) {
      Swal.fire({
        title: "هل أنت متأكد؟",
        text: "سوف يتم حذف جميع الرسائل السابقة!",
        icon: "warning",
        cancelButtonText: "إلغاء",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم متأكد",
      }).then((result) => {
        if (result.isConfirmed) {
          chatRef.current.classList.add(classes.hide);
          chatButtonRef.current.classList.remove(classes.active);
          let timeout;
          timeout = setTimeout(() => {
            setIsChatting(false);
            clearMessages();
            clearTimeout(timeout);
          }, 100);
        }
      });
    } else {
      chatButtonRef.current.classList.add(classes.active);
      setIsChatting(true);
    }
  };

  const clearMessages = () => {
    setMessages({
      value: null,
      loading: false,
      error: null,
    });
  };
  console.log(messages);

  const handleGetMessages = useCallback(async () => {
    if (!isChatting) return;
    try {
      setMessages((prev) => ({ ...prev, loading: true, error: null }));
      const res = await fetch(`${backend}/chatbot/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطأ في تحميل الرسائل");
      console.log(data);
      setMessages((prev) => ({
        ...prev,
        loading: false,
        value: data.messages,
      }));
    } catch (err) {
      setMessages((prev) => ({ ...prev, loading: false, error: err.message }));
    }
  }, [token, isChatting]);

  useEffect(() => {
    handleGetMessages();
  }, [handleGetMessages]);

  useEffect(() => {
    if (areaRef.current)
      areaRef.current.scrollTo(0, areaRef.current.scrollHeight);
  }, [messages]);

  const handleSubmit = async (e, request) => {
    e.preventDefault();
    const newRequest = request || {
      id: Math.random().toString(),
      text: message,
      createdAt: new Date(),
    };

    if (!newRequest.text.trim()) return;

    try {
      setMessages((prev) => ({
        ...prev,
        value: request
          ? prev.value.map((msg) =>
              msg.request.id === newRequest.id ? { ...msg, loading: true } : msg
            )
          : [
              ...(prev.value || []),
              { loading: true, error: "", request: newRequest },
            ],
      }));
      setMessage("");
      const res = await fetch(`https://chat-testing-1rsl.onrender.com/chat`, {
        method: "POST",
        body: JSON.stringify({ text: newRequest.text }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data); // Log the response

      if (!res.ok) throw new Error(data.message || "خطأ في تحميل الرسائل");

      setMessages((prev) => ({
        ...prev,
        value: prev.value.map((msg) =>
          msg.request.id === newRequest.id
            ? {
                ...msg,
                response: {
                  ...msg.response,
                  createdAt: new Date(),
                  text: data.reponse,
                },
                loading: false,
              }
            : msg
        ),
      }));
    } catch (err) {
      setMessages((prev) => ({
        ...prev,
        value: prev.value.map((msg) =>
          msg.request.id === newRequest.id
            ? { ...msg, error: err.message, loading: false }
            : msg
        ),
      }));
    }
  };

  useKey("Escape", toggleChatHandler);
  useKey("Enter", (e) => handleSubmit(e));

  return (
    <div className={`position-sticky mx-sm-5 mx-3 ${classes.chatbot}`}>
      {isChatting && (
        <div
          ref={chatRef}
          className={`position-absolute d-flex flex-column start-0 mb-3 ms-sm-3 bg-white p-3 rounded-3 ${classes.box}`}
        >
          <button
            onClick={toggleChatHandler}
            className="position-absolute start-100 top-0 translate-middle bg-white border-0 rounded-circle"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <div
            ref={areaRef}
            className="flex-grow-1 position-relative overflow-auto scrollbar-none"
          >
            {messages.loading ? (
              [...Array(4).keys()].map((i) => (
                <Skeleton
                  key={i}
                  className={`my-4 ${i % 2 ? "me-auto" : ""}`}
                  style={{ maxWidth: "60%", height: "1rem" }}
                />
              ))
            ) : !messages.error ? (
              <p className="text-center text-danger fw-semibold my-2">
                {messages.error}
              </p>
            ) : messages.value?.length ? (
              messages.value.map((msg, i) => (
                <div key={i}>
                  <Message isMyMessage message={msg.request} />
                  {msg.loading ? (
                    <Skeleton
                      className={`my-4 me-auto`}
                      style={{ maxWidth: "60%", height: "1rem" }}
                    />
                  ) : msg.error ? (
                    <p className="text-start text-danger fw-semibold my-2">
                      <button
                        onClick={(e) => handleSubmit(e, msg.request)}
                        className="text-sec bg-transparent border-0"
                      >
                        حاول مرة أخرى
                      </button>{" "}
                      ,{msg.error}
                    </p>
                  ) : (
                    <Message message={msg.response} />
                  )}
                </div>
              ))
            ) : (
              <div className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center flex-column">
                <img src={require("../../assets/Chatbot.png")} alt="Robot" />
                <div className="d-flex gap-2 align-items-end my-2">
                  <div
                    className={`rounded-circle d-block ${classes.bullet}`}
                  ></div>
                  <p className="mb-0">مرحبًا أنا هنا للمساعدة</p>
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={`d-flex border rounded-5 px-2 overflow-hidden ${classes.form}`}
          >
            <textarea
              rows="1"
              onInput={(e) => {
                console.log("hi");
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              autoFocus
              type="text"
              className="flex-grow-1 p-2 border-0 outline-none w-100 scrollbar-none"
              placeholder="اسألني سؤالًا"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
            <button
              className={`bg-transparent border-0 p-2 ${
                !message.trim() ? "opacity-50" : ""
              } ${classes.send}`}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
      <button
        ref={chatButtonRef}
        onClick={toggleChatHandler}
        className={`position-absolute start-0 rounded-circle border-0`}
      >
        <RobotIcon />
      </button>
    </div>
  );
};

export default Chatbot;
