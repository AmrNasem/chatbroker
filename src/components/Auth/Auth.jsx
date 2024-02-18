import classes from "./Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { memo, useState } from "react";

const Auth = (props) => {
  const [alert, setAlert] = useState({ error: false, message: "" });
  const [params, setParams] = useSearchParams();

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
      <img
        className={classes.img}
        src={require("../../assets/logo.png")}
        alt="Chat broker"
      />
      <h5 className="text-main text-nowrap mt-1 mb-3">
        <span className="text-sec">Chat</span> Broker
      </h5>
      {params.get("auth") === "login" && (
        <h6 style={{ color: "#424750" }} className={`${classes.hello} mb-0`}>
          مرحبًا بك
        </h6>
      )}
      <p style={{ color: "var(--main-color)" }} className="fw-semibold mb-2">
        {params.get("auth") === "login"
          ? "قم بتسجيل الدخول للمتابعة"
          : "يرجى تعبئة المعلومات التالية"}
      </p>
      <p className={`${classes.assumption} fw-semibold`}>
        {params.get("auth") === "login" ? "ليس لديك حساب؟ " : "لديك حساب؟ "}
        <button
          className="border-0 bg-transparent"
          onClick={() =>
            setParams((prev) => {
              prev.set(
                "auth",
                prev.get("auth") === "login" ? "register" : "login"
              );
              return prev;
            })
          }
        >
          {params.get("auth") === "login" ? "اشترك دلوقتي" : "تسجيل دخول"}
        </button>
      </p>
      {params.get("auth") === "login" ? (
        <Login setAlert={setAlert} />
      ) : (
        <Register setAlert={setAlert} />
      )}
      {alert.message && (
        <p
          className={`text-center my-2 fw-semibold ${
            alert.error ? "text-danger" : "text-success"
          } ${classes.alert}`}
        >
          {alert.message}
        </p>
      )}
    </div>
  );
};

export default memo(Auth);
