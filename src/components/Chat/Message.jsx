const Message = ({ message }) => {
  return (
    <div
      style={{ fontSize: "0.9rem" }}
      className={`fw-semibold d-flex flex-column align-items-${
        message.me ? "start" : "end"
      }`}
    >
      <span className={`d-block mb-1 text-secondary`}>9:21م</span>
      <p
        className={`text-white p-2 ${message.me ? "bg-sec" : "bg-main"}`}
        style={{
          maxWidth: "80%",
          borderRadius: `${message.me ? "0.5rem" : ""} 0 0.5rem 0.5rem`,
        }}
      >
        {message.text}
      </p>
    </div>
  );
};

export default Message;
