import { memo } from "react";
import classes from "./Person.module.css";

const Person = ({ contact, active, setActive, onToggleAside }) => {
  return (
    <div
      onClick={() => {
        setActive(contact);
        onToggleAside();
      }}
      className={`transition-main cursor-pointer px-3 ${classes.person} ${
        active?.id === contact.id ? classes.active : ""
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
        <span
          style={{ width: "10px", height: "10px", backgroundColor: "#0d0" }}
          className="rounded-circle position-absolute right-0 bottom-0 border translate-middle"
        ></span>
        <img
          className={`rounded-circle d-block w-100 h-100 object-fit-cover`}
          src={contact.image}
          alt=""
        />
      </div>
      <div className="py-2 flex-grow-1 overflow-hidden">
        <h6 className="text-secondary mt-1" style={{ fontSize: "1.1rem" }}>
          {contact.name}
        </h6>
        <p
          className="text-truncate opacity-75"
          style={{ color: "var(--address-color)", fontSize: "0.9rem" }}
        >
          {contact.messages[contact.messages.length - 1].text}
        </p>
      </div>
      <div className="d-flex flex-column align-items-end">
        <h6 className="opacity-75">9:21م</h6>
        <span
          className={`rounded-circle ms-1 bg-sec text-white d-inline-block text-center`}
          style={{
            minWidth: "18px",
            minHeight: "18px",
            fontSize: "0.6rem",
          }}
        >
          {contact.messages.length}
        </span>
      </div>
    </div>
  );
};

export default memo(Person);
