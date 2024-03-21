import classes from "./Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";

const Auth = (props) => {
  const [alert, setAlert] = useState({ error: false, message: "" });
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const authStatus = params.get("auth");

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${classes.auth} bg-white position-relative top-50 end-50 d-flex flex-column align-items-center p-4 rounded-3`}
    >
      <button
        onClick={props.onClick}
        className={`${classes.close} position-absolute border rounded-circle bg-transparent`}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      {alert.message && (
        <p
          className={`text-center ${
            alert.error ? "text-danger" : "text-success"
          }`}
        >
          {alert.message}
        </p>
      )}
      <img
        className={classes.img}
        src={require("../../assets/logo.png")}
        alt="Chat Broker"
      />
      <h5 className="text-main text-nowrap mt-1 mb-3">
        <span className="text-sec">Chat</span> Broker
      </h5>
      {authStatus === "login" && (
        <h6 style={{ color: "#424750" }} className={`${classes.hello} mb-0`}>
          مرحبًا بك
        </h6>
      )}
      <p style={{ color: "var(--main-color)" }} className="fw-semibold mb-2">
        {authStatus === "login"
          ? "قم بتسجيل الدخول للمتابعة"
          : "يرجى تعبئة المعلومات التالية"}
      </p>
      <p className={`${classes.assumption} fw-semibold`}>
        {authStatus === "login" ? "ليس لديك حساب؟ " : "لديك حساب؟ "}
        <button
          className="border-0 bg-transparent"
          onClick={() =>
            navigate(`?auth=${authStatus === "login" ? "register" : "login"}`)
          }
        >
          {authStatus === "login" ? "اشترك دلوقتي" : "تسجيل دخول"}
        </button>
      </p>
      {authStatus === "login" ? (
        <Login setAlert={setAlert} />
      ) : (
        <Register setAlert={setAlert} />
      )}
    </div>
  );
};

export default Auth;
