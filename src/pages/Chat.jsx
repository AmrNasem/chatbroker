import React, { useCallback, useEffect, useState } from "react";
import ChatArea from "../components/Chat/ChatArea";
import Person from "../components/Chat/Person";
import classes from "./Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { closeChat, fetchMessages } from "../store/chat-slice";
import PersonSkeleton from "../components/Skeleton/PersonSkeleton";
import { chatURL } from "../utils/constants";

const chatAreaStyle = { flexBasis: "66%" };

const Chat = () => {
  const [asidedisplayed, setAsideDisplayed] = useState(false);
  const { token, user } = useSelector((state) => state.auth);
  const [chats, setChats] = useState({
    value: null,
    loading: true,
    error: null,
  });
  const currentChat = useSelector((state) => state.chats.currentChat);
  const dispatch = useDispatch();

  const handleToggleAside = useCallback(
    () => setAsideDisplayed((prev) => !prev),
    []
  );

  const getAllChats = useCallback(async () => {
    try {
      setChats((prev) => ({ ...prev, error: null, loading: true }));
      const res = await fetch(`${chatURL}/getAllConversations/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok)
        throw new Error(data.error ? data.message : "خطأ في تحميل الدردشات!");
      setChats((prev) => ({
        ...prev,
        value: data.payload.conversations,
        loading: false,
      }));
    } catch (error) {
      setChats((prev) => ({ ...prev, error: error.message, loading: false }));
    }
  }, [user, token]);

  useEffect(() => {
    getAllChats();
  }, [getAllChats]);

  useEffect(() => {
    if (currentChat)
      dispatch(
        fetchMessages({ token, userIds: currentChat.members.join("/") })
      );
  }, [currentChat, dispatch, token]);

  useEffect(() => {
    const deactivate = (e) => {
      if (e.key === "Escape") dispatch(closeChat());
    };
    window.addEventListener("keydown", deactivate);
    return () => window.removeEventListener("keydown", deactivate);
  }, [dispatch]);

  return (
    <main className={`container d-flex mb-4 ${classes.page}`}>
      <aside
        style={{ flexBasis: "33%" }}
        className={`d-flex flex-grow-1 flex-column align-items-start border-start d-lg-block bg-white overflow-auto scrollbar-none ${
          classes.aside
        } ${asidedisplayed ? "" : classes.hide}`}
      >
        <button
          className="px-2 py-1 mt-3 me-3 border-0 bg-transparent d-lg-none"
          style={{ fontSize: "1.2rem" }}
          onClick={handleToggleAside}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>

        <div className="pt-lg-4 pt-2 flex-grow-1 overflow-auto scrollbar-none">
          {chats.loading ? (
            [...Array(4).keys()].map((i) => (
              <PersonSkeleton key={i} delay={i} />
            ))
          ) : chats.error ? (
            <p className="text-center text-danger fw-semibold my-2">
              {chats.error}
            </p>
          ) : (
            chats.value.map((chat, i) => (
              <Person key={i} chat={chat} onToggleAside={handleToggleAside} />
            ))
          )}
        </div>
      </aside>
      {currentChat ? (
        <ChatArea
          style={chatAreaStyle}
          className="flex-grow-1"
          onToggleAside={handleToggleAside}
        />
      ) : (
        <div
          className="position-relative flex-grow-1"
          style={{ flexBasis: "66%" }}
        >
          <button
            onClick={handleToggleAside}
            className="btn bg-sec text-white border-0 d-lg-none position-absolute start-50 top-50 translate-middle"
          >
            اضغط لبدء المحادثة
          </button>
          <h4 className="position-absolute d-none d-lg-block text-secondary start-50 top-50 translate-middle">
            اضغط لبدء المحادثة
          </h4>
        </div>
      )}
    </main>
  );
};

export default Chat;
