import React, { useCallback, useEffect, useState } from "react";
import ChatArea from "../components/Chat/ChatArea";
import Person from "../components/Chat/Person";
import classes from "./Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { contacts } from "../utils/general";

const chatAreaStyle = { flexBasis: "66%" };

const Chat = () => {
  const [active, setActive] = useState(null);
  const [asidedisplayed, setAsideDisplayed] = useState(false);

  const handleToggleAside = useCallback(
    () => setAsideDisplayed((prev) => !prev),
    []
  );

  useEffect(() => {
    const deactivate = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", deactivate);
    return () => window.removeEventListener("keydown", deactivate);
  }, []);

  return (
    <main className={`container d-flex mb-4 ${classes.page}`}>
      <aside
        className={`d-flex flex-column align-items-start border-start d-lg-block bg-white overflow-auto scrollbar-none ${
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
          {contacts.map((contact, i) => (
            <Person
              key={i}
              contact={contact}
              active={active}
              setActive={setActive}
              onToggleAside={handleToggleAside}
            />
          ))}
        </div>
      </aside>
      {active ? (
        <ChatArea
          style={chatAreaStyle}
          className="flex-grow-1"
          active={active}
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
