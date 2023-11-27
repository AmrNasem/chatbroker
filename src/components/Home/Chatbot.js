import classes from "./Chatbot.module.css";
import RobotIcon from "../../Icons/RobotIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const Chatbot = () => {
  const [isChatting, setIsChatting] = useState(false);
  const chatRef = useRef();
  const chatButtonRef = useRef();

  const toggleChatHandler = () => {
    if (isChatting) {
      chatRef.current.classList.add(classes.hide);
      chatButtonRef.current.classList.remove(classes.active);
      let timeout;
      timeout = setTimeout(() => {
        setIsChatting(false);
        clearTimeout(timeout);
      }, 100);
    } else {
      chatButtonRef.current.classList.add(classes.active);
      setIsChatting(true);
    }
  };

  return (
    <div className={`position-sticky mx-sm-5 mx-3 ${classes.chatbot}`}>
      {isChatting && (
        <div
          ref={chatRef}
          className={`position-absolute start-0 mb-3 ms-sm-3 bg-white p-3 rounded-3 ${classes.box}`}
        >
          <button
            onClick={toggleChatHandler}
            className="position-absolute start-100 top-0 translate-middle bg-white border-0 rounded-circle"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src={require("../../assets/Chatbot.png")} alt="Robot" />
            <div className="d-flex gap-2 align-items-end my-2">
              <div className={`rounded-circle d-block ${classes.bullet}`}></div>
              <p className="mb-0">مرحبًا أنا هنا للمساعدة</p>
            </div>
          </div>
          <form
            className={`d-flex border rounded-pill px-2 overflow-hidden ${classes.form}`}
          >
            <input
              type="text"
              className="flex-grow-1 p-2 border-0 outline-none"
              placeholder="اسألني سؤالًا"
            />
            <button className={`bg-transparent border-0 p-2 ${classes.send}`}>
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
